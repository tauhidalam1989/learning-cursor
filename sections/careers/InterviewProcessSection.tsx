'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { PROCESS_STEPS } from '@/data/careersData';
import { useLanguage } from '@/context/LanguageContext';

// Explicitly typed translation maps for i18n
const stepTitleTranslations: Record<string, string> = {
  'Application Review': 'مراجعة طلب التقديم',
  'Intro Call (30 min)': 'مكالمة تعريفية (30 دقيقة)',
  'Technical Assessment': 'التقييم الفني',
  'Team Interview (60 min)': 'مقابلة الفريق (60 دقيقة)',
  'Offer & Onboarding': 'العرض والتهيئة للعمل',
};

const stepBodyTranslations: Record<string, string> = {
  "We read every application personally. No automated screening. You'll hear from us within 48 hours with specific, useful feedback.":
    'نحن نقرأ كل طلب تقديم شخصياً. لا يوجد فحص آلي. ستتلقى رداً منا في غضون 48 ساعة بملاحظات محددة ومفيدة.',
  "A relaxed video call with the hiring manager. We'll tell you about the role honestly — including the hard parts. You'll have time to ask anything.":
    'مكالمة فيديو ودية مع مدير التوظيف. سنخبرك عن الدور الوظيفي بصدق — بما في ذلك الأجزاء الصعبة. سيكون لديك الوقت الكافي لطرح أي أسئلة.',
  'A take-home challenge (2–3 hours max) or a live collaborative session — your choice. Real problems, not trick puzzles. Paid for senior roles.':
    'تحدٍ منزلي (ساعتان إلى 3 ساعات كحد أقصى) أو جلسة تعاونية مباشرة — اختيارك. مشاكل حقيقية، وليست ألغازاً مخادعة. مدفوع الأجر للأدوار العليا.',
  "Meet 2–3 team members you'd actually work with. Part technical deep-dive, part culture conversation. We want to see how you think and communicate.":
    'قابل 2 إلى 3 من أعضاء الفريق الذين ستعمل معهم بالفعل. جزء من المقابلة تعمق فني، وجزء آخر محادثة حول الثقافة والاندماج. نريد أن نرى كيف تفكر وتتواصل.',
  'Decision within 24 hours of your final interview. Transparent offer with full breakdown. Structured 30/60/90-day onboarding plan from day one.':
    'اتخاذ القرار في غضون 24 ساعة من المقابلة النهائية. عرض شفاف مع تفصيل كامل. خطة تهيئة هيكلية لمدة 30/60/90 يوماً من اليوم الأول.',
};

const stepTimingTranslations: Record<string, string> = {
  '48 hours': '48 ساعة',
  '30 minutes': '30 دقيقة',
  '2–3 hours': 'ساعتان إلى 3 ساعات',
  '60 minutes': '60 دقيقة',
  '24 hours after final': '24 ساعة بعد المقابلة النهائية',
};

const STEP_THEMES = [
  {
    // Purple
    numColor: 'text-purple-400',
    iconColor: 'text-purple-400',
    badgeClass: 'border-purple-500/20 bg-purple-950/20 text-purple-400',
    hoverBg: 'hover:bg-purple-950/10',
    titleColor: 'text-purple-400 group-hover:text-purple-300',
  },
  {
    // Sky
    numColor: 'text-sky-400',
    iconColor: 'text-sky-400',
    badgeClass: 'border-sky-500/20 bg-sky-950/20 text-sky-400',
    hoverBg: 'hover:bg-sky-950/10',
    titleColor: 'text-sky-400 group-hover:text-sky-300',
  },
  {
    // Amber
    numColor: 'text-amber-400',
    iconColor: 'text-amber-400',
    badgeClass: 'border-amber-500/20 bg-amber-950/20 text-amber-400',
    hoverBg: 'hover:bg-amber-950/10',
    titleColor: 'text-amber-400 group-hover:text-amber-300',
  },
  {
    // Rose
    numColor: 'text-rose-400',
    iconColor: 'text-rose-400',
    badgeClass: 'border-rose-500/20 bg-rose-950/20 text-rose-400',
    hoverBg: 'hover:bg-rose-950/10',
    titleColor: 'text-rose-400 group-hover:text-rose-300',
  },
  {
    // Teal
    numColor: 'text-teal-400',
    iconColor: 'text-teal-400',
    badgeClass: 'border-teal-500/20 bg-teal-950/20 text-teal-400',
    hoverBg: 'hover:bg-teal-950/10',
    titleColor: 'text-teal-400 group-hover:text-teal-300',
  },
];

export function InterviewProcessSection() {
  const { t } = useLanguage();

  return (
    <section
      id="careers-process"
      aria-labelledby="careers-process-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t('HIRING PROCESS', 'عملية التوظيف')}
          title={t('A Hiring Process That Respects Your Time', 'عملية توظيف تحترم وقتك')}
          titleId="careers-process-heading"
          description={t(
            'No endless rounds. No trick questions. We move fast and give honest feedback.',
            'لا جولات لا نهاية لها. لا أسئلة مخادعة. نتحرك بسرعة ونقدم ملاحظات صادقة.'
          )}
        />

        <div className="mt-12 overflow-hidden rounded-2xl border border-corematrix-border">
          {PROCESS_STEPS.map((step, idx) => {
            const theme = STEP_THEMES[idx % STEP_THEMES.length];
            return (
              <div
                key={step.num}
                className={`group grid grid-cols-[72px_1fr] border-b border-corematrix-border last:border-0 transition-colors duration-300 ${theme.hoverBg}`}
              >
                <div className="flex items-center justify-center border-r border-corematrix-border bg-corematrix-card2 py-7">
                  <span className={`font-display text-2xl font-extrabold transition-colors duration-300 ${theme.numColor}`}>
                    {step.num}
                  </span>
                </div>
                <div className="flex items-start gap-4 bg-corematrix-card p-6">
                  <span className={`mt-1 shrink-0 text-xl transition-colors duration-300 ${theme.iconColor}`} aria-hidden>
                    <i className={step.icon} />
                  </span>
                  <div>
                    <h3 className={`font-display text-base font-bold transition-colors duration-300 ${theme.titleColor}`}>
                      {t(step.title, stepTitleTranslations[step.title] ?? step.title)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-corematrix-textSecondary">
                      {t(step.body, stepBodyTranslations[step.body] ?? step.body)}
                    </p>
                    <span className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-display text-[0.65rem] font-semibold transition-colors duration-300 ${theme.badgeClass}`}>
                      ~ {t(step.timing, stepTimingTranslations[step.timing] ?? step.timing)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
