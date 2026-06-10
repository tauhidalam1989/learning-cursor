'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export function FeedbackContent() {
  const { t } = useLanguage();

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-20 px-[6vw] text-center">
      <div className="inline-flex items-center gap-2 bg-corematrix-green900/20 border border-corematrix-green400/15 rounded-full px-4 py-1.5 text-[0.72rem] font-bold tracking-[0.1em] uppercase text-corematrix-green400 mb-6">
        {t('We Read Every Message', 'نقرأ كل رسالة')}
      </div>
      <h1
        className="font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold tracking-tight text-corematrix-textPrimary mb-4"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {t('Share Your Feedback', 'شاركنا ملاحظاتك')}
      </h1>
      <p className="text-corematrix-textMuted font-light max-w-[480px] leading-relaxed mb-8">
        {t(
          "Have a suggestion, complaint, or something kind to say? Use our contact form and we'll respond within 24 hours.",
          "هل لديك اقتراح، شكوى، أو كلمة طيبة ترغب في قولها؟ استخدم نموذج الاتصال الخاص بنا وسنقوم بالرد عليك في غضون 24 ساعة."
        )}
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 bg-corematrix-green700 text-white px-6 py-3 rounded-lg text-sm font-semibold border border-corematrix-green500 hover:bg-corematrix-green500 hover:shadow-[0_0_28px_rgba(34,197,94,0.3)] transition-all hover:-translate-y-px"
      >
        {t('Go to Contact Form →', 'الذهاب إلى نموذج الاتصال ←')}
      </Link>
    </main>
  );
}
