import Link from 'next/link';

interface GhostButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  external?: boolean;
}

export default function GhostButton({
  href,
  onClick,
  children,
  className,
  type = 'button',
  external,
}: GhostButtonProps) {
  const base = `inline-flex items-center gap-2 bg-transparent 
    text-corematrix-textSecondary px-6 py-3 rounded-lg text-sm font-medium 
    border border-corematrix-border2 transition-all duration-250 
    hover:border-corematrix-green700 hover:text-corematrix-textPrimary 
    hover:bg-corematrix-green700/[0.07] ${className ?? ''}`;

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        {children}
      </a>
    ) : (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={base}>
      {children}
    </button>
  );
}
