'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import { useFilterDispatch } from '@/hooks/usePortalFilter';

type ThemeConfig = {
  icon: string;
  tag_en: string;
  tag_ar: string;
  iconColor: string;
  iconBg: string;
  cardBg: string;
  cardBorder: string;
  hoverBorder: string;
  hoverBg: string;
  hoverGlow: string;
  titleColor: string;
  tagColor: string;
};

const CATEGORY_THEMES: Record<string, ThemeConfig> = {
  'ai-automation-services': {
    icon: 'fas fa-brain',
    tag_en: 'LLMs · Agents · Flows',
    tag_ar: 'النماذج اللغوية · الوكلاء · التدفقات',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    cardBg: 'bg-purple-950/20',
    cardBorder: 'border-purple-500/15',
    hoverBorder: 'hover:border-purple-500/40',
    hoverBg: 'hover:bg-purple-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(168,85,247,0.15)]',
    titleColor: 'text-purple-100',
    tagColor: 'text-purple-300/70',
  },
  'cyber-security-services': {
    icon: 'fas fa-shield-alt',
    tag_en: 'Zero Trust · Audit · MLOps',
    tag_ar: 'أمان صفرى · تدقيق · عمليات MLOps',
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10 border-rose-500/20',
    cardBg: 'bg-rose-950/20',
    cardBorder: 'border-rose-500/15',
    hoverBorder: 'hover:border-rose-500/40',
    hoverBg: 'hover:bg-rose-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(244,63,94,0.15)]',
    titleColor: 'text-rose-100',
    tagColor: 'text-rose-300/70',
  },
  'web-developement-services': {
    icon: 'fas fa-code',
    tag_en: 'Next.js · React · Node',
    tag_ar: 'Next.js · React · Node',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    cardBg: 'bg-cyan-950/20',
    cardBorder: 'border-cyan-500/15',
    hoverBorder: 'hover:border-cyan-500/40',
    hoverBg: 'hover:bg-cyan-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(6,182,212,0.15)]',
    titleColor: 'text-cyan-100',
    tagColor: 'text-cyan-300/70',
  },
  'mobile-app-developement-services': {
    icon: 'fas fa-mobile-alt',
    tag_en: 'iOS · Android · RN',
    tag_ar: 'آيفون · أندرويد · ريأكت نيتف',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
    cardBg: 'bg-amber-950/20',
    cardBorder: 'border-amber-500/15',
    hoverBorder: 'hover:border-amber-500/40',
    hoverBg: 'hover:bg-amber-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(245,158,11,0.15)]',
    titleColor: 'text-amber-100',
    tagColor: 'text-amber-300/70',
  },
  'cloud-devops-services': {
    icon: 'fas fa-cloud',
    tag_en: 'CI/CD · AWS · Docker',
    tag_ar: 'التحميل المستمر · حوسبة أمازون · دوتكر',
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10 border-indigo-500/20',
    cardBg: 'bg-indigo-950/20',
    cardBorder: 'border-indigo-500/15',
    hoverBorder: 'hover:border-indigo-500/40',
    hoverBg: 'hover:bg-indigo-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(99,102,241,0.15)]',
    titleColor: 'text-indigo-100',
    tagColor: 'text-indigo-300/70',
  },
  'data-analytics-services': {
    icon: 'fas fa-chart-bar',
    tag_en: 'Big Data · BI · ML',
    tag_ar: 'بيانات ضخمة · ذكاء أعمال · تعلم آلة',
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-500/10 border-sky-500/20',
    cardBg: 'bg-sky-950/20',
    cardBorder: 'border-sky-500/15',
    hoverBorder: 'hover:border-sky-500/40',
    hoverBg: 'hover:bg-sky-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(14,165,233,0.15)]',
    titleColor: 'text-sky-100',
    tagColor: 'text-sky-300/70',
  },
  'ui-ux-product-design': {
    icon: 'fas fa-paint-brush',
    tag_en: 'Figma · Design Systems',
    tag_ar: 'فيجما · أنظمة التصميم وواجهات',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10 border-orange-500/20',
    cardBg: 'bg-orange-950/20',
    cardBorder: 'border-orange-500/15',
    hoverBorder: 'hover:border-orange-500/40',
    hoverBg: 'hover:bg-orange-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(249,115,22,0.15)]',
    titleColor: 'text-orange-100',
    tagColor: 'text-orange-300/70',
  },
  'quality-assurance-testing': {
    icon: 'fas fa-check-circle',
    tag_en: 'Unit · E2E · Security',
    tag_ar: 'اختبارات الوحدة · اختبار شامل · أمان',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
    cardBg: 'bg-emerald-950/20',
    cardBorder: 'border-emerald-500/15',
    hoverBorder: 'hover:border-emerald-500/40',
    hoverBg: 'hover:bg-emerald-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(16,185,129,0.15)]',
    titleColor: 'text-emerald-100',
    tagColor: 'text-emerald-300/70',
  },
  'it-consulting-strategy': {
    icon: 'fas fa-lightbulb',
    tag_en: 'Roadmaps · Architecture',
    tag_ar: 'خرائط طريق · هندسة الأنظمة والحلول',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
    cardBg: 'bg-emerald-950/20',
    cardBorder: 'border-emerald-500/15',
    hoverBorder: 'hover:border-emerald-500/40',
    hoverBg: 'hover:bg-emerald-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(16,185,129,0.15)]',
    titleColor: 'text-emerald-100',
    tagColor: 'text-emerald-300/70',
  },
};

