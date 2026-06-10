/**
 * Navigation and footer link configuration.
 */

export type NavLink = { label: string; href: string };

/** Main nav (Navbar) - uppercase labels to match existing design */
export const NAV_LINKS: NavLink[] = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'SERVICE', href: '/services' },
  { label: 'BLOG', href: '/blog' },
  { label: 'CAREERS', href: '/careers' },
];

/** CTA for Navbar */
export const NAV_CTA: NavLink = { label: 'CONTACT US', href: '/contact' };

/** Footer quick links column */
export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about' },
  { label: 'Service', href: '/services' },
  { label: 'Blog', href: '/blog' },
  // { label: 'Portfolio', href: '/portfolio' },
];

/** Service nav dropdown (desktop + mobile submenus) */
export const NAV_SERVICES_DROPDOWN: NavLink[] = [
  { label: 'All Services', href: '/services' },
  { label: 'Adobe Licensing', href: '/services/adobe-licensing' },
];

/** Footer services column - anchors match MainServicesSection */
export const FOOTER_SERVICES_LINKS: NavLink[] = [
  { label: 'AI Development', href: '/services#ai-dev' },
  { label: 'Web Applications', href: '/services#web-dev' },
  { label: 'SaaS Platforms', href: '/services#saas' },
  { label: 'Dedicated Teams', href: '/services#teams' },
  { label: 'Adobe Licensing', href: '/services/adobe-licensing' },
];

/** Footer additional links column */
export const FOOTER_ADDITIONAL_LINKS: NavLink[] = [
  { label: 'Feedback', href: '/feedback' },
  { label: 'Privacy Policy', href: '/privacy' },
];

/** Footer bottom bar legal links */
export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];
