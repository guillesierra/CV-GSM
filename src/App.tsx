import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Atom,
  Bot,
  Boxes,
  Braces,
  BriefcaseBusiness,
  Brackets,
  ChartNetwork,
  ChevronDown,
  CircuitBoard,
  Code2,
  CodeXml,
  Cloud,
  Coffee,
  Container,
  Cpu,
  Database,
  Download,
  Eye,
  ExternalLink,
  FileText,
  GitBranch,
  GraduationCap,
  Languages,
  Layers,
  MapPin,
  MessageCircle,
  MonitorCog,
  Moon,
  Network,
  PlayCircle,
  Rocket,
  ServerCog,
  ShieldCheck,
  ShipWheel,
  Sun,
  Terminal,
  TimerReset,
  TowerControl,
  TrainTrack,
  UtilityPole,
  Wifi,
  Workflow,
  Wrench,
} from 'lucide-react'
import QRCode from 'qrcode'
import './App.css'
import { type ExperienceItem, type Locale, type ProjectItem, type ProjectVisualKind, type SectionId, profile } from './profile'

const sectionIds: SectionId[] = ['profile', 'experience', 'skills', 'projects', 'education', 'contact']
const eagerPreviewVideo = (profile.professionalProjects as ProjectItem[]).find((project) => project.previewVideo)?.previewVideo

type Theme = 'light' | 'dark'
type ProjectCategory = 'professional' | 'personal' | 'academic'
type TimelineDate = {
  month: string
  year: string
}
type TimelineYears = {
  start: TimelineDate | null
  end: TimelineDate | null
}

const skillIconMap: Record<string, typeof Cpu> = {
  'C++': Braces,
  Python: Terminal,
  Go: Rocket,
  JavaScript: Brackets,
  Java: Coffee,
  'gRPC / REST APIs': Network,
  Protobuf: Boxes,
  'Vue.js / Vuex': Code2,
  'HTML5 / CSS3': CodeXml,
  React: Atom,
  'Industrial HMIs': MonitorCog,
  'Visual stability': Eye,
  'Data traceability': Database,
  Docker: Container,
  Kubernetes: ShipWheel,
  AWS: Cloud,
  'Linux / Bash': Terminal,
  Git: GitBranch,
  'CI/CD': Workflow,
  DevOps: ServerCog,
  'AGV / AMR': Bot,
  ROS: CircuitBoard,
  'PLC / CODESYS': Cpu,
  'Yaskawa robots': Wrench,
  'Digital twins': Layers,
  'Industrial IoT': Wifi,
  'Real-time systems': TimerReset,
  'Smart grids': UtilityPole,
  'EMS / DERMS / AOM': ChartNetwork,
  'Air Traffic Management': TowerControl,
  'Railway signalling': TrainTrack,
  'Industrial cybersecurity': ShieldCheck,
  Spanish: Languages,
  English: MessageCircle,
  Italian: Languages,
}

function parseTimelineDate(value: string | undefined, fallbackYear?: string): TimelineDate | null {
  const trimmedValue = value?.trim()
  if (!trimmedValue) return null

  const dateParts = trimmedValue.match(/^(.*?)\s*(\d{4})$/)
  if (dateParts) {
    return {
      month: dateParts[1].trim(),
      year: dateParts[2],
    }
  }

  if (fallbackYear) {
    return {
      month: trimmedValue,
      year: fallbackYear,
    }
  }

  return null
}

function getTimelineYears(item: ExperienceItem, locale: Locale): TimelineYears {
  const periodParts = item.period[locale].split(/\s+-\s+/)
  const isCurrent = /actualidad/i.test(item.period.es) || /present/i.test(item.period.en)
  const isConnectivityEngineer = item.role.es.includes('conectividad')
  const isResearchEngineer = item.role.es.includes('desarrollo') && item.role.es.includes('investigaci')
  const currentYear = '2026'

  return {
    start: isConnectivityEngineer ? null : parseTimelineDate(periodParts[0]),
    end: isResearchEngineer ? null : parseTimelineDate(periodParts[1], isCurrent ? currentYear : undefined),
  }
}

