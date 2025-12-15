import React, { useState, useMemo, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';
import { fetchAllUserRepos, buildProjectsFromConfig } from '../../services/githubService';
import { fallbackProjects } from '../../data/fallbackProjects';

const experiences = [
  { company: 'LFI-Victor Hugo', role: 'Full Stack Web Developer', date: 'March 2024 - July 2025' },
  { company: 'Self-Employed', role: 'SanAndres-Multiplayer (C/Pawn) and FiveM (LUA) Server Developer', date: 'May 2023 – Present' },
  { company: 'Self-Employed', role: 'Open Source Developer on Github', date: 'May 2023 – Present' },
];

// ========================================
// FEATURED PROJECTS CONFIGURATION
// ========================================
// To add a new project, just add an entry here with:
// - repo: GitHub repository name
// - category: 'Web Apps', 'Tools', 'Gaming', or 'Languages'
// - description: (optional) Custom description, otherwise uses GitHub description
// - displayName: (optional) Custom display name, otherwise uses repo name
// - technologies: (optional) Custom tech stack, otherwise auto-detected from GitHub

const featuredProjects = [
  {
    repo: 'QuizLAN-2.0',
    category: 'Web Apps',
    description: 'Real-time multiplayer quiz game platform with teacher and student interfaces, designed for local network gameplay',
    technologies: ['JavaScript', 'WebSocket', 'HTML', 'CSS'],
  },
  {
    repo: 'Djerba',
    category: 'Languages',
    description: 'Custom programming language interpreter with unique syntax and features',
    technologies: ['Python', 'Interpreter', 'Compiler'],
  },
  {
    repo: 'Olympic-Explorer',
    category: 'Web Apps',
    description: 'AI-powered touristic guide agent for the Paris 2024 Olympics with intelligent recommendations',
    technologies: ['Python', 'AI', 'Machine Learning'],
  },
  {
    repo: 'OlympiadaExplorer-Web-app',
    category: 'Web Apps',
    displayName: 'OlympiadaExplorer Web',
    description: 'Web application version of the Olympic Explorer with interactive UI',
    technologies: ['JavaScript', 'HTML', 'CSS', 'API'],
  },
  {
    repo: 'class-scheduler',
    category: 'Web Apps',
    displayName: 'Class Scheduler',
    description: 'Intelligent class scheduling application with conflict detection and optimization',
    technologies: ['JavaScript', 'React', 'Algorithm'],
  },
  {
    repo: 'Team-Meeting-Time-Zone-Planner',
    category: 'Web Apps',
    description: 'Coordinate team meetings across multiple time zones with smart scheduling',
    technologies: ['JavaScript', 'HTML', 'CSS', 'API'],
  },
  {
    repo: 'CryptoPlus',
    category: 'Tools',
    description: 'PyQt5 encryption and decryption application supporting Caesar, Vigenère, ROT13, and Polybius Square ciphers',
    technologies: ['Python', 'PyQt5', 'Cryptography'],
  },
  {
    repo: 'BiblioManager',
    category: 'Tools',
    description: 'Comprehensive public library loan management system with user and book tracking',
    technologies: ['Python', 'Database', 'GUI'],
  },
  {
    repo: 'Loconverter',
    category: 'Tools',
    description: 'Location converter utility for various coordinate systems and formats',
    technologies: ['Python', 'GIS', 'Conversion'],
  },
  {
    repo: 'Chemical-Reaction-GUI-Application',
    category: 'Tools',
    displayName: 'Chemical Reaction Calculator',
    description: 'Tkinter GUI application for calculating limiting reactants in chemical reactions with visual representation',
    technologies: ['Python', 'Tkinter', 'Chemistry'],
  },
  {
    repo: 'SA-MP-Anti-Mobile-Crasher',
    category: 'Gaming',
    description: 'Protection plugin for SA-MP servers against mobile client crashes',
    technologies: ['Pawn', 'SA-MP', 'Plugin'],
  },
  {
    repo: 'SA-MP-Gazelle-Hunting-Job',
    category: 'Gaming',
    description: 'Custom job system for SA-MP servers featuring gazelle hunting gameplay',
    technologies: ['Pawn', 'SA-MP', 'Gamemode'],
  },
  {
    repo: 'SLB7-Fivem-Collision-',
    category: 'Gaming',
    displayName: 'SLB7 FiveM Collision',
    description: 'Lua collision script for FiveM servers with command-based collision toggle',
    technologies: ['Lua', 'FiveM', 'Script'],
  },
];

const categories = ['All', 'Web Apps', 'Tools', 'Gaming', 'Languages'];
const PROJECTS_PER_PAGE = 4;

export default function ExpProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState(fallbackProjects); // Start with fallback data
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all GitHub repos and build projects from config
  useEffect(() => {
    async function fetchGitHubData() {
      setIsLoading(true);
      try {
        // Fetch all user repos from GitHub
        const githubRepos = await fetchAllUserRepos();

        // Check if we got data
        if (githubRepos && githubRepos.length > 0) {
          console.log(`✅ Fetched ${githubRepos.length} repos from GitHub`);

          // Build projects from featured config + GitHub data
          const builtProjects = buildProjectsFromConfig(featuredProjects, githubRepos);
          setProjects(builtProjects);
        } else {
          console.warn('⚠️ No GitHub repos returned, using fallback data');
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error('❌ Failed to fetch GitHub data:', error);
        console.log('ℹ️ Using fallback project data with hardcoded stats');
        // Fallback: Use hardcoded projects with realistic stats
        setProjects(fallbackProjects);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGitHubData();
  }, []); // Run once on mount

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm, projects]);

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <section id="experience" className="exp-pro-section">
      {/* — Left: Experience — */}
      <div className="experience-col">
        <h2 className="section-title">Experience</h2>
        <div className="exp-cards">
          {experiences.map((e, i) => (
            <div key={i} className="exp-card">
              <div>
                <h3>{e.company}</h3>
                <p>{e.role}</p>
              </div>
              <p className="exp-date">{e.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* — Right: Projects — */}
      <div className="projects-col">
        <h2 className="section-title">Projects</h2>

        <ProjectFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="projects-count">
          {isLoading ? (
            <span className="loading-indicator">
              <span className="loading-spinner"></span>
              Fetching live GitHub data...
            </span>
          ) : (
            `Showing ${startIndex + 1}-${Math.min(endIndex, filteredProjects.length)} of ${filteredProjects.length} projects`
          )}
        </div>

        <div className="proj-cards-grid">
          {currentProjects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-results">
            <p>No projects found matching your criteria.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <svg className="pagination-icon" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" />
              </svg>
              Previous
            </button>

            <div className="pagination-pages">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  className={`pagination-page ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => handlePageClick(pageNum)}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              className="pagination-btn"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <svg className="pagination-icon" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
