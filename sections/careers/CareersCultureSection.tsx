import { Container } from '@/components/ui/Container';
import { CULTURE_VALUES } from '@/data/careersData';

const PERKS = [
  { icon: '🌍', label: '12 countries' },
  { icon: '💻', label: 'Mac or Linux' },
  { icon: '📚', label: '$1.5k/yr' },
  { icon: '⏰', label: 'Flexible hours' },
  { icon: '🏥', label: 'Health coverage' },
  { icon: '🏖️', label: 'Unlimited PTO' },
] as const;

export function CareersCultureSection() {
  return (
    <section
      id="careers-culture"
      aria-labelledby="careers-culture-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <div>
            <p className="section-label text-corematrix-green400">OUR CULTURE</p>
            <h2
              id="careers-culture-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              A Culture Built Around Doing Great Work
            </h2>
            <p className="mt-6 text-base leading-relaxed text-corematrix-textSecondary">
              We believe the best software comes from teams that have full context, minimal
              bureaucracy, and real ownership. Every engineer participates in architecture
              decisions and sees their work in production within weeks — not quarters.
            </p>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              Our async-first processes mean you can focus on deep work. Documentation is
              thorough. Meetings are purposeful. And when we do sync, it&apos;s to solve real
              problems together.
            </p>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              We hire adults, give them context, and trust them to do great work.
              Accountability without micromanagement.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {CULTURE_VALUES.map((v) => (
                <div
                  key={v.num}
                  className="rounded-xl border border-corematrix-border bg-corematrix-card p-4"
                >
                  <p className="font-display text-xs font-bold text-corematrix-textDim">
                    {v.num}
                  </p>
                  <h3 className="mt-1 font-display text-sm font-bold text-corematrix-textPrimary">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-xs text-corematrix-textMuted">{v.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-9">
            <div
              className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent"
              aria-hidden
            />
            <p className="mb-6 font-display text-[0.68rem] font-bold uppercase tracking-[0.12em] text-corematrix-green400">
              THE TEAM
            </p>
            <div className="mb-6 grid grid-cols-4 gap-2">
              {['AK', 'SR', 'MJ', 'PL'].map((initials) => (
                <div
                  key={initials}
                  className="relative aspect-square overflow-hidden rounded-xl border border-corematrix-border2 bg-gradient-to-br from-corematrix-green900 to-corematrix-card2"
                >
                  {/* TODO: Replace with <Image src={member.avatar} alt={member.name} fill className="object-cover rounded-xl" /> */}
                  <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold text-corematrix-green700">
                    {initials}
                  </span>
                </div>
              ))}
            </div>
            <blockquote className="border-l-4 border-corematrix-green700 pl-4 italic text-corematrix-textSecondary">
              &quot;Engineering decisions are made by engineers here — no committees. The speed at
              which we ship is genuinely rare.&quot;
            </blockquote>
            <cite className="mt-2 block text-sm text-corematrix-textDim">
              — Marcus J., Head of Engineering
            </cite>
            <div className="mt-4 flex flex-wrap gap-2">
              {PERKS.map((p) => (
                <span
                  key={p.label}
                  className="rounded-full border border-corematrix-border bg-corematrix-bg0 px-3 py-1 text-xs text-corematrix-textMuted"
                >
                  {p.icon} {p.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
