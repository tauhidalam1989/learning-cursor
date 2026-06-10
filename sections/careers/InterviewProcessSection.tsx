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
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className="grid grid-cols-[72px_1fr] border-b border-corematrix-border last:border-0 transition-colors hover:bg-corematrix-green900/[0.02]"
            >
              <div className="flex items-center justify-center border-r border-corematrix-border bg-corematrix-card2 py-7">
                <span className="font-display text-2xl font-extrabold text-corematrix-textDim">
                  {step.num}
                </span>
              </div>
              <div className="flex items-start gap-4 bg-corematrix-card p-6">
                <span className="mt-1 shrink-0 text-xl text-corematrix-green400" aria-hidden>
                  <i className={step.icon} />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-corematrix-textPrimary">
                    {t(step.title, stepTitleTranslations[step.title] ?? step.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-corematrix-textSecondary">
                    {t(step.body, stepBodyTranslations[step.body] ?? step.body)}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-corematrix-green700/20 bg-corematrix-green900/20 px-3 py-1 font-display text-[0.65rem] font-semibold text-corematrix-green700">
                    ~ {t(step.timing, stepTimingTranslations[step.timing] ?? step.timing)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
