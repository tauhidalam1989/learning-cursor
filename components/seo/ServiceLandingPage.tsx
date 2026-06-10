'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { MarketingCtaBand } from '@/components/shared/MarketingCtaBand';
import type { ServiceLandingConfig } from '@/lib/seo-service-types';
import { siteConfig } from '@/config/site';
import { breadcrumbJsonLd } from '@/lib/seo/jsonld';
import { useLanguage } from '@/context/LanguageContext';

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
  const { language, dir, t } = useLanguage();
  const isAr = language === 'ar';

  const localizedH1 = isAr ? (cfg.h1Ar || cfg.h1) : cfg.h1;
  const localizedIntro = isAr ? (cfg.introAr || cfg.intro) : cfg.intro;
  const localizedBadge = isAr ? (cfg.badgeAr || cfg.badge) : cfg.badge;
  const localizedBreadcrumb = isAr ? (cfg.breadcrumbLabelAr || cfg.breadcrumbLabel) : cfg.breadcrumbLabel;
  const localizedSchemaDesc = isAr ? (cfg.serviceSchemaDescriptionAr || cfg.serviceSchemaDescription) : cfg.serviceSchemaDescription;
  const localizedServiceType = isAr ? (cfg.serviceTypeAr || cfg.serviceType) : cfg.serviceType;

  const url = `${siteConfig.url}${cfg.canonicalPath}`;

  // Localized service landing schema
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: localizedH1,
    description: localizedSchemaDesc,
    serviceType: localizedServiceType,
    provider: {
      '@type': 'Organization' as const,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url,
  } as const;

  // Localized breadcrumb schema
  const breadcrumbLd = breadcrumbJsonLd([
    { name: t('Home', 'الرئيسية'), item: siteConfig.url },
    { name: t('Services', 'الخدمات'), item: `${siteConfig.url}/services` },
    { name: localizedBreadcrumb, item: url },
  ]);

  return (
    <div dir={dir} className={isAr ? 'font-sans' : ''}>
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
        className="relative overflow-hidden bg-corematrix-bg1 pt-16 pb-8 sm:pt-16 sm:pb-12"
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
          className={`pointer-events-none absolute h-[560px] w-[560px] rounded-full bg-corematrix-green700 opacity-[0.10] blur-[120px] ${isAr ? '-left-24 -top-44' : '-right-24 -top-44'
            }`}
          aria-hidden
        />
        <div
          className={`pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-corematrix-green700 opacity-[0.06] blur-[100px] ${isAr ? '-bottom-20 -right-20' : '-bottom-20 -left-20'
            }`}
          aria-hidden
        />

        <Container className="relative z-10">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-corematrix-textDim"
          >
            <Link href="/" className="transition-colors hover:text-corematrix-textMuted">
              {t('Home', 'الرئيسية')}
            </Link>
            <span aria-hidden>{isAr ? '‹' : '›'}</span>
            <Link href="/services" className="transition-colors hover:text-corematrix-textMuted">
              {t('Services', 'الخدمات')}
            </Link>
            <span aria-hidden>{isAr ? '‹' : '›'}</span>
            <span className="text-corematrix-green400">{localizedBreadcrumb}</span>
          </nav>

          <p className="section-label text-corematrix-green400">{t('Service', 'الخدمة')}</p>

          {localizedBadge && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-corematrix-green700/30 bg-corematrix-green900/30 px-3 py-1 text-xs font-medium text-corematrix-green400">
              {localizedBadge}
            </div>
          )}

          <h1
            id="service-landing-heading"
            className="mt-3 max-w-[900px] font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.06] tracking-tight text-corematrix-textPrimary"
          >
            {localizedH1}
          </h1>

          <p className="mt-6 max-w-[680px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            {localizedIntro}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              {t('Discuss this service →', 'ناقش هذه الخدمة ←')}
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 bg-transparent px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
            >
              {t('All services', 'جميع الخدمات')}
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-corematrix-border bg-corematrix-bg0 py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_min(320px,100%)] lg:gap-16">
            <div className="min-w-0 space-y-6">
              <div>
                <p className="section-label text-corematrix-green400">{t('Stack & focus', 'التقنيات والتركيز')}</p>
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

              {cfg.sections.map((s) => {
                const heading = isAr ? (s.headingAr || s.heading) : s.heading;
                const body = isAr ? (s.bodyAr || s.body) : s.body;
                return <BodySection key={heading} heading={heading} body={body} />;
              })}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-6">
                <p className="section-label text-corematrix-green400">{t('Related', 'خدمات ذات صلة')}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {cfg.related.map((r) => {
                    const label = isAr ? (r.labelAr || r.label) : r.label;
                    return (
                      <li key={r.path}>
                        <Link
                          href={r.path}
                          className="font-medium text-corematrix-textSecondary transition-colors hover:text-corematrix-green400 flex items-center gap-1"
                        >
                          {label} {isAr ? '←' : '→'}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {cfg.caseStudies && cfg.caseStudies.length > 0 && (
                  <div className="mt-8 border-t border-corematrix-border pt-6">
                    <p className="section-label text-corematrix-green400">{t('Case studies', 'دراسات الحالة')}</p>
                    <ul className="mt-4 space-y-3 text-sm">
                      {cfg.caseStudies.map((c) => {
                        const label = isAr ? (c.labelAr || c.label) : c.label;
                        return (
                          <li key={c.path}>
                            <Link
                              href={c.path}
                              className="font-medium text-corematrix-textSecondary transition-colors hover:text-corematrix-green400 flex items-center gap-1"
                            >
                              {label} {isAr ? '←' : '→'}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                <Link
                  href="/contact"
                  className="mt-8 flex w-full items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
                >
                  {t('Get a quote →', 'احصل على عرض سعر ←')}
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
        label={t('READY TO START?', 'جاهز للبدء؟')}
        title={t("Let's scope your next release", 'دعنا نحدد نطاق إصدارك القادم')}
        titleClassName="mx-auto mb-5 max-w-[700px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight text-corematrix-textPrimary"
        description={
          <p className="mx-auto mb-8 max-w-[600px] text-base leading-relaxed text-corematrix-textSecondary">
            {t(
              "Share goals, timeline, and constraints — we'll reply with a practical technical angle and suggested next steps.",
              'شاركنا أهدافك، والجدول الزمني، والقيود — وسنرد عليك برؤية تقنية عملية وخطوات مقترحة.'
            )}
          </p>
        }
        actionsWrapperClassName="flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
        >
          {t('Contact us →', 'اتصل بنا ←')}
        </Link>
        <Link
          href="/portfolio"
          className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-8 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
        >
          {t('View portfolio', 'عرض معرض الأعمال')}
        </Link>
      </MarketingCtaBand>
    </div>
  );
}
