import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import type { PortfolioCaseNarrative, Project } from '@/types/portfolio';

const TRUST_POINTS = [
  'Production-grade code, tests, and observability',
  'AI-first architecture where it drives real outcomes',
  'Weekly demos and transparent delivery',
] as const;

type Props = {
  project: Project;
  narrative: PortfolioCaseNarrative;
};

function NarrativeBlock({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-2xl border border-corematrix-border bg-corematrix-card2 p-6 sm:p-8">
      <p className="section-label text-corematrix-green400">{label}</p>
      <h2 className="mt-3 font-display text-xl font-bold text-corematrix-textPrimary sm:text-2xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">{body}</p>
    </article>
  );
}

export function PortfolioCaseStudyLayout({ project, narrative }: Props) {
  const extended = project as Project & { fullDescription?: string };
  const description: string =
    typeof extended.fullDescription === 'string' && extended.fullDescription.trim() !== ''
      ? extended.fullDescription
      : project.description.trim() !== ''
        ? project.description
        : project.title;

  return (
    <>
      <section
        aria-labelledby="portfolio-case-heading"
        className="relative overflow-hidden bg-corematrix-bg1 pt-32 pb-12 sm:pt-36 sm:pb-16"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.15]" aria-hidden>
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="portfolio-case-grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="#1a3525"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#portfolio-case-grid)" />
          </svg>
        </div>
        <div
          className="pointer-events-none absolute -right-24 -top-44 h-[560px] w-[560px] rounded-full bg-corematrix-green700 opacity-[0.10] blur-[120px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-[420px] w-[420px] rounded-full bg-corematrix-green700 opacity-[0.06] blur-[100px]"
          aria-hidden
        />

        <Container className="relative z-10">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-corematrix-textDim"
          >
            <Link href="/" className="transition-colors hover:text-corematrix-textMuted">
              Home
            </Link>
            <span aria-hidden>›</span>
            <Link href="/portfolio" className="transition-colors hover:text-corematrix-textMuted">
              Portfolio
            </Link>
            <span aria-hidden>›</span>
            <span className="line-clamp-1 text-corematrix-green400">{project.title}</span>
          </nav>

          <p className="section-label text-corematrix-green400">Case study</p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-corematrix-green700/30 bg-corematrix-green900/30 px-3 py-1 text-xs font-medium text-corematrix-green400">
            <span aria-hidden>{project.emoji}</span>
            {project.categoryLabel}
          </div>

          <h1
            id="portfolio-case-heading"
            className="mt-3 max-w-[900px] font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.06] tracking-tight text-corematrix-textPrimary"
          >
            {project.title}
          </h1>

          <p className="mt-6 max-w-[680px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            {description}
          </p>

          {project.metrics.length > 0 && (
            <div className="mt-10 border-t border-corematrix-border pt-10">
              <p className="section-label text-corematrix-green400">Key metrics</p>
              <div className="mt-6 flex flex-wrap gap-x-10 gap-y-6">
                {project.metrics.map((m, i) => (
                  <div key={i}>
                    <p className="font-display text-2xl font-bold tracking-tight text-corematrix-green400 sm:text-3xl">
                      {m.value}
                    </p>
                    <p className="mt-1 max-w-[200px] text-xs leading-snug text-corematrix-textMuted">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="border-t border-corematrix-border bg-corematrix-bg0 py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_min(320px,100%)] lg:gap-16">
            <div className="min-w-0 space-y-6">
              <NarrativeBlock
                label="The challenge"
                title="What needed to change"
                body={narrative.challenge}
              />
              <NarrativeBlock
                label="Our approach"
                title="What we built"
                body={narrative.solution}
              />
              <NarrativeBlock
                label="Results"
                title="Outcomes in production"
                body={narrative.results}
              />

              <div className="relative overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-bg0">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.thumbGradient}`}
                  aria-hidden
                />
                <div
                  className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent"
                  aria-hidden
                />
                <div className="relative flex aspect-video items-center justify-center text-7xl sm:text-8xl">
                  <span aria-hidden>{project.emoji}</span>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-6">
                <p className="section-label text-corematrix-green400">Project details</p>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <dt className="text-corematrix-textMuted">Category</dt>
                    <dd className="font-medium text-corematrix-textSecondary">{project.categoryLabel}</dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <dt className="text-corematrix-textMuted">Industry</dt>
                    <dd className="font-medium text-corematrix-textSecondary">{project.industry}</dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <dt className="text-corematrix-textMuted">Published</dt>
                    <dd className="font-medium text-corematrix-textSecondary">
                      {new Date(narrative.datePublished).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </dd>
                  </div>
                </dl>

                {project.techStack.length > 0 && (
                  <div className="mt-8 border-t border-corematrix-border pt-6">
                    <p className="section-label text-corematrix-green400">Tech stack</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-corematrix-border bg-corematrix-bg0 px-2 py-0.5 font-mono text-[0.62rem] font-semibold text-corematrix-textDim"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <ul className="mt-8 space-y-2 border-t border-corematrix-border pt-6 text-sm text-corematrix-textSecondary">
                  {TRUST_POINTS.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-corematrix-green400" />
                      {line}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-8 flex w-full items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
                >
                  Start a similar project →
                </Link>
              </div>

              <Link
                href="/portfolio"
                className="mt-6 flex items-center gap-2 text-sm font-semibold text-corematrix-textMuted transition-colors hover:text-corematrix-green400"
              >
                ← Back to Portfolio
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="portfolio-case-cta-heading"
        className="relative overflow-hidden border-t border-corematrix-border bg-corematrix-bg2 py-28"
      >
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.08] blur-[140px]"
          aria-hidden
        />
        <Container>
          <div className="relative z-10 text-center">
            <p className="section-label text-corematrix-green400">NEXT PROJECT</p>
            <h2
              id="portfolio-case-cta-heading"
              className="mx-auto mb-5 max-w-[700px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight text-corematrix-textPrimary"
            >
              Want this level of depth on your roadmap?
            </h2>
            <p className="mx-auto mb-8 max-w-[600px] text-base leading-relaxed text-corematrix-textSecondary">
              Tell us about your product, stack, and timeline. We&apos;ll respond with a clear technical
              take — not a generic sales template.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
              >
                Talk to us →
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-8 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
              >
                Explore services
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
