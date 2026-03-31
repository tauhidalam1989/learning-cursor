import { Container } from '@/components/ui/Container';

type Pillar = {
  icon: string;
  title: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    icon: '🎯',
    title: 'Outcome-Driven',
    body: 'We measure success by your metrics — revenue, retention, efficiency — not just shipped features.',
  },
  {
    icon: '🤝',
    title: 'Long-Term Partner',
    body: 'We embed into your team and think like co-founders. Average client relationship: 2+ years.',
  },
  {
    icon: '⚡',
    title: 'Fast Without Cutting Corners',
    body: 'Agile sprints, weekly demos, and a bias for shipping — but never at the cost of quality or security.',
  },
];

type Milestone = { year: string; title: string; body: string; active?: boolean };

const MILESTONES: Milestone[] = [
  {
    year: '2019',
    title: 'Founded',
    body: 'Started as a small web dev studio with 3 engineers and a bold vision.',
  },
  {
    year: '2020',
    title: 'First Enterprise Deal',
    body: 'Landed first enterprise SaaS contract. Grew to 10 engineers.',
  },
  {
    year: '2022',
    title: 'AI Division Launched',
    body: 'Dedicated AI/ML team formed. First LLM product shipped to production.',
  },
  {
    year: '2023',
    title: 'Went Global',
    body: 'Clients across 12 countries. Opened dedicated team model.',
  },
  {
    year: '2024',
    title: '50+ Projects',
    body: 'Crossed 50 delivered projects. 98% client retention.',
  },
  {
    year: '2025→',
    title: 'Next Chapter',
    body: 'Scaling AI products. Building proprietary enterprise AI frameworks.',
    active: true,
  },
];

export function WhoWeAreSection() {
  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
      <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
        <div>
          <p className="section-label text-corematrix-green400">WHO WE ARE</p>
          <h2
            id="who-we-are-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            A Team of Builders, Not Just Consultants
          </h2>

          <p className="mt-6 font-light leading-[1.8] text-corematrix-textMuted">
            Corematrix is a results-driven IT services and consulting company specializing in
            innovative, scalable, and business-focused digital solutions. We were founded on a simple
            belief: great technology should create measurable business outcomes, not just impressive
            demos.
          </p>
          <p className="mt-4 font-light leading-[1.8] text-corematrix-textMuted">
            We&apos;re not a generic agency. We&apos;re a technical partner — a team of engineers, AI
            researchers, product designers, and strategists who get deeply invested in what
            you&apos;re building and stay until it succeeds.
          </p>
          <p className="mt-4 font-light leading-[1.8] text-corematrix-textMuted">
            From AI product development and LLM integrations to full-stack web apps, mobile platforms,
            and enterprise SaaS — we operate across the full spectrum of modern software engineering.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {PILLARS.map((p) => (
              <article
                key={p.title}
                className="reveal flex items-start gap-4 rounded-xl border border-corematrix-border bg-corematrix-card p-5 transition-all duration-200 hover:translate-x-1 hover:border-corematrix-border2"
              >
                <span className="text-2xl" aria-hidden>
                  {p.icon}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-corematrix-textPrimary">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-corematrix-textSecondary">
                    {p.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <article className="reveal reveal-delay-2 relative overflow-hidden rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-9 lg:sticky lg:top-24">
          <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent" />
          <p className="section-label text-corematrix-green400">OUR JOURNEY</p>
          <div className="mt-6">
            {MILESTONES.map((m) => (
              <div
                key={m.year}
                className="flex gap-4 border-b border-corematrix-border py-3.5 last:border-0"
              >
                <span className="mt-0.5 w-12 flex-shrink-0 font-display text-xs font-bold text-corematrix-green400">
                  {m.year}
                </span>
                <div
                  className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${
                    m.active
                      ? 'bg-corematrix-green400 shadow-[0_0_12px_rgba(74,222,128,0.6)]'
                      : 'bg-corematrix-green700'
                  }`}
                  aria-hidden
                />
                <div>
                  <h4 className="text-sm font-bold text-corematrix-textPrimary">{m.title}</h4>
                  <p className="mt-0.5 text-xs font-light leading-snug text-corematrix-textMuted">
                    {m.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
      </Container>
    </section>
  );
}
