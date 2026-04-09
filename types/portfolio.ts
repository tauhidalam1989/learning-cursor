export type ProjectCategory =
  | 'ai'
  | 'web'
  | 'saas'
  | 'mobile'
  | 'enterprise'
  | 'all';

export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  industry: string;
  emoji: string;
  thumbGradient: string;
  metrics: ProjectMetric[];
  techStack: string[];
  featured?: boolean;
};

export type FeaturedProject = Project & {
  fullDescription: string;
  metrics: ProjectMetric[];
};

export type ImpactStat = {
  count: number;
  suffix: string;
  label: string;
  sub: string;
};

export type Testimonial = {
  stars: number;
  projectBadge: string;
  quote: string;
  initials: string;
  name: string;
  role: string;
};

export type Industry = {
  icon: string;
  name: string;
  description: string;
};

export type TechCategory = {
  label: string;
  items: string[];
};

export type DeliveryStep = {
  num: string;
  title: string;
  body: string;
};

export type FilterOption = {
  id: ProjectCategory;
  label: string;
};

/** Long-form case study copy for `/portfolio/[slug]` (challenge → solution → results). */
export type PortfolioCaseNarrative = {
  challenge: string;
  solution: string;
  results: string;
  /** ISO 8601 date (YYYY-MM-DD) for Article schema */
  datePublished: string;
};
