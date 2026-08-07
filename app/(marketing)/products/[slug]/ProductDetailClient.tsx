'use client';

import React from 'react';
import Link from 'next/link';
import { Product, getMediaUrl } from '@/lib/products';
import ProductFaqAccordion from '@/components/ProductFaqAccordion';
import { useLanguage } from '@/context/LanguageContext';

const CARD_THEMES = [
  {
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    cardBg: 'bg-cyan-950/20',
    cardBorder: 'border-cyan-500/15',
    hoverBorder: 'hover:border-cyan-500/40',
    hoverTitle: 'group-hover:text-cyan-400',
    glow: 'hover:shadow-[0_0_24px_rgba(6,182,212,0.15)]',
    badgeBg: 'bg-cyan-900/40 text-cyan-400 border-cyan-500/30'
  },
  {
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
    cardBg: 'bg-emerald-950/20',
    cardBorder: 'border-emerald-500/15',
    hoverBorder: 'hover:border-emerald-500/40',
    hoverTitle: 'group-hover:text-emerald-400',
    glow: 'hover:shadow-[0_0_24px_rgba(16,185,129,0.15)]',
    badgeBg: 'bg-emerald-900/40 text-emerald-400 border-emerald-500/30'
  },
  {
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    cardBg: 'bg-purple-950/20',
    cardBorder: 'border-purple-500/15',
    hoverBorder: 'hover:border-purple-500/40',
    hoverTitle: 'group-hover:text-purple-400',
    glow: 'hover:shadow-[0_0_24px_rgba(168,85,247,0.15)]',
    badgeBg: 'bg-purple-900/40 text-purple-400 border-purple-500/30'
  },
  {
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
    cardBg: 'bg-amber-950/20',
    cardBorder: 'border-amber-500/15',
    hoverBorder: 'hover:border-amber-500/40',
    hoverTitle: 'group-hover:text-amber-400',
    glow: 'hover:shadow-[0_0_24px_rgba(245,158,11,0.15)]',
    badgeBg: 'bg-amber-900/40 text-amber-400 border-amber-500/30'
  },
  {
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10 border-rose-500/20',
    cardBg: 'bg-rose-950/20',
    cardBorder: 'border-rose-500/15',
    hoverBorder: 'hover:border-rose-500/40',
    hoverTitle: 'group-hover:text-rose-400',
    glow: 'hover:shadow-[0_0_24px_rgba(244,63,94,0.15)]',
    badgeBg: 'bg-rose-900/40 text-rose-400 border-rose-500/30'
  },
  {
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-500/10 border-sky-500/20',
    cardBg: 'bg-sky-950/20',
    cardBorder: 'border-sky-500/15',
    hoverBorder: 'hover:border-sky-500/40',
    hoverTitle: 'group-hover:text-sky-400',
    glow: 'hover:shadow-[0_0_24px_rgba(14,165,233,0.15)]',
    badgeBg: 'bg-sky-900/40 text-sky-400 border-sky-500/30'
  }
];

const renderIcon = (item: any, fallback: string, className = "text-sm") => {
  if (!item) return <i className={`${fallback} ${className}`}></i>;
  const iconClass = typeof item === 'string' ? item : (item.icon || item.iconFA || fallback);
  const finalClass = (iconClass.startsWith('fa') || iconClass.includes('fa-')) ? iconClass : `fas fa-${iconClass}`;
  return <i className={`${finalClass} ${className}`}></i>;
};

const HighlightedTitle = ({ title, className }: { title: string; className?: string }) => {
  if (!title) return null;
  const words = title.split(' ');
  if (words.length <= 2) {
    return <h1 className={className}><span className="text-corematrix-green400">{title}</span></h1>;
  }
  const mainPart = words.slice(0, words.length - 2).join(' ');
  const lastTwo = words.slice(words.length - 2).join(' ');

  return (
    <h1 className={className}>
      {mainPart} <span className="text-corematrix-green400">{lastTwo}</span>
    </h1>
  );
};

const FeatureText = ({ text }: { text: string }) => {
  if (!text) return null;
  const colonIndex = text.indexOf(':');
  if (colonIndex === -1) {
    return <span className="font-normal text-corematrix-textMuted">{text}</span>;
  }
  const title = text.substring(0, colonIndex);
  const description = text.substring(colonIndex + 1);
  return (
    <span className="text-xs md:text-sm text-corematrix-textMuted font-normal leading-relaxed">
      <strong className="font-bold text-white mr-1">{title}:</strong>
      {description}
    </span>
  );
};

