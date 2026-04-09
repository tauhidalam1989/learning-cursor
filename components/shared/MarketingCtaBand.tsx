import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import SectionLabel from '@/components/shared/SectionLabel';

const GLOW_LG =
  'pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.08] blur-[140px]';
const GLOW_SM =
  'pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.08] blur-[120px]';
const GLOW_ADOBE =
  'pointer-events-none absolute top-1/2 left-1/2 h-[480px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.07] blur-[120px]';

export type MarketingCtaGlow = 'lg' | 'sm' | 'adobe' | 'inset';

export type MarketingCtaBandProps = {
  id?: string;
  headingId: string;
  sectionClassName: string;
  glow?: MarketingCtaGlow;
  label: ReactNode;
  title: ReactNode;
  titleClassName: string;
  /** Full paragraph(s) with spacing classes (e.g. `mx-auto mb-8 max-w-[600px] …`). */
  description: ReactNode;
  actionsWrapperClassName?: string;
  children: ReactNode;
};

/**
 * Full-width marketing CTA band (glow, centered copy, action row).
 * Reused across About, Services, Blog, Contact, Careers, Portfolio, home, service landings, Adobe page.
 */
export function MarketingCtaBand({
  id,
  headingId,
  sectionClassName,
  glow = 'lg',
  label,
  title,
  titleClassName,
  description,
  actionsWrapperClassName = 'mt-10 flex flex-wrap items-center justify-center gap-4',
  children,
}: MarketingCtaBandProps) {
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative overflow-hidden border-t border-corematrix-border py-28 ${sectionClassName}`}
    >
      {glow === 'inset' ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <div className="h-[400px] w-[800px] rounded-full bg-corematrix-green700 opacity-[0.07] blur-[120px]" />
        </div>
      ) : (
        <div
          className={
            glow === 'lg'
              ? GLOW_LG
              : glow === 'sm'
                ? GLOW_SM
                : GLOW_ADOBE
          }
          aria-hidden
        />
      )}

      <Container>
        <div className="relative z-10 text-center">
          {typeof label === 'string' ? <SectionLabel>{label}</SectionLabel> : label}
          <h2 id={headingId} className={titleClassName}>
            {title}
          </h2>
          {description}
          <div className={actionsWrapperClassName}>{children}</div>
        </div>
      </Container>
    </section>
  );
}
