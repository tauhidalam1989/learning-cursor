import { Container } from '@/components/ui/Container';
import { INDUSTRIES } from '@/data/portfolioData';

export function IndustriesServedSection() {
  return (
    <section
      aria-labelledby="industries-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <div className="text-center">
          <p className="section-label text-corematrix-green400">
            INDUSTRIES WE&apos;VE SERVED
          </p>
          <h2
            id="industries-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            We&apos;ve Built Software Across Every Major Sector
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-corematrix-textSecondary">
            From healthcare to logistics — we understand sector-specific requirements.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-border sm:grid-cols-4">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.name}
              className="cursor-default bg-corematrix-card p-7 transition-colors hover:bg-corematrix-card2"
            >
              <span className="mb-3 block text-3xl" aria-hidden>
                {ind.icon}
              </span>
              <h3 className="mb-1 font-display text-sm font-bold text-corematrix-textPrimary">
                {ind.name}
              </h3>
              <p className="text-xs font-light leading-snug text-corematrix-textMuted">
                {ind.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
