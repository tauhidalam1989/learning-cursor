import { Container } from '@/components/ui/Container';
import StatCounter from '@/components/shared/StatCounter';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { IMPACT_STATS } from '@/data/portfolioData';

export function PortfolioImpactSection() {
  return (
    <section
      aria-labelledby="impact-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label="MEASURABLE IMPACT"
          title="Outcomes That Actually Matter"
          titleId="impact-heading"
          description="Real numbers from real projects — client retention, cost reduction, and ROI."
        />
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
