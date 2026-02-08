import type { ReactNode } from 'react';

export interface FormCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable Form Card container component matching pixel-perfect design.
 *
 * Features:
 * - Glass-style dark background (#142819 with gradient)
 * - Subtle light green glow border (#149253)
 * - Rounded corners
 * - Generous internal padding
 */
export function FormCard({ children, className = '' }: FormCardProps) {
  return (
    <div
      className={`rounded-2xl border border-[#149253]/20 bg-gradient-to-br from-[#142819] via-[#142819] to-[#0A150D] p-8 shadow-[0_0_30px_rgba(20,146,83,0.08)] backdrop-blur-sm sm:p-10 ${className}`}
    >
      {children}
    </div>
  );
}
