import Link from 'next/link';
import { Container } from '@/components/ui/Container';

type EngagementModel = {
  icon: string;
  title: string;
  tagline: string;
  description: string;
  items: string[];
  cta: string;
  ctaStyle: 'primary' | 'ghost';
  featured?: boolean;
};

const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    icon: '🎯',
    title: 'Fixed-Scope Project',
    tagline: 'Defined budget. Defined timeline. No surprises.',
    description:
      'Best for well-defined products with clear requirements. We agree on scope, timeline, and cost upfront — then deliver. Perfect for MVPs, redesigns, and specific feature builds.',
    items: [
      'Fixed price agreed at kickoff',
      'Milestone-based payment schedule',
      'Change request process built in',
      'Full code ownership at project close',
    ],
    cta: 'Get a fixed quote →',
    ctaStyle: 'ghost',
  },
  {
    icon: '🔄',
    title: 'Retainer / Time & Materials',
    tagline: 'Maximum flexibility. Continuous delivery.',
    description:
      'Best for evolving products that need ongoing development and a long-term technical partner. Monthly retainer with a dedicated team, sprint planning, and unlimited scope flexibility.',
    items: [
      'Dedicated team, fixed monthly rate',
      'Weekly sprint demos and planning',
      'Adjust scope and priorities anytime',
      'Scale team up or down monthly',
      'Strategic advisory included',
    ],
    cta: 'Start a retainer →',
    ctaStyle: 'primary',
    featured: true,
  },
  {
    icon: '👥',
    title: 'Dedicated Team Extension',
    tagline: 'Your team. Our engineers. One mission.',
    description:
      'Best for companies needing to scale their in-house team with senior specialists. Engineers embed directly into your workflows, tools, and culture — indistinguishable from in-house hires.',
    items: [
      'Pre-vetted senior engineers only',
      '1-week onboarding, then fully embedded',
      'Report to your PM / tech lead',
      'Flexible 1-month+ contracts',
    ],
    cta: 'Hire your team →',
    ctaStyle: 'ghost',
  },
];

export function EngagementModelsSection() {
  return (
    <section
      id="engagement-models"
      aria-labelledby="engagement-models-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <div className="text-center">
          <p className="section-label text-corematrix-green400">ENGAGEMENT MODELS</p>
          <h2
            id="engagement-models-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Work With Us the Way That Fits Your Business
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-corematrix-textSecondary">
            Fixed scope, flexible retainer, or dedicated team — choose what works for your stage and
            goals.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {ENGAGEMENT_MODELS.map((model) => (
            <div
              key={model.title}
              className={`reveal relative overflow-hidden rounded-2xl border p-9 transition-all duration-300 hover:-translate-y-1 ${
                model.featured
                  ? 'border-corematrix-border2 bg-corematrix-card2 shadow-[0_0_60px_rgba(34,197,94,0.08)]'
                  : 'border-corematrix-border bg-corematrix-card'
              }`}
            >
              {model.featured && (
                <>
                  <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent" />
                  <span className="absolute top-4 right-4 rounded-full bg-corematrix-green900/40 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-corematrix-green400">
                    Most Popular
                  </span>
                </>
              )}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-corematrix-green700/20 bg-corematrix-green900/40 text-2xl">
                {model.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-corematrix-textPrimary">
                {model.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-corematrix-green400">{model.tagline}</p>
              <p className="mt-4 text-sm font-light leading-relaxed text-corematrix-textMuted">
                {model.description}
              </p>
              <ul className="mt-6 space-y-3">
                {model.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-corematrix-green400" />
                    <span className="text-sm text-corematrix-textSecondary">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-all ${
                  model.ctaStyle === 'primary'
                    ? 'rounded-lg bg-corematrix-green700 px-5 py-2.5 text-white hover:bg-corematrix-green500'
                    : 'text-corematrix-green400 hover:gap-3 hover:text-corematrix-green300'
                }`}
              >
                {model.cta}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
