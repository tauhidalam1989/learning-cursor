import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';

type ServiceTestimonial = {
  stars: number;
  serviceTag: string;
  quote: string;
  initials: string;
  name: string;
  role: string;
};

const TESTIMONIALS: ServiceTestimonial[] = [
  {
    stars: 5,
    serviceTag: 'AI Development',
    quote:
      'We needed an AI system that processes thousands of legal contracts per day. Corematrix built something that exceeded every requirement — and delivered two weeks ahead of schedule. The code quality is exceptional.',
    initials: 'JM',
    name: 'James M.',
    role: 'CTO, LegalTech Startup',
  },
  {
    stars: 5,
    serviceTag: 'SaaS Development',
    quote:
      "Corematrix took our product from zero to $1M ARR in nine months. They contributed to product decisions, challenged our assumptions, and built a foundation that's still scaling without issues 18 months later.",
    initials: 'SR',
    name: 'Sophie R.',
    role: 'Founder & CEO, SaaS Co.',
  },
  {
    stars: 5,
    serviceTag: 'Dedicated Team',
    quote:
      "We hired a dedicated Next.js team through Corematrix 14 months ago and can't imagine going back. They integrate completely, think like product owners, and their quality makes our in-house engineers better.",
    initials: 'DK',
    name: 'David K.',
    role: 'VP Engineering, Scale-up',
  },
];

export function ServiceTestimonialsSection() {
  return (
    <section
      id="service-testimonials"
      aria-labelledby="service-testimonials-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label="CLIENT STORIES"
          title="Don't Take Our Word For It"
          titleId="service-testimonials-heading"
          description="Hear from founders and technical leaders who've shipped with us."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="reveal relative overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-8 transition-colors hover:border-corematrix-border2"
            >
              <span
                className="pointer-events-none absolute top-3 left-6 font-serif text-6xl leading-none text-corematrix-green900"
                aria-hidden
              >
                &ldquo;
              </span>
              <div className="mb-3 text-sm tracking-widest text-corematrix-green400">
                {'★'.repeat(t.stars)}
              </div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-corematrix-green700/20 bg-corematrix-green900/20 px-3 py-1 font-mono text-[0.65rem] font-semibold text-corematrix-green700">
                {t.serviceTag}
              </span>
              <p className="relative z-10 mb-5 text-sm italic font-light leading-relaxed text-corematrix-textSecondary">
                {t.quote}
              </p>
              <footer className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-corematrix-green900/40 font-display text-sm font-bold text-corematrix-green400">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-corematrix-textPrimary">{t.name}</p>
                  <p className="text-xs text-corematrix-textMuted">{t.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
