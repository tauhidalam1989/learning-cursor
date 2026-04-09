import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';

type MvvCard = { icon: string; title: string; body: string };

const MVV_CARDS: MvvCard[] = [
  {
    icon: '🎯',
    title: 'Our Mission',
    body: 'To design, build, and deploy intelligent digital solutions that create tangible, measurable business value — empowering startups and enterprises to compete in an AI-driven world.',
  },
  {
    icon: '🔭',
    title: 'Our Vision',
    body: "To be the world's most trusted AI-first engineering partner — where technical excellence meets strategic thinking, and every solution we ship drives real transformation.",
  },
  {
    icon: '💡',
    title: 'Our Purpose',
    body: "Technology for its own sake solves nothing. We exist to bridge the gap between cutting-edge AI capability and the business problems that actually matter to real people.",
  },
];

export function MissionVisionSection() {
  return (
    <section
      id="mission-vision"
      aria-labelledby="mission-vision-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
      <MarketingSectionHeader
        label="WHAT DRIVES US"
        title="Mission, Vision & Purpose"
        titleId="mission-vision-heading"
        description="Three pillars that guide every decision we make — from how we hire to how we build."
      />

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {MVV_CARDS.map((card) => (
          <article
            key={card.title}
            className="group relative overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-8 transition-all duration-300 card-glow hover:-translate-y-1 reveal"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[14px] border border-corematrix-green700/20 bg-corematrix-green900/40 text-2xl">
              {card.icon}
            </div>
            <h3 className="font-display text-lg font-semibold text-corematrix-textPrimary">
              {card.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-corematrix-textSecondary">
              {card.body}
            </p>
          </article>
        ))}
      </div>
      </Container>
    </section>
  );
}
