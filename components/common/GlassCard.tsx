import type { ReactNode } from 'react';

export function GlassCard({
  children,
  className = '',
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`glass-card ${className}`} style={style}>
      {children}
    </div>
  );
}

