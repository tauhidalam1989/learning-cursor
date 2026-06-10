'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';
import {
  POLICY_SECTIONS,
  PURPOSE_ROWS,
  RETENTION_ROWS,
  COOKIE_ROWS,
  USER_RIGHTS,
} from '@/data/privacyData';

const sectionTitles: Record<string, { en: string; ar: string }> = {
  s1: { en: 'Who We Are', ar: 'من نحن' },
  s2: { en: 'Data We Collect', ar: 'البيانات التي نجمعها' },
  s3: { en: 'How We Use Data', ar: 'كيفية استخدامنا للبيانات' },
  s4: { en: 'Legal Basis', ar: 'الأساس القانوني' },
  s5: { en: 'Data Sharing', ar: 'مشاركة البيانات' },
  s6: { en: 'Retention', ar: 'الاحتفاظ بالبيانات' },
  s7: { en: 'Your Rights', ar: 'حقوقك' },
  s8: { en: 'Security', ar: 'الأمان' },
  s9: { en: 'Cookies', ar: 'ملفات تعريف الارتباط (الكوكيز)' },
  s10: { en: 'International Transfers', ar: 'نقل البيانات دولياً' },
  s11: { en: "Children's Privacy", ar: 'خصوصية الأطفال' },
  s12: { en: 'Changes', ar: 'التغييرات على هذه السياسة' },
  s13: { en: 'Contact Us', ar: 'اتصل بنا' },
};

export function PolicyContent() {
  const { t } = useLanguage();

  return (
    <div className="max-w-[720px]">
      {POLICY_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="policy-section scroll-mt-[90px] mb-14"
        >
          <div className="mb-6 flex items-start gap-4 border-b border-corematrix-border pb-5">
            <span className="mt-0.5 w-7 flex-shrink-0 font-mono text-sm font-medium text-corematrix-green700">
              {section.num}
            </span>
            <h2 className="font-display text-[1.3rem] font-extrabold leading-snug tracking-tight text-corematrix-textPrimary">
              {t(sectionTitles[section.id]?.en || section.title, sectionTitles[section.id]?.ar || section.title)}
            </h2>
          </div>

          {section.id === 's1' && <Section1Content />}
          {section.id === 's2' && <Section2Content />}
          {section.id === 's3' && <Section3Content />}
          {section.id === 's4' && <Section4Content />}
          {section.id === 's5' && <Section5Content />}
          {section.id === 's6' && <Section6Content />}
          {section.id === 's7' && <Section7Content />}
          {section.id === 's8' && <Section8Content />}
          {section.id === 's9' && <Section9Content />}
          {section.id === 's10' && <Section10Content />}
          {section.id === 's11' && <Section11Content />}
          {section.id === 's12' && <Section12Content />}
          {section.id === 's13' && <Section13Content />}
        </section>
      ))}

      <div className="mt-12 flex items-center gap-2 rounded-lg border border-corematrix-green700/15 bg-corematrix-green900/[0.04] px-4 py-3 font-mono text-xs text-corematrix-textMuted">
        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-corematrix-green400" />
        {t("This policy was last updated on ", "تم تحديث هذه السياسة آخر مرة في ")}
        <strong className="mx-1 text-corematrix-green400">{t("20 March 2026", "20 مارس 2026")}</strong>
        {t("and is effective immediately.", "وهي سارية المفعول على الفور.")}
      </div>
    </div>
  );
}

function Section1Content() {
  const { t } = useLanguage();
  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted last:mb-0">
        {t(
          "Corematrix is an AI-first IT services and consulting company. We act as data controller for website visitors, marketing, and business development. When we deliver services to clients, we act as a data processor under their instructions.",
          "كورماتريكس هي شركة خدمات واستشارات تكنولوجيا معلومات تركز على الذكاء الاصطناعي أولاً. نحن نعمل كمراقب للبيانات لزوار الموقع الإلكتروني والتسويق وتطوير الأعمال. وعندما نقدم خدماتنا للعملاء، فإننا نعمل كمعالج للبيانات بموجب توجيهاتهم."
        )}
      </p>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted last:mb-0">
        {t("If you have questions about how we handle your data, contact us at ", "إذا كانت لديك أسئلة حول كيفية تعاملنا مع بياناتك، فاتصل بنا على ")}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-corematrix-green400 transition-colors hover:underline"
        >
          {siteConfig.email}
        </a>{' '}
        {t("before using our services.", "قبل استخدام خدماتنا.")}
      </p>
    </>
  );
}

