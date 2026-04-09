'use client';

import { Container } from '@/components/ui/Container';
import { useCountUp } from '@/hooks/useCountUp';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';

const FEATURES = [
  {
    title: 'AI-First Engineering',
    body: 'Every project built with intelligent capabilities in mind from day one.',
  },
  {
    title: "Next.js & Modern Stack",
    body: "We use the same tech stack the world's best products run on — Next.js, TypeScript, Python.",
  },
  {
    title: 'Business-Outcome Focused',
    body: 'We measure success by your growth metrics, not just code delivery milestones.',
  },
  {
    title: 'Transparent & Agile',
    body: 'Weekly sprint demos, shared dashboards, no black-box development ever.',
  },
  {
    title: 'End-to-End Delivery',
    body: 'Strategy → Design → Development → Launch → Ongoing Support. We own it all.',
  },
];

const STATS = [
  { count: 50, suffix: '+', label: 'Projects\nDelivered' },
  { count: 30, suffix: '+', label: 'Happy Clients\nWorldwide' },
  { count: 5, suffix: '+', label: 'Years of\nExcellence' },
  { count: 98, suffix: '%', label: 'Client\nRetention Rate' },
];

export function WhyCorematrixSection() {
  const ref50 = useCountUp(50, '+');
  const ref30 = useCountUp(30, '+');
  const ref5 = useCountUp(5, '+');
  const ref98 = useCountUp(98, '%');

  const refs = [ref50, ref30, ref5, ref98];

  return (
    <section
      id="why-corematrix"
      aria-labelledby="why-corematrix-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-16 lg:py-24"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="reveal">
            <MarketingSectionHeader
              align="left"
              descriptionMax="none"
              label="WHY COREMATRIX"
              title="Your Trusted Long-Term Tech Partner"
              titleId="why-corematrix-heading"
              description="We're more than a service provider — we're your technical co-founder for the long haul."
            />
            <div className="mt-8 space-y-6">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-corematrix-green700/30"
                    aria-hidden
                  >
                    <svg
                      className="h-3.5 w-3.5 text-corematrix-green400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-corematrix-textPrimary">
                      {f.title}
                    </h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-corematrix-textSecondary">
                      {f.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="grid grid-cols-2 gap-8 rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-10">
              {STATS.map((stat, i) => (
                <div key={stat.label}>
                  <span
                    ref={refs[i]}
                    className="block text-5xl font-extrabold tracking-tight text-corematrix-green400"
                  />
                  <p className="mt-2 whitespace-pre-line text-sm leading-snug text-corematrix-textMuted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
