import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import type { ServiceLandingConfig } from '@/lib/seo-service-types';

export function servicePageMetadata(cfg: ServiceLandingConfig): Metadata {
  const url = `${siteConfig.url}${cfg.canonicalPath}`;
  const ogTitle = cfg.ogTitle ?? cfg.title;
  return {
    title: cfg.title,
    description: cfg.description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: cfg.description,
      url,
      type: 'website',
      siteName: 'Corematrix',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: cfg.description,
    },
  };
}
