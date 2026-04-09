import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';

export type FitItem = { text: string };

const GOOD_FIT: FitItem[] = [
  {
    text: 'Need AI capabilities built into your product — not bolted on later',
  },
  {
    text: 'Want a long-term technical partner, not a one-off vendor',
  },
  {
    text: 'Value transparency, honest communication, and weekly progress updates',
  },
  {
    text: 'Have a budget of $15k+ for project work or 2-month+ retainer budget',
  },
  {
    text: 'Are building with Next.js, React, Python, or want to migrate to modern stack',
  },
  {
    text: 'Need to scale your engineering team with senior specialists quickly',
  },
];

const BAD_FIT: FitItem[] = [
  {
    text: 'Need .NET/C# development, WordPress themes, or low-code customizations',
  },
  {
    text: 'Want the cheapest possible option without regard for quality or process',
  },
  { text: 'Have a project budget under $5k' },
  {
    text: 'Need someone to just follow a spec without any strategic input',
  },
];

export function RightFitSection() {
  return (
    <section
      id="right-fit"
      aria-labelledby="right-fit-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
          <div className="reveal">
            <MarketingSectionHeader
              align="left"
              descriptionMax="none"
              label="RIGHT FIT?"
              title="Who We Work Best With"
              titleId="right-fit-heading"
              description="We're selective about the projects we take on — not because we're precious, but because we want every engagement to be a genuine success for both sides."
            />
            <Link
              href="/services"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              See All Our Services →
            </Link>
          </div>

          <div className="reveal reveal-delay-2 space-y-5">
            <div className="overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-green900/[0.04]">
              <div className="flex items-start gap-3 border-b border-corematrix-border bg-corematrix-green900/[0.06] p-5">
                <span className="text-2xl" aria-hidden>
                  ✅
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-corematrix-textPrimary">
                    We&apos;re a great fit if you...
                  </h3>
                  <p className="mt-1 text-xs text-corematrix-textMuted">
                    These are the clients we do our best work with
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-5">
                {GOOD_FIT.map((item) => (
                  <div key={item.text} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-corematrix-green400" />
                    <span className="text-sm text-corematrix-textSecondary">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-corematrix-border bg-[rgba(239,68,68,0.04)]">
              <div className="flex items-start gap-3 border-b border-corematrix-border bg-[rgba(239,68,68,0.06)] p-5">
                <span className="text-2xl" aria-hidden>
                  ⚠️
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-corematrix-textPrimary">
                    Probably not a fit if...
                  </h3>
                  <p className="mt-1 text-xs text-corematrix-textMuted">
                    We&apos;re honest so you don&apos;t waste time
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-5">
                {BAD_FIT.map((item) => (
                  <div key={item.text} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-red-400" />
                    <span className="text-sm text-corematrix-textMuted">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
