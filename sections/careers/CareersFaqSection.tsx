'use client';

import { siteConfig } from '@/config/site';
import { TwoColumnFaqSection } from '@/components/shared/TwoColumnFaqSection';
import { useLanguage } from '@/context/LanguageContext';

const CAREERS_FAQ = [
  {
    q: 'Do I need to be in a specific timezone to work at Corematrix?',
    a: "No. We have team members in 12+ countries across North America, Europe, Africa, and Asia. We maintain a 4-hour overlap window (typically 2pm–6pm GMT) for real-time collaboration. Outside that, you work whenever you're most productive.",
  },
  {
    q: 'What does the technical assessment look like?',
    a: "We offer a take-home challenge (2–3 hours, paid for senior roles) or a live collaborative session — your choice. We use real problems we've faced in production, not abstract CS puzzles. We care about how you approach a problem, not whether you get the \"right\" answer.",
  },
  {
    q: "I don't have a degree — does that matter?",
    a: "Not at all. We hire based on demonstrated skill and potential. Show us what you've built, what you've shipped, and how you think — that matters infinitely more than credentials. Several of our senior engineers are self-taught or bootcamp graduates.",
  },
  {
    q: 'How does compensation work for international candidates?',
    a: 'We pay competitive rates benchmarked to the global market for senior technical talent — not adjusted down for lower-cost-of-living locations. We use Deel for international contractor payments and can hire through local employer-of-record services in most countries.',
  },
  {
    q: 'What does onboarding look like for new hires?',
    a: "You'll have a structured 30/60/90-day plan before your first day. Week 1 is all setup and context — codebase walkthroughs, architecture docs, meeting everyone. By week 2 you'll ship your first PR. By day 30 you'll own a feature end-to-end. Every new hire gets a dedicated onboarding buddy.",
  },
  {
    q: 'Is there room to grow into leadership at Corematrix?',
    a: 'Yes — and it happens fast for people who want it. We prefer to promote from within. We have both IC and management tracks, and we don\'t force engineers into management to grow their career. Clear promotion criteria are shared at hiring and reviewed quarterly.',
  },
] as const;

// Explicitly typed translation maps for i18n
const faqQuestionTranslations: Record<string, string> = {
  'Do I need to be in a specific timezone to work at Corematrix?': 'هل يجب أن أكون في منطقة زمنية محددة للعمل في كورماتريكس؟',
  'What does the technical assessment look like?': 'كيف تبدو عملية التقييم الفني؟',
  "I don't have a degree — does that matter?": 'أنا لا أحمل شهادة جامعية — هل يهم ذلك؟',
  'How does compensation work for international candidates?': 'كيف تعمل التعويضات والرواتب للمرشحين الدوليين؟',
  'What does onboarding look like for new hires?': 'كيف تبدو عملية التهيئة والإعداد للموظفين الجدد؟',
  'Is there room to grow into leadership at Corematrix?': 'هل هناك مجال للنمو إلى مناصب قيادية في كورماتريكس؟',
};

