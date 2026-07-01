import { serviceJsonLd } from '@/lib/seo/jsonld';
import { siteUrl } from '@/lib/seo';
import { ServicesHeroSection } from '@/sections/services/ServicesHeroSection';
import { ServiceFilterNav } from '@/sections/services/ServiceFilterNav';
import { MainServicesSection } from '@/sections/services/MainServicesSection';
import { TechSolutionsSection } from '@/sections/services/TechSolutionsSection';
import { HowWeWorkSection } from '@/sections/services/HowWeWorkSection';
import { EngagementModelsSection } from '@/sections/services/EngagementModelsSection';
import { IndustriesSection } from '@/sections/services/IndustriesSection';
import { CaseStudiesSection } from '@/sections/services/CaseStudiesSection';
import { WhyChooseSection } from '@/sections/services/WhyChooseSection';
import { ServiceTestimonialsSection } from '@/sections/services/ServiceTestimonialsSection';
import { ServicesFaqSection } from '@/sections/services/ServicesFaqSection';
import { ServicesCtaSection } from '@/sections/services/ServicesCtaSection';

export const metadata = {
  title:
    'Services — Corematrix | AI Development, Web Apps, SaaS & Dedicated Teams',
  description:
    'Explore Corematrix services: AI product development, custom automation, Next.js web applications, mobile apps, SaaS platforms, and dedicated engineering teams for startups and enterprises.',
  keywords: [
    'AI development services',
    'custom AI solutions',
    'Next.js development company',
    'SaaS development services',
    'dedicated development team',
    'web application development',
    'mobile app development',
    'AI automation services',
    'LLM integration services',
    'offshore development team',
    'staff augmentation',
    'enterprise software development',
  ],
  openGraph: {
    title: 'Services — Corematrix | AI-Powered Engineering',
    description:
      'Full-service AI and software engineering — from LLM products to Next.js apps, SaaS platforms, and dedicated development teams.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://corematrix.com'}/services`,
    siteName: 'Corematrix',
    type: 'website' as const,
  },
  alternates: {
    canonical: `${siteUrl}/services`,
  },
};

const jsonLd = serviceJsonLd();

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesHeroSection />
      <div className="relative">
        <ServiceFilterNav />
        <MainServicesSection />
      </div>
      <TechSolutionsSection />
      <HowWeWorkSection />
      <EngagementModelsSection />
      <IndustriesSection />
      <CaseStudiesSection />
      <WhyChooseSection />
      <ServiceTestimonialsSection />
      <ServicesFaqSection />
      <ServicesCtaSection />
    </>
  );
}
