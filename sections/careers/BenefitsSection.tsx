import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { BENEFITS } from '@/data/careersData';

export function BenefitsSection() {
  return (
    <section
      id="careers-benefits"
      aria-labelledby="careers-benefits-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label="BENEFITS & PERKS"
          title="Built for People Who Do Serious Work"
          titleId="careers-benefits-heading"
          description="Competitive compensation, real flexibility, and investments in your growth."
        />

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-border sm:grid-cols-4">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="bg-corematrix-card p-8 transition-colors hover:bg-corematrix-card2"
            >
              <span className="mb-4 block text-3xl" aria-hidden>
                {b.icon}
              </span>
              <h3 className="mb-2 font-display text-sm font-bold text-corematrix-textPrimary">
                {b.title}
              </h3>
              <p className="text-xs font-light leading-snug text-corematrix-textMuted">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
