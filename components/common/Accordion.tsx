'use client';

import { useRef, useState, useEffect } from 'react';

export interface AccordionItem {
  id: string | number;
  title: string;
  content: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <AccordionRow
          key={item.id}
          item={item}
          isOpen={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
        />
      ))}
    </div>
  );
}
export function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxH, setMaxH] = useState<string>('0px');

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (isOpen) {
      // set to scrollHeight to animate open
      setMaxH(`${el.scrollHeight}px`);
      // after transition, remove max-height to allow dynamic content
      const t = setTimeout(() => setMaxH('none'), 300);
      return () => clearTimeout(t);
    } else {
      // when closing, set maxHeight back to scrollHeight then to 0 to animate
      setMaxH(`${el.scrollHeight}px`);
      // next tick set to 0
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setMaxH('0px'));
      });
    }
  }, [isOpen]);

  return (
    <div
      className="accordion-row"
      style={{
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#026834',
        background: '#010E07',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-4 py-3"
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          fontSize: 19,
          lineHeight: '178%',
          color: '#ffffff',
          background: 'transparent',
          border: 'none',
          textAlign: 'left',
          width: '100%',
        }}
      >
        <span>{item.title}</span>
        <ChevronIcon open={isOpen} />
      </button>

      <div
        ref={contentRef}
        className="accordion-content"
        style={{
          maxHeight: maxH,
          transition: 'max-height 300ms ease',
          padding: isOpen ? '12px 16px' : '0px 16px',
        }}
        aria-hidden={!isOpen}
      >
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            fontSize: 17,
            lineHeight: '178%',
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          {item.content}
        </div>
      </div>
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      style={{ color: '#A7F3D0' }}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

