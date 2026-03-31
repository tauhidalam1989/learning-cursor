import { Container } from '@/components/ui/Container';

type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Corematrix built our AI-powered platform from scratch. They challenged our thinking and delivered something beyond what we imagined.',
    initials: 'AK',
    name: 'Arjun K.',
    role: 'CTO, SaaS Startup',
  },
  {
    quote:
      "Their dedicated team became a seamless extension of our engineering org. Fast, communicative, technically excellent. Extended the contract three times.",
    initials: 'SR',
    name: 'Sarah R.',
    role: 'VP Engineering, Enterprise Co.',
  },
  {
    quote:
      'We needed an AI automation system in 8 weeks. They delivered in 6. The ROI in the first month was undeniable.',
    initials: 'MJ',
    name: 'Michael J.',
    role: 'Founder, Tech Company',
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-16 lg:py-24"
    >
      <Container>
        <div className="text-center">
          <p className="section-label text-corematrix-green400">CLIENT STORIES</p>
          <h2
            id="testimonials-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-corematrix-textSecondary">
            Trusted by startups, scale-ups, and enterprise teams worldwide.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.name}
              className="reveal relative overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-8 transition-colors hover:border-corematrix-border2"
            >
              <span
                className="absolute left-6 top-3 font-serif text-6xl leading-none text-corematrix-green900"
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="mb-4 text-corematrix-green400" aria-hidden>
                ★★★★★
              </p>
              <p className="relative z-10 text-sm italic leading-relaxed text-corematrix-textSecondary">
                {t.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-corematrix-green900/40 text-sm font-semibold text-corematrix-green400">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-corematrix-textPrimary">{t.name}</p>
                  <p className="text-sm text-corematrix-textMuted">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
