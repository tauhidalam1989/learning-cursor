import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';

type Value = { num: string; title: string; body: string };

const VALUES: Value[] = [
  {
    num: '01',
    title: 'Technical Excellence',
    body: 'We hold code, architecture, and delivery to the highest standards. No shortcuts, no technical debt swept under the rug.',
  },
  {
    num: '02',
    title: 'Radical Transparency',
    body: "You'll always know exactly where your project stands. We communicate early, often, and honestly — especially when things get hard.",
  },
  {
    num: '03',
    title: 'Client Obsession',
    body: 'We understand your business deeply enough to challenge your assumptions and build what you actually need, not just what you asked for.',
  },
  {
    num: '04',
    title: 'Continuous Learning',
    body: 'AI moves fast. Every engineer dedicates time each week to learning, experimenting, and bringing frontier ideas to client work.',
  },
  {
    num: '05',
    title: 'Security First',
    body: 'Every system is designed with security baked in from the ground up — not bolted on as an afterthought at the end of the sprint.',
  },
  {
    num: '06',
    title: 'Ownership Mentality',
    body: 'We treat every project as if it\'s our own product — thinking beyond tickets to business outcomes, UX, and long-term scale.',
  },
  {
    num: '07',
    title: 'Scalability by Design',
    body: 'We architect for tomorrow, not just today. Every system ships ready to scale 100x without a painful rewrite in 18 months.',
  },
  {
    num: '08',
    title: 'Inclusive Collaboration',
    body: 'The best ideas come from diverse perspectives. We build inclusive teams and create space for every voice to be heard.',
  },
];

export function CoreValuesSection() {
  return (
    <section
      id="core-values"
      aria-labelledby="core-values-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
      <MarketingSectionHeader
        label="CORE VALUES"
        title="What We Stand For"
        titleId="core-values-heading"
      />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v) => (
          <article
            key={v.num}
            className="reveal flex flex-col gap-3 rounded-2xl border border-corematrix-border bg-corematrix-card p-7 transition-all duration-200 hover:border-corematrix-border2 hover:shadow-[0_0_30px_rgba(34,197,94,0.07)]"
          >
            <span className="font-display text-[2rem] font-extrabold leading-none tracking-tight text-corematrix-textDim">
              {v.num}
            </span>
            <h3 className="font-display text-sm font-bold text-corematrix-green400">{v.title}</h3>
            <p className="text-xs font-light leading-relaxed text-corematrix-textMuted">{v.body}</p>
          </article>
        ))}
      </div>
      </Container>
    </section>
  );
}
