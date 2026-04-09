import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { WHY_CARDS } from '@/data/careersData';

export function WhyJoinSection() {
  return (
    <section
      id="why-join"
      aria-labelledby="why-join-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label="WHY COREMATRIX"
          title="Why Engineers Choose to Build Here"
          titleId="why-join-heading"
          description="We've built a culture where great work is the standard — not the exception."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CARDS.map((card) => (
            <div
              key={card.title}
              className="reveal group relative overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-8 transition-all duration-300 card-glow hover:-translate-y-1"
            >
              <div
                className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-corematrix-green700/20 bg-corematrix-green900/40 text-2xl">
                {card.icon}
              </div>
              <h3 className="mb-2 font-display text-base font-extrabold tracking-tight text-corematrix-textPrimary">
                {card.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-corematrix-textMuted">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
