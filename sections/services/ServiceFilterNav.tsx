'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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

const FILTER_THEMES = [
  {
    active: 'border-cyan-400 bg-cyan-950/30 font-bold text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-[1.02]',
    inactive: 'border-cyan-500/20 bg-cyan-950/5 text-cyan-400/70 hover:border-cyan-500/40 hover:text-cyan-300 hover:bg-cyan-950/15',
  },
  {
    active: 'border-sky-400 bg-sky-950/30 font-bold text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.15)] scale-[1.02]',
    inactive: 'border-sky-500/20 bg-sky-950/5 text-sky-400/70 hover:border-sky-500/40 hover:text-sky-300 hover:bg-sky-950/15',
  },
  {
    active: 'border-emerald-400 bg-emerald-950/30 font-bold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] scale-[1.02]',
    inactive: 'border-emerald-500/20 bg-emerald-950/5 text-emerald-400/70 hover:border-emerald-500/40 hover:text-emerald-300 hover:bg-emerald-950/15',
  },
  {
    active: 'border-amber-400 bg-amber-950/30 font-bold text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)] scale-[1.02]',
    inactive: 'border-amber-500/20 bg-amber-950/5 text-amber-400/70 hover:border-amber-500/40 hover:text-amber-300 hover:bg-amber-950/15',
  },
  {
    active: 'border-purple-400 bg-purple-950/30 font-bold text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)] scale-[1.02]',
    inactive: 'border-purple-500/20 bg-purple-950/5 text-purple-400/70 hover:border-purple-500/40 hover:text-purple-300 hover:bg-purple-950/15',
  },
  {
    active: 'border-rose-400 bg-rose-950/30 font-bold text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)] scale-[1.02]',
    inactive: 'border-rose-500/20 bg-rose-950/5 text-rose-400/70 hover:border-rose-500/40 hover:text-rose-300 hover:bg-rose-950/15',
  },
  {
    active: 'border-orange-400 bg-orange-950/30 font-bold text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)] scale-[1.02]',
    inactive: 'border-orange-500/20 bg-orange-950/5 text-orange-400/70 hover:border-orange-500/40 hover:text-orange-300 hover:bg-orange-950/15',
  },
  {
    active: 'border-teal-400 bg-teal-950/30 font-bold text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.15)] scale-[1.02]',
    inactive: 'border-teal-500/20 bg-teal-950/5 text-teal-400/70 hover:border-teal-500/40 hover:text-teal-300 hover:bg-teal-950/15',
  },
];

const getThemeIndex = (filterKey: string): number => {
  const mapping: Record<string, number> = {
    'ai-automation-services': 0,          // Cyan
    'cyber-security-services': 4,        // Purple
    'web-developement-services': 2,      // Emerald
    'mobile-app-developement-services': 3, // Amber
    'cloud-devops-services': 7,          // Teal
    'data-analytics-services': 5,        // Rose
    'ui-ux-product-design': 6,           // Orange
    'quality-assurance-testing': 4,      // Purple
    'it-consulting-strategy': 1,         // Sky
  };
  return mapping[filterKey] !== undefined ? mapping[filterKey] : 0;
};

