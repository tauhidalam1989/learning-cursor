'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type Industry = {
  icon: string;
  name_en: string;
  name_ar: string;
  iconColor: string;
  iconBg: string;
  cardBg: string;
  cardBorder: string;
  hoverBorder: string;
  hoverBg: string;
  hoverGlow: string;
};

const INDUSTRIES: Industry[] = [
  {
    icon: 'fas fa-hospital',
    name_en: 'Healthcare & MedTech',
    name_ar: 'الرعاية الصحية والتكنولوجيا الطبية',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    cardBg: 'bg-cyan-950/20',
    cardBorder: 'border-cyan-500/15',
    hoverBorder: 'hover:border-cyan-500/40',
    hoverBg: 'hover:bg-cyan-950/35',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]',
  },
  {
    icon: 'fas fa-wallet',
    name_en: 'Fintech & Banking',
    name_ar: 'التكنولوجيا المالية والخدمات المصرفية',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    cardBg: 'bg-amber-950/20',
    cardBorder: 'border-amber-500/15',
    hoverBorder: 'hover:border-amber-500/40',
    hoverBg: 'hover:bg-amber-950/35',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]',
  },
  {
    icon: 'fas fa-shopping-bag',
    name_en: 'eCommerce & Retail',
    name_ar: 'التجارة الإلكترونية والتجزئة',
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10',
    cardBg: 'bg-indigo-950/20',
    cardBorder: 'border-indigo-500/15',
    hoverBorder: 'hover:border-indigo-500/40',
    hoverBg: 'hover:bg-indigo-950/35',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]',
  },
  {
    icon: 'fas fa-graduation-cap',
    name_en: 'EdTech & E-Learning',
    name_ar: 'تكنولوجيا التعليم والتعلم الإلكتروني',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10',
    cardBg: 'bg-purple-950/20',
    cardBorder: 'border-purple-500/15',
    hoverBorder: 'hover:border-purple-500/40',
    hoverBg: 'hover:bg-purple-950/35',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]',
  },
  {
    icon: 'fas fa-building',
    name_en: 'Real Estate & PropTech',
    name_ar: 'العقارات وتكنولوجيا العقار',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10',
    cardBg: 'bg-orange-950/20',
    cardBorder: 'border-orange-500/15',
    hoverBorder: 'hover:border-orange-500/40',
    hoverBg: 'hover:bg-orange-950/35',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]',
  },
  {
    icon: 'fas fa-truck',
    name_en: 'Logistics & Supply Chain',
    name_ar: 'الخدمات اللوجستية وسلاسل الإمداد',
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-500/10',
    cardBg: 'bg-sky-950/20',
    cardBorder: 'border-sky-500/15',
    hoverBorder: 'hover:border-sky-500/40',
    hoverBg: 'hover:bg-sky-950/35',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]',
  },
  {
    icon: 'fas fa-handshake',
    name_en: 'HR Tech & Recruitment',
    name_ar: 'تكنولوجيا الموارد البشرية والتوظيف',
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10',
    cardBg: 'bg-rose-950/20',
    cardBorder: 'border-rose-500/15',
    hoverBorder: 'hover:border-rose-500/40',
    hoverBg: 'hover:bg-rose-950/35',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]',
  },
  {
    icon: 'fas fa-network-wired',
    name_en: 'SaaS & Technology',
    name_ar: 'البرمجيات كخدمة والتكنولوجيا',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    cardBg: 'bg-emerald-950/20',
    cardBorder: 'border-emerald-500/15',
    hoverBorder: 'hover:border-emerald-500/40',
    hoverBg: 'hover:bg-emerald-950/35',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]',
  },
];

export function IndustriesSection() {
  const { language, t } = useLanguage();

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-16 lg:py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t("INDUSTRIES", "القطاعات")}
          title={t("We Know Your Industry", "نحن نعرف قطاعك")}
          titleId="industries-heading"
          description={t("Deep domain expertise across sectors that demand reliable, intelligent technology.", "خبرة عميقة في المجالات عبر القطاعات التي تتطلب تكنولوجيا موثوقة وذكية.")}
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {INDUSTRIES.map((ind) => (
            <article
              key={ind.name_en}
              className={`reveal flex items-center gap-4 rounded-xl border px-5 py-5 transition-all duration-300 hover:-translate-y-1 ${ind.cardBorder} ${ind.cardBg} ${ind.hoverBorder} ${ind.hoverBg} ${ind.hoverGlow}`}
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg ${ind.iconBg} ${ind.iconColor}`} aria-hidden="true">
                <i className={ind.icon} />
              </span>
              <span className="font-medium text-corematrix-textPrimary text-sm sm:text-base leading-snug">
                {language === 'ar' ? ind.name_ar : ind.name_en}
              </span>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

