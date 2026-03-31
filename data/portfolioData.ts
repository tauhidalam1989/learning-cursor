import type {
  Project,
  FeaturedProject,
  ImpactStat,
  Testimonial,
  DeliveryStep,
  FilterOption,
} from '@/types/portfolio';
import { SHARED_INDUSTRIES, SHARED_TECH_CATEGORIES } from '@/data/shared';

export const FILTER_OPTIONS: FilterOption[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI Development' },
  { id: 'web', label: 'Web Applications' },
  { id: 'saas', label: 'SaaS Platforms' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'enterprise', label: 'Enterprise' },
];

export const FEATURED_PROJECT: FeaturedProject = {
  id: 'ai-contract-platform',
  slug: 'ai-contract-intelligence-platform',
  title: 'AI Contract Intelligence Platform — 92% Manual Review Eliminated',
  fullDescription:
    'A legal tech startup needed to process thousands of contracts daily — extracting key clauses, flagging risk, and generating summaries in seconds. We built an end-to-end RAG pipeline with GPT-4, Pinecone vector storage, and a Next.js dashboard that replaced 8 hours of manual review per document.',
  description: '',
  category: 'ai',
  categoryLabel: 'AI Development · Legal Tech',
  industry: 'Legal Tech',
  emoji: '🤖',
  thumbGradient: 'from-corematrix-green900 to-corematrix-card2',
  metrics: [
    { value: '92%', label: 'Time saved per doc' },
    { value: '10k+', label: 'Docs processed/month' },
    { value: '8 wks', label: 'Zero to production' },
    { value: '40%', label: 'Operational cost reduction' },
  ],
  techStack: ['#OpenAI', '#LangChain', '#Pinecone', '#Next.js', '#FastAPI', '#PostgreSQL'],
  featured: true,
};

