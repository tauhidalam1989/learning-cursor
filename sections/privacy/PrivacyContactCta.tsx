'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';

export function PrivacyContactCta() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="privacy-cta-heading"
      className="relative overflow-hidden border-t border-corematrix-border bg-corematrix-bg2 px-[6vw] py-14 text-center"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.05] blur-[80px]"
        aria-hidden
      />
      <div className="relative z-10">
        <h2
          id="privacy-cta-heading"
          className="font-display text-xl font-bold text-corematrix-textPrimary"
        >
          {t('Questions About Your Data?', 'هل لديك أسئلة حول بياناتك؟')}
        </h2>
        <p className="mx-auto mt-2 max-w-[560px] text-sm text-corematrix-textMuted">
          {t(
            "We respond to every privacy inquiry within 30 days. Reach out — we're happy to explain anything.",
            "نحن نجيب على كل استفسار يتعلق بالخصوصية في غضون 30 يوماً. تواصل معنا — يسعدنا توضيح أي شيء."
          )}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
          >
            {t('📧 Email Our Team', '📧 راسل فريقنا عبر البريد الإلكتروني')}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
          >
            {t('Use Contact Form →', 'استخدم نموذج الاتصال ←')}
          </Link>
        </div>
      </div>
    </section>
  );
}
