import React from 'react';

const experiences = [
  { company: 'LFI-Victor Hugo',           role: 'Full Stack Web Developer',           date: 'March 2024 - July 2025' },
  { company: 'Self-Employed', role: 'SanAndres-Multiplayer (C/Pawn) and FiveM (LUA) Server Developer',          date: 'May 2023 – Present' },
  { company: 'Self-Employed', role: 'Open Source Developer on Github',          date: 'May 2023 – Present' },
];

const projects = [
  {
    name: (
      <a
        href="https://olympiadaexplorer.online"
        target="_blank"
        rel="noopener noreferrer"
      >
        OlympiadaExplorer
      </a>
    ),
    desc: "AI-Touristic Guide Agent for the Paris 2024 Olympics",
  },
  {
    name: (
      <a
        href="https://github.com/khaledouriemmi/CryptoPlus"
        target="_blank"
        rel="noopener noreferrer"
      >
        CyrptoPlus
      </a>
    ),
    desc: "Qt App to encrypt and decrypt Text using various methods",
  },
  {
    name: (
      <a
        href="https://github.com/khaledouriemmi/Chemical-Reaction-GUI-Application"
        target="_blank"
        rel="noopener noreferrer"
      >
        ChemicalReactor
      </a>
    ),
    desc: "Tkinter GUI App that calculates the limitant reactant in a chemical reaction",
  },
  {
    name: (
      <a
        href="https://github.com/khaledouriemmi/BiblioManager"
        target="_blank"
        rel="noopener noreferrer"
      >
        BiblioManager
      </a>
    ),
    desc: "Public Book Library Loan Management System",
  },
];

export default function ExpProjectsSection() {
  return (
    <section id="experience" className="exp-pro-section">
      {/* — Left: Experience — */}
      <div className="experience-col">
        <h2 className="section-title">Experience</h2>
        <div className="exp-cards">
          {experiences.map((e,i) => (
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
        <div className="proj-cards">
          {projects.map((p,i) => (
            <div key={i} className="proj-card">
              <h2 className="proj-title">{p.name}</h2>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
