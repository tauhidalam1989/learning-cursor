'use client';

import Link from 'next/link';
import { MarketingCtaBand } from '@/components/shared/MarketingCtaBand';
import { useLanguage } from '@/context/LanguageContext';

export function CtaBannerSection() {
  const { t } = useLanguage();

  return (
    <MarketingCtaBand
      id="cta-banner"
      headingId="cta-banner-heading"
      sectionClassName="bg-corematrix-bg2"
      glow="inset"
      label={t("GET STARTED", "ابدأ الآن")}
      title={
        <>
          {t("Ready to Build Your Next", "هل أنت مستعد لبناء منتجك")}
          <br />
          {t("AI-Powered Product?", "التالي القائم على الذكاء الاصطناعي؟")}
        </>
      }
      titleClassName="section-heading mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl"
      description={
        <p className="mx-auto mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
          {t(
            "Whether you're a startup with an idea or an enterprise ready to modernize — we're your technical co-founder for the long haul.",
            "سواء كنت شركة ناشئة لديك فكرة أو مؤسسة كبرى مستعدة للتحديث — فنحن شريكك التقني المؤسس على المدى الطويل."
          )}
        </p>
      }
      actionsWrapperClassName="mt-10 flex flex-wrap items-center justify-center gap-4"
    >
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
      >
        {t("Start a Project →", "ابدأ مشروعاً ←")}
      </Link>
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 bg-transparent px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
      >
        {t("Schedule a Free Call", "احجز مكالمة مجانية")}
      </Link>
    </MarketingCtaBand>
  );
}

