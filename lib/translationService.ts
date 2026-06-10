/**
 * Centralized Translation Service for Corematrix.
 * Houses English (en) and Arabic (ar) dictionary values.
 */

export type Language = 'en' | 'ar';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Brand name
    'brand.name': 'Corematrix',

    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.blog': 'Blog',
    'nav.careers': 'Careers',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin Panel',

    // Header Links (Exact matching)
    'HOME': 'HOME',
    'ABOUT US': 'ABOUT US',
    'SERVICE': 'SERVICE',
    'BLOG': 'BLOG',
    'CAREERS': 'CAREERS',
    'PORTFOLIO': 'PORTFOLIO',
    'CONTACT US': 'CONTACT US',

    // Footer Links (Exact matching)
    'Home': 'Home',
    'About us': 'About us',
    'Service': 'Service',
    'Blog': 'Blog',
    'Portfolio': 'Portfolio',
    
    // Dropdown Services
    'All Services': 'All Services',
    'Adobe Licensing': 'Adobe Licensing',

    // Services Links
    'AI Development': 'AI Development',
    'Web Applications': 'Web Applications',
    'SaaS Platforms': 'SaaS Platforms',
    'Dedicated Teams': 'Dedicated Teams',

    // Additional Links
    'Feedback': 'Feedback',
    'Privacy Policy': 'Privacy Policy',
    'Terms of Service': 'Terms of Service',

    // Actions & General Buttons
    'action.readMore': 'Read More',
    'action.applyNow': 'Apply Now',
    'action.submit': 'Submit',
    'action.cancel': 'Cancel',
    'action.loading': 'Loading...',
    'action.search': 'Search',
    'action.viewAll': 'View All',
    'action.backToHome': 'Back to Home',
    'action.close': 'Close',

    // Careers Section
    'careers.title': 'Join Our High-Growth Engineering Team',
    'careers.subtitle': 'Help us build state-of-the-art AI systems and premium web applications.',
    'careers.openPositions': 'Open Positions',
    'careers.noPositions': 'No positions available at the moment. Check back soon!',
    'careers.department': 'Department',
    'careers.location': 'Location',
    'careers.employmentType': 'Employment Type',
    'careers.salary': 'Salary Range',
    'careers.requirements': 'Job Requirements',
    'careers.responsibilities': 'Key Responsibilities',
    'careers.applyFormTitle': 'Apply for this Position',

    // Services Section
    'services.title': 'Intelligent Technologies for the Digital Era',
    'services.subtitle': 'We craft premium AI products, high-fidelity SaaS platforms, and bespoke web solutions.',
    'services.featuredBadge': 'Featured Architecture',
    
    // Blog Section
    'blog.title': 'Tech Insights & AI Architectures',
    'blog.subtitle': 'Deep dives into modern software engineering, generative models, and industry trends.',
    'blog.searchPlaceholder': 'Search articles, topics or categories...',
    'blog.trending': 'Trending Topics',
    'blog.latest': 'Latest Articles',
    'blog.by': 'By',

    // Not Found Page
    'notFound.title': 'Page Not Found',
    'notFound.subtitle': 'The link you followed may be broken or the page has been removed.',
    'notFound.code': '404',
    'notFound.nudge': 'Need direct assistance? Get in touch with our operations team.',

    // Footer
    'footer.tagline': 'Building state-of-the-art digital infrastructure and custom AI systems.',
    'footer.rights': 'All rights reserved.',
  },
  ar: {
    // Brand name
    'brand.name': 'كورماتريكس',

    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.portfolio': 'المعرض',
    'nav.blog': 'المدونة',
    'nav.careers': 'الوظائف',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.admin': 'لوحة التحكم',

    // Header Links (Exact matching)
    'HOME': 'الرئيسية',
    'ABOUT US': 'من نحن',
    'SERVICE': 'الخدمات',
    'BLOG': 'المدونة',
    'CAREERS': 'الوظائف',
    'PORTFOLIO': 'المعرض',
    'CONTACT US': 'اتصل بنا',

    // Footer Links (Exact matching)
    'Home': 'الرئيسية',
    'About us': 'من نحن',
    'Service': 'الخدمات',
    'Blog': 'المدونة',
    'Portfolio': 'المعرض',
    
    // Dropdown Services
    'All Services': 'جميع الخدمات',
    'Adobe Licensing': 'ترخيص أدوبي',

    // Services Links
    'AI Development': 'تطوير الذكاء الاصطناعي',
    'Web Applications': 'تطبيقات الويب',
    'SaaS Platforms': 'منصات SaaS',
    'Dedicated Teams': 'فرق العمل المتخصصة',

    // Additional Links
    'Feedback': 'الآراء والملاحظات',
    'Privacy Policy': 'سياسة الخصوصية',
    'Terms of Service': 'شروط الخدمة',

    // Actions & General Buttons
    'action.readMore': 'اقرأ المزيد',
    'action.applyNow': 'تقدم الآن',
    'action.submit': 'إرسال',
    'action.cancel': 'إلغاء',
    'action.loading': 'جاري التحميل...',
    'action.search': 'بحث',
    'action.viewAll': 'عرض الكل',
    'action.backToHome': 'العودة للرئيسية',
    'action.close': 'إغلاق',

    // Careers Section
    'careers.title': 'انضم إلى فريقنا الهندسي سريع النمو',
    'careers.subtitle': 'ساعدنا في بناء أحدث أنظمة الذكاء الاصطناعي وتطبيقات الويب المتميزة.',
    'careers.openPositions': 'الوظائف الشاغرة',
    'careers.noPositions': 'لا توجد وظائف شاغرة في الوقت الحالي. تحقق من جديد قريباً!',
    'careers.department': 'القسم',
    'careers.location': 'الموقع',
    'careers.employmentType': 'نوع العمل',
    'careers.salary': 'نطاق الراتب',
    'careers.requirements': 'متطلبات الوظيفة',
    'careers.responsibilities': 'المسؤوليات الرئيسية',
    'careers.applyFormTitle': 'التقديم لهذه الوظيفة',

    // Services Section
    'services.title': 'تقنيات ذكية للعصر الرقمي',
    'services.subtitle': 'نحن نصنع منتجات الذكاء الاصطناعي المتميزة، ومنصات SaaS عالية الجودة، وحلول الويب المخصصة.',
    'services.featuredBadge': 'بنية مميزة',

    // Blog Section
    'blog.title': 'رؤى تقنية وبنيات الذكاء الاصطناعي',
    'blog.subtitle': 'تعمق في هندسة البرمجيات الحديثة، والنماذج التوليدية، واتجاهات الصناعة.',
    'blog.searchPlaceholder': 'ابحث عن المقالات أو المواضيع أو الأقسام...',
    'blog.trending': 'المواضيع الشائعة',
    'blog.latest': 'أحدث المقالات',
    'blog.by': 'بواسطة',

    // Not Found Page
    'notFound.title': 'الصفحة غير موجودة',
    'notFound.subtitle': 'قد يكون الرابط الذي اتبعته تالفًا أو تمت إزالة الصفحة.',
    'notFound.code': '404',
    'notFound.nudge': 'هل تحتاج إلى مساعدة مباشرة؟ تواصل مع فريق العمليات لدينا.',

    // Footer
    'footer.tagline': 'بناء البنية التحتية الرقمية الحديثة وأنظمة الذكاء الاصطناعي المخصصة.',
    'footer.rights': 'جميع الحقوق محفوظة.',
  }
};

/**
 * Resolves translation lookup key or falls back to inline text parameter.
 */
export function translate(key: string, language: Language, fallbackAr?: string): string {
  const dict = translations[language];
  if (dict && dict[key]) {
    return dict[key];
  }
  
  // If the key was actually passed as standard text (en, ar format), handle it gracefully
  if (language === 'ar' && fallbackAr) {
    return fallbackAr;
  }
  
  return key;
}
