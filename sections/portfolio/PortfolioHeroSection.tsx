'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { useCountUp } from '@/hooks/useCountUp';
import { IMPACT_STATS } from '@/data/portfolioData';

const HERO_STATS = IMPACT_STATS.slice(0, 4);

export function PortfolioHeroSection() {
  return (
    <section
      aria-labelledby="portfolio-hero-heading"
      className="relative flex min-h-[68vh] flex-col justify-center overflow-hidden bg-corematrix-bg1 pt-36 pb-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        aria-hidden
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="portfolio-grid"
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
          <rect width="100%" height="100%" fill="url(#portfolio-grid)" />
        </svg>
      </div>
      <div
        className="pointer-events-none absolute -right-24 -top-44 h-[600px] w-[600px] rounded-full bg-corematrix-green700 opacity-[0.10] blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-[500px] w-[500px] rounded-full bg-corematrix-green700 opacity-[0.05] blur-[120px]"
        aria-hidden
      />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
        <div>
          <div className="mb-5 flex items-center gap-2 text-xs font-medium text-corematrix-textDim">
            <Link href="/" className="hover:text-corematrix-textMuted">
              Home
            </Link>
            <span aria-hidden>›</span>
            <span className="text-corematrix-green400">Portfolio</span>
          </div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corematrix-green400">
            <span className="h-1.5 w-1.5 rounded-full bg-corematrix-green400 dot-pulse" />
            Real Work. Real Results.
          </div>
          <h1
            id="portfolio-hero-heading"
            className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.06] tracking-tight text-corematrix-textPrimary"
          >
            Projects That Prove What <span className="not-italic text-corematrix-green400">We Ship</span>
          </h1>
          <p className="mt-6 max-w-[600px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            50+ projects delivered across AI development, SaaS platforms, web applications, and
            enterprise systems. Every project here is production software used by real users — not
            mockups or demos.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              Browse All Projects →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
            >
              Start Your Project
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {HERO_STATS.map((stat) => (
            <ImpactStatCell key={stat.label} stat={stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ImpactStatCell({ stat }: { stat: (typeof IMPACT_STATS)[0] }) {
  const ref = useCountUp(stat.count, stat.suffix);
  return (
    <div className="rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-5 text-center transition-all hover:scale-[1.02] hover:border-corematrix-green400/20">
      <span
        ref={ref}
        className="block font-display text-3xl font-extrabold leading-none tracking-tight text-corematrix-green400"
      />
      <p className="mt-2 text-sm font-semibold text-corematrix-textPrimary">{stat.label}</p>
      <p className="mt-0.5 text-xs text-corematrix-textDim">{stat.sub}</p>
    </div>
  );
}
