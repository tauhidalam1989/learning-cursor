'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_SERVICES_DROPDOWN } from '@/config/nav';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Desktop: hover / focus-within dropdown for Service.
 */
export function ServicesNavItemDesktop() {
  const pathname = usePathname() || '/';
  const { t } = useLanguage();

  const servicesActive =
    pathname === '/services' || pathname.startsWith('/services/');

  return (
    <div className="group relative">
      <button
        type="button"
        aria-haspopup="menu"
        className={
          `inline-flex items-center gap-1 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-all ` +
          (servicesActive ? 'text-[#149253]' : 'text-white/80 hover:text-[#149253]')
        }
      >
        {t('SERVICE', 'الخدمات')}
        <svg
          className="h-4 w-4 transition-transform group-hover:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        role="menu"
        aria-label={t('Services', 'الخدمات')}
        className="invisible absolute left-0 top-full z-50 min-w-[220px] pt-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
      >
        <div className="rounded-md border border-white/10 bg-[#02140f] py-1 shadow-lg ring-1 ring-black/20">
          {NAV_SERVICES_DROPDOWN.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                role="menuitem"
                href={href}
                className={
                  `block px-4 py-2.5 text-sm font-medium transition-colors ` +
                  (active
                    ? 'bg-white/5 text-[#149253]'
                    : 'text-white/85 hover:bg-white/5 hover:text-[#149253]')
                }
              >
                {t(label)}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Sublinks for the mobile drawer under Service. */
export function ServicesNavItemMobile({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname() || '/';
  const { t } = useLanguage();

  return (
    <li className="rounded-md border border-white/8 bg-white/[0.02]">
      <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/50">
        {t('SERVICE', 'الخدمات')}
      </div>
      <ul className="pb-2" role="list">
        {NAV_SERVICES_DROPDOWN.map(({ label, href }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onNavigate}
                className={`block px-6 py-2 text-sm ${
                  active ? 'text-[#149253]' : 'text-white/90 hover:bg-white/5'
                }`}
              >
                {t(label)}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
