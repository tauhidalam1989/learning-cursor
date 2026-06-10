'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export function PrivacyHero() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="privacy-hero-heading"
      className="relative overflow-hidden border-b border-corematrix-border bg-corematrix-bg0 px-[6vw] pb-16 pt-[64px]"
    >
      <div
        className="pointer-events-none absolute -right-20 -top-36 h-[500px] w-[500px] rounded-full bg-corematrix-green700 opacity-[0.06] blur-[120px]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-[760px]">
        <div className="mb-5 flex items-center gap-2 text-xs font-medium text-corematrix-textDim">
          <Link href="/" className="hover:text-corematrix-textMuted">
            {t('Home', 'الرئيسية')}
          </Link>
          <span aria-hidden>›</span>
          <span className="text-corematrix-green400">{t('Privacy Policy', 'سياسة الخصوصية')}</span>
        </div>
        <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-corematrix-green400/15 bg-corematrix-green900/20 px-4 py-2 font-mono text-sm text-corematrix-green400">
          <i className="fas fa-lock" aria-hidden="true" />{' '}
          {t('GDPR Compliant · Last Updated: March 2026', 'متوافق مع GDPR · آخر تحديث: مارس 2026')}
        </div>
        <h1
          id="privacy-hero-heading"
          className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-corematrix-textPrimary"
        >
          {t('Privacy Policy', 'سياسة الخصوصية')}
        </h1>
        <div className="mb-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-1.5 text-sm text-corematrix-textMuted">
            <i className="far fa-calendar-alt text-corematrix-green400" aria-hidden="true" />
            {t('Effective: 1 March 2026', 'تاريخ النفاذ: 1 مارس 2026')}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-corematrix-textMuted">
            <i className="fas fa-sync-alt text-corematrix-green400" aria-hidden="true" />
            {t('Last updated: 20 March 2026', 'آخر تحديث: 20 مارس 2026')}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-corematrix-textMuted">
            <i className="fas fa-book-open text-corematrix-green400" aria-hidden="true" />
            {t('~8 min read', 'قراءة في حوالي 8 دقائق')}
          </div>
        </div>
        <div className="max-w-[620px] rounded-r-xl border border-corematrix-border border-l-[3px] border-l-corematrix-green700 bg-corematrix-card p-5 text-sm font-light leading-relaxed text-corematrix-textMuted">
          <strong className="font-semibold text-corematrix-green400">
            {t('Plain-language summary:', 'ملخص بلغة مبسطة:')}
          </strong>{' '}
          {t(
            "We collect only what we need to deliver our services, protect it seriously, never sell it to anyone, and give you full control over it. This policy explains exactly what we do and why — in plain English, not legalese.",
            "نحن نجمع فقط ما نحتاجه لتقديم خدماتنا، ونحميه بجدية، ولا نبيعه لأي شخص على الإطلاق، ونمنحك السيطرة الكاملة عليه. تشرح هذه السياسة بالضبط ما نفعله ولماذا — بلغة واضحة ومبسطة، بعيداً عن المصطلحات القانونية المعقدة."
          )}
        </div>
      </div>
    </section>
  );
}
