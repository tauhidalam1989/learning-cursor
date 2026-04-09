export type ServiceLandingSection = {
  heading: string;
  body: string;
};

export type ServiceLandingConfig = {
  /** URL segment and key in SERVICE_LANDING */
  slug: string;
  /** Document <title> */
  title: string;
  /** Meta description (search + OG) */
  description: string;
  canonicalPath: string;
  ogTitle?: string;
  h1: string;
  intro: string;
  badge?: string;
  sections: ServiceLandingSection[];
  serviceType: string;
  serviceSchemaDescription: string;
  related: { label: string; path: string }[];
  caseStudies?: { label: string; path: string }[];
  breadcrumbLabel: string;
  stackTags: string[];
};
