/**
 * Single source of truth for company info used across the site.
 */

export const siteConfig = {
  name: 'Corematrix',
  tagline: 'Intelligent Digital Solutions For a New World',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://corematrix.com',
  email: 'info@corematrixs.com',
  careersEmail: 'info@corematrixs.com',
  phone: '+966-542921214',
  phoneTel: 'tel:+966-542921214',
  linkedin: 'https://linkedin.com/company/corematrix',
  linkedinDisplay: 'linkedin.com/company/corematrix',
  github: 'https://github.com/corematrix',
  githubDisplay: 'github.com/corematrix',
  twitter: 'https://twitter.com/corematrix',
  instagram: 'https://instagram.com/corematrix',
  facebook: 'https://facebook.com/corematrix',
  location: '1st Floor, Super Office, Sayda Street,\nAd Duraihimiyah, Riyadh 12791',
  foundedYear: 2019,
  currentYear: new Date().getFullYear(),
} as const;

export type SiteConfig = typeof siteConfig;
