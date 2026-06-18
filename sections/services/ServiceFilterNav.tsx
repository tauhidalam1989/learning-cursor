'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { useFilterDispatch } from '@/hooks/usePortalFilter';
import { useLanguage } from '@/context/LanguageContext';

export type FilterId = 'all' | string;

/** Scrolls so the #services section sits just below the sticky filter bar */
function scrollToServices() {
  if (typeof window === 'undefined') return;
  const section = document.getElementById('services');
  if (!section) return;
  const OFFSET = 160; // header (~68px) + filter nav (~85px) + 7px breathing room
  const top = section.getBoundingClientRect().top + window.scrollY - OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

export function ServiceFilterNav() {
  const { active: activeFilter, dispatch } = useFilterDispatch('serviceFilter');
  const { language, t } = useLanguage();
  const [categories, setCategories] = useState<{ id: string; label: string }[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/service-categories');
        if (!res.ok) throw new Error('API offline');
        const data = await res.json();
        
        // Construct filters array from backend category keys
        const dynamicFilters = data.map((cat: any) => ({
          id: cat.filterKey,
          label: language === 'ar' ? cat.label_ar : cat.label_en,
        }));
        
        setCategories(dynamicFilters);
      } catch (e) {
        console.warn('API error retrieving service categories for navigation:', e);
        // Fallback static list in case of network/database disconnect
        setCategories([
          { id: 'ai', label: language === 'ar' ? 'أنظمة الذكاء الاصطناعي' : 'AI & Automation' },
          { id: 'web', label: language === 'ar' ? 'تطوير الويب والجوال' : 'Web & Mobile' },
          { id: 'saas', label: language === 'ar' ? 'تطوير المنصات وحلول المؤسسات' : 'SaaS & Cloud' },
          { id: 'teams', label: language === 'ar' ? 'الفرق المخصصة والتعهيد' : 'Dedicated Teams' },
        ]);
      }
    }
    fetchCategories();
  }, [language]);

  const allLabel = t('All Services', 'كل الخدمات');

  const handleFilter = (id: string) => {
    dispatch(id);
    // Small delay lets React re-render filtered cards before we scroll
    setTimeout(scrollToServices, 50);
  };

  return (
    <nav
      aria-label="Filter services"
      className="sticky top-[68px] z-40 border-y border-corematrix-border bg-corematrix-bg0 py-6"
    >
      <Container className="flex flex-wrap items-center gap-3">
        <span className="mr-2 font-display text-[0.68rem] font-bold uppercase tracking-[0.12em] text-corematrix-textDim">
          {t('FILTER BY:', 'تصفية حسب:')}
        </span>
        <button
          type="button"
          onClick={() => handleFilter('all')}
          className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-all ${
            activeFilter === 'all'
              ? 'border-corematrix-green400/30 bg-corematrix-green900/20 font-semibold text-corematrix-green400'
              : 'border-corematrix-border bg-corematrix-card text-corematrix-textMuted hover:border-corematrix-border2 hover:text-corematrix-textPrimary'
          }`}
        >
          {allLabel}
        </button>
        {categories.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => handleFilter(f.id)}
            className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-all ${
              activeFilter === f.id
                ? 'border-corematrix-green400/30 bg-corematrix-green900/20 font-semibold text-corematrix-green400'
                : 'border-corematrix-border bg-corematrix-card text-corematrix-textMuted hover:border-corematrix-border2 hover:text-corematrix-textPrimary'
            }`}
          >
            {f.label}
          </button>
        ))}
      </Container>
    </nav>
  );
}
