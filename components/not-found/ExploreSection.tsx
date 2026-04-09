import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { EXPLORE_CARDS } from '@/data/notFoundData';

export function ExploreSection() {
  return (
    <section
      aria-labelledby="explore-heading"
      className="border-t border-corematrix-border bg-corematrix-bg1 py-20"
    >
      <Container>
        <MarketingSectionHeader
          label="YOU MIGHT BE LOOKING FOR"
          title="Explore What We Do Best"
          titleId="explore-heading"
          description="Find what you need — from AI development to dedicated teams."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORE_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="reveal group relative flex flex-col gap-0 overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-7 transition-all duration-300 card-glow hover:-translate-y-1"
            >
              <div
                className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <span className="mb-4 block text-2xl" aria-hidden>
                {card.icon}
              </span>
              <h3 className="font-display text-base font-bold text-corematrix-textPrimary">
                {card.title}
              </h3>
              <p className="mt-2 flex-1 font-light text-corematrix-textMuted">
                {card.description}
              </p>
              <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-corematrix-green400 transition-all group-hover:gap-2.5">
                {card.linkLabel}
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
