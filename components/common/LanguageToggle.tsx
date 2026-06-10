'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';

export default function LanguageToggle() {
  const { language, setLanguage, dir } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`fixed bottom-6 ${language === 'ar' ? 'left-6' : 'right-6'} flex items-center gap-1.5 rounded-full border border-corematrix-border bg-corematrix-card/85 p-1 backdrop-blur-md shadow-lg shadow-black/40 transition-all duration-300 hover:border-corematrix-green400/40`}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
          language === 'en'
            ? 'bg-corematrix-green700 text-white shadow-md'
            : 'text-corematrix-textMuted hover:text-corematrix-textPrimary'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`rounded-full px-3 py-1.5 text-xs font-bold tracking-wider transition-all cursor-pointer ${
          language === 'ar'
            ? 'bg-corematrix-green700 text-white shadow-md'
            : 'text-corematrix-textMuted hover:text-corematrix-textPrimary'
        }`}
      >
        عربي
      </button>
    </div>
  );
}
