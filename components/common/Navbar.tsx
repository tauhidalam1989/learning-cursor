'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks, navCta } from './nav-config';
import { ServicesNavItemDesktop, ServicesNavItemMobile } from './ServicesNavItem';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Reusable Navbar: logo, nav links, CTA. Responsive with accessible mobile menu.
 * Uses semantic <header> and <nav>; mobile menu is controlled via aria-expanded and aria-hidden.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() || '/';
  const { t, language, setLanguage } = useLanguage();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeMenu]);

  return (
    <header
      className="sticky top-0 z-50 bg-gradient-to-r from-[#031211] via-[#041f18] to-[#02140f] shadow-sm"
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" aria-label={t('Go to homepage', 'الذهاب إلى الصفحة الرئيسية')} className="flex items-center">
              <Image src="/images/logo.svg" alt={t('Corematrix logo', 'شعار كورماتريكس')} width={180} height={40} priority />
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex lg:items-center lg:gap-10" aria-label={t('Main navigation', 'القائمة الرئيسية')}>
            <ul className="flex items-center gap-6" role="list">
              {navLinks.map(({ label, href }) => {
                if (href === '/services') {
                  return (
                    <li key={href}>
                      <ServicesNavItemDesktop />
                    </li>
                  );
                }
                const isActive =
                  pathname === href || (href !== '/' && pathname.startsWith(href));
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={
                        `inline-flex items-center gap-2 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] ` +
                        (isActive
                          ? 'text-[#149253] border-b-2 border-[#149253]'
                          : 'text-white/80 hover:text-[#149253]')
                      }
                    >
                      {t(label)}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA */}
            <div>
              <Link
                href={navCta.href}
                className="ml-6 inline-flex items-center justify-center rounded-md border-2 border-[#149253] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#149253] hover:shadow-[0_0_15px_rgba(20,146,83,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#149253] focus-visible:ring-offset-2"
              >
                {t(navCta.label)}
              </Link>
            </div>

            {/* Language Switcher Pill */}
            <div className="ml-6 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-sm shadow-md">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${language === 'en'
                    ? 'bg-[#149253] text-white shadow-sm'
                    : 'text-white/60 hover:text-white'
                  }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider transition-all cursor-pointer ${language === 'ar'
                    ? 'bg-[#149253] text-white shadow-sm'
                    : 'text-white/60 hover:text-white'
                  }`}
              >
                عربي
              </button>
            </div>
          </nav>

          {/* Mobile area */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href={navCta.href}
              className="rounded-md border border-[#149253] px-3 py-2 text-sm font-medium text-white hover:bg-[#149253]/8"
            >
              {t(navCta.label)}
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/90 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#149253] focus-visible:ring-offset-2"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={menuOpen ? t('Close menu', 'إغلاق القائمة') : t('Open menu', 'فتح القائمة')}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="sr-only">{menuOpen ? t('Close menu', 'إغلاق القائمة') : t('Open menu', 'فتح القائمة')}</span>
              {menuOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu panel (Slide-out Drawer) */}
      <div
        id="mobile-nav-menu"
        className={`fixed top-0 bottom-0 z-50 w-[85%] max-w-sm bg-gradient-to-b from-[#02140f] to-[#041f18] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${menuOpen ? 'opacity-100 pointer-events-auto' : 'pointer-events-none'
          } ${language === 'ar'
            ? `right-0 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`
            : `left-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`
          }`}
        aria-hidden={!menuOpen}
      >
        {/* Drawer Header: Logo + Close button */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-white/5 flex-shrink-0">
          <Link href="/" onClick={closeMenu} className="flex items-center">
            <Image src="/images/logo.svg" alt={t('Corematrix logo', 'شعار كورماتريكس')} width={150} height={35} priority />
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/90 hover:bg-white/5 focus-visible:outline-none"
            aria-label={t('Close menu', 'إغلاق القائمة')}
            onClick={closeMenu}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content inside Drawer */}
        <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar flex flex-col justify-between">
          <div>
            <ul className="flex flex-col gap-3" role="list">
              {navLinks.map(({ label, href }) =>
                href === '/services' ? (
                  <ServicesNavItemMobile key={href} onNavigate={closeMenu} />
                ) : (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className="block rounded-xl px-4 py-3 text-base font-semibold text-white/90 transition-colors hover:bg-white/5"
                    >
                      {t(label)}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="mt-8 border-t border-white/6 pt-6 flex flex-col gap-5 flex-shrink-0">
            <Link
              href={navCta.href}
              onClick={closeMenu}
              className="block rounded-xl border-2 border-[#149253] py-3 text-center text-base font-bold text-white transition hover:bg-[#149253] hover:shadow-[0_0_15px_rgba(20,146,83,0.3)]"
            >
              {t(navCta.label)}
            </Link>

            {/* Language Switcher Pill for mobile view */}
            <div className="flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-sm self-center">
              <button
                type="button"
                onClick={() => {
                  setLanguage('en');
                  closeMenu();
                }}
                className={`rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${language === 'en'
                    ? 'bg-[#149253] text-white shadow-sm'
                    : 'text-white/60 hover:text-white'
                  }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => {
                  setLanguage('ar');
                  closeMenu();
                }}
                className={`rounded-full px-5 py-1.5 text-xs font-bold tracking-wider transition-all cursor-pointer ${language === 'ar'
                    ? 'bg-[#149253] text-white shadow-sm'
                    : 'text-white/60 hover:text-white'
                  }`}
              >
                عربي
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
