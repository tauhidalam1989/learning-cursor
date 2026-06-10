export const EXPLORE_CARDS = [
  {
    icon: 'fas fa-brain',
    title_en: 'AI Development Services',
    title_ar: 'خدمات تطوير الذكاء الاصطناعي',
    description_en:
      'Custom LLM products, RAG pipelines, AI agents, ML models, and intelligent automation — built for production, not demos.',
    description_ar:
      'منتجات النماذج اللغوية المخصصة، سلاسل استرجاع المعلومات، وكلاء الذكاء الاصطناعي، ونماذج التعلم الآلي والتحويل الآلي الذكي للمؤسسات.',
    linkLabel_en: 'Explore AI services',
    linkLabel_ar: 'استكشف خدمات الذكاء الاصطناعي',
    href: '/services#ai-dev',
  },
  {
    icon: 'fas fa-laptop-code',
    title_en: 'Web Application Development',
    title_ar: 'تطوير تطبيقات الويب والجوال',
    description_en:
      'High-performance web apps with Next.js 14, React, TypeScript, and Tailwind CSS — engineered to scale from day one.',
    description_ar:
      'تطبيقات الويب عالية الأداء باستخدام نيكست جي إس، ورياكت، وتايب سكريبت، وتايلوند سي إس إس - مصممة خصيصاً للنمو والاتساع.',
    linkLabel_en: 'See web services',
    linkLabel_ar: 'شاهد خدمات الويب',
    href: '/services#web-dev',
  },
  {
    icon: 'fas fa-cloud',
    title_en: 'SaaS Platform Development',
    title_ar: 'تطوير منصات البرمجيات وحلول السحاب',
    description_en:
      'Multi-tenant SaaS platforms from MVP to enterprise-scale — with Stripe billing, RBAC, and production architecture.',
    description_ar:
      'منصات البرمجيات متعددة المستأجرين من الفكرة المبدئية إلى حلول المؤسسات الكبرى - مع تكامل الدفع عبر سترايب والأمان.',
    linkLabel_en: 'View SaaS services',
    linkLabel_ar: 'شاهد خدمات منصات البرمجيات',
    href: '/services#saas',
  },
  {
    icon: 'fas fa-users',
    title_en: 'Dedicated Development Teams',
    title_ar: 'الفرق المخصصة وتعهيد المطورين',
    description_en:
      'Pre-vetted senior engineers embedded in your team. Dedicated model, staff augmentation, or full offshore development centre.',
    description_ar:
      'مهندسون ومطورون مؤهلون بالكامل مندمجون في فريقك الخاص. نموذج الفرق المخصصة، زيادة الموظفين، أو مراكز التطوير الخارجية كاملة.',
    linkLabel_en: 'Build your team',
    linkLabel_ar: 'ابدأ بناء فريقك المخصص',
    href: '/services#teams',
  },
  {
    icon: 'fas fa-building',
    title_en: 'About Corematrix',
    title_ar: 'حول كوري ماتريكس',
    description_en:
      'Who we are, how we work, our mission, team, and why 50+ global clients trust us to build their most important software.',
    description_ar:
      'من نحن، كيف نعمل، رسالتنا، فريقنا، ولماذا يثق بنا أكثر من 50 عميلاً عالمياً لتطوير أهم برمجياتهم وحلولهم الرقمية.',
    linkLabel_en: 'Meet the team',
    linkLabel_ar: 'تعرف على الفريق المتميز',
    href: '/about',
  },
  {
    icon: 'fas fa-comments',
    title_en: 'Start a Project',
    title_ar: 'ابدأ مشروعك الرقمي معنا',
    description_en:
      "Tell us about what you're building. We respond within 24 hours with a real technical perspective — not a sales pitch.",
    description_ar:
      'أخبرنا عما تقوم ببنائه. سنرد عليك في غضون 24 ساعة برؤية تقنية حقيقية وفهم كامل - بدون مجرد كلام تسويقي.',
    linkLabel_en: 'Get in touch',
    linkLabel_ar: 'تواصل معنا الآن',
    href: '/contact',
  },
];

export const QUICK_LINKS = [
  { icon: 'fas fa-home', label_en: 'Homepage', label_ar: 'الصفحة الرئيسية', href: '/' },
  { icon: 'fas fa-cogs', label_en: 'All Services', label_ar: 'جميع الخدمات', href: '/services' },
  { icon: 'fas fa-brain', label_en: 'AI Development', label_ar: 'تطوير الذكاء الاصطناعي', href: '/services#ai-dev' },
  { icon: 'fas fa-laptop-code', label_en: 'Web Apps', label_ar: 'تطوير الويب', href: '/services#web-dev' },
  { icon: 'fas fa-cloud', label_en: 'SaaS Platforms', label_ar: 'منصات البرمجيات', href: '/services#saas' },
  { icon: 'fas fa-users', label_en: 'Dedicated Teams', label_ar: 'الفرق المخصصة', href: '/services#teams' },
  { icon: 'fas fa-building', label_en: 'About Us', label_ar: 'معلومات عنا', href: '/about' },
  { icon: 'fas fa-blog', label_en: 'Blog', label_ar: 'المدونة الهندسية', href: '/blog' },
  { icon: 'fas fa-rocket', label_en: 'Careers', label_ar: 'الوظائف المتاحة', href: '/careers' },
  { icon: 'fas fa-phone-alt', label_en: 'Contact', label_ar: 'اتصل بنا', href: '/contact' },
  { icon: 'fas fa-bullseye', label_en: 'Portfolio', label_ar: 'معرض أعمالنا', href: '/portfolio' },
];

export const TERMINAL_LINES = [
  { id: 'l1', prefix: 'command' as const, text_en: 'locate --deep --recursive "requested_page"', text_ar: 'locate --deep --recursive "الصفحة_المطلوبة"' },
  { id: 'l2', prefix: 'error' as const, text_en: 'Searching vector database...', highlight_en: '0 results found', text_ar: 'البحث في قاعدة البيانات الشعاعية...', highlight_ar: 'تم العثور على 0 نتائج' },
  { id: 'l3', prefix: 'error' as const, text_en: 'Querying LLM context window...', highlight_en: 'page not in training data', text_ar: 'الاستعلام من النموذج اللغوي...', highlight_ar: 'الصفحة ليست في بيانات التدريب' },
  { id: 'l4', prefix: 'success' as const, text_en: 'Suggestion: Navigate to ', highlight_en: '/', text_ar: 'اقتراح: الانتقال إلى ', highlight_ar: '/' },
  { id: 'l5', prefix: 'cursor' as const, text_en: '', text_ar: '' },
];
