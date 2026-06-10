'use client';

import Link from 'next/link';
import { MarketingCtaBand } from '@/components/shared/MarketingCtaBand';
import { useLanguage } from '@/context/LanguageContext';

export function ServicesCtaSection() {
  const { t } = useLanguage();

  return (
    <MarketingCtaBand
      id="services-cta"
      headingId="services-cta-heading"
      sectionClassName="bg-corematrix-bg2"
      glow="lg"
      label={t('READY TO START?', 'جاهز للبدء؟')}
      title={t("Let's Build Something Extraordinary Together", 'لنبنِ شيئاً استثنائياً معاً')}
      titleClassName="mx-auto mb-5 max-w-[700px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight text-corematrix-textPrimary"
      description={
        <p className="mx-auto mb-8 max-w-[600px] text-base leading-relaxed text-corematrix-textSecondary">
          {t(
            "Tell us about your project. We'll respond within 24 hours with a genuine technical perspective — not a sales pitch.",
            'أخبرنا عن مشروعك. سنرد عليك في غضون 24 ساعة برؤية تقنية حقيقية — وليس عرضاً ترويجياً للمبيعات.'
          )}
        </p>
      }
      actionsWrapperClassName="flex flex-wrap items-center justify-center gap-4"
    >
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
      >
        {t('Start Your Project →', 'ابدأ مشروعك →')}
      </Link>
      <Link
        href="/about"
        className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-8 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
      >
        {t('Learn About Our Team', 'تعرف على فريقنا')}
      </Link>
    </MarketingCtaBand>
  );
}
