'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';

export type ContactMethod = { icon: string; title: string; value: string };

const BADGE_THEMES = [
  {
    icon: 'text-amber-400',
    value: 'text-amber-400',
    label: 'text-amber-400/70',
    bg: 'bg-amber-950/15 border-amber-500/20 hover:border-amber-400/50 hover:bg-amber-950/25',
  },
  {
    icon: 'text-sky-400',
    value: 'text-sky-400',
    label: 'text-sky-400/70',
    bg: 'bg-sky-950/15 border-sky-500/20 hover:border-sky-400/50 hover:bg-sky-950/25',
  },
  {
    icon: 'text-emerald-400',
    value: 'text-emerald-400',
    label: 'text-emerald-400/70',
    bg: 'bg-emerald-950/15 border-emerald-500/20 hover:border-emerald-400/50 hover:bg-emerald-950/25',
  },
  {
    icon: 'text-purple-400',
    value: 'text-purple-400',
    label: 'text-purple-400/70',
    bg: 'bg-purple-950/15 border-purple-500/20 hover:border-purple-400/50 hover:bg-purple-950/25',
  },
];

const METHOD_THEMES = [
  {
    iconBg: 'bg-cyan-950/40 border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400/50 group-hover:bg-cyan-900/40',
    cardBorder: 'border-cyan-500/20 bg-cyan-950/10 hover:border-cyan-400/50 hover:bg-cyan-950/20 shadow-[0_4px_20px_rgba(6,182,212,0.05)]',
    iconHover: 'group-hover:scale-110 duration-300',
    titleColor: 'text-cyan-400 group-hover:text-cyan-300 transition-colors',
    valueColor: 'text-cyan-300/70 group-hover:text-cyan-200/90 transition-colors',
  },
  {
    iconBg: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 group-hover:border-emerald-400/50 group-hover:bg-emerald-900/40',
    cardBorder: 'border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-400/50 hover:bg-emerald-950/20 shadow-[0_4px_20px_rgba(16,185,129,0.05)]',
    iconHover: 'group-hover:scale-110 duration-300',
    titleColor: 'text-emerald-400 group-hover:text-emerald-300 transition-colors',
    valueColor: 'text-emerald-300/70 group-hover:text-emerald-200/90 transition-colors',
  },
  {
    iconBg: 'bg-sky-950/40 border-sky-500/30 text-sky-400 group-hover:border-sky-400/50 group-hover:bg-sky-900/40',
    cardBorder: 'border-sky-500/20 bg-sky-950/10 hover:border-sky-400/50 hover:bg-sky-950/20 shadow-[0_4px_20px_rgba(14,165,233,0.05)]',
    iconHover: 'group-hover:scale-110 duration-300',
    titleColor: 'text-sky-400 group-hover:text-sky-300 transition-colors',
    valueColor: 'text-sky-300/70 group-hover:text-sky-200/90 transition-colors',
  },
];

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
            {RESPONSE_BADGES.map((badge, idx) => {
              const theme = BADGE_THEMES[idx % BADGE_THEMES.length];
              return (
                <div
                  key={badge.label}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-all duration-300 ${theme.bg}`}
                >
                  <span className={theme.icon} aria-hidden>
                    <i className={badge.icon} />
                  </span>
                  <span className={`font-bold ${theme.value}`}>{badge.value}</span>
                  <span className={theme.label}>{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative lg:-mt-36">
          <div className="relative overflow-hidden rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-9 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
            <div
              className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent"
              aria-hidden
            />
            <p className="mb-6 font-display text-[0.68rem] font-bold uppercase tracking-[0.12em] text-corematrix-green400">
              {t('REACH US DIRECTLY', 'تواصل معنا مباشرة')}
            </p>
            <div className="space-y-3">
              {CONTACT_METHODS.map((method, idx) => {
                const theme = METHOD_THEMES[idx % METHOD_THEMES.length];
                return (
                  <div
                    key={method.title}
                    className={`group flex cursor-default items-center gap-4 rounded-xl border p-4 transition-all duration-300 hover:translate-x-1 ${theme.cardBorder}`}
                  >
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${theme.iconBg} ${theme.iconHover}`}>
                      <i className={method.icon} aria-hidden="true" />
                    </div>
                    <div>
                      <p className={`font-display text-xs font-bold ${theme.titleColor}`}>
                        {method.title}
                      </p>
                      <p className={`mt-0.5 text-xs font-light transition-colors ${theme.valueColor}`}>
                        {method.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="absolute -bottom-5 right-4 float-anim rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-4 py-3 shadow-[0_8px_32px_rgba(16,185,129,0.15)]">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 dot-pulse" />
              <div>
                <p className="font-display text-sm font-bold text-emerald-400">
                  {t('Currently accepting new projects', 'نقبل حالياً مشاريع جديدة')}
                </p>
                <p className="text-xs text-emerald-300/70">
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
