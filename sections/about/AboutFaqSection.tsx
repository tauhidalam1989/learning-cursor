'use client';

import Link from 'next/link';
import { TwoColumnFaqSection } from '@/components/shared/TwoColumnFaqSection';
import { useLanguage } from '@/context/LanguageContext';

type FaqItem = { q_en: string; q_ar: string; a_en: string; a_ar: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    q_en: 'How is Corematrix different from other IT agencies?',
    q_ar: 'ما الذي يميز كورماتريكس عن غيرها من الوكالات التقنية؟',
    a_en: "We embed as technical partners, not vendors. We invest in understanding your business deeply, challenge your assumptions constructively, and stay accountable for outcomes — not just deliverables. We're also genuinely AI-first: AI capabilities are built into every project by default, not sold as an add-on.",
    a_ar: 'نحن نندمج كشركاء تقنيين وليسوا مجرد بائعين. نحن نستثمر في فهم أعمالك بعمق، ونناقش افتراضاتك بشكل بناء، ونظل مسؤولين عن النتائج — وليس فقط المخرجات. كما أننا نركز على الذكاء الاصطناعي أولاً: حيث يتم دمج قدرات الذكاء الاصطناعي في كل مشروع بشكل افتراضي، ولا يتم بيعها كإضافة ثانوية.'
  },
  {
    q_en: 'What size companies do you typically work with?',
    q_ar: 'ما هو حجم الشركات التي تعملون معها عادةً؟',
    a_en: "We work across the spectrum — from well-funded startups building their first product to enterprise teams modernizing legacy systems. What matters more than company size is whether you're serious about technology as a strategic advantage.",
    a_ar: 'نحن نعمل مع مختلف الأحجام — من الشركات الناشئة ذات التمويل الجيد التي تبني منتجها الأول إلى فرق المؤسسات الكبرى التي تقوم بتحديث الأنظمة القديمة. ما يهمنا أكثر من حجم الشركة هو مدى جديتك في جعل التكنولوجيا ميزة استراتيجية تفوق بها منافسيك.'
  },
  {
    q_en: 'How do you handle project communication and transparency?',
    q_ar: 'كيف تتعاملون مع التواصل والشفافية في المشاريع؟',
    a_en: 'Every project gets a shared Notion workspace, weekly sprint demos, and async updates via Slack or your preferred tool. We use linear project management with public sprint boards so you can see exactly what\'s being worked on at any moment.',
    a_ar: 'يحصل كل مشروع على مساحة عمل مشتركة في Notion، وعروض أسبوعية لنتائج التطوير (sprint demos)، وتحديثات مستمرة عبر Slack أو أدواتك المفضلة. نحن نستخدم إدارة المشاريع الرشيقة مع لوحات مهام معلنة حتى تتمكن من رؤية ما يتم العمل عليه بالضبط في أي لحظة.'
  },
  {
    q_en: 'Do you sign NDAs and handle IP ownership correctly?',
    q_ar: 'هل توقعون اتفاقيات عدم الإفصاح (NDA) وتضمنون ملكية الملكية الفكرية؟',
    a_en: 'Yes. We sign NDAs before any discovery conversations. All IP created for your project is assigned to you at contract signing. Our standard agreement includes full IP transfer, non-compete clauses for your specific domain, and data confidentiality provisions.',
    a_ar: 'نعم. نحن نوقع اتفاقيات عدم الإفصاح (NDAs) قبل أي محادثات استكشافية. يتم نقل جميع حقوق الملكية الفكرية المنشأة لمشروعك إليك بالكامل عند توقيع العقد. تتضمن اتفاقيتنا القياسية نقلاً كاملاً للملكية الفكرية، وبنود عدم المنافسة في مجالك الخاص، وأحكام سرية البيانات.'
  },
  {
    q_en: 'What does the onboarding process look like?',
    q_ar: 'كيف تبدو عملية بدء العمل معكم (Onboarding)؟',
    a_en: 'After signing, we run a 2-week Discovery Sprint — stakeholder interviews, tech audit, architecture planning, and roadmap creation. You get a full technical specification and project plan before a single line of production code is written.',
    a_ar: 'بعد التوقيع، نقوم بتشغيل دورة استكشاف وتخطيط مدتها أسبوعان (Discovery Sprint) — مقابلات مع أصحاب المصلحة، وتدقيق تقني، وتخطيط البنية التحتية، وإنشاء خارطة الطريق. ستحصل على مواصفات فنية كاملة وخطة مشروع مفصلة قبل كتابة سطر كود إنتاجي واحد.'
  },
  {
    q_en: 'Where is the Corematrix team located?',
    q_ar: 'أين يقع فريق عمل كورماتريكس؟',
    a_en: "We're a remote-first company with team members across multiple time zones. We deliberately maintain overlap hours across US, European, and Asian time zones. All project management and delivery is optimized for async-first, remote collaboration.",
    a_ar: 'نحن شركة تعمل عن بعد أولاً مع أعضاء فريق يتواجدون في مناطق زمنية متعددة. نحن نحافظ بوعي على ساعات عمل متداخلة تغطي المناطق الزمنية الأمريكية والأوروبية والآسيوية. تم تحسين جميع عمليات إدارة المشاريع والتسليم للتعاون عن بعد أولاً وغير المتزامن.'
  },
];

export function AboutFaqSection() {
  const { t, language } = useLanguage();

  const localizedItems = FAQ_ITEMS.map((item) => ({
    q: language === 'ar' ? item.q_ar : item.q_en,
    a: language === 'ar' ? item.a_ar : item.a_en,
  }));

  return (
    <TwoColumnFaqSection
      sectionId="about-faq"
      headingId="about-faq-heading"
      title={t("Questions About Working With Us", "أسئلة شائعة حول العمل معنا")}
      description={t("Everything you need to know before reaching out. Still have questions? Just ask.", "كل ما تحتاج إلى معرفته قبل التواصل معنا. هل لا تزال لديك أسئلة؟ فقط اسألنا.")}
      items={localizedItems}
      sectionClassName="border-t border-corematrix-border bg-corematrix-bg2 py-24"
      cta={
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
        >
          {t("Ask Us Anything →", "اسألنا عن أي شيء ←")}
        </Link>
      }
    />
  );
}
