import { Navbar, Footer } from '@/components/common';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

/**
 * Shared layout for all marketing pages: banner (navbar), main, contentinfo (footer).
 * Uses semantic landmarks so assistive tech can jump by region.
 * Skip link target id="main-content" is required for accessibility.
 */
export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" role="document">
      <Navbar />
      <main
        id="main-content"
        className="flex-1 bg-corematrix-bg0"
        role="main"
        tabIndex={-1}
        aria-label="Main content"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
