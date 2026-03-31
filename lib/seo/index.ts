import type { Metadata } from 'next';
import type { PageMetadataConfig } from '@/types';

/** Base URL for the site. Set NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://example.com';

/** Default site name used in title template and Open Graph. */
const siteName = 'Marketing Website';

/** Default OG image when no page-specific image is provided. Falls back to logo if og-default.png is missing. */
const defaultOgImage = `${siteUrl}/images/logo.png`;

/**
 * Default metadata for the entire site. Used by the root layout.
 * All pages inherit this; per-route metadata export overrides as needed.
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    'A modern, SEO-optimized marketing website built with Next.js. Strategy, creative, and growth for your brand.',
  keywords: ['marketing', 'strategy', 'growth', 'design', 'brand'],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  icons: {
    icon: '/images/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: undefined, // Set @username when available
    creator: undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    // Uncomment and set when you have verification IDs:
    // google: 'google-site-verification-id',
    // yandex: 'yandex-verification-id',
  },
  category: 'marketing',
};

/**
 * Builds Next.js Metadata for a single page from a simple config.
 * Use in static pages: export const metadata = createPageMetadata({ ... })
 * Or in dynamic routes: export async function generateMetadata({ params }) { return createPageMetadata({ ... }) }
 *
 * Supports canonical URL, optional noindex, custom OG image, and full Open Graph/Twitter overrides.
 */
export function createPageMetadata(config: PageMetadataConfig): Metadata {
  const {
    title,
    description,
    path = '',
    image = defaultOgImage,
    imageWidth = 1200,
    imageHeight = 630,
    imageAlt,
    noindex = false,
    nofollow = false,
    keywords,
    openGraph,
    twitter,
    alternates,
  } = config;

  const canonicalPath = path.startsWith('/') ? path : path ? `/${path}` : '';
  const canonicalUrl = canonicalPath ? `${siteUrl}${canonicalPath}` : siteUrl;

  const metadata: Metadata = {
    title,
    description,
    ...(keywords && keywords.length > 0 && { keywords }),
    openGraph: {
      title: openGraph?.title ?? title,
      description: openGraph?.description ?? description,
      url: canonicalUrl,
      siteName: openGraph?.siteName ?? siteName,
      images: [
        {
          url: image,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt ?? title,
        },
      ],
      ...openGraph,
    },
    twitter: {
      title: twitter?.title ?? title,
      description: twitter?.description ?? description,
      images: [image],
      ...twitter,
    },
    alternates: {
      canonical: alternates?.canonical ?? canonicalUrl,
      ...alternates,
    },
    robots: noindex || nofollow
      ? {
          index: !noindex,
          follow: !nofollow,
        }
      : undefined,
  };

  return metadata;
}

/**
 * Returns default metadata. Useful when root layout needs to call a function
 * (e.g. for i18n or env-based defaults) instead of a static export.
 */
export function getDefaultMetadata(): Metadata {
  return defaultMetadata;
}
