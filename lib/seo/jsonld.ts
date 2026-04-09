import { siteConfig } from '@/config/site';

const baseUrl = siteConfig.url;

export function organizationJsonLd(overrides?: {
  description?: string;
  foundingDate?: string;
  numberOfEmployees?: number;
  knowsAbout?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: baseUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone.replace(/\s/g, ''),
    sameAs: [siteConfig.linkedin, siteConfig.twitter, siteConfig.github],
    ...overrides,
  } as const;
}

export interface BreadcrumbItem {
  name: string;
  item?: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem' as const,
      position: i + 1,
      name: item.name,
      ...(item.item ? { item: item.item } : {}),
    })),
  } as const;
}

export function webPageJsonLd(
  type: 'WebPage' | 'CollectionPage',
  name: string,
  description: string,
  path: string,
  breadcrumbItems?: BreadcrumbItem[]
) {
  const url = path.startsWith('http') ? path : `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  const obj: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
  };
  if (breadcrumbItems?.length) {
    obj.breadcrumb = {
      '@type': 'BreadcrumbList' as const,
      itemListElement: breadcrumbItems.map((item, i) => ({
        '@type': 'ListItem' as const,
        position: i + 1,
        name: item.name,
        ...(item.item ? { item: item.item } : {}),
      })),
    };
  }
  return obj;
}

export function blogJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Corematrix Engineering Blog',
    description:
      'Deep dives on AI development, Next.js, LLM integration, SaaS architecture, and modern software engineering.',
    url: `${baseUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: baseUrl,
    },
  } as const;
}

export function contactPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Corematrix',
    description:
      'Get in touch with Corematrix for AI development, web applications, SaaS platforms, and dedicated engineering teams.',
    url: `${baseUrl}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.name,
      email: siteConfig.email,
      telephone: siteConfig.phone.replace(/\s/g, ''),
      url: baseUrl,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        availableLanguage: 'English',
        contactOption: 'TollFree',
      },
    },
  } as const;
}

export function serviceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'IT Services & AI Development',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: baseUrl,
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Corematrix Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Product Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom AI & Automation' } },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Web Application Development' },
        },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'SaaS Platform Development' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Dedicated Development Teams' },
        },
      ],
    },
  } as const;
}

/** Case study / portfolio project detail — Article + optional breadcrumbs. */
export function portfolioCaseStudyJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
}) {
  const url = `${baseUrl}/portfolio/${input.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    author: {
      '@type': 'Organization' as const,
      name: siteConfig.name,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization' as const,
      name: siteConfig.name,
      url: baseUrl,
    },
    mainEntityOfPage: { '@type': 'WebPage' as const, '@id': url },
    url,
  } as const;
}

export function articleJsonLd(post: {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt ?? '',
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { '@type': 'Organization', name: siteConfig.name, url: baseUrl },
    publisher: { '@type': 'Organization', name: siteConfig.name },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
  } as const;
}
