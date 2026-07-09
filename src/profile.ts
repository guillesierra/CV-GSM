export type Locale = 'es' | 'en'

const B = import.meta.env.BASE_URL

type TextBlock = Record<Locale, string>
type LinkedTextBlock = TextBlock & { url?: string }
type SkillItem = {
  name: TextBlock
  level: number
}
type CertificationItem = {
  title: string
  issuer: string
  period: TextBlock
  icon: string
  url?: string
  featured?: boolean
}
export type SectionId = 'profile' | 'experience' | 'skills' | 'projects' | 'education' | 'contact'
export type ProjectVisualKind =
  | 'energy-grid'
  | 'ems-dashboard'
  | 'microgrid'
  | 'air-traffic'
  | 'mobile-robot'
  | 'agv-safety'
  | 'cobot'
  | 'industrial-data'
  | 'health-data'
  | 'dna'
  | 'fitness'
  | 'market'
  | 'public-data'
  | 'mobility'
  | 'biometrics'
  | 'project-management'

export type ExperienceItem = {
  company: string
  role: TextBlock
  period: TextBlock
  place?: TextBlock
  url: string
  logo: string
  companySummary: TextBlock
  stack?: string[]
  xyz: {
    achievement: TextBlock[]
    measuredBy: TextBlock[]
    execution: TextBlock[]
  }
}

export type EducationItem = {
  degree: TextBlock
  institution: string
  url?: string
  logos?: {
    src: string
    alt: string
    url?: string
  }[]
  period: TextBlock
  place: TextBlock
  details?: LinkedTextBlock[]
}

export type ProjectItem = {
  title: TextBlock
  summary: TextBlock
  details?: TextBlock[]
  link: string
  image: string
  imageCredit: {
    title: string
    author: string
    license: string
    sourceUrl: string
  }
  visual: ProjectVisualKind
  tags: string[]
  videoUrl?: string
  previewVideo?: string
}

type ProjectImage = Pick<ProjectItem, 'image' | 'imageCredit'>

const projectImages = {
  aom: {
    image: `${B}projects/aom-renewable-grid.jpg`,
    imageCredit: {
      title: 'Wind turbine energy',
      author: 'Ian / Pixabay',
      license: 'Pixabay',
      sourceUrl: 'https://pixabay.com/videos/wind-turbine-energy-windmill-wind-267120/',
    },
  },
  ems: {
    image: `${B}projects/ems-control-room.jpg`,
    imageCredit: {
      title: 'Power plant control room',
      author: 'Magnetic Rahim',
      license: 'CC BY-SA 4.0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Power_plant_control_room.jpg',
    },
  },
  der: {
    image: 'https://today.ucsd.edu/news_uploads/240711DERConnectDSC_6369ErikJepsenUCSanDiego6_705_b.png',
    imageCredit: {
      title: 'DERConnect UCSD',
      author: 'Erik Jepsen / UC San Diego',
      license: 'UC San Diego',
      sourceUrl: 'https://today.ucsd.edu/',
    },
  },
  inm: {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJd8jY9jKOeJy0QXXypOJtqjke7zZZvQeX2ymRlnWQiGDRK8Pfo0EJIgM&s=10',
    imageCredit: {
      title: 'Air traffic management',
      author: 'iNM',
      license: 'iNM',
      sourceUrl: 'https://www.indracompany.com/',
    },
  },
  gasbot: {
    image: 'https://i.ytimg.com/vi/IyQoAEIDwMA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCjxJGZG0dfDymBM-GP9D3VyhBfpw',
    imageCredit: {
      title: 'GASBOT mobile manipulator pilot',
      author: 'ROBOTT-NET',
      license: 'YouTube',
      sourceUrl: 'https://www.youtube.com/watch?v=IyQoAEIDwMA',
    },
  },
  safeAgv: {
    image: 'https://www.hisparob.es/wp-content/uploads/2021/01/Boxmover-1-1.jpg',
    imageCredit: {
      title: 'Boxmover AGV',
      author: 'HispaRob',
      license: 'HispaRob',
      sourceUrl: 'https://www.hisparob.es/',
    },
  },
  collaborate: {
    image: 'https://cordis.europa.eu/docs/results/h2020/820/820767_PS/20210526-090600.jpg',
    imageCredit: {
      title: 'COLLABORATE H2020 project',
      author: 'CORDIS / European Commission',
      license: 'CORDIS',
      sourceUrl: 'https://cordis.europa.eu/project/id/820767',
    },
  },
  boost: {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlThbJF1HlZVnIs8yFdDVoT8HXN0tNY5_ER0Jalc0IlLsbz2WWp5jSIQI&s=10',
    imageCredit: {
      title: 'BOOST 4.0',
      author: 'BOOST 4.0',
      license: 'EU Project',
      sourceUrl: 'https://boost40.eu/',
    },
  },
  higia: {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Pill_Organizer_With_Vitamins_And_Medicines.jpg/1280px-Pill_Organizer_With_Vitamins_And_Medicines.jpg',
    imageCredit: {
      title: 'Pill Organizer With Vitamins And Medicines',
      author: 'Stevepb',
      license: 'CC0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pill_Organizer_With_Vitamins_And_Medicines.jpg',
    },
  },
  dna: {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/DNA_sequencing.jpg/1280px-DNA_sequencing.jpg',
    imageCredit: {
      title: 'DNA sequencing',
      author: 'Linda Bartlett / National Cancer Institute',
      license: 'Public domain',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:DNA_sequencing.jpg',
    },
  },
  aura: {
    image: 'https://img.freepik.com/free-photo/strong-man-training-gym_1303-23831.jpg?w=740',
    imageCredit: {
      title: 'Strong man training gym',
      author: 'Freepik',
      license: 'Freepik',
      sourceUrl: 'https://www.freepik.com/',
    },
  },
  market: {
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Stock_market_charts_illustration.jpg',
    imageCredit: {
      title: 'Stock market charts illustration',
      author: 'PxHere contributor',
      license: 'CC0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Stock_market_charts_illustration.jpg',
    },
  },
  ine: {
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Wikidata_Dashboard_detailed_statistics_example.png',
    imageCredit: {
      title: 'Wikidata Dashboard detailed statistics example',
      author: 'Will (Wiki Ed)',
      license: 'CC BY-SA 4.0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Wikidata_Dashboard_detailed_statistics_example.png',
    },
  },
  carpool: {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Car_pool_only_lane_%28cropped%29.JPG/1280px-Car_pool_only_lane_%28cropped%29.JPG',
    imageCredit: {
      title: 'Car pool only lane (cropped)',
      author: 'Wing',
      license: 'CC BY-SA 3.0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Car_pool_only_lane_(cropped).JPG',
    },
  },
  tfg: {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Eye_iris.jpg/1280px-Eye_iris.jpg',
    imageCredit: {
      title: 'Eye iris',
      author: 'Petr Novak / Wikipedia',
      license: 'CC BY-SA 2.5',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Eye_iris.jpg',
    },
  },
  tfm: {
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Gantt_Chart_Milestones.webp',
    imageCredit: {
      title: 'Gantt Chart Milestones',
      author: 'DovileMi',
      license: 'CC BY-SA 4.0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gantt_Chart_Milestones.webp',
    },
  },
} satisfies Record<string, ProjectImage>

