/* ═══════════════════════════════════════════════
   PORTFOLIO DATA — Edit semua konten di sini
   ═══════════════════════════════════════════════ */

export const me = {
  name:    'IMars-Kun',
  short:   'Marss',
  role:    'Full Stack Developer',
  tags:    ['Software Engineer', 'Cloud Architect', 'UI/UX Developer', 'DevOps Engineer'],
  line:    'Building robust, scalable systems — from microservices to pixel-perfect interfaces.',
  bio1:    'Saya adalah IT professional dengan passion di full-stack development dan cloud architecture. Percaya bahwa software terbaik adalah yang invisible — bekerja sempurna tanpa terasa seperti bekerja keras.',
  bio2:    'Specializing dalam membangun sistem yang scale dengan baik, team yang solid, dan produk digital yang benar-benar berguna bagi penggunanya.',
  email:   'berlymarcellino25@gmail.com',
  loc:     'Yogyakarta, Indonesia',
  avail:   'Open to Work',
  photo:   '/images/photo.jpg',
  cv:      '/cv.pdf',
}

export const socials = [
  { name: 'GitHub',    url: 'https://github.com/IMars-kun',       icon: 'github' },
  { name: 'LinkedIn',  url: 'https://linkedin.com/in/username',  icon: 'linkedin' },
  { name: 'Twitter',   url: 'https://twitter.com/username',      icon: 'twitter' },
  { name: 'Dev.to',    url: 'https://dev.to/username',           icon: 'code2' },
]

export const navLinks = [
  { label: 'Home',       id: 'hero' },
  { label: 'About',      id: 'about' },
  { label: 'Work',       id: 'work' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Experience', id: 'exp' },
  { label: 'Contact',    id: 'contact' },
]

export const metrics = [
  { val: '5+',  label: 'Years of Code' },
  { val: '30+', label: 'Projects Shipped' },
  { val: '15+', label: 'Happy Clients' },
  { val: '99',  label: 'Lighthouse Score' },
]

/* ── PROJECTS ── */
export const projects = [
  {
    id: 1,
    num: '001',
    name: 'Marceila Album',
    cat: 'Web Application',
    year: '2025',
    desc: 'Web application untuk menyimpan dan mengelola foto-foto.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion', 'Shadcn UI', 'GSAP'],
    live: 'https://marceila.imarskun.my.id',
    repo: 'https://github.com/IMars-kun/my-album',
    featured: true,
    accent: 'rgba(106,255,212,',   // var(--a) based
  },
  {
    id: 2,
    num: '002',
    name: 'Whatsapp Bot',
    cat: 'Backend System',
    year: '2025',
    desc: 'Whatsapp bot untuk membantu pengguna dengan fitur yang lengkap.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
    live: null,
    repo: 'https://github.com/IMars-kun/Whatsapp-Bot',
    featured: true,
    accent: 'rgba(167,139,250,',   // var(--a2) based
  },
  {
    id: 3,
    num: '003',
    name: 'Discord Jointventure Bot',
    cat: 'Bot',
    year: '2024',
    desc: 'Discord bot untuk membantu mengelola server untuk membuat sistem patungan.',
    stack: ['Node.js', 'Discord.js', 'PostgreSQL', 'Redis', 'Docker'],
    live: null,
    repo: 'https://github.com/IMars-kun/Discord-jointVenture-Bot',
    featured: false,
    accent: 'rgba(56,189,248,',    // var(--a3) based
  },
  {
    id: 4,
    num: '004',
    name: 'Wellness in Solo',
    cat: 'Web Application',
    year: '2024',
    desc: 'Website yang menyediakan informasi tentang wellness di Solo.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://wellness-in-solo.vercel.app/',
    repo: 'https://github.com/IMars-kun/WellnessInSolo',
    featured: false,
    accent: 'rgba(106,255,212,',
  },
  // {
  //   id: 5,
  //   num: '005',
  //   name: 'Wellness in Solo',
  //   cat: 'Web Application',
  //   year: '2024',
  //   desc: 'Website yang menyediakan informasi tentang wellness di Solo.',
  //   stack: ['HTML', 'CSS', 'JavaScript'],
  //   live: 'https://wellness-in-solo.vercel.app/',
  //   repo: 'https://github.com/IMars-kun/WellnessInSolo',
  //   featured: false,
  //   accent: 'rgba(106,255,212,',
  // },
]