function Section2Content() {
  const { t } = useLanguage();
  return (
    <>
      <h3 className="mb-3 mt-6 flex items-center gap-2 font-display text-base font-bold text-corematrix-textSecondary">
        <span className="h-[1em] w-[3px] flex-shrink-0 rounded-sm bg-corematrix-green700" />
        {t("Data you provide directly", "بيانات تقدمها بنفسك")}
      </h3>
      <ul className="mb-4 list-none space-y-2 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {[
          t('Contact form submissions (name, email, phone, company, message)', 'إرسال نموذج الاتصال (الاسم، البريد الإلكتروني، الهاتف، الشركة، الرسالة)'),
          t('Job applications (CV, cover letter, portfolio links)', 'طلبات التوظيف (السيرة الذاتية، خطاب التقديم، روابط معرض الأعمال)'),
          t('Newsletter sign-ups (email, first name)', 'الاشتراك في النشرة الإخبارية (البريد الإلكتروني، الاسم الأول)'),
          t('Project enquiry and discovery call details', 'تفاصيل استفسارات المشروع ومكالمات الاستكشاف'),
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 before:mt-2 before:block before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-corematrix-green700 before:content-['']">
            {item}
          </li>
        ))}
      </ul>

      <h3 className="mb-3 mt-6 flex items-center gap-2 font-display text-base font-bold text-corematrix-textSecondary">
        <span className="h-[1em] w-[3px] flex-shrink-0 rounded-sm bg-corematrix-green700" />
        {t("Data collected automatically", "بيانات تُجمع تلقائياً")}
      </h3>
      <ul className="mb-4 list-none space-y-2 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {[
          t('IP address (anonymised where possible)', 'عنوان IP (مجهول الهوية حيثما أمكن ذلك)'),
          t('Browser type and device info', 'نوع المتصفح ومعلومات الجهاز'),
          t('Pages visited and time on site', 'الصفحات التي تمت زيارتها والوقت الذي تقضيه في الموقع'),
          t('Referrer URL', 'رابط الإحالة المرجعي (Referrer URL)'),
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 before:mt-2 before:block before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-corematrix-green700 before:content-['']">
            {item}
          </li>
        ))}
      </ul>

      <h3 className="mb-3 mt-6 flex items-center gap-2 font-display text-base font-bold text-corematrix-textSecondary">
        <span className="h-[1em] w-[3px] flex-shrink-0 rounded-sm bg-corematrix-green700" />
        {t("Data from third parties", "بيانات من أطراف ثالثة")}
      </h3>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {t(
          "We may receive limited contact data from partners or referrals when you have consented to that sharing. We do not buy or trade contact lists.",
          "قد نتلقى بيانات اتصال محدودة من الشركاء أو الإحالات عندما تكون قد وافقت على هذه المشاركة. نحن لا نشتري أو نتاجر بقوائم الاتصال."
        )}
      </p>

      <div className="my-5 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-900/[0.08] p-4">
        <span className="mt-1 shrink-0 text-xs text-amber-500" aria-hidden>
          <i className="fas fa-exclamation-triangle" />
        </span>
        <div className="text-sm font-light leading-relaxed text-corematrix-textMuted">
          <strong className="text-corematrix-textSecondary">{t("What we never collect:", "ما لا نجمعه أبداً:")}</strong>{' '}
          {t(
            "Sensitive categories (health, ethnicity, political views), precise geolocation, or data obtained through dark patterns. We do not engage in cross-site tracking.",
            "الفئات الحساسة (الصحة، العرق، الآراء السياسية)، الموقع الجغرافي الدقيق، أو البيانات التي يتم الحصول عليها عبر الأنماط الخادعة والمظلمة. نحن لا نشارك في التتبع عبر المواقع."
          )}
        </div>
      </div>
    </>
  );
}

