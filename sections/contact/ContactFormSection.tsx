'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';

export type FormStep = 1 | 2 | 3 | 4;

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountry: string;
  phone: string;
  company: string;
  role: string;
  services: string[];
  timeline: string;
  budget: number;
  codebase: string;
  description: string;
  source: string;
  requestNda: boolean;
  agreePrivacy: boolean;
}

export type ContactDetail = { icon: string; label: string; value: string; href?: string };

const DETAILS_THEMES = [
  {
    iconColor: 'text-cyan-400',
    hoverText: 'hover:text-cyan-400',
  },
  {
    iconColor: 'text-emerald-400',
    hoverText: 'hover:text-emerald-400',
  },
  {
    iconColor: 'text-sky-400',
    hoverText: 'hover:text-sky-400',
  },
  {
    iconColor: 'text-amber-400',
    hoverText: 'hover:text-amber-400',
  },
];

const BUDGET_MIN = 5000;
const BUDGET_MAX = 500000;
const BUDGET_STEP = 5000;

const INITIAL_FORM_DATA: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phoneCountry: '+966',
  phone: '',
  company: '',
  role: '',
  services: [],
  timeline: '',
  budget: 25000,
  codebase: '',
  description: '',
  source: '',
  requestNda: false,
  agreePrivacy: false,
};

function formatBudget(value: number): string {
  if (value >= 500000) return '$500k+';
  if (value >= 1000) return `$${value / 1000}k`;
  return `$${value.toLocaleString()}`;
}