export function ServiceFilterNav() {
  const { active: activeFilter, dispatch } = useFilterDispatch('serviceFilter');
  const { language, t } = useLanguage();
  const [categories, setCategories] = useState<{ id: string; label: string }[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const isOverflowing = scrollWidth > clientWidth;

    if (!isOverflowing) {
      setShowLeftArrow(false);
      setShowRightArrow(false);
      return;
    }

    if (language === 'ar') {
      const absoluteScrollLeft = Math.abs(scrollLeft);
      setShowRightArrow(absoluteScrollLeft > 5);
      setShowLeftArrow(absoluteScrollLeft < scrollWidth - clientWidth - 5);
    } else {
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, [language]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 240;
    const directionMultiplier = direction === 'left' ? -1 : 1;
    el.scrollBy({
      left: scrollAmount * directionMultiplier,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
        const apiBase = backendUrl.endsWith('/api') ? backendUrl : `${backendUrl}/api`;

        const [catsRes, servicesRes] = await Promise.all([
          fetch(`${apiBase}/service-categories`, { cache: 'no-store' }),
          fetch(`${apiBase}/services`, { cache: 'no-store' })
        ]);
        
        if (catsRes.ok && servicesRes.ok) {
          const rawCats = await catsRes.json();
          const rawServices = await servicesRes.json();
          const catsData = Array.isArray(rawCats) ? rawCats : (Array.isArray(rawCats?.data) ? rawCats.data : []);
          const servicesData = Array.isArray(rawServices) ? rawServices : (Array.isArray(rawServices?.data) ? rawServices.data : []);

          if (catsData.length > 0) {
            const dynamicFilters = catsData
              .filter((cat: any) => servicesData.some((s: any) => s.category === cat.filterKey))
              .map((cat: any) => ({
                id: cat.filterKey,
                label: language === 'ar' ? cat.label_ar : cat.label_en,
              }));
            
            if (dynamicFilters.length > 0) {
              setCategories(dynamicFilters);
              return;
            }
          }
        }
      } catch (e) {
        // Silently fall back to default static list
      }
      
      // Fallback static list in case of network/database disconnect
      setCategories([
        { id: 'ai', label: language === 'ar' ? 'أنظمة الذكاء الاصطناعي' : 'AI & Automation' },
        { id: 'web', label: language === 'ar' ? 'تطوير الويب والجوال' : 'Web & Mobile' },
        { id: 'saas', label: language === 'ar' ? 'تطوير المنصات وحلول المؤسسات' : 'SaaS & Cloud' },
        { id: 'teams', label: language === 'ar' ? 'الفرق المخصصة والتعهيد' : 'Dedicated Teams' },
      ]);
    }
    fetchCategories();
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(checkScroll, 100);
    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScroll);
    };
  }, [categories, activeFilter, checkScroll]);

  const allLabel = t('All Services', 'كل الخدمات');

  const handleFilter = (id: string) => {
    dispatch(id);
    // Small delay lets React re-render filtered cards before we scroll
    setTimeout(scrollToServices, 50);
  };

  return (
    <nav
      aria-label="Filter services"
      className="sticky top-[68px] z-40 border-y border-corematrix-border bg-corematrix-bg0 py-4 md:py-6"
    >
      <Container className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3">
        <span className="font-display text-[0.68rem] font-bold uppercase tracking-[0.12em] text-corematrix-textDim shrink-0 lg:mr-2">
          {t('FILTER BY:', 'تصفية حسب:')}
        </span>

        {/* Scrollable Container Wrapper */}
        <div className="relative flex-1 min-w-0">
          {/* Left Arrow Button */}
          {showLeftArrow && (
            <div className="lg:hidden">
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-corematrix-bg0 via-corematrix-bg0/70 to-transparent pointer-events-none z-10" />
              <button
                type="button"
                onClick={() => scroll('left')}
                className="absolute left-1 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-corematrix-border bg-corematrix-card text-corematrix-textPrimary shadow-lg transition-all hover:bg-corematrix-border/50 focus-visible:outline-none"
                aria-label={language === 'ar' ? 'التمرير لليمين' : 'Scroll left'}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex flex-nowrap lg:flex-wrap items-center gap-3 overflow-x-auto lg:overflow-x-visible scrollbar-hide scroll-smooth pb-1 px-1"
          >
            <button
              type="button"
              onClick={() => handleFilter('all')}
              className={`cursor-pointer shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                activeFilter === 'all'
                  ? 'border-corematrix-green400/30 bg-corematrix-green900/20 font-semibold text-corematrix-green400'
                  : 'border-corematrix-border bg-corematrix-card text-corematrix-textMuted hover:border-corematrix-border2 hover:text-corematrix-textPrimary'
              }`}
            >
              {allLabel}
            </button>
            {categories.map((f) => {
              const themeIndex = getThemeIndex(f.id);
              const theme = FILTER_THEMES[themeIndex];
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => handleFilter(f.id)}
                  className={`cursor-pointer shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                    activeFilter === f.id ? theme.active : theme.inactive
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          {showRightArrow && (
            <div className="lg:hidden">
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-corematrix-bg0 via-corematrix-bg0/70 to-transparent pointer-events-none z-10" />
              <button
                type="button"
                onClick={() => scroll('right')}
                className="absolute right-1 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-corematrix-border bg-corematrix-card text-corematrix-textPrimary shadow-lg transition-all hover:bg-corematrix-border/50 focus-visible:outline-none"
                aria-label={language === 'ar' ? 'التمرير لليسار' : 'Scroll right'}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
}
