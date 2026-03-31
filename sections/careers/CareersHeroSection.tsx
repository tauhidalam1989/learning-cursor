import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { OPEN_ROLES } from '@/data/careersData';

const HERO_BADGES = [
  { icon: '🌍', label: '100% Remote' },
  { icon: '⚡', label: 'Fast Hiring Process' },
  { icon: '🤖', label: 'AI-First Company' },
  { icon: '📈', label: 'Equity Available' },
] as const;

export function CareersHeroSection() {
  const previewRoles = OPEN_ROLES.slice(0, 5);

  return (
    <section
      id="careers-hero"
      aria-labelledby="careers-hero-heading"
      className="relative flex min-h-[86vh] flex-col justify-center overflow-hidden bg-corematrix-bg1 pt-36 pb-24"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.15]"
        aria-hidden
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="careers-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#1a3525"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#careers-grid)" />
        </svg>
      </div>
      <div
        className="pointer-events-none absolute -right-24 -top-44 h-[700px] w-[700px] rounded-full bg-corematrix-green700 opacity-[0.10] blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-[500px] w-[500px] rounded-full bg-corematrix-green700 opacity-[0.05] blur-[120px]"
        aria-hidden
      />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-corematrix-textDim">
            <Link href="/" className="hover:text-corematrix-textMuted">
              Home
            </Link>
            <span aria-hidden>›</span>
            <span className="text-corematrix-green400">Careers</span>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corematrix-green400">
            <span className="h-1.5 w-1.5 rounded-full bg-corematrix-green400 dot-pulse" />
            We&apos;re Hiring
          </div>

          <h1
            id="careers-hero-heading"
            className="font-display text-[clamp(2.2rem,4vw,3.8rem)] font-extrabold leading-[1.06] tracking-tight text-corematrix-textPrimary"
          >
            Build the Future of <span className="not-italic text-corematrix-green400">AI</span> With
            Us
          </h1>

          <p className="mt-6 max-w-[560px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            Join a team of engineers and AI specialists who ship real products. Remote-first,
            transparent, competitive pay, and real ownership from day one.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#open-roles"
              className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              View Open Roles →
            </Link>
            <Link
              href="#open-application"
              className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
            >
              Send Open Application
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {HERO_BADGES.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 rounded-xl border border-corematrix-border bg-corematrix-card px-4 py-2 text-sm font-medium text-corematrix-textSecondary"
              >
                <span aria-hidden>{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
            <div
              className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent"
              aria-hidden
            />
            <p className="mb-6 font-display text-[0.68rem] font-bold uppercase tracking-[0.12em] text-corematrix-green400">
              CURRENTLY OPEN ROLES
            </p>
            <ul className="space-y-3">
              {previewRoles.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-corematrix-border bg-corematrix-card p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{r.icon}</span>
                    <div>
                      <p className="font-display text-sm font-bold text-corematrix-textPrimary">
                        {r.title}
                      </p>
                      <p className="text-xs text-corematrix-textDim">
                        {r.location} · {r.employmentType.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                  {r.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.6rem] font-bold ${
                        r.badge === 'hot'
                          ? 'bg-red-900/20 text-red-400'
                          : 'bg-corematrix-green900/20 text-corematrix-green400'
                      }`}
                    >
                      {r.badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href="#open-roles"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-corematrix-green400 transition hover:gap-3"
            >
              View All {OPEN_ROLES.length} Open Positions →
            </Link>
          </div>

          <div className="absolute -bottom-5 -left-3 float-anim rounded-xl border border-corematrix-border2 bg-corematrix-card px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-corematrix-green400 dot-pulse" />
              <div>
                <p className="font-display text-sm font-bold text-corematrix-textPrimary">
                  25+ engineers worldwide
                </p>
                <p className="text-xs text-corematrix-textDim">
                  Async-first · Outcome-driven
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
