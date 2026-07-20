import { useEffect, useState } from 'react'

const content = {
  en: {
    command: 'khaled --profile',
    lines: [
      ['location', 'Paris, France'],
      ['education', 'Computer Science · Sorbonne University'],
      ['focus', 'Web apps · Developer tools · Real-time systems'],
      ['languages', 'French · English · Arabic'],
      ['status', 'Open to internships and software roles'],
    ],
    ready: 'Profile loaded successfully.',
  },
  fr: {
    command: 'khaled --profil',
    lines: [
      ['localisation', 'Paris, France'],
      ['formation', 'Informatique · Sorbonne Université'],
      ['spécialités', 'Applications web · Outils · Systèmes temps réel'],
      ['langues', 'Français · Anglais · Arabe'],
      ['statut', 'Ouvert aux stages et postes en développement'],
    ],
    ready: 'Profil chargé avec succès.',
  },
}

export default function Terminal({ lang = 'en' }) {
  const [visible, setVisible] = useState(0)
  const t = content[lang]

  useEffect(() => {
    setVisible(0)
    const timer = setInterval(() => {
      setVisible(current => {
        if (current >= t.lines.length + 1) {
          clearInterval(timer)
          return current
        }
        return current + 1
      })
    }, 260)
    return () => clearInterval(timer)
  }, [lang, t.lines.length])

  return (
    <section className="terminalSection" aria-label="Developer profile terminal">
      <div className="terminalWindow">
        <div className="terminalBar">
          <div className="terminalDots"><span /><span /><span /></div>
          <span>khaled@portfolio:~</span>
          <span className="terminalMode">bash</span>
        </div>
        <div className="terminalBody">
          <p><span className="prompt">khaled@portfolio</span><span className="path">:~$</span> {t.command}</p>
          <div className="terminalOutput">
            {t.lines.map(([key, value], index) => (
              <p className={visible > index ? 'shown' : ''} key={key}>
                <span>{key.padEnd(13, ' ')}</span><strong>{value}</strong>
              </p>
            ))}
            <p className={visible > t.lines.length ? 'shown success' : ''}>✓ {t.ready}</p>
          </div>
          <p className="terminalCursor"><span className="prompt">khaled@portfolio</span><span className="path">:~$</span> <i /></p>
        </div>
      </div>
    </section>
  )
}