function Section3Content() {
  const { t } = useLanguage();

  const translatedPurposes: Record<string, { purpose: string; dataUsed: string; basis: string }> = {
    'Respond to enquiries and project requests': {
      purpose: 'الرد على الاستفسارات وطلبات المشاريع',
      dataUsed: 'الاسم، البريد الإلكتروني، الهاتف، تفاصيل المشروع',
      basis: 'المصلحة المشروعة / العقد',
    },
    'Deliver contracted services': {
      purpose: 'تقديم الخدمات المتعاقد عليها',
      dataUsed: 'بيانات الاتصال، الفواتير، بيانات المشروع',
      basis: 'تنفيذ العقد',
    },
    'Send newsletter (if subscribed)': {
      purpose: 'إرسال النشرة الإخبارية (إذا كنت مشتركاً)',
      dataUsed: 'البريد الإلكتروني، الاسم الأول',
      basis: 'الموافقة',
    },
    'Process job applications': {
      purpose: 'معالجة طلبات التوظيف',
      dataUsed: 'بيانات الطلب',
      basis: 'خطوات ما قبل التعاقد',
    },
    'Improve our website and services': {
      purpose: 'تحسين موقعنا الإلكتروني وخدماتنا',
      dataUsed: 'بيانات الاستخدام والتحليلات',
      basis: 'المصلحة المشروعة',
    },
    'Legal and compliance obligations': {
      purpose: 'الالتزامات القانونية والامتثال',
      dataUsed: 'حسب متطلبات القانون',
      basis: 'الالتزام القانوني',
    },
    'Prevent fraud and ensure security': {
      purpose: 'منع الاحتيال وضمان الأمن',
      dataUsed: 'البيانات التقنية وبيانات الاستخدام',
      basis: 'المصلحة المشروعة',
    },
  };

  const ROW_THEMES = [
    {
      bg: 'bg-cyan-950/15',
      hoverBg: 'hover:bg-cyan-950/30',
      borderColor: 'border-cyan-500/10',
      text: 'text-cyan-300',
      subtext: 'text-cyan-400/80',
    },
    {
      bg: 'bg-amber-950/15',
      hoverBg: 'hover:bg-amber-950/30',
      borderColor: 'border-amber-500/10',
      text: 'text-amber-300',
      subtext: 'text-amber-400/80',
    },
    {
      bg: 'bg-indigo-950/15',
      hoverBg: 'hover:bg-indigo-950/30',
      borderColor: 'border-indigo-500/10',
      text: 'text-indigo-300',
      subtext: 'text-indigo-400/80',
    },
    {
      bg: 'bg-purple-950/15',
      hoverBg: 'hover:bg-purple-950/30',
      borderColor: 'border-purple-500/10',
      text: 'text-purple-300',
      subtext: 'text-purple-400/80',
    },
    {
      bg: 'bg-orange-950/15',
      hoverBg: 'hover:bg-orange-950/30',
      borderColor: 'border-orange-500/10',
      text: 'text-orange-300',
      subtext: 'text-orange-400/80',
    },
    {
      bg: 'bg-sky-950/15',
      hoverBg: 'hover:bg-sky-950/30',
      borderColor: 'border-sky-500/10',
      text: 'text-sky-300',
      subtext: 'text-sky-400/80',
    },
    {
      bg: 'bg-rose-950/15',
      hoverBg: 'hover:bg-rose-950/30',
      borderColor: 'border-rose-500/10',
      text: 'text-rose-300',
      subtext: 'text-rose-400/80',
    },
  ];

  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {t(
          "We use your data only for the purposes below. Each purpose has a clear legal basis under GDPR.",
          "نحن نستخدم بياناتك فقط للأغراض الموضحة أدناه. لكل غرض أساس قانوني واضح بموجب اللائحة العامة لحماية البيانات (GDPR)."
        )}
      </p>
      <div className="my-5 overflow-x-auto">
        <table className="my-5 w-full border-collapse border border-corematrix-border overflow-hidden rounded-xl text-sm">
          <caption className="sr-only">{t("Data processing purposes and legal bases", "أغراض معالجة البيانات والأسس القانونية")}</caption>
          <thead className="bg-corematrix-card2">
            <tr>
              <th className="border-b border-corematrix-border px-4 py-4 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                {t('Purpose', 'الغرض')}
              </th>
              <th className="border-b border-corematrix-border px-4 py-4 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                {t('Data Used', 'البيانات المستخدمة')}
              </th>
              <th className="border-b border-corematrix-border px-4 py-4 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                {t('Legal Basis', 'الأساس القانوني')}
              </th>
            </tr>
          </thead>
          <tbody>
            {PURPOSE_ROWS.map((row, idx) => {
              const trans = translatedPurposes[row.purpose];
              const theme = ROW_THEMES[idx % ROW_THEMES.length];
              return (
                <tr key={row.purpose} className={`${theme.bg} ${theme.hoverBg} transition-colors duration-300`}>
                  <td className={`border-b ${theme.borderColor} px-4 py-6 align-middle font-medium ${theme.text}`}>
                    {t(row.purpose, trans?.purpose || row.purpose)}
                  </td>
                  <td className={`border-b ${theme.borderColor} px-4 py-6 align-middle font-light leading-snug ${theme.subtext}`}>
                    {t(row.dataUsed, trans?.dataUsed || row.dataUsed)}
                  </td>
                  <td className={`border-b ${theme.borderColor} px-4 py-6 align-middle font-semibold ${theme.text}`}>
                    {t(row.basis, trans?.basis || row.basis)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {t(
          "We never use your data for automated profiling or automated decisions that significantly affect you.",
          "نحن لا نستخدم بياناتك أبداً لإعداد التقارير التلقائية أو اتخاذ قرارات تلقائية تؤثر عليك بشكل كبير."
        )}
      </p>
    </>
  );
}

function Section4Content() {
  const { t } = useLanguage();
  return (
    <>
      <ul className="mb-4 list-none space-y-2 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {[
          t('Consent (Art 6(1)(a)) — e.g. newsletter, optional cookies', 'الموافقة (المادة 6(1)(أ)) — على سبيل المثال: النشرة الإخبارية، ملفات تعريف الارتباط الاختيارية'),
          t('Contract (Art 6(1)(b)) — processing necessary to perform a contract with you', 'العقد (المادة 6(1)(ب)) — المعالجة ضرورية لتنفيذ عقد معك'),
          t('Legal obligation (Art 6(1)(c)) — e.g. tax, compliance, law enforcement requests', 'الالتزام القانوني (المادة 6(1)(ج)) — على سبيل المثال: الضرائب، الامتثال، طلبات إنفاذ القانون'),
          t('Legitimate interests (Art 6(1)(f)) — e.g. fraud prevention, improving our services, responding to enquiries', 'المصالح المشروعة (المادة 6(1)(و)) — على سبيل المثال: منع الاحتيال، تحسين خدماتنا، الرد على الاستفسارات'),
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 before:mt-2 before:block before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-corematrix-green700 before:content-['']">
            {item}
          </li>
        ))}
      </ul>
      <div className="my-5 rounded-xl border border-corematrix-green700/20 bg-corematrix-green900/[0.05] p-5 text-sm font-light leading-relaxed text-corematrix-textSecondary">
        <strong>{t('Right to Object:', 'حق الاعتراض:')}</strong>{' '}
        {t(
          "Where we rely on legitimate interests, you may object at any time. Contact us at ",
          "عندما نعتمد على المصالح المشروعة، يمكنك الاعتراض في أي وقت. اتصل بنا على "
        )}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-corematrix-green400 transition-colors hover:underline"
        >
          {siteConfig.email}
        </a>{' '}
        {t("to exercise this right.", "لممارسة هذا الحق.")}
      </div>
    </>
  );
}

function Section5Content() {
  const { t } = useLanguage();
  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        <strong className="text-corematrix-textSecondary">
          {t("We do not sell, rent, or trade your personal data — ever.", "نحن لا نبيع أو نؤجر أو نتاجر ببياناتك الشخصية — على الإطلاق.")}
        </strong>
      </p>

      <h3 className="mb-3 mt-6 flex items-center gap-2 font-display text-base font-bold text-corematrix-textSecondary">
        <span className="h-[1em] w-[3px] flex-shrink-0 rounded-sm bg-corematrix-green700" />
        {t("Service providers", "مقدمو الخدمات")}
      </h3>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {t(
          "We share data only with processors who help us operate (e.g. hosting, email, analytics). All processors are bound by data processing agreements and handle data only as instructed.",
          "نحن نشارك البيانات فقط مع المعالجين الذين يساعدوننا في العمل والتشغيل (مثل الاستضافة، البريد الإلكتروني، التحليلات). يلتزم جميع المعالجين باتفاقيات معالجة البيانات ويتعاملون معها فقط وفقاً للتوجيهات والتعليمات المحددة."
        )}
      </p>

      <h3 className="mb-3 mt-6 flex items-center gap-2 font-display text-base font-bold text-corematrix-textSecondary">
        <span className="h-[1em] w-[3px] flex-shrink-0 rounded-sm bg-corematrix-green700" />
        {t("Legal requirements", "المتطلبات القانونية")}
      </h3>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {t(
          "We may disclose data when required by law, court order, or to protect our rights and safety.",
          "يجوز لنا الكشف عن البيانات عندما يقتضي القانون ذلك، أو بموجب أمر محكمة، أو لحماية حقوقنا وسلامتنا."
        )}
      </p>

      <h3 className="mb-3 mt-6 flex items-center gap-2 font-display text-base font-bold text-corematrix-textSecondary">
        <span className="h-[1em] w-[3px] flex-shrink-0 rounded-sm bg-corematrix-green700" />
        {t("Business transfers", "انتقال ملكية الشركة")}
      </h3>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {t(
          "If Corematrix is acquired or merges, your data may transfer to the new entity. You will be notified of any material change in ownership.",
          "إذا تم الاستحواذ على كورماتريكس أو دمجها، فقد تنتقل بياناتك إلى الكيان الجديد. سيتم إخطارك بأي تغيير جوهري في الملكية."
        )}
      </p>

      <div className="my-5 rounded-xl border border-corematrix-green700/20 bg-corematrix-green900/[0.05] p-5 text-sm font-light leading-relaxed text-corematrix-textSecondary">
        <strong>{t("No advertising networks:", "لا توجد شبكات إعلانية:")}</strong>{' '}
        {t(
          "We do not use advertising cookies or retargeting. Your data is not shared with ad networks.",
          "نحن لا نستخدم ملفات تعريف الارتباط الإعلانية أو إعادة الاستهداف. لا تتم مشاركة بياناتك مع الشبكات الإعلانية."
        )}
      </div>
    </>
  );
}

