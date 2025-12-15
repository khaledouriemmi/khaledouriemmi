import React from 'react';

const skills = {
    languages: [
        { name: 'Python', level: 85, icon: '🐍' },
        { name: 'JavaScript', level: 80, icon: '⚡' },
        { name: 'C/Pawn', level: 70, icon: '🎮' },
        { name: 'Lua', level: 70, icon: '🌙' }
    ],
    frameworks: [
        { name: 'React', level: 75, icon: '⚛️' },
        { name: 'PyQt5', level: 70, icon: '🖥️' },
        { name: 'Node.js', level: 65, icon: '📦' }
    ],
    tools: [
        'Git',
        'WebSocket',
        'Database',
        'AI/ML',
        'Game Development',
        'REST APIs',
        'Docker',
        'VS Code'
    ]
};

export default function SkillsSection() {
    return (
        <section id="skills" className="skills-section">
            <div className="skills-container">
                <h2 className="section-title">💼 Skills & Expertise</h2>

                {/* Languages */}
                <div className="skill-category">
                    <h3 className="category-title">Programming Languages</h3>
                    <div className="skill-bars">
                        {skills.languages.map((skill, index) => (
                            <div key={index} className="skill-item">
                                <div className="skill-header">
                                    <span className="skill-name">
                                        <span className="skill-icon">{skill.icon}</span>
                                        {skill.name}
                                    </span>
                                    <span className="skill-percentage">{skill.level}%</span>
                                </div>
                                <div className="skill-bar">
                                    <div
                                        className="skill-fill"
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Frameworks */}
                <div className="skill-category">
                    <h3 className="category-title">Frameworks & Libraries</h3>
                    <div className="skill-bars">
                        {skills.frameworks.map((skill, index) => (
                            <div key={index} className="skill-item">
                                <div className="skill-header">
                                    <span className="skill-name">
                                        <span className="skill-icon">{skill.icon}</span>
                                        {skill.name}
                                    </span>
                                    <span className="skill-percentage">{skill.level}%</span>
                                </div>
                                <div className="skill-bar">
                                    <div
                                        className="skill-fill"
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tools & Technologies */}
                <div className="skill-category">
                    <h3 className="category-title">Tools & Technologies</h3>
                    <div className="skill-badges">
                        {skills.tools.map((tool, index) => (
                            <span key={index} className="skill-badge">
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
