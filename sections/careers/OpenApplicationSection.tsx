'use client';

import { useState, useRef } from 'react';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  portfolio: string;
  github: string;
  desiredRole: string;
  experience: string;
  message: string;
  agreePrivacy: boolean;
}

const INITIAL_FORM_DATA: ApplicationData = {
  firstName: '',
  lastName: '',
  email: '',
  portfolio: '',
  github: '',
  desiredRole: '',
  experience: '',
  message: '',
  agreePrivacy: false,
};

const ROLE_OPTIONS = [
  'AI/ML Engineer',
  'Full-Stack Engineer',
  'Backend Engineer',
  'Frontend Engineer',
  'React Native / Mobile',
  'LLM / Research Engineer',
  'Product Designer',
  'Product Manager',
  'DevOps / Platform',
  'Other',
] as const;

const EXPERIENCE_OPTIONS = [
  'Junior (0–2 years)',
  'Mid (2–5 years)',
  'Senior (5–10 years)',
  'Staff+ (10+ years)',
] as const;

// Explicitly typed translation maps for i18n
const roleOptionTranslations: Record<string, string> = {
  'AI/ML Engineer': 'مهندس ذكاء اصطناعي وتعلم آلة',
  'Full-Stack Engineer': 'مهندس Full-Stack',
  'Backend Engineer': 'مهندس واجهة خلفية',
  'Frontend Engineer': 'مهندس واجهة أمامية',
  'React Native / Mobile': 'تطبيقات هاتف / React Native',
  'LLM / Research Engineer': 'مهندس أبحاث / نماذج لغة كبيرة',
  'Product Designer': 'مصمم منتجات',
  'Product Manager': 'مدير منتجات',
  'DevOps / Platform': 'مهندس DevOps / منصات',
  'Other': 'تخصص آخر',
};

const expOptionTranslations: Record<string, string> = {
  'Junior (0–2 years)': 'مبتدئ (0–2 سنوات)',
  'Mid (2–5 years)': 'متوسط (2–5 سنوات)',
  'Senior (5–10 years)': 'كبير (5–10 سنوات)',
  'Staff+ (10+ years)': 'خبير/قائد فني (+10 سنوات)',
};

const tipTranslations: Record<string, string> = {
  'Tell us what you build and what you care about': 'أخبرنا عما تبنيه وما تهتم به وتطمح إليه',
  'Share links to your work — GitHub, portfolio, blog': 'شارك روابط لأعمالك — GitHub، ملف الأعمال (Portfolio)، أو مدونتك الشخصية',
  'Be specific about the type of work you want to do': 'كن محدداً بشأن نوع وتخصص العمل الذي ترغب في القيام به',
  'A personal note beats a generic cover letter every time': 'الرسالة الشخصية والخاصة تتفوق دائماً على خطابات التقديم التقليدية العامة',
  'We respond to every application within 5 business days': 'نحن نرد على كل طلب تقديم في غضون 5 أيام عمل بكل صدق',
};

const inputClass =
  'w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none transition-all placeholder:text-corematrix-textDim focus:border-corematrix-green700 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)]';

