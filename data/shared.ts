/**
 * Cross-page shared data.
 * Import from here when data is used on more than one page.
 */

import type { Industry, TechCategory } from '@/types/shared';

export const SHARED_INDUSTRIES: Industry[] = [
  { icon: '🏥', name: 'Healthcare & MedTech', description: 'HIPAA-compliant platforms, clinical AI' },
  { icon: '💰', name: 'Fintech & Banking', description: 'Payments, fraud AI, KYC automation' },
  { icon: '🛍️', name: 'eCommerce & Retail', description: 'Storefronts, AI recommendations' },
  { icon: '🎓', name: 'EdTech & E-Learning', description: 'LMS, adaptive AI tutoring' },
  { icon: '🏗️', name: 'Real Estate & PropTech', description: 'Valuation AI, CRM, listing platforms' },
  { icon: '🚚', name: 'Logistics & Supply Chain', description: 'Route optimisation, fleet management' },
  { icon: '🤝', name: 'HR Tech & Recruitment', description: 'ATS, AI screening, analytics' },
  { icon: '⚖️', name: 'Legal Tech', description: 'Contract AI, document processing' },
];

export const SHARED_TECH_CATEGORIES: TechCategory[] = [
  {
    label: 'AI & Machine Learning',
    items: [
      'OpenAI API',
      'LangChain',
      'LlamaIndex',
      'Pinecone',
      'PyTorch',
      'Hugging Face',
      'Claude API',
      'RAG Pipelines',
      'Vector DBs',
      'MLOps',
    ],
  },
  {
    label: 'Frontend & Web',
    items: [
      'Next.js 14',
      'React 18',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'React Native',
      'Flutter',
      'tRPC',
      'GraphQL',
      'Zustand',
    ],
  },
  {
    label: 'Backend & Infrastructure',
    items: [
      'Node.js',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Docker',
      'Kubernetes',
      'AWS',
      'GCP',
      'Supabase',
      'Vercel',
    ],
  },
];
