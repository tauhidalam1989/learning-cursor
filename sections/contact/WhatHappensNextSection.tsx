import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';

export type NextStep = {
  num: string;
  icon: string;
  title: string;
  body: string;
  timing: string;
};

const NEXT_STEPS: NextStep[] = [
  {
    num: '01',
    icon: '👀',
    title: 'We Review Your Brief',
    body: 'Our tech lead personally reads every inquiry. We look at your project scope, goals, and current stage before responding — so our reply is actually useful.',
    timing: 'Within a few hours',
  },
  {
    num: '02',
    icon: '📝',
    title: 'Personalised Response',
    body: "You receive a tailored response — not a template. We'll share initial thoughts, ask the right clarifying questions, and suggest a call if there's a strong fit.",
    timing: 'Within 24 hours',
  },
  {
    num: '03',
    icon: '📞',
    title: 'Discovery Call',
    body: 'A free 30-minute call with our tech lead. No pitch deck — just an honest conversation about your problem, your goals, and whether we\'re the right team for you.',
    timing: 'Scheduled same week',
  },
  {
    num: '04',
    icon: '📄',
    title: 'Detailed Proposal',
    body: "If we're a fit: a comprehensive proposal covering scope, tech approach, team composition, timeline, and fixed pricing — all agreed before any work begins.",
    timing: 'Within 48–72 hours',
  },
];

export function WhatHappensNextSection() {
  return (
    <section
      id="what-happens-next"
      aria-labelledby="what-happens-next-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label="AFTER YOU SEND"
          title="What Happens After You Reach Out"
          titleId="what-happens-next-heading"
          description="Transparent process from first message to signed proposal."
        />

        <div className="mt-14 grid grid-cols-1 divide-x divide-corematrix-border overflow-hidden rounded-2xl border border-corematrix-border sm:grid-cols-2 lg:grid-cols-4">
          {NEXT_STEPS.map((s) => (
            <div
              key={s.num}
              className="bg-corematrix-card p-9 transition-colors hover:bg-corematrix-card2"
            >
              <p className="font-display mb-4 text-[2.5rem] font-extrabold leading-none tracking-[-0.04em] text-corematrix-textDim">
                {s.num}
              </p>
              <span className="mb-3 block text-2xl" aria-hidden>
                {s.icon}
              </span>
              <h3 className="mb-2 font-display text-sm font-bold text-corematrix-textPrimary">
                {s.title}
              </h3>
              <p className="mb-3 text-xs font-light leading-relaxed text-corematrix-textMuted">
                {s.body}
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-corematrix-green700/20 bg-corematrix-green900/20 px-3 py-1 font-display text-[0.65rem] font-semibold text-corematrix-green700">
                {s.timing}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
