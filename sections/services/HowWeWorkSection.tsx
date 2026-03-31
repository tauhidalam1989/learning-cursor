import { Container } from '@/components/ui/Container';

type ProcessStep = { num: string; title: string; body: string };

const PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'Discovery Sprint',
    body: '2-week deep dive into goals, constraints, users, and technical landscape. Outputs a full spec and delivery roadmap.',
  },
  {
    num: '02',
    title: 'Architecture Design',
    body: 'System design, database schema, API contracts, and UI wireframes — reviewed and approved before build starts.',
  },
  {
    num: '03',
    title: 'Agile Build Sprints',
    body: '2-week sprints with daily standups, Friday demos, and a shared board visible to you at all times.',
  },
  {
    num: '04',
    title: 'AI Integration Layer',
    body: 'AI capabilities woven in at the right stage — LLM features, automation flows, intelligent data pipelines.',
  },
  {
    num: '05',
    title: 'QA & Security Audit',
    body: 'Automated test suite, manual QA, OWASP security scanning, and performance benchmarks before launch.',
  },
  {
    num: '06',
    title: 'Launch & Grow',
    body: 'Zero-downtime deployment, monitoring setup, team handoff documentation, and ongoing support retainer.',
  },
];

export function HowWeWorkSection() {
  return (
    <section
      id="how-we-work"
      aria-labelledby="how-we-work-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <div className="text-center">
          <p className="section-label text-corematrix-green400">HOW WE WORK</p>
          <h2
            id="how-we-work-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            From Discovery to Delivery — A Process You&apos;ll Actually Enjoy
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-corematrix-textSecondary">
            Transparent, agile, and designed for your success. We keep you in the loop at every step.
          </p>
        </div>

        <div className="relative mt-14 grid grid-cols-2 gap-0 sm:grid-cols-3 lg:grid-cols-6">
          <div
            className="absolute left-[calc(100%/12)] right-[calc(100%/12)] top-7 hidden h-px bg-gradient-to-r from-transparent via-corematrix-border2 via-corematrix-green700 to-transparent lg:block"
            aria-hidden
          />
          {PROCESS_STEPS.map((step) => (
            <div key={step.num} className="group flex flex-col items-center px-3 text-center">
              <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-corematrix-border2 bg-corematrix-card2 font-display text-xs font-extrabold text-corematrix-green400 transition-all group-hover:border-corematrix-green500 group-hover:bg-corematrix-green700 group-hover:text-white group-hover:shadow-[0_0_24px_rgba(34,197,94,0.3)]">
                {step.num}
              </div>
              <h3 className="mb-1.5 font-display text-xs font-bold text-corematrix-textPrimary">
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
