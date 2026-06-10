'use client';

import Link from 'next/link';
import { MarketingCtaBand } from '@/components/shared/MarketingCtaBand';
import { useLanguage } from '@/context/LanguageContext';

export function CareersCtaSection() {
  const { t } = useLanguage();

  return (
    <MarketingCtaBand
      id="careers-cta"
      headingId="careers-cta-heading"
      sectionClassName="bg-corematrix-bg2"
      glow="lg"
      label={t('JOIN THE TEAM', 'انضم للفريق')}
      title={t('Ready to Build Something Extraordinary?', 'جاهز لبناء شيء استثنائي؟')}
      titleClassName="section-heading mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl"
      description={
        <p className="mx-auto mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
          {t(
            "We're looking for people who care deeply about their craft, think like owners, and want to work on AI products that actually matter.",
            'نحن نبحث عن أشخاص يهتمون بشدة بحرفتهم، ويفكرون كأصحاب أعمال، ويريدون العمل على منتجات ذكاء اصطناعي ذات أهمية حقيقية.'
          )}
        </p>
      }
      actionsWrapperClassName="mt-8 flex flex-wrap justify-center gap-4"
    >
      <Link
        href="#open-roles"
        className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
      >
        {t('View Open Roles →', 'عرض الوظائف الشاغرة →')}
      </Link>
      <Link
        href="#open-application"
        className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
      >
        {t('Send Open Application', 'أرسل طلباً عاماً')}
      </Link>
    </MarketingCtaBand>
  );
}
