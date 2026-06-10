import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PROJECTS, FEATURED_PROJECT } from '@/data/portfolioData';
import { getPortfolioCaseNarrative } from '@/data/portfolioCaseStudyNarratives';
import { siteConfig } from '@/config/site';
import { breadcrumbJsonLd, portfolioCaseStudyJsonLd } from '@/lib/seo/jsonld';
import { PortfolioCaseStudyLayout } from '@/sections/portfolio/PortfolioCaseStudyLayout';

interface Props {
  params: Promise<{ slug: string }>;
}

const ALL_PROJECTS = [...PROJECTS, FEATURED_PROJECT];

export function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }));
}

function metaDescriptionForSlug(slug: string) {
  const project = ALL_PROJECTS.find((p) => p.slug === slug);
  if (!project) return '';
  const narrative = getPortfolioCaseNarrative(slug, project);
  const fromChallenge = narrative.challenge.replace(/\s+/g, ' ').trim();
  return fromChallenge.length > 165 ? `${fromChallenge.slice(0, 162)}…` : fromChallenge;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };
  const narrative = getPortfolioCaseNarrative(slug, project);
  const description = metaDescriptionForSlug(slug);
  const url = `${siteConfig.url}/portfolio/${slug}`;
  return {
    title: `${project.title} — Portfolio | Corematrix`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description,
      url,
      type: 'article',
      publishedTime: narrative.datePublished,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description,
    },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const narrative = getPortfolioCaseNarrative(slug, project);
  const articleLd = portfolioCaseStudyJsonLd({
    title: project.title,
    description: narrative.challenge,
    slug: slug,
    datePublished: narrative.datePublished,
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', item: siteConfig.url },
    { name: 'Portfolio', item: `${siteConfig.url}/portfolio` },
    { name: project.title, item: `${siteConfig.url}/portfolio/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PortfolioCaseStudyLayout project={project} narrative={narrative} />
    </>
  );
}
