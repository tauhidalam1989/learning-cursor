import type { ExploreCard, QuickLink, MiniBlogPost } from '@/types/notFound';

export const EXPLORE_CARDS: ExploreCard[] = [
  {
    icon: '🧠',
    title: 'AI Development Services',
    description:
      'Custom LLM products, RAG pipelines, AI agents, ML models, and intelligent automation — built for production, not demos.',
    linkLabel: 'Explore AI services',
    href: '/services#ai-dev',
  },
  {
    icon: '💻',
    title: 'Web Application Development',
    description:
      'High-performance web apps with Next.js 14, React, TypeScript, and Tailwind CSS — engineered to scale from day one.',
    linkLabel: 'See web services',
    href: '/services#web-dev',
  },
  {
    icon: '☁️',
    title: 'SaaS Platform Development',
    description:
      'Multi-tenant SaaS platforms from MVP to enterprise-scale — with Stripe billing, RBAC, and production architecture.',
    linkLabel: 'View SaaS services',
    href: '/services#saas',
  },
  {
    icon: '👥',
    title: 'Dedicated Development Teams',
    description:
      'Pre-vetted senior engineers embedded in your team. Dedicated model, staff augmentation, or full offshore development centre.',
    linkLabel: 'Build your team',
    href: '/services#teams',
  },
  {
    icon: '🏢',
    title: 'About Corematrix',
    description:
      'Who we are, how we work, our mission, team, and why 50+ global clients trust us to build their most important software.',
    linkLabel: 'Meet the team',
    href: '/about',
  },
  {
    icon: '💬',
    title: 'Start a Project',
    description:
      "Tell us about what you're building. We respond within 24 hours with a real technical perspective — not a sales pitch.",
    linkLabel: 'Get in touch',
    href: '/contact',
  },
];

export const QUICK_LINKS: QuickLink[] = [
  { icon: '🏠', label: 'Homepage', href: '/' },
  { icon: '⚙️', label: 'All Services', href: '/services' },
  { icon: '🧠', label: 'AI Development', href: '/services#ai-dev' },
  { icon: '💻', label: 'Web Apps', href: '/services#web-dev' },
  { icon: '☁️', label: 'SaaS Platforms', href: '/services#saas' },
  { icon: '👥', label: 'Dedicated Teams', href: '/services#teams' },
  { icon: '🏢', label: 'About Us', href: '/about' },
  { icon: '📝', label: 'Blog', href: '/blog' },
  { icon: '🚀', label: 'Careers', href: '/careers' },
  { icon: '📞', label: 'Contact', href: '/contact' },
  { icon: '🎯', label: 'Portfolio', href: '/portfolio' },
];

export const MINI_BLOG_POSTS: MiniBlogPost[] = [
  {
    slug: 'production-ready-rag-systems',
    category: 'AI Development',
    title: 'Building Production-Ready RAG Systems: A Complete Engineering Guide',
    author: 'Sara Raza',
    readTime: 12,
  },
  {
    slug: 'nextjs-app-router-architecture',
    category: 'Next.js',
    title: 'Next.js 14 App Router: Architecture Decisions We Swear By',
    author: 'Marcus J.',
    readTime: 6,
  },
  {
    slug: 'ai-automation-infrastructure-costs',
    category: 'SaaS',
    title: 'How We Cut Infrastructure Costs by 60% Using AI Automation',
    author: 'Amir K.',
    readTime: 5,
  },
];

export const TERMINAL_LINES = [
  { id: 'l1', prefix: 'command' as const, text: 'locate --deep --recursive "requested_page"' },
  { id: 'l2', prefix: 'error' as const, text: 'Searching vector database...', highlight: '0 results found' },
  { id: 'l3', prefix: 'error' as const, text: 'Querying LLM context window...', highlight: 'page not in training data' },
  { id: 'l4', prefix: 'success' as const, text: 'Suggestion: Navigate to ', highlight: '/' },
  { id: 'l5', prefix: 'cursor' as const, text: '' },
];