const faqAnswerTranslations: Record<string, string> = {
  "No. We have team members in 12+ countries across North America, Europe, Africa, and Asia. We maintain a 4-hour overlap window (typically 2pm–6pm GMT) for real-time collaboration. Outside that, you work whenever you're most productive.":
    'لا. لدينا أعضاء فريق في أكثر من 12 دولة في أمريكا الشمالية وأوروبا وأفريقيا وآسيا. نحافظ على نافذة توافق مدتها 4 ساعات (عادةً من 2 مساءً إلى 6 مساءً بتوقيت غرينتش) للتعاون المباشر. وخارج ذلك، يمكنك العمل وقتما تكون أكثر إنتاجية.',
  "We offer a take-home challenge (2–3 hours, paid for senior roles) or a live collaborative session — your choice. We use real problems we've faced in production, not abstract CS puzzles. We care about how you approach a problem, not whether you get the \"right\" answer.":
    'نحن نقدم تحدياً منزلياً (من ساعتين إلى 3 ساعات، مدفوع الأجر للأدوار العليا) أو جلسة تعاونية مباشرة — اختيارك. نحن نستخدم مشكلات حقيقية واجهناها في بيئة الإنتاج الفعلي، وليس ألغاز علوم الحاسب المجردة. نحن نهتم بكيفية تعاملك مع المشكلة، وليس بحصولك على الإجابة "الصحيحة" فحسب.',
  "Not at all. We hire based on demonstrated skill and potential. Show us what you've built, what you've shipped, and how you think — that matters infinitely more than credentials. Several of our senior engineers are self-taught or bootcamp graduates.":
    'ليس على الإطلاق. نحن نوظف بناءً على المهارات المثبتة والإمكانيات. أرنا ما قمت ببنائه وشحنه وكيف تفكر — هذا يهم أكثر بكثير من الشهادات. العديد من مهندسينا الكبار يعتمدون على التعلم الذاتي أو خريجي معسكرات التدريب.',
  'We pay competitive rates benchmarked to the global market for senior technical talent — not adjusted down for lower-cost-of-living locations. We use Deel for international contractor payments and can hire through local employer-of-record services in most countries.':
    'نحن ندفع رواتب تنافسية قياساً بالسوق العالمية للمواهب التقنية العليا — ولا يتم تخفيضها للمناطق ذات التكلفة المعيشية المنخفضة. نستخدم Deel لمدفوعات المتعاقدين الدوليين ويمكننا التوظيف من خلال خدمات صاحب العمل المحلي المسجل في معظم البلدان.',
  "You'll have a structured 30/60/90-day plan before your first day. Week 1 is all setup and context — codebase walkthroughs, architecture docs, meeting everyone. By week 2 you'll ship your first PR. By day 30 you'll own a feature end-to-end. Every new hire gets a dedicated onboarding buddy.":
    'سيكون لديك خطة هيكلية للمدد 30/60/90 يوماً قبل يومك الأول. الأسبوع الأول مخصص بالكامل للإعداد وفهم السياق — جولات في الكود، ووثائق البنية، والتعرف على الجميع. بحلول الأسبوع الثاني ستشحن أول كود لك (PR). وبحلول اليوم 30 ستتملك ميزة برمجية بالكامل. يحصل كل موظف جديد على شريك مخصص للمساعدة والتهيئة.',
  "Yes — and it happens fast for people who want it. We prefer to promote from within. We have both IC and management tracks, and we don't force engineers into management to grow their career. Clear promotion criteria are shared at hiring and reviewed quarterly.":
    'نعم — ويحدث ذلك بسرعة لمن يرغب فيه. نحن نفضل الترقية من الداخل. لدينا مساران للمساهمة الفردية (IC) والإدارة، ولا نجبر المهندسين على الانتقال للإدارة لتطوير مسارهم المهني. تتم مشاركة معايير الترقية الواضحة عند التوظيف ومراجعتها ربع سنوي.',
};

export function CareersFaqSection() {
  const { t } = useLanguage();

  const translatedFaqs = CAREERS_FAQ.map((item) => ({
    q: t(item.q, faqQuestionTranslations[item.q] ?? item.q),
    a: t(item.a, faqAnswerTranslations[item.a] ?? item.a),
  }));

  return (
    <TwoColumnFaqSection
      sectionId="careers-faq"
      headingId="careers-faq-heading"
      label={t('FAQ', 'الأسئلة الشائعة')}
      title={t('Your Questions, Answered Honestly', 'إجابات صادقة لأسئلتك')}
      description={t(
        'Everything you need to know about working at Corematrix. Still have questions? Reach out — we respond to every email.',
        'كل ما تحتاج إلى معرفته حول العمل في كورماتريكس. هل لا تزال لديك أسئلة؟ تواصل معنا — نحن نرد على كل بريد إلكتروني.'
      )}
      items={translatedFaqs}
      cta={
        <a
          href={`mailto:${siteConfig.careersEmail}`}
          className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
        >
          {t('Email Our Hiring Team →', 'راسل فريق التوظيف لدينا →')}
        </a>
      }
    />
  );
}
