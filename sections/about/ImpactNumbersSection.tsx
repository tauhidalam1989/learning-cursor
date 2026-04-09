import { Container } from '@/components/ui/Container';
import StatCounter from '@/components/shared/StatCounter';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';

type Impact = { count: number; suffix: string; label: string; sub: string };

const IMPACTS: Impact[] = [
  { count: 50, suffix: '+', label: 'Projects Delivered', sub: 'Across 12+ countries' },
  { count: 98, suffix: '%', label: 'Client Retention Rate', sub: 'Industry avg is 67%' },
  { count: 3, suffix: 'x', label: 'Avg ROI for Clients', sub: 'Within 6 months of launch' },
  { count: 60, suffix: '%', label: 'Cost Reduction', sub: 'Via AI automation avg' },
  { count: 30, suffix: '+', label: 'Happy Clients', sub: 'Startups to enterprises' },
  { count: 5, suffix: '+', label: 'Years of Excellence', sub: 'Growing every quarter' },
  { count: 25, suffix: '+', label: 'Engineers On Staff', sub: 'AI, web, mobile, DevOps' },
  { count: 12, suffix: '+', label: 'AI Systems Shipped', sub: 'LLMs, agents, ML models' },
];

export function ImpactNumbersSection() {
  return (
    <section
      id="impact-numbers"
      aria-labelledby="impact-numbers-heading"
      className="relative overflow-hidden border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.06] blur-[140px]"
        aria-hidden
      />

      <Container className="relative z-10">
      <MarketingSectionHeader
        label="IMPACT BY THE NUMBERS"
        title="Results That Speak for Themselves"
        titleId="impact-numbers-heading"
        description="Measurable outcomes from the projects we've delivered across the globe."
      />

      <div className="relative z-10 mt-12 grid grid-cols-2 divide-x divide-y divide-corematrix-border overflow-hidden rounded-2xl border border-corematrix-border lg:grid-cols-4">
        {IMPACTS.map((imp) => (
          <div
            key={imp.label}
            className="flex flex-col items-center bg-corematrix-card p-10 text-center transition-colors hover:bg-corematrix-card2"
          >
            <StatCounter
              count={imp.count}
              suffix={imp.suffix}
              label={imp.label}
              sub={imp.sub}
              labelClassName="text-xs leading-snug text-corematrix-textMuted"
            />
          </div>
        ))}
      </div>
      </Container>
    </section>
  );
}