// TODO: Replace with CMS fetch when cms-portfolio collection is ready
export const PROJECTS: Project[] = [
  {
    id: 'saas-analytics',
    slug: 'saas-analytics-platform',
    title: 'Multi-Tenant SaaS Analytics Platform — 0 to $1M ARR in 9 Months',
    description:
      'Architected and built a complete B2B SaaS analytics platform: multi-tenancy, Stripe billing with usage metering, custom dashboards, embedded AI insights, and a self-serve onboarding flow that converted at 42%.',
    category: 'saas',
    categoryLabel: 'SaaS Platform',
    industry: 'B2B Analytics',
    emoji: '☁️',
    thumbGradient: 'from-[#052e16] to-[#0d2b1a]',
    metrics: [
      { value: '$1M', label: 'ARR at 9mo' },
      { value: '200+', label: 'Enterprise clients' },
      { value: '14 wks', label: 'To launch' },
    ],
    techStack: ['#Next.js', '#Stripe', '#PostgreSQL', '#AI'],
  },
  {
    id: 'enterprise-ops',
    slug: 'enterprise-internal-ops-platform',
    title: 'Enterprise Internal Ops Platform — Replaced $240k/yr SaaS Subscriptions',
    description:
      'A 500-person company was paying $240k/year for 3 disconnected SaaS tools. We built a unified internal platform replacing all three: project tracking, resource management, client reporting — with SSO and audit logging.',
    category: 'enterprise',
    categoryLabel: 'Enterprise',
    industry: 'Operations',
    emoji: '🏢',
    thumbGradient: 'from-[#0d1a2e] to-[#061020]',
    metrics: [
      { value: '$240k', label: 'Annual savings' },
      { value: '500', label: 'Daily users' },
      { value: '10 wks', label: 'Build time' },
    ],
    techStack: ['#React', '#Node.js', '#SSO', '#RBAC'],
  },
  {
    id: 'ai-support-agent',
    slug: 'ai-customer-support-agent',
    title: 'AI Customer Support Agent — 80% Ticket Auto-Resolution Rate',
    description:
      'An eCommerce company handling 5,000+ support tickets/month needed scale without headcount. We deployed an LLM-powered support agent with product knowledge base RAG, order lookup integration, and escalation rules.',
    category: 'ai',
    categoryLabel: 'AI Development',
    industry: 'Customer Service',
    emoji: '🤖',
    thumbGradient: 'from-[#1a0d2e] to-[#0d0718]',
    metrics: [
      { value: '80%', label: 'Auto-resolution' },
      { value: '5k+', label: 'Tickets/month' },
      { value: '6 wks', label: 'Deployment' },
    ],
    techStack: ['#LangChain', '#RAG', '#GPT-4', '#FastAPI'],
  },
  {
    id: 'telehealth-platform',
    slug: 'hipaa-telehealth-platform',
    title: 'HIPAA-Compliant Patient Portal & Telehealth Platform',
    description:
      'Built a full-stack telehealth platform: secure patient records, appointment booking, video consultation, prescription management, and an AI symptom pre-screening tool. HIPAA-compliant from day one.',
    category: 'web',
    categoryLabel: 'Web Application',
    industry: 'Healthcare',
    emoji: '🏥',
    thumbGradient: 'from-[#0d2e1a] to-[#071a0d]',
    metrics: [
      { value: '12k', label: 'Active patients' },
      { value: 'HIPAA', label: 'Compliant' },
      { value: '16 wks', label: 'To launch' },
    ],
    techStack: ['#Next.js', '#HIPAA', '#WebRTC', '#PostgreSQL'],
  },
  {
    id: 'fintech-mobile',
    slug: 'ai-personal-finance-app',
    title: 'AI-Powered Personal Finance App — 85k Downloads in First Month',
    description:
      'Cross-platform mobile app with bank-grade security and AI financial coaching. Biometric auth, Plaid integration, spending categorisation ML model, and an AI advisor that gives personalised money advice.',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    industry: 'Fintech',
    emoji: '💰',
    thumbGradient: 'from-[#2e1a0d] to-[#1a0d07]',
    metrics: [
      { value: '85k', label: 'Month 1 downloads' },
      { value: '4.8★', label: 'App store rating' },
      { value: '18 wks', label: 'Build time' },
    ],
    techStack: ['#ReactNative', '#Plaid', '#ML', '#Biometrics'],
  },
  {
    id: 'ai-recruitment',
    slug: 'ai-recruitment-intelligence',
    title: 'AI Recruitment Intelligence Platform — 70% Faster Candidate Shortlisting',
    description:
      'An HR tech company needed to screen thousands of CVs weekly. We built an AI pipeline: CV parsing, candidate scoring, skills gap detection, interview question generation, and a shortlist ranking dashboard.',
    category: 'ai',
    categoryLabel: 'AI Development',
    industry: 'HR Tech',
    emoji: '🔍',
    thumbGradient: 'from-[#1a2e0d] to-[#0d1a07]',
    metrics: [
      { value: '70%', label: 'Faster shortlisting' },
      { value: '2k+', label: 'CVs/week processed' },
      { value: '8 wks', label: 'Delivery' },
    ],
    techStack: ['#LLM', '#Python', '#RAG', '#Next.js'],
  },
  {
    id: 'edtech-adaptive',
    slug: 'adaptive-learning-platform',
    title: 'Adaptive Learning Platform with AI Tutoring — 34% Grade Improvement',
    description:
      'An EdTech startup wanted to replace static course content with an adaptive learning experience. AI tutor adjusts curriculum difficulty, answers questions in real time, and generates personalised practice exercises.',
    category: 'web',
    categoryLabel: 'Web Application',
    industry: 'EdTech',
    emoji: '🎓',
    thumbGradient: 'from-[#2e0d1a] to-[#1a0710]',
    metrics: [
      { value: '34%', label: 'Grade improvement' },
      { value: '8k', label: 'Active students' },
      { value: '20 wks', label: 'Build time' },
    ],
    techStack: ['#Next.js', '#AI Tutoring', '#LangChain', '#Supabase'],
  },
  {
    id: 'logistics-saas',
    slug: 'ai-route-optimisation-saas',
    title: 'AI Route Optimisation SaaS — 28% Fuel Cost Reduction for Fleet Operators',
    description:
      'Built a logistics SaaS platform: real-time traffic integration, multi-stop optimisation ML, driver mobile app, dispatcher dashboard, and predictive maintenance alerts using vehicle telemetry data.',
    category: 'saas',
    categoryLabel: 'SaaS Platform',
    industry: 'Logistics',
    emoji: '🚚',
    thumbGradient: 'from-[#0d2e2e] to-[#071a1a]',
    metrics: [
      { value: '28%', label: 'Fuel cost reduction' },
      { value: '300+', label: 'Fleet operators' },
      { value: '24 wks', label: 'Full platform' },
    ],
    techStack: ['#ML', '#ReactNative', '#PostgreSQL', '#AWS'],
  },
  {
    id: 'proptech-valuation',
    slug: 'proptech-ai-valuation-engine',
    title: 'PropTech AI Valuation Engine — Real-Time Property Appraisals at Scale',
    description:
      'Built an ML valuation engine trained on 2M+ historical sales records, combined with a real-time market analysis API and a lead generation SaaS layer for estate agents. 94% valuation accuracy.',
    category: 'enterprise',
    categoryLabel: 'Enterprise',
    industry: 'Real Estate',
    emoji: '🏗️',
    thumbGradient: 'from-[#0d1a2e] to-[#07101a]',
    metrics: [
      { value: '50k+', label: 'Properties valued' },
      { value: '94%', label: 'Valuation accuracy' },
      { value: '22 wks', label: 'Build time' },
    ],
    techStack: ['#ML', '#Python', '#Next.js', '#BigQuery'],
  },
];