const defaultTheme: ThemeConfig = {
  icon: 'fas fa-cog',
  tag_en: 'Intelligent Digital Services',
  tag_ar: 'الخدمات الرقمية الذكية',
  iconColor: 'text-emerald-400',
  iconBg: 'bg-emerald-500/10 border-emerald-500/20',
  cardBg: 'bg-emerald-950/20',
  cardBorder: 'border-emerald-500/15',
  hoverBorder: 'hover:border-emerald-500/40',
  hoverBg: 'hover:bg-emerald-950/35',
  hoverGlow: 'hover:shadow-[0_0_24px_rgba(16,185,129,0.15)]',
  titleColor: 'text-emerald-100',
  tagColor: 'text-emerald-300/70',
};

const PILL_CLASSES: Record<string, string> = {
  'ai-automation-services': 'bg-purple-950/20 border-purple-500/15 text-purple-300 hover:bg-purple-950/40 hover:border-purple-500/45 hover:text-purple-200',
  'cyber-security-services': 'bg-rose-950/20 border-rose-500/15 text-rose-300 hover:bg-rose-950/40 hover:border-rose-500/45 hover:text-rose-200',
  'web-developement-services': 'bg-cyan-950/20 border-cyan-500/15 text-cyan-300 hover:bg-cyan-950/40 hover:border-cyan-500/45 hover:text-cyan-200',
  'mobile-app-developement-services': 'bg-amber-950/20 border-amber-500/15 text-amber-300 hover:bg-amber-950/40 hover:border-amber-500/45 hover:text-amber-200',
  'cloud-devops-services': 'bg-indigo-950/20 border-indigo-500/15 text-indigo-300 hover:bg-indigo-950/40 hover:border-indigo-500/45 hover:text-indigo-200',
  'data-analytics-services': 'bg-sky-950/20 border-sky-500/15 text-sky-300 hover:bg-sky-950/40 hover:border-sky-500/45 hover:text-sky-200',
  'ui-ux-product-design': 'bg-orange-950/20 border-orange-500/15 text-orange-300 hover:bg-orange-950/40 hover:border-orange-500/45 hover:text-orange-200',
  'quality-assurance-testing': 'bg-emerald-950/20 border-emerald-500/15 text-emerald-300 hover:bg-emerald-950/40 hover:border-emerald-500/45 hover:text-emerald-200',
  'it-consulting-strategy': 'bg-emerald-950/20 border-emerald-500/15 text-emerald-300 hover:bg-emerald-950/40 hover:border-emerald-500/45 hover:text-emerald-200',
};
const defaultPillClass = 'bg-emerald-950/20 border-emerald-500/15 text-emerald-300 hover:bg-emerald-950/40 hover:border-emerald-500/45 hover:text-emerald-200';

