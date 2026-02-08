import type { ReactNode } from 'react';

export interface HomeGradientWrapperProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
}

/**
 * Wrapper that applies a single vertical gradient background to its children.
 * Use to wrap contiguous page sections so the gradient appears continuous.
 */
export function HomeGradientWrapper({ children, className = '', gradient }: HomeGradientWrapperProps) {
  // Default gradient used across marketing pages. Pages can override when needed.
  const bg = gradient ?? 'linear-gradient(to bottom, #010101, #012112)';
  return (
    <div
      className={`w-full ${className}`}
      style={{
        background: bg,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {children}
    </div>
  );
}

