import type {
  OpenRole,
  WhyCard,
  Benefit,
  ProcessStep,
  TeamStory,
  CultureValue,
  LifeCell,
} from '@/types/careers';

export const OPEN_ROLES: OpenRole[] = [
  {
    id: 'senior-ai-ml-engineer',
    icon: 'fas fa-brain',
    title: 'Senior AI/ML Engineer',
    department: 'engineering',
    location: 'Remote',
    salaryRange: '$90k–$140k',
    employmentType: 'full-time',
    badge: 'hot',
  },
  {
    id: 'senior-nextjs-engineer',
    icon: 'fas fa-laptop-code',
    title: 'Senior Next.js / React Engineer',
    department: 'engineering',
    location: 'Remote',
    salaryRange: '$80k–$130k',
    employmentType: 'full-time',
    badge: 'new',
  },
  {
    id: 'backend-engineer-python',
    icon: 'fas fa-cogs',
    title: 'Backend Engineer (Python/FastAPI)',
    department: 'engineering',
    location: 'Remote',
    salaryRange: '$75k–$120k',
    employmentType: 'full-time',
    badge: 'new',
  },
  {
    id: 'react-native-engineer',
    icon: 'fas fa-mobile-alt',
    title: 'React Native / Mobile Engineer',
    department: 'engineering',
    location: 'Remote',
    salaryRange: '$70k–$115k',
    employmentType: 'full-time',
  },
  {
    id: 'llm-research-engineer',
    icon: 'fas fa-microscope',
    title: 'LLM Research Engineer',
    department: 'engineering',
    location: 'Remote',
    salaryRange: '$100k–$160k',
    employmentType: 'full-time',
    badge: 'hot',
  },
  {
    id: 'product-designer',
    icon: 'fas fa-palette',
    title: 'Product Designer (UI/UX)',
    department: 'design',
    location: 'Remote',
    salaryRange: '$65k–$105k',
    employmentType: 'full-time',
    badge: 'hot',
  },
  {
    id: 'technical-product-manager',
    icon: 'fas fa-map-marked-alt',
    title: 'Technical Product Manager',
    department: 'product',
    location: 'Remote',
    salaryRange: '$80k–$125k',
    employmentType: 'full-time',
  },
  {
    id: 'devops-platform-engineer',
    icon: 'fas fa-shield-alt',
    title: 'DevOps / Platform Engineer',
    department: 'devops',
    location: 'Remote',
    salaryRange: '$70k–$120k',
    employmentType: 'contract',
  },
];

export const WHY_CARDS: WhyCard[] = [
  {
    icon: 'fas fa-brain',
    title: 'AI-First Engineering Culture',
    body: "We're not just adding AI features — it's woven into everything we build. You'll work with the latest LLM frameworks, RAG architectures, and agent systems in actual production, not just demos.",
  },
  {
    icon: 'fas fa-rocket',
    title: 'Real Ownership & Impact',
    body: "Engineers here don't execute tickets — they own outcomes. You'll have full context on every business decision, participate in architecture discussions, and see your work used by real users within weeks.",
  },
  {
    icon: 'fas fa-globe',
    title: '100% Remote, Async-First',
    body: "We've been remote from day one. Our processes are built for async — thorough documentation, deep work blocks, and no meetings without a clear agenda. Work from wherever you do your best work.",
  },
  {
    icon: 'fas fa-book',
    title: 'Serious Learning Investment',
    body: 'Every engineer gets a $1,500/yr learning budget for courses, conferences, books, and experiments. We encourage exploration time. The team\'s knowledge grows together, not in silos.',
  },
  {
    icon: 'fas fa-coins',
    title: 'Competitive Compensation',
    body: 'Market-rate salaries benchmarked globally, equity for key hires, performance bonuses, and all the hardware you need. We believe great work deserves great pay — full stop.',
  },
  {
    icon: 'fas fa-handshake',
    title: 'No Bureaucracy, No BS',
    body: 'Flat structure. Short decision chains. No pointless standups. No status-update culture. We hire adults, give them context, and trust them to do great work. Accountability without micromanagement.',
  },
];

