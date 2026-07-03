import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  GraduationCap,
  Languages,
  MapPin,
  Moon,
  PlayCircle,
  Sun,
} from 'lucide-react'
import QRCode from 'qrcode'
import './App.css'
import { type Locale, type ProjectItem, type ProjectVisualKind, type SectionId, profile } from './profile'

const sectionIds: SectionId[] = ['profile', 'experience', 'skills', 'projects', 'education', 'contact']

type Theme = 'light' | 'dark'

const projectVisuals: Record<ProjectVisualKind, { accent: string; label: string; tone: string }> = {
  'energy-grid': { accent: 'var(--accent)', label: 'AOM', tone: 'var(--muted)' },
  'ems-dashboard': { accent: 'var(--accent)', label: 'EMS', tone: 'var(--muted)' },
  microgrid: { accent: 'var(--accent)', label: 'DER', tone: 'var(--muted)' },
  'air-traffic': { accent: 'var(--accent)', label: 'iNM', tone: 'var(--muted)' },
  'mobile-robot': { accent: 'var(--accent)', label: 'GASBOT', tone: 'var(--muted)' },
  'agv-safety': { accent: 'var(--accent)', label: 'SAFE-AGV', tone: 'var(--muted)' },
  cobot: { accent: 'var(--accent)', label: 'COBOT', tone: 'var(--muted)' },
  'industrial-data': { accent: 'var(--accent)', label: 'DATA', tone: 'var(--muted)' },
  'health-data': { accent: 'var(--accent)', label: 'HigIA', tone: 'var(--muted)' },
  dna: { accent: 'var(--accent)', label: 'DNA', tone: 'var(--muted)' },
  fitness: { accent: 'var(--accent)', label: 'AURA', tone: 'var(--muted)' },
  market: { accent: 'var(--accent)', label: 'MARKET', tone: 'var(--muted)' },
  'public-data': { accent: 'var(--accent)', label: 'INE', tone: 'var(--muted)' },
  mobility: { accent: 'var(--accent)', label: 'ROUTE', tone: 'var(--muted)' },
  biometrics: { accent: 'var(--accent)', label: 'BIO', tone: 'var(--muted)' },
  'project-management': { accent: 'var(--accent)', label: 'PM', tone: 'var(--muted)' },
}

