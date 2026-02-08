export function SectionHeader({
  label,
  title,
  description,
  id,
  align = 'center',
}: {
  label?: string;
  title: string;
  description?: string;
  id?: string;
  align?: 'center' | 'left';
}) {
  const containerClass = align === 'left' ? 'text-left' : 'text-center';
  const descClass = align === 'left' ? '' : 'mx-auto';

  return (
    <div className={containerClass} id={id}>
      {label && (
        <p
          className="section-label"
          style={{
            fontSize: 23,
            lineHeight: '106%',
            color: '#149253',
          }}
        >
          {label}
        </p>
      )}
      <h2
        className={`section-heading mt-3 ${align === 'left' ? '' : ''}`}
        style={{
          fontSize: 39,
          lineHeight: '106%',
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`${descClass} mt-4`}
          style={{
            fontSize: 17,
            lineHeight: '178%',
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            color: '#FFFFFF',
            maxWidth: 680,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

