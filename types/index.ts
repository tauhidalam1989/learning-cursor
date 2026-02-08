/**
 * Shared TypeScript types and interfaces for the marketing website.
 * Centralizing types here keeps components and API contracts consistent.
 */

/** Legacy shape for page metadata; prefer PageMetadataConfig for createPageMetadata(). */
export interface PageMetadata {
  title: string;
  description: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: string[];
  };
}

/**
 * Per-page SEO configuration for createPageMetadata() in lib/seo.
 * All fields optional except title and description.
 */
export interface PageMetadataConfig {
  /** Page title (used in <title>, OG, Twitter). */
  title: string;
  /** Meta description and default for OG/Twitter description. */
  description: string;
  /** Path for canonical URL (e.g. '/about' or 'about'). */
  path?: string;
  /** Absolute URL for OG/Twitter image. */
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  /** Set true to noindex this page. */
  noindex?: boolean;
  /** Set true to nofollow this page. */
  nofollow?: boolean;
  /** Meta keywords (optional; many engines ignore). */
  keywords?: string[];
  /** Override or extend Open Graph fields. */
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
    type?: string;
    locale?: string;
  };
  /** Override or extend Twitter card fields. */
  twitter?: {
    title?: string;
    description?: string;
    images?: string[];
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    creator?: string;
  };
  /** Canonical and alternate URLs. */
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author?: string;
  imageSrc?: string;
  imageAlt?: string;
}

/**
 * Contact form section block – dynamic content for reusable ContactFormSection.
 */
export interface ContactBlock {
  sectionLabel: string;
  heading: string;
  paragraph: string;
  contactItems: ContactItem[];
  submitButtonLabel?: string;
}

export type ContactItemType = 'email' | 'phone' | 'address';

export interface ContactItem {
  type: ContactItemType;
  value: string;
  href?: string;
}

/**
 * Props for the reusable HeroSection component.
 */
export interface HeroSectionProps {
  /** Main heading (H1) */
  title: string;
  /** Supporting description text */
  description: string;
  /** Primary CTA button configuration */
  primaryCTA: {
    label: string;
    href: string;
  };
  /** Secondary CTA button configuration */
  secondaryCTA: {
    label: string;
    href: string;
  };
  /** Hero illustration image source */
  imageSrc: string;
  /** Alt text for the illustration */
  imageAlt: string;
  /** Optional image width (for Next.js Image optimization) */
  imageWidth?: number;
  /** Optional image height (for Next.js Image optimization) */
  imageHeight?: number;
  /** Optional section ID */
  id?: string;
}
