'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';

export type ContactMethod = { icon: string; title: string; value: string };

export function ContactHeroSection() {
  const { t } = useLanguage();

  const RESPONSE_BADGES = [
    { icon: 'fas fa-bolt', value: t('24h', '24 ساعة'), label: t('response time', 'وقت الاستجابة') },
    { icon: 'fas fa-globe', value: t('Global', 'عالمي'), label: t('availability', 'الجهوزية والتوفر') },
    { icon: 'fas fa-lock', value: t('NDA', 'اتفاقية عدم الإفصاح'), label: t('signed upfront', 'توقع مسبقاً') },
    { icon: 'fas fa-gift', value: t('Free', 'مجاناً'), label: t('discovery call', 'مكالمة استكشافية') },
  ];

  const CONTACT_METHODS: ContactMethod[] = [
    { icon: 'fas fa-envelope', title: t('Email Us', 'راسلنا عبر البريد'), value: siteConfig.email },
    { icon: 'fas fa-phone-alt', title: t('Call or WhatsApp', 'الهاتف والواتساب'), value: siteConfig.phone },
    { icon: 'fab fa-linkedin', title: t('LinkedIn', 'لينكد إن'), value: siteConfig.linkedinDisplay },
    { icon: 'fab fa-github', title: t('GitHub', 'جيتهاب'), value: siteConfig.githubDisplay },
  ];

  return (
    <section
      id="contact-hero"
      aria-labelledby="contact-hero-heading"
      className="relative flex min-h-[72vh] items-center overflow-hidden bg-corematrix-bg1 pt-12 pb-20"
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
              {t('Home', 'الرئيسية')}
            </Link>
            <span aria-hidden>›</span>
            <span className="text-corematrix-green400">{t('Contact Us', 'اتصل بنا')}</span>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corematrix-green400">
            <span className="h-1.5 w-1.5 rounded-full bg-corematrix-green400 dot-pulse" />
            {t('We Respond Within 24 Hours', 'نقوم بالرد في غضون 24 ساعة')}
          </div>

          <h1
            id="contact-hero-heading"
            className="font-display text-[clamp(2.5rem,4.5vw,4rem)] font-extrabold leading-[1.06] tracking-tight text-corematrix-textPrimary"
          >
            {t("Let's Build Something", "لنقم ببناء شيء")}
            <br />
            <span className="not-italic text-corematrix-green400">{t('Extraordinary', 'استثنائي وفائق')}</span> {t('Together', 'معاً')}
          </h1>

          <p className="mt-6 max-w-[560px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            {t(
              "Have a project in mind? A problem to solve? Or just want to explore whether we'd be a good fit? We'd love to hear from you. No sales pitch — just a real technical conversation.",
              "هل لديك مشروع تفكر فيه؟ أو مشكلة ترغب في حلها؟ أو فقط تريد استكشاف ما إذا كنا الشريك المناسب لك؟ يسعدنا جداً السماع منك وتلقي استفسارك. لا توجد عروض بيع مبالغ فيها — بل حوار تقني واقعي وجاد."
            )}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {RESPONSE_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 rounded-xl border border-corematrix-border bg-corematrix-card px-4 py-2 text-sm"
              >
                <span className="text-corematrix-green400" aria-hidden>
                  <i className={badge.icon} />
                </span>
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
              {t('REACH US DIRECTLY', 'تواصل معنا مباشرة')}
            </p>
            <div className="space-y-3">
              {CONTACT_METHODS.map((method) => (
                <div
                  key={method.title}
                  className="flex cursor-default items-center gap-4 rounded-xl border border-corematrix-border bg-corematrix-card p-4 transition-all hover:translate-x-1 hover:border-corematrix-border2"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-corematrix-green700/20 bg-corematrix-green900/40 text-base text-corematrix-green400">
                    <i className={method.icon} aria-hidden="true" />
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
                  {t('Currently accepting new projects', 'نقبل حالياً مشاريع جديدة')}
                </p>
                <p className="text-xs text-corematrix-textDim">
                  {t('Next availability: This week', 'الجهوزية القادمة: هذا الأسبوع')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
