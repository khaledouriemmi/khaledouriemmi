/**
 * GitHub API Service
 * Fetches real-time repository data from GitHub API
 */

const GITHUB_USERNAME = 'khaledouriemmi';
const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Fetch all public repositories for the user
 */
export async function fetchAllUserRepos() {
    try {
        const response = await fetch(
            `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );

        if (!response.ok) {
            if (response.status === 403) {
                console.warn('GitHub API rate limit exceeded');
                return [];
            }
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos = await response.json();

        // Transform to our format
        return repos.map(repo => ({
            name: repo.name,
            description: repo.description || 'No description available',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            updatedAt: repo.updated_at,
            htmlUrl: repo.html_url,
            topics: repo.topics || [],
        }));
    } catch (error) {
        console.error('Error fetching user repos:', error);
        return [];
    }
}

/**
 * Fetch a single repository's data from GitHub
 */
export async function fetchGitHubRepo(repoName) {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}`);

        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`Repository ${repoName} not found`);
                return null;
            }
            if (response.status === 403) {
                console.warn('GitHub API rate limit exceeded');
                return null;
            }
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();

        return {
            name: data.name,
            description: data.description,
            stars: data.stargazers_count,
            forks: data.forks_count,
            language: data.language,
            updatedAt: data.updated_at,
            htmlUrl: data.html_url,
            topics: data.topics || [],
        };
    } catch (error) {
        console.error(`Error fetching repo ${repoName}:`, error);
        return null;
    }
}

/**
 * Fetch multiple repositories in parallel
 */
export async function fetchGitHubRepos(repoNames) {
    try {
        const promises = repoNames.map(name => fetchGitHubRepo(name));
        const results = await Promise.all(promises);

        // Filter out failed requests and create a map
        const repoMap = {};
        results.forEach((data, index) => {
            if (data) {
                repoMap[repoNames[index]] = data;
            }
        });

        return repoMap;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return {};
    }
}

/**
 * Extract repository name from GitHub URL
 */
export function extractRepoName(githubUrl) {
    try {
        const match = githubUrl.match(/github\.com\/[^/]+\/([^/]+)/);
        return match ? match[1] : null;
    } catch {
        return null;
    }
}

/**
 * Build full projects list from featured config and GitHub data
 * Config takes priority for category, description, and technologies
 * GitHub provides live stats and auto-populated fields
 */
export function buildProjectsFromConfig(featuredConfig, githubRepos) {
    return featuredConfig.map(config => {
        const githubData = githubRepos.find(
            repo => repo.name.toLowerCase() === config.repo.toLowerCase()
        );

        if (!githubData) {
            // Repo not found in GitHub data, use config only
            console.warn(`Repository ${config.repo} not found in GitHub data`);
            return {
                name: config.displayName || config.repo,
                description: config.description || 'Project description not available',
                link: `https://github.com/${GITHUB_USERNAME}/${config.repo}`,
                category: config.category,
                technologies: config.technologies || [],
                stars: 0,
                forks: 0,
            };
        }

        // Merge config with GitHub data
        return {
            name: config.displayName || githubData.name,
            description: config.description || githubData.description || 'No description available',
            link: githubData.htmlUrl,
            category: config.category,
            technologies: config.technologies || (githubData.language ? [githubData.language] : []),
            stars: githubData.stars,
            forks: githubData.forks,
            updatedAt: githubData.updatedAt,
            language: githubData.language,
        };
    });
}

/**
 * Merge curated project data with live GitHub data
 * Curated data (descriptions, categories) takes priority
 * GitHub data (stars, forks) is always live
 */
export function mergeProjectData(curatedProjects, githubData) {
    return curatedProjects.map(project => {
        const repoName = extractRepoName(project.link);
        const githubInfo = repoName ? githubData[repoName] : null;

        if (githubInfo) {
            return {
                ...project,
                stars: githubInfo.stars,
                forks: githubInfo.forks,
                // Optionally use GitHub description as fallback
                description: project.description || githubInfo.description,
            };
        }

        return project;
    });
}
