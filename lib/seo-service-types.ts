export type ServiceLandingSection = {
  heading: string;
  body: string;
  headingAr?: string;
  bodyAr?: string;
};

export type ServiceLandingConfig = {
  /** URL segment and key in SERVICE_LANDING */
  slug: string;
  /** Document <title> */
  title: string;
  titleAr?: string;
  /** Meta description (search + OG) */
  description: string;
  descriptionAr?: string;
  canonicalPath: string;
  ogTitle?: string;
  ogTitleAr?: string;
  h1: string;
  h1Ar?: string;
  intro: string;
  introAr?: string;
  badge?: string;
  badgeAr?: string;
  sections: ServiceLandingSection[];
  serviceType: string;
  serviceTypeAr?: string;
  serviceSchemaDescription: string;
  serviceSchemaDescriptionAr?: string;
  related: { label: string; labelAr?: string; path: string }[];
  caseStudies?: { label: string; labelAr?: string; path: string }[];
  breadcrumbLabel: string;
  breadcrumbLabelAr?: string;
  stackTags: string[];
};

