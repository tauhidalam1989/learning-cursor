import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import FaqAccordion from '@/components/shared/FaqAccordion';
import SectionHeading from '@/components/shared/SectionHeading';
import SectionLabel from '@/components/shared/SectionLabel';
import type { FaqItem } from '@/types/shared';

export const FAQ_SECTION_DEFAULT =
  'border-t border-corematrix-border bg-corematrix-bg0 py-24' as const;

export const FAQ_GRID_DEFAULT =
  'grid grid-cols-1 items-start gap-20 lg:grid-cols-[1fr_1.8fr]' as const;

/** Home FAQ uses a slightly tighter grid on large screens. */
export const FAQ_GRID_HOME =
  'grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:items-start lg:gap-20' as const;

type TwoColumnFaqSectionProps = {
  sectionId: string;
  headingId: string;
  title: string;
  description: string;
  items: readonly FaqItem[] | FaqItem[];
  cta: ReactNode;
  /** Full section `className` (background, padding, border). */
  sectionClassName?: string;
  /** Grid layout between intro column and accordion. */
  gridClassName?: string;
  /** Uppercase label above the title; default `FAQ`. */
  label?: string;
  faqVariant?: 'default' | 'compact';
};

/**
 * Shared two-column FAQ layout used across marketing pages (services, about, contact, careers, home).
 * Matches typography and spacing to Services/About FAQ sections.
 */
export function TwoColumnFaqSection({
  sectionId,
  headingId,
  title,
  description,
  items,
  cta,
  sectionClassName = FAQ_SECTION_DEFAULT,
  gridClassName = FAQ_GRID_DEFAULT,
  label = 'FAQ',
  faqVariant = 'default',
}: TwoColumnFaqSectionProps) {
  return (
    <section id={sectionId} aria-labelledby={headingId} className={sectionClassName}>
      <Container>
        <div className={gridClassName}>
          <div className="reveal">
            <SectionLabel>{label}</SectionLabel>
            <SectionHeading id={headingId}>{title}</SectionHeading>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              {description}
            </p>
            <div className="mt-6">{cta}</div>
          </div>
          <div className="reveal reveal-delay-2">
            <FaqAccordion items={items} variant={faqVariant} />
          </div>
        </div>
      </Container>
    </section>
  );
}
