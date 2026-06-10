'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { TwoColumnFaqSection, FAQ_GRID_HOME } from '@/components/shared/TwoColumnFaqSection';
import SectionLabel from '@/components/shared/SectionLabel';
import SectionHeading from '@/components/shared/SectionHeading';

interface DynamicServiceProps {
  service: {
    id?: string;
    category: string;
    icon: string;
    tags_en?: string[] | string | any;
    tags_ar?: string[] | string | any;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    linkLabel_en?: string;
    linkLabel_ar?: string;
    detailSlug: string;
    badge_en?: string;
    badge_ar?: string;
    features_en?: string[] | string | any;
    features_ar?: string[] | string | any;

    // HERO SECTION
    heroTitle?: string;
    heroTitleAr?: string;
    heroTagline?: string;
    heroTaglineAr?: string;
    heroIntroduction?: string;
    heroIntroductionAr?: string;
    heroImage?: string;
    heroIcon?: string;
    cardIcon?: string;
    primaryCtaText?: string;
    primaryCtaTextAr?: string;
    primaryCtaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaTextAr?: string;
    secondaryCtaLink?: string;

    // ABOUT SECTION
    aboutSectionTitle?: string;
    aboutSectionTitleAr?: string;
    aboutSectionDescription?: string;
    aboutSectionDescriptionAr?: string;
    aboutSectionImage?: string;
    aboutSectionImageAlt?: string;
    aboutSectionImageAltAr?: string;
    aboutSectionBottomNote?: string;
    aboutSectionBottomNoteAr?: string;

    // SOLUTIONS / CAPABILITIES
    capabilitiesSectionTitle?: string;
    capabilitiesSectionTitleAr?: string;

    // INDUSTRIES SUPPORTED
    industriesSectionTitle?: string;
    industriesSectionTitleAr?: string;
    industriesSectionDescription?: string;
    industriesSectionDescriptionAr?: string;
    industriesImage?: string;
    industriesImageAlt?: string;
    industriesImageAltAr?: string;
    industriesSectionBottomNote?: string;
    industriesSectionBottomNoteAr?: string;

    // CRITICAL WHY SECTION
    criticalSectionTitle?: string;
    criticalSectionTitleAr?: string;
    criticalSectionDescription?: string;
    criticalSectionDescriptionAr?: string;
    criticalSectionButtonText?: string;
    criticalSectionButtonTextAr?: string;
    criticalSectionButtonLink?: string;
    criticalRightTitle?: string;
    criticalRightTitleAr?: string;

    // WHY CHOOSE US
    whyChooseUsSectionTitle?: string;
    whyChooseUsSectionTitleAr?: string;
    whyChooseUsDescription?: string;
    whyChooseUsDescriptionAr?: string;
    whyChooseUsShortDescription?: string;
    whyChooseUsShortDescriptionAr?: string;
    whyChooseUsBottomNote?: string;
    whyChooseUsBottomNoteAr?: string;

    // OVERVIEW SECTION (Legacy/Alternative)
    overviewSectionTitle?: string;
    overviewSectionTitleAr?: string;
    overviewWhatIsIt?: string;
    overviewWhatIsItAr?: string;
    overviewWhoIsItFor?: string;
    overviewWhoIsItForAr?: string;
    overviewProblemsSolved?: string;
    overviewProblemsSolvedAr?: string;
    overviewImage?: string;

    // JSON DATA ARRAYS
    process?: any;
    capabilities?: any;
    benefits?: any;
    whyChooseUs?: any;
    aboutPillars?: any;
    industries?: any;
    criticalCards?: any;
    faqs?: any;

    // FINAL CALL TO ACTION (CTA)
    ctaMessage?: string;
    ctaMessageAr?: string;
    ctaPrimaryText?: string;
    ctaPrimaryTextAr?: string;
    ctaPrimaryLink?: string;
    ctaSecondaryText?: string;
    ctaSecondaryTextAr?: string;
    ctaSecondaryLink?: string;
  };
}

