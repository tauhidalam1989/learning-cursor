import type { ElementType, ReactNode } from 'react';

type ContainerSize = 'default' | 'narrow' | 'wide' | 'full';

const sizeClasses: Record<ContainerSize, string> = {
  default: 'max-w-7xl',
  narrow: 'max-w-3xl',
  wide: 'max-w-[90rem]',
  full: 'max-w-none',
};

interface ContainerProps {
  children: ReactNode;
  /** Semantic element: 'div' | 'section' | 'article' | 'aside' */
  as?: ElementType;
  /** Constrains content width for readability; 'full' removes max-width. */
  size?: ContainerSize;
  /** Optional spacing (padding) around content. */
  className?: string;
  /** ID for anchor links and skip target; useful for section landmarks. */
  id?: string;
}

/**
 * Reusable layout container: consistent max-width and horizontal padding.
 * Use `as="section"` or `as="article"` for semantic sections without extra wrappers.
 * Size variants: narrow (prose), default (7xl), wide, full.
 */
export function Container({
  children,
  as: Component = 'div',
  size = 'default',
  className = '',
  id,
}: ContainerProps) {
  const layoutClass = `mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`.trim();

  return (
    <Component id={id} className={layoutClass}>
      {children}
    </Component>
  );
}