function ProjectGlyph({ kind }: { kind: ProjectVisualKind }) {
  if (kind === 'dna') {
    return (
      <>
        <path className="visual-line strong" d="M118 82 C188 34 250 162 322 112 S452 84 520 132" />
        <path className="visual-line" d="M118 132 C188 84 250 212 322 162 S452 134 520 182" />
        {[0, 1, 2, 3, 4, 5].map((step) => (
          <line className="visual-line muted" key={step} x1={150 + step * 64} x2={176 + step * 64} y1={88 + (step % 2) * 34} y2={136 + (step % 2) * 34} />
        ))}
      </>
    )
  }

  if (kind === 'market' || kind === 'industrial-data' || kind === 'public-data' || kind === 'ems-dashboard') {
    return (
      <>
        <rect className="visual-panel" x="104" y="82" width="112" height="116" rx="8" />
        <rect className="visual-panel" x="244" y="60" width="280" height="162" rx="8" />
        {[0, 1, 2, 3, 4, 5].map((step) => (
          <rect className="visual-bar" key={step} x={286 + step * 34} y={164 - step * 15} width="16" height={36 + step * 15} rx="4" />
        ))}
        <path className="visual-line strong" d="M276 176 L326 138 L376 152 L432 94 L492 118" />
      </>
    )
  }

  if (kind === 'air-traffic') {
    return (
      <>
        <path className="visual-line strong" d="M96 186 C178 86 284 72 386 126 C440 154 484 150 540 96" />
        <path className="visual-line muted" d="M126 92 C240 188 354 210 510 164" />
        <polygon className="visual-fill" points="344,105 392,132 344,159 356,132" />
        {[112, 234, 438, 512].map((x, index) => (
          <circle className="visual-node" key={x} cx={x} cy={index % 2 ? 170 : 116} r="10" />
        ))}
      </>
    )
  }

  if (kind === 'mobile-robot' || kind === 'agv-safety' || kind === 'cobot') {
    return (
      <>
        <rect className="visual-panel" x="152" y="146" width="268" height="70" rx="18" />
        <circle className="visual-node strong" cx="206" cy="222" r="18" />
        <circle className="visual-node strong" cx="366" cy="222" r="18" />
        <path className="visual-line strong" d="M286 146 L330 88 L388 88" />
        <circle className="visual-node" cx="404" cy="88" r="22" />
        <path className="visual-line muted" d="M118 122 C178 72 254 58 334 66 C418 74 476 118 526 178" />
      </>
    )
  }

  if (kind === 'biometrics') {
    return (
      <>
        <path className="visual-line strong" d="M112 142 C178 68 274 68 340 142 C274 216 178 216 112 142 Z" />
        <circle className="visual-node strong" cx="226" cy="142" r="42" />
        <circle className="visual-fill" cx="226" cy="142" r="18" />
        <path className="visual-line muted" d="M398 72 V214 M438 72 V214 M478 72 V214" />
      </>
    )
  }

  if (kind === 'fitness') {
    return (
      <>
        <rect className="visual-panel" x="196" y="56" width="190" height="188" rx="26" />
        <path className="visual-line strong" d="M224 162 L264 162 L286 116 L322 206 L344 162 L384 162" />
        <circle className="visual-node" cx="292" cy="90" r="14" />
      </>
    )
  }

  if (kind === 'mobility') {
    return (
      <>
        <path className="visual-line strong" d="M102 190 C178 84 256 244 334 136 S454 84 532 176" />
        {[110, 322, 526].map((x, index) => (
          <circle className="visual-node strong" key={x} cx={x} cy={index === 1 ? 136 : 190} r="14" />
        ))}
        <rect className="visual-panel" x="242" y="78" width="92" height="42" rx="10" />
      </>
    )
  }

  if (kind === 'project-management') {
    return (
      <>
        <rect className="visual-panel" x="112" y="78" width="390" height="144" rx="8" />
        {[0, 1, 2].map((row) => (
          <g key={row}>
            <line className="visual-line muted" x1="148" x2="468" y1={116 + row * 36} y2={116 + row * 36} />
            <rect className="visual-bar" x={182 + row * 42} y={104 + row * 36} width={138 - row * 18} height="18" rx="6" />
          </g>
        ))}
      </>
    )
  }

  return (
    <>
      <path className="visual-line muted" d="M106 196 L190 118 L272 158 L362 86 L514 160" />
      <circle className="visual-node strong" cx="190" cy="118" r="14" />
      <circle className="visual-node" cx="272" cy="158" r="12" />
      <circle className="visual-node strong" cx="362" cy="86" r="14" />
      <rect className="visual-panel" x="116" y="78" width="118" height="84" rx="8" />
      <rect className="visual-panel" x="392" y="116" width="122" height="82" rx="8" />
    </>
  )
}

function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  const visual = projectVisuals[kind]

  return (
    <svg
      aria-hidden="true"
      className="project-visual"
      style={
        {
          '--visual-accent': visual.accent,
          '--visual-tone': visual.tone,
        } as CSSProperties
      }
      viewBox="0 0 640 320"
    >
      <rect className="visual-backdrop" x="0" y="0" width="640" height="320" rx="0" />
      <path className="visual-grid" d="M72 64 H568 M72 128 H568 M72 192 H568 M72 256 H568 M128 40 V280 M256 40 V280 M384 40 V280 M512 40 V280" />
      <ProjectGlyph kind={kind} />
      <text className="visual-label" x="42" y="64">
        {visual.label}
      </text>
    </svg>
  )
}