export default function ProductDetailClient({ product }: { product: Product }) {
  const { language, dir, t } = useLanguage();
  const isAr = language === 'ar';

  const howItWorks = Array.isArray(product.howItWorks) ? product.howItWorks : [];
  const keyFeaturesList = Array.isArray(product.keyFeaturesList) ? product.keyFeaturesList : [];
  const benefits = Array.isArray(product.benefits) ? product.benefits : [];
  const visionItems = Array.isArray(product.visionItems) ? product.visionItems : [];
  const faqs = Array.isArray(product.faqs) ? product.faqs : [];

  const mainTitle = isAr && product.titleAr ? product.titleAr : product.title;
  const heroTitle = isAr && product.heroTitleAr ? product.heroTitleAr : (product.heroTitle || mainTitle);
  const heroSubtitle = isAr && product.heroSubtitleAr ? product.heroSubtitleAr : product.heroSubtitle;
  const heroDesc = isAr && (product.heroDescriptionAr || product.shortDescriptionAr)
    ? (product.heroDescriptionAr || product.shortDescriptionAr)
    : (product.heroDescription || product.shortDescription);

  const heroPrimaryCta = isAr && product.heroPrimaryCtaTextAr ? product.heroPrimaryCtaTextAr : product.heroPrimaryCtaText;
  const heroSecondaryCta = isAr && product.heroSecondaryCtaTextAr ? product.heroSecondaryCtaTextAr : product.heroSecondaryCtaText;

  const aboutTitle = isAr && product.aboutTitleAr ? product.aboutTitleAr : (product.aboutTitle || `${t('About', 'حول')} ${mainTitle}`);
  const aboutContent = isAr && product.aboutContentAr ? product.aboutContentAr : product.aboutContent;

  const keyFeaturesTitle = isAr && product.keyFeaturesTitleAr ? product.keyFeaturesTitleAr : (product.keyFeaturesTitle || t('Key Features', 'المميزات الرئيسية'));

  const visionTitle = isAr && product.visionTitleAr ? product.visionTitleAr : (product.visionTitle || t('Vision Alignment', 'محاذاة الرؤية'));
  const visionSubtitle = isAr && product.visionSubtitleAr ? product.visionSubtitleAr : product.visionSubtitle;

  const whySharpTitle = isAr && product.whySharpTitleAr ? product.whySharpTitleAr : (product.whySharpTitle || t('Why Choose CoreMatrix', 'لماذا كور ماتركس'));
  const whySharpContent = isAr && product.whySharpContentAr ? product.whySharpContentAr : product.whySharpContent;

  const ctaTitle = isAr && product.ctaTitleAr ? product.ctaTitleAr : (product.ctaTitle || t('Drive Next-Level Transformation Today', 'ابدأ الخطوة التالية اليوم'));
  const ctaDesc = isAr && product.ctaDescriptionAr ? product.ctaDescriptionAr : (product.ctaDescription || t('Contact our solution architects for customized platform demonstrations and enterprise pricing.', 'تواصل مع خبراء الحلول لدينا للحصول على عروض مخصصة للمؤسسات.'));
  const ctaBtn1 = isAr && product.ctaButton1TextAr ? product.ctaButton1TextAr : product.ctaButton1Text;
  const ctaBtn2 = isAr && product.ctaButton2TextAr ? product.ctaButton2TextAr : product.ctaButton2Text;

  return (
    <div className="flex flex-col w-full min-h-screen bg-corematrix-bg0 text-corematrix-text font-sans" dir={dir}>

      {/* BREADCRUMB BAR */}
      <div className="bg-corematrix-bg1/70 border-b border-corematrix-border/50 py-2.5">
        <div className="container mx-auto px-4 max-w-7xl flex items-center gap-2 text-xs font-medium text-corematrix-textMuted">
          <Link href="/" className="hover:text-corematrix-green400 transition-colors">{t('Home', 'الرئيسية')}</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-corematrix-green400 transition-colors">{t('Products', 'المنتجات')}</Link>
          <span>/</span>
          <span className="text-corematrix-green400 font-semibold">{mainTitle}</span>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-12 md:pt-8 md:pb-16 border-b border-corematrix-border/50 bg-gradient-to-b from-corematrix-bg1 via-corematrix-bg0 to-corematrix-bg0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(34,197,94,0.3) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-corematrix-green700/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 border border-corematrix-green700/40 bg-corematrix-green900/30 text-corematrix-green400 text-[11px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg shadow-corematrix-green900/10">
              <span className="w-2 h-2 bg-corematrix-green400 rounded-full animate-pulse" />
              {product.category ? (isAr && product.category.nameAr ? product.category.nameAr : product.category.name) : t('Enterprise Product', 'منتج مؤسسي')}
            </div>

            {/* Icon + Highlighted Title */}
            <div className="flex items-start gap-4 md:gap-6">
              <div className="shrink-0 p-3 md:p-4 rounded-2xl bg-corematrix-green900/30 border border-corematrix-green700/40 text-corematrix-green400 shadow-xl flex items-center justify-center">
                {product.heroIcon ? (
                  <img src={getMediaUrl(product.heroIcon)} alt="" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                ) : (
                  <i className={`${product.cardIcon || 'fas fa-box'} text-2xl md:text-3xl`} />
                )}
              </div>
              <HighlightedTitle
                title={heroTitle}
                className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight"
              />
            </div>

            {heroSubtitle && (
              <p className="text-corematrix-green400 text-lg md:text-xl font-semibold">
                {heroSubtitle}
              </p>
            )}

            <p className="text-corematrix-textMuted text-base md:text-lg leading-relaxed max-w-3xl whitespace-pre-line">
              {heroDesc}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {heroPrimaryCta && (
                <Link
                  href={product.heroPrimaryCtaLink || '/contact'}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-corematrix-green700 to-emerald-600 hover:from-corematrix-green600 hover:to-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-2xl shadow-xl shadow-corematrix-green900/30 transition-all active:scale-95 cursor-pointer"
                >
                  <i className="fas fa-calendar-check" /> {heroPrimaryCta}
                </Link>
              )}
              {heroSecondaryCta && (
                <Link
                  href={product.heroSecondaryCtaLink || '#features'}
                  className="inline-flex items-center gap-2 border border-corematrix-border bg-corematrix-bg1/80 hover:bg-corematrix-bg1 text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-2xl transition-all cursor-pointer"
                >
                  <i className="fas fa-info-circle text-corematrix-green400" /> {heroSecondaryCta}
                </Link>
              )}
              {product.brochure && (
                <a
                  href={getMediaUrl(product.brochure)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-2xl transition-all"
                >
                  <i className="fas fa-file-pdf" /> {t('Brochure (PDF)', 'كتيب المنتج (PDF)')}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT THE SOLUTION */}
      {(aboutTitle || aboutContent) && (
        <section className="py-20 border-b border-corematrix-border/50 bg-corematrix-bg1/40">
          <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className={product.aboutImage ? 'lg:col-span-7 space-y-6' : 'lg:col-span-12 space-y-6'}>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-corematrix-green400">{t('Overview', 'نظرة عامة')}</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
                  {aboutTitle}
                </h2>
              </div>
              <p className="text-corematrix-textMuted text-sm md:text-base leading-relaxed whitespace-pre-line">
                {aboutContent}
              </p>
            </div>

            {product.aboutImage && (
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden border border-corematrix-border bg-corematrix-bg0 p-2 shadow-2xl">
                  <img
                    src={getMediaUrl(product.aboutImage)}
                    alt={isAr && product.aboutImageAltAr ? product.aboutImageAltAr : (product.aboutImageAlt || aboutTitle)}
                    className="w-full h-auto object-contain rounded-2xl max-h-[420px]"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. HOW IT WORKS */}
      {howItWorks.length > 0 && (
        <section className="py-20 border-b border-corematrix-border/50 bg-corematrix-bg0">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-corematrix-green400">{t('Workflow Step-by-Step', 'خطوات عمل المنصة')}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">{t('How It Works', 'كيف تعمل المنصة')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {howItWorks.map((item: any, idx: number) => {
                const itemTitle = isAr && item.titleAr ? item.titleAr : item.title;
                const itemDesc = isAr && item.descriptionAr ? item.descriptionAr : item.description;
                const theme = CARD_THEMES[idx % CARD_THEMES.length];

                return (
                  <div
                    key={idx}
                    className={`group relative ${theme.cardBg} border ${theme.cardBorder} rounded-3xl p-8 shadow-xl transition-all duration-300 hover:-translate-y-1.5 ${theme.hoverBorder} ${theme.glow}`}
                  >
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${theme.iconBg} ${theme.iconColor} shadow-sm transition-transform group-hover:scale-110`}>
                      {renderIcon(item, 'fas fa-arrow-right', 'text-xl')}
                    </div>
                    <h3 className={`text-xl font-bold text-white mb-3 ${theme.hoverTitle} transition-colors`}>
                      {itemTitle}
                    </h3>
                    <p className="text-sm text-corematrix-textMuted leading-relaxed whitespace-pre-line">
                      {itemDesc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. KEY FEATURES */}
      {(keyFeaturesList.length > 0 || keyFeaturesTitle) && (
        <section id="features" className="py-20 border-b border-corematrix-border/50 bg-corematrix-bg1/40">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {product.keyFeaturesImages?.[0] && (
                <div className="lg:col-span-5 sticky top-24">
                  <div className="rounded-3xl border border-corematrix-border overflow-hidden bg-corematrix-bg0 p-2 shadow-2xl">
                    <img
                      src={getMediaUrl(product.keyFeaturesImages[0])}
                      alt={isAr && product.keyFeaturesImageAltAr ? product.keyFeaturesImageAltAr : (product.keyFeaturesImageAlt || 'Key Features')}
                      className="w-full h-auto object-contain rounded-2xl max-h-[450px]"
                    />
                  </div>
                </div>
              )}

              <div className={product.keyFeaturesImages?.[0] ? 'lg:col-span-7' : 'lg:col-span-12'}>
                <div className="mb-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-corematrix-green400">{t('Core Capabilities', 'القدرات الأساسية')}</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
                    {keyFeaturesTitle}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {keyFeaturesList.map((feature: any, idx: number) => {
                    const featureString = typeof feature === 'string'
                      ? feature
                      : (isAr && feature.textAr ? feature.textAr : (feature.text || feature.textAr || ''));
                    const theme = CARD_THEMES[idx % CARD_THEMES.length];

                    return (
                      <div
                        key={idx}
                        className={`p-5 ${theme.cardBg} border ${theme.cardBorder} rounded-2xl flex items-start gap-4 ${theme.hoverBorder} transition-colors shadow-lg ${theme.glow}`}
                      >
                        <div className={`w-10 h-10 rounded-xl ${theme.iconBg} ${theme.iconColor} flex items-center justify-center shrink-0`}>
                          {renderIcon(feature, 'fas fa-check', 'text-sm')}
                        </div>
                        <div className="flex-1 pt-0.5">
                          <FeatureText text={featureString} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. BENEFITS & IMPACT */}
      {benefits.length > 0 && (
        <section className="py-20 border-b border-corematrix-border/50 bg-corematrix-bg0">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-corematrix-green400">{t('Value Proposition', 'القيمة المضافة')}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">{t('Benefits & Impact', 'الفوائد والأثر')}</h2>
              <p className="text-xs text-corematrix-textMuted mt-2 italic">{t('Tailored for optimized enterprise performance.', 'مصمم لتعزيز وتطوير أداء المؤسسات.')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((b: any, idx: number) => {
                const bTitle = isAr && b.titleAr ? b.titleAr : b.title;
                const bDesc = isAr && b.descriptionAr ? b.descriptionAr : b.description;
                const theme = CARD_THEMES[idx % CARD_THEMES.length];

                return (
                  <div
                    key={idx}
                    className={`group ${theme.cardBg} border ${theme.cardBorder} rounded-3xl p-8 shadow-xl text-center space-y-4 ${theme.hoverBorder} transition-colors ${theme.glow}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} ${theme.iconColor} flex items-center justify-center text-2xl mx-auto shadow-inner`}>
                      {renderIcon(b, 'fas fa-shield-alt', 'text-2xl')}
                    </div>
                    <h3 className={`text-lg font-bold text-white ${theme.hoverTitle} transition-colors`}>{bTitle}</h3>
                    <p className="text-sm text-corematrix-textMuted leading-relaxed">{bDesc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. VISION ALIGNMENT */}
      {visionItems.length > 0 && (
        <section className="py-20 border-b border-corematrix-border/50 bg-corematrix-bg1/40">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-corematrix-green400">{t('Strategic Direction', 'التوجه الاستراتيجي')}</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                  {visionTitle}
                </h2>
                {visionSubtitle && (
                  <p className="text-corematrix-textMuted text-sm leading-relaxed">{visionSubtitle}</p>
                )}
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {visionItems.map((v: any, idx: number) => {
                    const vText = typeof v === 'string'
                      ? v
                      : (isAr && v.textAr ? v.textAr : (v.text || v.textAr || ''));
                    const theme = CARD_THEMES[idx % CARD_THEMES.length];

                    return (
                      <div
                        key={idx}
                        className={`p-6 ${theme.cardBg} border ${theme.cardBorder} rounded-2xl flex flex-col items-center text-center space-y-3 ${theme.hoverBorder} transition-colors ${theme.glow}`}
                      >
                        <div className={`w-10 h-10 rounded-full ${theme.iconBg} ${theme.iconColor} border flex items-center justify-center text-xs font-bold shadow-md`}>
                          {renderIcon(v, 'fas fa-rocket', 'text-xs')}
                        </div>
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          {vText}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. WHY COREMATRIX */}
      {(whySharpTitle || whySharpContent) && (
        <section className="py-20 border-b border-corematrix-border/50 bg-corematrix-bg0">
          <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className={product.whySharpImage ? 'lg:col-span-7 space-y-6' : 'lg:col-span-12 space-y-6'}>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-corematrix-green400">{t('Why CoreMatrix', 'لماذا كور ماتركس')}</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
                  {whySharpTitle}
                </h2>
              </div>
              <p className="text-corematrix-textMuted text-sm md:text-base leading-relaxed whitespace-pre-line">
                {whySharpContent}
              </p>
            </div>

            {product.whySharpImage && (
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-corematrix-border overflow-hidden bg-corematrix-bg1 p-2 shadow-2xl">
                  <img
                    src={getMediaUrl(product.whySharpImage)}
                    alt={isAr && product.whySharpImageAltAr ? product.whySharpImageAltAr : (product.whySharpImageAlt || 'Why Corematrix')}
                    className="w-full h-auto object-contain rounded-2xl max-h-[420px]"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 8. CTA BANNER */}
      <section className="py-16 bg-corematrix-bg0">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative rounded-3xl bg-gradient-to-r from-corematrix-green950 via-corematrix-bg1 to-corematrix-bg1 border border-corematrix-green700/40 p-8 md:p-12 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white">
                {ctaTitle}
              </h2>
              <p className="text-corematrix-textMuted text-xs md:text-sm">
                {ctaDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              {ctaBtn1 && (
                <Link
                  href={product.ctaButton1Link || '/contact'}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-corematrix-green700 to-emerald-600 hover:from-corematrix-green600 hover:to-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-2xl shadow-lg shadow-corematrix-green900/30 transition-all cursor-pointer"
                >
                  <i className="fas fa-paper-plane" /> {ctaBtn1}
                </Link>
              )}
              {ctaBtn2 && (
                <Link
                  href={product.ctaButton2Link || '/products'}
                  className="inline-flex items-center gap-2 border border-corematrix-border bg-corematrix-bg0 hover:bg-corematrix-bg2 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl transition-all cursor-pointer"
                >
                  <i className="fas fa-th" /> {ctaBtn2}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQs SECTION */}
      {faqs.length > 0 && (
        <section id="faq" className="relative bg-corematrix-bg0 py-14 lg:py-20 border-t border-corematrix-border/60 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-corematrix-green700/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

              {/* Left Column: Tag, Heading, Subtitle & CTA */}
              <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
                <div className="inline-block px-3 py-1 rounded-full border border-corematrix-green700/40 bg-corematrix-green900/30 text-corematrix-green400 text-[10px] font-extrabold uppercase tracking-widest">
                  {t('FAQ', 'الأسئلة الشائعة')}
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.2]">
                  {t("You've Got Questions.", 'لديك أسئلة؟')}
                </h2>

                <p className="text-corematrix-textMuted text-xs md:text-sm leading-relaxed font-normal max-w-md">
                  {t('We believe in radical transparency — no jargon, no vague answers.', 'نحن نؤمن بالشفافية المطلقة — لا توجد مصطلحات معقدة ولا إجابات غامضة.')}
                </p>

                <div className="pt-1">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-corematrix-green700 to-emerald-600 hover:from-corematrix-green600 hover:to-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-xl shadow-corematrix-green900/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>{t('Talk to Us', 'تحدث إلينا')}</span>
                    <span>{isAr ? '←' : '→'}</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: FAQ Accordion */}
              <div className="lg:col-span-7">
                <ProductFaqAccordion faqs={faqs} />
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 10. FLOATING BROCHURE BUTTON */}
      {product.brochure && (
        <a
          href={getMediaUrl(product.brochure)}
          download
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-8 left-8 z-[99] flex items-center justify-center w-14 h-14 bg-corematrix-green700 hover:bg-corematrix-green600 text-white rounded-full shadow-2xl shadow-corematrix-green900/50 transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer border border-corematrix-green400/30"
          title={t('Download Product Brochure', 'تحميل كتيب المنتج')}
        >
          <i className="fas fa-file-download text-xl" />
        </a>
      )}
    </div>
  );
}
