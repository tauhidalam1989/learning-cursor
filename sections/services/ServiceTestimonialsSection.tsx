'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type ServiceTestimonial = {
  stars: number;
  serviceTag: string;
  quote: string;
  initials: string;
  name: string;
  role: string;
  starsColor: string;
  quoteMarkColor: string;
  tagClass: string;
  initialsClass: string;
};

const TESTIMONIALS: ServiceTestimonial[] = [
  {
    stars: 5,
    serviceTag: 'AI Development',
    quote:
      'We needed an AI system that processes thousands of legal contracts per day. Corematrix built something that exceeded every requirement — and delivered two weeks ahead of schedule. The code quality is exceptional.',
    initials: 'JM',
    name: 'James M.',
    role: 'CTO, LegalTech Startup',
    starsColor: 'text-purple-400',
    quoteMarkColor: 'text-purple-900/30',
    tagClass: 'border-purple-500/20 bg-purple-950/40 text-purple-400',
    initialsClass: 'bg-purple-900/40 text-purple-400',
  },
  {
    stars: 5,
    serviceTag: 'SaaS Development',
    quote:
      "Corematrix took our product from zero to $1M ARR in nine months. They contributed to product decisions, challenged our assumptions, and built a foundation that's still scaling without issues 18 months later.",
    initials: 'SR',
    name: 'Sophie R.',
    role: 'Founder & CEO, SaaS Co.',
    starsColor: 'text-corematrix-green400',
    quoteMarkColor: 'text-corematrix-green900',
    tagClass: 'border-corematrix-green700/20 bg-corematrix-green900/20 text-corematrix-green400',
    initialsClass: 'bg-corematrix-green900/40 text-corematrix-green400',
  },
  {
    stars: 5,
    serviceTag: 'Dedicated Team',
    quote:
      "We hired a dedicated Next.js team through Corematrix 14 months ago and can't imagine going back. They integrate completely, think like product owners, and their quality makes our in-house engineers better.",
    initials: 'DK',
    name: 'David K.',
    role: 'VP Engineering, Scale-up',
    starsColor: 'text-sky-400',
    quoteMarkColor: 'text-sky-900/30',
    tagClass: 'border-sky-500/20 bg-sky-950/40 text-sky-400',
    initialsClass: 'bg-sky-900/40 text-sky-400',
  },
];

// Explicitly typed translation maps for i18n
const tagTranslations: Record<string, string> = {
  'AI Development': 'تطوير الذكاء الاصطناعي',
  'SaaS Development': 'تطوير منصات SaaS',
  'Dedicated Team': 'فريق عمل مخصص',
};

const quoteTranslations: Record<string, string> = {
  'We needed an AI system that processes thousands of legal contracts per day. Corematrix built something that exceeded every requirement — and delivered two weeks ahead of schedule. The code quality is exceptional.':
    'كنا بحاجة إلى نظام ذكاء اصطناعي يعالج آلاف العقود القانونية يومياً. قامت كورماتريكس ببناء شيء تجاوز كل المتطلبات — وتم تسليمه قبل أسبوعين من الموعد المحدد. جودة الكود استثنائية.',
  "Corematrix took our product from zero to $1M ARR in nine months. They contributed to product decisions, challenged our assumptions, and built a foundation that's still scaling without issues 18 months later.":
    'ساعدتنا كورماتريكس في الانتقال بمنتجنا من الصفر إلى مليون دولار كإيرادات سنوية متكررة في غضون تسعة أشهر. لقد ساهموا في قرارات المنتج، وتحدوا افتراضاتنا، وبنوا أساساً لا يزال يتوسع دون مشاكل بعد 18 شهراً.',
  "We hired a dedicated Next.js team through Corematrix 14 months ago and can't imagine going back. They integrate completely, think like product owners, and their quality makes our in-house engineers better.":
    'لقد قمنا بتعيين فريق Next.js مخصص من خلال كورماتريكس منذ 14 شهراً ولا يمكننا تخيل العودة إلى الوراء. إنهم يندمجون تماماً معنا، ويفكرون كأصحاب منتجات، وجودة عملهم تجعل مهندسينا الداخليين أفضل.',
};

const initialTranslations: Record<string, string> = {
  'JM': 'ج م',
  'SR': 'ص ر',
  'DK': 'د ك',
};

const nameTranslations: Record<string, string> = {
  'James M.': 'جيمس م.',
  'Sophie R.': 'صوفي ر.',
  'David K.': 'ديفيد ك.',
};

const roleTranslations: Record<string, string> = {
  'CTO, LegalTech Startup': 'المدير التقني، شركة تكنولوجيا قانونية ناشئة',
  'Founder & CEO, SaaS Co.': 'المؤسس والرئيس التنفيذي، شركة SaaS',
  'VP Engineering, Scale-up': 'نائب رئيس الهندسة، شركة متسارعة النمو',
};

export function ServiceTestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="service-testimonials"
      aria-labelledby="service-testimonials-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t('CLIENT STORIES', 'قصص عملائنا')}
          title={t("Don't Take Our Word For It", 'لا تكتفِ بسماع رأينا')}
          titleId="service-testimonials-heading"
          description={t(
            "Hear from founders and technical leaders who've shipped with us.",
            'استمع إلى آراء المؤسسين والقادة التقنيين الذين أطلقوا مشاريعهم معنا.'
          )}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((tItem) => (
            <blockquote
              key={tItem.name}
              className="reveal group relative overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-8 transition-colors hover:border-corematrix-border2"
            >
              <span
                className={`pointer-events-none absolute top-3 left-6 font-serif text-6xl leading-none ${tItem.quoteMarkColor}`}
                aria-hidden
              >
                &ldquo;
              </span>
              <div className={`mb-3 text-sm tracking-widest ${tItem.starsColor}`}>
                {'★'.repeat(tItem.stars)}
              </div>
              <span className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.65rem] font-semibold ${tItem.tagClass}`}>
                {t(tItem.serviceTag, tagTranslations[tItem.serviceTag] ?? tItem.serviceTag)}
              </span>
              <p className="relative z-10 mb-5 text-sm italic font-light leading-relaxed text-corematrix-textSecondary">
                {t(tItem.quote, quoteTranslations[tItem.quote] ?? tItem.quote)}
              </p>
              <footer className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold ${tItem.initialsClass}`}>
                  {t(tItem.initials, initialTranslations[tItem.initials] ?? tItem.initials)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-corematrix-textPrimary">
                    {t(tItem.name, nameTranslations[tItem.name] ?? tItem.name)}
                  </p>
                  <p className="text-xs text-corematrix-textMuted">
                    {t(tItem.role, roleTranslations[tItem.role] ?? tItem.role)}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
