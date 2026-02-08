import type { NavLink } from '@/types';

/** Main navigation links (shared by Navbar and Footer). */
export const navLinks: NavLink[] = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'SERVICE', href: '/services' },
  { label: 'BLOG', href: '/blog' },
  { label: 'PORTFOLIO', href: '/portfolio' },
];

/** CTA for Navbar and Footer. */
export const navCta = {
  label: 'CONTACT US',
  href: '/contact',
} as const;