const FALLBACK_CATEGORIES = [
  {
    filterKey: 'ai-automation-services',
    label_en: 'AI & Automation Services',
    label_ar: 'خدمات الذكاء الاصطناعي والأتمتة',
    anchorId: 'ai-automation-services-dev',
  },
  {
    filterKey: 'cyber-security-services',
    label_en: 'Cyber Security Services',
    label_ar: 'خدمات الأمن السيبراني',
    anchorId: 'cyber-security-services-dev',
  },
  {
    filterKey: 'web-developement-services',
    label_en: 'Web Developement Services',
    label_ar: 'خدمات تطوير الويب',
    anchorId: 'web-developement-services-dev',
  },
  {
    filterKey: 'mobile-app-developement-services',
    label_en: 'Mobile App Developement Services',
    label_ar: 'خدمات تطوير تطبيقات الهاتف المحمول',
    anchorId: 'mobile-app-developement-services-dev',
  },
  {
    filterKey: 'cloud-devops-services',
    label_en: 'Cloud & DevOps Services',
    label_ar: 'خدمات السحابة و DevOps',
    anchorId: 'cloud-devops-services-dev',
  },
  {
    filterKey: 'data-analytics-services',
    label_en: 'Data & Analytics Services',
    label_ar: 'خدمات البيانات والتحليلات',
    anchorId: 'data-analytics-services-dev',
  },
  {
    filterKey: 'ui-ux-product-design',
    label_en: 'UI/UX & Product Design',
    label_ar: 'تصميم واجهات وتجربة المستخدم (UI/UX) وتصميم المنتجات',
    anchorId: 'ui-ux-product-design-dev',
  },
  {
    filterKey: 'quality-assurance-testing',
    label_en: 'Quality Assurance & Testing',
    label_ar: 'ضمان الجودة واختبار البرمجيات',
    anchorId: 'quality-assurance-testing-dev',
  },
  {
    filterKey: 'it-consulting-strategy',
    label_en: 'IT Consulting & Strategy',
    label_ar: 'الاستشارات التقنية واستراتيجية تقنية المعلومات',
    anchorId: 'it-consulting-strategy-dev',
  },
];

