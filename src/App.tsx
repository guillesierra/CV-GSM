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
  QrCode,
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

function AnimatedHeroTitle({ text }: { text: string }) {
  const words = text.split(' ')

  return (
    <h1 id="hero-title">
      {words.map((word, index) => (
        <span
          className="hero-title-word"
          key={`${word}-${index}`}
          style={{ '--word-index': index } as CSSProperties}
        >
          {word}{index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </h1>
  )
}

function IndustrialHeroScene({ locale }: { locale: Locale }) {
  const labels = locale === 'es'
    ? {
        atm: 'TR\u00c1FICO A\u00c9REO',
        energy: 'ENERG\u00cdA',
        eventsBus: 'BUS DE EVENTOS',
        fieldBus: 'BUS DE CAMPO',
        realTime: 'TIEMPO REAL',
        robotics: 'ROB\u00d3TICA',
        serviceBus: 'BUS DE SERVICIOS',
        telemetry: 'NATS \u00b7 TELEMETR\u00cdA',
      }
    : {
        atm: 'AIR TRAFFIC',
        energy: 'ENERGY',
        eventsBus: 'EVENT BUS',
        fieldBus: 'FIELD BUS',
        realTime: 'REAL-TIME',
        robotics: 'ROBOTICS',
        serviceBus: 'SERVICE BUS',
        telemetry: 'NATS \u00b7 TELEMETRY',
      }

  const nodes = [
    { icon: TimerReset, key: 'real-time', label: labels.realTime, protocol: labels.telemetry, x: 850, y: 150 },
    { icon: UtilityPole, key: 'energy', label: labels.energy, protocol: 'ICCP \u00b7 SCADA', x: 990, y: 220 },
    { icon: Bot, key: 'robotics', label: labels.robotics, protocol: 'OPC-UA \u00b7 CANopen', x: 900, y: 592 },
    { icon: TowerControl, key: 'atm', label: labels.atm, protocol: 'gRPC \u00b7 AMQP', x: 1368, y: 62 },
  ]

  const buses = [
    { className: 'events', label: labels.eventsBus, y: 250 },
    { className: 'energy', label: 'ICCP / SCADA', y: 330 },
    { className: 'field', label: labels.fieldBus, y: 450 },
    { className: 'services', label: labels.serviceBus, y: 520 },
  ]

  return (
    <div className="industrial-hero-scene" aria-hidden="true">
      <svg className="industrial-hero-svg" viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <pattern id="hero-grid-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0 H0 V48" className="industrial-grid-line" />
          </pattern>
          <linearGradient id="hero-signal-gradient" x1="0" x2="1">
            <stop offset="0" stopColor="var(--accent-secondary)" />
            <stop offset="1" stopColor="var(--accent)" />
          </linearGradient>
        </defs>

        <rect className="industrial-grid" width="1440" height="760" fill="url(#hero-grid-pattern)" />
        <g className="industrial-network">
          <g className="industrial-buses">
            {buses.map((bus) => (
              <g className={`industrial-bus-group industrial-bus-group--${bus.className}`} key={bus.className}>
                <path className={`industrial-bus industrial-bus--${bus.className}`} d={`M760 ${bus.y} H1404`} />
                {bus.className === 'energy' ? <path className="industrial-bus industrial-bus--energy industrial-bus--energy-return" d={`M760 ${bus.y + 7} H1404`} /> : null}
                <path className={`industrial-signal industrial-signal--${bus.className}`} d={`M760 ${bus.y} H1404`} />
                <circle className="industrial-bus-terminal" cx="760" cy={bus.y} r="3.5" />
                <circle className="industrial-bus-terminal" cx="1404" cy={bus.y} r="3.5" />
                <text className="industrial-bus-label" x="914" y={bus.y - 9}>{bus.label}</text>
              </g>
            ))}
          </g>

          <g className="industrial-drops">
            <path className="industrial-drop industrial-drop--events" d="M850 178 V250" />
            <path className="industrial-drop industrial-drop--energy" d="M990 248 V330" />
            <path className="industrial-drop industrial-drop--field" d="M900 450 V564" />
            <path className="industrial-drop industrial-drop--services" d="M1368 90 V520" />
            <path className="industrial-drop industrial-drop--control" d="M860 250 V520" />
          </g>

          <g className="industrial-hub" transform="translate(860 390)">
            <circle className="industrial-hub-ring" r="58" />
            <circle className="industrial-hub-ring industrial-hub-ring--inner" r="38" />
            <Cpu className="industrial-hub-icon" x="-15" y="-15" width="30" height="30" strokeWidth="1.6" />
            <text className="industrial-hub-label" x="0" y="82">EDGE CONTROL</text>
          </g>

          {nodes.map((node) => {
            const Icon = node.icon
            return (
              <g className={`industrial-node industrial-node--${node.key}`} key={node.key} transform={`translate(${node.x} ${node.y})`}>
                <circle className="industrial-node-ring" r="28" />
                <Icon className="industrial-node-icon" x="-12" y="-12" width="24" height="24" strokeWidth="1.7" />
                <circle className="industrial-node-status" cx="21" cy="-20" r="4" />
                <text className="industrial-node-label" x="0" y="48">{node.label}</text>
                <text className="industrial-node-protocol" x="0" y="64">{node.protocol}</text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

const asturiasMapPath = 'M2.60 24.20 L6.40 24.50 L7.03 22.75 L7.50 20.90 L9.22 18.90 L11.60 16.90 L13.98 15.88 L16.70 15.80 L19.00 16.25 L21.10 16.60 L23.15 16.25 L25.10 16.40 L26.97 17.23 L28.80 17.50 L30.32 17.07 L31.50 16.40 L33.15 17.45 L35.10 17.60 L37.75 17.27 L40.10 16.10 L42.28 16.98 L44.20 18.20 L46.05 17.15 L47.60 16.00 L48.75 15.20 L50.00 14.80 L51.05 13.13 L51.80 11.30 L53.07 12.32 L54.10 13.80 L55.42 15.90 L57.20 17.00 L59.25 16.82 L61.20 16.70 L63.13 17.45 L65.10 17.90 L67.40 17.75 L69.30 18.30 L70.92 19.27 L72.20 20.80 L74.63 21.18 L76.90 21.70 L79.25 21.85 L81.70 22.30 L84.52 23.20 L87.20 24.10 L90.45 25.10 L93.60 26.10 L95.95 26.45 L98.20 26.10 L98.38 27.35 L97.70 28.70 L98.07 30.18 L97.40 31.80 L95.70 31.70 L94.40 32.40 L93.50 35.03 L91.60 36.30 L89.67 37.10 L88.30 38.90 L86.30 40.27 L83.50 41.00 L82.00 39.67 L80.50 38.90 L78.58 39.50 L76.80 40.70 L74.40 42.05 L71.80 42.70 L69.93 42.10 L68.10 41.70 L66.95 43.68 L65.70 45.60 L63.73 45.70 L61.80 45.80 L60.75 47.65 L59.40 48.80 L57.28 48.88 L55.30 48.70 L54.13 47.13 L52.80 45.80 L51.10 45.20 L49.60 44.40 L48.35 42.95 L47.20 42.00 L45.80 43.17 L44.20 45.10 L42.88 44.17 L41.70 43.60 L40.27 45.10 L38.80 45.80 L37.00 44.65 L35.20 43.80 L33.60 45.50 L31.60 46.60 L30.55 45.52 L29.40 45.10 L27.83 47.03 L25.90 48.20 L23.75 48.90 L21.50 49.00 L19.60 49.52 L17.50 49.10 L15.85 49.28 L14.30 48.20 L13.47 46.08 L12.40 43.70 L11.60 42.08 L10.40 41.00 L9.72 39.60 L10.10 37.80 L12.13 36.57 L13.80 34.90 L14.85 33.47 L14.80 32.20 L13.83 31.30 L12.90 30.80 L11.63 32.75 L10.00 33.80 L8.47 31.98 L7.90 30.10 L7.63 28.70 L6.40 27.70 L5.93 26.70 L5.90 25.70 L2.60 25.50 Z'
const neighbouringTerritoriesPath = 'M105 25 L101 25 L98.20 26.10 L98.38 27.35 L97.70 28.70 L98.07 30.18 L97.40 31.80 L95.70 31.70 L94.40 32.40 L93.50 35.03 L91.60 36.30 L89.67 37.10 L88.30 38.90 L86.30 40.27 L83.50 41.00 L82.00 39.67 L80.50 38.90 L78.58 39.50 L76.80 40.70 L74.40 42.05 L71.80 42.70 L69.93 42.10 L68.10 41.70 L66.95 43.68 L65.70 45.60 L63.73 45.70 L61.80 45.80 L60.75 47.65 L59.40 48.80 L57.28 48.88 L55.30 48.70 L54.13 47.13 L52.80 45.80 L51.10 45.20 L49.60 44.40 L48.35 42.95 L47.20 42.00 L45.80 43.17 L44.20 45.10 L42.88 44.17 L41.70 43.60 L40.27 45.10 L38.80 45.80 L37.00 44.65 L35.20 43.80 L33.60 45.50 L31.60 46.60 L30.55 45.52 L29.40 45.10 L27.83 47.03 L25.90 48.20 L23.75 48.90 L21.50 49.00 L19.60 49.52 L17.50 49.10 L15.85 49.28 L14.30 48.20 L13.47 46.08 L12.40 43.70 L11.60 42.08 L10.40 41.00 L9.72 39.60 L10.10 37.80 L12.13 36.57 L13.80 34.90 L14.85 33.47 L14.80 32.20 L13.83 31.30 L12.90 30.80 L11.63 32.75 L10.00 33.80 L8.47 31.98 L7.90 30.10 L7.63 28.70 L6.40 27.70 L5.93 26.70 L5.90 25.70 L2.60 25.50 L2.60 24.20 L-1 18.40 L-4 17.50 L-4 70 L105 70 Z'
const asturiasMapTransform = 'translate(-18 20) scale(12.5 11.2)'

const asturiasCities = [
  { kind: 'minor', name: 'Luarca', x: 188, y: 225 },
  { kind: 'major', name: 'Avil\u00e9s', x: 493, y: 235 },
  { kind: 'major', name: 'Gij\u00f3n', x: 700, y: 240 },
  { kind: 'capital', name: 'Oviedo', x: 625, y: 350 },
  { kind: 'minor', name: 'Ribadesella', x: 916, y: 272 },
  { kind: 'minor', name: 'Llanes', x: 1048, y: 286 },
] as const

function ContactAtmScene({ locale }: { locale: Locale }) {
  const labels = locale === 'es'
    ? {
        airport: 'Aeropuerto de Asturias',
        central: 'CENTRO',
        castile: 'CASTILLA Y LE\u00d3N',
        east: 'ESTE',
        galicia: 'GALICIA',
        cantabria: 'CANTABRIA',
        sea: 'Mar Cant\u00e1brico',
        west: 'OESTE',
      }
    : {
        airport: 'Asturias Airport',
        central: 'CENTRAL',
        castile: 'CASTILE AND LEON',
        east: 'EAST',
        galicia: 'GALICIA',
        cantabria: 'CANTABRIA',
        sea: 'Cantabrian Sea',
        west: 'WEST',
      }

  return (
    <div className="contact-atm-backdrop" aria-hidden="true">
      <svg className="contact-atm-map" viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="atm-land-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3d6578" />
            <stop offset="1" stopColor="#1c3c4d" />
          </linearGradient>
          <linearGradient id="atm-runway-gradient" x1="0" x2="1">
            <stop offset="0" stopColor="#9edcff" />
            <stop offset="0.5" stopColor="#ffffff" />
            <stop offset="1" stopColor="#9edcff" />
          </linearGradient>
          <pattern id="atm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 H0 V40" fill="none" stroke="currentColor" strokeWidth="0.7" />
          </pattern>
          <clipPath id="asturias-land-clip">
            <path d={asturiasMapPath} transform={asturiasMapTransform} />
          </clipPath>
        </defs>

        <rect className="atm-sea" x="0" y="0" width="1200" height="720" />
        <rect className="atm-grid" x="0" y="0" width="1200" height="720" fill="url(#atm-grid)" />
        <text className="atm-sea-label" x="76" y="116">{labels.sea}</text>

        <g className="atm-neighbouring-land">
          <path
            className="atm-neighbour-land"
            d={neighbouringTerritoriesPath}
            transform={asturiasMapTransform}
          />
          <path className="atm-neighbour-boundary" d="M174 500 C128 552 104 624 94 720 M920 534 C1010 578 1052 640 1074 720" />
          <path className="atm-neighbour-contour" d="M36 566 C210 530 320 626 480 594 S790 610 940 572 S1100 548 1200 566" />
          <path className="atm-neighbour-contour" d="M12 638 C204 594 356 676 548 642 S826 668 1018 626" />
          <text className="atm-neighbour-label" x="42" y="548">{labels.galicia}</text>
          <text className="atm-neighbour-label" x="512" y="570">{labels.castile}</text>
          <text className="atm-neighbour-label" x="1080" y="548">{labels.cantabria}</text>
        </g>

        <g className="atm-land-layer">
          <path className="atm-region" d={asturiasMapPath} transform={asturiasMapTransform} />
          <g className="atm-land-detail" clipPath="url(#asturias-land-clip)">
            <path className="atm-terrain" d="M80 506 C220 442 338 466 468 418 S724 386 846 438 S1046 458 1164 392" />
            <path className="atm-terrain" d="M58 548 C214 490 346 534 506 472 S790 444 930 490 S1080 492 1190 448" />
            <path className="atm-terrain atm-terrain--ridge" d="M102 586 C234 520 382 570 540 520 S830 500 1018 548" />
            <path className="atm-municipality-line" d="M270 200 L328 554 M418 188 L456 570 M566 170 L596 570 M720 208 L696 546 M860 240 L816 516 M1010 276 L944 486" />
            <path className="atm-municipality-line" d="M96 354 C310 324 478 348 658 326 S986 304 1142 356" />
          </g>
          <path className="atm-coastline" d={asturiasMapPath} transform={asturiasMapTransform} />
        </g>

        <g className="atm-sectors">
          <path className="atm-sector atm-sector--west" d="M106 214 L474 188 L520 432 L224 520 Z" />
          <path className="atm-sector atm-sector--central" d="M420 166 L790 188 L804 482 L500 438 Z" />
          <path className="atm-sector atm-sector--east" d="M744 184 L1148 242 L1060 532 L790 482 Z" />
          <path className="atm-sector-activity atm-sector-activity--west atm-sector-activity--one" d="M106 214 L474 188 L520 432 L224 520 Z" />
          <path className="atm-sector-activity atm-sector-activity--central atm-sector-activity--one" d="M420 166 L790 188 L804 482 L500 438 Z" />
          <path className="atm-sector-activity atm-sector-activity--east atm-sector-activity--one" d="M744 184 L1148 242 L1060 532 L790 482 Z" />
          <path className="atm-sector-activity atm-sector-activity--west atm-sector-activity--two" d="M106 214 L474 188 L520 432 L224 520 Z" />
          <path className="atm-sector-activity atm-sector-activity--central atm-sector-activity--two" d="M420 166 L790 188 L804 482 L500 438 Z" />
          <path className="atm-sector-activity atm-sector-activity--east atm-sector-activity--two" d="M744 184 L1148 242 L1060 532 L790 482 Z" />
          <path className="atm-sector-activity atm-sector-activity--east atm-sector-activity--three" d="M744 184 L1148 242 L1060 532 L790 482 Z" />
          <text className="atm-sector-label" x="260" y="468">{labels.west}</text>
          <text className="atm-sector-label" x="610" y="468">{labels.central}</text>
          <text className="atm-sector-label" x="914" y="472">{labels.east}</text>
        </g>

        <path className="atm-route" d="M-90 676 C236 568 420 438 650 330 S1036 174 1300 116" />
        <path className="atm-route atm-route--secondary" d="M-80 138 C228 202 392 324 620 326 S958 250 1290 314" />
        <path className="atm-route atm-route--secondary" d="M-92 760 C244 626 500 516 704 430 S1036 444 1300 598" />
        <g className="atm-route-fixes">
          <circle cx="236" cy="568" r="4" />
          <circle cx="650" cy="330" r="4" />
          <circle cx="958" cy="250" r="4" />
          <circle cx="1036" cy="444" r="4" />
        </g>

        <g className="atm-ctr">
          <circle className="atm-ctr-ring" cx="431" cy="250" r="104" />
          <circle className="atm-ctr-ring atm-ctr-ring--inner" cx="431" cy="250" r="62" />
          <path className="atm-approach-line" d="M245 190 L617 310" />
          <text className="atm-ctr-label" x="363" y="140">LEAS / OVD</text>
        </g>

        <g className="atm-compass" transform="translate(1110 92)">
          <circle r="28" />
          <path d="M0 -22 L6 4 L0 0 L-6 4 Z" />
          <text x="0" y="-34">N</text>
        </g>

        {asturiasCities.map((city) => (
          <g className={`atm-city atm-city--${city.kind}`} key={city.name} transform={`translate(${city.x} ${city.y})`}>
            <circle className="atm-city-ring" r={city.kind === 'capital' ? 8 : city.kind === 'major' ? 6 : 4} />
            <circle className="atm-city-core" r={city.kind === 'capital' ? 3.4 : city.kind === 'major' ? 2.8 : 2.2} />
            <text x="12" y="4">{city.name}</text>
          </g>
        ))}

        <g className="atm-airport" transform="translate(431 250)">
          <circle className="atm-airport-marker" r="34" />
          <circle className="atm-airport-marker atm-airport-marker--outer" r="48" />
          <g className="atm-runway" transform="rotate(18)">
            <rect className="atm-runway-strip" x="-48" y="-5" width="96" height="10" rx="1" />
            <line className="atm-runway-centerline" x1="-41" y1="0" x2="41" y2="0" />
            <path className="atm-runway-threshold" d="M-43 -4 V4 M-39 -4 V4 M39 -4 V4 M43 -4 V4" />
          </g>
          <text className="atm-airport-code" x="-60" y="-12">OVD / LEAS</text>
          <text className="atm-airport-name" x="-60" y="9">{labels.airport}</text>
          <text className="atm-airport-runway" x="-60" y="28">RWY 11/29</text>
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
          setTimeout(() => terminalInputRef.current?.focus({ preventScroll: true }), 60)
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

  const dismissQR = () => {
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
        window.scrollTo({ top: 0, behavior: 'auto' })
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

    if (window.matchMedia('(max-width: 960px)').matches) {
      const navElement = navRef.current
      const tabElement = tabRefs.current.get(activeSection)

      if (navElement && tabElement) {
        const targetScrollLeft = tabElement.offsetLeft - (navElement.clientWidth - tabElement.offsetWidth) / 2
        navElement.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        })
      }
    }

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
    if (section === activeSection) {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      })
      return
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
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
            <div className="hero-section">
              <IndustrialHeroScene locale={locale} />
              <div className="hero-copy">
                <AnimatedHeroTitle key={locale} text={profile.hero.title[locale]} />
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
            <ContactAtmScene locale={locale} />
            <div className="contact-section">
              <h2>{profile.contact.title[locale]}</h2>
              <p>{profile.contact.text[locale]}</p>
              <div className="contact-actions">
                <a className="primary-link contact-link" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  <ExternalLink size={18} aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
                <a className="contact-alt-link" href={`${import.meta.env.BASE_URL}cv.pdf`} download>
                  <Download size={18} aria-hidden="true" />
                  <span>CV</span>
                </a>
                <button
                  className="contact-alt-link"
                  type="button"
                  aria-label={locale === 'es' ? 'Guardar contacto' : 'Save contact'}
                  onClick={() => setShowQR(true)}
                >
                  <QrCode size={18} aria-hidden="true" />
                  <span>{locale === 'es' ? 'Contacto' : 'Contact'}</span>
                </button>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      {showQR && qrDataUrl ? (
        <button
          className="qr-card"
          type="button"
          aria-label={locale === 'es' ? 'Cerrar codigo QR de contacto' : 'Close contact QR code'}
          onClick={dismissQR}
        >
          <img src={qrDataUrl} alt="Contact QR" className="qr-image" />
        </button>
      ) : null}
    </div>
  )
}

export default App
