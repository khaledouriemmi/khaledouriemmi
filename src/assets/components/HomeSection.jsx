import React from 'react';
import { Github } from 'lucide-react';
import { Linkedin } from 'lucide-react';

export default function HomeSection() {
  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }
        .navbar {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      <nav className="navbar">
        <a id="name">‹ Mohamed Khaled OURIEMMI ›</a>
        <div id="links">
          <a href="#about-me">about me</a>
          <a href="#experience">experience and projects</a>
          <a href="#contact">contact</a>
        </div>
      </nav>
      <section id="home" className="hero">
        <div className="overlay">
          <h1 style={{ fontSize: '62px', animation: 'bounce 2s infinite' }}>
            Mohamed Khaled OURIEMMI
          </h1>
          <h2 style={{ fontSize: '16px' }}>
            CS student - global citizen - software developer - meme junkie
          </h2>
          <p>
            Tunisian developer writing elegant solutions with imagination and rigor.
            Currently studying Computer Science at Sorbonne Université.
            Always seeking contribution, internships and full time opportunities.
          </p>
          <a href="Khaled Resume.pdf" className="btn-link">Download Resume</a>
        </div>
        <div className="socials">
          <a href="https://github.com/khaledouriemmi">
            <Github className="white_icon" width={35} height={35} />
          </a>
          <a href="https://linkedin.com/in/khaled-ouriemmi">
            <Linkedin className="white_icon" width={35} height={35} />
          </a>
        </div>
      </section>
    </>
  );
}