export const BENEFITS: Benefit[] = [
  {
    icon: 'fas fa-coins',
    title: 'Competitive Salary',
    description:
      'Market-rate pay benchmarked globally, reviewed annually. We share our salary bands openly.',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Equity & Bonuses',
    description:
      'Meaningful equity for key roles. Performance bonuses tied to company and personal outcomes.',
  },
  {
    icon: 'fas fa-medkit',
    title: 'Health Coverage',
    description:
      'Comprehensive health insurance (medical, dental, vision) for you and your family.',
  },
  {
    icon: 'fas fa-umbrella-beach',
    title: 'Unlimited PTO',
    description:
      'We mean it. Minimum 20 days encouraged. Leaders take time off to model healthy behavior.',
  },
  {
    icon: 'fas fa-laptop',
    title: 'Top-Tier Hardware',
    description:
      'MacBook Pro or Linux workstation of your choice, plus a $500 home office setup budget.',
  },
  {
    icon: 'fas fa-book',
    title: '$1,500 Learning Budget',
    description:
      'Courses, conferences, books, workshops. Use it however you learn best — no approval needed.',
  },
  {
    icon: 'fas fa-clock',
    title: 'Flexible Hours',
    description:
      'Core overlap hours, but otherwise you set your schedule. We care about output, not clock-watching.',
  },
  {
    icon: 'fas fa-globe',
    title: 'Work From Anywhere',
    description:
      'Fully distributed team. Our processes are built for async — not bolted on as an afterthought.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    icon: 'fas fa-file-signature',
    title: 'Application Review',
    body: "We read every application personally. No automated screening. You'll hear from us within 48 hours with specific, useful feedback.",
    timing: '48 hours',
  },
  {
    num: '02',
    icon: 'fas fa-phone-alt',
    title: 'Intro Call (30 min)',
    body: "A relaxed video call with the hiring manager. We'll tell you about the role honestly — including the hard parts. You'll have time to ask anything.",
    timing: '30 minutes',
  },
  {
    num: '03',
    icon: 'fas fa-laptop-code',
    title: 'Technical Assessment',
    body: 'A take-home challenge (2–3 hours max) or a live collaborative session — your choice. Real problems, not trick puzzles. Paid for senior roles.',
    timing: '2–3 hours',
  },
  {
    num: '04',
    icon: 'fas fa-users',
    title: 'Team Interview (60 min)',
    body: "Meet 2–3 team members you'd actually work with. Part technical deep-dive, part culture conversation. We want to see how you think and communicate.",
    timing: '60 minutes',
  },
  {
    num: '05',
    icon: 'fas fa-award',
    title: 'Offer & Onboarding',
    body: 'Decision within 24 hours of your final interview. Transparent offer with full breakdown. Structured 30/60/90-day onboarding plan from day one.',
    timing: '24 hours after final',
  },
];

export const TEAM_STORIES: TeamStory[] = [
  {
    initials: 'MJ',
    name: 'Marcus J.',
    role: 'Head of Engineering',
    joinedYear: 2021,
    quote:
      "I've worked at three FAANG companies and two startups. Corematrix is the first place where engineering decisions are made by engineers, not committees. The speed at which we ship real software is genuinely rare.",
    tags: ['Next.js', 'Architecture', 'Remote'],
  },
  {
    initials: 'PL',
    name: 'Priya L.',
    role: 'Head of AI Products',
    joinedYear: 2022,
    quote:
      "I came from an ML research background and was worried about losing technical depth at a services company. Instead, I shipped more production AI systems in my first year here than in three years at my previous job.",
    tags: ['LLMs', 'RAG', 'Production AI'],
  },
  {
    initials: 'DF',
    name: 'Diana F.',
    role: 'Senior Full-Stack Engineer',
    joinedYear: 2023,
    quote:
      "I was skeptical about joining a remote-first company — I'd had bad experiences before. Corematrix is different. The async culture is real, the documentation is genuinely useful, and I've never felt more productive.",
    tags: ['React', 'PostgreSQL', 'Async Work'],
  },
];

export const CULTURE_VALUES: CultureValue[] = [
  {
    num: '01',
    title: "Build, Don't Just Talk",
    description: 'We ship every sprint. No "planning for planning" meetings.',
  },
  {
    num: '02',
    title: 'Context Over Control',
    description: 'You get full context so you can make great decisions independently.',
  },
  {
    num: '03',
    title: 'Direct Feedback',
    description: 'We give honest, timely feedback — to each other and from leadership.',
  },
  {
    num: '04',
    title: 'Grow or Stagnate',
    description: 'We expect and support continuous technical growth from everyone.',
  },
];

export const LIFE_CELLS: LifeCell[] = [
  { icon: 'fas fa-laptop-code', label: 'Deep Work Sessions', span: 'tall' },
  { icon: 'fas fa-handshake', label: 'Weekly Team Standups', span: 'wide' },
  { icon: 'fas fa-tools', label: 'Hackathon Fridays' },
  { icon: 'fas fa-book-reader', label: 'Learning Sessions' },
  { icon: 'fas fa-rocket', label: 'Product Demos' },
  { icon: 'fas fa-brain', label: 'AI Research Club' },
];

export const TECH_STACK_ITEMS = [
  'Next.js 14',
  'React 18',
  'TypeScript',
  'Python',
  'Node.js',
  'LangChain',
  'LlamaIndex',
  'OpenAI API',
  'Pinecone',
  'PyTorch',
  'FastAPI',
  'PostgreSQL',
  'Docker',
  'Kubernetes',
  'AWS',
  'GCP',
  'Supabase',
  'Redis',
  'Tailwind CSS',
  'Prisma',
  'Framer Motion',
  'Vercel',
  'GitHub Actions',
  'Terraform',
] as const;


