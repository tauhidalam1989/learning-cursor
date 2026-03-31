import Link from 'next/link';
import { Container } from '@/components/ui/Container';

type CaseStudy = {
  category: string;
  emoji: string;
  title: string;
  description: string;
  metrics: { value: string; label: string }[];
};

const CASE_STUDIES: CaseStudy[] = [
  {
    category: 'AI Automation',
    emoji: '🤖',
    title: 'AI Document Processing Platform for a Legal Tech Startup',
    description:
      'Built an end-to-end AI system that processes contracts, extracts key clauses, flags risks, and generates summaries — replacing 8 hours of manual review per document.',
    metrics: [
      { value: '92%', label: 'Time saved' },
      { value: '10k+', label: 'Docs/month' },
      { value: '8 wks', label: 'Delivery' },
    ],
  },
  {
    category: 'SaaS Platform',
    emoji: '☁️',
    title: 'Multi-Tenant SaaS Analytics Platform — 0 to $1M ARR',
    description:
      'Architected and built a complete B2B SaaS analytics platform from scratch, including multi-tenancy, Stripe billing, custom dashboards, and an embedded AI insights engine.',
    metrics: [
      { value: '$1M', label: 'ARR in 9mo' },
      { value: '200+', label: 'Enterprise clients' },
      { value: '14 wks', label: 'To launch' },
    ],
  },
  {
    category: 'Web Application',
    emoji: '💻',
    title: 'Enterprise Internal Tool — Replaced $240k/yr SaaS Subscriptions',
    description:
      'Custom internal operations platform for a 500-person company, replacing three expensive SaaS tools with one unified system tailored to their exact workflows.',
    metrics: [
      { value: '$240k', label: 'Annual savings' },
      { value: '500', label: 'Daily users' },
      { value: '10 wks', label: 'Build time' },
    ],
  },
];

export function CaseStudiesSection() {
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <div className="text-center">
          <p className="section-label text-corematrix-green400">RESULTS WE&apos;VE DELIVERED</p>
          <h2
            id="case-studies-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Real Projects. Measurable Outcomes.
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-corematrix-textSecondary">
            Here&apos;s a snapshot of what we&apos;ve built — and the impact it&apos;s creating.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <article
              key={study.title}
              className="reveal group overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card transition-all duration-300 hover:-translate-y-1 hover:border-corematrix-border2 hover:shadow-[0_0_40px_rgba(34,197,94,0.07)]"
            >
              <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-corematrix-border bg-corematrix-bg0">
                {/* TODO: Replace with <Image src="..." alt="..." fill /> once asset is available */}
                <div className="absolute inset-0 bg-gradient-to-br from-corematrix-green900 to-corematrix-card2 opacity-70" />
                <span className="absolute top-3 left-3 z-10 rounded-full border border-corematrix-green700/30 bg-corematrix-green900/40 px-3 py-1 text-[0.65rem] font-mono font-semibold text-corematrix-green400">
                  {study.category}
                </span>
                <span className="relative z-10 text-5xl" aria-hidden>
                  {study.emoji}
                </span>
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-display text-sm font-bold leading-snug text-corematrix-textPrimary">
                  {study.title}
                </h3>
                <p className="mb-4 text-xs font-light leading-relaxed text-corematrix-textMuted">
                  {study.description}
                </p>
                <div className="mb-4 flex gap-4">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <p className="font-display text-lg font-extrabold leading-none text-corematrix-green400">
                        {m.value}
                      </p>
                      <p className="mt-0.5 text-[0.6rem] text-corematrix-textDim">{m.label}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-corematrix-green400 transition-all hover:gap-3"
                >
                  View case study →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-lg border border-corematrix-border px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition-all hover:border-corematrix-green400/30 hover:text-corematrix-green400"
          >
            View Full Portfolio →
          </Link>
        </div>
      </Container>
    </section>
  );
}
