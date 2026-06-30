'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { OPEN_ROLES } from '@/data/careersData';
import { getAllDbCareers } from '@/lib/careers';
import type { OpenRole } from '@/types/careers';
import { useLanguage } from '@/context/LanguageContext';

type BadgeItem = { icon: string; label: string };

const HERO_BADGES: readonly BadgeItem[] = [
  { icon: 'fas fa-globe', label: '100% Remote' },
  { icon: 'fas fa-bolt', label: 'Fast Hiring Process' },
  { icon: 'fas fa-robot', label: 'AI-First Company' },
  { icon: 'fas fa-chart-line', label: 'Equity Available' },
];

// Explicitly typed translation maps for i18n
const badgeTranslations: Record<string, string> = {
  '100% Remote': 'عن بعد 100%',
  'Fast Hiring Process': 'عملية توظيف سريعة',
  'AI-First Company': 'شركة تركز على الذكاء الاصطناعي',
  'Equity Available': 'خيار تملك أسهم متاح',
};

const roleTitleTranslations: Record<string, string> = {
  'Senior AI/ML Engineer': 'كبير مهندسي الذكاء الاصطناعي وتعلم الآلة',
  'Senior Next.js / React Engineer': 'كبير مهندسي Next.js / React',
  'Backend Engineer (Python/FastAPI)': 'مهندس واجهة خلفية (بايثون/FastAPI)',
  'React Native / Mobile Engineer': 'مهندس React Native / تطبيقات الهاتف',
  'LLM Research Engineer': 'مهندس أبحاث نماذج اللغة الكبيرة (LLM)',
  'Product Designer (UI/UX)': 'مصمم منتجات (واجهة وتجربة المستخدم)',
  'Technical Product Manager': 'مدير منتجات تقني',
  'DevOps / Platform Engineer': 'مهندس DevOps / منصة',
};

const roleTypeTranslations: Record<string, string> = {
  'full-time': 'دوام كامل',
  'part-time': 'دوام جزئي',
  'contract': 'عقد',
};

const roleBadgeTranslations: Record<string, string> = {
  'hot': 'عاجل',
  'new': 'جديد',
};

function getHeroBadgeTheme(label: string) {
  switch (label) {
    case '100% Remote':
      return {
        bg: 'bg-cyan-500/10 border-cyan-500/20',
        text: 'text-cyan-300',
        iconColor: 'text-cyan-400',
        hover: 'hover:border-cyan-500/40 hover:bg-cyan-500/15',
      };
    case 'Fast Hiring Process':
      return {
        bg: 'bg-amber-500/10 border-amber-500/20',
        text: 'text-amber-300',
        iconColor: 'text-amber-400',
        hover: 'hover:border-amber-500/40 hover:bg-amber-500/15',
      };
    case 'AI-First Company':
      return {
        bg: 'bg-purple-500/10 border-purple-500/20',
        text: 'text-purple-300',
        iconColor: 'text-purple-400',
        hover: 'hover:border-purple-500/40 hover:bg-purple-500/15',
      };
    case 'Equity Available':
    default:
      return {
        bg: 'bg-emerald-500/10 border-emerald-500/20',
        text: 'text-emerald-300',
        iconColor: 'text-emerald-400',
        hover: 'hover:border-emerald-500/40 hover:bg-emerald-500/15',
      };
  }
}

function getRoleTheme(title: string) {
  if (title.includes('AI') || title.includes('LLM') || title.includes('Machine')) {
    return {
      cardBg: 'bg-purple-950/20',
      cardBorder: 'border-purple-500/15',
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/10 border-purple-500/20',
      badgeBg: 'bg-purple-900/20 text-purple-400',
      titleColor: 'text-purple-300',
    };
  }
  if (title.includes('Next.js') || title.includes('React') || title.includes('Frontend')) {
    return {
      cardBg: 'bg-cyan-950/20',
      cardBorder: 'border-cyan-500/15',
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10 border-cyan-500/20',
      badgeBg: 'bg-cyan-900/20 text-cyan-400',
      titleColor: 'text-cyan-300',
    };
  }
  if (title.includes('Backend') || title.includes('Python')) {
    return {
      cardBg: 'bg-amber-950/20',
      cardBorder: 'border-amber-500/15',
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      badgeBg: 'bg-amber-900/20 text-amber-400',
      titleColor: 'text-amber-300',
    };
  }
  if (title.includes('Mobile') || title.includes('Native') || title.includes('iOS')) {
    return {
      cardBg: 'bg-indigo-950/20',
      cardBorder: 'border-indigo-500/15',
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/10 border-indigo-500/20',
      badgeBg: 'bg-indigo-900/20 text-indigo-400',
      titleColor: 'text-indigo-300',
    };
  }
  if (title.includes('DevOps') || title.includes('Platform') || title.includes('Cloud')) {
    return {
      cardBg: 'bg-sky-950/20',
      cardBorder: 'border-sky-500/15',
      iconColor: 'text-sky-400',
      iconBg: 'bg-sky-500/10 border-sky-500/20',
      badgeBg: 'bg-sky-900/20 text-sky-400',
      titleColor: 'text-sky-300',
    };
  }
  return {
    cardBg: 'bg-emerald-950/20',
    cardBorder: 'border-emerald-500/15',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
    badgeBg: 'bg-emerald-900/20 text-emerald-400',
    titleColor: 'text-emerald-300',
  };
}

