import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { TESTIMONIALS } from '@/data/portfolioData';

export function PortfolioTestimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label="CLIENT FEEDBACK"
          title="What Clients Say About the Work We Delivered"
          titleId="testimonials-heading"
          description="Real quotes from real projects — no stock testimonials."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="reveal relative overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-8 transition-colors hover:border-corematrix-border2"
            >
              <span
                className="pointer-events-none absolute top-3 left-6 text-6xl leading-none text-corematrix-green900"
                aria-hidden
              >
                &ldquo;
              </span>
              <div className="mb-4 flex gap-1 text-corematrix-green400" aria-hidden>
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="mb-4 inline-flex rounded-full border border-corematrix-border bg-corematrix-card2 px-2.5 py-0.5 font-mono text-[0.65rem] text-corematrix-textDim">
                {t.projectBadge}
              </span>
              <p className="relative z-10 mb-6 font-light italic leading-relaxed text-corematrix-textSecondary">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-corematrix-green900 to-corematrix-card2 font-display text-sm font-bold text-corematrix-green700">
                  {t.initials}
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-corematrix-textPrimary">
                    {t.name}
                  </p>
                  <p className="text-xs text-corematrix-textDim">{t.role}</p>
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
