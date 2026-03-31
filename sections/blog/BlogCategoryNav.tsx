'use client';

import { useState, useEffect } from 'react';
import { BLOG_CATEGORIES } from '@/data/blogData';

export function BlogCategoryNav() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

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
      className="sticky top-[68px] z-50 border-b border-corematrix-border bg-corematrix-bg0"
    >
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max">
          {BLOG_CATEGORIES.map((c) => (
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
