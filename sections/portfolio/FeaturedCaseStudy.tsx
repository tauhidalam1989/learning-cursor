import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { FEATURED_PROJECT } from '@/data/portfolioData';

// TODO: Replace FEATURED_PROJECT with CMS fetch when cms-portfolio collection is ready

export function FeaturedCaseStudy() {
  const project = FEATURED_PROJECT;
  return (
    <section
      aria-labelledby="featured-heading"
      className="bg-corematrix-bg0 px-4 pb-0 pt-16 sm:px-6 lg:px-8"
    >
      <Container>
        <article className="reveal relative overflow-hidden rounded-3xl border border-corematrix-border2 bg-corematrix-card2">
          <div
            className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent"
            aria-hidden
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-corematrix-bg2">
              {/* TODO: Replace with <Image src={project.coverImage} alt={project.title} fill className="object-cover" /> */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.thumbGradient} opacity-90`}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-corematrix-green700 opacity-[0.08] blur-[80px]"
                aria-hidden
              />
              <span className="absolute left-4 top-4 z-10 rounded-full border border-corematrix-green700/30 bg-corematrix-green900/60 px-3 py-1 font-mono text-[0.65rem] font-semibold text-corematrix-green400">
                Featured Case Study
              </span>
              <span className="relative z-10 text-7xl" aria-hidden>
                {project.emoji}
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-11">
              <span className="mb-3 font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-green400">
                {project.categoryLabel}
              </span>
              <h2
                id="featured-heading"
                className="font-display text-[clamp(1.3rem,2.2vw,1.8rem)] font-extrabold leading-tight tracking-tight text-corematrix-textPrimary"
              >
                {project.title}
              </h2>
              <p className="mt-4 text-sm font-light leading-relaxed text-corematrix-textMuted">
                {project.fullDescription}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 rounded-xl border border-corematrix-green700/15 bg-corematrix-green900/[0.04] p-4">
                {project.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="font-display text-lg font-extrabold text-corematrix-green400">
                      {m.value}
                    </p>
                    <p className="text-xs text-corematrix-textDim">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-corematrix-border bg-corematrix-card2 px-2.5 py-1 font-mono text-[0.65rem] text-corematrix-textMuted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
                >
                  Build Something Similar →
                </Link>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-5 py-2.5 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
                >
                  View Full Case Study
                </Link>
              </div>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}
