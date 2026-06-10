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

import { LanguageProvider } from '@/context/LanguageContext';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalOrgSchema = organizationJsonLd();
  const globalWebsiteSchema = websiteJsonLd();

  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable}`}
      dir="ltr"
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Global Organization and WebSite SEO Schema Markup */}
        <JsonLd schema={globalOrgSchema} />
        <JsonLd schema={globalWebsiteSchema} />
      </head>
      <body className="min-h-screen font-sans">
        <LanguageProvider>
          {/* Skip link: first focusable element for keyboard/screen reader users */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <ScrollRevealInit />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
