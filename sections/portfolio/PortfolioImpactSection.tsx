import { Container } from '@/components/ui/Container';
import StatCounter from '@/components/shared/StatCounter';
import { IMPACT_STATS } from '@/data/portfolioData';

export function PortfolioImpactSection() {
  return (
    <section
      aria-labelledby="impact-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <div className="text-center">
          <p className="section-label text-corematrix-green400">MEASURABLE IMPACT</p>
          <h2
            id="impact-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Outcomes That Actually Matter
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-corematrix-textSecondary">
            Real numbers from real projects — client retention, cost reduction, and ROI.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-border lg:grid-cols-4">
          {IMPACT_STATS.map((stat) => (
            <div
              key={stat.label}
              className="group relative flex flex-col items-center bg-corematrix-card p-10 text-center transition-colors hover:bg-corematrix-card2"
            >
              <div
                className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <StatCounter
                count={stat.count}
                suffix={stat.suffix}
                label={stat.label}
                sub={stat.sub}
                labelClassName="font-display text-sm font-bold text-corematrix-textPrimary"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
