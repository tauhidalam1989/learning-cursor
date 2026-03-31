/**
 * Single source of truth for company info used across the site.
 */

export const siteConfig = {
  name: 'Corematrix',
  tagline: 'Intelligent Digital Solutions For a New World',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://corematrix.com',
  email: 'info@corematrixs.com',
  careersEmail: 'careers@corematrix.com',
  phone: '+224 494 4994',
  phoneTel: 'tel:+2244944994',
  linkedin: 'https://linkedin.com/company/corematrix',
  linkedinDisplay: 'linkedin.com/company/corematrix',
  github: 'https://github.com/corematrix',
  githubDisplay: 'github.com/corematrix',
  twitter: 'https://twitter.com/corematrix',
  instagram: 'https://instagram.com/corematrix',
  facebook: 'https://facebook.com/corematrix',
  location: 'Remote-First · Available Globally',
  foundedYear: 2019,
  currentYear: new Date().getFullYear(),
} as const;

export type SiteConfig = typeof siteConfig;
