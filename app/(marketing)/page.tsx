import type { Metadata } from 'next';
import { siteUrl } from '@/lib/seo';
import { HeroSection } from '@/sections/home/HeroSection';
import { TechStackMarquee } from '@/sections/home/TechStackMarquee';
import { CoreServicesSection } from '@/sections/home/CoreServicesSection';
import { AiSpotlightSection } from '@/sections/home/AiSpotlightSection';
import { ProcessSection } from '@/sections/home/ProcessSection';
import { WhyCorematrixSection } from '@/sections/home/WhyCorematrixSection';
import { IndustriesSection } from '@/sections/home/IndustriesSection';
import { TestimonialsSection } from '@/sections/home/TestimonialsSection';
import { FaqSection } from '@/sections/home/FaqSection';
import { CtaBannerSection } from '@/sections/home/CtaBannerSection';
import { ContactFormSection } from '@/sections/common/ContactFormSection';
import { defaultContactBlock } from '@/data/contact';

export const metadata: Metadata = {
  title: 'Corematrix — AI Development & IT Services Company',
  description:
    'Corematrix is an AI-first IT services company delivering custom AI products, full-stack web apps, SaaS platforms, and dedicated development teams for startups and enterprises.',
  keywords: [
    'AI development company',
    'custom AI solutions',
    'Next.js development',
    'full-stack development services',
    'AI product development',
    'SaaS development company',
    'dedicated development teams',
    'digital transformation consulting',
    'LLM integration services',
    'IT outsourcing company',
  ],
  openGraph: {
    title: 'Corematrix — AI-Powered Digital Solutions',
    description:
      'We build intelligent software — AI products, web apps, and SaaS platforms that drive real business results.',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://corematrix.com',
    siteName: 'Corematrix',
    type: 'website',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function HomePage() {
  return (
    <div className="bg-corematrix-bg0">
      <HeroSection />
      <TechStackMarquee />
      <CoreServicesSection />
      <AiSpotlightSection />
      <ProcessSection />
      <WhyCorematrixSection />
      <IndustriesSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaBannerSection />
      {/* <ContactFormSection block={defaultContactBlock} id="contact-form" /> */}
    </div>
  );
}
