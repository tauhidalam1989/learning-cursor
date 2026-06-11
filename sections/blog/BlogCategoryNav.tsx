'use client';

import { useState, useEffect } from 'react';
import { getAllDbPosts } from '@/lib/blog';
import { useLanguage } from '@/context/LanguageContext';

export function BlogCategoryNav() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [categories, setCategories] = useState<{ id: string; label: string; count: number }[]>([]);

  useEffect(() => {
    async function calculateCounts() {
      const posts = await getAllDbPosts(language);
      
      const uniqueCategories = new Set<string>();
      const categoryMap = new Map<string, string>();
      
      posts.forEach(post => {
        if (post.category) {
          uniqueCategories.add(post.category);
          if (post.categoryLabel) {
            categoryMap.set(post.category, post.categoryLabel);
          }
        }
      });

      const list = Array.from(uniqueCategories).map(catId => {
        const count = posts.filter(p => p.category === catId).length;
        return {
          id: catId,
          label: categoryMap.get(catId) || catId.toUpperCase(),
          count
        };
      });

      const allLabel = language === 'ar' ? 'كل المقالات' : 'All Posts';
      const computed = [
        { id: 'all', label: allLabel, count: posts.length },
        ...list
      ];
      
      setCategories(computed);
    }
    calculateCounts();
  }, [language]);

  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<string>;
      if (ev.detail) {
        setActiveCategory(ev.detail);
        window.dispatchEvent(new CustomEvent('blogCategoryChange', { detail: ev.detail }));
      }
    };
    window.addEventListener('blogFilter', handler);
    return () => window.removeEventListener('blogFilter', handler);
  }, []);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    window.dispatchEvent(new CustomEvent('blogCategoryChange', { detail: id }));
  };

  return (
    <nav
      role="tablist"
      aria-label="Blog categories"
      className="sticky top-[68px] z-40 border-b border-corematrix-border bg-corematrix-bg0"
    >
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              onClick={() => handleCategoryClick(c.id)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-5 py-4 text-sm font-semibold transition-all ${
                activeCategory === c.id
                  ? 'border-corematrix-green400 text-corematrix-green400'
                  : 'cursor-pointer border-transparent text-corematrix-textMuted hover:text-corematrix-textPrimary'
              }`}
            >
              {c.label}
              <span
                className={`rounded-full px-2 py-0.5 text-[0.6rem] font-bold ${
                  activeCategory === c.id
                    ? 'border border-corematrix-green400/20 bg-corematrix-green900/20 text-corematrix-green400'
                    : 'border border-corematrix-border bg-corematrix-card2 text-corematrix-textDim'
                }`}
              >
                {c.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
