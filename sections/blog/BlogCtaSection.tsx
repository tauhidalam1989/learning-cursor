'use client';

import Link from 'next/link';
import { MarketingCtaBand } from '@/components/shared/MarketingCtaBand';
import { useLanguage } from '@/context/LanguageContext';

export function BlogCtaSection() {
  const { t } = useLanguage();

  return (
    <MarketingCtaBand
      id="blog-cta"
      headingId="blog-cta-heading"
      sectionClassName="bg-corematrix-bg2"
      glow="lg"
      label={t('WORK WITH US', 'اعمل معنا')}
      title={t("Liked What You Read? Let's Build Together", 'هل أعجبك ما قرأته؟ لنبنِ معاً')}
      titleClassName="mx-auto mb-5 max-w-[700px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight text-corematrix-textPrimary"
      description={
        <p className="mx-auto mb-8 max-w-[600px] text-base leading-relaxed text-corematrix-textSecondary">
          {t(
            'The same team that writes these articles builds production AI systems, Next.js apps, and SaaS platforms for companies worldwide. Let&apos;s talk about your project.',
            'نفس الفريق الذي يكتب هذه المقالات يبني أنظمة ذكاء اصطناعي، وتطبيقات Next.js، ومنصات SaaS للشركات في جميع أنحاء العالم. فلنتحدث عن مشروعك.'
          )}
        </p>
      }
      actionsWrapperClassName="flex flex-wrap items-center justify-center gap-4"
    >
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
      >
        {t('Start a Project →', 'ابدأ مشروعاً →')}
      </Link>
      <Link
        href="/services"
        className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-8 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
      >
        {t('See Our Services', 'عرض خدماتنا')}
      </Link>
    </MarketingCtaBand>
  );
}
