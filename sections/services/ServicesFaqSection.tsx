'use client';

import Link from 'next/link';
import { TwoColumnFaqSection } from '@/components/shared/TwoColumnFaqSection';
import { useLanguage } from '@/context/LanguageContext';

const FAQ_ITEMS = [
  {
    q: 'How quickly can you start on a new project?',
    a: "For new projects, we typically begin the Discovery Sprint within 1–2 weeks of contract signing. For dedicated team placements, we can have engineers embedded and productive within 5–7 business days. We don't keep a bench of idle engineers — our team is carefully matched to your specific technology requirements.",
  },
  {
    q: "What's the minimum project size you work with?",
    a: 'Our minimum engagement is typically a 6-week project or a 2-month dedicated team retainer. This ensures we can deliver meaningful value rather than rushing through a project that deserves more care. For very small projects (under $10k), we\'re happy to point you toward suitable alternatives honestly.',
  },
  {
    q: 'Do you work with clients who already have a partial codebase?',
    a: "Absolutely — and this is one of our most common engagement types. We begin with a codebase audit during the Discovery Sprint, identify technical debt and architectural issues, and propose a remediation plan before continuing development. We won't inherit a codebase without understanding it first.",
  },
  {
    q: 'How do you handle data security and confidentiality for AI projects?',
    a: 'All client data used in AI projects is handled under strict confidentiality agreements. We use anonymization and synthetic data for development where possible, implement data minimization principles, and ensure no client data is used to train or improve any third-party models. For regulated industries, we have HIPAA and GDPR-compliant infrastructure patterns available.',
  },
  {
    q: 'What technologies do you NOT work with?',
    a: "We don't do .NET/C# development, iOS native Swift-only projects, or low-code/no-code platform customizations. We're a JavaScript/TypeScript and Python house — these are the stacks where we're genuinely world-class, and we'd rather be honest than take work we can't do excellently.",
  },
  {
    q: 'Can you work within our existing project management process?',
    a: "Yes. We adapt to your tooling — Jira, Linear, Notion, Asana, GitHub Projects, whatever you use. We don't require you to change your PM process to work with us. We bring the engineering rigour; we fit into your existing planning and communication rhythms.",
  },
] as const;

// Explicitly typed translation maps for i18n
const questionTranslations: Record<string, string> = {
  'How quickly can you start on a new project?': 'ما هي السرعة التي يمكنكم بها البدء في مشروع جديد؟',
  "What's the minimum project size you work with?": 'ما هو الحد الأدنى لحجم المشروع الذي تعملون معه؟',
  'Do you work with clients who already have a partial codebase?': 'هل تعملون مع عملاء لديهم بالفعل كود برمجي جزئي؟',
  'How do you handle data security and confidentiality for AI projects?': 'كيف تتعاملون مع أمن البيانات وسريتها في مشاريع الذكاء الاصطناعي؟',
  'What technologies do you NOT work with?': 'ما هي التقنيات التي لا تعملون بها؟',
  'Can you work within our existing project management process?': 'هل يمكنكم العمل ضمن عملية إدارة المشاريع الحالية لدينا؟',
};