export const IMPACT_STATS: ImpactStat[] = [
  { count: 50, suffix: '+', label: 'Projects Delivered', sub: 'Across 12+ countries' },
  { count: 98, suffix: '%', label: 'Client Retention Rate', sub: 'Industry avg is 67%' },
  { count: 60, suffix: '%', label: 'Avg Cost Reduction', sub: 'Via AI automation' },
  { count: 3, suffix: 'x', label: 'Average Client ROI', sub: 'Within 6 months' },
  { count: 30, suffix: '+', label: 'Global Clients', sub: 'Startups to enterprises' },
  { count: 5, suffix: '+', label: 'Years of Excellence', sub: 'Growing every quarter' },
  { count: 12, suffix: '+', label: 'AI Systems in Production', sub: 'LLMs, agents, ML models' },
  { count: 25, suffix: '+', label: 'Engineers On Staff', sub: 'AI, web, mobile, DevOps' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    stars: 5,
    projectBadge: 'AI Contract Platform',
    quote:
      "Corematrix didn't just build what we asked for — they challenged our assumptions and delivered an AI system that processed 10x the volume we planned for. The quality of the RAG architecture was exceptional. Six months later, it's still running flawlessly in production.",
    initials: 'JM',
    name: 'James M.',
    role: 'CTO, LegalTech Startup',
  },
  {
    stars: 5,
    projectBadge: 'SaaS Analytics Platform',
    quote:
      "Corematrix took our product from zero to $1M ARR in nine months. They contributed to product decisions, challenged our assumptions, and built a foundation that's still scaling without issues 18 months later. They think like founders, not just contractors.",
    initials: 'SR',
    name: 'Sophie R.',
    role: 'Founder & CEO, SaaS Co.',
  },
  {
    stars: 5,
    projectBadge: 'Enterprise Internal Platform',
    quote:
      "We were paying $240k/year for three SaaS tools that didn't talk to each other. Corematrix built us a unified system in 10 weeks that does everything those three tools did — better. It paid for itself in two months.",
    initials: 'DK',
    name: 'David K.',
    role: 'COO, Professional Services Firm',
  },
];

export const INDUSTRIES = SHARED_INDUSTRIES;
export const TECH_CATEGORIES = SHARED_TECH_CATEGORIES;

export const DELIVERY_STEPS: DeliveryStep[] = [
  {
    num: '01',
    title: 'Discovery Sprint',
    body: '2-week deep dive into goals, users, and tech landscape. Full spec and roadmap delivered before any code is written.',
  },
  {
    num: '02',
    title: 'Architecture First',
    body: 'System design, schema, API contracts, and UI wireframes signed off before build starts. No surprises mid-sprint.',
  },
  {
    num: '03',
    title: 'Agile Delivery',
    body: '2-week sprints, weekly demos, and a shared board you can see at any time. Working software every sprint, no exceptions.',
  },
  {
    num: '04',
    title: 'QA, Security & Launch',
    body: 'Automated test suite, OWASP security scan, performance benchmarks, and zero-downtime deployment on launch day.',
  },
];
