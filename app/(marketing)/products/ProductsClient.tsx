'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Product, ProductCategory, getMediaUrl } from '@/lib/products';
import { useLanguage } from '@/context/LanguageContext';

const FILTER_THEMES = [
  {
    active: 'border-cyan-400 bg-cyan-950/40 font-bold text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)] scale-[1.03]',
    inactive: 'border-corematrix-border bg-corematrix-bg0/80 text-corematrix-textMuted hover:border-cyan-500/40 hover:text-cyan-300 hover:bg-cyan-950/20',
  },
  {
    active: 'border-emerald-400 bg-emerald-950/40 font-bold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)] scale-[1.03]',
    inactive: 'border-corematrix-border bg-corematrix-bg0/80 text-corematrix-textMuted hover:border-emerald-500/40 hover:text-emerald-300 hover:bg-emerald-950/20',
  },
  {
    active: 'border-purple-400 bg-purple-950/40 font-bold text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.25)] scale-[1.03]',
    inactive: 'border-corematrix-border bg-corematrix-bg0/80 text-corematrix-textMuted hover:border-purple-500/40 hover:text-purple-300 hover:bg-purple-950/20',
  },
  {
    active: 'border-amber-400 bg-amber-950/40 font-bold text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] scale-[1.03]',
    inactive: 'border-corematrix-border bg-corematrix-bg0/80 text-corematrix-textMuted hover:border-amber-500/40 hover:text-amber-300 hover:bg-amber-950/20',
  },
  {
    active: 'border-rose-400 bg-rose-950/40 font-bold text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.25)] scale-[1.03]',
    inactive: 'border-corematrix-border bg-corematrix-bg0/80 text-corematrix-textMuted hover:border-rose-500/40 hover:text-rose-300 hover:bg-rose-950/20',
  },
  {
    active: 'border-sky-400 bg-sky-950/40 font-bold text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.25)] scale-[1.03]',
    inactive: 'border-corematrix-border bg-corematrix-bg0/80 text-corematrix-textMuted hover:border-sky-500/40 hover:text-sky-300 hover:bg-sky-950/20',
  },
];

const CARD_THEMES = [
  {
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    cardBg: 'bg-cyan-950/20',
    cardBorder: 'border-cyan-500/15',
    hoverBorder: 'hover:border-cyan-500/40',
    hoverTitle: 'group-hover:text-cyan-400',
    glow: 'hover:shadow-[0_0_24px_rgba(6,182,212,0.15)]',
    badgeBg: 'bg-cyan-900/40 text-cyan-400 border-cyan-500/30'
  },
  {
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
    cardBg: 'bg-emerald-950/20',
    cardBorder: 'border-emerald-500/15',
    hoverBorder: 'hover:border-emerald-500/40',
    hoverTitle: 'group-hover:text-emerald-400',
    glow: 'hover:shadow-[0_0_24px_rgba(16,185,129,0.15)]',
    badgeBg: 'bg-emerald-900/40 text-emerald-400 border-emerald-500/30'
  },
  {
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    cardBg: 'bg-purple-950/20',
    cardBorder: 'border-purple-500/15',
    hoverBorder: 'hover:border-purple-500/40',
    hoverTitle: 'group-hover:text-purple-400',
    glow: 'hover:shadow-[0_0_24px_rgba(168,85,247,0.15)]',
    badgeBg: 'bg-purple-900/40 text-purple-400 border-purple-500/30'
  },
  {
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
    cardBg: 'bg-amber-950/20',
    cardBorder: 'border-amber-500/15',
    hoverBorder: 'hover:border-amber-500/40',
    hoverTitle: 'group-hover:text-amber-400',
    glow: 'hover:shadow-[0_0_24px_rgba(245,158,11,0.15)]',
    badgeBg: 'bg-amber-900/40 text-amber-400 border-amber-500/30'
  },
  {
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10 border-rose-500/20',
    cardBg: 'bg-rose-950/20',
    cardBorder: 'border-rose-500/15',
    hoverBorder: 'hover:border-rose-500/40',
    hoverTitle: 'group-hover:text-rose-400',
    glow: 'hover:shadow-[0_0_24px_rgba(244,63,94,0.15)]',
    badgeBg: 'bg-rose-900/40 text-rose-400 border-rose-500/30'
  },
  {
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-500/10 border-sky-500/20',
    cardBg: 'bg-sky-950/20',
    cardBorder: 'border-sky-500/15',
    hoverBorder: 'hover:border-sky-500/40',
    hoverTitle: 'group-hover:text-sky-400',
    glow: 'hover:shadow-[0_0_24px_rgba(14,165,233,0.15)]',
    badgeBg: 'bg-sky-900/40 text-sky-400 border-sky-500/30'
  }
];

interface ProductsClientProps {
  products: Product[];
  categories: ProductCategory[];
}

