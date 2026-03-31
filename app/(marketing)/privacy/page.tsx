import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { webPageJsonLd } from '@/lib/seo/jsonld';
import { PrivacyHero } from '@/sections/privacy/PrivacyHero';
import { PrivacyLayout } from '@/sections/privacy/PrivacyLayout';
import { PrivacyContactCta } from '@/sections/privacy/PrivacyContactCta';

const privacyUrl = `${siteConfig.url}/privacy`;

export const metadata: Metadata = {
  title: 'Privacy Policy — Corematrix',
  description:
    'Corematrix Privacy Policy. Learn how we collect, use, protect, and manage your personal data in compliance with GDPR and international privacy standards.',
  alternates: {
    canonical: privacyUrl,
  },
};

const jsonLd = webPageJsonLd(
  'WebPage',
  'Privacy Policy — Corematrix',
  'How Corematrix collects, uses, and protects your personal data.',
  '/privacy',
  [
    { name: 'Home', item: siteConfig.url },
    { name: 'Privacy Policy', item: privacyUrl },
  ]
);

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PrivacyHero />
      <PrivacyLayout />
      <PrivacyContactCta />
    </>
  );
}
