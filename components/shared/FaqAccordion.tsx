'use client';

import { useState } from 'react';
import type { FaqItem } from '@/types/shared';

export type { FaqItem };

interface FaqAccordionProps {
  items: readonly FaqItem[] | FaqItem[];
  /** 'default' = max-h-64 + green when open, 'compact' = max-h-48, no color change when open */
  variant?: 'default' | 'compact';
  /** Wrapper div class, e.g. "overflow-hidden rounded-2xl border border-corematrix-border" or empty for plain */
  wrapperClassName?: string;
}

export default function FaqAccordion({
  items,
  variant = 'default',
  wrapperClassName = '',
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const maxH = variant === 'compact' ? 'max-h-48' : 'max-h-64';
  const hoverBg = variant === 'compact' ? 'hover:bg-corematrix-green900/10' : 'hover:bg-corematrix-green900/[0.04]';
  const useActiveColor = variant !== 'compact';
  const iconColor = variant === 'compact' ? 'text-corematrix-green400' : 'text-corematrix-textDim';

  return (
    <div className={wrapperClassName || undefined}>
      {items.map((item, i) => (
        <div
          key={i}
          className="border-b border-corematrix-border last:border-0"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            className={`flex w-full items-center justify-between px-6 py-5 text-left text-sm font-medium transition-colors ${hoverBg} ${
              useActiveColor && openIndex === i ? 'text-corematrix-green400' : 'text-corematrix-textPrimary'
            }`}
          >
            <span>{item.q}</span>
            <svg
              className={`ml-4 h-5 w-5 shrink-0 ${iconColor} transition-transform duration-300 ${
                openIndex === i ? 'rotate-180' : ''
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? maxH : 'max-h-0'
            }`}
          >
            <p className="px-6 pb-5 pt-0 text-sm leading-relaxed text-corematrix-textSecondary">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