export const profile = {
  name: 'Guillermo Javier Sierra-Maíllo Martínez',
  shortName: 'Guillermo Sierra-Maíllo',
  initials: 'GSM',
  location: {
    es: 'Bilbao, Vizcaya, España',
    en: 'Bilbao, Biscay, Spain',
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/guillesierra/',
    github: 'https://github.com/guillesierra',
  },
  nav: {
    es: [
      ['profile', 'Perfil'],
      ['experience', 'Experiencia'],
      ['skills', 'Skills'],
      ['projects', 'Proyectos'],
      ['education', 'Formación'],
      ['contact', 'Contacto'],
    ],
    en: [
      ['profile', 'Profile'],
      ['experience', 'Experience'],
      ['skills', 'Skills'],
      ['projects', 'Projects'],
      ['education', 'Education'],
      ['contact', 'Contact'],
    ],
  },
  hero: {
    eyebrow: {
      es: 'Ingeniería electrónica industrial y automática',
      en: 'Industrial and automatic electronics engineering',
    },
    title: {
      es: 'Construyo sistemas industriales robustos entre software, hardware y operación.',
      en: 'I build robust industrial systems between software, hardware and operations.',
    },
    role: {
      es: 'Robotics · Critical Systems · Full-Stack Development · Real-Time Systems\nGrado en Ingeniería Electrónica Industrial y Automática\nMáster en Dirección de Proyectos',
      en: 'Robotics · Critical Systems · Full-Stack Development · Real-Time Systems\nBachelor of Industrial Electronics and Automatic Engineering\nMaster in Project Management',
    },
    summary: {
      es: 'Más de seis años desarrollando soluciones software y hardware para robótica móvil, automatización industrial, sistemas embebidos, energía, ferroviario y gestión de tráfico aéreo.',
      en: 'Over six years building software and hardware solutions for mobile robotics, industrial automation, embedded systems, energy, railway and air traffic management.',
    },
    primaryAction: {
      es: 'Ver LinkedIn',
      en: 'Open LinkedIn',
    },
    githubAction: {
      es: 'Ver GitHub',
      en: 'Open GitHub',
    },
    secondaryAction: {
      es: 'Ver proyectos',
      en: 'View projects',
    },
  },
  facts: [
    {
      label: { es: 'Experiencia', en: 'Experience' },
      value: { es: '+6 años', en: '+6 years' },
    },
    {
      label: { es: 'Sectores', en: 'Sectors' },
      value: { es: 'IT · Energía · Robótica · ATM · Ferroviario', en: 'IT · Energy · Robotics · ATM · Railway' },
    },
    {
      label: { es: 'Foco', en: 'Focus' },
      value: { es: 'Control en tiempo real · Desarrollo Full-Stack', en: 'Real-time control · Full-Stack Development' },
    },
  ],
  intro: {
    title: {
      es: 'Perfil',
      en: 'Profile',
    },
    paragraphs: [
      {
        es: 'Soy ingeniero en Electrónica Industrial y Automática, especializado en robótica y sistemas críticos. He trabajado en AGVs, AMRs, brazos robóticos, PLCs, software crítico, HMIs, servicios distribuidos, telemetría en tiempo real, APIs y plataformas de operación avanzada.',
        en: 'I am an Industrial Electronics and Automation Engineer specialised in robotics and critical systems. I have worked on AGVs, AMRs, robotic arms, PLCs, critical software, HMIs, distributed services, real-time telemetry, APIs and advanced operation platforms.',
      },
      {
        es: 'Mi perfil técnico combina C/C++, Python, Go, JavaScript, Vue.js, gRPC, REST APIs, bases de datos, mensajería, protocolos industriales y cloud. Lo complemento con un máster en gestión de proyectos, lo que me permite conectar la ejecución de ingeniería con la planificación, la priorización, la coordinación con distintos equipos e interesados y la toma de decisiones orientada a la entrega.',
        en: 'My technical profile combines C/C++, Python, Go, JavaScript, Vue.js, gRPC, REST APIs, databases, messaging, industrial protocols and cloud. I complement it with a Master\'s in Project Management, allowing me to connect engineering execution with planning, prioritisation, coordination across different teams and stakeholders, and delivery-oriented decision-making.',
      },
    ],
  },
  experience: [
    {
      company: 'Minsait',
      role: {
        es: 'Business Technology Consultant',
        en: 'Business Technology Consultant',
      },
      period: {
        es: 'Enero 2024 - Actualidad',
        en: 'January 2024 - Present',
      },
      place: {
        es: 'Bilbao, España',
        en: 'Bilbao, Spain',
      },
      url: 'https://www.minsait.com/',
      logo: 'https://www.google.com/s2/favicons?domain=minsait.com&sz=64',
      companySummary: {
        es: 'Compañía de Indra Group especializada en consultoría estratégica, tecnologías digitales avanzadas y servicios IT. Diseña e implementa soluciones para acelerar la transformación digital de clientes públicos y privados.',
        en: 'Indra Group company specialised in strategic consulting, advanced digital technologies and IT services. It designs and implements solutions that accelerate digital transformation for public and private clients.',
      },
      stack: [
        'Vue.js',
        'Vuex',
        'JavaScript',
        'Go',
        'C++',
        'gRPC',
        'Protobuf',
        'REST APIs',
        'NATS',
        'Redis',
        'PostgreSQL',
        'MinIO',
        'AWS',
        'Docker',
        'Kubernetes',
        'ICCP',
        'SCADA',
      ],
      xyz: {
        achievement: [{
          es: 'Mejoré la operación avanzada de red en soluciones de control y operación en tiempo real para el sector energético y smart grids.',
          en: 'Improved advanced grid operation in real-time control and operation solutions for the energy and smart grid sector.',
        }, {
          es: 'Reforcé la disponibilidad operativa de plataformas energéticas críticas mediante mantenimiento, integración y soporte 24/7.',
          en: 'Strengthened the operational availability of critical energy platforms through maintenance, integration and 24/7 support.',
        }],
        measuredBy: [{
          es: '8 módulos software (DERMS, AGC, Smart Planner, Forecast, Hosting Capacity, iPA Master, TimeSeriesFixerMock) mantenidos y desarrollados en las plataformas Onesait Grid.',
          en: '8 software modules (DERMS, AGC, Smart Planner, Forecast, Hosting Capacity, iPA Master, TimeSeriesFixerMock) maintained and developed on the Onesait Grid platform.',
        }, {
          es: 'Desplegado en clientes como Repsol, Naturgy y UCSD.',
          en: 'Deployed at clients including Repsol, Naturgy and UCSD.',
        }, {
          es: 'Gestión de toda la red de alta y media tensión de Naturgy (Madrid, Galicia, etc.) con disponibilidad 24/7.',
          en: 'Management of Naturgy\'s entire high and medium voltage grid (Madrid, Galicia, etc.) with 24/7 availability.',
        }, {
          es: 'En Babel, gateway SCADA crítico para parques eólicos con guardias 24/7.',
          en: 'In Babel, a critical SCADA gateway for wind farms with 24/7 on-call shifts.',
        }],
        execution: [{
          es: 'Desarrollé y mantuve módulos para plataformas de operación energética (DERMS, AGC, Forecast, Hosting Capacity, Smart Planner).',
          en: 'Developed and maintained modules for energy operation platforms (DERMS, AGC, Forecast, Hosting Capacity, Smart Planner).',
        }, {
          es: 'Diseñé HMIs orientadas a estabilidad visual y trazabilidad del dato, trabajando con telemetría, señales, alarmas y datos temporales.',
          en: 'Designed HMIs focused on visual stability and data traceability, working with telemetry, signals, alarms and time-series data.',
        }, {
          es: 'Integré persistencia, mensajería, almacenamiento y despliegue cloud en las plataformas.',
          en: 'Integrated persistence, messaging, storage and cloud deployment in the platforms.',
        }, {
          es: 'En el equipo de Babel, mantengo una pasarela/middleware SCADA para comunicaciones industriales del sector eléctrico mediante ICCP y otros protocolos.',
          en: 'In the Babel team, I maintain a SCADA middleware/gateway for industrial communications in the electrical sector via ICCP and other protocols.',
        }, {
          es: 'Formo parte del grupo de retén con guardias 24/7 garantizando la disponibilidad del sistema.',
          en: 'I am part of the on-call team with 24/7 shifts ensuring system availability.',
        }],
      },
    },
    {
      company: 'Capgemini',
      role: {
        es: 'Ingeniero de sistemas',
        en: 'Systems Engineer',
      },
      period: {
        es: 'Abril 2023 - Junio 2023',
        en: 'April 2023 - June 2023',
      },
      place: {
        es: 'Oviedo, España',
        en: 'Oviedo, Spain',
      },
      url: 'https://www.capgemini.com/',
      logo: 'https://www.google.com/s2/favicons?domain=capgemini.com&sz=64',
      companySummary: {
        es: 'Grupo global de consultoría, tecnología y servicios digitales con foco en transformación empresarial e ingeniería. Ayuda a organizaciones a diseñar, construir y operar soluciones tecnológicas a escala.',
        en: 'Global consulting, technology and digital services group focused on business transformation and engineering. It helps organisations design, build and operate technology solutions at scale.',
      },
      stack: ['C', 'C++', 'Embedded Software', 'gTest', 'Git', 'Linux', 'Railway Signalling', 'Critical Systems'],
      xyz: {
        achievement: [{
          es: 'Aumenté la fiabilidad y mantenibilidad de software crítico para sistemas de señalización ferroviaria.',
          en: 'Increased the reliability and maintainability of critical software for railway signalling systems.',
        }, {
          es: 'Facilité la detección temprana de errores mediante validación automatizada de componentes embebidos.',
          en: 'Enabled earlier error detection through automated validation of embedded components.',
        }],
        measuredBy: [{
          es: 'Componentes C/C++ validados con pruebas unitarias automatizadas mediante gTest.',
          en: 'Validated C/C++ components with automated unit tests using gTest.',
        }, {
          es: 'Detección temprana de errores en un entorno regulado y de alta exigencia.',
          en: 'Earlier error detection in a regulated, high-demand environment.',
        }],
        execution: [{
          es: 'Desarrollé y mantuve componentes software para sistemas ferroviarios.',
          en: 'Developed and maintained software components for railway systems.',
        }, {
          es: 'Implementé lógica backend en C/C++ y ejecuté pruebas automatizadas.',
          en: 'Implemented backend logic in C/C++ and ran automated tests.',
        }, {
          es: 'Colaboré con equipos técnicos en validación de software embebido.',
          en: 'Collaborated with technical teams on embedded software validation.',
        }],
      },
    },
    {
      company: 'Indra',
      role: {
        es: 'Ingeniero de sistemas',
        en: 'ATM Systems Engineer',
      },
      period: {
        es: 'Enero 2022 - Abril 2023',
        en: 'January 2022 - April 2023',
      },
      place: {
        es: 'Gijón, España',
        en: 'Gijón, Spain',
      },
      url: 'https://www.indragroup.com/',
      logo: 'https://www.google.com/s2/favicons?domain=indragroup.com&sz=64',
      companySummary: {
        es: 'Grupo tecnológico español centrado en defensa, tráfico aéreo, movilidad, espacio y transformación digital. Desarrolla sistemas críticos y soluciones avanzadas para administraciones, transporte e infraestructuras.',
        en: 'Spanish technology group focused on defence, air traffic, mobility, space and digital transformation. It builds critical systems and advanced solutions for governments, transport and infrastructure.',
      },
      stack: ['Ada 95', 'C++', 'Java 11', 'REST APIs', 'gRPC', 'AMQP', 'cURL', 'Docker', 'Bash', 'Unix/Linux', 'ATM'],
      xyz: {
        achievement: [{
          es: 'Contribuí a la modernización de sistemas operacionales de gestión de red para Air Traffic Management.',
          en: 'Contributed to the modernisation of operational network management systems for Air Traffic Management.',
        }, {
          es: 'Apoyé la integración de servicios distribuidos y APIs en un contexto técnico internacional de alta disponibilidad.',
          en: 'Supported the integration of distributed services and APIs in an international high-availability technical context.',
        }],
        measuredBy: [{
          es: 'Varios componentes backend desarrollados para el futuro integrated Network Manager de EUROCONTROL.',
          en: 'Several backend components developed for EUROCONTROL\'s future integrated Network Manager.',
        }, {
          es: 'Integraciones vía APIs, servicios distribuidos y mensajería.',
          en: 'API integrations, distributed services and messaging.',
        }, {
          es: 'Volumen de tráfico correspondiente a la gestión del espacio aéreo europeo.',
          en: 'Traffic volume corresponding to European airspace management.',
        }],
        execution: [{
          es: 'Implementé lógica de negocio en lenguajes orientados a sistemas críticos (Ada 95, C++, Java).',
          en: 'Implemented business logic in languages used for critical systems (Ada 95, C++, Java).',
        }, {
          es: 'Trabajé en Unix/Linux con herramientas de desarrollo y automatización.',
          en: 'Worked in Unix/Linux with development and automation tools.',
        }, {
          es: 'Colaboré en un contexto técnico internacional de alta disponibilidad.',
          en: 'Collaborated in an international high-availability technical context.',
        }],
      },
    },
    {
      company: 'ABB',
      role: {
        es: 'Ingeniero de conectividad y ciberseguridad',
        en: 'Connectivity and Cyber-Security Engineer',
      },
      period: {
        es: 'Mayo 2021 - Enero 2022',
        en: 'May 2021 - January 2022',
      },
      place: {
        es: 'Madrigalejo del Monte, España',
        en: 'Madrigalejo del Monte, Spain',
      },
      url: 'https://www.abb.com/global/en/areas/robotics/products/mobile-robots',
      logo: 'https://www.google.com/s2/favicons?domain=abb.com&sz=64',
      companySummary: {
        es: 'Compañía tecnológica global en electrificación, automatización, robótica y motion. Sus soluciones conectan ingeniería industrial, eficiencia energética y fabricación flexible.',
        en: 'Global technology company in electrification, automation, robotics and motion. Its solutions connect industrial engineering, energy efficiency and flexible manufacturing.',
      },
      stack: ['5G', 'IoT', 'Cybersecurity', 'Embedded Systems', 'Industrial Networks', 'Cloud Security', 'Risk Analysis', 'AGV', 'AMR'],
      xyz: {
        achievement: [{
          es: 'Impulsé conectividad industrial segura y de baja latencia para AGVs, AMRs y estaciones de carga inteligentes.',
          en: 'Enabled secure, low-latency industrial connectivity for AGVs, AMRs and smart charging stations.',
        }, {
          es: 'Elevé el enfoque de ciberseguridad en soluciones industriales conectadas mediante análisis de riesgos y protección de información sensible.',
          en: 'Raised the cybersecurity focus in connected industrial solutions through risk analysis and sensitive-information protection.',
        }],
        measuredBy: [{
          es: 'Comunicaciones 5G embebidas implementadas en entornos industriales.',
          en: 'Embedded 5G communications implemented in industrial environments.',
        }, {
          es: 'Integración con requisitos de disponibilidad, seguridad y baja latencia.',
          en: 'Integration with availability, security and low-latency requirements.',
        }, {
          es: 'Análisis de riesgos en redes, cloud, móviles, embebidos y software propietario.',
          en: 'Risk analysis across networks, cloud, mobile, embedded and proprietary software.',
        }],
        execution: [{
          es: 'Desarrollé comunicaciones 5G en sistemas embebidos.',
          en: 'Developed 5G communications in embedded systems.',
        }, {
          es: 'Diseñé soluciones de protección de información sensible.',
          en: 'Designed solutions to protect sensitive information.',
        }, {
          es: 'Colaboré en proyectos donde convergen IoT, comunicaciones, robótica y ciberseguridad.',
          en: 'Collaborated on projects where IoT, communications, robotics and cybersecurity converge.',
        }],
      },
    },
    {
      company: 'ABB / ASTI Mobile Robotics',
      role: {
        es: 'Ingeniero de desarrollo e investigación',
        en: 'R&D Development Engineer',
      },
      period: {
        es: 'Agosto 2019 - Enero 2022',
        en: 'August 2019 - January 2022',
      },
      place: {
        es: 'Madrigalejo del Monte, España',
        en: 'Madrigalejo del Monte, Spain',
      },
      url: 'https://new.abb.com/news/detail/80654/abb-to-acquire-asti-mobile-robotics-group-to-drive-next-generation-of-flexible-automation-with-autonomous-mobile-robots',
      logo: 'https://www.google.com/s2/favicons?domain=abb.com&sz=64',
      companySummary: {
        es: 'ASTI fue un fabricante líder de robots móviles autónomos y AGVs para intralogística industrial, integrado posteriormente en ABB Robotics. Su tecnología amplió el portfolio de automatización flexible y AMR de ABB.',
        en: 'ASTI was a leading manufacturer of autonomous mobile robots and AGVs for industrial intralogistics, later integrated into ABB Robotics. Its technology expanded ABB Robotics’ flexible automation and AMR portfolio.',
      },
      stack: [
        'ROS',
        'C',
        'C++',
        'Python',
        'PLC',
        'CODESYS',
        'Raspberry Pi',
        'BeagleBone',
        'Arduino',
        'TCP/IP',
        'UDP',
        'OPC-UA',
        'CANopen',
        'Visual Components',
        'Digital Twins',
        'Yaskawa',
      ],
      xyz: {
        achievement: [{
          es: 'Aceleré el desarrollo, validación e integración de soluciones de robótica móvil e industrial.',
          en: 'Accelerated the development, validation and integration of mobile and industrial robotics solutions.',
        }, {
          es: 'Conecté software embebido, comunicaciones industriales y simulación para validar soluciones robóticas de I+D.',
          en: 'Connected embedded software, industrial communications and simulation to validate R&D robotics solutions.',
        }],
        measuredBy: [{
          es: 'AGVs, AMRs y brazos Yaskawa programados.',
          en: 'Programmed AGVs, AMRs and Yaskawa arms.',
        }, {
          es: 'Lógica PLC implementada en CODESYS.',
          en: 'PLC logic implemented in CODESYS.',
        }, {
          es: 'Comunicaciones industriales integradas (TCP/IP, UDP, OPC-UA, CAN, CANopen, MINICAN, IEC 61499).',
          en: 'Integrated industrial communications (TCP/IP, UDP, OPC-UA, CAN, CANopen, MINICAN, IEC 61499).',
        }, {
          es: 'Simulaciones y gemelos digitales creados. Participación en proyectos europeos de I+D.',
          en: 'Simulations and digital twins created. Participation in European R&D projects.',
        }],
        execution: [{
          es: 'Programé AGVs y robots con ROS y software propietario.',
          en: 'Programmed AGVs and robots using ROS and proprietary software.',
        }, {
          es: 'Desarrollé aplicaciones embebidas en C/C++ y Python sobre hardware industrial (Raspberry Pi, BeagleBone, Arduino).',
          en: 'Developed embedded applications in C/C++ and Python on industrial hardware (Raspberry Pi, BeagleBone, Arduino).',
        }, {
          es: 'Preparé documentación técnica, entregables y presentaciones.',
          en: 'Prepared technical documentation, deliverables and presentations.',
        }],
      },
    },
    {
      company: 'Universidad de Burgos',
      role: {
        es: 'Profesor asociado',
        en: 'Associate Lecturer',
      },
      period: {
        es: 'Marzo 2021 - Julio 2021',
        en: 'March 2021 - July 2021',
      },
      place: {
        es: 'Burgos, España',
        en: 'Burgos, Spain',
      },
      url: 'https://www.ubu.es/',
      logo: `${B}logos/ubu.svg`,
      companySummary: {
        es: 'Universidad pública de Castilla y León con actividad docente, investigadora y de transferencia. Ofrece formación universitaria y programas especializados conectados con el tejido industrial y social.',
        en: 'Public university in Castilla y León with teaching, research and knowledge-transfer activity. It offers higher education and specialised programmes connected to industry and society.',
      },
      stack: ['Industrial Robotics', 'Robotic Manipulators', 'Automation', 'Robot Programming', 'Kinematics', 'Control Systems'],
      xyz: {
        achievement: [{
          es: 'Convertí experiencia industrial en formación aplicada sobre robótica industrial y tecnologías emergentes.',
          en: 'Turned industrial experience into applied training on industrial robotics and emerging technologies.',
        }, {
          es: 'Acerqué fundamentos de cinemática, programación y control de robots a un formato docente práctico.',
          en: 'Brought fundamentals of kinematics, programming and robot control into a practical teaching format.',
        }],
        measuredBy: [{
          es: '12 alumnos formados en el título propio de Experto Universitario en Robótica Industrial y Tecnologías Emergentes.',
          en: '12 students trained in the University Expert programme in Industrial Robotics and Emerging Technologies.',
        }, {
          es: '10 horas lectivas impartidas con alto grado de satisfacción.',
          en: '10 teaching hours delivered with high satisfaction scores.',
        }],
        execution: [{
          es: 'Preparé contenidos técnicos sobre robótica industrial.',
          en: 'Prepared technical content on industrial robotics.',
        }, {
          es: 'Expliqué fundamentos de cinemática, programación y control de robots industriales.',
          en: 'Explained fundamentals of kinematics, programming and industrial robot control.',
        }, {
          es: 'Apoyé la formación práctica en automatización y robótica.',
          en: 'Supported practical training in automation and robotics.',
        }],
      },
    },
    {
      company: 'Canonical Robots',
      role: {
        es: 'Ingeniero Junior en Robótica',
        en: 'Junior Robotics Engineer',
      },
      period: {
        es: 'Mayo 2019 - Agosto 2019',
        en: 'May 2019 - August 2019',
      },
      place: {
        es: 'Gijón, España',
        en: 'Gijón, Spain',
      },
      url: 'https://www.canonicalrobots.com/',
      logo: `${B}logos/canonical-robots.png`,
      companySummary: {
        es: 'Empresa asturiana de robótica colaborativa orientada al diseño, fabricación y comercialización de cobots y soluciones robóticas. Trabaja en automatización industrial, visión artificial y robots de 6 grados de libertad.',
        en: 'Asturian collaborative robotics company focused on the design, manufacturing and commercialisation of cobots and robotic solutions. It works on industrial automation, computer vision and 6-axis robots.',
      },
      stack: ['Collaborative Robotics', 'Elfin Cobot', "Han's Robot", 'Robot Programming', 'TIG Welding', 'Computer Vision', 'Point Clouds', '3D Modeling'],
      xyz: {
        achievement: [{
          es: 'Construí demostradores de robótica colaborativa y visión artificial para aplicaciones industriales y presentaciones comerciales.',
          en: 'Built collaborative robotics and computer vision demonstrators for industrial applications and commercial presentations.',
        }, {
          es: 'Apoyé la validación comercial de aplicaciones robóticas mediante demos funcionales y material técnico.',
          en: 'Supported commercial validation of robotics applications through functional demos and technical material.',
        }],
        measuredBy: [{
          es: 'Demos funcionales con brazo colaborativo Elfin.',
          en: 'Functional demos with an Elfin collaborative arm.',
        }, {
          es: 'Aplicaciones de soldadura TIG y asistencia física.',
          en: 'TIG welding and physical assistance applications.',
        }, {
          es: 'Procesamiento de nubes de puntos y material técnico de soporte comercial.',
          en: 'Point-cloud processing and technical material for commercial support.',
        }],
        execution: [{
          es: 'Programé el cobot Elfin de Han\u2019s Robot.',
          en: "Programmed Han's Robot Elfin cobot.",
        }, {
          es: 'Desarrollé aplicaciones robóticas con visión artificial y modelado 3D.',
          en: 'Developed robotic applications with computer vision and 3D modelling.',
        }, {
          es: 'Preparé demostraciones para eventos, ferias y presentaciones.',
          en: 'Prepared demos for events, fairs and presentations.',
        }],
      },
    },
  ] satisfies ExperienceItem[],
  skillGroups: [
    {
      title: { es: 'Software y backend', en: 'Software and backend' },
      skills: [
        { name: { es: 'C++', en: 'C++' }, level: 83 },
        { name: { es: 'Python', en: 'Python' }, level: 75 },
        { name: { es: 'Go', en: 'Go' }, level: 85 },
        { name: { es: 'JavaScript', en: 'JavaScript' }, level: 73 },
        { name: { es: 'Java', en: 'Java' }, level: 50 },
        { name: { es: 'gRPC / REST APIs', en: 'gRPC / REST APIs' }, level: 79 },
        { name: { es: 'Protobuf', en: 'Protobuf' }, level: 71 },
      ],
    },
    {
      title: { es: 'Frontend y HMI', en: 'Frontend and HMI' },
      skills: [
        { name: { es: 'Vue.js / Vuex', en: 'Vue.js / Vuex' }, level: 79 },
        { name: { es: 'HTML5 / CSS3', en: 'HTML5 / CSS3' }, level: 75 },
        { name: { es: 'React', en: 'React' }, level: 50 },
        { name: { es: 'HMIs industriales', en: 'Industrial HMIs' }, level: 81 },
        { name: { es: 'Estabilidad visual', en: 'Visual stability' }, level: 82 },
        { name: { es: 'Trazabilidad de datos', en: 'Data traceability' }, level: 95 },
      ],
    },
    {
      title: { es: 'Cloud y DevOps', en: 'Cloud and DevOps' },
      skills: [
        { name: { es: 'Docker', en: 'Docker' }, level: 77 },
        { name: { es: 'Kubernetes', en: 'Kubernetes' }, level: 71 },
        { name: { es: 'AWS', en: 'AWS' }, level: 50 },
        { name: { es: 'Linux / Bash', en: 'Linux / Bash' }, level: 79 },
        { name: { es: 'Git', en: 'Git' }, level: 81 },
        { name: { es: 'CI/CD', en: 'CI/CD' }, level: 50 },
        { name: { es: 'DevOps', en: 'DevOps' }, level: 45 },
      ],
    },
    {
      title: { es: 'Robótica e industria', en: 'Robotics and industry' },
      skills: [
        { name: { es: 'AGV / AMR', en: 'AGV / AMR' }, level: 85 },
        { name: { es: 'ROS', en: 'ROS' }, level: 55 },
        { name: { es: 'PLC / CODESYS', en: 'PLC / CODESYS' }, level: 50 },
        { name: { es: 'Robots Yaskawa', en: 'Yaskawa robots' }, level: 55 },
        { name: { es: 'Gemelos digitales', en: 'Digital twins' }, level: 35 },
        { name: { es: 'IoT industrial', en: 'Industrial IoT' }, level: 77 },
      ],
    },
    {
      title: { es: 'Sistemas críticos y energía', en: 'Critical systems and energy' },
      skills: [
        { name: { es: 'Sistemas en tiempo real', en: 'Real-time systems' }, level: 81 },
        { name: { es: 'Smart grids', en: 'Smart grids' }, level: 79 },
        { name: { es: 'EMS / DERMS / AOM', en: 'EMS / DERMS / AOM' }, level: 77 },
        { name: { es: 'Air Traffic Management', en: 'Air Traffic Management' }, level: 50 },
        { name: { es: 'Señalización ferroviaria', en: 'Railway signalling' }, level: 25 },
        { name: { es: 'Ciberseguridad industrial', en: 'Industrial cybersecurity' }, level: 45 },
      ],
    },
    {
      title: { es: 'Idiomas', en: 'Languages' },
      skills: [
        { name: { es: 'Español', en: 'Spanish' }, level: 100 },
        { name: { es: 'Inglés', en: 'English' }, level: 81 },
        { name: { es: 'Italiano', en: 'Italian' }, level: 33 },
      ],
    },
  ] satisfies { title: TextBlock; skills: SkillItem[] }[],
  professionalProjects: [
    {
      title: {
        es: 'Operación Autónoma de la Red (AOM)',
        en: 'Autonomous Grid Operation (AOM)',
      },
      summary: {
        es: 'Soluciones smart grid para operación autónoma de redes de distribución eléctrica, integrando sistemas, analítica en tiempo real y automatización de maniobras.',
        en: 'Smart grid solutions for autonomous operation of electricity distribution networks, integrating systems, real-time analytics and manoeuvre automation.',
      },
      details: [
        {
          es: 'Foco en reducción de tiempos de interrupción, resiliencia de red y soporte operativo a brigadas.',
          en: 'Focused on reducing interruption times, improving grid resilience and supporting field crews.',
        },
      ],
      link: 'https://www.minsaitacs.com/en/article/ask-expert-value-integrated-distributed-energy-resource-platform',
      ...projectImages.aom,
      visual: 'energy-grid',
      tags: ['Smart grid', 'AOM', 'Real-time'],
    },
    {
      title: {
        es: 'Energy Management System (EMS)',
        en: 'Energy Management System (EMS)',
      },
      summary: {
        es: 'Trabajo sobre soluciones EMS integradas en la plataforma Onesait real-time system para operación energética avanzada.',
        en: 'Work on EMS solutions integrated into the Onesait real-time system platform for advanced energy operation.',
      },
      details: [
        {
          es: 'Contexto de plataforma crítica para operación, supervisión y toma de decisión energética.',
          en: 'Critical-platform context for energy operation, supervision and decision-making.',
        },
      ],
      link: 'https://www.minsaitacs.com/en/energy-management-system',
      ...projectImages.ems,
      visual: 'ems-dashboard',
      tags: ['EMS', 'Energy', 'Onesait'],
    },
    {
      title: {
        es: 'DERConnect [UCSD]',
        en: 'DERConnect [UCSD]',
      },
      summary: {
        es: 'Contexto de microred campus y simulación masiva para validar control distribuido de DERs, flexibilidad de carga, ciberseguridad y operación plug-and-play.',
        en: 'Campus-scale microgrid and large-scale simulation context to validate distributed DER control, load flexibility, cybersecurity and plug-and-play operation.',
      },
      details: [
        {
          es: 'Living lab con microred real, simulación HIL/RTDS/Typhoon y miles de DERs reales/simulados.',
          en: 'Living lab with a real microgrid, HIL/RTDS/Typhoon simulation and thousands of real/simulated DERs.',
        },
      ],
      link: 'https://derconnect.ucsd.edu/',
      videoUrl: 'https://www.youtube.com/watch?v=Vc4xf1Yff2A',
      ...projectImages.der,
      visual: 'microgrid',
      tags: ['DER', 'Microgrid', 'Simulation'],
    },
    {
      title: {
        es: 'integrated Network Manager (iNM)',
        en: 'integrated Network Manager (iNM)',
      },
      summary: {
        es: 'Participación en el programa de transformación digital de EUROCONTROL para sustituir sistemas legacy de flow and network management.',
        en: "Participation in EUROCONTROL's digital transformation programme to replace legacy flow and network management systems.",
      },
      details: [
        {
          es: 'Trabajo en sistemas operacionales resilientes y escalables para la red europea de aviación.',
          en: 'Work on resilient and scalable operational systems for the European aviation network.',
        },
      ],
      link: 'https://www.indragroup.com/es/noticias/indra-gana-contrato-marco-173-millones-euros-digitalizar-gestion-red-navegacion-aerea',
      ...projectImages.inm,
      visual: 'air-traffic',
      tags: ['ATM', 'EUROCONTROL', 'Critical systems'],
    },
    {
      title: {
        es: 'GASBOT',
        en: 'GASBOT',
      },
      summary: {
        es: 'Piloto de manipulador móvil para logística interna de cestas de botellas de gas, en cooperación con Air Liquide, ASTI, Tecnalia y Danish Technological Institute.',
        en: 'Mobile manipulator pilot for internal logistics of gas cylinder baskets, in cooperation with Air Liquide, ASTI, Tecnalia and Danish Technological Institute.',
      },
      details: [
        {
          es: 'Validación de robot móvil manipulador para mover botellas entre racks heterogéneos y homogéneos.',
          en: 'Validation of a mobile manipulator robot for moving cylinders between heterogeneous and homogeneous racks.',
        },
      ],
      link: 'https://robott-net.eu/pilots/gasbot/',
      videoUrl: 'https://www.youtube.com/watch?v=IyQoAEIDwMA',
      ...projectImages.gasbot,
      visual: 'mobile-robot',
      tags: ['Mobile manipulator', 'Logistics', 'R&D'],
    },
    {
      title: {
        es: 'Safe-AGV',
        en: 'Safe-AGV',
      },
      summary: {
        es: 'Sistema de seguridad para detección de personas mediante radiofrecuencia, aplicable a distintos tipos de AGVs y cargas.',
        en: 'Safety system for detecting people using radio frequency, applicable to different AGV types and payloads.',
      },
      details: [
        {
          es: 'Orientado a resolver limitaciones de sistemas comerciales en precisión y aplicabilidad en entornos AGV.',
          en: 'Aimed at addressing commercial-system limitations in precision and applicability for AGV environments.',
        },
      ],
      link: 'https://www.ceit.es/es/soluciones-industria/tics/safe-agv',
      ...projectImages.safeAgv,
      visual: 'agv-safety',
      tags: ['AGV', 'Safety', 'RF'],
    },
    {
      title: {
        es: 'CoLLaboratE',
        en: 'CoLLaboratE',
      },
      summary: {
        es: 'Proyecto europeo orientado a que robots industriales aprendan a colaborar con operarios humanos en tareas de fabricación flexibles.',
        en: 'European project focused on helping industrial robots learn to collaborate with human workers in flexible manufacturing tasks.',
      },
      details: [
        {
          es: 'Aplicación en fabricación flexible, colaboración humano-robot y aprendizaje de nuevas tareas industriales.',
          en: 'Application in flexible manufacturing, human-robot collaboration and learning new industrial tasks.',
        },
      ],
      link: 'https://collaborate-project.eu/',
      ...projectImages.collaborate,
      visual: 'cobot',
      tags: ['Collaborative robotics', 'EU R&D', 'Manufacturing'],
    },
    {
      title: {
        es: 'BOOST 4.0',
        en: 'BOOST 4.0',
      },
      summary: {
        es: 'Iniciativa europea de Big Data para Industria 4.0, orientada a construir el European Industrial Data Space y mejorar competitividad industrial.',
        en: 'European Big Data for Industry 4.0 initiative focused on building the European Industrial Data Space and improving industrial competitiveness.',
      },
      details: [
        {
          es: 'Contexto de datos industriales, interoperabilidad y competitividad de fabricación europea.',
          en: 'Industrial data, interoperability and European manufacturing competitiveness context.',
        },
      ],
      link: 'https://boost40.eu/',
      ...projectImages.boost,
      visual: 'industrial-data',
      tags: ['Industry 4.0', 'Big Data', 'EU R&D'],
    },
  ] satisfies ProjectItem[],
  personalProjects: [
    {
      title: {
        es: 'HigIA',
        en: 'HigIA',
      },
      summary: {
        es: 'Plataforma personal para recopilar, normalizar, enlazar y visualizar información pública sobre medicamentos, alertas de seguridad, clasificación ATC/DDD y consumo farmacéutico en Asturias y España.',
        en: 'Personal platform for collecting, normalising, linking and visualising public information about medicines, safety alerts, ATC/DDD classification and medicine consumption in Asturias and Spain.',
      },
      details: [
        {
          es: 'Arquitectura con FastAPI, SQLite, SQLAlchemy, scrapers, normalizadores, React/Vite, exportación estática y documentación legal/técnica.',
          en: 'Architecture with FastAPI, SQLite, SQLAlchemy, scrapers, normalisers, React/Vite, static export and legal/technical documentation.',
        },
      ],
      link: 'https://github.com/guillesierra/HigIA',
      ...projectImages.higia,
      visual: 'health-data',
      tags: ['Python', 'FastAPI', 'React', 'Health data', 'MIT'],
    },
    {
      title: {
        es: 'Local DNA Viewer',
        en: 'Local DNA Viewer',
      },
      summary: {
        es: 'Aplicación local-first y offline para Windows que importa archivos RAW DNA de MyHeritage y permite explorar SNPs con una base local extensible.',
        en: 'Local-first offline Windows app that imports MyHeritage RAW DNA files and explores SNPs with an extensible local database.',
      },
      details: [
        {
          es: 'Diseñada con principios fuertes de privacidad: sin backend remoto, sin telemetría, CSP sin conexiones externas y procesamiento en dispositivo.',
          en: 'Designed with strong privacy principles: no remote backend, no telemetry, CSP with no external connections and on-device processing.',
        },
      ],
      link: 'https://github.com/guillesierra/Local-DNA-Viewer',
      ...projectImages.dna,
      visual: 'dna',
      tags: ['TypeScript', 'Tauri', 'Rust', 'Privacy'],
    },
    {
      title: {
        es: 'Aura Lift',
        en: 'Aura Lift',
      },
      summary: {
        es: 'App móvil de entrenamiento en Flutter para registro de sesiones, progreso, frecuencia cardiaca, perfil, capa social local y coaching basado en datos.',
        en: 'Flutter training app for workout logging, progress, heart-rate data, profile, local social layer and data-driven coaching.',
      },
      details: [
        {
          es: 'Incluye tema claro/oscuro, idioma ES/EN, responsive testing y estructura modular por features.',
          en: 'Includes light/dark theme, ES/EN localisation, responsive testing and feature-based modular architecture.',
        },
      ],
      link: 'https://github.com/guillesierra/Aura-Lift',
      ...projectImages.aura,
      visual: 'fitness',
      tags: ['Flutter', 'Dart', 'Mobile', 'Health'],
    },
    {
      title: {
        es: 'Open Market Terminal',
        en: 'Open Market Terminal',
      },
      summary: {
        es: 'Terminal financiero local-first con Next.js, SQLite y fuentes gratuitas para mercado, gráficos, RSS y caché local.',
        en: 'Local-first financial terminal with Next.js, SQLite and free sources for market data, charts, RSS and local caching.',
      },
      details: [
        {
          es: 'Stack con Next.js 14, TypeScript, Tailwind, Zustand, Lightweight Charts, better-sqlite3 y scaffold Tauri.',
          en: 'Stack with Next.js 14, TypeScript, Tailwind, Zustand, Lightweight Charts, better-sqlite3 and Tauri scaffold.',
        },
      ],
      link: 'https://github.com/guillesierra/Open-Market-Terminal',
      ...projectImages.market,
      visual: 'market',
      tags: ['TypeScript', 'Next.js', 'SQLite', 'Finance'],
    },
    {
      title: {
        es: 'Observatorio INE',
        en: 'Observatorio INE',
      },
      summary: {
        es: 'Aplicación web estática para explorar indicadores del INE usando la API JSON oficial, con ingesta, normalización, validación y snapshot web.',
        en: 'Static web app to explore INE indicators using the official JSON API, with ingestion, normalisation, validation and web snapshots.',
      },
      details: [
        {
          es: 'Flujo de datos con descarga multitemática, métricas, relaciones, anomalías territoriales y validación entre JSON, snapshot JS y SQLite.',
          en: 'Data pipeline with multi-topic downloads, metrics, relationships, territorial anomalies and validation across JSON, JS snapshot and SQLite.',
        },
      ],
      link: 'https://github.com/guillesierra/observatorioINE',
      ...projectImages.ine,
      visual: 'public-data',
      tags: ['JavaScript', 'INE API', 'Data', 'Static app'],
    },
    {
      title: {
        es: 'Car Pooling Challenge Cabify',
        en: 'Car Pooling Challenge Cabify',
      },
      summary: {
        es: 'Servicio backend en Go que implementa un contrato HTTP de car pooling con estado en memoria, asignación determinista y FIFO cuando es posible.',
        en: 'Go backend service implementing a car-pooling HTTP contract with in-memory state, deterministic assignment and FIFO when possible.',
      },
      details: [
        {
          es: 'Modelo de dominio simple, selección best-fit, endpoints /status, /cars, /journey, /dropoff y /locate.',
          en: 'Simple domain model, best-fit selection and /status, /cars, /journey, /dropoff and /locate endpoints.',
        },
      ],
      link: 'https://github.com/guillesierra/Car-Pooling-Challenge-Cabify',
      ...projectImages.carpool,
      visual: 'mobility',
      tags: ['Go', 'API', 'Backend', 'Challenge'],
    },
    {
      title: {
        es: 'TFG · Procesamiento y análisis de imágenes digitales con fines biométricos',
        en: 'Final Degree Project · Digital image processing and analysis for biometrics',
      },
      summary: {
        es: 'Herramienta de visión artificial para localizar iris y pupila en imágenes digitales del ojo humano y extraer parámetros biométricos medibles con fines de análisis y validación.',
        en: 'Computer-vision tool to locate iris and pupil in digital images of the human eye and extract measurable biometric parameters for analysis and validation.',
      },
      details: [
        {
          es: 'Desarrollé un flujo de procesado con escala de grises, binarización, operaciones morfológicas, desenfoque gaussiano, detector de bordes Canny y Transformada Circular de Hough.',
          en: 'Built a processing pipeline with grayscale conversion, binarisation, morphological operations, Gaussian blur, Canny edge detection and Circular Hough Transform.',
        },
        {
          es: 'El sistema calcula centro y radio de iris/pupila, distancia entre centros, diámetro y área pupilar, porcentaje de dilatación respecto al iris, tono HUE, color y brillo del iris.',
          en: 'The system computes iris/pupil centre and radius, centre distance, pupil diameter and area, dilation percentage against the iris, HUE tone, colour and iris brightness.',
        },
        {
          es: 'Validación con 10 imágenes reales y 500 imágenes sintéticas; los resultados muestran errores reducidos, con desviaciones sistemáticas identificadas y fácilmente corregibles.',
          en: 'Validated with 10 real images and 500 synthetic images; results showed low errors, with identified systematic deviations that were easy to correct.',
        },
      ],
      link: `${B}docs/tfg-procesamiento-imagenes-biometricas.pdf`,
      ...projectImages.tfg,
      visual: 'biometrics',
      tags: ['TFG', 'Computer vision', 'Canny', 'Hough Transform', 'Biometrics'],
    },
    {
      title: {
        es: 'TFM · El teletrabajo en proyectos de sistemas de información',
        en: 'Master Thesis · Remote work in information systems projects',
      },
      summary: {
        es: 'Trabajo Fin de Máster sobre el impacto del teletrabajo en el desarrollo y la gestión de proyectos de sistemas de información, con foco en sector TI, metodologías, herramientas y percepción de profesionales.',
        en: 'Master Thesis on the impact of remote work on the development and management of information systems projects, focused on IT, methodologies, tools and professionals’ perceptions.',
      },
      details: [
        {
          es: 'Metodología basada en revisión de literatura, análisis de metodologías de gestión, encuesta a profesionales TI y estudio de casos/herramientas de trabajo remoto.',
          en: 'Methodology based on literature review, analysis of project-management methodologies, a survey of IT professionals and review of remote-work tools/cases.',
        },
        {
          es: 'Resultados destacados: 67,7% de participantes con dos años o más de experiencia teletrabajando; 68,2% considera viable la gestión remota si existen herramientas y procesos adecuados.',
          en: 'Key findings: 67.7% of participants had two or more years of remote-work experience; 68.2% considered remote project management viable with adequate tools and processes.',
        },
        {
          es: 'Propone buenas prácticas y una arquitectura de colaboración integrando Teams, Jira, Bitbucket, Confluence, IBM DOORS, flujos CI/CD y medidas de seguridad como 2FA, cifrado y cumplimiento GDPR.',
          en: 'Proposes good practices and a collaboration architecture integrating Teams, Jira, Bitbucket, Confluence, IBM DOORS, CI/CD flows and security measures such as 2FA, encryption and GDPR compliance.',
        },
      ],
      link: `${B}docs/tfm-teletrabajo-sistemas-informacion.pdf`,
      ...projectImages.tfm,
      visual: 'project-management',
      tags: ['TFM', 'Remote work', 'Information systems', 'Survey', 'Project management'],
    },
  ] satisfies ProjectItem[],
  education: [
    {
      degree: {
        es: 'Máster en Dirección de Proyectos',
        en: 'Master in Project Management',
      },
      institution: 'Universidad de Oviedo',
      url: 'https://www.uniovi.es/estudia/masteres/ingenieriayarquitectura/proyectos',
      logos: [
        {
          src: `${B}logos/uniovi.png`,
          alt: 'Universidad de Oviedo',
          url: 'https://www.uniovi.es/',
        },
      ],
      period: {
        es: '2022 - 2024',
        en: '2022 - 2024',
      },
      place: {
        es: 'España',
        en: 'Spain',
      },
      details: [
        {
          es: 'Máster interuniversitario impartido por las universidades de Oviedo, La Rioja y Pública de Navarra, con formación específica en los principios de la Dirección de Proyectos y en las competencias necesarias para la dirección integral de un proyecto.',
          en: 'Interuniversity master delivered by the universities of Oviedo, La Rioja and Public University of Navarra, focused on the principles of Project Management and the skills required for end-to-end project leadership.',
        },
        {
          es: 'TFM: El teletrabajo en el desarrollo de proyectos de sistemas de información.',
          en: 'Master thesis: Teleworking in the development of information systems projects.',
          url: `${B}docs/tfm-teletrabajo-sistemas-informacion.pdf`,
        },
      ],
    },
    {
      degree: {
        es: 'Grado en Ingeniería Electrónica Industrial y Automática',
        en: 'Bachelor of Industrial Electronics and Automatic Engineering',
      },
      institution: 'Universidad de Oviedo',
      url: 'https://www.uniovi.es/',
      logos: [
        {
          src: `${B}logos/uniovi.png`,
          alt: 'Universidad de Oviedo',
          url: 'https://www.uniovi.es/',
        },
        {
          src: `${B}logos/unibo.png`,
          alt: 'Università di Bologna',
          url: 'https://www.unibo.it/',
        },
      ],
      period: {
        es: '2015 - 2019',
        en: '2015 - 2019',
      },
      place: {
        es: 'Asturias, España',
        en: 'Asturias, Spain',
      },
      details: [
        {
          es: 'Mención en Robótica. Itinerario Bilingüe (Inglés y Español).',
          en: 'Robotics mention. Bilingual track (English and Spanish).',
        },
        {
          es: 'Mentor en el programa a-dUO para nuevos estudiantes Erasmus.',
          en: 'Mentor in the a-dUO programme for new Erasmus students.',
          url: 'https://www.uniovi.es/estudia/movilidad/extranjeros/ayuda/aduo',
        },
        {
          es: 'Miembro de Erasmus Student Network (ESN), organización internacional de estudiantes sin ánimo de lucro.',
          en: 'Member of Erasmus Student Network (ESN), a non-profit international student organisation.',
          url: 'https://esn.org/',
        },
        {
          es: 'Erasmus en Università di Bologna.',
          en: 'Erasmus year at Università di Bologna.',
          url: 'https://www.unibo.it/',
        },
        {
          es: 'TFG: Procesamiento y análisis de imágenes digitales con fines biométricos.',
          en: 'Final project: Digital image processing and analysis for biometric purposes.',
          url: `${B}docs/tfg-procesamiento-imagenes-biometricas.pdf`,
        },
      ],
    },
    {
      degree: {
        es: 'Graduado en Bachillerato Científico-tecnológico · Bachiller Científico-tecnológico',
        en: 'Scientific-Technological Baccalaureate graduate',
      },
      institution: 'Amor de Dios Oviedo',
      url: 'https://amordediosoviedo.es/',
      logos: [
        {
          src: `${B}logos/amor-de-dios-oviedo.png`,
          alt: 'Colegio Amor de Dios Oviedo',
          url: 'https://amordediosoviedo.es/',
        },
      ],
      period: {
        es: '1998 - 2013',
        en: '1998 - 2013',
      },
      place: {
        es: 'Oviedo, España',
        en: 'Oviedo, Spain',
      },
      details: [
        {
          es: 'Centro mixto religioso donde recibí enseñanzas de Educación Infantil, Educación Primaria y Educación Secundaria en modalidad concertada.',
          en: 'Religious co-educational school where I completed Early Childhood, Primary and Secondary Education under the publicly funded model.',
        },
        {
          es: 'Bachillerato Científico Tecnológico cursado en modalidad privada.',
          en: 'Scientific-Technological Baccalaureate completed under the private model.',
        },
      ],
    },
  ] satisfies EducationItem[],
  certifications: [
    {
      title: 'Kubernetes sencillo para desarrolladores',
      issuer: 'Udemy',
      period: { es: 'Julio 2026', en: 'July 2026' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-5d948c3e-1625-40c5-847e-adc7557a8f07.pdf',
      featured: true,
    },
    {
      title: 'Practical Test Driven Development for Java Programmers',
      issuer: 'Udemy',
      period: { es: 'Julio 2026', en: 'July 2026' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-92c3fc22-806e-4a38-89c6-8bbef8c60c3b.pdf',
      featured: true,
    },
    {
      title: 'Claude Code 101',
      issuer: 'Anthropic',
      period: { es: 'Mayo 2026', en: 'May 2026' },
      icon: 'https://www.google.com/s2/favicons?domain=anthropic.com&sz=64',
      url: 'https://verify.skilljar.com/c/doj7iv3956t8',
      featured: true,
    },
    {
      title: 'Introduction to Claude Cowork',
      issuer: 'Anthropic',
      period: { es: 'Mayo 2026', en: 'May 2026' },
      icon: 'https://www.google.com/s2/favicons?domain=anthropic.com&sz=64',
      url: 'https://verify.skilljar.com/c/o77s4quu2b6n',
    },
    {
      title: 'Claude Code in Action',
      issuer: 'Anthropic',
      period: { es: 'Marzo 2026', en: 'March 2026' },
      icon: 'https://www.google.com/s2/favicons?domain=anthropic.com&sz=64',
      url: 'http://verify.skilljar.com/c/w52o582tzkjf',
      featured: true,
    },
    {
      title: 'Model Context Protocol: Advanced Topics',
      issuer: 'Anthropic',
      period: { es: 'Marzo 2026', en: 'March 2026' },
      icon: 'https://www.google.com/s2/favicons?domain=anthropic.com&sz=64',
      url: 'http://verify.skilljar.com/c/sxxe2mo6u7x4',
      featured: true,
    },
    {
      title: 'Claude 101',
      issuer: 'Anthropic',
      period: { es: 'Marzo 2026', en: 'March 2026' },
      icon: 'https://www.google.com/s2/favicons?domain=anthropic.com&sz=64',
      url: 'http://verify.skilljar.com/c/u6ui468f5vee',
    },
    {
      title: 'DevOps Fundamentals',
      issuer: 'Fundae',
      period: { es: 'Noviembre 2024', en: 'November 2024' },
      icon: 'https://www.google.com/s2/favicons?domain=fundae.es&sz=64',
      featured: true,
    },
    {
      title: 'Curso DASA DevOps Fundamentals',
      issuer: 'IT Institute',
      period: { es: 'Octubre 2024', en: 'October 2024' },
      icon: 'https://www.google.com/s2/favicons?domain=it-institute.org&sz=64',
      url: 'https://www.acreditta.com/credential/ea0b88c9-ed0b-4244-b290-4656647e7abe?utm_source=linkedin_profile&resource_type=badge&resource=ea0b88c9-ed0b-4244-b290-4656647e7abe',
      featured: true,
    },
    {
      title: 'C++ 11',
      issuer: 'LOYAL INFINITY',
      period: { es: 'Septiembre 2024', en: 'September 2024' },
      icon: 'https://www.google.com/s2/favicons?domain=loyalinfinity.com&sz=64',
      featured: true,
    },
    {
      title: 'CMake, Tests and Tooling for C/C++ Projects',
      issuer: 'Udemy',
      period: { es: 'Enero 2024', en: 'January 2024' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-ee1f164e-c50f-4042-826e-668afcadfc63.pdf',
      featured: true,
    },
    {
      title: "Go: The Complete Developer's Guide",
      issuer: 'Udemy',
      period: { es: 'Enero 2024', en: 'January 2024' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-405058e1-2392-4266-88b6-1b77a843a3bb.pdf',
      featured: true,
    },
    {
      title: 'gRPC [Golang] Master Class: Build Modern API & Microservices',
      issuer: 'Udemy',
      period: { es: 'Enero 2024', en: 'January 2024' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-3ce3ca51-9130-4e63-bafe-a6e65731d857.pdf',
      featured: true,
    },
    {
      title: 'Kubernetes for the Absolute Beginners - Hands-on',
      issuer: 'Udemy',
      period: { es: 'Enero 2024', en: 'January 2024' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-553160ee-f4be-47f3-9cef-4ac1d5022bda.pdf',
      featured: true,
    },
    {
      title: "Learn How To Code: Google's Go Programming Language",
      issuer: 'Udemy',
      period: { es: 'Enero 2024', en: 'January 2024' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-c6b51178-0888-4c15-a7f3-faa353a7a9d6.pdf',
    },
    {
      title: 'Beginning C++ Programming - From Beginner to Beyond',
      issuer: 'Udemy',
      period: { es: 'Noviembre 2023', en: 'November 2023' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-55afa6c6-c636-49b7-b61e-6466cd115136.pdf',
      featured: true,
    },
    {
      title: 'Curso Básico de Ciberseguridad',
      issuer: 'CCN-CERT',
      period: { es: 'Noviembre 2023', en: 'November 2023' },
      icon: 'https://www.google.com/s2/favicons?domain=ccn-cert.cni.es&sz=64',
      featured: true,
    },
    {
      title: 'Curso Seguridad en Infraestructuras de Red',
      issuer: 'CCN-CERT',
      period: { es: 'Noviembre 2023', en: 'November 2023' },
      icon: 'https://www.google.com/s2/favicons?domain=ccn-cert.cni.es&sz=64',
      featured: true,
    },
    {
      title: 'Design Patterns in Python',
      issuer: 'Udemy',
      period: { es: 'Marzo 2023', en: 'March 2023' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-e064dbf4-39bb-44e9-bd64-6a1592f1f6c7.pdf',
    },
    {
      title: 'Deep Learning A-Z: Hands-On Artificial Neural Networks',
      issuer: 'Udemy',
      period: { es: 'Febrero 2023', en: 'February 2023' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-69b0f131-90f8-4df5-817e-72e345b17f12.pdf',
    },
    {
      title: 'Inside ATM [GEN-ATM-INTRO]',
      issuer: 'EUROCONTROL',
      period: { es: 'Febrero 2023', en: 'February 2023' },
      icon: 'https://www.google.com/s2/favicons?domain=eurocontrol.int&sz=64',
      url: 'https://learningzone.eurocontrol.int/ilp/restapi/lms/courses/10330524/certificate?provideAsDownload=true',
      featured: true,
    },
    {
      title: 'AZ-900: Microsoft Azure Fundamentals Exam Prep',
      issuer: 'Udemy',
      period: { es: 'Noviembre 2022', en: 'November 2022' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-32c7f7e5-5567-4e67-ad57-3841627c1c1f.pdf',
    },
    {
      title: 'Curso completo programación .Net/.Net Core/.Net 5 (C#)',
      issuer: 'Udemy',
      period: { es: 'Julio 2022', en: 'July 2022' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://www.udemy.com/certificate/UC-7f679f8b-749e-499c-a993-6d175c106c63/',
    },
    {
      title: 'IFPS and Flight Planning E-learning [NMO-FPL-INTRO]',
      issuer: 'EUROCONTROL',
      period: { es: 'Junio 2022', en: 'June 2022' },
      icon: 'https://www.google.com/s2/favicons?domain=eurocontrol.int&sz=64',
      url: 'https://learningzone.eurocontrol.int/ilp/restapi/lms/courses/10340460/certificate?provideAsDownload=true',
      featured: true,
    },
    {
      title: 'Beginning Project Management: Project Management Level One',
      issuer: 'Udemy',
      period: { es: 'Mayo 2022', en: 'May 2022' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://ude.my/UC-ec8e0e1c-31ff-49ef-8a66-86c63a690435.pdf',
    },
    {
      title: 'Git Essentials: Learn Git with Bitbucket and Sourcetree',
      issuer: 'Udemy',
      period: { es: 'Mayo 2022', en: 'May 2022' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://www.udemy.com/certificate/UC-91ad0ebf-1b52-4054-8a7b-c2d853150ceb/',
    },
    {
      title: 'React - The Complete Guide',
      issuer: 'Udemy',
      period: { es: 'Abril 2022', en: 'April 2022' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://ude.my/UC-f99b59fd-9ab0-45d1-9569-67ebb8f9c053',
      featured: true,
    },
    {
      title: 'DevOps, CI/CD for Beginners',
      issuer: 'Udemy',
      period: { es: 'Enero 2022', en: 'January 2022' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://ude.my/UC-0ebafdaa-ca7e-4e03-8f11-8eaa3282b13d',
      featured: true,
    },
    {
      title: 'Docker for the Absolute Beginner - Hands On - DevOps',
      issuer: 'Udemy',
      period: { es: 'Enero 2022', en: 'January 2022' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://ude.my/UC-28721c51-4f73-4553-af90-a9d430ee9ac5',
      featured: true,
    },
    {
      title: 'Udemy Labs - Docker for the Absolute Beginner',
      issuer: 'KodeKloud',
      period: { es: 'Enero 2022', en: 'January 2022' },
      icon: 'https://www.google.com/s2/favicons?domain=kodekloud.com&sz=64',
      url: 'https://kodekloud.com/certificates/course-certificate/?course_id=365111&cert-nonce=1f3b45a28e',
    },
    {
      title: 'Linux Shell Scripting: A Project-Based Approach to Learning',
      issuer: 'Udemy',
      period: { es: 'Enero 2022', en: 'January 2022' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://ude.my/UC-b831c653-f28c-4f9d-ad94-394ace5133d6',
    },
    {
      title: 'Learning to work with Emacs',
      issuer: 'Udemy',
      period: { es: 'Enero 2022', en: 'January 2022' },
      icon: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=64',
      url: 'https://ude.my/UC-f2ba0105-ac5a-4413-9459-aad1d716172c',
    },
    {
      title: 'Protege tu Negocio: Ciberseguridad en el Teletrabajo',
      issuer: 'Google Actívate',
      period: { es: 'Septiembre 2020', en: 'September 2020' },
      icon: 'https://www.google.com/s2/favicons?domain=learndigital.withgoogle.com&sz=64',
    },
    {
      title: 'Cloud Computing 40h',
      issuer: 'Google Actívate',
      period: { es: 'Mayo 2020', en: 'May 2020' },
      icon: 'https://www.google.com/s2/favicons?domain=learndigital.withgoogle.com&sz=64',
    },
    {
      title: 'Competencias digitales para profesionales 40h',
      issuer: 'Google Actívate',
      period: { es: 'Mayo 2020', en: 'May 2020' },
      icon: 'https://www.google.com/s2/favicons?domain=learndigital.withgoogle.com&sz=64',
    },
    {
      title: 'Fundamentos de Marketing Digital 40h',
      issuer: 'Google Actívate',
      period: { es: 'Mayo 2020', en: 'May 2020' },
      icon: 'https://www.google.com/s2/favicons?domain=learndigital.withgoogle.com&sz=64',
    },
    {
      title: 'Productividad Personal 40h',
      issuer: 'Google Actívate',
      period: { es: 'Mayo 2020', en: 'May 2020' },
      icon: 'https://www.google.com/s2/favicons?domain=learndigital.withgoogle.com&sz=64',
    },
    {
      title: 'Transformación digital para el empleo 40h',
      issuer: 'Google Actívate',
      period: { es: 'Mayo 2020', en: 'May 2020' },
      icon: 'https://www.google.com/s2/favicons?domain=learndigital.withgoogle.com&sz=64',
    },
    {
      title: 'Riesgos y medidas preventivas en el puesto de trabajo: Ingeniero de Desarrollo I+D',
      issuer: 'Quirónprevención',
      period: { es: 'Agosto 2019', en: 'August 2019' },
      icon: 'https://www.google.com/s2/favicons?domain=quironprevencion.com&sz=64',
    },
    {
      title: 'Permiso de conducción tipo B',
      issuer: 'Gobierno de España',
      period: { es: 'Septiembre 2013', en: 'September 2013' },
      icon: 'https://www.google.com/s2/favicons?domain=administracion.gob.es&sz=64',
    },
    {
      title: 'Curso Programación ADA - Ivan Osuna Ayuste 44h',
      issuer: 'Indra',
      period: { es: 'Curso complementario', en: 'Additional course' },
      icon: 'https://www.google.com/s2/favicons?domain=indragroup.com&sz=64',
      featured: true,
    },
    {
      title: 'Build, Train, and Deploy Your First Neural Network with TensorFlow',
      issuer: 'Pluralsight',
      period: { es: 'Curso complementario', en: 'Additional course' },
      icon: 'https://www.google.com/s2/favicons?domain=pluralsight.com&sz=64',
    },
    {
      title: 'Understanding Machine Learning with Python',
      issuer: 'Pluralsight',
      period: { es: 'Curso complementario', en: 'Additional course' },
      icon: 'https://www.google.com/s2/favicons?domain=pluralsight.com&sz=64',
    },
    {
      title: 'Machine Learning - Zero to Hero by TensorFlow',
      issuer: 'TensorFlow',
      period: { es: 'Curso complementario', en: 'Additional course' },
      icon: 'https://www.google.com/s2/favicons?domain=tensorflow.org&sz=64',
    },
    {
      title: 'Information Systems Auditing, Controls and Assurance',
      issuer: 'Coursera / HKUST',
      period: { es: 'Curso complementario', en: 'Additional course' },
      icon: 'https://www.google.com/s2/favicons?domain=coursera.org&sz=64',
    },
    {
      title: 'Aumenta la productividad en el trabajo',
      issuer: 'Google Actívate',
      period: { es: 'Curso complementario', en: 'Additional course' },
      icon: 'https://www.google.com/s2/favicons?domain=learndigital.withgoogle.com&sz=64',
    },
  ] satisfies CertificationItem[],
  contact: {
    title: {
      es: 'Conectemos',
      en: "Let's connect",
    },
    text: {
      es: 'Para oportunidades, colaboración técnica o más contexto sobre proyectos, puedes encontrarme en LinkedIn y revisar código o actividad pública en GitHub.',
      en: 'For opportunities, technical collaboration or more context about projects, you can find me on LinkedIn and review public code or activity on GitHub.',
    },
    action: {
      es: 'Contactar por LinkedIn',
      en: 'Contact on LinkedIn',
    },
    githubAction: {
      es: 'Ver GitHub',
      en: 'Open GitHub',
    },
  },
  labels: {
    experience: { es: 'Experiencia profesional', en: 'Professional Experience' },
    achievement: { es: 'Logros', en: 'Achievements' },
    measuredBy: { es: 'Métricas', en: 'Metrics' },
    execution: { es: 'Acciones', en: 'Actions' },
    skills: { es: 'Skills', en: 'Skills' },
    projects: { es: 'Proyectos y casos', en: 'Projects and Cases' },
    education: { es: 'Formación', en: 'Education' },
    certifications: { es: 'Formación complementaria', en: 'Further Training' },
  },
}
