import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';

export type ContactMethod = { icon: string; title: string; value: string };

const RESPONSE_BADGES = [
  { icon: '⚡', value: '24h', label: 'response time' },
  { icon: '🌍', value: 'Global', label: 'availability' },
  { icon: '🔒', value: 'NDA', label: 'signed upfront' },
  { icon: '🆓', value: 'Free', label: 'discovery call' },
] as const;

const CONTACT_METHODS: ContactMethod[] = [
  { icon: '📧', title: 'Email Us', value: siteConfig.email },
  { icon: '📞', title: 'Call or WhatsApp', value: siteConfig.phone },
  { icon: '💼', title: 'LinkedIn', value: siteConfig.linkedinDisplay },
  { icon: '🐙', title: 'GitHub', value: siteConfig.githubDisplay },
];

export function ContactHeroSection() {
  return (
    <section
      id="contact-hero"
      aria-labelledby="contact-hero-heading"
      className="relative flex min-h-[72vh] items-center overflow-hidden bg-corematrix-bg1 pt-36 pb-20"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.15]"
        aria-hidden
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a3525" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>
      <div
        className="pointer-events-none absolute -right-24 -top-48 h-[700px] w-[700px] rounded-full bg-corematrix-green700 opacity-[0.11] blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-corematrix-green700 opacity-[0.05] blur-[120px]"
        aria-hidden
      />

      <Container className="relative z-10 grid w-full grid-cols-1 items-center gap-20 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-corematrix-textDim">
            <Link href="/" className="hover:text-corematrix-textMuted">
              Home
            </Link>
            <span aria-hidden>›</span>
            <span className="text-corematrix-green400">Contact Us</span>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corematrix-green400">
            <span className="h-1.5 w-1.5 rounded-full bg-corematrix-green400 dot-pulse" />
            We Respond Within 24 Hours
          </div>

          <h1
            id="contact-hero-heading"
            className="font-display text-[clamp(2.5rem,4.5vw,4rem)] font-extrabold leading-[1.06] tracking-tight text-corematrix-textPrimary"
          >
            Let&apos;s Build Something
            <br />
            <span className="not-italic text-corematrix-green400">Extraordinary</span> Together
          </h1>

          <p className="mt-6 max-w-[560px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            Have a project in mind? A problem to solve? Or just want to explore whether we&apos;d be
            a good fit? We&apos;d love to hear from you. No sales pitch — just a real technical
            conversation.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {RESPONSE_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 rounded-xl border border-corematrix-border bg-corematrix-card px-4 py-2 text-sm"
              >
                <span aria-hidden>{badge.icon}</span>
                <span className="font-bold text-corematrix-green400">{badge.value}</span>
                <span className="text-corematrix-textMuted">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-9 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
            <div
              className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent"
              aria-hidden
            />
            <p className="mb-6 font-display text-[0.68rem] font-bold uppercase tracking-[0.12em] text-corematrix-green400">
              REACH US DIRECTLY
            </p>
            <div className="space-y-3">
              {CONTACT_METHODS.map((method) => (
                <div
                  key={method.title}
                  className="flex cursor-default items-center gap-4 rounded-xl border border-corematrix-border bg-corematrix-card p-4 transition-all hover:translate-x-1 hover:border-corematrix-border2"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-corematrix-green700/20 bg-corematrix-green900/40 text-base">
                    {method.icon}
                  </div>
                  <div>
                    <p className="font-display text-xs font-bold text-corematrix-textPrimary">
                      {method.title}
                    </p>
                    <p className="mt-0.5 text-xs font-light text-corematrix-textMuted">
                      {method.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-5 right-4 float-anim rounded-xl border border-corematrix-border2 bg-corematrix-card px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-corematrix-green400 dot-pulse" />
              <div>
                <p className="font-display text-sm font-bold text-corematrix-textPrimary">
                  Currently accepting new projects
                </p>
                <p className="text-xs text-corematrix-textDim">
                  Next availability: This week
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