export function CareersHeroSection() {
  const { t, language } = useLanguage();
  const [roles, setRoles] = useState<OpenRole[]>([]);

  useEffect(() => {
    async function loadJobs() {
      const dbJobs = await getAllDbCareers(language);
      if (dbJobs && dbJobs.length > 0) {
        setRoles(dbJobs);
      } else {
        // Fallback to static roles mapped with translated titles if database is empty/offline
        const fallbackMapped = OPEN_ROLES.map((r) => ({
          ...r,
          title: language === 'ar' ? (roleTitleTranslations[r.title] ?? r.title) : r.title,
          location: language === 'ar' ? ({ 'Remote': 'عن بعد' }[r.location] || r.location) : r.location,
          employmentType: language === 'ar' ? (roleTypeTranslations[r.employmentType] ?? r.employmentType) : r.employmentType,
          badge: r.badge ? (language === 'ar' ? (roleBadgeTranslations[r.badge] ?? r.badge) : r.badge) : undefined,
        }));
        setRoles(fallbackMapped);
      }
    }
    loadJobs();
  }, [language]);

  const previewRoles = roles.slice(0, 5);

  return (
    <section
      id="careers-hero"
      aria-labelledby="careers-hero-heading"
      className="relative flex min-h-[86vh] flex-col justify-center overflow-hidden bg-corematrix-bg1 pt-12 pb-12"
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
              {t('Home', 'الرئيسية')}
            </Link>
            <span aria-hidden>›</span>
            <span className="text-corematrix-green400">{t('Careers', 'الوظائف')}</span>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corematrix-green400">
            <span className="h-1.5 w-1.5 rounded-full bg-corematrix-green400 dot-pulse" />
            {t("We're Hiring", 'نحن نوظف')}
          </div>

          <h1
            id="careers-hero-heading"
            className="font-display text-[clamp(2.2rem,4vw,3.8rem)] font-extrabold leading-[1.06] tracking-tight text-corematrix-textPrimary"
          >
            {t('Build the Future of ', 'ساهم في بناء مستقبل ')}
            <span className="not-italic text-corematrix-green400">{t('AI', 'الذكاء الاصطناعي')}</span>
            {t(' With Us', ' معنا')}
          </h1>

          <p className="mt-6 max-w-[560px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            {t(
              'Join a team of engineers and AI specialists who ship real products. Remote-first, transparent, competitive pay, and real ownership from day one.',
              'انضم إلى فريق من المهندسين وأخصائيي الذكاء الاصطناعي الذين يبنون منتجات حقيقية. عمل عن بعد بالكامل، وشفافية مطلقة، ورواتب تنافسية، وتملك حقيقي من اليوم الأول.'
            )}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#open-roles"
              className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              {t('View Open Roles →', 'عرض الوظائف الشاغرة →')}
            </Link>
            <Link
              href="#open-application"
              className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
            >
              {t('Send Open Application', 'أرسل طلباً عاماً')}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {HERO_BADGES.map((b) => {
              const theme = getHeroBadgeTheme(b.label);
              return (
                <div
                  key={b.label}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-300 ${theme.bg} ${theme.text} ${theme.hover}`}
                >
                  <span className={theme.iconColor} aria-hidden="true">
                    <i className={b.icon} />
                  </span>
                  {t(b.label, badgeTranslations[b.label] ?? b.label)}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
            <div
              className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent"
              aria-hidden
            />
            <p className="mb-6 font-display text-[0.68rem] font-bold uppercase tracking-[0.12em] text-corematrix-green400">
              {t('CURRENTLY OPEN ROLES', 'الوظائف الشاغرة حالياً')}
            </p>
            <ul className="space-y-3">
              {previewRoles.map((r) => {
                const theme = getRoleTheme(r.title);
                return (
                  <li
                    key={r.id}
                    className={`group flex items-center justify-between gap-4 rounded-xl border p-3.5 transition-all duration-300 hover:translate-x-1 ${theme.cardBg} ${theme.cardBorder}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm transition-all duration-300 group-hover:scale-105 group-hover:text-white ${theme.iconBg} ${theme.iconColor}`} aria-hidden="true">
                        <i className={r.icon} />
                      </span>
                      <div>
                        <p className={`font-display text-sm font-bold text-corematrix-textPrimary transition-colors duration-300 group-hover:${theme.titleColor}`}>
                          {r.title}
                        </p>
                        <p className="text-xs text-corematrix-textDim">
                          {r.location} · {r.employmentType}
                        </p>
                      </div>
                    </div>
                    {r.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[0.6rem] font-bold ${r.badge === 'hot' || r.badge === 'عاجل'
                            ? 'bg-red-900/20 text-red-400'
                            : theme.badgeBg
                          }`}
                      >
                        {r.badge}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            <Link
              href="#open-roles"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition hover:gap-3"
            >
              {t(
                `View All ${roles.length} Open Positions →`,
                `عرض جميع الوظائف الـ ${roles.length} الشاغرة ←`
              )}
            </Link>
          </div>

          <div className="absolute -bottom-10 -left-3 float-anim rounded-xl border border-cyan-500/20 bg-cyan-950/40 backdrop-blur-md px-4 py-3 shadow-[0_12px_40px_rgba(6,182,212,0.1)] transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-950/60">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)] dot-pulse" />
              <div>
                <p className="font-display text-sm font-bold text-corematrix-textPrimary">
                  {t('25+ engineers worldwide', 'أكثر من 25 مهندساً حول العالم')}
                </p>
                <p className="text-xs text-corematrix-textDim">
                  {t('Async-first · Outcome-driven', 'عمل غير متزامن أولاً · مدفوع بالنتائج')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
