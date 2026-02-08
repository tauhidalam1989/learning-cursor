/**
 * Banner content for each page. Pass to PageBanner for dynamic heading.
 */
export const pageBanners: Record<
  string,
  { title: string; breadcrumbs: { label: string; href?: string }[] }
> = {
  about: {
    title: 'About Us',
    breadcrumbs: [
      { label: 'HOME', href: '/' },
      { label: 'ABOUT US' },
    ],
  },
  services: {
    title: 'Service',
    breadcrumbs: [
      { label: 'HOME', href: '/' },
      { label: 'SERVICE' },
    ],
  },
  blog: {
    title: 'Blog',
    breadcrumbs: [
      { label: 'HOME', href: '/' },
      { label: 'BLOG' },
    ],
  },
  contact: {
    title: 'Contact Us',
    breadcrumbs: [
      { label: 'HOME', href: '/' },
      { label: 'CONTACT US' },
    ],
  },
};
