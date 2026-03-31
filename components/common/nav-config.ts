import type { NavLink } from '@/types';
import { NAV_LINKS, NAV_CTA } from '@/config/nav';

/** Main navigation links (shared by Navbar and Footer). */
export const navLinks: NavLink[] = NAV_LINKS;

/** CTA for Navbar and Footer. */
export const navCta = {
  label: NAV_CTA.label,
  href: NAV_CTA.href,
} as const;
