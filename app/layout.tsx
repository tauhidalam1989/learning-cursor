import type { Metadata } from 'next';
import { Poppins, Rajdhani } from 'next/font/google';
import '@/styles/globals.css';
import { defaultMetadata } from '@/lib/seo';
import ScrollRevealInit from '@/components/common/ScrollRevealInit';

/* -----------------------------------------------------------------------------
 * Fonts (next/font optimizes loading and reduces layout shift)
 * ----------------------------------------------------------------------------- */

const fontSans = Poppins({
  subsets: ['latin'],
  weight: ['300', '600'],
  display: 'swap',
  variable: '--font-sans',
});

const fontDisplay = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  variable: '--font-display',
});

/* -----------------------------------------------------------------------------
 * Global metadata for SEO (inherited by all routes; override per page)
 * ----------------------------------------------------------------------------- */

export const metadata: Metadata = defaultMetadata;

/* -----------------------------------------------------------------------------
 * Root layout: semantic HTML, skip link, and global chrome
 * ----------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable}`}
      dir="ltr"
    >
      <body className="min-h-screen font-sans">
        {/* Skip link: first focusable element for keyboard/screen reader users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollRevealInit />
        {children}
      </body>
    </html>
  );
}
