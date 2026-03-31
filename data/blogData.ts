import type { BlogPost, ArticleSeries, TrendingTopic } from '@/types/blog';

// TODO: Replace with CMS fetch
export const BLOG_CATEGORIES = [
  { id: 'all', label: 'All Posts', count: 48 },
  { id: 'ai', label: 'AI Development', count: 18 },
  { id: 'nextjs', label: 'Next.js & React', count: 11 },
  { id: 'saas', label: 'SaaS & Cloud', count: 9 },
  { id: 'devops', label: 'DevOps', count: 6 },
  { id: 'mobile', label: 'Mobile Dev', count: 4 },
  { id: 'tutorials', label: 'Tutorials', count: 12 },
] as const;

// TODO: Replace with CMS fetch
export const FEATURED_POST: BlogPost = {
  slug: 'production-ready-rag-systems',
  title:
    "Building Production-Ready RAG Systems: A Complete Engineering Guide",
  excerpt:
    "After deploying six RAG systems into production — processing millions of documents daily — we've learned what actually works vs. what looks great in a demo. This is our honest breakdown: chunking strategies, embedding model selection, hybrid search, re-ranking, and the monitoring stack that keeps it all running reliably.",
  category: 'ai',
  categoryLabel: 'AI Development',
  tags: ['#RAG', '#LangChain', '#Pinecone', '#Next.js', '#Production'],
  author: { initials: 'SR', name: 'Sara Raza', role: 'CTO' },
  publishedAt: 'Mar 15, 2026',
  readTime: 12,
  emoji: '🧠',
  featured: true,
};

// TODO: Replace with CMS fetch
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'fine-tuning-vs-prompt-engineering',
    title:
      'Fine-Tuning GPT-4 vs Prompt Engineering: When to Use Which (With Benchmarks)',
    excerpt:
      "We ran 400+ experiments to find the real cost/performance tradeoffs. The answer surprised us — and will probably surprise you too.",
    category: 'ai',
    categoryLabel: 'AI Dev',
    tags: ['#LLM', '#GPT-4', '#Fine-tuning'],
    author: { initials: 'PL', name: 'Priya L.', role: 'AI Lead' },
    publishedAt: 'Mar 12, 2026',
    readTime: 8,
    emoji: '🤖',
  },
  {
    slug: 'nextjs-server-actions-vs-api-routes',
    title:
      'Next.js 14 Server Actions vs API Routes: A Real Performance Comparison',
    excerpt:
      "We measured cold start times, bundle sizes, and DX across 12 different scenarios. Here's what the data actually shows.",
    category: 'nextjs',
    categoryLabel: 'Next.js',
    tags: ['#Next.js', '#AppRouter', '#Performance'],
    author: { initials: 'MJ', name: 'Marcus J.', role: 'Head of Eng' },
    publishedAt: 'Mar 10, 2026',
    readTime: 7,
    emoji: '💻',
  },
  {
    slug: 'multi-tenancy-architecture-2026',
    title:
      'Multi-Tenancy Architecture in 2026: Row-Level Security vs Schema Separation',
    excerpt:
      'After building 8 multi-tenant SaaS products, we finally have a clear framework for choosing the right isolation strategy.',
    category: 'saas',
    categoryLabel: 'SaaS',
    tags: ['#SaaS', '#PostgreSQL', '#Architecture'],
    author: { initials: 'AK', name: 'Amir K.', role: 'CEO' },
    publishedAt: 'Mar 7, 2026',
    readTime: 10,
    emoji: '☁️',
  },
  {
    slug: 'langchain-vs-llamaindex-2026',
    title:
      'LangChain vs LlamaIndex in 2026: Which Should You Use for Your RAG Pipeline?',
    excerpt:
      "We've built production systems with both. This is our honest, code-backed comparison — not another surface-level overview.",
    category: 'ai',
    categoryLabel: 'AI Dev',
    tags: ['#LangChain', '#LlamaIndex', '#RAG'],
    author: { initials: 'SR', name: 'Sara Raza', role: 'CTO' },
    publishedAt: 'Mar 4, 2026',
    readTime: 9,
    emoji: '⚙️',
  },
  {
    slug: 'ai-document-chat-tutorial',
    title:
      'Build an AI-Powered Document Chat in 60 Minutes with Next.js and OpenAI',
    excerpt:
      'Step-by-step tutorial: upload PDFs, chunk and embed them, store in a vector DB, and stream AI responses — all with production-ready code.',
    category: 'tutorials',
    categoryLabel: 'Tutorial',
    tags: ['#Tutorial', '#OpenAI', '#Next.js'],
    author: { initials: 'MJ', name: 'Marcus J.', role: 'Head of Eng' },
    publishedAt: 'Mar 1, 2026',
    readTime: 15,
    emoji: '📚',
  },
  {
    slug: 'kubernetes-zero-downtime-deployments',
    title:
      'Zero-Downtime Deployments on Kubernetes: Our Battle-Tested Playbook',
    excerpt:
      "Everything we've learned from 200+ production deployments. Blue-green, canary, rolling updates — when to use each and how to avoid pitfalls.",
    category: 'devops',
    categoryLabel: 'DevOps',
    tags: ['#K8s', '#DevOps', '#CI/CD'],
    author: { initials: 'AK', name: 'Amir K.', role: 'CEO' },
    publishedAt: 'Feb 26, 2026',
    readTime: 11,
    emoji: '🛡️',
  },
];

