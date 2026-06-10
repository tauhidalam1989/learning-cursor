'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type Value = { num: string; title_en: string; title_ar: string; body_en: string; body_ar: string };

const VALUES: Value[] = [
  {
    num: '01',
    title_en: 'Technical Excellence',
    title_ar: 'التميز التقني',
    body_en: 'We hold code, architecture, and delivery to the highest standards. No shortcuts, no technical debt swept under the rug.',
    body_ar: 'نحن نلتزم بأعلى معايير جودة الكود، وهندسة البرمجيات، والتسليم. لا توجد طرق مختصرة، ولا تراكم للديون التقنية على الإطلاق.',
  },
  {
    num: '02',
    title_en: 'Radical Transparency',
    title_ar: 'الشفافية المطلقة',
    body_en: "You'll always know exactly where your project stands. We communicate early, often, and honestly — especially when things get hard.",
    body_ar: 'ستعرف دائماً وبدقة أين يقف مشروعك. نحن نتواصل مبكراً، وباستمرار، وبصدق تام — خاصة عندما تواجهنا صعوبات.',
  },
  {
    num: '03',
    title_en: 'Client Obsession',
    title_ar: 'الاهتمام الفائق بالعملاء',
    body_en: 'We understand your business deeply enough to challenge your assumptions and build what you actually need, not just what you asked for.',
    body_ar: 'نحن نفهم عملك بعمق يكفي لمناقشة افتراضاتك وبناء ما تحتاجه بالفعل، وليس فقط ما تطلبه حرفياً.',
  },
  {
    num: '04',
    title_en: 'Continuous Learning',
    title_ar: 'التعلم المستمر',
    body_en: 'AI moves fast. Every engineer dedicates time each week to learning, experimenting, and bringing frontier ideas to client work.',
    body_ar: 'عالم الذكاء الاصطناعي يتحرك بسرعة. يخصص كل مهندس لدينا وقتاً كل أسبوع للتعلم والتجربة وتقديم الأفكار الرائدة لأعمال عملائنا.',
  },
  {
    num: '05',
    title_en: 'Security First',
    title_ar: 'الأمان أولاً',
    body_en: 'Every system is designed with security baked in from the ground up — not bolted on as an afterthought at the end of the sprint.',
    body_ar: 'يتم تصميم كل نظام مع دمج معايير الأمان فيه منذ البداية — وليس كإضافة ثانوية في نهاية عملية التطوير.',
  },
  {
    num: '06',
    title_en: 'Ownership Mentality',
    title_ar: 'عقلية الملكية والمسؤولية',
    body_en: 'We treat every project as if it\'s our own product — thinking beyond tickets to business outcomes, UX, and long-term scale.',
    body_ar: 'نحن نتعامل مع كل مشروع كما لو كان منتجنا الخاص — نفكر فيما وراء المهام إلى نتائج الأعمال وتجربة المستخدم والتوسع طويل المدى.',
  },
  {
    num: '07',
    title_en: 'Scalability by Design',
    title_ar: 'قابلية التوسع بالتصميم',
    body_en: 'We architect for tomorrow, not just today. Every system ships ready to scale 100x without a painful rewrite in 18 months.',
    body_ar: 'نحن نهندس للغد، وليس لليوم فقط. يتم شحن كل نظام جاهزاً للتوسع بمعدل 100 ضعف دون الحاجة لإعادة كتابة كود مرهقة بعد 18 شهراً.',
  },
  {
    num: '08',
    title_en: 'Inclusive Collaboration',
    title_ar: 'التعاون الشامل',
    body_en: 'The best ideas come from diverse perspectives. We build inclusive teams and create space for every voice to be heard.',
    body_ar: 'تأتي أفضل الأفكار من وجهات نظر متنوعة. نحن نبني فرقاً شاملة ونخلق مساحة كافية لسماع كل صوت والاهتمام به.',
  },
];

export function CoreValuesSection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="core-values"
      aria-labelledby="core-values-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t("CORE VALUES", "قيمنا الأساسية")}
          title={t("What We Stand For", "المبادئ التي نمثلها ونلتزم بها")}
          titleId="core-values-heading"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <article
              key={v.num}
              className="reveal flex flex-col gap-3 rounded-2xl border border-corematrix-border bg-corematrix-card p-7 transition-all duration-200 hover:border-corematrix-border2 hover:shadow-[0_0_30px_rgba(34,197,94,0.07)]"
            >
              <span className="font-display text-[2rem] font-extrabold leading-none tracking-tight text-corematrix-textDim">
                {v.num}
              </span>
              <h3 className="font-display text-sm font-bold text-corematrix-green400">
                {language === 'ar' ? v.title_ar : v.title_en}
              </h3>
              <p className="text-xs font-light leading-relaxed text-corematrix-textMuted">
                {language === 'ar' ? v.body_ar : v.body_en}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
