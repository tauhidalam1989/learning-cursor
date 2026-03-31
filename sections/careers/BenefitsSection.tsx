import { Container } from '@/components/ui/Container';
import { BENEFITS } from '@/data/careersData';

export function BenefitsSection() {
  return (
    <section
      id="careers-benefits"
      aria-labelledby="careers-benefits-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <div className="text-center">
          <p className="section-label text-corematrix-green400">BENEFITS & PERKS</p>
          <h2
            id="careers-benefits-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Built for People Who Do Serious Work
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-corematrix-textSecondary">
            Competitive compensation, real flexibility, and investments in your growth.
          </p>
        </div>

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