export function ServicesHeroSection() {
  const { t, language } = useLanguage();
  const { dispatch } = useFilterDispatch('serviceFilter');
  const [categories, setCategories] = useState<any[]>(FALLBACK_CATEGORIES);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
        const apiBase = backendUrl.endsWith('/api') ? backendUrl : `${backendUrl}/api`;
        const res = await fetch(`${apiBase}/service-categories`, { cache: 'no-store' });
        if (res.ok) {
          const raw = await res.json();
          const data = Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []);
          if (data.length > 0) {
            setCategories(data);
          }
        }
      } catch (e) {
        // Silently keep default fallback categories
      }
    }
    fetchCategories();
  }, []);

  const dynamicNavPills = categories.slice(0, 5).map((cat) => {
    const label = language === 'ar' ? cat.label_ar : cat.label_en;
    return {
      label,
      href: `#${cat.anchorId}`,
      filterKey: cat.filterKey,
      anchorId: cat.anchorId,
      classes: PILL_CLASSES[cat.filterKey] || defaultPillClass,
    };
  });

  const dynamicServiceTiles = categories.map((cat) => {
    const theme = CATEGORY_THEMES[cat.filterKey] || defaultTheme;
    const title = language === 'ar' ? cat.label_ar : cat.label_en;
    const tag = language === 'ar' ? theme.tag_ar : theme.tag_en;
    return {
      title,
      tag,
      href: `#${cat.anchorId}`,
      filterKey: cat.filterKey,
      anchorId: cat.anchorId,
      ...theme,
    };
  });

  const handleTileClick = (e: React.MouseEvent, filterKey: string, anchorId: string) => {
    e.preventDefault();
    dispatch(filterKey);
    
    setTimeout(() => {
      if (typeof window === 'undefined') return;
      const target = document.getElementById('services');
      if (target) {
        const OFFSET = 160; // header (~68px) + filter nav (~85px) + 7px breathing room
        const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: 'smooth',
        });
      }
      window.history.pushState(null, '', `#${anchorId}`);
    }, 100);
  };

  return (
    <section
      id="services-hero"
      aria-labelledby="services-hero-heading"
      className="relative min-h-[78vh] flex flex-col justify-center overflow-hidden bg-corematrix-bg1 pt-12 pb-16"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.15]" aria-hidden>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sgrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a3525" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sgrid)" />
        </svg>
      </div>
      <div className="pointer-events-none absolute -right-24 -top-44 h-[700px] w-[700px] rounded-full bg-corematrix-green700 opacity-[0.10] blur-[130px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[500px] w-[500px] rounded-full bg-corematrix-green700 opacity-[0.05] blur-[120px]" aria-hidden />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-corematrix-textDim">
            <Link href="/" className="hover:text-corematrix-textMuted">
              {t('Home', 'الرئيسية')}
            </Link>
            <span aria-hidden>›</span>
            <span className="text-corematrix-green400">{t('Services', 'الخدمات')}</span>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corematrix-green400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-corematrix-green400" />
            {t('Full-Service AI & Tech Company', 'شركة ذكاء اصطناعي وتكنولوجيا شاملة')}
          </div>

          <h1
            id="services-hero-heading"
            className="font-display text-[clamp(2.5rem,4.5vw,4.2rem)] font-extrabold leading-[1.05] tracking-tight text-corematrix-textPrimary"
          >
            {t('Services That Turn', 'خدمات تحول')}
            <br />
            <em className="not-italic text-corematrix-green400">
              {t('Ideas Into', 'الأفكار إلى')}
            </em>
            {' '}
            {t('Intelligent Products', 'منتجات ذكية')}
          </h1>

          <p className="mt-6 max-w-[560px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            {t(
              'From custom AI systems and LLM-powered applications to full-stack web platforms and dedicated engineering teams — we build technology that solves real business problems at scale.',
              'من أنظمة الذكاء الاصطناعي المخصصة وتطبيقات LLM إلى منصات الويب المتكاملة والفرق الهندسية المخصصة — نبني تقنيات تحل مشاكل الأعمال الحقيقية على نطاق واسع.'
            )}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                dispatch('all');
                setTimeout(() => {
                  const target = document.getElementById('services');
                  if (target) {
                    const OFFSET = 160; // header (~68px) + filter nav (~85px) + 7px breathing room
                    const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
                    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              {t('Explore All Services →', 'استكشاف جميع الخدمات →')}
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-corematrix-border2 bg-transparent px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
            >
              {t('Get a Free Consultation', 'احصل على استشارة مجانية')}
            </Link>
          </div>

          <div className="mt-6 flex flex-nowrap overflow-x-auto gap-2 scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
            {dynamicNavPills.map((pill) => (
              <Link
                key={pill.href}
                href={pill.href}
                onClick={(e) => handleTileClick(e, pill.filterKey, pill.anchorId)}
                className={`flex-shrink-0 flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${pill.classes}`}
              >
                {pill.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3">
          {dynamicServiceTiles.map((tile) => {
            const cardClass =
              `reveal rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${tile.cardBorder} ${tile.cardBg} ${tile.hoverBorder} ${tile.hoverBg} ${tile.hoverGlow} ` +
              (tile.href ? 'block cursor-pointer' : 'cursor-default');
            const inner = (
              <>
                <span className={`shrink-0 flex h-9 w-9 items-center justify-center rounded-lg border text-base ${tile.iconBg} ${tile.iconColor}`} aria-hidden="true">
                  <i className={tile.icon} />
                </span>
                <h3 className={`mt-3 font-display text-sm font-bold ${tile.titleColor}`}>
                  {tile.title}
                </h3>
                <p className={`mt-0.5 text-xs ${tile.tagColor}`}>
                  {tile.tag}
                </p>
              </>
            );
            return tile.href ? (
              <Link
                key={tile.title}
                href={tile.href}
                onClick={(e) => handleTileClick(e, tile.filterKey, tile.anchorId)}
                className={cardClass}
              >
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
