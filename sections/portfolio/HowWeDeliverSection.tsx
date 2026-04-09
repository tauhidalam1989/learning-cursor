import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { DELIVERY_STEPS } from '@/data/portfolioData';

export function HowWeDeliverSection() {
  return (
    <section
      aria-labelledby="delivery-heading"
      className="relative border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label="OUR PROCESS"
          title="How Every Project in This Portfolio Was Built"
          titleId="delivery-heading"
          description="Consistent process. Predictable outcomes. No surprises."
        />
        <div className="relative mt-14 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute top-7 left-[calc(100%/8)] right-[calc(100%/8)] hidden h-px bg-gradient-to-r from-transparent via-corematrix-border2 to-transparent lg:block"
            aria-hidden
          />
          {DELIVERY_STEPS.map((step) => (
            <div
              key={step.num}
              className="group flex flex-col items-center px-4 text-center"
            >
              <div className="relative z-10 mb-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-corematrix-border2 bg-corematrix-card2 font-display text-xs font-extrabold text-corematrix-green400 transition-all group-hover:border-corematrix-green500 group-hover:bg-corematrix-green700 group-hover:text-white group-hover:shadow-[0_0_24px_rgba(34,197,94,0.3)]">
                {step.num}
              </div>
              <h3 className="mb-2 font-display text-xs font-bold text-corematrix-textPrimary">
                {step.title}
              </h3>
              <p className="text-[0.72rem] font-light leading-snug text-corematrix-textMuted">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
