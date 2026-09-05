/**
 * Navigation and footer link configuration.
 */

export type NavLink = { label: string; href: string; labelAr?: string };

/** Main nav (Navbar) - uppercase labels to match existing design */
export const NAV_LINKS: NavLink[] = [
  { label: 'HOME', href: '/', labelAr: 'الرئيسية' },
  { label: 'ABOUT US', href: '/about', labelAr: 'من نحن' },
  { label: 'SERVICE', href: '/services', labelAr: 'الخدمات' },
  { label: 'PRODUCTS', href: '/products', labelAr: 'المنتجات' },
  { label: 'BLOG', href: '/blog', labelAr: 'المدونة' },
  { label: 'CAREERS', href: '/careers', labelAr: 'الوظائف' },
];

/** CTA for Navbar */
export const NAV_CTA: NavLink = { label: 'CONTACT US', href: '/contact', labelAr: 'اتصل بنا' };

/** Footer quick links column */
export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: 'Home', href: '/', labelAr: 'الرئيسية' },
  { label: 'About us', href: '/about', labelAr: 'من نحن' },
  { label: 'Service', href: '/services', labelAr: 'الخدمات' },
  { label: 'Products', href: '/products', labelAr: 'المنتجات' },
  { label: 'Blog', href: '/blog', labelAr: 'المدونة' },
  // { label: 'Portfolio', href: '/portfolio' },
];

/** Service nav dropdown (desktop + mobile submenus) */
export const NAV_SERVICES_DROPDOWN: NavLink[] = [
  { label: 'All Services', href: '/services', labelAr: 'جميع الخدمات' },
  { label: 'Adobe Licensing', href: '/services/adobe-licensing', labelAr: 'ترخيص أدوبي' },
];

/** Footer services column - anchors match MainServicesSection */
export const FOOTER_SERVICES_LINKS: NavLink[] = [
  { label: 'Cloud Security Services', href: 'https://corematrixs.com/services/cloud-security-services', labelAr: 'خدمات الأمن السحابي' },
  { label: 'Data Warehousing Services', href: 'http://corematrixs.com/services/data-warehousing', labelAr: 'خدمات مستودعات البيانات' },
  { label: 'Penetration Testing Services', href: 'https://corematrixs.com/services/penetration-testing-services', labelAr: 'خدمات اختبار الاختراق' },
  { label: 'Generative AI Solutions', href: 'https://corematrixs.com/services/generative-ai-solutions', labelAr: 'حلول الذكاء الاصطناعي التوليدي' },
  { label: 'Adobe Licensing', href: 'https://corematrixs.com/services/adobe-licensing', labelAr: 'ترخيص أدوبي' },
];

/** Footer additional links column */
export const FOOTER_ADDITIONAL_LINKS: NavLink[] = [
  { label: 'Feedback', href: '/feedback', labelAr: 'الآراء والملاحظات' },
  { label: 'Privacy Policy', href: '/privacy', labelAr: 'سياسة الخصوصية' },
];

/** Footer bottom bar legal links */
export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy', labelAr: 'سياسة الخصوصية' },
  { label: 'Terms of Service', href: '/terms', labelAr: 'شروط الخدمة' },
];
