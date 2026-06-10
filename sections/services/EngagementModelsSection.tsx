'use client';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type EngagementModel = {
  icon: string;
  title: string;
  tagline: string;
  description: string;
  items: string[];
  cta: string;
  ctaStyle: 'primary' | 'ghost';
  featured?: boolean;
};

const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    icon: 'fas fa-bullseye',
    title: 'Fixed-Scope Project',
    tagline: 'Defined budget. Defined timeline. No surprises.',
    description:
      'Best for well-defined products with clear requirements. We agree on scope, timeline, and cost upfront — then deliver. Perfect for MVPs, redesigns, and specific feature builds.',
    items: [
      'Fixed price agreed at kickoff',
      'Milestone-based payment schedule',
      'Change request process built in',
      'Full code ownership at project close',
    ],
    cta: 'Get a fixed quote →',
    ctaStyle: 'ghost',
  },
  {
    icon: 'fas fa-sync',
    title: 'Retainer / Time & Materials',
    tagline: 'Maximum flexibility. Continuous delivery.',
    description:
      'Best for evolving products that need ongoing development and a long-term technical partner. Monthly retainer with a dedicated team, sprint planning, and unlimited scope flexibility.',
    items: [
      'Dedicated team, fixed monthly rate',
      'Weekly sprint demos and planning',
      'Adjust scope and priorities anytime',
      'Scale team up or down monthly',
      'Strategic advisory included',
    ],
    cta: 'Start a retainer →',
    ctaStyle: 'primary',
    featured: true,
  },
  {
    icon: 'fas fa-users',
    title: 'Dedicated Team Extension',
    tagline: 'Your team. Our engineers. One mission.',
    description:
      'Best for companies needing to scale their in-house team with senior specialists. Engineers embed directly into your workflows, tools, and culture — indistinguishable from in-house hires.',
    items: [
      'Pre-vetted senior engineers only',
      '1-week onboarding, then fully embedded',
      'Report to your PM / tech lead',
      'Flexible 1-month+ contracts',
    ],
    cta: 'Hire your team →',
    ctaStyle: 'ghost',
  },
];

// Translation maps for i18n
const titleTranslations: Record<string, string> = {
  'Fixed-Scope Project': 'مشروع بنطاق ثابت',
  'Retainer / Time & Materials': 'عقد ثابت / وقت ومواد',
  'Dedicated Team Extension': 'تمديد فريق مخصص',
};

const taglineTranslations: Record<string, string> = {
  'Defined budget. Defined timeline. No surprises.': 'ميزانية محددة. جدول زمني محدد. لا مفاجآت.',
  'Maximum flexibility. Continuous delivery.': 'أقصى مرونة. تسليم مستمر.',
  'Your team. Our engineers. One mission.': 'فريقكم. مهندسونا. مهمة واحدة.',
};

const descriptionTranslations: Record<string, string> = {
  "Best for well-defined products with clear requirements. We agree on scope, timeline, and cost upfront — then deliver. Perfect for MVPs, redesigns, and specific feature builds.": "مثالي للمنتجات ذات المتطلبات الواضحة. نتفق على النطاق والجدول الزمني والتكلفة مسبقًا ثم نُسلم. مناسب للأدنى MVPs وإعادة التصميم وبناء ميزات معينة.",
  "Best for evolving products that need ongoing development and a long-term technical partner. Monthly retainer with a dedicated team, sprint planning, and unlimited scope flexibility.": "مثالي للمنتجات المتطورة التي تحتاج إلى تطوير مستمر وشريك تقني طويل الأمد. عقد شهري مع فريق مخصص وتخطيط سبرينت ومرونة غير محدودة في النطاق.",
  "Best for companies needing to scale their in-house team with senior specialists. Engineers embed directly into your workflows, tools, and culture — indistinguishable from in-house hires.": "مثالي للشركات التي تحتاج إلى توسيع فريقها الداخلي بمتخصصين كبار. المهندسين يندمجون مباشرةً في سير العمل والأدوات والثقافة — لا يختلفون عن التوظيف الداخلي.",
};

