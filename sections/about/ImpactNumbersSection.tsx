'use client';

import { Container } from '@/components/ui/Container';
import StatCounter from '@/components/shared/StatCounter';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type Impact = { count: number; suffix: string; label_en: string; label_ar: string; sub_en: string; sub_ar: string };

const IMPACTS: Impact[] = [
  {
    count: 50,
    suffix: '+',
    label_en: 'Projects Delivered',
    label_ar: 'مشروعاً تم تسليمها',
    sub_en: 'Across 12+ countries',
    sub_ar: 'في أكثر من 12 دولة'
  },
  {
    count: 98,
    suffix: '%',
    label_en: 'Client Retention Rate',
    label_ar: 'معدل الاحتفاظ بالعملاء',
    sub_en: 'Industry avg is 67%',
    sub_ar: 'متوسط الصناعة هو 67%'
  },
  {
    count: 3,
    suffix: 'x',
    label_en: 'Avg ROI for Clients',
    label_ar: 'متوسط عائد الاستثمار لعملائنا',
    sub_en: 'Within 6 months of launch',
    sub_ar: 'في غضون 6 أشهر من الإطلاق'
  },
  {
    count: 60,
    suffix: '%',
    label_en: 'Cost Reduction',
    label_ar: 'خفض التكاليف لعملائنا',
    sub_en: 'Via AI automation avg',
    sub_ar: 'عبر أتمتة الذكاء الاصطناعي في المتوسط'
  },
  {
    count: 30,
    suffix: '+',
    label_en: 'Happy Clients',
    label_ar: 'عميل سعيد بنجاحنا',
    sub_en: 'Startups to enterprises',
    sub_ar: 'من الشركات الناشئة إلى المؤسسات الكبرى'
  },
  {
    count: 5,
    suffix: '+',
    label_en: 'Years of Excellence',
    label_ar: 'سنوات من التميز الرقمي',
    sub_en: 'Growing every quarter',
    sub_ar: 'ننمو ونزدهر في كل ربع سنوي'
  },
  {
    count: 25,
    suffix: '+',
    label_en: 'Engineers On Staff',
    label_ar: 'مهندساً ضمن فريقنا',
    sub_en: 'AI, web, mobile, DevOps',
    sub_ar: 'الذكاء الاصطناعي، الويب، المحمول، السحابة'
  },
  {
    count: 12,
    suffix: '+',
    label_en: 'AI Systems Shipped',
    label_ar: 'أنظمة ذكاء اصطناعي مشحونة',
    sub_en: 'LLMs, agents, ML models',
    sub_ar: 'النماذج الكبيرة، الوكلاء، نماذج الآلة'
  },
];

export function ImpactNumbersSection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="impact-numbers"
      aria-labelledby="impact-numbers-heading"
      className="relative overflow-hidden border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.06] blur-[140px]"
        aria-hidden
      />

      <Container className="relative z-10">
        <MarketingSectionHeader
          label={t("IMPACT BY THE NUMBERS", "الأرقام تتحدث")}
          title={t("Results That Speak for Themselves", "نتائج ملموسة تتحدث عن نفسها")}
          titleId="impact-numbers-heading"
          description={t("Measurable outcomes from the projects we've delivered across the globe.", "مخرجات قابلة للقياس من المشاريع التي قمنا بتسليمها في جميع أنحاء العالم.")}
        />

        <div className="relative z-10 mt-12 grid grid-cols-2 divide-x divide-y divide-corematrix-border overflow-hidden rounded-2xl border border-corematrix-border lg:grid-cols-4">
          {IMPACTS.map((imp) => (
            <div
              key={imp.label_en}
              className="flex flex-col items-center bg-corematrix-card p-10 text-center transition-colors hover:bg-corematrix-card2"
            >
              <StatCounter
                count={imp.count}
                suffix={imp.suffix}
                label={language === 'ar' ? imp.label_ar : imp.label_en}
                sub={language === 'ar' ? imp.sub_ar : imp.sub_en}
                labelClassName="text-xs leading-snug text-corematrix-textMuted"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