function Section6Content() {
  const { t } = useLanguage();

  const translatedRetention: Record<string, { dataType: string; period: string; reason: string }> = {
    'Contact enquiry data': {
      dataType: 'بيانات استفسارات الاتصال',
      period: '3 سنوات من تاريخ آخر اتصال',
      reason: 'إدارة علاقات العمل والتطوير',
    },
    'Active client data': {
      dataType: 'بيانات العملاء النشطين',
      period: 'مدة العقد + 7 سنوات',
      reason: 'الالتزامات القانونية والضريبية والتعاقدية',
    },
    'Newsletter subscribers': {
      dataType: 'مشتركو النشرة الإخبارية',
      period: 'حتى إلغاء الاشتراك',
      reason: 'قائم على الموافقة — أنت تتحكم في هذا بالكامل',
    },
    'Unsuccessful job applications': {
      dataType: 'طلبات التوظيف غير الناجحة',
      period: '6 أشهر',
      reason: 'فرص العمل المستقبلية (مع إخطارك بذلك)',
    },
    'Website analytics data': {
      dataType: 'بيانات تحليلات الموقع الإلكتروني',
      period: '14 شهراً (مجهولة الهوية)',
      reason: 'تحليل الاتجاهات والتحسين',
    },
    'Server logs': {
      dataType: 'سجلات الخادم (Server logs)',
      period: '90 يوماً',
      reason: 'الأمان ومنع الاحتيال',
    },
    'Financial records': {
      dataType: 'السجلات المالية',
      period: '7 سنوات',
      reason: 'الامتثال القانوني والضريبي',
    },
  };

  const ROW_THEMES = [
    {
      bg: 'bg-cyan-950/15',
      hoverBg: 'hover:bg-cyan-950/30',
      borderColor: 'border-cyan-500/10',
      text: 'text-cyan-300',
      subtext: 'text-cyan-400/80',
    },
    {
      bg: 'bg-amber-950/15',
      hoverBg: 'hover:bg-amber-950/30',
      borderColor: 'border-amber-500/10',
      text: 'text-amber-300',
      subtext: 'text-amber-400/80',
    },
    {
      bg: 'bg-indigo-950/15',
      hoverBg: 'hover:bg-indigo-950/30',
      borderColor: 'border-indigo-500/10',
      text: 'text-indigo-300',
      subtext: 'text-indigo-400/80',
    },
    {
      bg: 'bg-purple-950/15',
      hoverBg: 'hover:bg-purple-950/30',
      borderColor: 'border-purple-500/10',
      text: 'text-purple-300',
      subtext: 'text-purple-400/80',
    },
    {
      bg: 'bg-orange-950/15',
      hoverBg: 'hover:bg-orange-950/30',
      borderColor: 'border-orange-500/10',
      text: 'text-orange-300',
      subtext: 'text-orange-400/80',
    },
    {
      bg: 'bg-sky-950/15',
      hoverBg: 'hover:bg-sky-950/30',
      borderColor: 'border-sky-500/10',
      text: 'text-sky-300',
      subtext: 'text-sky-400/80',
    },
    {
      bg: 'bg-rose-950/15',
      hoverBg: 'hover:bg-rose-950/30',
      borderColor: 'border-rose-500/10',
      text: 'text-rose-300',
      subtext: 'text-rose-400/80',
    },
  ];

  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {t(
          "We retain data only for as long as necessary. When retention periods expire, data is deleted securely or anonymised.",
          "نحن نحتفظ بالبيانات فقط للمدة اللازمة. عند انتهاء فترات الاحتفاظ، يتم حذف البيانات بشكل آمن أو جعلها مجهولة الهوية تماماً."
        )}
      </p>
      <div className="my-5 overflow-x-auto">
        <table className="my-5 w-full border-collapse border border-corematrix-border overflow-hidden rounded-xl text-sm">
          <caption className="sr-only">{t("Data retention periods and reasons", "فترات الاحتفاظ بالبيانات والأسباب")}</caption>
          <thead className="bg-corematrix-card2">
            <tr>
              <th className="border-b border-corematrix-border px-4 py-4 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                {t('Data Type', 'نوع البيانات')}
              </th>
              <th className="border-b border-corematrix-border px-4 py-4 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                {t('Retention', 'الاحتفاظ')}
              </th>
              <th className="border-b border-corematrix-border px-4 py-4 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                {t('Reason', 'السبب')}
              </th>
            </tr>
          </thead>
          <tbody>
            {RETENTION_ROWS.map((row, idx) => {
              const trans = translatedRetention[row.dataType];
              const theme = ROW_THEMES[idx % ROW_THEMES.length];
              return (
                <tr key={row.dataType} className={`${theme.bg} ${theme.hoverBg} transition-colors duration-300`}>
                  <td className={`border-b ${theme.borderColor} px-4 py-6 align-middle font-medium ${theme.text}`}>
                    {t(row.dataType, trans?.dataType || row.dataType)}
                  </td>
                  <td className={`border-b ${theme.borderColor} px-4 py-6 align-middle font-light leading-snug ${theme.subtext}`}>
                    {t(row.period, trans?.period || row.period)}
                  </td>
                  <td className={`border-b ${theme.borderColor} px-4 py-6 align-middle font-semibold ${theme.text}`}>
                    {t(row.reason, trans?.reason || row.reason)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Section7Content() {
  const { t } = useLanguage();

  const translatedRights: Record<string, { title: string; description: string }> = {
    'Right to Access': {
      title: 'حق الوصول والاطلاع',
      description: 'طلب نسخة من البيانات الشخصية التي نحتفظ بها عنك ومعرفة كيفية استخدامنا لها.',
    },
    'Right to Rectification': {
      title: 'حق التصحيح والطلب',
      description: 'طلب تصحيح البيانات الشخصية غير الدقيقة أو غير المكتملة الخاصة بك.',
    },
    'Right to Erasure': {
      title: 'حق مسح البيانات (النسيان)',
      description: 'طلب حذف بياناتك عندما لا يكون هناك سبب وجيه لمواصلة معالجتها وتخزينها.',
    },
    'Right to Restriction': {
      title: 'حق تقييد المعالجة',
      description: 'طلب تقييد معالجة بياناتك الشخصية في ظروف وحالات معينة.',
    },
    'Right to Portability': {
      title: 'حق نقل البيانات',
      description: 'الحصول على بياناتك الشخصية بتنسيق منظم وقابل للقراءة آلياً لنقلها لجهة أخرى.',
    },
    'Right to Object': {
      title: 'حق الاعتراض',
      description: 'الاعتراض على معالجة البيانات القائمة على المصالح المشروعة أو للتسويق المباشر في أي وقت.',
    },
    'Withdraw Consent': {
      title: 'سحب الموافقة',
      description: 'حيثما تعتمد المعالجة على موافقتك، يمكنك سحبها في أي وقت دون التأثير على المعالجة السابقة.',
    },
    'Right to Complain': {
      title: 'حق تقديم الشكاوى',
      description: 'تقديم شكوى رسمية إلى السلطة المحلية المختصة بحماية البيانات الشخصية.',
    },
  };

  const RIGHTS_THEMES = [
    {
      bg: 'bg-cyan-950/20',
      border: 'border-cyan-500/15',
      hoverBorder: 'hover:border-cyan-500/40',
      hoverBg: 'hover:bg-cyan-950/35',
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10 border-cyan-500/20',
      glow: 'hover:shadow-[0_0_15px_rgba(6,182,212,0.12)]',
      titleColor: 'text-cyan-300',
    },
    {
      bg: 'bg-amber-950/20',
      border: 'border-amber-500/15',
      hoverBorder: 'hover:border-amber-500/40',
      hoverBg: 'hover:bg-amber-950/35',
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      glow: 'hover:shadow-[0_0_15px_rgba(245,158,11,0.12)]',
      titleColor: 'text-amber-300',
    },
    {
      bg: 'bg-indigo-950/20',
      border: 'border-indigo-500/15',
      hoverBorder: 'hover:border-indigo-500/40',
      hoverBg: 'hover:bg-indigo-950/35',
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/10 border-indigo-500/20',
      glow: 'hover:shadow-[0_0_15px_rgba(99,102,241,0.12)]',
      titleColor: 'text-indigo-300',
    },
    {
      bg: 'bg-purple-950/20',
      border: 'border-purple-500/15',
      hoverBorder: 'hover:border-purple-500/40',
      hoverBg: 'hover:bg-purple-950/35',
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/10 border-purple-500/20',
      glow: 'hover:shadow-[0_0_15px_rgba(168,85,247,0.12)]',
      titleColor: 'text-purple-300',
    },
    {
      bg: 'bg-orange-950/20',
      border: 'border-orange-500/15',
      hoverBorder: 'hover:border-orange-500/40',
      hoverBg: 'hover:bg-orange-950/35',
      iconColor: 'text-orange-400',
      iconBg: 'bg-orange-500/10 border-orange-500/20',
      glow: 'hover:shadow-[0_0_15px_rgba(249,115,22,0.12)]',
      titleColor: 'text-orange-300',
    },
    {
      bg: 'bg-sky-950/20',
      border: 'border-sky-500/15',
      hoverBorder: 'hover:border-sky-500/40',
      hoverBg: 'hover:bg-sky-950/35',
      iconColor: 'text-sky-400',
      iconBg: 'bg-sky-500/10 border-sky-500/20',
      glow: 'hover:shadow-[0_0_15px_rgba(14,165,233,0.12)]',
      titleColor: 'text-sky-300',
    },
    {
      bg: 'bg-rose-950/20',
      border: 'border-rose-500/15',
      hoverBorder: 'hover:border-rose-500/40',
      hoverBg: 'hover:bg-rose-950/35',
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-500/10 border-rose-500/20',
      glow: 'hover:shadow-[0_0_15px_rgba(244,63,94,0.12)]',
      titleColor: 'text-rose-300',
    },
    {
      bg: 'bg-emerald-950/20',
      border: 'border-emerald-500/15',
      hoverBorder: 'hover:border-emerald-500/40',
      hoverBg: 'hover:bg-emerald-950/35',
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/20',
      glow: 'hover:shadow-[0_0_15px_rgba(16,185,129,0.12)]',
      titleColor: 'text-emerald-300',
    },
  ];

  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted text-start">
        {t(
          "Under GDPR, you have the following rights. Exercise them by emailing ",
          "بموجب اللائحة العامة لحماية البيانات (GDPR)، لديك الحقوق التالية. يمكنك ممارستها بمراسلتنا عبر البريد الإلكتروني "
        )}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-corematrix-green400 transition-colors hover:underline"
        >
          {siteConfig.email}
        </a>
        {t(". We respond within 30 days.", ". وسنقوم بالرد عليك في غضون 30 يوماً.")}
      </p>
      <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {USER_RIGHTS.map((right, idx) => {
          const trans = translatedRights[right.title];
          const theme = RIGHTS_THEMES[idx % RIGHTS_THEMES.length];
          return (
            <div
              key={right.title}
              className={`group rounded-xl border ${theme.border} ${theme.bg} ${theme.hoverBorder} ${theme.hoverBg} p-5 transition-all duration-300 hover:-translate-y-0.5 ${theme.glow} text-start`}
            >
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg border ${theme.iconBg} ${theme.iconColor} transition-all duration-300 group-hover:scale-105`} aria-hidden>
                <i className={`${right.icon} text-sm`} />
              </div>
              <h4 className={`font-display text-sm font-bold text-corematrix-textPrimary transition-colors duration-300 ${theme.titleColor}`}>
                {t(right.title, trans?.title || right.title)}
              </h4>
              <p className="mt-2 text-xs font-light leading-relaxed text-corematrix-textMuted">
                {t(right.description, trans?.description || right.description)}
              </p>
            </div>
          );
        })}
      </div>
      <div className="my-5 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-900/[0.08] p-4 text-start">
        <span className="mt-0.5 shrink-0 text-base" aria-hidden>⚠️</span>
        <div className="text-sm font-light leading-relaxed text-corematrix-textMuted">
          {t(
            "There is no fee for exercising your rights. We will not charge you for access, rectification, erasure, or portability requests.",
            "لا توجد رسوم لممارسة حقوقك. لن نفرض عليك أي رسوم لطلبات الوصول أو التصحيح أو الحذف أو قابلية نقل البيانات."
          )}
        </div>
      </div>
    </>
  );
}

function Section8Content() {
  const { t } = useLanguage();
  return (
    <ul className="list-none space-y-2 text-sm font-light leading-[1.8] text-corematrix-textMuted">
      {[
        t('TLS 1.2+ for all data in transit', 'بروتوكول TLS 1.2+ لجميع البيانات المشفرة أثناء النقل'),
        t('AES-256 encryption at rest', 'تشفير AES-256 للبيانات المخزنة'),
        t('Role-based access controls and MFA for all staff', 'عناصر التحكم في الوصول المستندة إلى الأدوار والمصادقة متعددة العوامل لجميع الموظفين'),
        t('Regular security reviews and penetration testing', 'مراجعات أمنية دورية واختبارات اختراق مستمرة لثغرات النظام'),
        t('Incident response plan with 72-hour breach notification to regulators where required', 'خطة الاستجابة للحوادث مع إخطار الجهات التنظيمية بأي خرق أمني خلال 72 ساعة عند الاقتضاء'),
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 before:mt-2 before:block before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-corematrix-green700 before:content-['']">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Section9Content() {
  const { t } = useLanguage();

  const translatedCookies: Record<string, { category: string; purpose: string; consentRequired: string }> = {
    'Strictly Necessary': {
      category: 'ضرورية للغاية',
      purpose: 'وظائف الموقع الأساسية والضرورية (رموز الأمان، إدارة الجلسة)',
      consentRequired: 'لا — مطلوبة لكي يعمل الموقع بشكل صحيح',
    },
    'Analytics': {
      category: 'التحليلات والأداء',
      purpose: 'فهم كيفية استخدام الزوار لموقعنا — بيانات مجهولة الهوية بالكامل',
      consentRequired: 'نعم — يتطلب تفعيلك لها (Opt-in)',
    },
    'Functional': {
      category: 'الوظيفية والميزات',
      purpose: 'تذكر التفضيلات الخاصة بك (اللغة المحددة، حالة النماذج)',
      consentRequired: 'نعم — يتطلب تفعيلك لها (Opt-in)',
    },
    'Marketing': {
      category: 'التسويق والإعلانات',
      purpose: 'نحن لا نستخدم ملفات تعريف ارتباط تسويقية أو تتبعية على الإطلاق',
      consentRequired: 'غير محدد — لا نستخدمها',
    },
  };

  const ROW_THEMES = [
    {
      bg: 'bg-cyan-950/15',
      hoverBg: 'hover:bg-cyan-950/30',
      borderColor: 'border-cyan-500/10',
      text: 'text-cyan-300',
      subtext: 'text-cyan-400/80',
    },
    {
      bg: 'bg-amber-950/15',
      hoverBg: 'hover:bg-amber-950/30',
      borderColor: 'border-amber-500/10',
      text: 'text-amber-300',
      subtext: 'text-amber-400/80',
    },
    {
      bg: 'bg-indigo-950/15',
      hoverBg: 'hover:bg-indigo-950/30',
      borderColor: 'border-indigo-500/10',
      text: 'text-indigo-300',
      subtext: 'text-indigo-400/80',
    },
    {
      bg: 'bg-purple-950/15',
      hoverBg: 'hover:bg-purple-950/30',
      borderColor: 'border-purple-500/10',
      text: 'text-purple-300',
      subtext: 'text-purple-400/80',
    },
  ];

  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {t(
          "We use cookies only where necessary. Our cookie banner lets you manage preferences. You can also adjust settings in your browser.",
          "نحن نستخدم ملفات تعريف الارتباط فقط عند الضرورة. تتيح لك لافتة الكوكيز الخاصة بنا إدارة تفضيلاتك. يمكنك أيضاً ضبط الإعدادات في متصفحك."
        )}
      </p>
      <div className="my-5 overflow-x-auto">
        <table className="my-5 w-full border-collapse border border-corematrix-border overflow-hidden rounded-xl text-sm">
          <caption className="sr-only">{t("Cookie categories and consent requirements", "فئات ملفات تعريف الارتباط ومتمتطلبات الموافقة")}</caption>
          <thead className="bg-corematrix-card2">
            <tr>
              <th className="border-b border-corematrix-border px-4 py-4 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                {t('Category', 'الفئة')}
              </th>
              <th className="border-b border-corematrix-border px-4 py-4 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                {t('Purpose', 'الغرض')}
              </th>
              <th className="border-b border-corematrix-border px-4 py-4 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                {t('Consent', 'الموافقة')}
              </th>
            </tr>
          </thead>
          <tbody>
            {COOKIE_ROWS.map((row, idx) => {
              const trans = translatedCookies[row.category];
              const theme = ROW_THEMES[idx % ROW_THEMES.length];
              return (
                <tr key={row.category} className={`${theme.bg} ${theme.hoverBg} transition-colors duration-300`}>
                  <td className={`border-b ${theme.borderColor} px-4 py-6 align-middle font-medium ${theme.text}`}>
                    {t(row.category, trans?.category || row.category)}
                  </td>
                  <td className={`border-b ${theme.borderColor} px-4 py-6 align-middle font-light leading-snug ${theme.subtext}`}>
                    {t(row.purpose, trans?.purpose || row.purpose)}
                  </td>
                  <td className={`border-b ${theme.borderColor} px-4 py-6 align-middle font-semibold ${theme.text}`}>
                    {t(row.consentRequired, trans?.consentRequired || row.consentRequired)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {t("We do not use advertising or retargeting cookies.", "نحن لا نستخدم ملفات تعريف الارتباط الإعلانية أو ملفات إعادة الاستهداف.")}
      </p>
    </>
  );
}

function Section10Content() {
  const { t } = useLanguage();
  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {t(
          "We may transfer data outside the EEA. When we do, we use appropriate safeguards:",
          "قد ننقل البيانات خارج المنطقة الاقتصادية الأوروبية (EEA). وعندما نفعل ذلك، فإننا نستخدم الضمانات والتدابير المناسبة:"
        )}
      </p>
      <ul className="mb-4 list-none space-y-2 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {[
          t('Standard Contractual Clauses (SCCs) approved by the European Commission', 'البنود التعاقدية القياسية (SCCs) المعتمدة من قبل المفوضية الأوروبية'),
          t('Adequacy decisions where the destination country is recognised as adequate', 'قرارات الكفاية والملائمة حيث يتم الاعتراف بالبلد الوجهة بأنه يوفر مستوى حماية ملائم للبيانات'),
          t('Explicit consent where required', 'الموافقة الصريحة والواضحة عند الاقتضاء'),
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 before:mt-2 before:block before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-corematrix-green700 before:content-['']">
            {item}
          </li>
        ))}
      </ul>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {t("A list of countries where we transfer data is available on request.", "تتوفر قائمة بالدول التي ننقل البيانات إليها عند الطلب.")}
      </p>
    </>
  );
}

function Section11Content() {
  const { t } = useLanguage();
  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {t(
          "Our services are intended for businesses and professionals aged 18 and over. We do not knowingly collect personal data from children under 16.",
          "خدماتنا موجهة ومخصصة للشركات والمهنيين البالغين من العمر 18 عاماً فما فوق. نحن لا نجمع عن علم أي بيانات شخصية من الأطفال دون سن 16 عاماً."
        )}
      </p>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {t("If you believe we have collected data from a child under 16, contact us immediately at ", "إذا كنت تعتقد أننا جمعنا بيانات من طفل يقل عمره عن 16 عاماً، فاتصل بنا على الفور على ")}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-corematrix-green400 transition-colors hover:underline"
        >
          {siteConfig.email}
        </a>{' '}
        {t("and we will delete it.", "وسنقوم بحذفها فوراً.")}
      </p>
    </>
  );
}

function Section12Content() {
  const { t } = useLanguage();
  return (
    <ul className="list-none space-y-2 text-sm font-light leading-[1.8] text-corematrix-textMuted">
      {[
        t("We update the 'Last Updated' date at the top of this policy", "نقوم بتحديث تاريخ 'آخر تحديث' الموجود في أعلى هذه السياسة"),
        t("We post a notice on our homepage for 30 days for material changes", "ننشر إشعاراً بارزاً على صفحتنا الرئيسية لمدة 30 يوماً في حال حدوث أي تغييرات جوهرية"),
        t("Where required by law, we email you about material changes", "نقوم بإرسال رسالة بريد إلكتروني لإخطارك بالتغييرات الجوهرية عندما يقتضي القانون ذلك"),
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 before:mt-2 before:block before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-corematrix-green700 before:content-['']">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Section13Content() {
  const { t } = useLanguage();
  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {t(
          "For privacy enquiries, rights requests, or complaints, contact our Data Controller:",
          "للاستفسارات المتعلقة بالخصوصية، أو طلبات ممارسة الحقوق، أو الشكاوى، يرجى التواصل مع مراقب البيانات لدينا:"
        )}
      </p>
      <div className="mt-5 rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-6">
        <p className="mb-4 font-display text-[0.62rem] font-bold uppercase tracking-wider text-corematrix-green400">
          {t('DATA CONTROLLER CONTACT', 'معلومات الاتصال بمراقب البيانات')}
        </p>
        <div className="space-y-3 text-sm">
          <p className="flex items-center gap-3 font-medium text-corematrix-textPrimary">
            <i className="fas fa-building text-corematrix-green400 text-xs w-4 text-center" aria-hidden="true" />
            {t('Corematrix', 'كورماتريكس')}
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 text-corematrix-textMuted transition-colors hover:text-corematrix-green400"
          >
            <i className="fas fa-envelope text-corematrix-green400 text-xs w-4 text-center" aria-hidden="true" />
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.phoneTel}
            className="flex items-center gap-3 text-corematrix-textMuted transition-colors hover:text-corematrix-green400"
          >
            <i className="fas fa-phone-alt text-corematrix-green400 text-xs w-4 text-center" aria-hidden="true" />
            {siteConfig.phone}
          </a>
        </div>
      </div>
      <p className="mt-5 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {t(
          "You have the right to lodge a complaint with your supervisory authority. For EU residents, find yours at ",
          "لديك الحق في تقديم شكوى رسمية لدى سلطة الإشراف والرقابة الخاصة بك. بالنسبة للمقيمين في الاتحاد الأوروبي، يمكنك العثور على السلطة التابعة لك عبر الموقع الإلكتروني "
        )}
        <a
          href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
          target="_blank"
          rel="noopener noreferrer"
          className="text-corematrix-green400 transition-colors hover:underline"
        >
          edpb.europa.eu
          <span className="sr-only"> {t("(opens in new tab)", "(يفتح في علامة تبويب جديدة)")}</span>
        </a>
        .
      </p>
    </>
  );
}