const itemsTranslations: Record<string, string> = {
  'Fixed price agreed at kickoff': 'سعر ثابت مقطع عند الانطلاق',
  'Milestone-based payment schedule': 'جدول دفع مبني على معالم',
  'Change request process built in': 'عملية طلب تعديل مدمجة',
  'Full code ownership at project close': 'امتلاك كامل للكود عند إغلاق المشروع',
  'Dedicated team, fixed monthly rate': 'فريق مخصص، سعر شهري ثابت',
  'Weekly sprint demos and planning': 'عروض سبرينت أسبوعية وتخطيط',
  'Adjust scope and priorities anytime': 'تعديل النطاق والأولويات في أي وقت',
  'Scale team up or down monthly': 'توسيع أو تقليص الفريق شهريًا',
  'Strategic advisory included': 'استشارة استراتيجية مضمونة',
  'Pre-vetted senior engineers only': 'مهندسون كبيرون تم فحصهم مسبقًا فقط',
  '1-week onboarding, then fully embedded': 'إدماج لمدة أسبوع ثم اندماج كامل',
  'Report to your PM / tech lead': 'تقارير إلى مدير المشروع / القائد الفني لديك',
  'Flexible 1-month+ contracts': 'عقود مرنة لمدة شهر أو أكثر',
};

const ctaTranslations: Record<string, string> = {
  'Get a fixed quote →': 'احصل على عرض ثابت →',
  'Start a retainer →': 'ابدأ عقدًا ثابتًا →',
  'Hire your team →': 'توظيف فريقك →',
};

export function EngagementModelsSection() {
  const { t } = useLanguage();
  return (
    <section
      id="engagement-models"
      aria-labelledby="engagement-models-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t('ENGAGEMENT MODELS', 'نماذج التعاقد')}
          title={t('Work With Us the Way That Fits Your Business', 'اعمل معنا بالطريقة التي تناسب عملك')}
          titleId="engagement-models-heading"
          description={t(
            'Fixed scope, flexible retainer, or dedicated team — choose what works for your stage and goals.',
            'نطاق ثابت، أو عقد مرن، أو فريق مخصص — اختر ما يناسب مرحلتك وأهدافك.'
          )}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {ENGAGEMENT_MODELS.map((model) => (
            <div
              key={model.title}
              className={`reveal relative overflow-hidden rounded-2xl border p-9 transition-all duration-300 hover:-translate-y-1 ${model.featured
                ? 'border-corematrix-border2 bg-corematrix-card2 shadow-[0_0_60px_rgba(34,197,94,0.08)]'
                : 'border-corematrix-border bg-corematrix-card'
                }`}
            >
              {model.featured && (
                <>
                  <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent" />
                  <span className="absolute top-4 right-4 rounded-full bg-corematrix-green900/40 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-corematrix-green400">
                    {t('Most Popular', 'الأكثر شعبية')}
                  </span>
                </>
              )}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-corematrix-green700/20 bg-corematrix-green900/40 text-xl text-corematrix-green400">
                <i className={model.icon} aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-bold text-corematrix-textPrimary">
                {t(model.title, titleTranslations[model.title] ?? model.title)}
              </h3>
              <p className="mt-1 text-sm font-medium text-corematrix-green400">{t(model.tagline, taglineTranslations[model.tagline] ?? model.tagline)}</p>
              <p className="mt-4 text-sm font-light leading-relaxed text-corematrix-textMuted">
                {t(model.description, descriptionTranslations[model.description] ?? model.description)}
              </p>
              <ul className="mt-6 space-y-3">
                {model.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-corematrix-green400" />
                    <span className="text-sm text-corematrix-textSecondary">{t(item, itemsTranslations[item] ?? item)}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-all ${model.ctaStyle === 'primary'
                  ? 'rounded-lg bg-corematrix-green700 px-5 py-2.5 text-white hover:bg-corematrix-green500'
                  : 'text-corematrix-green400 hover:gap-3 hover:text-corematrix-green300'
                  }`}
              >
                {t(model.cta, ctaTranslations[model.cta] ?? model.cta)}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
