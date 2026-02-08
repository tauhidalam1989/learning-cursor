import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export interface PageBannerProps {
  /** Main page title (e.g. "About Us", "Service", "Blog", "Contact Us") */
  title: string;
  /** Breadcrumb items for navigation (e.g. ["HOME", "ABOUT US"]) */
  breadcrumbs: { label: string; href?: string }[];
}

/**
 * Reusable page banner section with dynamic title and breadcrumbs.
 * Dark theme matching site design. Used on About, Service, Blog, Contact pages.
 */
export function PageBanner({ title, breadcrumbs }: PageBannerProps) {
  return (
    <section
      id="page-banner"
      aria-labelledby="page-banner-heading"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{ background: 'linear-gradient(180deg, #010101 0%, #012112 100%)' }}
    >
      <div
        className="absolute inset-0 bg-[#149253] opacity-5 blur-3xl"
        aria-hidden="true"
      />
      <Container>
        <div className="relative z-10 text-center">
          <h1
            id="page-banner-heading"
            className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {title}
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-4 flex items-center justify-center gap-2 text-sm text-white/70 sm:text-base"
          >
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-[#149253]" aria-hidden="true">
                    |
                  </span>
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[#149253]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#149253]">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </Container>
    </section>
  );
}
