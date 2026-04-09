import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { MarketingCtaBand } from '@/components/shared/MarketingCtaBand';
import type { ServiceLandingConfig } from '@/lib/seo-service-types';
import { getServiceLandingSchema } from '@/lib/seo-service-landings';
import { siteConfig } from '@/config/site';
import { breadcrumbJsonLd } from '@/lib/seo/jsonld';

function BodySection({ heading, body }: { heading: string; body: string }) {
  return (
    <article className="rounded-2xl border border-corematrix-border bg-corematrix-card2 p-6 sm:p-8">
      <h2 className="font-display text-xl font-bold text-corematrix-textPrimary sm:text-2xl">
        {heading}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">{body}</p>
    </article>
  );
}

export function ServiceLandingPage({ config: cfg }: { config: ServiceLandingConfig }) {
  const url = `${siteConfig.url}${cfg.canonicalPath}`;
  const serviceLd = getServiceLandingSchema(cfg);
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', item: siteConfig.url },
    { name: 'Services', item: `${siteConfig.url}/services` },
    { name: cfg.breadcrumbLabel, item: url },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section
        aria-labelledby="service-landing-heading"
        className="relative overflow-hidden bg-corematrix-bg1 pt-32 pb-16 sm:pt-36 sm:pb-20"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.15]" aria-hidden>
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id={`svc-landing-grid-${cfg.slug}`}
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
            <rect width="100%" height="100%" fill={`url(#svc-landing-grid-${cfg.slug})`} />
          </svg>
        </div>
        <div
          className="pointer-events-none absolute -right-24 -top-44 h-[560px] w-[560px] rounded-full bg-corematrix-green700 opacity-[0.10] blur-[120px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-[420px] w-[420px] rounded-full bg-corematrix-green700 opacity-[0.06] blur-[100px]"
          aria-hidden
        />

        <Container className="relative z-10">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-corematrix-textDim"
          >
            <Link href="/" className="transition-colors hover:text-corematrix-textMuted">
              Home
            </Link>
            <span aria-hidden>›</span>
            <Link href="/services" className="transition-colors hover:text-corematrix-textMuted">
              Services
            </Link>
            <span aria-hidden>›</span>
            <span className="text-corematrix-green400">{cfg.breadcrumbLabel}</span>
          </nav>

          <p className="section-label text-corematrix-green400">Service</p>

          {cfg.badge && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-corematrix-green700/30 bg-corematrix-green900/30 px-3 py-1 text-xs font-medium text-corematrix-green400">
              {cfg.badge}
            </div>
          )}

          <h1
            id="service-landing-heading"
            className="mt-3 max-w-[900px] font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.06] tracking-tight text-corematrix-textPrimary"
          >
            {cfg.h1}
          </h1>

          <p className="mt-6 max-w-[680px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            {cfg.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              Discuss this service →
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 bg-transparent px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
            >
              All services
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-corematrix-border bg-corematrix-bg0 py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_min(320px,100%)] lg:gap-16">
            <div className="min-w-0 space-y-6">
              <div>
                <p className="section-label text-corematrix-green400">Stack & focus</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cfg.stackTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-corematrix-border bg-corematrix-card2 px-2 py-0.5 font-mono text-[0.62rem] font-semibold text-corematrix-textDim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {cfg.sections.map((s) => (
                <BodySection key={s.heading} heading={s.heading} body={s.body} />
              ))}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-6">
                <p className="section-label text-corematrix-green400">Related</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {cfg.related.map((r) => (
                    <li key={r.path}>
                      <Link
                        href={r.path}
                        className="font-medium text-corematrix-textSecondary transition-colors hover:text-corematrix-green400"
                      >
                        {r.label} →
                      </Link>
                    </li>
                  ))}
                </ul>

                {cfg.caseStudies && cfg.caseStudies.length > 0 && (
                  <div className="mt-8 border-t border-corematrix-border pt-6">
                    <p className="section-label text-corematrix-green400">Case studies</p>
                    <ul className="mt-4 space-y-3 text-sm">
                      {cfg.caseStudies.map((c) => (
                        <li key={c.path}>
                          <Link
                            href={c.path}
                            className="font-medium text-corematrix-textSecondary transition-colors hover:text-corematrix-green400"
                          >
                            {c.label} →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href="/contact"
                  className="mt-8 flex w-full items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
                >
                  Get a quote →
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <MarketingCtaBand
        headingId="service-landing-cta-heading"
        sectionClassName="bg-corematrix-bg2"
        glow="lg"
        label="READY TO START?"
        title="Let's scope your next release"
        titleClassName="mx-auto mb-5 max-w-[700px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight text-corematrix-textPrimary"
        description={
          <p className="mx-auto mb-8 max-w-[600px] text-base leading-relaxed text-corematrix-textSecondary">
            Share goals, timeline, and constraints — we&apos;ll reply with a practical technical angle
            and suggested next steps.
          </p>
        }
        actionsWrapperClassName="flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
        >
          Contact us →
        </Link>
        <Link
          href="/portfolio"
          className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-8 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
        >
          View portfolio
        </Link>
      </MarketingCtaBand>
    </>
  );
}
