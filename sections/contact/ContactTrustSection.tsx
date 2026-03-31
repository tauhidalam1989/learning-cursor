import { Container } from '@/components/ui/Container';
import StatCounter from '@/components/shared/StatCounter';

export type TrustStat = {
  count: number;
  suffix: string;
  label: string;
  sub: string;
};

const TRUST_STATS: TrustStat[] = [
  {
    count: 50,
    suffix: '+',
    label: 'Projects Delivered',
    sub: 'Across 12+ countries',
  },
  { count: 98, suffix: '%', label: 'Client Retention', sub: 'They keep coming back' },
  {
    count: 24,
    suffix: 'h',
    label: 'Response Time',
    sub: 'Max on business days',
  },
  { count: 5, suffix: '+', label: 'Years Building', sub: 'AI-first since 2022' },
];

export function ContactTrustSection() {
  return (
    <section
      id="contact-trust"
      aria-labelledby="contact-trust-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <div className="text-center">
          <p className="section-label text-corematrix-green400">WHY TRUST US</p>
          <h2
            id="contact-trust-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Numbers That Speak For Themselves
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-corematrix-textSecondary">
            Trust built through consistent delivery and client success.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-border lg:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center bg-corematrix-card p-10 text-center transition-colors hover:bg-corematrix-card2"
            >
              <StatCounter
                count={stat.count}
                suffix={stat.suffix}
                label={stat.label}
                sub={stat.sub}
                labelClassName="text-sm text-corematrix-textMuted"
                subClassName="mt-1 text-xs text-corematrix-textDim"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