// TODO: Replace with CMS fetch
export const ARTICLE_SERIES: ArticleSeries[] = [
  {
    icon: '🧠',
    seriesLabel: 'Series · 6 Parts',
    title: 'The Complete LLM Integration Handbook',
    description:
      'From picking the right model and writing effective system prompts, to building RAG pipelines, deploying agents, and monitoring production LLM systems with real observability tooling.',
    postCount: 6,
    totalReadTime: 62,
    slug: 'llm-integration-handbook',
  },
  {
    icon: '💻',
    seriesLabel: 'Series · 5 Parts',
    title: 'Next.js 14 for Production — Zero to Scalable',
    description:
      "Everything we've learned shipping Next.js apps used by hundreds of thousands of users — App Router architecture, server components, data fetching patterns, and CI/CD pipelines.",
    postCount: 5,
    totalReadTime: 44,
    slug: 'nextjs-production',
  },
  {
    icon: '☁️',
    seriesLabel: 'Series · 4 Parts',
    title: 'Building SaaS from Zero: Architecture to $1M ARR',
    description:
      'The real engineering decisions behind building a multi-tenant SaaS product — schema design, Stripe billing, usage metering, RBAC, and scaling past 1000 tenants without a rewrite.',
    postCount: 4,
    totalReadTime: 38,
    slug: 'saas-architecture-series',
  },
];

// TODO: Replace with CMS fetch
export const TRENDING_TOPICS: TrendingTopic[] = [
  {
    icon: '🧠',
    name: 'AI & LLM Development',
    category: 'ai',
    postCount: 18,
    monthlyReads: '32k',
    barWidth: 95,
  },
  {
    icon: '💻',
    name: 'Next.js & React',
    category: 'nextjs',
    postCount: 11,
    monthlyReads: '21k',
    barWidth: 68,
  },
  {
    icon: '☁️',
    name: 'SaaS Architecture',
    category: 'saas',
    postCount: 9,
    monthlyReads: '14k',
    barWidth: 45,
  },
  {
    icon: '🛡️',
    name: 'DevOps & Cloud',
    category: 'devops',
    postCount: 6,
    monthlyReads: '9k',
    barWidth: 30,
  },
  {
    icon: '📚',
    name: 'Tutorials',
    category: 'tutorials',
    postCount: 12,
    monthlyReads: '19k',
    barWidth: 60,
  },
  {
    icon: '📱',
    name: 'Mobile Development',
    category: 'mobile',
    postCount: 4,
    monthlyReads: '6k',
    barWidth: 20,
  },
  {
    icon: '⚙️',
    name: 'Backend Engineering',
    category: 'backend',
    postCount: 8,
    monthlyReads: '11k',
    barWidth: 36,
  },
  {
    icon: '🔬',
    name: 'ML & Data Engineering',
    category: 'data',
    postCount: 5,
    monthlyReads: '7k',
    barWidth: 24,
  },
];

// TODO: Replace with CMS fetch
export const LATEST_POSTS: BlogPost[] = [
  {
    slug: 'streaming-llm-nextjs',
    title: 'Streaming LLM Responses in Next.js with the Vercel AI SDK',
    category: 'ai',
    categoryLabel: 'AI Development',
    tags: [],
    author: { initials: 'SR', name: 'Sara Raza', role: 'CTO' },
    publishedAt: 'Mar 18, 2026',
    readTime: 7,
    emoji: '🤖',
    excerpt: '',
  },
  {
    slug: 'optimistic-updates-server-actions',
    title:
      'Optimistic Updates with Next.js Server Actions and React 19',
    category: 'nextjs',
    categoryLabel: 'Next.js',
    tags: [],
    author: { initials: 'MJ', name: 'Marcus J.', role: 'Head of Eng' },
    publishedAt: 'Mar 16, 2026',
    readTime: 5,
    emoji: '💻',
    excerpt: '',
  },
  {
    slug: 'github-actions-nextjs',
    title:
      'GitHub Actions CI/CD for Next.js: The Setup We Use on Every Project',
    category: 'devops',
    categoryLabel: 'DevOps',
    tags: [],
    author: { initials: 'AK', name: 'Amir K.', role: 'CEO' },
    publishedAt: 'Mar 13, 2026',
    readTime: 9,
    emoji: '🛡️',
    excerpt: '',
  },
  {
    slug: 'langgraph-multi-agent',
    title:
      'Building Multi-Agent AI Systems with LangGraph: A Practical Guide',
    category: 'ai',
    categoryLabel: 'AI Development',
    tags: [],
    author: { initials: 'PL', name: 'Priya L.', role: 'AI Lead' },
    publishedAt: 'Mar 11, 2026',
    readTime: 13,
    emoji: '🤖',
    excerpt: '',
  },
  {
    slug: 'stripe-saas-billing',
    title:
      'Stripe Billing for SaaS: Subscription Tiers, Usage Metering & Upgrades',
    category: 'saas',
    categoryLabel: 'SaaS',
    tags: [],
    author: { initials: 'AK', name: 'Amir K.', role: 'CEO' },
    publishedAt: 'Mar 8, 2026',
    readTime: 10,
    emoji: '☁️',
    excerpt: '',
  },
  {
    slug: 'rbac-nextjs-prisma',
    title:
      'Implementing Role-Based Access Control in Next.js with Prisma and NextAuth',
    category: 'tutorials',
    categoryLabel: 'Tutorial',
    tags: [],
    author: { initials: 'MJ', name: 'Marcus J.', role: 'Head of Eng' },
    publishedAt: 'Mar 6, 2026',
    readTime: 11,
    emoji: '📚',
    excerpt: '',
  },
];
