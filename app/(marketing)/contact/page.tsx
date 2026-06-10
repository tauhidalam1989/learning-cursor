import { contactPageJsonLd } from '@/lib/seo/jsonld';
import { ContactHeroSection } from '@/sections/contact/ContactHeroSection';
import { ContactFormSection } from '@/sections/contact/ContactFormSection';
import { WhatHappensNextSection } from '@/sections/contact/WhatHappensNextSection';
import { ContactChannelsSection } from '@/sections/contact/ContactChannelsSection';
import { RightFitSection } from '@/sections/contact/RightFitSection';
import { LocationSection } from '@/sections/contact/LocationSection';
import { ContactTrustSection } from '@/sections/contact/ContactTrustSection';
import { ContactFaqSection } from '@/sections/contact/ContactFaqSection';
import { ContactCtaSection } from '@/sections/contact/ContactCtaSection';
import { siteConfig } from '@/config/site';
import { siteUrl } from '@/lib/seo';

export const metadata = {
  title: 'Contact Corematrix — Start Your AI or Software Project Today',
  description:
    "Get in touch with Corematrix. Tell us about your project and we'll respond within 24 hours with a real technical perspective. AI development, web apps, SaaS, and dedicated teams.",
  keywords: [
    'contact Corematrix',
    'hire AI development company',
    'get a software project quote',
    'dedicated development team inquiry',
    'AI product development contact',
    'Next.js development agency contact',
    'software outsourcing inquiry',
    'free technical consultation',
  ],
  openGraph: {
    title: "Contact Corematrix — Let's Build Something Extraordinary",
    description:
      "Start a conversation about your AI or software project. We respond within 24 hours with a genuine technical perspective — not a sales pitch.",
    url: `${siteConfig.url}/contact`,
    siteName: 'Corematrix',
    type: 'website' as const,
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

const jsonLd = contactPageJsonLd();

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactHeroSection />
      <ContactFormSection />
      <WhatHappensNextSection />
      <ContactChannelsSection />
      <RightFitSection />
      <LocationSection />
      <ContactTrustSection />
      <ContactFaqSection />
      <ContactCtaSection />
    </>
  );
}
