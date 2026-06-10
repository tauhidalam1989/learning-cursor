'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translate, Language } from '@/lib/translationService';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  t: (keyOrEn: string, fallbackAr?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load from localStorage if present
    const saved = localStorage.getItem('corematrix-language') as Language;
    if (saved === 'en' || saved === 'ar') {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('corematrix-language', lang);
    // Dynamically adjust html element dir attribute
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  // Smart helper that works with both translation service keys and inline ar/en fallback parameters
  const t = (keyOrEn: string, fallbackAr?: string) => {
    return translate(keyOrEn, language, fallbackAr);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

