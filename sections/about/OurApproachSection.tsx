import { Container } from '@/components/ui/Container';

type Step = { num: string; title: string; body: string };

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Understand Before Everything',
    body: 'We invest heavily in discovery — understanding your industry, users, competitors, and constraints before recommending or designing anything.',
  },
  {
    num: '02',
    title: 'Design for Scale, Not Just MVP',
    body: 'We architect systems that can scale 100x without being rebuilt. Your MVP will be lean, but its foundations will be enterprise-grade.',
  },
  {
    num: '03',
    title: 'AI as a Layer, Not an Add-On',
    body: "We don't bolt AI onto finished products. We weave intelligent capabilities into the architecture from the start.",
  },
  {
    num: '04',
    title: 'Ship, Learn, Improve — Repeat',
    body: 'We believe in continuous delivery. Working software in your hands every two weeks with feedback cycles built directly into our process.',
  },
  {
    num: '05',
    title: 'Measure What Matters',
    body: 'Every project ends with measurable outcomes — performance benchmarks, user metrics, and business KPIs tracked against what we promised.',
  },
];

const TAGS = [
  'Clean Architecture',
  'TDD',
  'CI/CD',
  'Observability',
  '12-Factor Apps',
  'Zero-Downtime Deploy',
  'Security by Design',
  'API-First',
  'RAG Pipelines',
  'Serverless',
  'Event-Driven',
  'DDD',
];

export function OurApproachSection() {
  return (
    <section
      id="our-approach"
      aria-labelledby="our-approach-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
      <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
        <div>
          <p className="section-label text-corematrix-green400">OUR APPROACH</p>
          <h2
            id="our-approach-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            How We Think Before We Build
          </h2>
          <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
            Our process isn&apos;t just a checklist — it&apos;s a philosophy rooted in deep collaboration
            and technical rigor.
          </p>

          <div className="mt-8">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="group flex gap-5 border-b border-corematrix-border py-6 last:border-0 reveal"
              >
                <div className="flex flex-shrink-0 flex-col items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-corematrix-border2 bg-corematrix-card2 font-display text-xs font-extrabold text-corematrix-green400 transition-all group-hover:border-corematrix-green500 group-hover:bg-corematrix-green700 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    {step.num}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="mt-1 h-8 w-px bg-corematrix-border" aria-hidden />
                  )}
                </div>
                <div className="pb-2">
                  <h3 className="font-display font-semibold text-corematrix-textPrimary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-corematrix-textSecondary">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <article className="reveal reveal-delay-2 rounded-2xl border border-corematrix-border bg-corematrix-card p-9 lg:sticky lg:top-24">
          <h3 className="font-display text-xl font-bold text-corematrix-textPrimary">
            Engineering Philosophy
          </h3>
          <p className="mt-4 font-light text-corematrix-textMuted">
            We build systems that last. Our philosophy centers on clean architecture, test-driven
            development, and a relentless focus on observability and maintainability.
          </p>
          <p className="mt-3 font-light text-corematrix-textMuted">
            Every decision — from technology choice to deployment strategy — is made with scale,
            security, and developer experience in mind.
          </p>
          <p className="mt-3 font-light text-corematrix-textMuted">
            We embrace modern practices like 12-factor apps, API-first design, and event-driven
            architectures to deliver software that grows with your business.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-corematrix-green700/20 bg-corematrix-green900/20 px-3 py-1 font-mono text-xs font-semibold text-corematrix-green700"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      </div>
      </Container>
    </section>
  );
}
