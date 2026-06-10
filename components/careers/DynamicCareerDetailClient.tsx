'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { useState, useRef } from 'react';
import type { DbCareer } from '@/lib/careers';

interface DynamicCareerProps {
  job: DbCareer;
}

export function DynamicCareerDetailClient({ job }: DynamicCareerProps) {
  const { language, t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    github: '',
    experience: '',
    message: '',
    agreePrivacy: false,
  });

  const title = language === 'ar' ? (job.title_ar || job.title_en) : job.title_en;
  const description = language === 'ar' ? (job.description_ar || job.description_en) : job.description_en;
  const location = language === 'ar' ? (job.location_ar || job.location_en) : job.location_en;
  const employmentType = language === 'ar' ? (job.employmentType_ar || job.employmentType_en) : job.employmentType_en;
  const requirements = language === 'ar' ? (job.requirements_ar || job.requirements_en) : job.requirements_en;
  const responsibilities = language === 'ar' ? (job.responsibilities_ar || job.responsibilities_en) : job.responsibilities_en;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, agreePrivacy: e.target.checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim() || !formData.agreePrivacy) {
      setError(t('Please fill in all required fields and agree to the privacy policy.', 'يرجى ملء جميع الحقول المطلوبة والموافقة على سياسة الخصوصية.'));
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('careerId', job.id);
      data.append('candidateName', formData.name);
      data.append('candidateEmail', formData.email);
      data.append('candidatePhone', formData.phone);
      data.append('portfolio', formData.portfolio);
      data.append('github', formData.github);
      data.append('experience', formData.experience);
      data.append('message', formData.message);
      if (selectedFile) {
        data.append('resume', selectedFile);
      }

      const res = await fetch('/api/applications/submit', {
        method: 'POST',
        body: data, // Form data triggers correct multipart boundary headers automatically!
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.message || 'Failed to submit application');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || t('Something went wrong. Please try again or contact us directly.', 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.'));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        className="min-h-screen bg-corematrix-bg0 text-corematrix-textPrimary py-32 font-sans"
      >
        <Container>
          <div className="mx-auto max-w-2xl rounded-3xl border border-corematrix-border bg-corematrix-card p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent" />
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-corematrix-green700 text-3xl text-white">
              ✓
            </div>
            <h2
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-3xl font-bold"
            >
              {t('Application Received!', 'تم استلام طلبك بنجاح!')}
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-corematrix-textSecondary">
              {t(
                `Thank you for applying for the ${title} position. Our engineering leaders will review your application personally. We respond to every single candidate within 5 business days.`,
                `نشكرك على التقدم لوظيفة ${title}. سيقوم قادة الهندسة لدينا بمراجعة طلبك شخصياً. نرد على جميع المتقدمين في غضون 5 أيام عمل.`
              )}
            </p>
            <div className="mt-8">
              <Link
                href="/careers"
                className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
              >
                {t('Back to Careers', 'العودة لصفحة الوظائف')}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="relative overflow-hidden bg-corematrix-bg0 pt-20 pb-24 text-corematrix-textPrimary font-sans"
    >
      {/* Background cyber neon grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1d12_1px,transparent_1px),linear-gradient(to_bottom,#0c1d12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      <div className="absolute top-[-10%] left-[20%] right-[20%] h-[350px] rounded-full bg-corematrix-green700/10 blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-corematrix-textDim"
        >
          <Link href="/" className="transition-colors hover:text-corematrix-textMuted">
            {t('Home', 'الرئيسية')}
          </Link>
          <span aria-hidden>{language === 'ar' ? '‹' : '›'}</span>
          <Link href="/careers" className="transition-colors hover:text-corematrix-textMuted">
            {t('Careers', 'الوظائف')}
          </Link>
          <span aria-hidden>{language === 'ar' ? '‹' : '›'}</span>
          <span className="text-corematrix-green400 line-clamp-1 max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg">
            {title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-start">

          {/* Job Details Column */}
          <div>
            {/* <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-corematrix-green400 hover:text-corematrix-green300 mb-8 transition"
            >
              {language === 'ar' ? '→' : '←'} {t('Back to all open roles', 'العودة لجميع الوظائف الشاغرة')}
            </Link> */}

            <span className="inline-block rounded-full border border-corematrix-green700/30 bg-corematrix-green900/30 px-3.5 py-1 text-xs font-semibold text-corematrix-green400 mb-4 uppercase tracking-wider">
              {job.department}
            </span>

            <h1
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
            >
              {title}
            </h1>

            {/* Tags row */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-corematrix-textMuted">
              <span>{location}</span>
              <span aria-hidden>·</span>
              <span>{job.salaryRange}</span>
              <span aria-hidden>·</span>
              <span className="capitalize">{employmentType}</span>
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-corematrix-border pt-8">
              <h3
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-lg font-bold uppercase tracking-wider text-corematrix-green400 mb-4"
              >
                {t('About the Role', 'نبذة عن الوظيفة')}
              </h3>
              <p className="text-base leading-relaxed text-corematrix-textSecondary font-light whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Requirements */}
            {requirements && requirements.length > 0 && (
              <div className="mt-8">
                <h3
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-lg font-bold uppercase tracking-wider text-corematrix-green400 mb-4"
                >
                  {t('What We\'re Looking For', 'ما الذي نبحث عنه')}
                </h3>
                <ul className="space-y-3">
                  {requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-corematrix-green400" />
                      <span className="text-sm leading-relaxed text-corematrix-textSecondary font-light">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsibilities */}
            {responsibilities && responsibilities.length > 0 && (
              <div className="mt-8">
                <h3
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-lg font-bold uppercase tracking-wider text-corematrix-green400 mb-4"
                >
                  {t('What You\'ll Do', 'ما الذي ستقوم به')}
                </h3>
                <ul className="space-y-3">
                  {responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-corematrix-green500/60" />
                      <span className="text-sm leading-relaxed text-corematrix-textSecondary font-light">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Form Column */}
          <div className="relative overflow-hidden rounded-3xl border border-corematrix-border bg-corematrix-card p-8 sm:p-10 shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent" />

            <h2
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-2xl font-bold tracking-tight text-corematrix-textPrimary"
            >
              {t('Apply for this role', 'تقدم بطلب لهذه الوظيفة')}
            </h2>
            <p className="mt-2 text-sm text-corematrix-textMuted">
              {t('Personalize your application. We read every word and response within 5 days.', 'قم بتخصيص طلب التوظيف الخاص بك. نحن نقرأ كل كلمة ونرد خلال 5 أيام.')}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                  {t('Full Name *', 'الاسم الكامل *')}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Jane Doe"
                  className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none transition-all placeholder:text-corematrix-textDim focus:border-corematrix-green700 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                  {t('Email Address *', 'البريد الإلكتروني *')}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jane@example.com"
                  className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none transition-all placeholder:text-corematrix-textDim focus:border-corematrix-green700 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                  {t('Phone Number', 'رقم الهاتف')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none transition-all placeholder:text-corematrix-textDim focus:border-corematrix-green700 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                    {t('Portfolio / LinkedIn', 'ملف الأعمال / لينكد إن')}
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none transition-all placeholder:text-corematrix-textDim focus:border-corematrix-green700 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                    {t('GitHub Profile', 'حساب جيت هاب')}
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none transition-all placeholder:text-corematrix-textDim focus:border-corematrix-green700 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                  {t('Years of Experience', 'سنوات الخبرة')}
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none transition-all placeholder:text-corematrix-textDim focus:border-corematrix-green700 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)]"
                >
                  <option value="">{t('Select', 'اختر')}</option>
                  <option value="Junior">{t('Junior (0–2 years)', 'مبتدئ (0-2 سنوات)')}</option>
                  <option value="Mid">{t('Mid (2–5 years)', 'متوسط (2-5 سنوات)')}</option>
                  <option value="Senior">{t('Senior (5–10 years)', 'خبير (5-10 سنوات)')}</option>
                  <option value="Staff">{t('Staff+ (10+ years)', 'كبير مهندسين (10+ سنوات)')}</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                  {t('Cover Letter / Message *', 'رسالة التغطية *')}
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('Tell us why you are a great fit for this role...', 'أخبرنا لماذا أنت الشخص المناسب لهذه الوظيفة...')}
                  className="w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none transition-all placeholder:text-corematrix-textDim focus:border-corematrix-green700 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)] resize-none"
                />
              </div>

              {/* File Uploader */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
                  {t('Resume / CV (PDF, DOC, DOCX) *', 'السيرة الذاتية (PDF, DOC, DOCX) *')}
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer rounded-xl border border-dashed border-corematrix-border2 p-4 text-center transition-all hover:border-corematrix-green400/40 hover:bg-corematrix-green900/[0.03]"
                  role="button"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  <p className="text-xs text-corematrix-textMuted">
                    {selectedFile
                      ? `${t('Selected: ', 'الملف المختار: ')} ${selectedFile.name}`
                      : t('Click to upload your CV', 'انقر هنا لرفع سيرتك الذاتية')}
                  </p>
                </div>
              </div>

              {/* Privacy agreement */}
              <label className="flex cursor-pointer items-start gap-3 mt-2">
                <input
                  type="checkbox"
                  checked={formData.agreePrivacy}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 rounded border-corematrix-border bg-corematrix-bg0 text-corematrix-green700 focus:ring-corematrix-green500"
                />
                <span className="text-xs text-corematrix-textSecondary leading-normal">
                  {t(
                    'I agree to Corematrix\'s Privacy Policy and consent to being contacted. *',
                    'أوافق على سياسة خصوصية كوري ماتريكس وأوافق على الاتصال بي. *'
                  )}
                </span>
              </label>

              {error && <p className="text-xs font-light text-red-400 mt-2">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-corematrix-green700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500 disabled:cursor-not-allowed disabled:opacity-50 mt-4 shadow-lg shadow-corematrix-green900/30"
              >
                {submitting ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {t('Submitting...', 'جاري التقديم...')}
                  </span>
                ) : (
                  t('Submit Application', 'إرسال طلب التقديم')
                )}
              </button>
            </form>
          </div>

        </div>
      </Container>
    </div>
  );
}
