'use client';

import Link from 'next/link';
import { MarketingCtaBand } from '@/components/shared/MarketingCtaBand';
import { useLanguage } from '@/context/LanguageContext';

export function AboutCtaSection() {
  const { t } = useLanguage();

  return (
    <MarketingCtaBand
      id="about-cta"
      headingId="about-cta-heading"
      sectionClassName="bg-corematrix-bg0"
      glow="sm"
      label={t("LET'S WORK TOGETHER", "لنعمل معاً")}
      title={t("Ready to Build Something That Matters?", "هل أنت مستعد لبناء شيء ذي قيمة وفائدة؟")}
      titleClassName="section-heading mx-auto mb-5 max-w-[680px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight"
      description={
        <p className="mx-auto mb-10 max-w-[500px] font-light leading-[1.75] text-corematrix-textMuted">
          {t(
            "Whether you have a fully-formed spec or just an idea on a napkin — we'd love to have a real conversation about what you're trying to build.",
            "سواء كانت لديك مواصفات مكتملة بالكامل أو مجرد فكرة بسيطة على ورقة — يسعدنا جداً إجراء محادثة حقيقية وفاعلة حول ما تحاول بناءه وتطويره."
          )}
        </p>
      }
      actionsWrapperClassName="flex flex-wrap items-center justify-center gap-4"
    >
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
      >
        {t("Start a Conversation →", "ابدأ محادثة معنا ←")}
      </Link>
      <Link
        href="/services"
        className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 bg-transparent px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
      >
        {t("See Our Services", "شاهد خدماتنا")}
      </Link>
    </MarketingCtaBand>
  );
}
