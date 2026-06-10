'use client';

import Link from 'next/link';
import { POLICY_SECTIONS } from '@/data/privacyData';
import { siteConfig } from '@/config/site';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useLanguage } from '@/context/LanguageContext';

const sectionTitles: Record<string, { en: string; ar: string }> = {
  s1: { en: 'Who We Are', ar: 'من نحن' },
  s2: { en: 'Data We Collect', ar: 'البيانات التي نجمعها' },
  s3: { en: 'How We Use Data', ar: 'كيفية استخدامنا للبيانات' },
  s4: { en: 'Legal Basis', ar: 'الأساس القانوني' },
  s5: { en: 'Data Sharing', ar: 'مشاركة البيانات' },
  s6: { en: 'Retention', ar: 'الاحتفاظ بالبيانات' },
  s7: { en: 'Your Rights', ar: 'حقوقك' },
  s8: { en: 'Security', ar: 'الأمان' },
  s9: { en: 'Cookies', ar: 'ملفات تعريف الارتباط (الكوكيز)' },
  s10: { en: 'International Transfers', ar: 'نقل البيانات دولياً' },
  s11: { en: "Children's Privacy", ar: 'خصوصية الأطفال' },
  s12: { en: 'Changes', ar: 'التغييرات على هذه السياسة' },
  s13: { en: 'Contact Us', ar: 'اتصل بنا' },
};

export function PrivacyToc() {
  const activeId = useActiveSection('.policy-section') || 's1';
  const { t } = useLanguage();

  return (
    <aside className="lg:sticky lg:top-[88px]">
      <nav aria-label={t("Privacy policy sections", "أقسام سياسة الخصوصية")}>
        <p className="mb-3 font-display text-[0.68rem] font-bold uppercase tracking-[0.12em] text-corematrix-green400">
          {t('ON THIS PAGE', 'في هذه الصفحة')}
        </p>
        <div className="overflow-hidden rounded-2xl border border-corematrix-border">
          {POLICY_SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className={`flex items-center gap-3 border-b border-corematrix-border/50 bg-corematrix-card px-4 py-3 text-sm font-medium transition-all last:border-0 hover:bg-corematrix-green900/[0.06] hover:text-corematrix-textPrimary ${
                activeId === section.id
                  ? 'toc-link-active bg-corematrix-green900/10 text-corematrix-green400'
                  : 'text-corematrix-textMuted'
              }`}
            >
              <span className="w-5 flex-shrink-0 font-mono text-[0.65rem] text-corematrix-textDim">
                {section.num}
              </span>
              {t(sectionTitles[section.id]?.en || section.title, sectionTitles[section.id]?.ar || section.title)}
            </Link>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-corematrix-border bg-corematrix-card p-5">
          <p className="mb-3 font-display text-[0.62rem] font-bold uppercase tracking-wider text-corematrix-green400">
            {t('DATA CONTROLLER', 'مراقب البيانات')}
          </p>
          <p className="text-sm font-medium text-corematrix-textPrimary">{t('Corematrix', 'كورماتريكس')}</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-1 block text-sm text-corematrix-textMuted transition-colors hover:text-corematrix-green400"
          >
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.phoneTel}
            className="mt-1 block text-sm text-corematrix-textMuted transition-colors hover:text-corematrix-green400"
          >
            {siteConfig.phone}
          </a>
        </div>
      </nav>
    </aside>
  );
}