export function OpenApplicationSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ApplicationData>(INITIAL_FORM_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const update = (updates: Partial<ApplicationData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const canSubmit =
    formData.firstName.trim() &&
    formData.email.trim() &&
    formData.message.trim().length >= 10 &&
    formData.agreePrivacy;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('candidateName', `${formData.firstName.trim()} ${formData.lastName.trim()}`);
      data.append('candidateEmail', formData.email.trim());
      data.append('candidatePhone', '');
      data.append('portfolio', formData.portfolio);
      data.append('github', formData.github);
      data.append('experience', formData.experience);
      data.append('message', `[Desired Role: ${formData.desiredRole || 'Open'}]\n\n${formData.message}`);
      if (selectedFile) {
        data.append('resume', selectedFile);
      }

      const res = await fetch('http://localhost:5000/api/applications/submit', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || 'Failed to submit application');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(
        err.message || t(
          `Something went wrong. Please email us directly at ${siteConfig.careersEmail}`,
          `حدث خطأ ما. يرجى مراسلتنا مباشرة عبر البريد الإلكتروني ${siteConfig.careersEmail}`
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section
        id="open-application"
        aria-labelledby="open-application-heading"
        className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
      >
        <Container>
          <div className="mx-auto max-w-xl rounded-3xl border border-corematrix-border bg-corematrix-card p-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-corematrix-green700 text-2xl text-white">
              ✓
            </div>
            <h2
              id="open-application-heading"
              className="font-display text-2xl font-bold text-corematrix-textPrimary"
            >
              {t('Application Received!', 'تم استلام طلب التقديم بنجاح!')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              {t(
                "We've received your application and will review it within 5 business days. We respond to every single one.",
                'لقد تلقينا طلبك وسنقوم بمراجعته في غضون 5 أيام عمل. نحن نرد على كل طلب بلا استثناء.'
              )}
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="open-application"
      aria-labelledby="open-application-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="section-label text-corematrix-green400">
              {t("DON'T SEE YOUR ROLE?", 'لا تجد دوراً يناسبك؟')}
            </p>
            <h2
              id="open-application-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              {t('Send an Open Application', 'أرسل طلباً عاماً للعمل')}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-corematrix-textSecondary">
              {t(
                "Don't see a role that fits? We welcome speculative applications. Tell us what you build, what you care about, and how you'd like to contribute. We read every one and respond within 5 business days.",
                'لا تجد دوراً وظيفياً يناسبك؟ نحن نرحب بالطلبات العامة والتلقائية. أخبرنا عما تبنيه، وما تهتم به، وكيف ترغب في المساهمة. نقرأ كل طلب ونرد في غضون 5 أيام عمل.'
              )}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-corematrix-textSecondary">
              {[
                'Tell us what you build and what you care about',
                'Share links to your work — GitHub, portfolio, blog',
                'Be specific about the type of work you want to do',
                'A personal note beats a generic cover letter every time',
                'We respond to every application within 5 business days',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-3">
                  <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 flex items-center justify-center text-xs text-corematrix-green400">
                    ✓
                  </span>
                  {t(tip, tipTranslations[tip] ?? tip)}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-corematrix-border bg-corematrix-card p-11">
            <div
              className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent"
              aria-hidden
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                  {t('First Name *', 'الاسم الأول *')}
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => update({ firstName: e.target.value })}
                  className={inputClass}
                  placeholder={t('Jane', 'الاسم الأول')}
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                  {t('Last Name', 'الاسم الأخير')}
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => update({ lastName: e.target.value })}
                  className={inputClass}
                  placeholder={t('Doe', 'العائلة')}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                {t('Email *', 'البريد الإلكتروني *')}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => update({ email: e.target.value })}
                className={inputClass}
                placeholder="jane@example.com"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                  {t('LinkedIn / Portfolio', 'لينكد إن / معرض الأعمال')}
                </label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => update({ portfolio: e.target.value })}
                  className={inputClass}
                  placeholder="https://linkedin.com/..."
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                  {t('GitHub', 'GitHub')}
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => update({ github: e.target.value })}
                  className={inputClass}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                  {t('Desired Role / Specialisation', 'الدور المطلوب / التخصص')}
                </label>
                <select
                  value={formData.desiredRole}
                  onChange={(e) => update({ desiredRole: e.target.value })}
                  className={inputClass}
                >
                  <option value="">{t('Select', 'اختر التخصص')}</option>
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {t(r, roleOptionTranslations[r] ?? r)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                  {t('Years of Experience', 'سنوات الخبرة')}
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => update({ experience: e.target.value })}
                  className={inputClass}
                >
                  <option value="">{t('Select', 'اختر الخبرة')}</option>
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {t(opt, expOptionTranslations[opt] ?? opt)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                {t('Message *', 'الرسالة للتقديم *')}
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => update({ message: e.target.value })}
                placeholder={t(
                  "Tell us about yourself, what you've built, and why you'd like to join Corematrix...",
                  'أخبرنا عن نفسك، وماذا قمت ببنائه وشحنه، ولماذا ترغب في الانضمام لكورماتريكس...'
                )}
                rows={5}
                className={`${inputClass} min-h-[110px] resize-y`}
              />
            </div>
            
            {/* Functional File Uploader */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 cursor-pointer rounded-xl border border-dashed border-corematrix-border2 p-6 text-center transition-all hover:border-corematrix-green400/40 hover:bg-corematrix-green900/[0.03]"
              role="button"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <p className="text-sm text-corematrix-textMuted">
                {selectedFile 
                  ? `${t('Selected: ', 'الملف المختار: ')} ${selectedFile.name}` 
                  : t('Click to upload your CV (optional)', 'انقر هنا لرفع سيرتك الذاتية (اختياري)')}
              </p>
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={formData.agreePrivacy}
                onChange={(e) => update({ agreePrivacy: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-corematrix-border bg-corematrix-bg0 text-corematrix-green700 focus:ring-corematrix-green500"
              />
              <span className="text-sm text-corematrix-textSecondary">
                {t(
                  "I agree to Corematrix's Privacy Policy and consent to being contacted. *",
                  'أوافق على سياسة الخصوصية الخاصة بكورماتريكس وأوافق على التواصل معي. *'
                )}
              </span>
            </label>
            {error && (
              <p className="mt-4 text-sm font-light text-red-400">{error}</p>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className="mt-6 w-full rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  {t('Sending...', 'جاري الإرسال...')}
                </span>
              ) : (
                t('Submit Application', 'إرسال طلب التقديم')
              )}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