const answerTranslations: Record<string, string> = {
  "For new projects, we typically begin the Discovery Sprint within 1–2 weeks of contract signing. For dedicated team placements, we can have engineers embedded and productive within 5–7 business days. We don't keep a bench of idle engineers — our team is carefully matched to your specific technology requirements.":
    'بالنسبة للمشاريع الجديدة، نبدأ عادةً سبرينت الاستكشاف (Discovery Sprint) في غضون أسبوع إلى أسبوعين من توقيع العقد. بالنسبة لتعيين الفرق المخصصة، يمكننا دمج المهندسين وتهيئتهم للإنتاج في غضون 5 إلى 7 أيام عمل. نحن لا نحتفظ بمهندسين غير نشطين — بل يتم اختيار فريقنا بعناية ليتناسب مع متطلباتك التقنية المحددة.',
  "Our minimum engagement is typically a 6-week project or a 2-month dedicated team retainer. This ensures we can deliver meaningful value rather than rushing through a project that deserves more care. For very small projects (under $10k), we're happy to point you toward suitable alternatives honestly.":
    'عادة ما يكون الحد الأدنى للمشاركة لدينا هو مشروع مدته 6 أسابيع أو الاحتفاظ بفريق مخصص لمدة شهرين. وهذا يضمن قدرتنا على تقديم قيمة حقيقية بدلاً من الاستعجال في مشروع يستحق المزيد من الرعاية. بالنسبة للمشاريع الصغيرة جداً (أقل من 10 آلاف دولار)، يسعدنا إرشادك بصدق نحو بدائل مناسبة.',
  "Absolutely — and this is one of our most common engagement types. We begin with a codebase audit during the Discovery Sprint, identify technical debt and architectural issues, and propose a remediation plan before continuing development. We won't inherit a codebase without understanding it first.":
    'بالتأكيد — وهذا أحد أكثر أنواع مشاريعنا شيوعاً. نبدأ بتدقيق الكود البرمجي خلال سبرينت الاستكشاف، وتحديد الديون التقنية والمشكلات الهندسية المعمارية، واقتراح خطة معالجة قبل مواصلة التطوير. لن نرث كوداً برمجياً دون فهمه أولاً.',
  "All client data used in AI projects is handled under strict confidentiality agreements. We use anonymization and synthetic data for development where possible, implement data minimization principles, and ensure no client data is used to train or improve any third-party models. For regulated industries, we have HIPAA and GDPR-compliant infrastructure patterns available.":
    'يتم التعامل مع جميع بيانات العملاء المستخدمة في مشاريع الذكاء الاصطناعي بموجب اتفاقيات سرية صارمة. ونستخدم إخفاء الهوية والبيانات الاصطناعية للتطوير حيثما أمكن ذلك، ونطبق مبادئ تقليل البيانات، ونضمن عدم استخدام أي من بيانات العملاء لتدريب أو تحسين أي نماذج تابعة لجهات خارجية. بالنسبة للقطاعات المنظمة، لدينا أنماط بنية تحتية متوافقة مع HIPAA و GDPR.',
  "We don't do .NET/C# development, iOS native Swift-only projects, or low-code/no-code platform customizations. We're a JavaScript/TypeScript and Python house — these are the stacks where we're genuinely world-class, and we'd rather be honest than take work we can't do excellently.":
    'نحن لا نقوم بتطوير .NET/C#، أو مشاريع iOS الأصلية بلغة Swift فقط، أو تخصيصات المنصات منخفضة الكود/بدون كود. نحن متخصصون في JavaScript/TypeScript و Python — هذه هي البيئات التقنية التي نتميز فيها بمستوى عالمي حقاً، ونفضل أن نكون صادقين بدلاً من قبول عمل لا يمكننا إنجازه بامتياز.',
  "Yes. We adapt to your tooling — Jira, Linear, Notion, Asana, GitHub Projects, whatever you use. We don't require you to change your PM process to work with us. We bring the engineering rigour; we fit into your existing planning and communication rhythms.":
    'نعم. نحن نتكيف مع أدواتك — Jira أو Linear أو Notion أو Asana أو GitHub Projects أو أي شيء تستخدمه. لا نطالبك بتغيير عملية إدارة المشاريع الخاصة بك للعمل معنا. نحن نجلب الانضباط الهندسي؛ ونندمج في إيقاعات التخطيط والتواصل الحالية لديك.',
};

export function ServicesFaqSection() {
  const { t } = useLanguage();

  const translatedFaqs = FAQ_ITEMS.map((item) => ({
    q: t(item.q, questionTranslations[item.q] ?? item.q),
    a: t(item.a, answerTranslations[item.a] ?? item.a),
  }));

  return (
    <TwoColumnFaqSection
      sectionId="services-faq"
      headingId="services-faq-heading"
      label={t('FAQ', 'الأسئلة الشائعة')}
      title={t('Services FAQ', 'الأسئلة الشائعة حول الخدمات')}
      description={t(
        'Common questions about our services, process, and engagement models.',
        'أسئلة شائعة حول خدماتنا، وعملياتنا، ونماذج التعاقد لدينا.'
      )}
      items={translatedFaqs}
      cta={
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
        >
          {t('Ask a Different Question →', 'اسأل سؤالاً مختلفاً →')}
        </Link>
      }
    />
  );
}
