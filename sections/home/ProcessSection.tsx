import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';

const STEPS = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    body: 'We deep-dive into your goals, audit your tech landscape, and define a clear delivery roadmap.',
  },
  {
    num: '02',
    title: 'Architecture & Design',
    body: 'Scalable system architecture and pixel-perfect UIs designed before writing a single line of code.',
  },
  {
    num: '03',
    title: 'Agile Development',
    body: 'Sprint-based development with weekly demos, continuous feedback, and radical transparency.',
  },
  {
    num: '04',
    title: 'AI Integration',
    body: 'We layer AI capabilities — automations, LLM features, intelligent workflows — at exactly the right stage.',
  },
  {
    num: '05',
    title: 'Launch & Scale',
    body: 'We deploy, monitor, optimize, and stay with you as your product and user base grows.',
  },
];

export function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-16 lg:py-24"
    >
      <Container>
        <MarketingSectionHeader
          label="OUR PROCESS"
          title="From Idea to Intelligent Product — Fast"
          titleId="process-heading"
          description="A proven, agile process with complete transparency at every stage."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => {
            const delayClass =
              i === 1
                ? 'reveal-delay-1'
                : i === 2
                  ? 'reveal-delay-2'
                  : i === 3
                    ? 'reveal-delay-3'
                    : i === 4
                      ? 'reveal-delay-4'
                      : '';
            return (
            <article
              key={step.num}
              className={`relative flex flex-col items-center text-center reveal ${delayClass}`}
            >
              {i < STEPS.length - 1 && (
                <div
                  className="absolute left-[55%] right-[-55%] top-7 hidden h-px bg-corematrix-border2 lg:block"
                  aria-hidden
                />
              )}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-corematrix-border2 bg-corematrix-card2 font-display text-lg font-extrabold text-corematrix-green400 transition-all hover:border-corematrix-green500 hover:bg-corematrix-green700 hover:text-white">
                {step.num}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-corematrix-textPrimary sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-corematrix-textSecondary">
                {step.body}
              </p>
            </article>
          );
          })}
        </div>
      </Container>
    </section>
  );
}