export function ContactFormSection() {
  const { t } = useLanguage();
  const [step, setStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const CONTACT_DETAILS: ContactDetail[] = [
    {
      icon: 'fas fa-envelope',
      label: t('Email', 'البريد الإلكتروني'),
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: 'fas fa-phone-alt',
      label: t('Phone & WhatsApp', 'الهاتف والواتساب'),
      value: siteConfig.phone,
      href: siteConfig.phoneTel,
    },
    { icon: 'fas fa-globe', label: t('Location', 'الموقع'), value: t(siteConfig.location, 'عن بعد / عالمي') },
    { icon: 'fas fa-clock', label: t('Response Time', 'وقت الاستجابة'), value: t('Within 24 hours on business days', 'في غضون 24 ساعة في أيام العمل') },
  ];

  const AVAILABILITY = [
    { day: t('Monday – Friday', 'الاثنين – الجمعة'), time: t('9am – 6pm GMT', '9 صباحاً – 6 مساءً بتوقيت غرينتش'), status: 'available' },
    { day: t('Saturday', 'السبت'), time: t('10am – 2pm GMT', '10 صباحاً – 2 مساءً بتوقيت غرينتش'), status: 'limited' },
    { day: t('Sunday', 'الأحد'), time: t('Closed', 'مغلق'), status: 'closed' },
  ];

  const ROLES = [
    t('Founder / CEO', 'مؤسس / رئيس تنفيذي'),
    t('CTO / Tech Lead', 'مدير تقني / رئيس هندسي'),
    t('Product Manager', 'مدير منتج'),
    t('Engineering Manager', 'مدير هندسي'),
    t('Developer', 'مطور برمجيات'),
    t('Designer', 'مصمم'),
    t('Other', 'آخر'),
  ] as const;

  const SERVICES_DATA = [
    { key: '🧠 AI Development', icon: 'fas fa-brain', en: 'AI Development', ar: 'تطوير الذكاء الاصطناعي' },
    { key: '⚙️ AI Automation', icon: 'fas fa-cogs', en: 'AI Automation', ar: 'أتمتة الذكاء الاصطناعي' },
    { key: '💻 Web Application', icon: 'fas fa-laptop-code', en: 'Web Application', ar: 'تطبيقات الويب' },
    { key: '📱 Mobile App', icon: 'fas fa-mobile-alt', en: 'Mobile App', ar: 'تطبيقات الهاتف المحمول' },
    { key: '☁️ SaaS Platform', icon: 'fas fa-cloud', en: 'SaaS Platform', ar: 'منصات SaaS' },
    { key: '🏢 Enterprise Software', icon: 'fas fa-building', en: 'Enterprise Software', ar: 'برمجيات المؤسسات' },
    { key: '👥 Dedicated Team', icon: 'fas fa-users', en: 'Dedicated Team', ar: 'فريق عمل مخصص' },
    { key: '🛡️ DevOps / Cloud', icon: 'fas fa-shield-alt', en: 'DevOps / Cloud', ar: 'DevOps والخدمات السحابية' },
    { key: '🎨 UI/UX Design', icon: 'fas fa-paint-brush', en: 'UI/UX Design', ar: 'تصميم واجهة وتجربة المستخدم' },
    { key: '📊 Data & Analytics', icon: 'fas fa-chart-bar', en: 'Data & Analytics', ar: 'البيانات والتحليلات' },
  ];

  const TIMELINES_DATA = [
    { key: 'ASAP', icon: 'fas fa-bolt', en: 'ASAP', ar: 'في أقرب وقت', subEn: 'Start within 2 wks', subAr: 'البدء في غضون أسبوعين' },
    { key: '1–3 Months', icon: 'far fa-calendar-alt', en: '1–3 Months', ar: 'خلال 1–3 أشهر', subEn: 'Planning stage', subAr: 'مرحلة التخطيط' },
    { key: '3–6 Months', icon: 'far fa-calendar-check', en: '3–6 Months', ar: 'خلال 3–6 أشهر', subEn: 'Future planning', subAr: 'تخطيط مستقبلي' },
    { key: 'Exploring', icon: 'far fa-comment-dots', en: 'Exploring', ar: 'استكشاف فقط', subEn: 'Just researching', subAr: 'مجرد بحث واستكشاف' },
  ];

  const CODEBASE_OPTIONS = [
    t('No — starting from scratch', 'لا — البدء من الصفر'),
    t('Yes — needs new features', 'نعم — يحتاج إلى ميزات جديدة'),
    t('Yes — needs redesign/refactor', 'نعم — يحتاج إلى إعادة تصميم/إعادة هيكلة'),
    t('Yes — needs AI integration', 'نعم — يحتاج إلى دمج ذكاء اصطناعي'),
    t('Unsure', 'غير متأكد'),
  ] as const;

  const SOURCE_OPTIONS = [
    t('Google Search', 'بحث جوجل'),
    t('LinkedIn', 'لينكد إن'),
    t('Twitter/X', 'تويتر/إكس'),
    t('Referral', 'إحالة/توصية'),
    t('GitHub', 'جيتهاب'),
    t('Blog', 'مدونة'),
    t('Other', 'آخر'),
  ] as const;

  const update = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleService = useCallback((s: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }));
  }, []);

  const canProceedStep1 = Boolean(
    formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
  );

  const canProceedStep2 = formData.services.length > 0 && formData.timeline;

  const canProceedStep3 = Boolean(formData.description.trim().length >= 10);

  const canSubmit =
    canProceedStep1 &&
    canProceedStep2 &&
    canProceedStep3 &&
    formData.agreePrivacy;

  const buildMessage = useCallback(() => {
    const parts: string[] = [formData.description];
    if (formData.services.length) {
      parts.push(`\n\nServices: ${formData.services.join(', ')}`);
    }
    if (formData.timeline) parts.push(`\nTimeline: ${formData.timeline}`);
    parts.push(`\nBudget: ${formatBudget(formData.budget)}`);
    if (formData.codebase) parts.push(`\nCodebase: ${formData.codebase}`);
    if (formData.role) parts.push(`\nRole: ${formData.role}`);
    if (formData.source) parts.push(`\nHow found us: ${formData.source}`);
    if (formData.requestNda) parts.push('\nNDA requested: Yes');
    return parts.join('');
  }, [formData]);

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      const res = await fetch('/api/contacts/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          email: formData.email.trim(),
          phoneCountry: formData.phoneCountry,
          phoneNumber: phoneDigits || undefined,
          company: formData.company.trim() || undefined,
          role: formData.role || undefined,
          services: formData.services,
          timeline: formData.timeline,
          budget: formData.budget,
          codebase: formData.codebase || undefined,
          description: formData.description.trim(),
          source: formData.source || undefined,
          requestNda: formData.requestNda,
          message: buildMessage(),
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? 'Submission failed');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t('Something went wrong. Please try again or email us directly.', 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة عبر البريد الإلكتروني.')
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section
        id="contact-form"
        aria-labelledby="contact-form-heading"
        className="border-t border-corematrix-border bg-corematrix-bg0 py-20"
      >
        <Container>
          <div className="mx-auto max-w-2xl rounded-3xl border border-corematrix-border bg-corematrix-card p-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-corematrix-green700 text-4xl text-white">
              <i className="fas fa-check" />
            </div>
            <h2
              id="contact-form-heading"
              className="font-display text-2xl font-bold text-corematrix-textPrimary"
            >
              {t('Message Sent Successfully!', 'تم إرسال الرسالة بنجاح!')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              {t(
                "Thank you for reaching out. We've received your project details and will respond within 24 hours with a genuine technical perspective tailored to your needs.",
                "شكراً لتواصلك معنا. لقد تلقينا تفاصيل مشروعك وسنقوم بالرد عليك في غضون 24 ساعة برؤية تقنية واقعية ومخصصة لتلبية احتياجاتك بالكامل."
              )}
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              {t('Explore Our Services →', 'استكشف خدماتنا ←')}
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const steps = [
    { n: 1, label: t('About You', 'معلوماتك') },
    { n: 2, label: t('Your Project', 'مشروعك') },
    { n: 3, label: t('Details', 'تفاصيل إضافية') },
    { n: 4, label: t('Send', 'إرسال') },
  ];

  const budgetPct =
    ((formData.budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-20"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-[1fr_1.6fr]">
          <div className="reveal">
            <h2
              id="contact-form-heading"
              className="font-display text-2xl font-bold text-corematrix-textPrimary"
            >
              {t('Get in Touch', 'تواصل معنا')}
            </h2>
            <p className="mt-3 text-sm text-corematrix-textSecondary">
              {t("Fill out the form and we'll get back within 24 hours.", "املأ النموذج وسنقوم بالرد عليك في غضون 24 ساعة.")}
            </p>
            <div className="mt-6 space-y-5">
              {CONTACT_DETAILS.map((d, idx) => {
                const theme = DETAILS_THEMES[idx % DETAILS_THEMES.length];
                return (
                  <div key={d.label} className="space-y-1">
                    <p className="flex items-center gap-2 text-xs font-bold text-corematrix-textDim">
                      <span className={`text-sm ${theme.iconColor}`} aria-hidden>
                        <i className={d.icon} />
                      </span>
                      {d.label}
                    </p>
                    <div className="pl-6">
                      {d.href ? (
                        <a
                          href={d.href}
                          className={`text-sm text-corematrix-textSecondary transition-colors ${theme.hoverText}`}
                        >
                          {d.value}
                        </a>
                      ) : (
                        <p className="text-sm text-corematrix-textSecondary">{d.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex gap-3">
              {[
                { icon: 'fab fa-twitter', href: siteConfig.twitter, aria: 'Twitter' },
                { icon: 'fab fa-linkedin-in', href: siteConfig.linkedin, aria: 'LinkedIn' },
                { icon: 'fab fa-facebook-f', href: siteConfig.facebook, aria: 'Facebook' },
                { icon: 'fab fa-instagram', href: siteConfig.instagram, aria: 'Instagram' },
              ].map(({ icon, href, aria }) => (
                <a
                  key={aria}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-corematrix-border bg-corematrix-card text-base text-corematrix-textMuted transition-all hover:border-corematrix-green700 hover:bg-corematrix-green900/30 hover:text-corematrix-green400"
                  aria-label={aria}
                >
                  <i className={icon} aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-corematrix-border bg-corematrix-card p-5">
              <p className="mb-4 font-display text-xs font-bold text-corematrix-textPrimary">
                {t('Availability', 'مواعيد العمل والتوفر')}
              </p>
              {AVAILABILITY.map((a) => (
                <div key={a.day} className="flex items-center justify-between py-2 text-sm">
                  <span className="text-corematrix-textSecondary">
                    {a.day} · {a.time}
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      a.status === 'available'
                        ? 'bg-corematrix-green400 dot-pulse'
                        : a.status === 'limited'
                          ? 'bg-yellow-400'
                          : 'bg-red-400'
                    }`}
                    aria-hidden
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="relative overflow-hidden rounded-3xl border border-corematrix-border bg-corematrix-card p-8 sm:p-11">
              <div
                className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent"
                aria-hidden
              />

              <div className="mb-8 flex items-center gap-2">
                {steps.map((s, i) => (
                  <div key={s.n} className="flex items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-display text-sm font-bold transition-all ${
                        step > s.n
                          ? 'border-corematrix-green700 bg-corematrix-green900 text-corematrix-green400'
                          : step === s.n
                            ? 'border-corematrix-green500 bg-corematrix-green700 text-white'
                            : 'border-corematrix-border2 bg-corematrix-card2 text-corematrix-green400'
                      }`}
                    >
                      {step > s.n ? <i className="fas fa-check text-xs" /> : s.n}
                    </div>
                    <span className="ml-2 hidden text-xs font-medium text-corematrix-textMuted sm:inline">
                      {s.label}
                    </span>
                    {i < steps.length - 1 && (
                      <div
                        className={`mx-2 h-px w-6 sm:w-8 ${
                          step > s.n ? 'bg-corematrix-green700' : 'bg-corematrix-border2'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                        {t('First Name', 'الاسم الأول')}
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => update({ firstName: e.target.value })}
                        className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                        placeholder={t('John', 'أحمد')}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                        {t('Last Name', 'اسم العائلة')}
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => update({ lastName: e.target.value })}
                        className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                        placeholder={t('Doe', 'العتيبي')}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                      {t('Work Email *', 'البريد الإلكتروني للعمل *')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => update({ email: e.target.value })}
                      className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                        {t('Phone', 'رقم الهاتف')}
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={formData.phoneCountry}
                          onChange={(e) => update({ phoneCountry: e.target.value })}
                          className="w-[110px] rounded-lg border border-corematrix-border bg-corematrix-bg0 px-2 py-3 text-xs text-corematrix-textPrimary focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                        >
                          <option value="+966">🇸🇦 +966</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+20">🇪🇬 +20</option>
                          <option value="+974">🇶🇦 +974</option>
                          <option value="+965">🇰🇼 +965</option>
                          <option value="+968">🇴🇲 +968</option>
                          <option value="+973">🇧🇭 +973</option>
                          <option value="+962">🇯🇴 +962</option>
                          <option value="+92">🇵🇰 +92</option>
                          <option value="+880">🇧🇩 +880</option>
                          <option value="+224">🇬🇳 +224</option>
                        </select>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            update({ phone: e.target.value.replace(/[^\d\s+-]/g, '') })
                          }
                          className="flex-1 rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                          placeholder="50 123 4567"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                        {t('Company Name', 'اسم الشركة')}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => update({ company: e.target.value })}
                        className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                        placeholder={t('Acme Inc', 'شركة أكمي')}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                      {t('Role', 'الدور الوظيفي')}
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => update({ role: e.target.value })}
                      className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                    >
                      <option value="">{t('Select your role', 'اختر دورك الوظيفي')}</option>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="mb-3 block text-xs font-medium text-corematrix-textMuted">
                      {t('Services Needed *', 'الخدمات المطلوبة *')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES_DATA.map((s) => (
                        <button
                          key={s.key}
                          type="button"
                          onClick={() => toggleService(s.key)}
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                            formData.services.includes(s.key)
                              ? 'border-corematrix-green400/30 bg-corematrix-green900/20 text-corematrix-green400 font-semibold'
                              : 'border-corematrix-border bg-corematrix-card2 text-corematrix-textMuted hover:border-corematrix-border2 hover:text-corematrix-textPrimary'
                          }`}
                        >
                          <i className={s.icon} aria-hidden="true" />
                          <span>{t(s.en, s.ar)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-3 block text-xs font-medium text-corematrix-textMuted">
                      {t('Timeline *', 'الجدول الزمني *')}
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {TIMELINES_DATA.map((tItem) => (
                        <button
                          key={tItem.key}
                          type="button"
                          onClick={() => update({ timeline: tItem.key })}
                          className={`rounded-xl border p-4 text-left transition-all ${
                            formData.timeline === tItem.key
                              ? 'border-corematrix-green400/25 bg-corematrix-green900/20 shadow-[0_0_16px_rgba(34,197,94,0.07)]'
                              : 'border-corematrix-border bg-corematrix-card2 hover:border-corematrix-border2'
                          }`}
                        >
                          <span className="text-xl text-corematrix-green400" aria-hidden>
                            <i className={tItem.icon} />
                          </span>
                          <p className="mt-2 font-display text-xs font-bold text-corematrix-textPrimary">
                            {t(tItem.en, tItem.ar)}
                          </p>
                          <p className="mt-0.5 text-[0.65rem] text-corematrix-textDim">
                            {t(tItem.subEn, tItem.subAr)}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                      {t('Budget (USD)', 'الميزانية (بالدولار الأمريكي)')}
                    </label>
                    <p className="mb-2 font-display text-lg font-bold text-corematrix-green400">
                      {formatBudget(formData.budget)}
                    </p>
                    <input
                      type="range"
                      min={BUDGET_MIN}
                      max={BUDGET_MAX}
                      step={BUDGET_STEP}
                      value={formData.budget}
                      onChange={(e) => update({ budget: Number(e.target.value) })}
                      className="budget-slider w-full"
                      style={{
                        background: `linear-gradient(to right, #22c55e 0%, #22c55e ${budgetPct}%, #1a3525 ${budgetPct}%, #1a3525 100%)`,
                      }}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                      {t('Existing Codebase?', 'هل يوجد كود برمجي حالي؟')}
                    </label>
                    <select
                      value={formData.codebase}
                      onChange={(e) => update({ codebase: e.target.value })}
                      className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                    >
                      <option value="">{t('Select an option', 'اختر خياراً')}</option>
                      {CODEBASE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                      {t('Project Description *', 'وصف المشروع *')}
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => update({ description: e.target.value })}
                      placeholder={t(
                        "Tell us about your project — what problem are you solving, who are your users, what does success look like?",
                        "أخبرنا عن مشروعك — ما هي المشكلة التي تقوم بحلها، من هم فئات المستخدمين المستهدفين، وكيف يبدو شكل النجاح بالنسبة لك؟"
                      )}
                      rows={5}
                      className="min-h-[120px] w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                    />
                  </div>
                  <div
                    className="cursor-pointer rounded-xl border border-dashed border-corematrix-border2 p-6 text-center transition-all hover:border-corematrix-green400/40 hover:bg-corematrix-green900/[0.03]"
                    role="button"
                    tabIndex={0}
                    onClick={() => setFileName('document.pdf')}
                    onKeyDown={(e) => e.key === 'Enter' && setFileName('document.pdf')}
                  >
                    {fileName ? (
                      <p className="text-sm text-corematrix-green400">{fileName}</p>
                    ) : (
                      <p className="text-sm text-corematrix-textMuted">
                        {t('Drop files or click to upload (optional)', 'اسحب الملفات هنا أو انقر لتحميلها (اختياري)')}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <div className="rounded-xl border border-corematrix-border2 bg-corematrix-card2 p-5">
                    <p className="font-display text-xs font-bold text-corematrix-textPrimary mb-3">
                      {t('What happens next', 'ماذا سيحدث بعد ذلك')}
                    </p>
                    <ol className="space-y-2 text-xs text-corematrix-textMuted">
                      <li>{t('1. We review your brief', '1. نراجع ملخص مشروعك')}</li>
                      <li>{t('2. Personal response within 24h', '2. رد شخصي ومخصص خلال 24 ساعة')}</li>
                      <li>{t("3. Free discovery call if there's a fit", '3. مكالمة استكشافية مجانية إذا وجد توافق')}</li>
                      <li>{t('4. Detailed proposal within 48–72h', '4. تقديم عرض تفصيلي للمشروع خلال 48-72 ساعة')}</li>
                    </ol>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                      {t('How did you find us?', 'كيف عثرت علينا؟')}
                    </label>
                    <select
                      value={formData.source}
                      onChange={(e) => update({ source: e.target.value })}
                      className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                    >
                      <option value="">{t('Select', 'اختر')}</option>
                      {SOURCE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.requestNda}
                      onChange={(e) => update({ requestNda: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-corematrix-border bg-corematrix-bg0 text-corematrix-green700 focus:ring-corematrix-green500"
                    />
                    <span className="text-sm text-corematrix-textSecondary">
                      {t("I'd like to sign an NDA before discussing project details", 'أود توقيع اتفاقية عدم إفصاح (NDA) قبل مناقشة تفاصيل المشروع')}
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.agreePrivacy}
                      onChange={(e) => update({ agreePrivacy: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-corematrix-border bg-corematrix-bg0 text-corematrix-green700 focus:ring-corematrix-green500"
                    />
                    <span className="text-sm text-corematrix-textSecondary">
                      {t("I agree to Corematrix's Privacy Policy and consent to being contacted. *", 'أوافق على سياسة خصوصية كورماتريكس وأوافق على أن يتم الاتصال بي. *')}
                    </span>
                  </label>
                  {error && (
                    <p className="text-sm font-light text-red-400">{error}</p>
                  )}
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s - 1) as FormStep)}
                    className="rounded-lg border border-corematrix-border px-6 py-2.5 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-border2"
                  >
                    {t('Back', 'رجوع')}
                  </button>
                ) : (
                  <div />
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s + 1) as FormStep)}
                    disabled={
                      (step === 1 && !canProceedStep1) ||
                      (step === 2 && !canProceedStep2) ||
                      (step === 3 && !canProceedStep3)
                    }
                    className="rounded-lg bg-corematrix-green700 px-6 py-2.5 text-sm font-semibold text-white uppercase transition hover:bg-corematrix-green500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('Next', 'التالي')}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canSubmit || submitting}
                    className="rounded-lg bg-corematrix-green700 px-8 py-2.5 text-sm font-semibold text-white uppercase transition hover:bg-corematrix-green500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        {t('Sending...', 'جاري الإرسال...')}
                      </span>
                    ) : (
                      t('Send Message', 'إرسال الرسالة')
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
