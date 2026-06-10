'use client';

import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';

export function TermsContent() {
  const { t } = useLanguage();

  const sections = [
    {
      num: '01',
      title: t('Acceptance of Terms', 'قبول الشروط'),
      body: t(
        `By accessing or using the Corematrix website at ${siteConfig.url} or engaging our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.`,
        `من خلال الوصول إلى موقع كورماتريكس الإلكتروني أو استخدامه على ${siteConfig.url} أو الاستعانة بخدماتنا، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق، يرجى عدم استخدام موقعنا أو خدماتنا.`
      ),
    },
    {
      num: '02',
      title: t('Services', 'الخدمات'),
      body: t(
        'Corematrix provides IT services including AI development, web application development, SaaS platform development, mobile app development, and dedicated engineering teams. Specific terms for individual engagements are governed by separate written agreements signed by both parties.',
        'تقدم كورماتريكس خدمات تكنولوجيا المعلومات بما في ذلك تطوير الذكاء الاصطناعي، وتطوير تطبيقات الويب، وتطوير منصات SaaS، وتطوير تطبيقات الهاتف المحمول، وفرق الهندسة المخصصة. تخضع الشروط المحددة لكل تعاقد فردي لاتفاقيات مكتوبة منفصلة موقعة من كلا الطرفين.'
      ),
    },
    {
      num: '03',
      title: t('Intellectual Property', 'الملكية الفكرية'),
      body: t(
        'All intellectual property created by Corematrix for a client under a paid engagement is assigned to the client upon full payment, as specified in our project agreements. Our proprietary frameworks, methodologies, and internal tooling remain the property of Corematrix.',
        'يتم التنازل عن جميع حقوق الملكية الفكرية التي تنشئها كورماتريكس للعميل بموجب تعاقد مدفوع الأجر لصالح العميل عند السداد الكامل للمستحقات، كما هو محدد في اتفاقيات المشروع الخاصة بنا. تظل الأطر المنهجية وأدوات العمل الداخلية الخاصة بنا ملكاً لكورماتريكس.'
      ),
    },
    {
      num: '04',
      title: t('Limitation of Liability', 'تحديد المسؤولية'),
      body: t(
        'To the maximum extent permitted by law, Corematrix shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.',
        'إلى أقصى حد يسمح به القانون، لا تتحمل كورماتريكس المسؤولية عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية تنشأ عن استخدامك لخدماتنا. يجب ألا تتجاوز مسؤوليتنا الإجمالية المبلغ المدفوع من قبلك مقابل الخدمة المحددة التي نشأ عنها الادعاء.'
      ),
    },
    {
      num: '05',
      title: t('Governing Law', 'القانون الواجب التطبيق'),
      body: t(
        'These terms shall be governed by and construed in accordance with applicable international law. Any disputes shall be resolved through good-faith negotiation, followed by binding arbitration if necessary.',
        'تخضع هذه الشروط وتُفسر وفقاً للقانون الدولي المعمول به. يتم تسوية أي نزاعات من خلال المفاوضات بحسن نية، تليها عملية تحكيم ملزمة إذا لزم الأمر.'
      ),
    },
    {
      num: '06',
      title: t('Contact', 'الاتصال'),
      body: '',
    },
  ];

  return (
    <main className="pt-24 pb-20 px-[6vw] max-w-[760px] mx-auto">
      <nav
        aria-label={t("Breadcrumb", "مسار التنقل")}
        className="flex items-center gap-2 text-xs text-corematrix-textDim mb-6"
      >
        <a
          href="/"
          className="hover:text-corematrix-green400 transition-colors"
        >
          {t('Home', 'الرئيسية')}
        </a>
        <span aria-hidden>›</span>
        <span className="text-corematrix-green400">{t('Terms of Service', 'شروط الخدمة')}</span>
      </nav>

      <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-corematrix-green400/15 bg-corematrix-green900/20 px-4 py-2 font-mono text-sm text-corematrix-green400">
        {t('Last Updated: March 2026', 'آخر تحديث: مارس 2026')}
      </div>

      <h1
        className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-corematrix-textPrimary mb-3"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {t('Terms of Service', 'شروط الخدمة')}
      </h1>

      <p className="text-sm text-corematrix-textMuted mb-10">
        {t(
          'Effective: 1 March 2026 · Last updated: 20 March 2026',
          'تاريخ النفاذ: 1 مارس 2026 · آخر تحديث: 20 مارس 2026'
        )}
      </p>

      <div className="bg-corematrix-card border border-corematrix-border border-l-[3px] border-l-corematrix-green700 rounded-r-xl p-5 text-sm text-corematrix-textMuted font-light leading-relaxed mb-10">
        <strong className="text-corematrix-green400">{t('Summary:', 'ملخص:')}</strong>{' '}
        {t(
          'By using our website and services, you agree to these terms. We provide IT services in good faith and expect the same from our clients. Full legal detail is provided in each section below.',
          'باستخدامك لموقعنا وخدماتنا، فإنك توافق على هذه الشروط. نحن نقدم خدمات تكنولوجيا المعلومات بحسن نية ونتوقع الشيء نفسه من عملائنا. يتم توفير التفاصيل القانونية الكاملة في كل قسم أدناه.'
        )}
      </div>

      {sections.map((s) => (
        <section key={s.num} className="mb-10 scroll-mt-24">
          <div className="flex items-start gap-4 pb-5 mb-5 border-b border-corematrix-border">
            <span className="font-mono text-sm text-corematrix-green700 font-medium flex-shrink-0 mt-0.5 w-7">
              {s.num}
            </span>
            <h2
              className="font-display text-xl font-extrabold text-corematrix-textPrimary tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {s.title}
            </h2>
          </div>
          {s.body ? (
            <p className="text-sm text-corematrix-textMuted font-light leading-[1.8] pl-11">
              {s.body}
            </p>
          ) : (
            <p className="text-sm text-corematrix-textMuted font-light leading-[1.8] pl-11">
              {t('Questions about these terms? ', 'هل لديك أسئلة حول هذه الشروط؟ ')}{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-corematrix-green400 border-b border-corematrix-green400/25 hover:border-corematrix-green400 transition-colors"
              >
                {siteConfig.email}
              </a>
            </p>
          )}
        </section>
      ))}
    </main>
  );
}