/* ── SKILLS ── */
export const skillGroups = [
  {
    name: 'Frontend',
    icon: '⬡',
    color: 'var(--a)',
    skills: [
      { name: 'React / Next.js', pct: 95 },
      { name: 'TypeScript',      pct: 92 },
      { name: 'CSS / Tailwind',  pct: 93 },
      { name: 'GSAP / Animation',pct: 82 },
      { name: 'WebGL / Three.js',pct: 60 },
    ],
  },
  {
    name: 'Backend',
    icon: '⬢',
    color: 'var(--a2)',
    skills: [
      { name: 'Node.js / Express',pct: 90 },
      { name: 'Go',               pct: 75 },
      { name: 'Python',           pct: 80 },
      { name: 'PostgreSQL',       pct: 85 },
      { name: 'Redis',            pct: 78 },
    ],
  },
  {
    name: 'DevOps / Cloud',
    icon: '◈',
    color: 'var(--a3)',
    skills: [
      { name: 'AWS / GCP',        pct: 82 },
      { name: 'Docker',           pct: 88 },
      { name: 'Kubernetes',       pct: 72 },
      { name: 'Terraform',        pct: 70 },
      { name: 'CI/CD Pipelines',  pct: 85 },
    ],
  },
  {
    name: 'Tools & Other',
    icon: '◉',
    color: 'var(--fg-2)',
    skills: [
      { name: 'Git / GitHub',     pct: 97 },
      { name: 'Linux / Shell',    pct: 85 },
      { name: 'Figma',            pct: 78 },
      { name: 'Agile / Scrum',    pct: 90 },
      { name: 'System Design',    pct: 80 },
    ],
  },
]

/* ── EXPERIENCE ── */
export const experiences = [
  // {
  //   co: 'Quantum Systems',
  //   role: 'Senior Full Stack Engineer',
  //   period: '2023 – Present',
  //   type: 'full-time',
  //   desc: 'Memimpin tim 8 engineer membangun platform B2B SaaS yang melayani 200+ perusahaan. Bertanggung jawab atas arsitektur, performa, dan reliability.',
  //   wins: [
  //     'Reduced infrastructure cost 40% via microservices migration',
  //     'Improved API response time from 800ms → 120ms average',
  //     'Built CI/CD pipeline — deploy time 45min → 8min',
  //     'Mentored 5 junior engineers, 3 promoted to mid-level',
  //   ],
  // },
  {
    co: 'DataBridge Tech',
    role: 'Full Stack Developer',
    period: '2021 – 2023',
    type: 'full-time',
    desc: 'Fullstack development untuk platform data analytics enterprise. Mengintegrasikan 20+ data sources dan membangun real-time visualization engine.',
    wins: [
      'Built real-time dashboard serving 500k+ data points',
      'Integrated 20+ third-party APIs and data sources',
      'Achieved 99.9% uptime for critical reporting features',
    ],
  },
  {
    co: 'Freelance & Consulting',
    role: 'Software Engineer',
    period: '2019 – 2021',
    type: 'freelance',
    desc: '22 proyek untuk startup dan enterprise — dari MVP development hingga legacy system modernization.',
    wins: [
      '22 projects delivered on-time, all 5★ rated',
      'Specialized in React, Node.js, and cloud deployment',
      'Built systems serving 50k+ monthly active users',
    ],
  },
]

export const education = [
  {
    school: 'Universitas Sebelas Maret',  // ← Ganti
    degree: 'S1 Informatika',
    period: '2024 – Present',
    gpa: '-'
  }, 
  {
    school: 'SMA Negeri 1 Semin',  // ← Ganti
    degree: 'MIPA',
    period: '2021 – 2024',
    gpa: '-'
  }, 
  {
    school: 'SMP Negeri 1 Ngawen',  // ← Ganti
    degree: 'Regular',
    period: '2018 – 2021',
    gpa: '-'
  }, 
]

/* ── SERVICES ── */
export const services = [
  { icon: '⬡', title: 'Full Stack Dev',     desc: 'Web & mobile app dari frontend sampai backend, siap production.' },
  { icon: '⬢', title: 'Cloud Architecture', desc: 'AWS/GCP infrastructure yang scalable, secure, dan cost-efficient.' },
  { icon: '◈', title: 'API Design',          desc: 'REST & GraphQL APIs yang performant, well-documented, mudah diintegrasikan.' },
  { icon: '◉', title: 'DevOps & CI/CD',      desc: 'Automated pipelines, monitoring, dan zero-downtime deployment.' },
]
