'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type Step = {
  num: string;
  title_en: string;
  title_ar: string;
  body_en: string;
  body_ar: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  hoverBorder: string;
  hoverBg: string;
  hoverGlow: string;
};

const STEPS: Step[] = [
  {
    num: '01',
    title_en: 'Discovery & Strategy',
    title_ar: 'الاستكشاف والاستراتيجية',
    body_en: 'We deep-dive into your goals, audit your tech landscape, and define a clear delivery roadmap.',
    body_ar: 'نحن نتعمق في أهدافك، وندقق في مشهدك التقني، ونحدد خارطة طريق واضحة للتسليم.',
    badgeBg: 'bg-cyan-500/10',
    badgeBorder: 'border-cyan-500/20',
    badgeText: 'text-cyan-400',
    hoverBorder: 'hover:border-cyan-400',
    hoverBg: 'hover:bg-cyan-500',
    hoverGlow: 'hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]',
  },
  {
    num: '02',
    title_en: 'Architecture & Design',
    title_ar: 'البنية والتصميم',
    body_en: 'Scalable system architecture and pixel-perfect UIs designed before writing a single line of code.',
    body_ar: 'بنية نظام قابلة للتوسع وواجهات مستخدم مثالية للبكسل تم تصميمها قبل كتابة سطر كود واحد.',
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/20',
    badgeText: 'text-amber-400',
    hoverBorder: 'hover:border-amber-400',
    hoverBg: 'hover:bg-amber-500',
    hoverGlow: 'hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]',
  },
  {
    num: '03',
    title_en: 'Agile Development',
    title_ar: 'التطوير المرن',
    body_en: 'Sprint-based development with weekly demos, continuous feedback, and radical transparency.',
    body_ar: 'تطوير قائم على فترات قصيرة (sprints) مع عروض أسبوعية، وملاحظات مستمرة، وشفافية مطلقة.',
    badgeBg: 'bg-indigo-500/10',
    badgeBorder: 'border-indigo-500/20',
    badgeText: 'text-indigo-400',
    hoverBorder: 'hover:border-indigo-400',
    hoverBg: 'hover:bg-indigo-500',
    hoverGlow: 'hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]',
  },
  {
    num: '04',
    title_en: 'AI Integration',
    title_ar: 'دمج الذكاء الاصطناعي',
    body_en: 'We layer AI capabilities — automations, LLM features, intelligent workflows — at exactly the right stage.',
    body_ar: 'نحن نضيف قدرات الذكاء الاصطناعي — الأتمتة، ميزات LLM، وسير العمل الذكي — في المرحلة المناسبة تماماً.',
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/20',
    badgeText: 'text-purple-400',
    hoverBorder: 'hover:border-purple-400',
    hoverBg: 'hover:bg-purple-500',
    hoverGlow: 'hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]',
  },
  {
    num: '05',
    title_en: 'Launch & Scale',
    title_ar: 'الإطلاق والتوسع',
    body_en: 'We deploy, monitor, optimize, and stay with you as your product and user base grows.',
    body_ar: 'نحن ننشر ونراقب ونحسن ونبقى معك مع نمو منتجك وقاعدة مستخدميك.',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/20',
    badgeText: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-400',
    hoverBg: 'hover:bg-emerald-500',
    hoverGlow: 'hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]',
  },
];

export function ProcessSection() {
  const { language, t } = useLanguage();

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-16 lg:py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t("OUR PROCESS", "عمليتنا")}
          title={t("From Idea to Intelligent Product — Fast", "من الفكرة إلى منتج ذكي — وبسرعة")}
          titleId="process-heading"
          description={t("A proven, agile process with complete transparency at every stage.", "عملية مرنة ومثبتة مع شفافية كاملة في كل مرحلة.")}
        />

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => {
            const delayClass =
              i === 1
                ? 'reveal-delay-1'
                : i === 2
                  ? 'reveal-delay-2'
                  : i === 3
                    ? 'reveal-delay-3'
                    : i === 4
                      ? 'reveal-delay-4'
                      : '';
            return (
              <article
                key={step.num}
                className={`relative flex flex-col items-center text-center reveal ${delayClass}`}
              >
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute left-[55%] right-[-55%] top-7 hidden h-px bg-corematrix-border2 lg:block"
                    aria-hidden
                  />
                )}
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 font-display text-lg font-extrabold transition-all duration-300 hover:text-white cursor-default ${step.badgeBg} ${step.badgeBorder} ${step.badgeText} ${step.hoverBg} ${step.hoverBorder} ${step.hoverGlow}`}>
                  {step.num}
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-corematrix-textPrimary sm:text-lg">
                  {language === 'ar' ? step.title_ar : step.title_en}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-corematrix-textSecondary">
                  {language === 'ar' ? step.body_ar : step.body_en}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