function getExperienceDisplayItems(items: ExperienceItem[]) {
  const professorIndex = items.findIndex((item) => item.role.es === 'Profesor asociado')
  const researchIndex = items.findIndex((item) => item.role.es === 'Ingeniero de desarrollo e investigación')

  if (professorIndex === -1 || researchIndex === -1 || professorIndex < researchIndex) {
    return items
  }

  const orderedItems = [...items]
  const [professorItem] = orderedItems.splice(professorIndex, 1)
  orderedItems.splice(researchIndex, 0, professorItem)
  return orderedItems
}

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
  const creditLabel = `${project.imageCredit.title}. ${project.imageCredit.author}. ${project.imageCredit.license}`

  if (project.previewVideo) {
    return (
      <div className="project-media">
        <a className="project-image-link" href={project.link} target="_blank" rel="noreferrer" aria-label={project.title[locale]}>
          {failed ? (
            <img
              src={project.image}
              alt={project.title[locale]}
              loading="lazy"
            />
          ) : (
            <video
              className="project-video-preview"
              src={project.previewVideo}
              autoPlay
              muted
              loop
              playsInline
              poster={project.image}
              preload="auto"
              onError={() => setFailed(true)}
            />
          )}
        </a>
        <a className="image-credit" href={project.imageCredit.sourceUrl} target="_blank" rel="noreferrer" aria-label={creditLabel} title={creditLabel}>
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
      <a className="image-credit" href={project.imageCredit.sourceUrl} target="_blank" rel="noreferrer" aria-label={creditLabel} title={creditLabel}>
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
  const [qrDismissed, setQrDismissed] = useState(() => window.localStorage.getItem('qrDismissed') === 'true')
  const [expandedMobileSections, setExpandedMobileSections] = useState<Record<string, boolean>>({})
  const [activeProjectCategory, setActiveProjectCategory] = useState<ProjectCategory>('professional')
  const [showAllCerts, setShowAllCerts] = useState(false)
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})
  const [collapsedExperienceCards, setCollapsedExperienceCards] = useState<Record<string, boolean>>({})
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
    if (!eagerPreviewVideo) return

    const preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.as = 'video'
    preloadLink.href = eagerPreviewVideo
    document.head.appendChild(preloadLink)

    const preloadVideo = document.createElement('video')
    preloadVideo.muted = true
    preloadVideo.playsInline = true
    preloadVideo.preload = 'auto'
    preloadVideo.src = eagerPreviewVideo
    preloadVideo.style.cssText = 'height:1px;left:-9999px;opacity:0;pointer-events:none;position:absolute;width:1px;'
    document.body.appendChild(preloadVideo)
    preloadVideo.load()

    return () => {
      preloadLink.remove()
      preloadVideo.remove()
    }
  }, [])

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
    if (qrDismissed) return

    const timer = setTimeout(() => setShowQR(true), 60_000)
    return () => clearTimeout(timer)
  }, [qrDismissed])

  const dismissQR = () => {
    window.localStorage.setItem('qrDismissed', 'true')
    setQrDismissed(true)
    setShowQR(false)
  }

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
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  const toggleMobileSection = (section: string) => {
    setExpandedMobileSections((current) => ({
      ...current,
      [section]: !current[section],
    }))
  }

  const mobileMoreLabel = (expanded: boolean) => (
    expanded
      ? (locale === 'es' ? 'Ver menos' : 'Show less')
      : (locale === 'es' ? 'Ver más' : 'Show more')
  )

  const renderMobileMoreButton = (section: string) => (
    <button className="mobile-more-button" type="button" onClick={() => toggleMobileSection(section)}>
      <span>{mobileMoreLabel(Boolean(expandedMobileSections[section]))}</span>
      <ArrowDown size={16} aria-hidden="true" />
    </button>
  )

  const isAcademicProject = (project: ProjectItem) => project.tags.some((tag) => tag === 'TFG' || tag === 'TFM')
  const academicProjects = profile.personalProjects.filter(isAcademicProject)
  const personalProjects = profile.personalProjects.filter((project) => !isAcademicProject(project))
  const professionalProjects: ProjectItem[] = profile.professionalProjects
  const featuredProjectVisuals: ProjectVisualKind[] = ['energy-grid', 'air-traffic', 'mobile-robot']
  const featuredProjects = featuredProjectVisuals
    .map((visual) => professionalProjects.find((project) => project.visual === visual))
    .filter((project): project is ProjectItem => Boolean(project))
  const filteredProjects = {
    professional: professionalProjects,
    personal: personalProjects,
    academic: academicProjects,
  } satisfies Record<ProjectCategory, ProjectItem[]>
  const projectCategoryLabels = {
    professional: { es: 'Profesionales', en: 'Professional' },
    personal: { es: 'Personales', en: 'Personal' },
    academic: { es: 'Académicos', en: 'Academic' },
  } satisfies Record<ProjectCategory, Record<Locale, string>>

  const renderProjectGrid = (projects: ProjectItem[], section: string, featured = false) => (
    <div
      className={[
        'project-grid',
        featured ? 'featured-project-grid' : '',
        expandedMobileSections[section] ? 'mobile-collapsible is-expanded' : 'mobile-collapsible',
      ].filter(Boolean).join(' ')}
    >
      {projects.map((project) => (
        <article className={featured ? 'project-card project-card--featured' : 'project-card'} key={project.title[locale]}>
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
          <img className="brand-logo" src={`${import.meta.env.BASE_URL}${theme === 'dark' ? 'logo-gsm-light.png' : 'logo-gsm-dark.png'}`} alt="" />
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
            <span className="profile-agv-runner" aria-hidden="true">
              <img src={`${import.meta.env.BASE_URL}agv-runner.png`} alt="" />
            </span>
            <span className="profile-agv-shelf" aria-hidden="true">
              <svg className="agv-file-icon" viewBox="0 0 64 78">
                <path className="agv-file-page" d="M5 5 H41 L59 23 V73 H5 Z" />
                <path className="agv-file-fold" d="M41 5 V23 H59" />
                <text className="agv-file-label" x="32" y="53">.gitignore</text>
              </svg>
            </span>
            <div className="hero-section">
              <div className="hero-copy">
                <h1 id="hero-title">{profile.hero.title[locale]}</h1>
                <p className="role-line">
                  {profile.hero.role[locale].split('\n').map((line, index) => (
                    <span className={`role-line-part role-line-part--${index + 1}`} key={line}>
                      {line}
                    </span>
                  ))}
                </p>
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
                </div>
              </div>

              <aside className="identity-panel" aria-label={profile.name}>
                <div className="portrait-frame">
                  <img src={`${import.meta.env.BASE_URL}profile.webp`} alt={profile.name} />
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
            <div className={expandedMobileSections.experience ? 'timeline experience-timeline mobile-collapsible is-expanded' : 'timeline experience-timeline mobile-collapsible'}>
              {getExperienceDisplayItems(profile.experience).map((item) => {
                const timelineYears = getTimelineYears(item, locale)
                const experienceCardId = `${item.company}-${item.period.es}`
                const isExperienceCollapsed = Boolean(collapsedExperienceCards[experienceCardId])

                return (
                  <div className="experience-row" key={experienceCardId}>
                    <article className={isExperienceCollapsed ? 'experience-card is-collapsed' : 'experience-card'}>
                    <div className="experience-header">
                      <a className="company-logo" href={item.url} target="_blank" rel="noreferrer">
                        <img src={item.logo} alt={`${item.company} logo`} loading="lazy" />
                      </a>
                      <div>
                        <div className="card-kicker">
                          <span>{item.period[locale]}</span>
                          {!isExperienceCollapsed && item.place ? <span>{item.place[locale]}</span> : null}
                        </div>
                        <h3>{item.role[locale]}</h3>
                        <a className="company" href={item.url} target="_blank" rel="noreferrer">
                          {item.company}
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                        {!isExperienceCollapsed ? <p className="company-summary">{item.companySummary[locale]}</p> : null}
                      </div>
                      <button
                        aria-expanded={!isExperienceCollapsed}
                        aria-label={isExperienceCollapsed ? (locale === 'es' ? 'Expandir experiencia' : 'Expand experience') : (locale === 'es' ? 'Contraer experiencia' : 'Collapse experience')}
                        className="experience-collapse-button"
                        type="button"
                        onClick={() => setCollapsedExperienceCards((current) => ({
                          ...current,
                          [experienceCardId]: !current[experienceCardId],
                        }))}
                      >
                        <ChevronDown size={18} aria-hidden="true" />
                      </button>
                    </div>
                    {!isExperienceCollapsed ? (
                      <>
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
                            {item.xyz.achievement.map((point, i) => (
                              <p key={`ach-${i}`}>{point[locale]}</p>
                            ))}
                          </div>
                          <div className="xyz-item">
                            <span>{profile.labels.measuredBy[locale]}</span>
                            {item.xyz.measuredBy.map((point, i) => (
                              <p key={`met-${i}`}>{point[locale]}</p>
                            ))}
                          </div>
                          <div className="xyz-item">
                            <span>{profile.labels.execution[locale]}</span>
                            {item.xyz.execution.map((point, i) => (
                              <p key={`exe-${i}`}>{point[locale]}</p>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : null}
                    </article>
                    <div className="timeline-year-marker" aria-hidden="true">
                      {timelineYears.end ? (
                        <span className="timeline-endpoint timeline-endpoint--end">
                          <span className="timeline-date-label">
                            <span className="timeline-month">{timelineYears.end.month}</span>
                            <span className="timeline-year timeline-year--end">{timelineYears.end.year}</span>
                          </span>
                          <span className="timeline-dot" />
                        </span>
                      ) : null}
                      {timelineYears.start ? (
                        <span className="timeline-endpoint timeline-endpoint--start">
                          <span className="timeline-date-label">
                            <span className="timeline-month">{timelineYears.start.month}</span>
                            <span className="timeline-year timeline-year--start">{timelineYears.start.year}</span>
                          </span>
                          <span className="timeline-dot" />
                        </span>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
            {renderMobileMoreButton('experience')}
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
                      const SkillIcon = skillIconMap[skill.name.en] ?? Cpu
                      return (
                      <div className="skill-meter" key={skill.name[locale]}>
                        <div className="skill-meter-head">
                          <span className="skill-name">
                            <SkillIcon size={15} aria-hidden="true" />
                            <span>{skill.name[locale]}</span>
                          </span>
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
                <p className="eyebrow">{locale === 'es' ? 'Selección destacada' : 'Featured selection'}</p>
                <h3>{locale === 'es' ? 'Proyectos destacados' : 'Featured projects'}</h3>
              </div>
              {renderProjectGrid(featuredProjects, 'featured-projects', true)}
            </div>
            <div className="project-section">
              <div className="project-section-heading">
                <p className="eyebrow">{locale === 'es' ? 'Archivo filtrable' : 'Filterable archive'}</p>
                <h3>{locale === 'es' ? 'Resto de proyectos' : 'More projects'}</h3>
              </div>
              <div className="project-filter" role="tablist" aria-label={locale === 'es' ? 'Filtrar proyectos' : 'Filter projects'}>
                {(['professional', 'personal', 'academic'] as ProjectCategory[]).map((category) => (
                  <button
                    aria-selected={activeProjectCategory === category}
                    className="project-filter-button"
                    key={category}
                    onClick={() => setActiveProjectCategory(category)}
                    role="tab"
                    type="button"
                  >
                    {projectCategoryLabels[category][locale]}
                  </button>
                ))}
              </div>
              {renderProjectGrid(filteredProjects[activeProjectCategory], `project-${activeProjectCategory}`)}
              {renderMobileMoreButton(`project-${activeProjectCategory}`)}
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
                              {detail.url.endsWith('.pdf') ? <FileText size={14} aria-hidden="true" /> : null}
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

              {(() => {
                const certs = showAllCerts ? profile.certifications : profile.certifications.filter((c) => c.featured)
                const groups = certs.reduce((acc, cert) => {
                  const key = cert.issuer
                  if (!acc[key]) acc[key] = []
                  acc[key].push(cert)
                  return acc
                }, {} as Record<string, typeof certs>)

                return (
                  <>
                    <ul className="certification-list">
                      {Object.entries(groups).map(([issuer, items]) => {
                        const collapsed = collapsedGroups[issuer]
                        return (
                        <li className="cert-group" key={issuer}>
                          <button
                            className="cert-group-label"
                            type="button"
                            onClick={() => setCollapsedGroups((prev) => ({ ...prev, [issuer]: !prev[issuer] }))}
                            aria-expanded={!collapsed}
                          >
                            <ChevronDown
                              size={12}
                              aria-hidden="true"
                              style={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}
                            />
                            <span>{issuer}</span>
                            <span className="cert-group-count">{items.length}</span>
                          </button>
                          {!collapsed ? (
                            <ul className="cert-group-list">
                              {items.map((certification) => (
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
                          ) : null}
                        </li>
                        )
                      })}
                    </ul>

                    {!showAllCerts && profile.certifications.some((c) => !c.featured) ? (
                      <button className="cert-show-all" type="button" onClick={() => setShowAllCerts(true)}>
                        <ChevronDown size={16} aria-hidden="true" />
                        <span>{locale === 'es' ? 'Ver todas' : 'Show all'} ({profile.certifications.length})</span>
                      </button>
                    ) : null}
                    {showAllCerts ? (
                      <button className="cert-show-all" type="button" onClick={() => setShowAllCerts(false)}>
                        <ChevronDown size={16} aria-hidden="true" style={{ transform: 'rotate(180deg)' }} />
                        <span>{locale === 'es' ? 'Solo destacadas' : 'Featured only'}</span>
                      </button>
                    ) : null}
                  </>
                )
              })()}
            </div>
          </section>
        ) : null}

        {activeSection === 'contact' ? (
          <section aria-labelledby="tab-contact" className="panel-shell contact-panel" id="panel-contact" role="tabpanel">
            <div className="contact-atm-backdrop" aria-hidden="true">
              <svg className="contact-atm-map" viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid slice">
                <rect className="atm-sea" x="0" y="-180" width="1200" height="900" />
                <rect className="atm-neighbour" x="0" y="360" width="1200" height="360" />
                <svg className="atm-region-svg" x="0" y="0" width="1200" height="720" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon
                    className="atm-region"
                    points="99.87,40.80 94.53,40.20 84.40,35.60 80.13,35.60 77.07,33.80 73.60,34.60 70.53,29.80 68.27,30.20 66.40,28.40 61.73,29.00 58.53,28.00 57.33,29.40 55.73,29.20 56.27,27.00 53.33,26.00 52.40,22.60 50.67,21.80 50.13,20.20 49.33,22.20 47.33,23.00 45.87,26.40 42.93,25.40 42.53,26.80 40.13,28.20 38.53,27.00 37.20,27.60 37.07,26.20 36.67,27.00 35.20,25.20 31.07,28.60 29.20,27.40 28.13,28.40 26.53,27.00 26.27,28.60 21.87,28.40 20.80,26.80 17.20,28.20 15.47,26.80 13.73,28.20 8.67,26.60 7.60,28.20 5.73,28.20 4.93,34.40 2.53,38.20 0.27,38.00 0.00,40.60 2.00,42.60 1.87,45.60 2.93,47.80 4.40,47.80 4.40,52.40 7.87,55.60 7.47,58.40 8.40,60.80 10.93,59.20 11.47,57.20 13.20,59.60 13.20,61.60 10.00,65.20 9.07,64.40 6.93,69.80 8.13,71.80 8.53,68.40 10.13,72.00 11.47,72.00 12.93,74.40 12.80,77.40 15.07,78.60 15.20,80.20 17.20,77.40 23.87,77.80 28.00,75.80 28.00,73.80 26.67,73.80 26.27,72.00 28.40,72.00 29.33,68.40 30.80,66.80 31.87,68.60 33.47,68.40 35.73,70.40 36.13,67.60 37.47,67.40 39.47,69.40 40.67,68.60 41.20,65.40 43.47,67.00 44.67,66.00 45.73,69.60 47.47,71.80 51.60,74.00 53.07,73.40 53.60,69.80 55.60,66.80 60.80,69.60 63.20,69.40 63.73,67.00 66.93,67.40 67.87,63.80 71.07,65.20 76.00,62.40 77.60,63.40 78.93,57.20 81.73,57.80 85.07,52.80 86.67,54.00 87.87,57.40 91.20,57.00 92.27,51.00 95.33,50.60 96.40,48.00 98.93,50.40 99.60,49.40 98.93,43.80"
                  />
                  <polygon
                    className="atm-neighbour-territory"
                    points="0,38.20 0,100 15.20,100 17.20,77.40 15.20,80.20 15.07,78.60 12.80,77.40 12.93,74.40 11.47,72.00 10.13,72.00 8.53,68.40 8.13,71.80 6.93,69.80 9.07,64.40 10.00,65.20 13.20,61.60 13.20,59.60 11.47,57.20 10.93,59.20 8.40,60.80 7.47,58.40 7.87,55.60 4.40,52.40 4.40,47.80 2.93,47.80 1.87,45.60 2.00,42.60 0.00,40.60"
                  />
                </svg>
                <path className="atm-route" d="M-80 690 L108 590 L318 418 L558 294 L828 238 L1280 142" />
                <path className="atm-route atm-route--secondary" d="M-64 116 L184 238 L398 344 L640 356 L924 284 L1276 190" />
                <path className="atm-route atm-route--secondary" d="M-88 788 L220 610 L470 466 L702 362 L1010 492 L1288 558" />
                <g className="atm-sector-group">
                  <path className="atm-sector" d="M294 178 L438 224 L392 382 L248 336 Z" />
                  <path className="atm-sector-alert atm-sector-alert--ryr-left" d="M294 178 L438 224 L392 382 L248 336 Z" />
                </g>
                <g className="atm-sector-group atm-sector-group--wide">
                  <path className="atm-sector atm-sector--wide" d="M640 198 L818 252 L778 456 L590 392 Z" />
                  <path className="atm-sector-alert atm-sector-alert--ryr-wide" d="M640 198 L818 252 L778 456 L590 392 Z" />
                  <path className="atm-sector-alert atm-sector-alert--ibe-wide" d="M640 198 L818 252 L778 456 L590 392 Z" />
                </g>
                <g className="atm-sector-group atm-sector-group--soft">
                  <path className="atm-sector atm-sector--soft" d="M872 328 L1078 354 L1030 540 L850 508 Z" />
                </g>
                <circle className="atm-ring" cx="562" cy="352" r="128" />
                <circle className="atm-ring atm-ring--small" cx="858" cy="282" r="82" />

                <g className="atm-city atm-city--oviedo">
                  <circle cx="586" cy="330" r="6" />
                  <text x="600" y="334">Oviedo</text>
                </g>
                <g className="atm-city atm-city--gijon">
                  <circle cx="674" cy="218" r="6" />
                  <text x="688" y="222">Gijón</text>
                </g>
                <g className="atm-city atm-city--aviles">
                  <circle cx="548" cy="210" r="6" />
                  <text x="562" y="214">Avilés</text>
                </g>

                <g className="atm-airport" transform="translate(344 226)">
                  <circle className="atm-airport-marker" cx="0" cy="0" r="12" />
                  <path className="atm-airport-icon" d="M-6 -8 H6 L4.5 -3 H-4.5 Z M-3 -3 L-6 9 H6 L3 -3 M-5 4 H5 M-4.5 9 H4.5" />
                  <text x="18" y="4">Aeropuerto de Asturias</text>
                </g>

                <g className="atm-plane atm-plane--one">
                  <path className="atm-plane-trail" d="M-126 -8 H-26" transform="rotate(-21)" />
                  <rect className="atm-plane-frame" x="-16" y="-24" width="32" height="32" />
                  <text className="atm-plane-symbol" x="0" y="-8">&#9992;</text>
                  <text className="atm-plane-id" x="28" y="-30">IBE4026</text>
                  <text className="atm-plane-meta" x="28" y="-15">FL340</text>
                  <text className="atm-plane-meta" x="28" y="-2">452 kt</text>
                </g>
                <g className="atm-plane atm-plane--two">
                  <path className="atm-plane-trail" d="M-126 -8 H-26" transform="rotate(4)" />
                  <rect className="atm-plane-frame" x="-16" y="-24" width="32" height="32" />
                  <text className="atm-plane-symbol" x="0" y="-8">&#9992;</text>
                  <text className="atm-plane-id" x="28" y="-30">RYR2931</text>
                  <text className="atm-plane-meta" x="28" y="-15">FL280</text>
                  <text className="atm-plane-meta" x="28" y="-2">416 kt</text>
                </g>
                <g className="atm-plane atm-plane--three">
                  <path className="atm-plane-trail" d="M-126 -8 H-26" transform="rotate(-8)" />
                  <rect className="atm-plane-frame" x="-16" y="-24" width="32" height="32" />
                  <text className="atm-plane-symbol" x="0" y="-8">&#9992;</text>
                  <text className="atm-plane-id" x="28" y="-30">AEA095</text>
                  <text className="atm-plane-meta" x="28" y="-15">FL300</text>
                  <text className="atm-plane-meta" x="28" y="-2">438 kt</text>
                </g>
              </svg>
            </div>
            <div className="contact-section">
              <h2>{profile.contact.title[locale]}</h2>
              <p>{profile.contact.text[locale]}</p>
              <div className="contact-actions">
                <a className="primary-link contact-link" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  <ExternalLink size={18} aria-hidden="true" />
                  <span>{profile.contact.action[locale]}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a className="contact-alt-link" href={`${import.meta.env.BASE_URL}cv.pdf`} download>
                  <Download size={18} aria-hidden="true" />
                  <span>{locale === 'es' ? 'Descargar CV' : 'Download CV'}</span>
                </a>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      {showQR && qrDataUrl && !qrDismissed ? (
        <button className="qr-card" type="button" aria-label="Dismiss contact QR code" onClick={dismissQR}>
          <img src={qrDataUrl} alt="Contact QR" className="qr-image" />
        </button>
      ) : null}
    </div>
  )
}

export default App
