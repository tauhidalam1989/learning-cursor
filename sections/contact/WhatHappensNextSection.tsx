'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

export type NextStep = {
  num: string;
  icon: string;
  title: string;
  body: string;
  timing: string;
};

const STEPS_THEMES = [
  {
    // Step 1: Amber
    card: 'border-amber-500/20 bg-amber-950/10 hover:border-amber-400/50 hover:bg-amber-950/20 shadow-[0_4px_20px_rgba(245,158,11,0.05)]',
    numColor: 'text-amber-500/30 group-hover:text-amber-400/40 transition-colors duration-300',
    iconColor: 'text-amber-400 group-hover:scale-110 duration-300',
    titleColor: 'text-amber-400 group-hover:text-amber-300 transition-colors duration-300',
    bodyColor: 'text-amber-300/70 group-hover:text-amber-200/90 transition-colors duration-300',
    badge: 'border-amber-500/25 bg-amber-950/20 text-amber-400',
  },
  {
    // Step 2: Emerald
    card: 'border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-400/50 hover:bg-emerald-950/20 shadow-[0_4px_20px_rgba(16,185,129,0.05)]',
    numColor: 'text-emerald-500/30 group-hover:text-emerald-400/40 transition-colors duration-300',
    iconColor: 'text-emerald-400 group-hover:scale-110 duration-300',
    titleColor: 'text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300',
    bodyColor: 'text-emerald-300/70 group-hover:text-emerald-200/90 transition-colors duration-300',
    badge: 'border-emerald-500/25 bg-emerald-950/20 text-emerald-400',
  },
  {
    // Step 3: Sky
    card: 'border-sky-500/20 bg-sky-950/10 hover:border-sky-400/50 hover:bg-sky-950/20 shadow-[0_4px_20px_rgba(14,165,233,0.05)]',
    numColor: 'text-sky-500/30 group-hover:text-sky-400/40 transition-colors duration-300',
    iconColor: 'text-sky-400 group-hover:scale-110 duration-300',
    titleColor: 'text-sky-400 group-hover:text-sky-300 transition-colors duration-300',
    bodyColor: 'text-sky-300/70 group-hover:text-sky-200/90 transition-colors duration-300',
    badge: 'border-sky-500/25 bg-sky-950/20 text-sky-400',
  },
  {
    // Step 4: Purple
    card: 'border-purple-500/20 bg-purple-950/10 hover:border-purple-400/50 hover:bg-purple-950/20 shadow-[0_4px_20px_rgba(168,85,247,0.05)]',
    numColor: 'text-purple-500/30 group-hover:text-purple-400/40 transition-colors duration-300',
    iconColor: 'text-purple-400 group-hover:scale-110 duration-300',
    titleColor: 'text-purple-400 group-hover:text-purple-300 transition-colors duration-300',
    bodyColor: 'text-purple-300/70 group-hover:text-purple-200/90 transition-colors duration-300',
    badge: 'border-purple-500/25 bg-purple-950/20 text-purple-400',
  },
];

export function WhatHappensNextSection() {
  const { t } = useLanguage();

  const NEXT_STEPS: NextStep[] = [
    {
      num: '01',
      icon: 'fas fa-eye',
      title: t('We Review Your Brief', 'نحن نراجع ملخص مشروعك'),
      body: t(
        'Our tech lead personally reads every inquiry. We look at your project scope, goals, and current stage before responding — so our reply is actually useful.',
        'يقرأ رئيس القسم التقني لدينا كل استفسار شخصياً. نحن ننظر في نطاق مشروعك وأهدافك ومرحلته الحالية قبل الرد — حتى يكون ردنا مفيداً وعملياً بالكامل.'
      ),
      timing: t('Within a few hours', 'في غضون بضع ساعات'),
    },
    {
      num: '02',
      icon: 'far fa-edit',
      title: t('Personalised Response', 'رد شخصي ومخصص'),
      body: t(
        "You receive a tailored response — not a template. We'll share initial thoughts, ask the right clarifying questions, and suggest a call if there's a strong fit.",
        "سوف تتلقى رداً مخصصاً — وليس قالباً جاهزاً. سنشاركك بعض الأفكار الأولية، ونطرح الأسئلة التوضيحية الصحيحة، ونقترح إجراء مكالمة إذا كان هناك توافق قوي."
      ),
      timing: t('Within 24 hours', 'في غضون 24 ساعة'),
    },
    {
      num: '03',
      icon: 'fas fa-phone-alt',
      title: t('Discovery Call', 'مكالمة استكشافية'),
      body: t(
        "A free 30-minute call with our tech lead. No pitch deck — just an honest conversation about your problem, your goals, and whether we're the right team for you.",
        "مكالمة مجانية مدتها 30 دقيقة مع رئيس القسم التقني لدينا. لا توجد عروض ترويجية صعبة — مجرد محادثة صادقة حول مشكلتك وأهدافك وما إذا كنا الفريق الأنسب لك."
      ),
      timing: t('Scheduled same week', 'تُجدول في نفس الأسبوع'),
    },
    {
      num: '04',
      icon: 'far fa-file-alt',
      title: t('Detailed Proposal', 'عرض مشروع تفصيلي'),
      body: t(
        "If we're a fit: a comprehensive proposal covering scope, tech approach, team composition, timeline, and fixed pricing — all agreed before any work begins.",
        "إذا كنا متوافقين: سنقدم عرضاً شاملاً يغطي النطاق، والنهج التقني، وتكوين فريق العمل، والجدول الزمني، والتسعير الثابت — ويتم الاتفاق على كل شيء قبل بدء العمل."
      ),
      timing: t('Within 48–72 hours', 'في غضون 48–72 ساعة'),
    },
  ];

  return (
    <section
      id="what-happens-next"
      aria-labelledby="what-happens-next-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t("AFTER YOU SEND", "بعد الإرسال")}
          title={t("What Happens After You Reach Out", "ماذا يحدث بعد أن تتواصل معنا")}
          titleId="what-happens-next-heading"
          description={t("Transparent process from first message to signed proposal.", "عملية شفافة وواضحة من الرسالة الأولى حتى توقيع عرض المشروع النهائي.")}
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NEXT_STEPS.map((s, idx) => {
            const theme = STEPS_THEMES[idx % STEPS_THEMES.length];
            return (
              <div
                key={s.num}
                className={`group rounded-2xl border p-9 transition-all duration-300 ${theme.card}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className={`font-display text-[2.5rem] font-extrabold leading-none tracking-[-0.04em] ${theme.numColor}`}>
                    {s.num}
                  </p>
                  <span className={`text-xl transition-transform ${theme.iconColor}`} aria-hidden>
                    <i className={s.icon} aria-hidden="true" />
                  </span>
                </div>
                <h3 className={`mb-2 font-display text-sm font-bold ${theme.titleColor}`}>
                  {s.title}
                </h3>
                <p className={`mb-4 text-xs font-light leading-relaxed ${theme.bodyColor}`}>
                  {s.body}
                </p>
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-display text-[0.65rem] font-semibold transition-colors duration-300 ${theme.badge}`}>
                  {s.timing}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
