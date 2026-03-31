import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function BreadcrumbNav({
  items,
  className,
}: BreadcrumbNavProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-[0.75rem] 
        text-corematrix-textDim font-medium mb-6 ${className ?? ''}`}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && (
            <span className="text-corematrix-textDim" aria-hidden>
              ›
            </span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-corematrix-green400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-corematrix-green400">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
