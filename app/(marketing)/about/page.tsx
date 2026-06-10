import type { Metadata } from 'next';
import { siteUrl } from '@/lib/seo';
import { organizationJsonLd } from '@/lib/seo/jsonld';
import { AboutHeroSection } from '@/sections/about/AboutHeroSection';
import { WhoWeAreSection } from '@/sections/about/WhoWeAreSection';
import { MissionVisionSection } from '@/sections/about/MissionVisionSection';
import { CoreValuesSection } from '@/sections/about/CoreValuesSection';
import { OurApproachSection } from '@/sections/about/OurApproachSection';
import { TeamSection } from '@/sections/about/TeamSection';
import { TechStackSection } from '@/sections/about/TechStackSection';
import { ImpactNumbersSection } from '@/sections/about/ImpactNumbersSection';
import { CultureSection } from '@/sections/about/CultureSection';
import { ClientLogosSection } from '@/sections/about/ClientLogosSection';
import { AboutFaqSection } from '@/sections/about/AboutFaqSection';
import { AboutCtaSection } from '@/sections/about/AboutCtaSection';

export const metadata: Metadata = {
  title: 'About Corematrix — AI-First IT Services & Consulting Company',
  description:
    'Learn about Corematrix — our mission, team, values, and why 50+ global clients trust us to build intelligent, scalable AI-powered digital solutions.',
  keywords: [
    'about Corematrix',
    'AI development team',
    'IT consulting company',
    'custom software company',
    'AI-first engineering team',
    'dedicated development team',
    'software outsourcing company',
    'technology consulting firm',
  ],
  openGraph: {
    title: 'About Corematrix — AI-Powered Engineering Team',
    description:
      'Meet the team behind Corematrix — engineers, AI specialists, and product thinkers building software that drives real business results.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://corematrix.com'}/about`,
    siteName: 'Corematrix',
    type: 'website',
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

const jsonLd = organizationJsonLd({
  description:
    'AI-first IT services and consulting company delivering custom AI products, full-stack web apps, SaaS platforms, and dedicated development teams.',
  foundingDate: '2019',
  numberOfEmployees: 25,
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'LLM Integration',
    'Next.js Development',
    'SaaS Development',
    'Full-Stack Engineering',
  ],
});

export default function AboutPage() {
  return (
    <div className="bg-corematrix-bg0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutHeroSection />
      <WhoWeAreSection />
      <MissionVisionSection />
      <CoreValuesSection />
      <OurApproachSection />
      <TeamSection />
      <TechStackSection />
      <ImpactNumbersSection />
      <CultureSection />
      <ClientLogosSection />
      <AboutFaqSection />
      <AboutCtaSection />
    </div>
  );
}