export default function ProductsClient({ products, categories }: ProductsClientProps) {
  const { language, dir, t } = useLanguage();
  const isAr = language === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Group products by category
  const productsByCategory: { [key: string]: { category: ProductCategory | null; products: Product[] } } = {};

  products.forEach((product) => {
    const catId = product.categoryId ? product.categoryId.toString() : 'uncategorized';
    if (!productsByCategory[catId]) {
      productsByCategory[catId] = {
        category: product.category || null,
        products: []
      };
    }
    productsByCategory[catId].products.push(product);
  });

  const categoryKeys = Object.keys(productsByCategory);

  // Scroll spy effect to highlight active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 210; // Header + Sticky nav + Breathing room offset

      let currentActive = 'all';
      for (const key of categoryKeys) {
        const el = document.getElementById(`cat-${key}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentActive = key;
            break;
          }
        }
      }
      setActiveCategory(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categoryKeys]);

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

  const scrollNav = (direction: 'left' | 'right') => {
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
    const timer = setTimeout(checkScroll, 100);
    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScroll);
    };
  }, [categories, activeCategory, checkScroll]);

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const targetId = catId === 'all' ? 'all-products' : `cat-${catId}`;
    const el = document.getElementById(targetId);
    if (el) {
      const OFFSET = 195; // Header (80px) + Filter Bar (~70px) + Padding (~45px)
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - OFFSET;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  const activeCategoriesList = categories.filter(c => c.isActive && categoryKeys.includes(c.id.toString()));

  return (
    <main className="min-h-screen bg-corematrix-bg0 text-corematrix-text relative" dir={dir}>
      {/* Hero Header */}
      <section className="relative py-20 md:py-24 border-b border-corematrix-border/50 bg-gradient-to-b from-corematrix-bg1 via-corematrix-bg0 to-corematrix-bg0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-corematrix-green700/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-corematrix-green900/40 border border-corematrix-green700/40 text-corematrix-green400 text-xs font-bold uppercase tracking-widest mb-6">
            <i className="fas fa-boxes" /> {t('Enterprise Product Suites', 'أجنحة المنتجات للمؤسسات')}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            {isAr ? (
              <>
                المنصات الذكية و<span className="text-corematrix-green400">حلول البرمجيات</span>
              </>
            ) : (
              <>
                Intelligent Platforms & <span className="text-corematrix-green400">Software Solutions</span>
              </>
            )}
          </h1>
          <p className="text-corematrix-textMuted text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {t(
              'Explore our suite of next-generation enterprise products, AI intelligent platforms, and custom software solutions designed for high scalability and operational excellence.',
              'استكشف مجموعتنا من منتجات المؤسسات من الجيل القادم، ومنصات الذكاء الاصطناعي الذكية، والحلول البرمجية المخصصة المصممة بقابلية توسع عالية وكفاءة تشغيلية.'
            )}
          </p>
        </div>
      </section>

      {/* Shared Container for Sticky Nav + Products Grid */}
      <div className="relative">
        {/* Sticky Category Overview Bar */}
        {categories.length > 0 && (
          <nav aria-label="Filter products" className="sticky top-[80px] z-40 border-y border-corematrix-border bg-corematrix-bg0/95 backdrop-blur-xl py-4 shadow-2xl transition-all">
            <div className="container mx-auto px-4 max-w-7xl relative">

              {/* Left Arrow Button */}
              {showLeftArrow && (
                <div className="lg:hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-corematrix-bg0 via-corematrix-bg0/70 to-transparent pointer-events-none z-10" />
                  <button
                    type="button"
                    onClick={() => scrollNav('left')}
                    className="absolute left-1 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-corematrix-border bg-corematrix-card text-corematrix-textPrimary shadow-lg transition-all hover:bg-corematrix-border/50 focus-visible:outline-none"
                    aria-label={isAr ? 'التمرير لليمين' : 'Scroll left'}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Scrollable Category Nav Tabs */}
              <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex items-center justify-start lg:justify-center gap-3 overflow-x-auto scrollbar-none py-1 scroll-smooth"
              >
                <button
                  type="button"
                  onClick={() => scrollToCategory('all')}
                  className={`cursor-pointer shrink-0 rounded-full border px-5 py-2.5 text-xs font-bold transition-all ${
                    activeCategory === 'all'
                      ? 'border-corematrix-green400/40 bg-corematrix-green900/40 text-corematrix-green400 shadow-[0_0_15px_rgba(16,185,129,0.25)] scale-[1.03]'
                      : 'border-corematrix-border bg-corematrix-bg0/80 text-corematrix-textMuted hover:border-corematrix-green700/50 hover:text-white'
                  }`}
                >
                  {t('All Products', 'جميع المنتجات')} ({products.length})
                </button>

                {activeCategoriesList.map((cat, idx) => {
                  const catIdStr = cat.id.toString();
                  const isActive = activeCategory === catIdStr;
                  const theme = FILTER_THEMES[idx % FILTER_THEMES.length];
                  const catName = isAr && cat.nameAr ? cat.nameAr : cat.name;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => scrollToCategory(catIdStr)}
                      className={`cursor-pointer shrink-0 rounded-full border px-5 py-2.5 text-xs font-bold transition-all ${
                        isActive ? theme.active : theme.inactive
                      }`}
                    >
                      {cat.icon && <i className={`${cat.icon} ${isAr ? 'ml-2' : 'mr-2'}`} />}
                      {catName}
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
                    onClick={() => scrollNav('right')}
                    className="absolute right-1 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-corematrix-border bg-corematrix-card text-corematrix-textPrimary shadow-lg transition-all hover:bg-corematrix-border/50 focus-visible:outline-none"
                    aria-label={isAr ? 'التمرير لليسار' : 'Scroll right'}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

            </div>
          </nav>
        )}

        {/* Products Grid Sections Grouped by Category */}
        <section id="all-products" className="py-20">
          <div className="container mx-auto px-4 max-w-7xl space-y-20">
            {products.length === 0 ? (
              <div className="text-center py-20 bg-corematrix-bg1 border border-corematrix-border rounded-3xl p-12">
                <i className="fas fa-box-open text-5xl text-corematrix-textMuted mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{t('No Products Available', 'لا توجد منتجات متاحة حالياً')}</h3>
                <p className="text-corematrix-textMuted text-sm">{t('Check back soon for new enterprise platforms.', 'عد قريباً للاطلاع على المنصات الجديدة.')}</p>
              </div>
            ) : (
              categoryKeys.map((catKey) => {
                const group = productsByCategory[catKey];
                const catObj = group.category;
                const catName = isAr && catObj?.nameAr ? catObj.nameAr : (catObj?.name || t('Featured Software Solutions', 'حلول البرمجيات المميزة'));
                const catIcon = catObj?.icon || 'fas fa-layer-group';

                return (
                  <div key={catKey} id={`cat-${catKey}`} className="space-y-8 scroll-mt-[195px]">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 border-b border-corematrix-border/50 pb-4">
                      <div className="w-10 h-10 rounded-2xl bg-corematrix-green900/30 border border-corematrix-green700/40 flex items-center justify-center text-corematrix-green400">
                        <i className={catIcon} />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                        {catName}
                      </h2>
                    </div>

                    {/* Product Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {group.products.map((product, idx) => {
                        const prodTitle = isAr && product.titleAr ? product.titleAr : product.title;
                        const prodDesc = isAr && (product.shortDescriptionAr || product.heroDescriptionAr)
                          ? (product.shortDescriptionAr || product.heroDescriptionAr)
                          : (product.shortDescription || product.heroDescription || t('Explore enterprise capabilities and feature sets.', 'استكشف إمكانيات وميزات المؤسسات.'));
                        const theme = CARD_THEMES[idx % CARD_THEMES.length];

                        return (
                          <div
                            key={product.id}
                            className={`group relative ${theme.cardBg} border ${theme.cardBorder} rounded-3xl p-8 shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${theme.hoverBorder} ${theme.glow}`}
                          >
                            <div>
                              {/* Card Icon & Header */}
                              <div className="flex items-center justify-between mb-6">
                                <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} ${theme.iconColor} flex items-center justify-center text-2xl shadow-lg transition-transform group-hover:scale-110`}>
                                  {product.heroIcon ? (
                                    <img src={getMediaUrl(product.heroIcon)} alt={prodTitle} className="w-8 h-8 object-contain" />
                                  ) : (
                                    <i className={product.cardIcon || 'fas fa-cube'} />
                                  )}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${theme.badgeBg} border`}>
                                  {t('Product', 'منتج')}
                                </span>
                              </div>

                              <h3 className={`text-xl font-bold text-white mb-3 ${theme.hoverTitle} transition-colors`}>
                                {prodTitle}
                              </h3>

                              <p className="text-corematrix-textMuted text-xs leading-relaxed line-clamp-3 mb-6">
                                {prodDesc}
                              </p>
                            </div>

                            <div className="pt-6 border-t border-corematrix-border/50 flex items-center justify-between">
                              <span className={`text-xs font-semibold ${theme.iconColor} group-hover:translate-x-1 transition-transform flex items-center gap-2`}>
                                {t('View Platform Details', 'عرض تفاصيل المنصة')} <i className={`fas ${isAr ? 'fa-arrow-left' : 'fa-arrow-right'} text-[10px]`} />
                              </span>
                              <Link
                                href={`/products/${product.slug}`}
                                className="absolute inset-0 z-10"
                                aria-label={`View ${prodTitle}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-t from-corematrix-bg1 to-corematrix-bg0 border-t border-corematrix-border/50 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            {t('Need a Customized Enterprise Solution?', 'هل تحتاج إلى حل مخصص لمؤسستك؟')}
          </h2>
          <p className="text-corematrix-textMuted text-base mb-8 max-w-2xl mx-auto">
            {t(
              'Our solution architects can tailor our software suites to fit your unique organization infrastructure and workflows.',
              'يمكن لمهندسي الحلول لدينا تخصيص أجنحة البرمجيات لتناسب البنية التحتية وسير العمل في مؤسستك.'
            )}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-corematrix-green700 to-emerald-600 hover:from-corematrix-green600 hover:to-emerald-500 text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-xl shadow-corematrix-green900/20 transition-all active:scale-95 cursor-pointer"
          >
            <i className="fas fa-paper-plane" /> {t('Talk to Solution Experts', 'تحدث مع خبراء الحلول')}
          </Link>
        </div>
      </section>
    </main>
  );
}
