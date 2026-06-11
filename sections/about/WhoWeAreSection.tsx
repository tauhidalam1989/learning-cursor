'use client';

import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';

type Pillar = {
  icon: string;
  title_en: string;
  title_ar: string;
  body_en: string;
  body_ar: string;
  iconColor: string;
  iconBg: string;
  cardBg: string;
  cardBorder: string;
  hoverBorder: string;
  hoverBg: string;
  hoverGlow: string;
  textColor: string;
};

const PILLARS: Pillar[] = [
  {
    icon: 'fas fa-bullseye',
    title_en: 'Outcome-Driven',
    title_ar: 'التركيز على النتائج',
    body_en: 'We measure success by your metrics — revenue, retention, efficiency — not just shipped features.',
    body_ar: 'نحن نقيس النجاح بمقاييس أعمالك — الإيرادات، الاحتفاظ بالعملاء، والكفاءة — وليس فقط الميزات المشحونة.',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    cardBg: 'bg-cyan-950/20',
    cardBorder: 'border-cyan-500/15',
    hoverBorder: 'hover:border-cyan-500/40',
    hoverBg: 'hover:bg-cyan-950/35',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]',
    textColor: 'text-cyan-300/90',
  },
  {
    icon: 'fas fa-handshake',
    title_en: 'Long-Term Partner',
    title_ar: 'شريك طويل الأجل',
    body_en: 'We embed into your team and think like co-founders. Average client relationship: 2+ years.',
    body_ar: 'نحن نندمج في فريقك ونفكر مثل المؤسسين الشركاء. متوسط علاقتنا مع العملاء: سنتين أو أكثر.',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
    cardBg: 'bg-amber-950/20',
    cardBorder: 'border-amber-500/15',
    hoverBorder: 'hover:border-amber-500/40',
    hoverBg: 'hover:bg-amber-950/35',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    textColor: 'text-amber-300/90',
  },
  {
    icon: 'fas fa-bolt',
    title_en: 'Fast Without Cutting Corners',
    title_ar: 'السرعة دون التضحية بالجودة',
    body_en: 'Agile sprints, weekly demos, and a bias for shipping — but never at the cost of quality or security.',
    body_ar: 'دورات تطوير رشيقة، عروض أسبوعية، وشغف للتسليم — ولكن ليس على حساب الجودة أو الأمان أبداً.',
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10 border-indigo-500/20',
    cardBg: 'bg-indigo-950/20',
    cardBorder: 'border-indigo-500/15',
    hoverBorder: 'hover:border-indigo-500/40',
    hoverBg: 'hover:bg-indigo-950/35',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]',
    textColor: 'text-indigo-300/90',
  },
];

type Milestone = {
  year: string;
  title_en: string;
  title_ar: string;
  body_en: string;
  body_ar: string;
  active?: boolean;
  colorClass: string;
  dotClass: string;
  titleColor: string;
  bodyColor: string;
};

const MILESTONES: Milestone[] = [
  {
    year: '2020',
    title_en: 'Founded',
    title_ar: 'التأسيس',
    body_en: 'Started as a small web dev studio with 3 engineers and a bold vision.',
    body_ar: 'بدأنا كاستوديو صغير لتطوير الويب مع 3 مهندسين ورؤية جريئة.',
    colorClass: 'text-cyan-400',
    dotClass: 'bg-cyan-500',
    titleColor: 'text-cyan-200/95',
    bodyColor: 'text-cyan-300/70',
  },
  {
    year: '2022',
    title_en: 'First Enterprise Deal',
    title_ar: 'أول صفقة مع مؤسسة كبرى',
    body_en: 'Landed first enterprise SaaS contract. Grew to 10 engineers.',
    body_ar: 'حصلنا على أول عقد منصة سحابية (SaaS) للمؤسسات. وتوسعنا إلى 10 مهندسين.',
    colorClass: 'text-amber-400',
    dotClass: 'bg-amber-500',
    titleColor: 'text-amber-200/95',
    bodyColor: 'text-amber-300/70',
  },
  {
    year: '2023',
    title_en: 'AI Division Launched',
    title_ar: 'إطلاق قسم الذكاء الاصطناعي',
    body_en: 'Dedicated AI/ML team formed. First LLM product shipped to production.',
    body_ar: 'تشكيل فريق متخصص في الذكاء الاصطناعي وتعلم الآلة. شحن أول منتج يعمل بالنماذج اللغوية الكبيرة.',
    colorClass: 'text-indigo-400',
    dotClass: 'bg-indigo-500',
    titleColor: 'text-indigo-200/95',
    bodyColor: 'text-indigo-300/70',
  },
  {
    year: '2024',
    title_en: 'Went Global',
    title_ar: 'الانطلاق نحو العالمية',
    body_en: 'Clients across 12 countries. Opened dedicated team model.',
    body_ar: 'عملاء في أكثر من 12 دولة. فتح نموذج الفرق المخصصة.',
    colorClass: 'text-purple-400',
    dotClass: 'bg-purple-500',
    titleColor: 'text-purple-200/95',
    bodyColor: 'text-purple-300/70',
  },
  {
    year: '2025',
    title_en: '50+ Projects',
    title_ar: 'أكثر من 50 مشروعاً',
    body_en: 'Crossed 50 delivered projects. 98% client retention.',
    body_ar: 'تجاوزنا 50 مشروعاً تم تسليمها بنجاح مع معدل احتفاظ بالعملاء بنسبة 98%.',
    colorClass: 'text-rose-400',
    dotClass: 'bg-rose-500',
    titleColor: 'text-rose-200/95',
    bodyColor: 'text-rose-300/70',
  },
  {
    year: '2026→',
    title_en: 'Next Chapter',
    title_ar: 'الفصل التالي',
    body_en: 'Scaling AI products. Building proprietary enterprise AI frameworks.',
    body_ar: 'توسيع نطاق منتجات الذكاء الاصطناعي. بناء أطر عمل خاصة بالذكاء الاصطناعي للمؤسسات.',
    active: true,
    colorClass: 'text-emerald-400',
    dotClass: 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]',
    titleColor: 'text-emerald-200/95',
    bodyColor: 'text-emerald-300/70',
  },
];

