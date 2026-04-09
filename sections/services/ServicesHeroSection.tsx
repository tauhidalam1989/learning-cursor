'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';

type ServiceTile = { icon: string; title: string; tag: string; href?: string };

const SERVICE_TILES: ServiceTile[] = [
  { icon: '🧠', title: 'AI Development', tag: 'LLMs · Agents · ML' },
  { icon: '💻', title: 'Web Applications', tag: 'Next.js · React · Node' },
  { icon: '📱', title: 'Mobile Apps', tag: 'iOS · Android · RN' },
  { icon: '☁️', title: 'SaaS Platforms', tag: 'Multi-tenant · Cloud' },
  { icon: '⚙️', title: 'AI Automation', tag: 'RAG · Pipelines · Flows' },
  { icon: '👥', title: 'Dedicated Teams', tag: 'Staffing · Outsourcing' },
  {
    icon: '📜',
    title: 'Adobe Licensing',
    tag: 'VIP · ETLA · Compliance',
    href: '/services/adobe-licensing',
  },
];

const NAV_PILLS = [
  { label: 'AI Development', href: '#ai-dev' },
  { label: 'Web Apps', href: '#web-dev' },
  { label: 'Mobile', href: '#web-dev' },
  { label: 'SaaS', href: '#saas' },
  { label: 'Dedicated Teams', href: '#teams' },
];

export function ServicesHeroSection() {
  return (
    <section
      id="services-hero"
      aria-labelledby="services-hero-heading"
      className="relative min-h-[78vh] flex flex-col justify-center overflow-hidden bg-corematrix-bg1 pt-36 pb-24"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.15]"
        aria-hidden
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sgrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a3525" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sgrid)" />
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
            <span className="text-corematrix-green400">Services</span>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corematrix-green400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-corematrix-green400" />
            Full-Service AI & Tech Company
          </div>

          <h1
            id="services-hero-heading"
            className="font-display text-[clamp(2.5rem,4.5vw,4.2rem)] font-extrabold leading-[1.05] tracking-tight text-corematrix-textPrimary"
          >
            Services That Turn
            <br />
            <em className="not-italic text-corematrix-green400">Ideas Into</em> Intelligent Products
          </h1>

          <p className="mt-6 max-w-[560px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            From custom AI systems and LLM-powered applications to full-stack web platforms and
            dedicated engineering teams — we build technology that solves real business problems at
            scale.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#services"
              className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              Explore All Services →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 bg-transparent px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
            >
              Get a Free Consultation
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {NAV_PILLS.map((pill) => (
              <Link
                key={pill.label}
                href={pill.href}
                className="flex items-center gap-1.5 rounded-full border border-corematrix-border bg-corematrix-card px-4 py-1.5 text-xs font-medium text-corematrix-textMuted transition-all hover:border-corematrix-green400/30 hover:bg-corematrix-green900/20 hover:text-corematrix-green400"
              >
                {pill.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3">
          {SERVICE_TILES.map((tile) => {
            const cardClass =
              'reveal rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-5 transition-all hover:-translate-y-0.5 hover:border-corematrix-green400/20 hover:shadow-[0_0_24px_rgba(34,197,94,0.08)] ' +
              (tile.href ? 'block cursor-pointer' : 'cursor-default');
            const inner = (
              <>
                <span className="text-2xl" aria-hidden>
                  {tile.icon}
                </span>
                <h3 className="mt-3 font-display text-sm font-bold text-corematrix-textPrimary">
                  {tile.title}
                </h3>
                <p className="mt-0.5 text-xs text-corematrix-textDim">{tile.tag}</p>
              </>
            );
            return tile.href ? (
              <Link key={tile.title} href={tile.href} className={cardClass}>
                {inner}
              </Link>
            ) : (
              <div key={tile.title} className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
