import SectionHeading from '@/components/shared/SectionHeading';
import SectionLabel from '@/components/shared/SectionLabel';

type MarketingSectionHeaderProps = {
  label: string;
  title: string;
  titleId: string;
  description?: string;
  align?: 'center' | 'left';
  /** Max width for description; `none` for full-width columns (e.g. grid layouts). */
  descriptionMax?: '640' | '680' | 'none';
  className?: string;
};

/**
 * Standard section eyebrow + H2 + optional description (centered or left).
 * Prefer this over repeating `section-label` + `section-heading` markup.
 */
export function MarketingSectionHeader({
  label,
  title,
  titleId,
  description,
  align = 'center',
  descriptionMax = '680',
  className = '',
}: MarketingSectionHeaderProps) {
  const wrap = align === 'center' ? 'text-center' : '';
  const maxClass =
    descriptionMax === 'none'
      ? ''
      : descriptionMax === '640'
        ? 'max-w-[640px]'
        : 'max-w-[680px]';
  const descClass = [
    align === 'center' && maxClass ? 'mx-auto' : null,
    'mt-4',
    maxClass || null,
    'text-base leading-relaxed text-corematrix-textSecondary',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${wrap} ${className}`.trim()}>
      <SectionLabel>{label}</SectionLabel>
      <SectionHeading id={titleId}>{title}</SectionHeading>
      {description ? <p className={descClass}>{description}</p> : null}
    </div>
  );
}