function ProjectImage({ locale, project }: { locale: Locale; project: ProjectItem }) {
  const [failed, setFailed] = useState(false)

  if (project.previewVideo) {
    return (
      <div className="project-media">
        <a className="project-image-link" href={project.link} target="_blank" rel="noreferrer" aria-label={project.title[locale]}>
          <video
            className="project-video-preview"
            src={project.previewVideo}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setFailed(true)}
          />
        </a>
        <a className="image-credit" href={project.imageCredit.sourceUrl} target="_blank" rel="noreferrer">
          {project.imageCredit.license} · {project.imageCredit.author}
        </a>
      </div>
    )
  }

  return (
    <div className="project-media">
      <a className="project-image-link" href={project.link} target="_blank" rel="noreferrer" aria-label={project.title[locale]}>
        {failed ? (
          <ProjectVisual kind={project.visual} />
        ) : (
          <img
            src={project.image}
            alt={project.title[locale]}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
      </a>
      <a className="image-credit" href={project.imageCredit.sourceUrl} target="_blank" rel="noreferrer">
        {project.imageCredit.license} · {project.imageCredit.author}
      </a>
    </div>
  )
}

function getInitialSection(): SectionId {
  const hash = window.location.hash.replace('#', '') as SectionId
  return sectionIds.includes(hash) ? hash : 'profile'
}

function getInitialTheme(): Theme {
  const storedTheme = window.localStorage.getItem('theme')
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [locale, setLocale] = useState<Locale>('es')
  const [activeSection, setActiveSection] = useState<SectionId>(getInitialSection)
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [navIndicator, setNavIndicator] = useState({ width: 0, x: 0 })
  const [navSquishing, setNavSquishing] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const navRef = useRef<HTMLElement | null>(null)
  const tabRefs = useRef(new Map<SectionId, HTMLButtonElement>())
  const terminalInputRef = useRef<HTMLInputElement | null>(null)
  const squishEpochRef = useRef(0)
  const nextLocale: Locale = locale === 'es' ? 'en' : 'es'

  const [terminalPhase, setTerminalPhase] = useState<'typing' | 'output' | 'idle' | 'error'>('typing')
  const [typedCommand, setTypedCommand] = useState('')
  const [terminalInput, setTerminalInput] = useState('')
  const [errorCommand, setErrorCommand] = useState('')
  const [terminalStarted, setTerminalStarted] = useState(false)
  const terminalRef = useRef<HTMLElement | null>(null)
  const terminalStartedRef = useRef(false)

  useEffect(() => {
    if (activeSection !== 'profile') {
      setTerminalStarted(false)
      terminalStartedRef.current = false
      return
    }
    setTerminalPhase('typing')
    setTypedCommand('')
    setTerminalInput('')
    setErrorCommand('')
    setTerminalStarted(false)
    terminalStartedRef.current = false

    const handleScroll = () => {
      const el = terminalRef.current
      if (!el || terminalStartedRef.current) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        terminalStartedRef.current = true
        setTerminalStarted(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection])

  useEffect(() => {
    if (terminalPhase !== 'typing' || !terminalStarted) return
    const fullCommand = 'cat profile_summary.txt'
    let i = 0
    const interval = setInterval(() => {
      if (i <= fullCommand.length) {
        setTypedCommand(fullCommand.slice(0, i))
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setTerminalPhase('output'), 350)
        setTimeout(() => {
          setTerminalPhase('idle')
          setTimeout(() => terminalInputRef.current?.focus(), 60)
        }, 550)
      }
    }, 55)
    return () => clearInterval(interval)
  }, [terminalPhase, terminalStarted])

  const handleTerminalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && terminalInput.trim()) {
      setErrorCommand(terminalInput)
      setTerminalInput('')
      setTerminalPhase('error')
      setTimeout(() => {
        setTerminalPhase('idle')
        setErrorCommand('')
        setTimeout(() => terminalInputRef.current?.focus(), 60)
      }, 3000)
    }
  }

  const [skillsAnimated, setSkillsAnimated] = useState(false)

  useEffect(() => {
    if (activeSection === 'skills' && !skillsAnimated) {
      const timer = setTimeout(() => setSkillsAnimated(true), 120)
      return () => clearTimeout(timer)
    }
  }, [activeSection, skillsAnimated])

  useEffect(() => {
    const vCard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Guillermo Sierra-Maillo Martinez',
      'TEL:+0034622646261',
      'EMAIL:gsierra95@gmail.com',
      'END:VCARD',
    ].join('\n')

    QRCode.toDataURL(vCard, { margin: 1, width: 120 })
      .then(setQrDataUrl)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowQR(true), 60_000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '') as SectionId
      if (sectionIds.includes(hash)) {
        setActiveSection(hash)
      }
    }

    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const navElement = navRef.current
      const tabElement = tabRefs.current.get(activeSection)

      if (!navElement || !tabElement) {
        return
      }

      const navRect = navElement.getBoundingClientRect()
      const tabRect = tabElement.getBoundingClientRect()
      const x = tabRect.left - navRect.left

      setNavIndicator({
        width: tabRect.width,
        x,
      })
    }

    updateIndicator()

    const resizeObserver = new ResizeObserver(updateIndicator)
    if (navRef.current) {
      resizeObserver.observe(navRef.current)
    }
    tabRefs.current.forEach((tabElement) => resizeObserver.observe(tabElement))
    window.addEventListener('resize', updateIndicator)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateIndicator)
    }
  }, [activeSection, locale])

  const selectSection = (section: SectionId) => {
    if (section === activeSection) return
    const epoch = ++squishEpochRef.current
    setActiveSection(section)
    setNavSquishing(true)
    setTimeout(() => {
      if (epoch === squishEpochRef.current) {
        setNavSquishing(false)
      }
    }, 160)
    window.history.replaceState(null, '', `#${section}`)
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  const renderProjectGrid = (projects: ProjectItem[]) => (
    <div className="project-grid">
      {projects.map((project) => (
        <article className="project-card" key={project.title[locale]}>
          <ProjectImage locale={locale} project={project} />
          <div className="project-content">
            <div>
              <h3>
                <a href={project.link} target="_blank" rel="noreferrer">
                  {project.title[locale]}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </h3>
              <p>{project.summary[locale]}</p>
            </div>
            {project.details ? (
              <ul className="project-details">
                {project.details.map((detail) => (
                  <li key={detail[locale]}>{detail[locale]}</li>
                ))}
              </ul>
            ) : null}
            {project.videoUrl ? (
              <a className="project-video-link" href={project.videoUrl} target="_blank" rel="noreferrer">
                <PlayCircle size={16} aria-hidden="true" />
                <span>{locale === 'es' ? 'Ver vídeo' : 'Watch video'}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ) : null}
            <div className="tag-row">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  )

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={() => selectSection('profile')} aria-label={profile.shortName}>
          <img className="brand-logo" src={theme === 'dark' ? '/logo-gsm-light.png' : '/logo-gsm-dark.png'} alt="" />
        </button>
        <nav
          className="nav-links"
          aria-label="Main navigation"
          ref={navRef}
          role="tablist"
          style={
            {
              '--active-tab-w': `${navIndicator.width}px`,
              '--active-tab-x': `${navIndicator.x}px`,
              '--nav-squish-w': navSquishing ? '0.55' : '1',
              '--nav-squish-y': navSquishing ? '0.5' : '1',
            } as CSSProperties
          }
        >
          {profile.nav[locale].map(([target, label]) => {
            const section = target as SectionId
            return (
              <button
                aria-controls={`panel-${section}`}
                aria-selected={activeSection === section}
                className="tab-link"
                id={`tab-${section}`}
                key={section}
                onClick={() => selectSection(section)}
                ref={(element) => {
                  if (element) {
                    tabRefs.current.set(section, element)
                  } else {
                    tabRefs.current.delete(section)
                  }
                }}
                role="tab"
                type="button"
              >
                {label}
              </button>
            )
          })}
        </nav>
        <div className="topbar-actions">
          <button
            className="theme-button"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
        <button
          className="language-button"
          type="button"
          onClick={() => setLocale(nextLocale)}
          aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a español'}
        >
          <Languages size={18} aria-hidden="true" />
          <span>{nextLocale.toUpperCase()}</span>
        </button>
        </div>
      </header>

      <main id="top">
        {activeSection === 'profile' ? (
          <section
            aria-labelledby="tab-profile"
            className="panel-shell profile-panel"
            id="panel-profile"
            role="tabpanel"
          >
            <div className="hero-section">
              <div className="hero-copy">
                <p className="eyebrow">{profile.hero.eyebrow[locale]}</p>
                <h1 id="hero-title">{profile.hero.title[locale]}</h1>
                <p className="role-line">{profile.hero.role[locale]}</p>
                <p className="hero-summary">{profile.hero.summary[locale]}</p>
                <div className="hero-actions">
                  <a className="primary-link" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                    <ExternalLink size={18} aria-hidden="true" />
                    <span>{profile.hero.primaryAction[locale]}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  <a className="secondary-link" href={profile.links.github} target="_blank" rel="noreferrer">
                    <Code2 size={18} aria-hidden="true" />
                    <span>{profile.hero.githubAction[locale]}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  <button className="secondary-link" type="button" onClick={() => selectSection('projects')}>
                    <ArrowDown size={17} aria-hidden="true" />
                    <span>{profile.hero.secondaryAction[locale]}</span>
                  </button>
                  <a className="secondary-link" href="/cv.pdf" download>
                    <Download size={17} aria-hidden="true" />
                    <span>CV</span>
                  </a>
                </div>
              </div>

              <aside className="identity-panel" aria-label={profile.name}>
                <div className="portrait-frame">
                  <img src="/profile.webp" alt={profile.name} />
                </div>
                <div className="identity-copy">
                  <p>{profile.name}</p>
                  <span>
                    <MapPin size={15} aria-hidden="true" />
                    {profile.location[locale]}
                  </span>
                </div>
              </aside>
            </div>

            <section className="fact-strip" aria-label="Professional facts">
              {profile.facts.map((fact) => (
                <div className="fact-item" key={fact.label[locale]}>
                  <span>{fact.label[locale]}</span>
                  <strong>{fact.value[locale]}</strong>
                </div>
              ))}
            </section>

            <section className="terminal-window" aria-label="Terminal profile summary" ref={terminalRef}>
              <div className="terminal-titlebar">
                <span className="terminal-titlebar-dots">
                  <span className="terminal-dot terminal-dot--close" />
                  <span className="terminal-dot terminal-dot--minimize" />
                  <span className="terminal-dot terminal-dot--maximize" />
                </span>
                <span className="terminal-title">gjsierra@ubuntu: ~</span>
              </div>
              <div className="terminal-body">
                <p className="terminal-line">
                  <span className="terminal-prompt">
                    gjsierra@ubuntu:<span className="prompt-path">~</span>$
                  </span>
                  {' '}{typedCommand}
                  {terminalPhase === 'typing' && <span className="terminal-cursor">█</span>}
                </p>

                {terminalPhase !== 'typing' && (
                  <>
                    <p className="terminal-line terminal-line--blank">&nbsp;</p>
                    {profile.intro.paragraphs.flatMap((paragraph, i) => [
                      <p key={`p-${i}`} className="terminal-output">{paragraph[locale]}</p>,
                      i < profile.intro.paragraphs.length - 1 ? <p key={`b-${i}`} className="terminal-line terminal-line--blank">&nbsp;</p> : null,
                    ]).filter(Boolean)}
                  </>
                )}

                {terminalPhase === 'error' && (
                  <>
                    <p className="terminal-line terminal-line--blank">&nbsp;</p>
                    <p className="terminal-line">
                      <span className="terminal-prompt">
                        gjsierra@ubuntu:<span className="prompt-path">~</span>$
                      </span>
                      {' '}{errorCommand}
                    </p>
                    <p className="terminal-output terminal-error">Segmentation fault (core dumped)</p>
                  </>
                )}

                {(terminalPhase === 'idle' || terminalPhase === 'output' || terminalPhase === 'error') && (
                  <p className="terminal-line terminal-input-line">
                    <span className="terminal-prompt">
                      gjsierra@ubuntu:<span className="prompt-path">~</span>$
                    </span>
                    {' '}
                    <input
                      ref={terminalInputRef}
                      className="terminal-input"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      onKeyDown={handleTerminalKeyDown}
                      spellCheck={false}
                      autoComplete="off"
                      aria-label="Terminal input"
                    />
                  </p>
                )}
              </div>
            </section>
          </section>
        ) : null}

        {activeSection === 'experience' ? (
          <section
            aria-labelledby="tab-experience"
            className="panel-shell"
            id="panel-experience"
            role="tabpanel"
          >
            <div className="section-heading panel-heading">
              <BriefcaseBusiness size={20} aria-hidden="true" />
              <h2>{profile.labels.experience[locale]}</h2>
            </div>
            <div className="timeline">
              {profile.experience.map((item) => (
                <article className="experience-card" key={`${item.company}-${item.period.es}`}>
                  <div className="experience-header">
                    <a className="company-logo" href={item.url} target="_blank" rel="noreferrer">
                      <img src={item.logo} alt={`${item.company} logo`} loading="lazy" />
                    </a>
                    <div>
                      <div className="card-kicker">
                        <span>{item.period[locale]}</span>
                        {item.place ? <span>{item.place[locale]}</span> : null}
                      </div>
                      <h3>{item.role[locale]}</h3>
                      <a className="company" href={item.url} target="_blank" rel="noreferrer">
                        {item.company}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                      <p className="company-summary">{item.companySummary[locale]}</p>
                    </div>
                  </div>
                  {item.stack ? (
                    <div className="experience-stack" aria-label="Technology stack">
                      {item.stack.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>
                  ) : null}
                  <div className="xyz-grid">
                    <div className="xyz-item">
                      <span>{profile.labels.achievement[locale]}</span>
                      <p>{item.xyz.achievement[locale]}</p>
                    </div>
                    <div className="xyz-item">
                      <span>{profile.labels.measuredBy[locale]}</span>
                      <p>{item.xyz.measuredBy[locale]}</p>
                    </div>
                    <div className="xyz-item">
                      <span>{profile.labels.execution[locale]}</span>
                      <p>{item.xyz.execution[locale]}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {activeSection === 'skills' ? (
          <section aria-labelledby="tab-skills" className="panel-shell" id="panel-skills" role="tabpanel">
            <div className="section-heading panel-heading">
              <Cpu size={20} aria-hidden="true" />
              <h2>{profile.labels.skills[locale]}</h2>
            </div>
            <div className="skill-grid">
              {profile.skillGroups.map((group) => {
                let skillIdx = 0
                return (
                <article className="skill-card" key={group.title[locale]}>
                  <h3>{group.title[locale]}</h3>
                  <div className="skill-meter-list">
                    {group.skills.map((skill) => {
                      const idx = skillIdx++
                      const duration = 550 + (idx % 5) * 170 + (skill.level / 100) * 350
                      return (
                      <div className="skill-meter" key={skill.name[locale]}>
                        <div className="skill-meter-head">
                          <span>{skill.name[locale]}</span>
                          <strong>{skillsAnimated ? `${skill.level}%` : '0%'}</strong>
                        </div>
                        <div className="skill-bar" aria-hidden="true">
                          <span
                            style={{
                              '--skill-level': skillsAnimated ? `${skill.level}%` : '0%',
                              transitionDuration: `${duration}ms`,
                            } as CSSProperties}
                          />
                        </div>
                      </div>
                      )
                    })}
                  </div>
                </article>
                )
              })}
            </div>
          </section>
        ) : null}

        {activeSection === 'projects' ? (
          <section aria-labelledby="tab-projects" className="panel-shell" id="panel-projects" role="tabpanel">
            <div className="section-heading panel-heading">
              <BriefcaseBusiness size={20} aria-hidden="true" />
              <h2>{profile.labels.projects[locale]}</h2>
            </div>
            <div className="project-section">
              <div className="project-section-heading">
                <p className="eyebrow">{locale === 'es' ? 'Impacto industrial' : 'Industrial impact'}</p>
                <h3>{locale === 'es' ? 'Proyectos profesionales' : 'Professional projects'}</h3>
              </div>
              {renderProjectGrid(profile.professionalProjects)}
            </div>
            <div className="project-section">
              <div className="project-section-heading">
                <p className="eyebrow">{locale === 'es' ? 'Laboratorio personal' : 'Personal lab'}</p>
                <h3>{locale === 'es' ? 'Proyectos personales' : 'Personal projects'}</h3>
              </div>
              {renderProjectGrid(profile.personalProjects)}
            </div>
          </section>
        ) : null}

        {activeSection === 'education' ? (
          <section aria-labelledby="tab-education" className="panel-shell split-section" id="panel-education" role="tabpanel">
            <div>
              <div className="section-heading panel-heading">
                <GraduationCap size={20} aria-hidden="true" />
                <h2>{profile.labels.education[locale]}</h2>
              </div>
              {profile.education.map((item) => (
                <article className="education-block" key={item.degree.es}>
                  <div className="education-head">
                    {item.logos ? (
                      <div className="education-logos" aria-hidden="true">
                        {item.logos.map((logo) => (
                          <a className="education-logo" href={logo.url ?? item.url} key={logo.src} target="_blank" rel="noreferrer">
                            <img src={logo.src} alt={logo.alt} loading="lazy" />
                          </a>
                        ))}
                      </div>
                    ) : null}
                    <div className="education-title-group">
                      <h3>
                        {item.url ? (
                          <a href={item.url} target="_blank" rel="noreferrer">
                            {item.degree[locale]}
                            <ArrowUpRight size={16} aria-hidden="true" />
                          </a>
                        ) : (
                          item.degree[locale]
                        )}
                      </h3>
                      <p>{item.institution}</p>
                    </div>
                  </div>
                  <span>
                    {item.period[locale]} · {item.place[locale]}
                  </span>
                  {item.details ? (
                    <ul>
                      {item.details.map((detail) => (
                        <li key={detail[locale]}>
                          {detail.url ? (
                            <a href={detail.url} target="_blank" rel="noreferrer">
                              {detail[locale]}
                              <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                          ) : (
                            detail[locale]
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
            <div>
              <div className="section-heading compact">
                <GraduationCap size={20} aria-hidden="true" />
                <h2>{profile.labels.certifications[locale]}</h2>
              </div>
              <ul className="certification-list">
                {profile.certifications.map((certification) => (
                  <li className={certification.featured ? 'certification-item featured' : 'certification-item'} key={`${certification.title}-${certification.period.es}`}>
                    <img src={certification.icon} alt="" loading="lazy" />
                    <div className="certification-copy">
                      {certification.url ? (
                        <a className="certification-title" href={certification.url} target="_blank" rel="noreferrer">
                          {certification.title}
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="certification-title">{certification.title}</span>
                      )}
                      <span className="certification-meta">
                        {certification.issuer} · {certification.period[locale]}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {activeSection === 'contact' ? (
          <section aria-labelledby="tab-contact" className="panel-shell contact-section" id="panel-contact" role="tabpanel">
            <h2>{profile.contact.title[locale]}</h2>
            <p>{profile.contact.text[locale]}</p>
            <div className="contact-actions">
              <a className="primary-link contact-link" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                <ExternalLink size={18} aria-hidden="true" />
                <span>{profile.contact.action[locale]}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a className="contact-alt-link" href={profile.links.github} target="_blank" rel="noreferrer">
                <Code2 size={18} aria-hidden="true" />
                <span>{profile.contact.githubAction[locale]}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </section>
        ) : null}
      </main>

      {showQR && qrDataUrl ? (
        <aside className="qr-card" aria-label="Contact QR code">
          <img src={qrDataUrl} alt="Contact QR" className="qr-image" />
        </aside>
      ) : null}
    </div>
  )
}

export default App
