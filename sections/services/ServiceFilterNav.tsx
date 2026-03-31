'use client';

import { Container } from '@/components/ui/Container';
import { useFilterDispatch } from '@/hooks/usePortalFilter';

const FILTERS = [
  { id: 'all' as const, label: 'All Services' },
  { id: 'ai' as const, label: 'AI & Automation' },
  { id: 'web' as const, label: 'Web & Mobile' },
  { id: 'saas' as const, label: 'SaaS & Cloud' },
  { id: 'teams' as const, label: 'Dedicated Teams' },
] as const;

export type FilterId = (typeof FILTERS)[number]['id'];

export function ServiceFilterNav() {
  const { active: activeFilter, dispatch } = useFilterDispatch('serviceFilter');

  return (
    <nav
      aria-label="Filter services"
      className="sticky top-[68px] z-50 border-y border-corematrix-border bg-corematrix-bg0 py-6"
    >
      <Container className="flex flex-wrap items-center gap-3">
        <span className="mr-2 font-display text-[0.68rem] font-bold uppercase tracking-[0.12em] text-corematrix-textDim">
          FILTER BY:
        </span>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => dispatch(f.id)}
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
