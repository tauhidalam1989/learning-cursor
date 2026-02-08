import React from 'react';
import { Container } from '@/components/ui/Container';

export interface ProcessItem {
  number: string;
  title: string;
}

const DEFAULT_ITEMS: ProcessItem[] = [
  { number: '01', title: 'Requirement & Business Analysis' },
  { number: '02', title: 'Solution Architecture' },
  { number: '03', title: 'Design & Development' },
  { number: '04', title: 'Testing & Deployment' },
  { number: '05', title: 'Ongoing Support & Scaling' },
];

/**
 * ProcessSection
 *
 * Reusable, responsive 5-column "process"/steps section that matches the
 * provided design: large faint background numbers with foreground titles.
 *
 * Styling uses Tailwind utility classes only (no inline styles).
 */
export function ProcessSection({ items = DEFAULT_ITEMS }: { items?: ProcessItem[] }) {
  return (
    <section
      aria-labelledby="process-heading"
      className="py-[120px] bg-gradient-to-b from-[#02120a] via-[#03150f] to-[#063327] overflow-hidden"
    >
      <Container>
        <div className="max-w-7xl mx-auto">
          <h2 id="process-heading" className="sr-only">
            Our process
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {items.map((it, idx) => (
              <article
                key={it.number}
                className="relative group min-h-[120px] flex items-center"
                aria-labelledby={`process-${it.number}`}
              >
                {/* Large faint number (behind text) - visible on large screens */}
                <span
                  className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 text-[140px] leading-none font-extralight text-[#149253] opacity-10 select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {it.number}
                </span>

                {/* Small number visible on mobile/tablet */}
                <span className="lg:hidden inline-block text-4xl font-extralight text-[#149253] opacity-20 mr-4">
                  {it.number}
                </span>

                {/* Title */}
                <h3
                  id={`process-${it.number}`}
                  className="relative z-10 text-white font-medium text-[18px] sm:text-[20px] md:text-[22px] leading-tight transition-all duration-300 group-hover:drop-shadow-[0_10px_30px_rgba(20,146,83,0.12)]"
                >
                  {it.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

