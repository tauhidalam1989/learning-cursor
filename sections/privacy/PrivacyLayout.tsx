'use client';

import { PrivacyToc } from '@/components/privacy/PrivacyToc';
import { PolicyContent } from '@/components/privacy/PolicyContent';
import { useLanguage } from '@/context/LanguageContext';

export function PrivacyLayout() {
  const { t } = useLanguage();

  return (
    <section
      aria-label={t("Privacy policy content", "محتوى سياسة الخصوصية")}
      className="bg-corematrix-bg0 px-[6vw] py-16"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-[260px_1fr]">
        <PrivacyToc />
        <PolicyContent />
      </div>
    </section>
  );
}
