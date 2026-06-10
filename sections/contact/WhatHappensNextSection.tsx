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

        <div className="mt-14 grid grid-cols-1 divide-x divide-corematrix-border overflow-hidden rounded-2xl border border-corematrix-border sm:grid-cols-2 lg:grid-cols-4">
          {NEXT_STEPS.map((s) => (
            <div
              key={s.num}
              className="bg-corematrix-card p-9 transition-colors hover:bg-corematrix-card2"
            >
              <p className="font-display mb-4 text-[2.5rem] font-extrabold leading-none tracking-[-0.04em] text-corematrix-textDim">
                {s.num}
              </p>
              <span className="mb-3 block text-xl text-corematrix-green400" aria-hidden>
                <i className={s.icon} aria-hidden="true" />
              </span>
              <h3 className="mb-2 font-display text-sm font-bold text-corematrix-textPrimary">
                {s.title}
              </h3>
              <p className="mb-3 text-xs font-light leading-relaxed text-corematrix-textMuted">
                {s.body}
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-corematrix-green700/20 bg-corematrix-green900/20 px-3 py-1 font-display text-[0.65rem] font-semibold text-corematrix-green700">
                {s.timing}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
