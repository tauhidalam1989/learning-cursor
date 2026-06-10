'use client';

import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';

type Step = { num: string; title_en: string; title_ar: string; body_en: string; body_ar: string };

const STEPS: Step[] = [
  {
    num: '01',
    title_en: 'Understand Before Everything',
    title_ar: 'الفهم الكامل قبل كل شيء',
    body_en: 'We invest heavily in discovery — understanding your industry, users, competitors, and constraints before recommending or designing anything.',
    body_ar: 'نحن نستثمر بشكل كبير في مرحلة الاستكشاف والبحث — لفهم قطاع عملك، والمستخدمين، والمنافسين، والقيود قبل التوصية بأي حل أو تصميم أي شيء.',
  },
  {
    num: '02',
    title_en: 'Design for Scale, Not Just MVP',
    title_ar: 'التصميم للتوسع، وليس فقط لمنتج أولي',
    body_en: 'We architect systems that can scale 100x without being rebuilt. Your MVP will be lean, but its foundations will be enterprise-grade.',
    body_ar: 'نحن نهندس أنظمة يمكن أن تتوسع بمعدل 100 ضعف دون الحاجة لإعادة بنائها بالكامل. سيكون منتجك الأولي (MVP) رشيقاً، لكن ركائزه ستكون بمستوى المؤسسات الكبرى.',
  },
  {
    num: '03',
    title_en: 'AI as a Layer, Not an Add-On',
    title_ar: 'الذكاء الاصطناعي كطبقة أساسية، وليس كإضافة ثانوية',
    body_en: "We don't bolt AI onto finished products. We weave intelligent capabilities into the architecture from the start.",
    body_ar: 'نحن لا نضيف الذكاء الاصطناعي إلى المنتجات النهائية كفكرة لاحقة. بدلاً من ذلك، ننسج القدرات الذكية في بنية النظام منذ البداية.',
  },
  {
    num: '04',
    title_en: 'Ship, Learn, Improve — Repeat',
    title_ar: 'التسليم، التعلم، التحسين — والتكرار',
    body_en: 'We believe in continuous delivery. Working software in your hands every two weeks with feedback cycles built directly into our process.',
    body_ar: 'نحن نؤمن بالتسليم المستمر. برمجيات حقيقية وصالحة للعمل في يديك كل أسبوعين مع دمج حلقات التقييم وإبداء الملاحظات مباشرة في عملياتنا.',
  },
  {
    num: '05',
    title_en: 'Measure What Matters',
    title_ar: 'قياس ما يهم بالفعل',
    body_en: 'Every project ends with measurable outcomes — performance benchmarks, user metrics, and business KPIs tracked against what we promised.',
    body_ar: 'ينتهي كل مشروع بنتائج ملموسة وقابلة للقياس — مؤشرات الأداء، مقاييس تفاعل المستخدمين، ومؤشرات الأداء الرئيسية للأعمال المتعقبة مقابل ما وعدنا به.',
  },
];

const TAGS = [
  'Clean Architecture',
  'TDD',
  'CI/CD',
  'Observability',
  '12-Factor Apps',
  'Zero-Downtime Deploy',
  'Security by Design',
  'API-First',
  'RAG Pipelines',
  'Serverless',
  'Event-Driven',
  'DDD',
];

export function OurApproachSection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="our-approach"
      aria-labelledby="our-approach-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
          <div>
            <p className="section-label text-corematrix-green400">
              {t('OUR APPROACH', 'منهجيتنا')}
            </p>
            <h2
              id="our-approach-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              {t('How We Think Before We Build', 'كيف نفكر قبل أن نبدأ بالبناء')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              {t(
                "Our process isn't just a checklist — it's a philosophy rooted in deep collaboration and technical rigor.",
                'عمليتنا ليست مجرد قائمة مراجعة — إنها فلسفة متجذرة في التعاون العميق والصرامة التقنية.'
              )}
            </p>

            <div className="mt-8">
              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className="group flex gap-5 border-b border-corematrix-border py-6 last:border-0 reveal"
                >
                  <div className="flex flex-shrink-0 flex-col items-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-corematrix-border2 bg-corematrix-card2 font-display text-xs font-extrabold text-corematrix-green400 transition-all group-hover:border-corematrix-green500 group-hover:bg-corematrix-green700 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                      {step.num}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="mt-1 h-8 w-px bg-corematrix-border" aria-hidden />
                    )}
                  </div>
                  <div className="pb-2">
                    <h3 className="font-display font-semibold text-corematrix-textPrimary">
                      {language === 'ar' ? step.title_ar : step.title_en}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-corematrix-textSecondary">
                      {language === 'ar' ? step.body_ar : step.body_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <article className="reveal reveal-delay-2 rounded-2xl border border-corematrix-border bg-corematrix-card p-9 lg:sticky lg:top-24">
            <h3 className="font-display text-xl font-bold text-corematrix-textPrimary">
              {t('Engineering Philosophy', 'الفلسفة الهندسية')}
            </h3>
            <p className="mt-4 font-light text-corematrix-textMuted">
              {t(
                'We build systems that last. Our philosophy centers on clean architecture, test-driven development, and a relentless focus on observability and maintainability.',
                'نحن نبني أنظمة تدوم. تتمحور فلسفتنا حول البنية النظيفة، والتطوير الموجه بالاختبارات (TDD)، والتركيز الدؤوب على قابلية المراقبة والصيانة.'
              )}
            </p>
            <p className="mt-3 font-light text-corematrix-textMuted">
              {t(
                'Every decision — from technology choice to deployment strategy — is made with scale, security, and developer experience in mind.',
                'يتم اتخاذ كل قرار — بدءاً من اختيار التكنولوجيا إلى استراتيجية النشر — مع مراعاة قابلية التوسع والأمان وتجربة المطورين.'
              )}
            </p>
            <p className="mt-3 font-light text-corematrix-textMuted">
              {t(
                'We embrace modern practices like 12-factor apps, API-first design, and event-driven architectures to deliver software that grows with your business.',
                'نحن نتبنى الممارسات الحديثة مثل تطبيقات الـ 12-factor، والتصميم المرتكز على واجهات برمجة التطبيقات (API-first)، والبنيات القائمة على الأحداث لتقديم برمجيات تنمو وتتطور مع عملك.'
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-corematrix-green700/20 bg-corematrix-green900/20 px-3 py-1 font-mono text-xs font-semibold text-corematrix-green700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
