import Link from 'next/link';
import Image from 'next/image';

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
] as const;

export function NotFoundMiniFooter() {
  return (
    <footer
      className="border-t border-corematrix-border bg-corematrix-bg0 px-[6vw] py-8"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-corematrix-border pb-5 mb-5">
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/images/logo.svg"
              alt="Corematrix logo"
              width={120}
              height={28}
              className="h-7 w-auto"
            />
          </Link>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {FOOTER_LINKS.map((link, i) => (
                <li key={link.href} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    className="text-sm text-corematrix-textDim transition-colors hover:text-corematrix-green400"
                  >
                    {link.label}
                  </Link>
                  {i < FOOTER_LINKS.length - 1 && (
                    <span className="text-corematrix-textDim" aria-hidden>
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-2 text-xs text-corematrix-textDim">
          <span>© 2026 Corematrix. All rights reserved.</span>
          <span className="flex gap-4">
            <Link href="/privacy" className="hover:text-corematrix-green400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-corematrix-green400 transition-colors">
              Terms of Service
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
