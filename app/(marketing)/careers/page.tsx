import { siteConfig } from '@/config/site';
import { webPageJsonLd } from '@/lib/seo/jsonld';
import { CareersHeroSection } from '@/sections/careers/CareersHeroSection';
import { CareersMarquee } from '@/sections/careers/CareersMarquee';
import { WhyJoinSection } from '@/sections/careers/WhyJoinSection';
import { CareersCultureSection } from '@/sections/careers/CareersCultureSection';
import { BenefitsSection } from '@/sections/careers/BenefitsSection';
import { InterviewProcessSection } from '@/sections/careers/InterviewProcessSection';
import { OpenRolesSection } from '@/sections/careers/OpenRolesSection';
import { TeamStoriesSection } from '@/sections/careers/TeamStoriesSection';
import { LifeAtSection } from '@/sections/careers/LifeAtSection';
import { OpenApplicationSection } from '@/sections/careers/OpenApplicationSection';
import { CareersFaqSection } from '@/sections/careers/CareersFaqSection';
import { CareersCtaSection } from '@/sections/careers/CareersCtaSection';

const careersUrl = `${siteConfig.url}/careers`;

export const metadata = {
  title: 'Careers at Corematrix — Join Our AI-First Engineering Team',
  description:
    "Build the future of AI at Corematrix. We're hiring engineers, AI specialists, and product builders. Remote-first, competitive pay, and real ownership from day one.",
  keywords: [
    'AI engineering jobs',
    'remote software engineer jobs',
    'Next.js developer jobs',
    'LLM engineer position',
    'AI company hiring',
    'remote tech jobs 2026',
    'Python backend engineer jobs',
    'full-stack developer remote',
    'AI startup careers',
    'software engineering careers',
  ],
  openGraph: {
    title: 'Careers at Corematrix — Build the Future of AI With Us',
    description:
      'Join a team of engineers and AI specialists who ship real products. Remote-first, transparent, competitive pay, and real ownership.',
    url: careersUrl,
    siteName: 'Corematrix',
    type: 'website' as const,
  },
};

const jsonLd = webPageJsonLd(
  'WebPage',
  'Careers at Corematrix',
  'Open engineering and AI positions at Corematrix. Remote-first roles for engineers, AI specialists, designers, and product managers.',
  '/careers',
  [
    { name: 'Home', item: siteConfig.url },
    { name: 'Careers', item: careersUrl },
  ]
);

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareersHeroSection />
      <CareersMarquee />
      <WhyJoinSection />
      <CareersCultureSection />
      <BenefitsSection />
      <InterviewProcessSection />
      <OpenRolesSection />
      <TeamStoriesSection />
      <LifeAtSection />
      <OpenApplicationSection />
      <CareersFaqSection />
      <CareersCtaSection />
    </>
  );
}
