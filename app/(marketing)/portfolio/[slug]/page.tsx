import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS, FEATURED_PROJECT } from '@/data/portfolioData';
import { siteConfig } from '@/config/site';

interface Props {
  params: { slug: string };
}

const ALL_PROJECTS = [...PROJECTS, FEATURED_PROJECT];

export function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const project = ALL_PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project Not Found' };
  const desc: string =
    'fullDescription' in project && typeof project.fullDescription === 'string'
      ? project.fullDescription
      : (project.description || project.title);
  return {
    title: project.title,
    description: desc || project.title,
    alternates: {
      canonical: `${siteConfig.url}/portfolio/${params.slug}`,
    },
    openGraph: {
      title: project.title,
      description: desc || project.title,
      url: `${siteConfig.url}/portfolio/${params.slug}`,
      type: 'website',
    },
  };
}

export default function PortfolioDetailPage({ params }: Props) {
  const project = ALL_PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const description: string =
    'fullDescription' in project && typeof project.fullDescription === 'string'
      ? project.fullDescription
      : (project.description || project.title);

  return (
    <main className="pt-24 pb-20 px-[6vw]">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs text-corematrix-textDim font-medium mb-8"
      >
        <Link
          href="/"
          className="hover:text-corematrix-green400 transition-colors"
        >
          Home
        </Link>
        <span aria-hidden>›</span>
        <Link
          href="/portfolio"
          className="hover:text-corematrix-green400 transition-colors"
        >
          Portfolio
        </Link>
        <span aria-hidden>›</span>
        <span className="text-corematrix-green400">{project.categoryLabel}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 max-w-[1100px]">
        <div>
          <div
            className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.08em] uppercase text-corematrix-green400 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {project.emoji} {project.categoryLabel}
          </div>

          <h1
            className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-tight text-corematrix-textPrimary leading-[1.1] mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {project.title}
          </h1>

          <p className="text-[0.95rem] text-corematrix-textMuted font-light leading-[1.8] mb-8 max-w-[640px]">
            {description}
          </p>

          {project.metrics.length > 0 && (
            <div className="flex gap-6 flex-wrap p-5 bg-corematrix-green900/[0.04] border border-corematrix-green700/15 rounded-xl mb-8">
              {project.metrics.map((m, i) => (
                <div key={i} className="text-center">
                  <div
                    className="font-display text-2xl font-extrabold text-corematrix-green400 tracking-tight leading-none"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {m.value}
                  </div>
                  <div className="text-[0.7rem] text-corematrix-textDim mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[0.7rem] font-semibold text-corematrix-green700 bg-corematrix-green900/20 border border-corematrix-green700/20 rounded px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="w-full aspect-video bg-corematrix-card2 border border-corematrix-border rounded-2xl flex items-center justify-center text-6xl mb-8">
            {project.emoji}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 space-y-4">
          <div className="bg-corematrix-card2 border border-corematrix-border2 rounded-2xl p-6">
            <div
              className="font-display text-xs font-bold tracking-[0.1em] uppercase text-corematrix-green400 mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Project Details
            </div>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-corematrix-textMuted">Category</span>
                <span className="text-corematrix-textSecondary font-medium">
                  {project.categoryLabel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-corematrix-textMuted">Industry</span>
                <span className="text-corematrix-textSecondary font-medium">
                  {project.industry}
                </span>
              </div>
            </div>
            <Link
              href="/contact"
              className="block text-center w-full bg-corematrix-green700 text-white py-3 rounded-lg text-sm font-semibold border border-corematrix-green500 hover:bg-corematrix-green500 transition-all"
            >
              Build Something Similar →
            </Link>
          </div>

          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-sm font-medium text-corematrix-textMuted hover:text-corematrix-green400 transition-colors"
          >
            ← Back to Portfolio
          </Link>
        </aside>
      </div>
    </main>
  );
}
