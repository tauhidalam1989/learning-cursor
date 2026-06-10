'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { MarketingCtaBand } from '@/components/shared/MarketingCtaBand';
import { useLanguage } from '@/context/LanguageContext';

export function ContactCtaSection() {
  const { t } = useLanguage();

  return (
    <MarketingCtaBand
      id="contact-cta"
      headingId="contact-cta-heading"
      sectionClassName="bg-corematrix-bg2"
      glow="lg"
      label={t("START THE CONVERSATION", "ابدأ المحادثة معنا")}
      title={t("Your Next Great Product Starts With a Message", "منتجك الرائع القادم يبدأ برسالة بسيطة")}
      titleClassName="mx-auto mb-5 max-w-[700px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight text-corematrix-textPrimary"
      description={
        <p className="mx-auto mb-8 max-w-[600px] text-base leading-relaxed text-corematrix-textSecondary">
          {t(
            "Stop overthinking it. Send us a message today and let's figure out together whether we're the right team to build it.",
            "توقف عن التفكير الزائد. أرسل لنا رسالة اليوم ودعنا نكتشف معاً ما إذا كنا الفريق الأنسب لبنائه وتطويره."
          )}
        </p>
      }
      actionsWrapperClassName="flex flex-wrap items-center justify-center gap-4"
    >
      <Link
        href="#contact-form"
        className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
      >
        {t("Fill Out the Form →", "املأ نموذج الاتصال ←")}
      </Link>
      <Link
        href={`mailto:${siteConfig.email}`}
        className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-8 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
      >
        {t("Email Us Directly", "راسلنا عبر البريد مباشرة")}
      </Link>
    </MarketingCtaBand>
  );
}
