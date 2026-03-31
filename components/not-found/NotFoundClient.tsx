'use client';

import Link from 'next/link';
import Image from 'next/image';
import { NotFoundHero } from './NotFoundHero';
import { ExploreSection } from './ExploreSection';
import { QuickSearchSection } from './QuickSearchSection';
import { MiniBlogSection } from './MiniBlogSection';
import { ContactNudge } from './ContactNudge';
import { NotFoundMiniFooter } from './NotFoundMiniFooter';

export default function NotFoundClient() {
  return (
    <div className="flex min-h-screen flex-col bg-corematrix-bg0">
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-[68px] items-center justify-between border-b border-corematrix-border/40 bg-corematrix-bg0/85 px-8 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Go to homepage">
          <Image
            src="/images/logo.png"
            alt="Corematrix logo"
            width={140}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-corematrix-textMuted transition-colors hover:text-corematrix-textPrimary"
        >
          ← Back to Home
        </Link>
      </nav>

      <main id="main-content" className="flex flex-1 flex-col" role="main">
        <NotFoundHero />
        <ExploreSection />
        <QuickSearchSection />
        <MiniBlogSection />
        <ContactNudge />
      </main>

      <NotFoundMiniFooter />
    </div>
  );
}
