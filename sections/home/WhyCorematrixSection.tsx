'use client';

import { Container } from '@/components/ui/Container';
import { useCountUp } from '@/hooks/useCountUp';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type Feature = {
  title_en: string;
  title_ar: string;
  body_en: string;
  body_ar: string;
  iconBg: string;
  iconColor: string;
};

const FEATURES: Feature[] = [
  {
    title_en: 'AI-First Engineering',
    title_ar: 'الهندسة المرتكزة على الذكاء الاصطناعي',
    body_en: 'Every project built with intelligent capabilities in mind from day one.',
    body_ar: 'كل مشروع يتم بناؤه مع وضع القدرات الذكية في الاعتبار منذ اليوم الأول.',
    iconBg: 'bg-purple-700/30',
    iconColor: 'text-purple-400',
  },
  {
    title_en: "Next.js & Modern Stack",
    title_ar: "بنية Next.js والتقنيات الحديثة",
    body_en: "We use the same tech stack the world's best products run on — Next.js, TypeScript, Python.",
    body_ar: "نحن نستخدم نفس حزمة التقنيات التي تعمل عليها أفضل المنتجات في العالم — Next.js و TypeScript و Python.",
    iconBg: 'bg-sky-700/30',
    iconColor: 'text-sky-400',
  },
  {
    title_en: 'Business-Outcome Focused',
    title_ar: 'التركيز على نتائج الأعمال',
    body_en: 'We measure success by your growth metrics, not just code delivery milestones.',
    body_ar: 'نحن نقيس النجاح بمقاييس نموك، وليس فقط بمراحل تسليم الكود.',
    iconBg: 'bg-amber-700/30',
    iconColor: 'text-amber-400',
  },
  {
    title_en: 'Transparent & Agile',
    title_ar: 'الشفافية والمرونة',
    body_en: 'Weekly sprint demos, shared dashboards, no black-box development ever.',
    body_ar: 'عروض أسبوعية لنتائج العمل، لوحات معلومات مشتركة، لا يوجد تطوير غامض على الإطلاق.',
    iconBg: 'bg-rose-700/30',
    iconColor: 'text-rose-400',
  },
  {
    title_en: 'End-to-End Delivery',
    title_ar: 'التسليم من البداية إلى النهاية',
    body_en: 'Strategy → Design → Development → Launch → Ongoing Support. We own it all.',
    body_ar: 'الاستراتيجية ← التصميم ← التطوير ← الإطلاق ← الدعم المستمر. نحن نتولى كل شيء.',
    iconBg: 'bg-teal-700/30',
    iconColor: 'text-teal-400',
  },
];

type Stat = {
  count: number;
  suffix: string;
  label_en: string;
  label_ar: string;
};

const STATS: Stat[] = [
  { count: 50, suffix: '+', label_en: 'Projects\nDelivered', label_ar: 'مشروعاً\nتم تسليمه' },
  { count: 30, suffix: '+', label_en: 'Happy Clients\nWorldwide', label_ar: 'عميلاً سعيداً\nحول العالم' },
  { count: 5, suffix: '+', label_en: 'Years of\nExcellence', label_ar: 'سنوات من\nالتميز' },
  { count: 98, suffix: '%', label_en: 'Client\nRetention Rate', label_ar: 'معدل\nالاحتفاظ بالعملاء' },
];

export function WhyCorematrixSection() {
  const { language, t } = useLanguage();
  const ref50 = useCountUp(50, '+');
  const ref30 = useCountUp(30, '+');
  const ref5 = useCountUp(5, '+');
  const ref98 = useCountUp(98, '%');

  const refs = [ref50, ref30, ref5, ref98];

  return (
    <section
      id="why-corematrix"
      aria-labelledby="why-corematrix-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-16 lg:py-24"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="reveal">
            <MarketingSectionHeader
              align="left"
              descriptionMax="none"
              label={t("WHY COREMATRIX", "لماذا كورماتريكس")}
              title={t("Your Trusted Long-Term Tech Partner", "شريكك التقني الموثوق على المدى الطويل")}
              titleId="why-corematrix-heading"
              description={t(
                "We're more than a service provider — we're your technical co-founder for the long haul.",
                "نحن أكثر من مجرد مزود خدمة — نحن شريكك التقني المؤسس على المدى الطويل."
              )}
            />
            <div className="mt-8 space-y-6">
              {FEATURES.map((f) => (
                <div key={f.title_en} className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${f.iconBg}`}
                    aria-hidden
                  >
                    <svg
                      className={`h-3.5 w-3.5 ${f.iconColor}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-corematrix-textPrimary">
                      {language === 'ar' ? f.title_ar : f.title_en}
                    </h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-corematrix-textSecondary">
                      {language === 'ar' ? f.body_ar : f.body_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="grid grid-cols-2 gap-8 rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-10">
              {STATS.map((stat, i) => (
                <div key={stat.label_en}>
                  <span
                    ref={refs[i]}
                    className="block text-5xl font-extrabold tracking-tight text-corematrix-green400"
                  />
                  <p className="mt-2 whitespace-pre-line text-sm leading-snug text-corematrix-textMuted">
                    {language === 'ar' ? stat.label_ar : stat.label_en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
