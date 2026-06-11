'use client';
import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type ProcessStep = {
  num: string;
  title: string;
  body: string;
  numColor: string;
  bgClass: string;
  hoverBorder: string;
  hoverBg: string;
  hoverGlow: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'Discovery Sprint',
    body: '2-week deep dive into goals, constraints, users, and technical landscape. Outputs a full spec and delivery roadmap.',
    numColor: 'text-purple-400',
    bgClass: 'bg-purple-950/30 border-purple-500/20',
    hoverBorder: 'group-hover:border-purple-500',
    hoverBg: 'group-hover:bg-purple-700',
    hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(168,85,247,0.3)]',
  },
  {
    num: '02',
    title: 'Architecture Design',
    body: 'System design, database schema, API contracts, and UI wireframes — reviewed and approved before build starts.',
    numColor: 'text-sky-400',
    bgClass: 'bg-sky-950/30 border-sky-500/20',
    hoverBorder: 'group-hover:border-sky-500',
    hoverBg: 'group-hover:bg-sky-700',
    hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(14,165,233,0.3)]',
  },
  {
    num: '03',
    title: 'Agile Build Sprints',
    body: '2-week sprints with daily standups, Friday demos, and a shared board visible to you at all times.',
    numColor: 'text-amber-400',
    bgClass: 'bg-amber-950/30 border-amber-500/20',
    hoverBorder: 'group-hover:border-amber-500',
    hoverBg: 'group-hover:bg-amber-700',
    hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(245,158,11,0.3)]',
  },
  {
    num: '04',
    title: 'AI Integration Layer',
    body: 'AI capabilities woven in at the right stage — LLM features, automation flows, intelligent data pipelines.',
    numColor: 'text-rose-400',
    bgClass: 'bg-rose-950/30 border-rose-500/20',
    hoverBorder: 'group-hover:border-rose-500',
    hoverBg: 'group-hover:bg-rose-700',
    hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(244,63,94,0.3)]',
  },
  {
    num: '05',
    title: 'QA & Security Audit',
    body: 'Automated test suite, manual QA, OWASP security scanning, and performance benchmarks before launch.',
    numColor: 'text-teal-400',
    bgClass: 'bg-teal-950/30 border-teal-500/20',
    hoverBorder: 'group-hover:border-teal-500',
    hoverBg: 'group-hover:bg-teal-700',
    hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(20,184,166,0.3)]',
  },
  {
    num: '06',
    title: 'Launch & Grow',
    body: 'Zero-downtime deployment, monitoring setup, team handoff documentation, and ongoing support retainer.',
    numColor: 'text-orange-400',
    bgClass: 'bg-orange-950/30 border-orange-500/20',
    hoverBorder: 'group-hover:border-orange-500',
    hoverBg: 'group-hover:bg-orange-700',
    hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(249,115,22,0.3)]',
  },
];

// Translation maps for titles and bodies
const titleTranslations: Record<string, string> = {
  'Discovery Sprint': 'سباق الاكتشاف',
  'Architecture Design': 'تصميم الهندسة المعمارية',
  'Agile Build Sprints': 'سباقات بناء مرنة',
  'AI Integration Layer': 'طبقة تكامل الذكاء الاصطناعي',
  'QA & Security Audit': 'تدقيق الجودة والأمان',
  'Launch & Grow': 'الإطلاق والنمو',
};

const bodyTranslations: Record<string, string> = {
  '2-week deep dive into goals, constraints, users, and technical landscape. Outputs a full spec and delivery roadmap.':
    'غوص عميق لمدة أسبوعين في الأهداف والقيود والمستخدمين والمشهد الفني. ينتج مواصفات كاملة وخارطة طريق للتسليم.',
  'System design, database schema, API contracts, and UI wireframes — reviewed and approved before build starts.':
    'تصميم النظام، مخطط قاعدة البيانات، عقود API، وإطارات واجهة المستخدم — تم مراجعته والموافقة عليه قبل بدء البناء.',
  '2-week sprints with daily standups, Friday demos, and a shared board visible to you at all times.':
    'سباقات لمدة أسبوعين مع اجتماعات يومية، عروض تجريبية يوم الجمعة، ولوحة مشتركة مرئية لك طوال الوقت.',
  'AI capabilities woven in at the right stage — LLM features, automation flows, intelligent data pipelines.':
    'قدرات الذكاء الاصطناعي مدمجة في المرحلة المناسبة — ميزات LLM، تدفقات الأتمتة، خطوط بيانات ذكية.',
  'Automated test suite, manual QA, OWASP security scanning, and performance benchmarks before launch.':
    'حزمة اختبار آلية، ضمان جودة يدوي، فحص أمان OWASP، ومعايير أداء قبل الإطلاق.',
  'Zero-downtime deployment, monitoring setup, team handoff documentation, and ongoing support retainer.':
    'نشر بلا توقف، إعداد مراقبة، توثيق تسليم الفريق، ودعم مستمر.',
};

export function HowWeWorkSection() {
  const { t } = useLanguage();
  return (
    <section
      id="how-we-work"
      aria-labelledby="how-we-work-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t('HOW WE WORK', 'طريقة العمل')}
          title={t('From Discovery to Delivery — A Process You\'ll Actually Enjoy', 'من الاكتشاف إلى التسليم — عملية ستحبها فعلاً')}
          titleId="how-we-work-heading"
          description={t('Transparent, agile, and designed for your success. We keep you in the loop at every step.', 'شفاف، مرن، ومصمم لنجاحك. نبقيك على اطلاع في كل خطوة.')}
        />

        <div className="relative mt-14 grid grid-cols-2 gap-0 sm:grid-cols-3 lg:grid-cols-6">
          <div
            className="absolute left-[calc(100%/12)] right-[calc(100%/12)] top-7 hidden h-px bg-gradient-to-r from-transparent via-corematrix-border2 via-corematrix-green700 to-transparent lg:block"
            aria-hidden
          />
          {PROCESS_STEPS.map((step) => (
            <div key={step.num} className="group flex flex-col items-center px-3 text-center">
              <div className={`relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 font-display text-xs font-extrabold transition-all ${step.bgClass} ${step.numColor} ${step.hoverBorder} ${step.hoverBg} group-hover:text-white ${step.hoverGlow}`}>
                {step.num}
              </div>
              <h3 className="mb-1.5 font-display text-xs font-bold text-corematrix-textPrimary">
                {t(step.title, titleTranslations[step.title] ?? step.title)}
              </h3>
              <p className="text-[0.72rem] font-light leading-snug text-corematrix-textMuted">
                {t(step.body, bodyTranslations[step.body] ?? step.body)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
