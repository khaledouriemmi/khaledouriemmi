import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Download, Github, Languages, Linkedin, Mail, MapPin } from 'lucide-react'
import './globals.css'
import Terminal from './assets/components/Terminal'

const copy = {
  en: {
    nav: ['About', 'Work', 'Experience', 'Contact'],
    availability: 'Open to internships & software roles',
    eyebrow: 'Computer science student · Software developer',
    hero: 'I build useful software with curiosity, clarity, and care.',
    intro: 'Tunisian developer studying Computer Science at Sorbonne University in Paris. I turn complex ideas into reliable web experiences, developer tools, and playful systems.',
    viewWork: 'Explore my work',
    resume: 'Download résumé',
    resumeEnglish: 'English CV',
    resumeFrench: 'French CV',
    based: 'Based in Paris, France',
    aboutKicker: 'A little about me',
    aboutTitle: 'Engineering mindset, global perspective.',
    about: 'I started programming at 14 and never stopped exploring. From multiplayer game servers to interpreters and real-time web apps, I learn by building. I care about thoughtful interfaces, clean systems, and software that solves a real problem.',
    stat1: 'years building',
    stat2: 'featured projects',
    stat3: 'languages spoken',
    workKicker: 'Selected work',
    workTitle: 'Projects with purpose.',
    workIntro: 'A focused selection across real-time web, AI, developer tooling, and programming languages.',
    viewCode: 'View repository',
    experienceKicker: 'Experience',
    experienceTitle: 'Learning in the open.',
    present: 'Present',
    skills: 'Core toolkit',
    contactKicker: 'Let’s work together',
    contactTitle: 'Have an idea worth building?',
    contactText: 'I’m interested in internships, junior software roles, and ambitious collaborations in France, Tunisia, or remotely.',
    email: 'Send me an email',
    footer: 'Designed and built by Khaled Ouriemmi.',
    projects: [
      ['QuizLAN 2.0', 'A real-time multiplayer quiz platform for teachers and students, designed to work reliably over a local network.', ['JavaScript', 'WebSocket', 'Real-time'], 'https://github.com/khaledouriemmi/QuizLAN-2.0', '01'],
      ['Djerba', 'A custom programming language and interpreter—an exploration of parsing, language design, and developer experience.', ['Python', 'Interpreter', 'Compiler'], 'https://github.com/khaledouriemmi/Djerba', '02'],
      ['Olympic Explorer', 'An AI-powered travel companion built to help visitors discover Paris during the 2024 Olympic Games.', ['Python', 'AI', 'Recommendations'], 'https://github.com/khaledouriemmi/Olympic-Explorer', '03'],
      ['Class Scheduler', 'A smarter scheduling tool that detects conflicts and helps turn complex timetables into practical plans.', ['React', 'Algorithms', 'UX'], 'https://github.com/khaledouriemmi/class-scheduler', '04'],
      ['CryptoPlus', 'A desktop cryptography toolkit supporting classic ciphers through an approachable graphical interface.', ['Python', 'PyQt5', 'Cryptography'], 'https://github.com/khaledouriemmi/CryptoPlus', '05'],
      ['BiblioManager', 'A complete library lending system for managing books, members, and borrowing workflows.', ['Python', 'Database', 'Desktop'], 'https://github.com/khaledouriemmi/BiblioManager', '06'],
    ],
    experiences: [
      ['MelyaKids · Melya Conseils et Formations', 'Algorithms, Robotics & Applied Mathematics Instructor', 'Jul 2026 — Present', 'Teaching algorithms, robotics, and applied mathematics to children and teenagers through practical, engaging activities.'],
      ['VH-News · LFI Victor Hugo', 'Founder & Lead Full-stack Web Developer', 'Mar 2024 — May 2025', 'Founded and led development of VH-News, the official school journal of Lycée Français International Victor Hugo in Djerba.'],
      ['Independent', 'Open-source developer', 'May 2023 — Present', 'Designing, shipping, and documenting public software projects across web and tooling.'],
      ['Independent', 'Multiplayer server developer', 'May 2023 — Present', 'Developing custom SA-MP and FiveM systems with C/Pawn and Lua.'],
    ],
  },
  fr: {
    nav: ['Profil', 'Projets', 'Expérience', 'Contact'],
    availability: 'Ouvert aux stages et postes en développement',
    eyebrow: 'Étudiant en informatique · Développeur logiciel',
    hero: 'Je conçois des logiciels utiles avec curiosité, clarté et exigence.',
    intro: 'Développeur tunisien et étudiant en informatique à Sorbonne Université, à Paris. Je transforme des idées complexes en expériences web fiables, outils techniques et systèmes créatifs.',
    viewWork: 'Découvrir mes projets',
    resume: 'Télécharger mon CV',
    resumeEnglish: 'CV anglais',
    resumeFrench: 'CV français',
    based: 'Basé à Paris, France',
    aboutKicker: 'Quelques mots sur moi',
    aboutTitle: 'Rigueur technique, perspective internationale.',
    about: 'J’ai commencé à programmer à 14 ans et je n’ai jamais cessé d’explorer. Des serveurs de jeux multijoueurs aux interpréteurs et applications web temps réel, j’apprends en construisant. J’accorde de l’importance aux interfaces soignées, aux systèmes clairs et aux logiciels qui répondent à un vrai besoin.',
    stat1: 'années de pratique',
    stat2: 'projets sélectionnés',
    stat3: 'langues parlées',
    workKicker: 'Projets sélectionnés',
    workTitle: 'Des projets qui ont du sens.',
    workIntro: 'Une sélection ciblée : web temps réel, intelligence artificielle, outils techniques et langages de programmation.',
    viewCode: 'Voir le dépôt',
    experienceKicker: 'Expérience',
    experienceTitle: 'Apprendre en construisant.',
    present: 'Aujourd’hui',
    skills: 'Compétences clés',
    contactKicker: 'Travaillons ensemble',
    contactTitle: 'Une idée qui mérite d’exister ?',
    contactText: 'Je recherche des stages, postes junior en développement et collaborations ambitieuses en France, en Tunisie ou à distance.',
    email: 'M’envoyer un email',
    footer: 'Conçu et développé par Khaled Ouriemmi.',
    projects: [
      ['QuizLAN 2.0', 'Une plateforme de quiz multijoueur en temps réel pour enseignants et élèves, pensée pour fonctionner sur un réseau local.', ['JavaScript', 'WebSocket', 'Temps réel'], 'https://github.com/khaledouriemmi/QuizLAN-2.0', '01'],
      ['Djerba', 'Un langage de programmation et son interpréteur : une exploration du parsing, de la conception de langages et de l’expérience développeur.', ['Python', 'Interpréteur', 'Compilateur'], 'https://github.com/khaledouriemmi/Djerba', '02'],
      ['Olympic Explorer', 'Un guide touristique alimenté par l’IA pour aider les visiteurs à découvrir Paris pendant les Jeux olympiques 2024.', ['Python', 'IA', 'Recommandation'], 'https://github.com/khaledouriemmi/Olympic-Explorer', '03'],
      ['Class Scheduler', 'Un outil de planification intelligent qui détecte les conflits et simplifie les emplois du temps complexes.', ['React', 'Algorithmes', 'UX'], 'https://github.com/khaledouriemmi/class-scheduler', '04'],
      ['CryptoPlus', 'Une boîte à outils de cryptographie avec interface graphique, prenant en charge plusieurs chiffrements classiques.', ['Python', 'PyQt5', 'Cryptographie'], 'https://github.com/khaledouriemmi/CryptoPlus', '05'],
      ['BiblioManager', 'Un système complet de gestion des prêts pour administrer livres, adhérents et emprunts.', ['Python', 'Base de données', 'Desktop'], 'https://github.com/khaledouriemmi/BiblioManager', '06'],
    ],
    experiences: [
      ['MelyaKids · Melya Conseils et Formations', 'Formateur en algorithmique, robotique et mathématiques appliquées', 'Juil. 2026 — Aujourd’hui', 'Formation d’enfants et d’adolescents à l’algorithmique, à la robotique et aux mathématiques appliquées à travers des activités pratiques et engageantes.'],
      ['VH-News · LFI Victor Hugo', 'Fondateur et Lead Développeur Web Full Stack', 'Mars 2024 — Mai 2025', 'Création et direction du développement de VH-News, le journal officiel du Lycée Français International Victor Hugo de Djerba.'],
      ['Indépendant', 'Développeur open source', 'Mai 2023 — Aujourd’hui', 'Conception, livraison et documentation de projets publics orientés web et outils.'],
      ['Indépendant', 'Développeur de serveurs multijoueurs', 'Mai 2023 — Aujourd’hui', 'Développement de systèmes SA-MP et FiveM sur mesure en C/Pawn et Lua.'],
    ],
  },
}

