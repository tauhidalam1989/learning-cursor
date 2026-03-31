'use client';

import { FILTER_OPTIONS } from '@/data/portfolioData';
import { useFilterDispatch } from '@/hooks/usePortalFilter';

export function PortfolioFilterNav() {
  const { active, dispatch } = useFilterDispatch('portfolioFilter');

  return (
    <section
      id="projects"
      aria-label="Filter portfolio projects"
      className="sticky top-[68px] z-50 border-y border-corematrix-border bg-corematrix-bg0 py-5"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 sm:px-6 lg:px-8">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => dispatch(opt.id)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
              active === opt.id
                ? 'border-corematrix-green400/30 bg-corematrix-green900/20 font-semibold text-corematrix-green400'
                : 'border-corematrix-border bg-corematrix-card text-corematrix-textMuted hover:text-corematrix-textPrimary'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </section>
  );
}
