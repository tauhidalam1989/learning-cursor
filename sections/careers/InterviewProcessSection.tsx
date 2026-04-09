import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { PROCESS_STEPS } from '@/data/careersData';

export function InterviewProcessSection() {
  return (
    <section
      id="careers-process"
      aria-labelledby="careers-process-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label="HIRING PROCESS"
          title="A Hiring Process That Respects Your Time"
          titleId="careers-process-heading"
          description="No endless rounds. No trick questions. We move fast and give honest feedback."
        />

        <div className="mt-12 overflow-hidden rounded-2xl border border-corematrix-border">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className="grid grid-cols-[72px_1fr] border-b border-corematrix-border last:border-0 transition-colors hover:bg-corematrix-green900/[0.02]"
            >
              <div className="flex items-center justify-center border-r border-corematrix-border bg-corematrix-card2 py-7">
                <span className="font-display text-2xl font-extrabold text-corematrix-textDim">
                  {step.num}
                </span>
              </div>
              <div className="flex items-start gap-4 bg-corematrix-card p-6">
                <span className="mt-0.5 shrink-0 text-2xl" aria-hidden>
                  {step.icon}
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-corematrix-textPrimary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-corematrix-textSecondary">
                    {step.body}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-corematrix-green700/20 bg-corematrix-green900/20 px-3 py-1 font-display text-[0.65rem] font-semibold text-corematrix-green700">
                    ~ {step.timing}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