const tools = ['Python', 'JavaScript', 'React', 'Node.js', 'C / Pawn', 'Lua', 'SQL', 'WebSocket', 'Git', 'REST APIs', 'AWS', 'Azure']

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('portfolio-language') || 'en')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[lang]

  useEffect(() => {
    localStorage.setItem('portfolio-language', lang)
    document.documentElement.lang = lang
    document.title = lang === 'fr' ? 'Khaled Ouriemmi — Développeur logiciel' : 'Khaled Ouriemmi — Software Developer'
  }, [lang])

  const changeLang = (next) => {
    setLang(next)
    setMenuOpen(false)
  }

  return (
    <div className="site">
      <header className="nav">
        <a className="brand" href="#top" aria-label="Home">KO<span>.</span></a>
        <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
        <nav className={menuOpen ? 'navLinks open' : 'navLinks'} aria-label="Main navigation">
          {['about', 'work', 'experience', 'contact'].map((id, i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{t.nav[i]}</a>)}
        </nav>
        <div className="language" aria-label="Language selector">
          <Languages size={16} />
          <button className={lang === 'en' ? 'active' : ''} onClick={() => changeLang('en')}>EN</button>
          <span>/</span>
          <button className={lang === 'fr' ? 'active' : ''} onClick={() => changeLang('fr')}>FR</button>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="heroGlow" />
          <div className="status"><span />{t.availability}</div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.hero}</h1>
          <p className="heroIntro">{t.intro}</p>
          <div className="heroActions">
            <a className="button primary" href="#work">{t.viewWork}<ArrowDownRight size={18} /></a>
            <div className="resumeDownloads" aria-label={t.resume}>
              <span><Download size={17} />{t.resume}</span>
              <a href="/Khaled_Ouriemmi_CV.pdf" download="Khaled_Ouriemmi_CV_EN.pdf">{t.resumeEnglish}</a>
              <a href="/CV_Khaled_Ouriemmi_FR.pdf" download="Khaled_Ouriemmi_CV_FR.pdf">{t.resumeFrench}</a>
            </div>
          </div>
          <div className="heroFoot">
            <span><MapPin size={16} />{t.based}</span>
            <div><a href="https://github.com/khaledouriemmi" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a><a href="https://linkedin.com/in/khaled-ouriemmi" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a></div>
          </div>
        </section>

        <Terminal lang={lang} />

        <section className="about section" id="about">
          <div><p className="kicker">{t.aboutKicker}</p><h2>{t.aboutTitle}</h2></div>
          <div className="aboutBody">
            <p>{t.about}</p>
            <div className="stats">
              <div><strong>5+</strong><span>{t.stat1}</span></div>
              <div><strong>13+</strong><span>{t.stat2}</span></div>
              <div><strong>3</strong><span>{t.stat3}</span></div>
            </div>
          </div>
        </section>

        <section className="section work" id="work">
          <p className="kicker">{t.workKicker}</p>
          <div className="sectionHeading"><h2>{t.workTitle}</h2><p>{t.workIntro}</p></div>
          <div className="projectGrid">
            {t.projects.map(([name, desc, tech, url, no]) => (
              <article className="project" key={name}>
                <div className="projectTop"><span>{no}</span><a href={url} target="_blank" rel="noreferrer" aria-label={`${t.viewCode}: ${name}`}><ArrowUpRight /></a></div>
                <h3>{name}</h3><p>{desc}</p>
                <div className="tags">{tech.map(item => <span key={item}>{item}</span>)}</div>
                <a className="textLink" href={url} target="_blank" rel="noreferrer">{t.viewCode}<ArrowUpRight size={15} /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="section experience" id="experience">
          <p className="kicker">{t.experienceKicker}</p>
          <div className="sectionHeading"><h2>{t.experienceTitle}</h2></div>
          <div className="timeline">
            {t.experiences.map(([company, role, date, desc], i) => (
              <article key={role}><span className="timelineNo">0{i + 1}</span><div><h3>{role}</h3><p className="company">{company}</p><p>{desc}</p></div><time>{date}</time></article>
            ))}
          </div>
          <div className="toolkit"><p>{t.skills}</p><div>{tools.map(tool => <span key={tool}>{tool}</span>)}</div></div>
        </section>

        <section className="contact section" id="contact">
          <p className="kicker">{t.contactKicker}</p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
          <a className="contactEmail" href="mailto:ouriemmikhaled@gmail.com">{t.email}<Mail /><ArrowUpRight /></a>
        </section>
      </main>
      <footer><span>© {new Date().getFullYear()} Mohamed Khaled Ouriemmi</span><span>{t.footer}</span></footer>
    </div>
  )
}
