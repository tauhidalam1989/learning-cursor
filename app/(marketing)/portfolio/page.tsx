import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { webPageJsonLd } from '@/lib/seo/jsonld';
import { PortfolioHeroSection } from '@/sections/portfolio/PortfolioHeroSection';
import { PortfolioFilterNav } from '@/sections/portfolio/PortfolioFilterNav';
import { FeaturedCaseStudy } from '@/sections/portfolio/FeaturedCaseStudy';
import { ProjectsGridSection } from '@/sections/portfolio/ProjectsGridSection';
import { PortfolioImpactSection } from '@/sections/portfolio/PortfolioImpactSection';
import { PortfolioTestimonials } from '@/sections/portfolio/PortfolioTestimonials';
import { IndustriesServedSection } from '@/sections/portfolio/IndustriesServedSection';
import { PortfolioTechSection } from '@/sections/portfolio/PortfolioTechSection';
import { HowWeDeliverSection } from '@/sections/portfolio/HowWeDeliverSection';
import { PortfolioCtaSection } from '@/sections/portfolio/PortfolioCtaSection';

const portfolioUrl = `${siteConfig.url}/portfolio`;

export const metadata: Metadata = {
  title: "Portfolio — Corematrix | AI & Software Projects We've Built",
  description:
    "Explore Corematrix's portfolio of AI development, web applications, SaaS platforms, and enterprise software projects. Real work, real results, measurable outcomes.",
  keywords: [
    'AI development portfolio',
    'software project case studies',
    'Next.js project examples',
    'SaaS platform development examples',
    'AI automation case study',
    'LLM integration portfolio',
    'enterprise software portfolio',
    'web application case studies',
    'mobile app development portfolio',
    'custom software development results',
  ],
  openGraph: {
    title: 'Portfolio — Corematrix | Real Projects, Measurable Results',
    description:
      '50+ projects delivered — AI systems, SaaS platforms, web apps, and enterprise software. Browse our work and see the outcomes.',
    url: portfolioUrl,
    siteName: 'Corematrix',
    type: 'website',
  },
};

const jsonLd = webPageJsonLd(
  'CollectionPage',
  'Corematrix Portfolio',
  '50+ AI and software projects delivered for startups, scale-ups, and enterprise clients worldwide.',
  '/portfolio',
  [
    { name: 'Home', item: siteConfig.url },
    { name: 'Portfolio', item: portfolioUrl },
  ]
);

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioHeroSection />
      <PortfolioFilterNav />
      <FeaturedCaseStudy />
      <ProjectsGridSection />
      <PortfolioImpactSection />
      <PortfolioTestimonials />
      <IndustriesServedSection />
      <PortfolioTechSection />
      <HowWeDeliverSection />
      <PortfolioCtaSection />
    </>
  );
}
