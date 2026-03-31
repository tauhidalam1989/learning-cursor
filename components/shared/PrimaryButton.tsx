import Link from 'next/link';

interface PrimaryButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  external?: boolean;
}

export default function PrimaryButton({
  href,
  onClick,
  children,
  className,
  type = 'button',
  disabled,
  external,
}: PrimaryButtonProps) {
  const base = `inline-flex items-center gap-2 bg-corematrix-green700 text-white 
    px-6 py-3 rounded-lg text-sm font-semibold border border-corematrix-green500 
    transition-all duration-250 hover:bg-corematrix-green500 
    hover:shadow-[0_0_28px_rgba(34,197,94,0.3)] hover:-translate-y-px 
    disabled:opacity-60 disabled:cursor-not-allowed ${className ?? ''}`;

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
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={base}
    >
      {children}
    </button>
  );
}
