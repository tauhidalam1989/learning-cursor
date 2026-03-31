import Link from 'next/link';
import { Container } from '@/components/ui/Container';

type CultureItem = { icon: string; title: string; body: string };

const CULTURE_ITEMS: CultureItem[] = [
  {
    icon: '🧠',
    title: 'Learning Budget',
    body: 'Every engineer gets a personal learning budget for courses, conferences, and experiments.',
  },
  {
    icon: '🌍',
    title: 'Remote-First',
    body: 'Fully remote with async-first communication. Work from anywhere, overlap where it matters.',
  },
  {
    icon: '🚀',
    title: 'Ownership Culture',
    body: 'Engineers own features end to end — from architecture decisions to production monitoring.',
  },
  {
    icon: '📊',
    title: 'Transparent by Default',
    body: 'Company metrics, client feedback, and engineering decisions are shared openly across the team.',
  },
];

export function CultureSection() {
  return (
    <section
      id="culture"
      aria-labelledby="culture-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
      <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
        <div>
          <p className="section-label text-corematrix-green400">CULTURE & TEAM</p>
          <h2
            id="culture-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Where Great Engineers Do Their Best Work
          </h2>
          <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
            We&apos;ve built a culture where curiosity is rewarded, ownership is expected, and every
            team member has the context to make great decisions.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {CULTURE_ITEMS.map((item) => (
              <article
                key={item.title}
                className="reveal rounded-2xl border border-corematrix-border bg-corematrix-card p-6 transition-all hover:-translate-y-0.5 hover:border-corematrix-border2"
              >
                <span className="text-2xl" aria-hidden>
                  {item.icon}
                </span>
                <h3 className="mt-3 font-display font-semibold text-corematrix-textPrimary">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-corematrix-textSecondary">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <article className="reveal reveal-delay-2 rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-10 lg:sticky lg:top-24">
          <h3 className="font-display text-2xl font-extrabold leading-snug text-corematrix-textPrimary">
            We&apos;re Building Something Worth Joining
          </h3>
          <p className="mt-4 font-light leading-relaxed text-corematrix-textMuted">
            Our team grows when we find people who share our values — technical excellence, radical
            transparency, and a genuine desire to build software that matters.
          </p>
          <p className="mt-3 font-light leading-relaxed text-corematrix-textMuted">
            We offer competitive compensation, meaningful equity for early joiners, flexible hours,
            and a learning budget that actually gets used.
          </p>
          <p className="mt-3 font-light leading-relaxed text-corematrix-textMuted">
            If you&apos;re an engineer, designer, or product thinker who wants to work on hard
            problems with a team that cares — we&apos;d love to hear from you.
          </p>
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-corematrix-green400/20 bg-corematrix-green900/20 p-4">
            <span
              className="h-2 w-2 flex-shrink-0 rounded-full bg-corematrix-green400 dot-pulse"
              aria-hidden
            />
            <span className="text-sm text-corematrix-textSecondary">
              We&apos;re actively hiring —{' '}
              <Link
                href="/careers"
                className="font-semibold text-corematrix-green400 hover:underline"
              >
                View open roles →
              </Link>
            </span>
          </div>
        </article>
      </div>
      </Container>
    </section>
  );
}
