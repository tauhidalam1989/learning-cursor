import type { ReactNode } from 'react';

export interface FeatureItemProps {
  /** Icon component to display in the circular badge */
  icon: ReactNode;
  /** Feature description text */
  text: string;
  /** Whether this item is highlighted/active */
  highlighted?: boolean;
}

/**
 * Reusable FeatureItem component matching the pixel-perfect design.
 *
 * Features:
 * - Circular icon badge with white border
 * - Text aligned horizontally with icon
 * - Highlighted state with darker background and green border glow
 * - Subtle hover interaction
 * - Equal vertical spacing
 */
export function FeatureItem({ icon, text, highlighted = false }: FeatureItemProps) {
  return (
    <li
      className={`flex items-start gap-4 rounded-lg p-4 transition-all ${
        highlighted
          ? 'bg-[#1A2A20]/80 border border-[#5BE23D]/30 shadow-[0_0_15px_rgba(91,226,61,0.15)]'
          : 'bg-transparent border border-transparent hover:bg-[#1A2A20]/30'
      }`}
    >
      {/* Circular Icon Badge - White border, white/light gray icon */}
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white/90 bg-transparent">
        <div className="flex h-6 w-6 items-center justify-center text-white/90">
          {icon}
        </div>
      </div>

      {/* Text Description - White/light gray, aligned with icon */}
      <p className="flex-1 text-base leading-relaxed text-[#E0E0E0] sm:text-lg">
        {text}
      </p>
    </li>
  );
}
