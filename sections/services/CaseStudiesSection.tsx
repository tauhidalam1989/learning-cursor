'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type CaseStudy = {
  category: string;
  emoji: string;
  title: string;
  description: string;
  metrics: { value: string; label: string }[];
};

const CASE_STUDIES: CaseStudy[] = [
  {
    category: 'AI Automation',
    emoji: 'fas fa-robot',
    title: 'AI Document Processing Platform for a Legal Tech Startup',
    description:
      'Built an end-to-end AI system that processes contracts, extracts key clauses, flags risks, and generates summaries — replacing 8 hours of manual review per document.',
    metrics: [
      { value: '92%', label: 'Time saved' },
      { value: '10k+', label: 'Docs/month' },
      { value: '8 wks', label: 'Delivery' },
    ],
  },
  {
    category: 'SaaS Platform',
    emoji: 'fas fa-cloud',
    title: 'Multi-Tenant SaaS Analytics Platform — 0 to $1M ARR',
    description:
      'Architected and built a complete B2B SaaS analytics platform from scratch, including multi-tenancy, Stripe billing, custom dashboards, and an embedded AI insights engine.',
    metrics: [
      { value: '$1M', label: 'ARR in 9mo' },
      { value: '200+', label: 'Enterprise clients' },
      { value: '14 wks', label: 'To launch' },
    ],
  },
  {
    category: 'Web Application',
    emoji: 'fas fa-code',
    title: 'Enterprise Internal Tool — Replaced $240k/yr SaaS Subscriptions',
    description:
      'Custom internal operations platform for a 500-person company, replacing three expensive SaaS tools with one unified system tailored to their exact workflows.',
    metrics: [
      { value: '$240k', label: 'Annual savings' },
      { value: '500', label: 'Daily users' },
      { value: '10 wks', label: 'Build time' },
    ],
  },
];

// Translation maps for i18n
const categoryTranslations: Record<string, string> = {
  'AI Automation': 'أتمتة الذكاء الاصطناعي',
  'SaaS Platform': 'منصات SaaS',
  'Web Application': 'تطبيقات الويب',
};

const titleTranslations: Record<string, string> = {
  'AI Document Processing Platform for a Legal Tech Startup': 'منصة معالجة المستندات بالذكاء الاصطناعي لشركة تكنولوجيا قانونية ناشئة',
  'Multi-Tenant SaaS Analytics Platform — 0 to $1M ARR': 'منصة تحليلات SaaS متعددة المستأجرين — من 0 إلى 1 مليون دولار كإيرادات سنوية متكررة',
  'Enterprise Internal Tool — Replaced $240k/yr SaaS Subscriptions': 'أداة داخلية للمؤسسات — استبدلت اشتراكات SaaS بقيمة 240 ألف دولار سنوياً',
};

const descriptionTranslations: Record<string, string> = {
  'Built an end-to-end AI system that processes contracts, extracts key clauses, flags risks, and generates summaries — replacing 8 hours of manual review per document.':
    'بناء نظام ذكاء اصطناعي متكامل يعالج العقود، ويستخلص البنود الرئيسية، ويحدد المخاطر، وينشئ ملخصات — مما يختصر 8 ساعات من المراجعة اليدوية لكل مستند.',
  'Architected and built a complete B2B SaaS analytics platform from scratch, including multi-tenancy, Stripe billing, custom dashboards, and an embedded AI insights engine.':
    'تصميم وبناء منصة تحليلات B2B SaaS كاملة من الصفر، بما في ذلك تعدد المستأجرين، فوترة Stripe، لوحات تحكم مخصصة، ومحرك رؤى مدمج بالذكاء الاصطناعي.',
  'Custom internal operations platform for a 500-person company, replacing three expensive SaaS tools with one unified system tailored to their exact workflows.':
    'منصة عمليات داخلية مخصصة لشركة تضم 500 شخص، لتحل محل ثلاث أدوات SaaS مكلفة بنظام واحد موحد مصمم خصيصاً لسير عملهم الدقيق.',
};

const metricLabelTranslations: Record<string, string> = {
  'Time saved': 'الوقت الموفر',
  'Docs/month': 'وثيقة/شهر',
  'Delivery': 'مدة التسليم',
  'ARR in 9mo': 'معدل إيرادات سنوي في 9 أشهر',
  'Enterprise clients': 'عملاء شركات',
  'To launch': 'حتى الإطلاق',
  'Annual savings': 'توفير سنوي',
  'Daily users': 'مستخدم يومي',
  'Build time': 'مدة البناء',
};

const metricValueTranslations: Record<string, string> = {
  '8 wks': '8 أسابيع',
  '14 wks': '14 أسبوعًا',
  '10 wks': '10 أسابيع',
};

export function CaseStudiesSection() {
  const { t } = useLanguage();

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t("RESULTS WE'VE DELIVERED", 'النتائج التي حققناها')}
          title={t('Real Projects. Measurable Outcomes.', 'مشاريع حقيقية. نتائج ملموسة.')}
          titleId="case-studies-heading"
          description={t(
            "Here's a snapshot of what we've built — and the impact it's creating.",
            'إليك لمحة سريعة عما بنيناه — والأثر الذي يحدثه.'
          )}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <article
              key={study.title}
              className="reveal group overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card transition-all duration-300 hover:-translate-y-1 hover:border-corematrix-border2 hover:shadow-[0_0_40px_rgba(34,197,94,0.07)]"
            >
              <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-corematrix-border bg-corematrix-bg0">
                {/* TODO: Replace with <Image src="..." alt="..." fill /> once asset is available */}
                <div className="absolute inset-0 bg-gradient-to-br from-corematrix-green900 to-corematrix-card2 opacity-70" />
                <span className="absolute top-3 left-3 z-10 rounded-full border border-corematrix-green700/30 bg-corematrix-green900/40 px-3 py-1 text-[0.65rem] font-mono font-semibold text-corematrix-green400">
                  {t(study.category, categoryTranslations[study.category] ?? study.category)}
                </span>
                <span className="relative z-10 text-4xl text-corematrix-green400" aria-hidden="true">
                  <i className={study.emoji} />
                </span>
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-display text-sm font-bold leading-snug text-corematrix-textPrimary">
                  {t(study.title, titleTranslations[study.title] ?? study.title)}
                </h3>
                <p className="mb-4 text-xs font-light leading-relaxed text-corematrix-textMuted">
                  {t(study.description, descriptionTranslations[study.description] ?? study.description)}
                </p>
                <div className="mb-4 flex gap-4">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <p className="font-display text-lg font-extrabold leading-none text-corematrix-green400">
                        {t(m.value, metricValueTranslations[m.value] ?? m.value)}
                      </p>
                      <p className="mt-0.5 text-[0.6rem] text-corematrix-textDim">
                        {t(m.label, metricLabelTranslations[m.label] ?? m.label)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