export function DynamicServiceLanding({ service }: DynamicServiceProps) {
  const { language, t } = useLanguage();

  // Helper to parse arrays from JSON safely (since PostgreSQL returns parsed objects/arrays directly,
  // but sqlite or request body payloads might be stringified).
  const safeParseArray = (field: any): any[] => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    try {
      if (typeof field === 'string') {
        return JSON.parse(field);
      }
    } catch (e) {
      // Fallback
    }
    return [];
  };

  // Helper to resolve uploaded images from backend dynamic URLs
  const resolveServiceImage = (imagePath: string | null | undefined): string => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    return `${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  // Render icons beautifully (supports FontAwesome classnames & standard emojis)
  const renderIcon = (iconClass: string, className = "h-6 w-6 text-corematrix-green400") => {
    if (!iconClass) return null;
    const trimmed = iconClass.trim();
    if (
      trimmed.startsWith('fa-') ||
      trimmed.startsWith('fas ') ||
      trimmed.startsWith('far ') ||
      trimmed.startsWith('fab ') ||
      trimmed.includes('fa-')
    ) {
      return <i className={`${trimmed} ${className} flex items-center justify-center`} />;
    }
    return <span className="text-xl leading-none">{trimmed}</span>;
  };

  // 1. HERO VARIABLES
  const heroTaglineVal = language === 'ar'
    ? (service.heroTaglineAr || service.badge_ar || 'تفاصيل الخدمة')
    : (service.heroTagline || service.badge_en || 'Service Detail');
  const heroTitleVal = language === 'ar'
    ? (service.heroTitleAr || service.title_ar)
    : (service.heroTitle || service.title_en);
  const heroIntroductionVal = language === 'ar'
    ? (service.heroIntroductionAr || service.description_ar)
    : (service.heroIntroduction || service.description_en);

  const primaryCtaTextVal = language === 'ar'
    ? 'احصل على استشارة'
    : 'Get a Consultation';
  const primaryCtaLinkVal = '/contact';

  const secondaryCtaTextVal = language === 'ar'
    ? 'تصفح كل الخدمات ←'
    : 'Browse All Services →';
  const secondaryCtaLinkVal = '/services';

  const heroImageUrlResolved = resolveServiceImage(service.heroImage);
  const heroIcon = service.heroIcon;

  // 2. ABOUT VARIABLES
  const aboutTitle = language === 'ar'
    ? (service.aboutSectionTitleAr || 'حول هذه الخدمة')
    : (service.aboutSectionTitle || 'About This Service');
  const aboutDesc = language === 'ar'
    ? (service.aboutSectionDescriptionAr || service.description_ar)
    : (service.aboutSectionDescription || service.description_en);
  const aboutSectionImageUrlResolved = resolveServiceImage(service.aboutSectionImage || service.overviewImage);
  const aboutImageAlt = language === 'ar'
    ? (service.aboutSectionImageAltAr || 'تفاصيل الخدمة المتميزة')
    : (service.aboutSectionImageAlt || 'Premium service illustration');
  const aboutBottomNote = language === 'ar'
    ? service.aboutSectionBottomNoteAr
    : service.aboutSectionBottomNote;

  // Resolve About Pillars
  const rawPillars = safeParseArray(service.aboutPillars);
  const pillars = rawPillars.map((item: any) => {
    if (typeof item === 'string') return { title: item, description: '' };
    const title = language === 'ar'
      ? (item.titleAr || item.title_ar || item.title || item.textAr || item.text_ar || item.text)
      : (item.titleEn || item.title_en || item.title || item.textEn || item.text_en || item.text);
    const description = language === 'ar'
      ? (item.descriptionAr || item.description_ar || item.description || '')
      : (item.descriptionEn || item.description_en || item.description || '');
    return { title: title || '', description: description || '' };
  }).filter(p => p.title);

  // 3. CAPABILITIES / SOLUTIONS VARIABLES
  const capabilitiesTitle = language === 'ar'
    ? (service.capabilitiesSectionTitleAr || 'الحلول والقدرات الرئيسية')
    : (service.capabilitiesSectionTitle || 'Key Capabilities & Solutions');

  const rawCapabilities = safeParseArray(service.capabilities);
  const rawFeatures = safeParseArray(language === 'ar' ? service.features_ar : service.features_en);

  // Map capabilities list cleanly (with fallback to features if capabilities are empty)
  let capabilitiesList = rawCapabilities.map((item: any) => {
    const title = language === 'ar'
      ? (item.titleAr || item.title_ar || item.title)
      : (item.titleEn || item.title_en || item.title);
    const description = language === 'ar'
      ? (item.descriptionAr || item.description_ar || item.description_en_ar || item.description)
      : (item.descriptionEn || item.description_en || item.description);
    const icon = item.icon || '⚡';
    return { title: title || '', description: description || '', icon };
  }).filter(c => c.title);

  if (capabilitiesList.length === 0 && rawFeatures.length > 0) {
    capabilitiesList = rawFeatures.map((feat, idx) => ({
      title: feat,
      description: '',
      icon: '⚙️'
    }));
  }

  // 4. INDUSTRIES VARIABLES
  const industriesTitle = language === 'ar'
    ? 'القطاعات التي نخدمها'
    : 'Industries We Support';
  const industriesDesc = language === 'ar'
    ? 'نحن نبني حلولاً تقنية مخصصة تخدم البنى التحتية للمؤسسات والشركات عبر مختلف القطاعات الحيوية.'
    : 'We engineer custom technological ecosystems that power core operations across primary business sectors.';
  const industriesImageUrlResolved = ''; // Empty so we always fallback to the beautiful custom icon/illustration below
  const industriesImgAlt = language === 'ar'
    ? 'القطاعات الحيوية التي ندعمها'
    : 'Critical industries we support';

  const industriesList = [
    {
      title: language === 'ar' ? 'التكنولوجيا المالية (FinTech)' : 'Financial Technology (FinTech)',
      description: language === 'ar' ? 'بوابات مالية آمنة، وربط للعمليات المصرفية، وأنظمة فوترة تلقائية.' : 'Secure transactional portals, ledger APIs, and automated billing solutions.',
      icon: 'fas fa-university'
    },
    {
      title: language === 'ar' ? 'الرعاية الصحية والتقنية الحيوية' : 'Healthcare & Biotech',
      description: language === 'ar' ? 'بوابات للمرضى مطابقة للمعايير الصحية، ودمج السجلات الطبية.' : 'Compliance-focused patient portals, records integration, and telemedicine systems.',
      icon: 'fas fa-heartbeat'
    },
    {
      title: language === 'ar' ? 'العقارات والتكنولوجيا العقارية' : 'Real Estate & PropTech',
      description: language === 'ar' ? 'لوحات عقارية تفاعلية، وقنوات لمعالجة استعلامات المشترين.' : 'Dynamic property listings, interactive mapping, and custom buyer workflows.',
      icon: 'fas fa-building'
    },
    {
      title: language === 'ar' ? 'التجارة الإلكترونية والتجزئة' : 'E-commerce & Retail',
      description: language === 'ar' ? 'متاجر رأسية سريعة التحميل، مع دمج أنظمة الدفع وبوابات سداد متعددة.' : 'High-conversion headless storefronts, multi-vendor support, and Stripe checkout pipelines.',
      icon: 'fas fa-shopping-cart'
    },
    {
      title: language === 'ar' ? 'الخدمات اللوجستية وسلاسل الإمداد' : 'Logistics & Supply Chain',
      description: language === 'ar' ? 'تتبع حركة الأساطيل، وتوزيع مهام التسليم آلياً، ومستودعات التخزين.' : 'Fleet operations tracking, dynamic delivery dispatch, and multi-tenant inventory hubs.',
      icon: 'fas fa-truck'
    },
    {
      title: language === 'ar' ? 'منصات البرمجيات وحوسبة السحاب' : 'SaaS & Enterprise Cloud',
      description: language === 'ar' ? 'بنية تحتية سحابية متعددة المستأجرين، مع أنظمة تحكم ومقاييس تشغيل متكاملة.' : 'Multi-tenant cloud infrastructure, metered subscription metrics, and custom operational consoles.',
      icon: 'fas fa-cloud'
    }
  ];

  const INDUSTRIES_THEMES = [
    {
      bg: 'bg-cyan-950/20',
      border: 'border-cyan-500/15',
      hoverBorder: 'hover:border-cyan-500/40',
      hoverBg: 'hover:bg-cyan-950/35',
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10 border-cyan-500/20',
      glow: 'hover:shadow-[0_0_15px_rgba(34,211,238,0.12)]',
      titleColor: 'group-hover:text-cyan-300',
      lineGlow: 'via-cyan-500/20 group-hover:via-cyan-500/60',
      iconHoverBg: 'group-hover:bg-cyan-500 group-hover:text-white',
    },
    {
      bg: 'bg-amber-950/20',
      border: 'border-amber-500/15',
      hoverBorder: 'hover:border-amber-500/40',
      hoverBg: 'hover:bg-amber-950/35',
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      glow: 'hover:shadow-[0_0_15px_rgba(245,158,11,0.12)]',
      titleColor: 'group-hover:text-amber-300',
      lineGlow: 'via-amber-500/20 group-hover:via-amber-500/60',
      iconHoverBg: 'group-hover:bg-amber-500 group-hover:text-white',
    },
    {
      bg: 'bg-indigo-950/20',
      border: 'border-indigo-500/15',
      hoverBorder: 'hover:border-indigo-500/40',
      hoverBg: 'hover:bg-indigo-950/35',
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/10 border-indigo-500/20',
      glow: 'hover:shadow-[0_0_15px_rgba(99,102,241,0.12)]',
      titleColor: 'group-hover:text-indigo-300',
      lineGlow: 'via-indigo-500/20 group-hover:via-indigo-500/60',
      iconHoverBg: 'group-hover:bg-indigo-500 group-hover:text-white',
    },
    {
      bg: 'bg-purple-950/20',
      border: 'border-purple-500/15',
      hoverBorder: 'hover:border-purple-500/40',
      hoverBg: 'hover:bg-purple-950/35',
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/10 border-purple-500/20',
      glow: 'hover:shadow-[0_0_15px_rgba(168,85,247,0.12)]',
      titleColor: 'group-hover:text-purple-300',
      lineGlow: 'via-purple-500/20 group-hover:via-purple-500/60',
      iconHoverBg: 'group-hover:bg-purple-500 group-hover:text-white',
    },
    {
      bg: 'bg-orange-950/20',
      border: 'border-orange-500/15',
      hoverBorder: 'hover:border-orange-500/40',
      hoverBg: 'hover:bg-orange-950/35',
      iconColor: 'text-orange-400',
      iconBg: 'bg-orange-500/10 border-orange-500/20',
      glow: 'hover:shadow-[0_0_15px_rgba(249,115,22,0.12)]',
      titleColor: 'group-hover:text-orange-300',
      lineGlow: 'via-orange-500/20 group-hover:via-orange-500/60',
      iconHoverBg: 'group-hover:bg-orange-500 group-hover:text-white',
    },
    {
      bg: 'bg-sky-950/20',
      border: 'border-sky-500/15',
      hoverBorder: 'hover:border-sky-500/40',
      hoverBg: 'hover:bg-sky-950/35',
      iconColor: 'text-sky-400',
      iconBg: 'bg-sky-500/10 border-sky-500/20',
      glow: 'hover:shadow-[0_0_15px_rgba(14,165,233,0.12)]',
      titleColor: 'group-hover:text-sky-300',
      lineGlow: 'via-sky-500/20 group-hover:via-sky-500/60',
      iconHoverBg: 'group-hover:bg-sky-500 group-hover:text-white',
    },
  ];

  // 5. CRITICAL WHY VARIABLES
  const criticalTitle = language === 'ar'
    ? (service.criticalSectionTitleAr || 'لماذا هذه الخدمة بالغة الأهمية؟')
    : (service.criticalSectionTitle || 'Why This Service is Critical?');
  const criticalDesc = language === 'ar'
    ? service.criticalSectionDescriptionAr
    : service.criticalSectionDescription;
  const criticalBtnText = language === 'ar'
    ? (service.criticalSectionButtonTextAr || 'ابدأ الآن')
    : (service.criticalSectionButtonText || 'Get Started Now');
  const criticalBtnLink = service.criticalSectionButtonLink || '/contact';
  const criticalRightTitleVal = language === 'ar'
    ? service.criticalRightTitleAr
    : service.criticalRightTitle;

  const rawCriticalCards = safeParseArray(service.criticalCards);
  const criticalCardsList = rawCriticalCards.map((item: any) => {
    const title = language === 'ar'
      ? (item.titleAr || item.title_ar || item.title)
      : (item.titleEn || item.title_en || item.title);
    const description = language === 'ar'
      ? (item.descriptionAr || item.description_ar || item.description)
      : (item.descriptionEn || item.description_en || item.description);
    const icon = item.icon || '🔥';
    return { title: title || '', description: description || '', icon };
  }).filter(c => c.title);

  // 6. WHY CHOOSE US VARIABLES
  const whyChooseUsTitle = language === 'ar'
    ? (service.whyChooseUsSectionTitleAr || 'لماذا تختار كورماتريكس؟')
    : (service.whyChooseUsSectionTitle || 'Why Choose Corematrix?');
  const whyChooseUsDesc = language === 'ar'
    ? service.whyChooseUsDescriptionAr
    : service.whyChooseUsDescription;
  const whyChooseUsBottom = language === 'ar'
    ? service.whyChooseUsBottomNoteAr
    : service.whyChooseUsBottomNote;

  const rawWhyChoose = safeParseArray(service.whyChooseUs);
  const whyChooseUsList = rawWhyChoose.map((item: any) => {
    const title = language === 'ar'
      ? (item.titleAr || item.title_ar || item.title)
      : (item.titleEn || item.title_en || item.title);
    const description = language === 'ar'
      ? (item.descriptionAr || item.description_ar || item.description)
      : (item.descriptionEn || item.description_en || item.description);
    const icon = item.icon || '✓';
    return { title: title || '', description: description || '', icon };
  }).filter(item => item.title);

  // 7. POPULAR FAQS VARIABLES
  const rawFaqs = safeParseArray(service.faqs);
  const resolvedFaqs = rawFaqs.map((item: any) => {
    const q = language === 'ar'
      ? (item.q_ar || item.questionAr || item.q || item.question)
      : (item.q_en || item.questionEn || item.q || item.question);
    const a = language === 'ar'
      ? (item.a_ar || item.answerAr || item.a || item.answer)
      : (item.a_en || item.answerEn || item.a || item.answer);
    return { q: q || '', a: a || '' };
  }).filter(item => item.q && item.a);

  // 8. FINAL CTA VARIABLES
  const ctaMsg = language === 'ar'
    ? (service.ctaMessageAr || 'جاهز لبناء حلول تقنية بالغة الذكاء معاً؟')
    : (service.ctaMessage || 'Ready to build high-end intelligent systems together?');

  const ctaPrimary = language === 'ar'
    ? (service.ctaPrimaryTextAr || 'ابدأ استشارتك المجانية ←')
    : (service.ctaPrimaryText || 'Start Your Free Consultation ←');
  const ctaPrimaryLinkVal = service.ctaPrimaryLink || '/contact';

  const ctaSecondary = language === 'ar'
    ? (service.ctaSecondaryTextAr || 'تحدث مع مهندسينا الكبار')
    : (service.ctaSecondaryText || 'Consult Senior Engineers');
  const ctaSecondaryLinkVal = service.ctaSecondaryLink || '/contact';

  const tags = language === 'ar'
    ? (Array.isArray(service.tags_ar) ? service.tags_ar : safeParseArray(service.tags_ar))
    : (Array.isArray(service.tags_en) ? service.tags_en : safeParseArray(service.tags_en));

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="bg-corematrix-bg0 text-corematrix-textPrimary font-sans selection:bg-corematrix-green700/30 selection:text-corematrix-green300"
    >
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-16 pb-12 border-b border-corematrix-border overflow-hidden">
        {/* Dynamic Background Neon meshes */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a1d11_1px,transparent_1px),linear-gradient(to_bottom,#0a1d11_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_85%,transparent_100%)] opacity-35 pointer-events-none" />
        <div className="absolute top-[-10%] left-[20%] right-[20%] h-[400px] rounded-full bg-corematrix-green700/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[10%] h-[300px] w-[300px] rounded-full bg-corematrix-green900/10 blur-[100px] pointer-events-none" />

        <Container className="relative z-10 w-full">
          <div className="mx-auto max-w-7xl">
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-corematrix-textDim"
            >
              <Link href="/" className="transition-colors hover:text-corematrix-textMuted">
                {t('Home', 'الرئيسية')}
              </Link>
              <span aria-hidden>{language === 'ar' ? '‹' : '›'}</span>
              <Link href="/services" className="transition-colors hover:text-corematrix-textMuted">
                {t('Services', 'الخدمات')}
              </Link>
              <span aria-hidden>{language === 'ar' ? '‹' : '›'}</span>
              <span className="text-corematrix-green400">
                {language === 'ar'
                  ? (service.title_ar || 'تفاصيل الخدمة')
                  : (service.title_en || 'Service Detail')}
              </span>
            </nav>

            <div className="w-full text-start max-w-full">
              {/* Tagline / Badge */}
              {heroTaglineVal && (
                <span className="inline-block rounded-full border border-corematrix-green700/30 bg-corematrix-green900/50 px-4 py-1.5 text-xs font-semibold text-corematrix-green400 mb-6 uppercase tracking-wider">
                  {heroTaglineVal}
                </span>
              )}

              {/* Title and Icon Inline Container */}
              <div className="flex items-center gap-4 mb-6">
                {/* Icon Block */}
                {(heroIcon || service.icon) && (
                  <div className="flex h-18 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-corematrix-green900/60 border border-corematrix-green700/30 text-corematrix-green400 shadow-lg shadow-corematrix-green900/10">
                    {heroIcon && (heroIcon.startsWith('http') || heroIcon.startsWith('/')) ? (
                      <img src={resolveServiceImage(heroIcon)} alt="" className="h-7 w-7 sm:h-10 sm:w-10 object-contain" />
                    ) : (
                      renderIcon(heroIcon || service.icon || '⚙️', "text-2xl sm:text-3xl text-corematrix-green400")
                    )}
                  </div>
                )}

                {/* Glowing Main Title */}
                <h1
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.18] text-transparent bg-clip-text bg-gradient-to-r from-corematrix-textPrimary via-corematrix-green300 to-corematrix-textPrimary"
                >
                  {heroTitleVal}
                </h1>
              </div>

              {/* Introduction Description */}
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-corematrix-textSecondary/90 font-light max-w-full lg:max-w-[60%] md:max-w-[75%]">
                {heroIntroductionVal}
              </p>

              {/* Tags if present */}
              {tags && tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2 justify-start">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-corematrix-green700/20 bg-corematrix-green900/30 px-3.5 py-1 font-mono text-[9px] text-corematrix-green400 uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action CTAs */}
              <div className="mt-10 flex flex-wrap gap-4 items-center justify-start">
                <Link
                  href={secondaryCtaLinkVal}
                  className="inline-flex items-center justify-center rounded-lg border border-corematrix-border bg-corematrix-bg1/80 px-6 py-3.5 text-sm font-semibold text-corematrix-textSecondary transition hover:bg-corematrix-card hover:border-corematrix-green700/30 duration-300"
                >
                  {secondaryCtaTextVal}
                </Link>
                <Link
                  href={primaryCtaLinkVal}
                  className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500 shadow-lg shadow-corematrix-green900/40 duration-300 hover:scale-[1.02]"
                >
                  {primaryCtaTextVal}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 2: ABOUT */}
      <section className="relative py-16 border-b border-corematrix-border overflow-hidden bg-corematrix-bg1/50">
        <div className="absolute top-1/2 left-0 h-[250px] w-[250px] rounded-full bg-corematrix-green900/5 blur-[90px] pointer-events-none" />

        <Container>
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Details & Pillars */}
              <div className="lg:col-span-7 text-start order-2 lg:order-1">
                <SectionLabel>
                  {language === 'ar' ? 'نظرة عامة' : 'Overview'}
                </SectionLabel>
                <SectionHeading className="mt-2">
                  {aboutTitle}
                </SectionHeading>

                <div className="mt-6 text-base leading-relaxed text-corematrix-textSecondary/90 font-light space-y-4">
                  {aboutDesc.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* About Pillars Checklist */}
                {pillars && pillars.length > 0 && (
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {pillars.map((pillar, idx) => (
                      <div key={idx} className="flex gap-3 text-start">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-corematrix-green900/80 border border-corematrix-green700/30 text-[10px] text-corematrix-green400 font-bold">
                          ✓
                        </span>
                        <div>
                          <h4 className="text-sm font-semibold text-corematrix-textPrimary">{pillar.title}</h4>
                          {pillar.description && (
                            <p className="mt-1 text-xs text-corematrix-textMuted leading-relaxed">{pillar.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {aboutBottomNote && (
                  <div className="mt-8 border-s-2 border-corematrix-green500 ps-4 pe-4 py-1 text-xs text-corematrix-textMuted font-mono">
                    {aboutBottomNote}
                  </div>
                )}
              </div>

              {/* Right Column: About Section Image */}
              <div className="lg:col-span-5 order-1 lg:order-2 w-full">
                <div className="relative group rounded-3xl overflow-hidden border border-corematrix-border bg-corematrix-card/20 p-2 shadow-xl hover:border-corematrix-green700/20 transition-all duration-300">
                  {aboutSectionImageUrlResolved ? (
                    <img
                      src={aboutSectionImageUrlResolved}
                      alt={aboutImageAlt}
                      className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.03] transition-all duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 sm:h-64 flex flex-col items-center justify-center rounded-2xl bg-corematrix-bg0/80 border border-corematrix-border p-6 text-center text-corematrix-textDim">
                      <span className="text-4xl mb-2">💡</span>
                      <p className="text-xs font-mono text-corematrix-green400/70">{aboutImageAlt}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3: SOLUTIONS / CAPABILITIES */}
      {capabilitiesList && capabilitiesList.length > 0 && (
        <section className="relative py-16 border-b border-corematrix-border overflow-hidden">
          <div className="absolute top-[20%] right-[-10%] h-[300px] w-[300px] rounded-full bg-corematrix-green900/5 blur-[110px] pointer-events-none" />

          <Container>
            <div className="mx-auto max-w-7xl text-center">
              <SectionLabel>
                {language === 'ar' ? 'ماذا نقدم' : 'Our Offerings'}
              </SectionLabel>
              <SectionHeading className="mt-2">
                {capabilitiesTitle}
              </SectionHeading>

              {/* Grid Layout (Mobile Responsive) */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {capabilitiesList.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative flex flex-col text-start p-6 sm:p-8 rounded-2xl border border-corematrix-border bg-corematrix-card/30 backdrop-blur-sm hover:bg-corematrix-card/50 hover:border-corematrix-green700/40 hover:shadow-[0_0_30px_rgba(21,128,61,0.15)] hover:scale-[1.01] transition-all duration-300"
                  >
                    {/* Accent glow line inside */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green500/20 to-transparent group-hover:via-corematrix-green500/60 transition-all duration-300" />

                    {/* Icon wrapper */}
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-corematrix-green900/80 border border-corematrix-green700/20 text-corematrix-green400 group-hover:bg-corematrix-green500 group-hover:text-white transition-all duration-300 shrink-0">
                      {renderIcon(item.icon, "h-7 w-7 text-2xl")}
                    </div>

                    <h3 className="text-lg font-bold text-corematrix-textPrimary group-hover:text-corematrix-green300 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-corematrix-textSecondary/80 leading-relaxed font-light flex-grow">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* SECTION 4: INDUSTRIES */}
      {industriesList && industriesList.length > 0 && (
        <section className="relative py-16 border-b border-corematrix-border overflow-hidden bg-corematrix-bg1/30">
          <Container>
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left side: Image/Illustration */}
                <div className="lg:col-span-5 w-full">
                  <div className="relative group rounded-3xl overflow-hidden border border-corematrix-border p-2 bg-corematrix-card/20 shadow-2xl hover:border-corematrix-green700/30 transition-all duration-300">
                    {industriesImageUrlResolved ? (
                      <img
                        src={industriesImageUrlResolved}
                        alt={industriesImgAlt || industriesTitle}
                        className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-all duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-80 sm:h-[400px] flex flex-col items-center justify-center rounded-2xl bg-transparent p-6 text-center text-corematrix-textDim relative overflow-hidden group/svg">
                        {/* Background glowing accent */}
                        <div className="absolute inset-0 bg-radial-gradient from-corematrix-green700/10 via-transparent to-transparent opacity-60 pointer-events-none" />

                        <svg className="w-40 h-40 text-corematrix-green400/80 mb-6 animate-pulse duration-[3000ms] relative z-10 transition-transform group-hover/svg:scale-105 duration-500" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Hexagonal frame */}
                          <polygon points="100,15 175,58 175,142 100,185 25,142 25,58" stroke="rgba(34, 197, 94, 0.2)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />

                          {/* Inner glowing orb */}
                          <circle cx="100" cy="100" r="32" fill="url(#gradCore)" filter="url(#glow)" />

                          {/* Orbit paths */}
                          <circle cx="100" cy="100" r="64" stroke="rgba(34, 197, 94, 0.15)" strokeWidth="1" strokeDasharray="3 3" />

                          {/* Outer orbiting nodes */}
                          <circle cx="100" cy="36" r="7" fill="#22c55e" />
                          <circle cx="45" cy="132" r="5" fill="#16a34a" />
                          <circle cx="155" cy="132" r="6" fill="#4ade80" />
                          <circle cx="68" cy="155" r="7" fill="#22c55e" />
                          <circle cx="132" cy="155" r="4" fill="#4ade80" />

                          {/* Connecting lines */}
                          <path d="M100 36 L100 68" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 4" />
                          <path d="M45 132 L72 112" stroke="#16a34a" strokeWidth="1.5" />
                          <path d="M155 132 L128 112" stroke="#16a34a" strokeWidth="1.5" />

                          {/* Encircling tech loops */}
                          <path d="M100 15 A85 85 0 0 1 185 100" stroke="url(#gradLine1)" strokeWidth="2" strokeLinecap="round" />
                          <path d="M100 185 A85 85 0 0 1 15 100" stroke="url(#gradLine2)" strokeWidth="2" strokeLinecap="round" />

                          {/* Definitions */}
                          <defs>
                            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                              <feGaussianBlur stdDeviation="8" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                            <linearGradient id="gradCore" x1="100" y1="68" x2="100" y2="132" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#4ade80" />
                              <stop offset="100%" stopColor="#15803d" stopOpacity="0.8" />
                            </linearGradient>
                            <linearGradient id="gradLine1" x1="100" y1="15" x2="185" y2="100" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#22c55e" />
                              <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                            <linearGradient id="gradLine2" x1="100" y1="185" x2="15" y2="100" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#22c55e" />
                              <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                          </defs>
                        </svg>

                        <p className="text-xs font-mono text-corematrix-green400/80 uppercase tracking-widest relative z-10">{industriesImgAlt || 'Target Industries'}</p>
                      </div>
                    )}
                    {/* Decorative border badge */}
                    <div className="absolute top-6 start-6 rounded-lg bg-corematrix-green700/90 backdrop-blur-sm border border-corematrix-green500/30 px-3.5 py-1.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                      {language === 'ar' ? 'القطاعات المستهدفة' : 'Target Industries'}
                    </div>
                  </div>
                </div>

                {/* Right side: Pill details list */}
                <div className="lg:col-span-7 text-start">
                  <SectionLabel>
                    {language === 'ar' ? 'تطبيقات عملية' : 'Use Cases'}
                  </SectionLabel>
                  <SectionHeading className="mt-2">
                    {industriesTitle}
                  </SectionHeading>
                  {industriesDesc && (
                    <p className="mt-4 text-base text-corematrix-textSecondary/90 font-light leading-relaxed">
                      {industriesDesc}
                    </p>
                  )}

                  {/* Grid of Pills */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {industriesList.map((ind, idx) => {
                      const theme = INDUSTRIES_THEMES[idx % INDUSTRIES_THEMES.length];
                      return (
                        <div
                          key={idx}
                          className={`group relative flex items-center gap-4 p-5 rounded-xl border ${theme.border} ${theme.bg} backdrop-blur-sm ${theme.hoverBorder} ${theme.hoverBg} hover:scale-[1.01] transition-all duration-300 overflow-hidden ${theme.glow}`}
                        >
                          {/* Accent glow line inside */}
                          <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${theme.lineGlow} to-transparent transition-all duration-300`} />

                          <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${theme.iconBg} ${theme.iconColor} ${theme.iconHoverBg} transition-all duration-300 shrink-0`}>
                            {renderIcon(ind.icon, "h-4 w-4")}
                          </span>
                          <div>
                            <h4 className={`text-sm font-semibold text-corematrix-textPrimary transition-colors duration-200 ${theme.titleColor}`}>{ind.title}</h4>
                            {ind.description && (
                              <p className="mt-1 text-xs text-corematrix-textMuted leading-relaxed">{ind.description}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {service.industriesSectionBottomNote && (
                    <p className="mt-6 text-xs font-mono text-corematrix-textMuted leading-relaxed">
                      * {language === 'ar' ? service.industriesSectionBottomNoteAr : service.industriesSectionBottomNote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* SECTION 5: WHY CRITICAL SECTION */}
      <section className="relative py-16 border-b border-corematrix-border overflow-hidden bg-corematrix-bg0">
        <div className="absolute inset-0 bg-radial-gradient(circle_at_bottom_left,#031a0e_0%,transparent_50%) opacity-30 pointer-events-none" />

        <Container>
          <div className="mx-auto max-w-7xl">
            {/* Outer highly aesthetic card wrapper */}
            <div className="relative overflow-hidden rounded-3xl border border-corematrix-border bg-gradient-to-br from-corematrix-card/60 via-corematrix-bg1/60 to-corematrix-bg0/60 p-6 sm:p-12 shadow-2xl">
              {/* Inner accent neon border glow */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green500/40 to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left side description */}
                <div className="lg:col-span-5 text-start">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-corematrix-green400 bg-corematrix-green900/40 border border-corematrix-green700/20 px-3 py-1 rounded-full">
                    {language === 'ar' ? 'الجدوى التقنية والأمان' : 'Technical & Business Value'}
                  </span>
                  <h2
                    style={{ fontFamily: 'var(--font-display)' }}
                    className="mt-6 text-2xl sm:text-3xl font-extrabold tracking-tight text-corematrix-textPrimary leading-tight"
                  >
                    {criticalTitle}
                  </h2>
                  {criticalDesc && (
                    <p className="mt-4 text-sm text-corematrix-textSecondary/90 font-light leading-relaxed">
                      {criticalDesc}
                    </p>
                  )}
                  {service.criticalSectionButtonText && (
                    <div className="mt-8">
                      <Link
                        href={criticalBtnLink}
                        className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-5 py-3 text-xs font-semibold text-white hover:bg-corematrix-green500 hover:scale-[1.02] shadow-lg shadow-corematrix-green900/30 transition-all duration-300"
                      >
                        {criticalBtnText}
                      </Link>
                    </div>
                  )}
                </div>

                {/* Right side cards grid */}
                <div className="lg:col-span-7 w-full">
                  <h3 className="text-xs font-mono uppercase text-corematrix-green400 tracking-wider mb-6 text-start">
                    {criticalRightTitleVal || (language === 'ar' ? 'الركائز الأساسية لنجاح الخدمة' : 'Primary Value Anchors')}
                  </h3>

                  {criticalCardsList && criticalCardsList.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {criticalCardsList.map((card, idx) => (
                        <div
                          key={idx}
                          className="group relative p-5 sm:p-6 rounded-xl border border-corematrix-border bg-corematrix-bg0/80 hover:bg-corematrix-card/50 hover:border-corematrix-green700/40 hover:shadow-[0_0_30px_rgba(21,128,61,0.15)] hover:scale-[1.01] transition-all duration-300 text-start overflow-hidden"
                        >
                          {/* Accent glow line inside */}
                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green500/20 to-transparent group-hover:via-corematrix-green500/60 transition-all duration-300" />

                          <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-corematrix-green950/90 border border-corematrix-green700/20 text-corematrix-green400 group-hover:bg-corematrix-green500 group-hover:text-white transition-all duration-300 shrink-0">
                            {renderIcon(card.icon, "h-4 w-4")}
                          </div>
                          <h4 className="text-sm font-bold text-corematrix-textPrimary group-hover:text-corematrix-green300 transition-colors duration-200">{card.title}</h4>
                          <p className="mt-2 text-xs text-corematrix-textSecondary/70 leading-relaxed font-light">
                            {card.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Default fallback values if no critical highlights are uploaded */}
                      <div className="group relative p-5 rounded-xl border border-corematrix-border bg-corematrix-bg0/80 hover:bg-corematrix-card/50 hover:border-corematrix-green700/40 hover:shadow-[0_0_30px_rgba(21,128,61,0.15)] hover:scale-[1.01] transition-all duration-300 text-start overflow-hidden">
                        {/* Accent glow line inside */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green500/20 to-transparent group-hover:via-corematrix-green500/60 transition-all duration-300" />

                        <span className="text-xl mb-3 block">🔒</span>
                        <h4 className="text-sm font-bold text-corematrix-textPrimary group-hover:text-corematrix-green300 transition-colors duration-200">Zero Trust Architecture</h4>
                        <p className="mt-2 text-xs text-corematrix-textSecondary/60 leading-relaxed font-light">Ensuring complete authentication and dynamic verification at every stage.</p>
                      </div>
                      <div className="group relative p-5 rounded-xl border border-corematrix-border bg-corematrix-bg0/80 hover:bg-corematrix-card/50 hover:border-corematrix-green700/40 hover:shadow-[0_0_30px_rgba(21,128,61,0.15)] hover:scale-[1.01] transition-all duration-300 text-start overflow-hidden">
                        {/* Accent glow line inside */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green500/20 to-transparent group-hover:via-corematrix-green500/60 transition-all duration-300" />

                        <span className="text-xl mb-3 block">📈</span>
                        <h4 className="text-sm font-bold text-corematrix-textPrimary group-hover:text-corematrix-green300 transition-colors duration-200">Autonomic Scalability</h4>
                        <p className="mt-2 text-xs text-corematrix-textSecondary/60 leading-relaxed font-light">Engineered to absorb server traffic surges without compromising API latency.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 6: WHY CHOOSE US */}
      {whyChooseUsList && whyChooseUsList.length > 0 && (
        <section className="relative py-16 border-b border-corematrix-border overflow-hidden bg-corematrix-bg1/20">
          <Container>
            <div className="mx-auto max-w-7xl text-center">
              <SectionLabel>
                {language === 'ar' ? 'الميزة التنافسية' : 'Our Advantage'}
              </SectionLabel>
              <SectionHeading className="mt-2">
                {whyChooseUsTitle}
              </SectionHeading>
              {whyChooseUsDesc && (
                <p className="mt-4 text-base text-corematrix-textSecondary/80 max-w-2xl mx-auto font-light leading-relaxed">
                  {whyChooseUsDesc}
                </p>
              )}

              {/* Cards List */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyChooseUsList.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative flex flex-col p-6 sm:p-8 rounded-2xl border border-corematrix-border bg-corematrix-card/30 backdrop-blur-sm hover:bg-corematrix-card/50 hover:border-corematrix-green700/40 hover:shadow-[0_0_30px_rgba(21,128,61,0.15)] hover:scale-[1.01] transition-all duration-300 text-start overflow-hidden"
                  >
                    {/* Accent glow line inside */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green500/20 to-transparent group-hover:via-corematrix-green500/60 transition-all duration-300" />

                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-corematrix-green900/60 border border-corematrix-green700/20 text-corematrix-green400 group-hover:bg-corematrix-green500 group-hover:text-white transition-all duration-300 shrink-0">
                      {renderIcon(item.icon, "h-5 w-5")}
                    </div>
                    <h4 className="text-base font-bold text-corematrix-textPrimary group-hover:text-corematrix-green300 transition-colors duration-200">
                      {item.title}
                    </h4>
                    <p className="mt-2.5 text-xs text-corematrix-textSecondary/70 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {whyChooseUsBottom && (
                <p className="mt-10 text-xs font-mono text-corematrix-textMuted">
                  {whyChooseUsBottom}
                </p>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* SECTION 7: POPULAR FAQS */}
      {resolvedFaqs && resolvedFaqs.length > 0 && (
        <TwoColumnFaqSection
          sectionId="faq"
          headingId="faq-heading"
          title={t("You've Got Questions.", "لديك أسئلة؟")}
          description={t("We believe in radical transparency — no jargon, no vague answers.", "نحن نؤمن بالشفافية المطلقة — لا توجد مصطلحات معقدة ولا إجابات غامضة.")}
          items={resolvedFaqs}
          sectionClassName="border-b border-corematrix-border bg-corematrix-bg0 py-16"
          gridClassName={FAQ_GRID_HOME}
          faqVariant="default"
          cta={
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              {t("Talk to Us →", "تحدث إلينا ←")}
            </Link>
          }
        />
      )}

      {/* SECTION 8: NEXT STEP CTA BANNER */}
      <section className="relative py-16 bg-corematrix-bg0 overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(21,128,61,0.06)_0%,transparent_75%) opacity-65 pointer-events-none" />

        <Container>
          <div className="mx-auto max-w-7xl">
            <div className="relative rounded-3xl border border-corematrix-border2 bg-gradient-to-br from-corematrix-card to-corematrix-bg1 p-6 sm:p-10 text-center shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent" />

              <SectionHeading className="mt-0 text-center text-3xl font-bold sm:text-4xl">
                {ctaMsg}
              </SectionHeading>

              <p className="mt-4 text-xs sm:text-sm text-corematrix-textSecondary/80 max-w-xl mx-auto font-light leading-relaxed">
                {language === 'ar'
                  ? 'ناقش متطلباتك الفريدة مع أحد كبار مستشارينا التقنيين وسنقوم بتوفير عرض توضيحي وحل هندسي مخصص يلبي توقعاتك بالكامل.'
                  : 'Consult with our expert engineering team and receive a comprehensive technological proposal tailored precisely to your company operations.'}
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href={ctaPrimaryLinkVal}
                  className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500 shadow-xl shadow-corematrix-green900/40 hover:scale-[1.02] duration-300"
                >
                  {ctaPrimary}
                </Link>
                <Link
                  href={ctaSecondaryLinkVal}
                  className="inline-flex items-center justify-center rounded-lg border border-corematrix-border bg-corematrix-bg1/80 px-7 py-3.5 text-sm font-semibold text-corematrix-textSecondary transition hover:bg-corematrix-card hover:border-corematrix-green700/30 duration-300"
                >
                  {ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