export function WhoWeAreSection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <div>
            <p className="section-label text-corematrix-green400">
              {t('WHO WE ARE', 'من نحن')}
            </p>
            <h2
              id="who-we-are-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              {t('A Team of Builders, Not Just Consultants', 'فريق من المطورين والبناة، وليسوا مجرد مستشارين')}
            </h2>

            <p className="mt-6 font-light leading-[1.8] text-corematrix-textMuted">
              {t(
                'Corematrix is a results-driven IT services and consulting company specializing in innovative, scalable, and business-focused digital solutions. We were founded on a simple belief: great technology should create measurable business outcomes, not just impressive demos.',
                'كورماتريكس هي خدمات واستشارات تقنية تركز على النتائج وتتخصص في الحلول الرقمية المبتكرة والقابلة للتوسع والموجهة نحو الأعمال. لقد تأسسنا على إيمان بسيط: التكنولوجيا الرائعة يجب أن تخلق نتائج أعمال ملموسة، وليس مجرد عروض تجريبية مثيرة للإعجاب.'
              )}
            </p>
            <p className="mt-4 font-light leading-[1.8] text-corematrix-textMuted">
              {t(
                "We're not a generic agency. We're a technical partner — a team of engineers, AI researchers, product designers, and strategists who get deeply invested in what you're building and stay until it succeeds.",
                'نحن لسنا مجرد وكالة عادية. نحن شريك تقني — فريق من المهندسين وباحثي الذكاء الاصطناعي ومصممي المنتجات والاستراتيجيين الذين يستثمرون بعمق فيما تبنيه ويبقون معك حتى ينجح.'
              )}
            </p>
            <p className="mt-4 font-light leading-[1.8] text-corematrix-textMuted">
              {t(
                'From AI product development and LLM integrations to full-stack web apps, mobile platforms, and enterprise SaaS — we operate across the full spectrum of modern software engineering.',
                'من تطوير منتجات الذكاء الاصطناعي وتكامل النماذج اللغوية الكبيرة إلى تطبيقات الويب المتكاملة ومنصات الأجهزة المحمولة وحلول SaaS للمؤسسات — نعمل عبر الطيف الكامل لهندسة البرمجيات الحديثة.'
              )}
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {PILLARS.map((p) => (
                <article
                  key={p.title_en}
                  className={`reveal flex items-start gap-4 rounded-xl border p-5 transition-all duration-300 hover:translate-x-1 ${p.cardBorder} ${p.cardBg} ${p.hoverBorder} ${p.hoverBg} ${p.hoverGlow}`}
                >
                  <span className={`shrink-0 flex h-9 w-9 items-center justify-center rounded-lg border text-base mt-0.5 ${p.iconBg} ${p.iconColor}`} aria-hidden="true">
                    <i className={p.icon} />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-corematrix-textPrimary">
                      {language === 'ar' ? p.title_ar : p.title_en}
                    </h3>
                    <p className={`mt-1 text-sm leading-relaxed ${p.textColor}`}>
                      {language === 'ar' ? p.body_ar : p.body_en}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <article className="reveal reveal-delay-2 relative overflow-hidden rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-9 lg:sticky lg:top-24">
            <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent" />
            <p className="section-label text-corematrix-green400">
              {t('OUR JOURNEY', 'مسيرتنا')}
            </p>
            <div className="mt-6">
              {MILESTONES.map((m) => (
                <div
                  key={m.year}
                  className="flex gap-4 border-b border-corematrix-border py-3.5 last:border-0"
                >
                  <span className={`mt-0.5 w-12 flex-shrink-0 font-display text-xs font-bold ${m.colorClass}`}>
                    {m.year}
                  </span>
                  <div
                    className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${m.dotClass}`}
                    aria-hidden
                  />
                  <div>
                    <h4 className={`text-sm font-bold ${m.titleColor}`}>
                      {language === 'ar' ? m.title_ar : m.title_en}
                    </h4>
                    <p className={`mt-0.5 text-xs font-light leading-snug ${m.bodyColor}`}>
                      {language === 'ar' ? m.body_ar : m.body_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
