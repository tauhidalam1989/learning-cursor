import type { ReactNode } from 'react';
import { GlassCard } from '@/components/common/GlassCard';

export interface ServiceCardProps {
  /** Icon component to display in the circular badge */
  icon: ReactNode;
  /** Service title */
  title: string;
  /** Service description */
  description: string;
}

/**
 * Reusable ServiceCard component matching the pixel-perfect design.
 *
 * Features:
 * - Dark glass-style gradient background with subtle transparency
 * - Soft neon green border glow effect
 * - Circular icon badge with white background and dark border
 * - Centered content alignment
 * - Subtle hover elevation effect
 */
export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <article className="relative h-full">
      {/* Icon Badge - placed outside the card body so it won't be clipped */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white">
          {/* green outer ring */}
          <span className="absolute -inset-1 rounded-full border-4 border-[#149253] opacity-95" />
          <div className="relative h-12 w-12 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>

      <GlassCard className="h-full transition-all hover:shadow-[0_18px_60px_rgba(2,10,6,0.6)]" style={{ paddingTop: 64 }}>
        <div className="flex h-full flex-col items-center justify-center text-center">
          <h3
            className="mb-3 text-center text-white"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 24,
              lineHeight: '106%',
            }}
          >
            {title}
          </h3>

          <p
            className="text-center text-white/80"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: 14,
              lineHeight: '156%',
              maxWidth: '20rem',
            }}
          >
            {description}
          </p>
        </div>
      </GlassCard>
    </article>
  );
}
