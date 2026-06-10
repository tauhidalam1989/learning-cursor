'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type Testimonial = {
  quote_en: string;
  quote_ar: string;
  initials: string;
  name: string;
  role_en: string;
  role_ar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote_en:
      'Corematrix built our AI-powered platform from scratch. They challenged our thinking and delivered something beyond what we imagined.',
    quote_ar:
      'قامت كورماتريكس ببناء منصتنا المدعومة بالذكاء الاصطناعي من الصفر. لقد تحدوا تفكيرنا وقدموا شيئاً يفوق ما تخيلناه.',
    initials: 'AK',
    name: 'Arjun K.',
    role_en: 'CTO, SaaS Startup',
    role_ar: 'الرئيس التنفيذي للتكنولوجيا، شركة ناشئة في مجال البرمجيات كخدمة (SaaS)',
  },
  {
    quote_en:
      "Their dedicated team became a seamless extension of our engineering org. Fast, communicative, technically excellent. Extended the contract three times.",
    quote_ar:
      'أصبح فريقهم المخصص امتداداً سلساً لمؤسستنا الهندسية. سريعون، متواصلون، وممتازون تقنياً. قمنا بتمديد العقد ثلاث مرات.',
    initials: 'SR',
    name: 'Sarah R.',
    role_en: 'VP Engineering, Enterprise Co.',
    role_ar: 'نائب رئيس الهندسة، شركة مساهمة كبرى',
  },
  {
    quote_en:
      'We needed an AI automation system in 8 weeks. They delivered in 6. The ROI in the first month was undeniable.',
    quote_ar:
      'كنا بحاجة إلى نظام أتمتة بالذكاء الاصطناعي خلال 8 أسابيع. لقد قاموا بالتسليم في 6 أسابيع. كان العائد على الاستثمار في الشهر الأول لا يمكن إنكاره.',
    initials: 'MJ',
    name: 'Michael J.',
    role_en: 'Founder, Tech Company',
    role_ar: 'مؤسس، شركة تكنولوجيا',
  },
];

export function TestimonialsSection() {
  const { language, t } = useLanguage();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-16 lg:py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t("CLIENT STORIES", "قصص العملاء")}
          title={t("What Our Clients Say", "ماذا يقول عملاؤنا")}
          titleId="testimonials-heading"
          description={t("Trusted by startups, scale-ups, and enterprise teams worldwide.", "موثوق من قبل الشركات الناشئة، والشركات سريعة النمو، وفرق المؤسسات الكبرى في جميع أنحاء العالم.")}
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testi) => (
            <article
              key={testi.name}
              className="reveal relative overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-8 transition-colors hover:border-corematrix-border2"
            >
              <span
                className="absolute left-6 top-3 font-serif text-6xl leading-none text-corematrix-green900"
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="mb-4 text-corematrix-green400" aria-hidden>
                ★★★★★
              </p>
              <p className="relative z-10 text-sm italic leading-relaxed text-corematrix-textSecondary">
                {language === 'ar' ? testi.quote_ar : testi.quote_en}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-corematrix-green900/40 text-sm font-semibold text-corematrix-green400">
                  {testi.initials}
                </div>
                <div>
                  <p className="font-semibold text-corematrix-textPrimary">{testi.name}</p>
                  <p className="text-sm text-corematrix-textMuted">
                    {language === 'ar' ? testi.role_ar : testi.role_en}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

