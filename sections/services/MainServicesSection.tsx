'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { useFilterListener } from '@/hooks/usePortalFilter';
import type { FilterId } from './ServiceFilterNav';
import { useLanguage } from '@/context/LanguageContext';

const CATEGORY_THEMES = [
  {
    labelColor: 'text-cyan-400',
    cardBg: 'bg-cyan-950/15',
    cardBorder: 'border-cyan-500/10',
    cardHover: 'hover:bg-cyan-950/25 hover:border-cyan-500/40',
    titleText: 'text-cyan-200 group-hover:text-cyan-100',
    descText: 'text-cyan-200/50 group-hover:text-cyan-200/70',
    topHighlight: 'from-transparent via-cyan-500 to-transparent',
    iconBorderBgText: 'border-cyan-500/20 bg-cyan-950/40 text-cyan-400',
    tagBorderBgText: 'border-cyan-500/20 bg-cyan-950/20 text-cyan-400',
    linkHover: 'hover:text-cyan-400',
    linkText: 'text-cyan-400',
    btnFilled: 'bg-cyan-700 hover:bg-cyan-600 text-white',
    btnBordered: 'border-cyan-500/20 hover:border-cyan-500/50 text-cyan-400',
  },
  {
    labelColor: 'text-sky-400',
    cardBg: 'bg-sky-950/15',
    cardBorder: 'border-sky-500/10',
    cardHover: 'hover:bg-sky-950/25 hover:border-sky-500/40',
    titleText: 'text-sky-200 group-hover:text-sky-100',
    descText: 'text-sky-200/50 group-hover:text-sky-200/70',
    topHighlight: 'from-transparent via-sky-500 to-transparent',
    iconBorderBgText: 'border-sky-500/20 bg-sky-950/40 text-sky-400',
    tagBorderBgText: 'border-sky-500/20 bg-sky-950/20 text-sky-400',
    linkHover: 'hover:text-sky-400',
    linkText: 'text-sky-400',
    btnFilled: 'bg-sky-700 hover:bg-sky-600 text-white',
    btnBordered: 'border-sky-500/20 hover:border-sky-500/50 text-sky-400',
  },
  {
    labelColor: 'text-emerald-400',
    cardBg: 'bg-emerald-950/15',
    cardBorder: 'border-emerald-500/10',
    cardHover: 'hover:bg-emerald-950/25 hover:border-emerald-500/40',
    titleText: 'text-emerald-200 group-hover:text-emerald-100',
    descText: 'text-emerald-200/50 group-hover:text-emerald-200/70',
    topHighlight: 'from-transparent via-emerald-500 to-transparent',
    iconBorderBgText: 'border-emerald-500/20 bg-emerald-950/40 text-emerald-400',
    tagBorderBgText: 'border-emerald-500/20 bg-emerald-950/20 text-emerald-400',
    linkHover: 'hover:text-emerald-400',
    linkText: 'text-emerald-400',
    btnFilled: 'bg-emerald-700 hover:bg-emerald-600 text-white',
    btnBordered: 'border-emerald-500/20 hover:border-emerald-500/50 text-emerald-400',
  },
  {
    labelColor: 'text-amber-400',
    cardBg: 'bg-amber-950/15',
    cardBorder: 'border-amber-500/10',
    cardHover: 'hover:bg-amber-950/25 hover:border-amber-500/40',
    titleText: 'text-amber-200 group-hover:text-amber-100',
    descText: 'text-amber-200/50 group-hover:text-amber-200/70',
    topHighlight: 'from-transparent via-amber-500 to-transparent',
    iconBorderBgText: 'border-amber-500/20 bg-amber-950/40 text-amber-400',
    tagBorderBgText: 'border-amber-500/20 bg-amber-950/20 text-amber-400',
    linkHover: 'hover:text-amber-400',
    linkText: 'text-amber-400',
    btnFilled: 'bg-amber-700 hover:bg-amber-600 text-white',
    btnBordered: 'border-amber-500/20 hover:border-amber-500/50 text-amber-400',
  },
  {
    labelColor: 'text-purple-400',
    cardBg: 'bg-purple-950/15',
    cardBorder: 'border-purple-500/10',
    cardHover: 'hover:bg-purple-950/25 hover:border-purple-500/40',
    titleText: 'text-purple-200 group-hover:text-purple-100',
    descText: 'text-purple-200/50 group-hover:text-purple-200/70',
    topHighlight: 'from-transparent via-purple-500 to-transparent',
    iconBorderBgText: 'border-purple-500/20 bg-purple-950/40 text-purple-400',
    tagBorderBgText: 'border-purple-500/20 bg-purple-950/20 text-purple-400',
    linkHover: 'hover:text-purple-400',
    linkText: 'text-purple-400',
    btnFilled: 'bg-purple-700 hover:bg-purple-600 text-white',
    btnBordered: 'border-purple-500/20 hover:border-purple-500/50 text-purple-400',
  },
  {
    labelColor: 'text-rose-400',
    cardBg: 'bg-rose-950/15',
    cardBorder: 'border-rose-500/10',
    cardHover: 'hover:bg-rose-950/25 hover:border-rose-500/40',
    titleText: 'text-rose-200 group-hover:text-rose-100',
    descText: 'text-rose-200/50 group-hover:text-rose-200/70',
    topHighlight: 'from-transparent via-rose-500 to-transparent',
    iconBorderBgText: 'border-rose-500/20 bg-rose-950/40 text-rose-400',
    tagBorderBgText: 'border-rose-500/20 bg-rose-950/20 text-rose-400',
    linkHover: 'hover:text-rose-400',
    linkText: 'text-rose-400',
    btnFilled: 'bg-rose-700 hover:bg-rose-600 text-white',
    btnBordered: 'border-rose-500/20 hover:border-rose-500/50 text-rose-400',
  },
  {
    labelColor: 'text-orange-400',
    cardBg: 'bg-orange-950/15',
    cardBorder: 'border-orange-500/10',
    cardHover: 'hover:bg-orange-950/25 hover:border-orange-500/40',
    titleText: 'text-orange-200 group-hover:text-orange-100',
    descText: 'text-orange-200/50 group-hover:text-orange-200/70',
    topHighlight: 'from-transparent via-orange-500 to-transparent',
    iconBorderBgText: 'border-orange-500/20 bg-orange-950/40 text-orange-400',
    tagBorderBgText: 'border-orange-500/20 bg-orange-950/20 text-orange-400',
    linkHover: 'hover:text-orange-400',
    linkText: 'text-orange-400',
    btnFilled: 'bg-orange-700 hover:bg-orange-600 text-white',
    btnBordered: 'border-orange-500/20 hover:border-orange-500/50 text-orange-400',
  },
  {
    labelColor: 'text-teal-400',
    cardBg: 'bg-teal-950/15',
    cardBorder: 'border-teal-500/10',
    cardHover: 'hover:bg-teal-950/25 hover:border-teal-500/40',
    titleText: 'text-teal-200 group-hover:text-teal-100',
    descText: 'text-teal-200/50 group-hover:text-teal-200/70',
    topHighlight: 'from-transparent via-teal-500 to-transparent',
    iconBorderBgText: 'border-teal-500/20 bg-teal-950/40 text-teal-400',
    tagBorderBgText: 'border-teal-500/20 bg-teal-950/20 text-teal-400',
    linkHover: 'hover:text-teal-400',
    linkText: 'text-teal-400',
    btnFilled: 'bg-teal-700 hover:bg-teal-600 text-white',
    btnBordered: 'border-teal-500/20 hover:border-teal-500/50 text-teal-400',
  },
];

const renderCardIcon = (iconClass: string) => {
  if (!iconClass) return null;
  const trimmed = iconClass.trim();
  if (
    trimmed.startsWith('fa-') ||
    trimmed.startsWith('fas ') ||
    trimmed.startsWith('fab ') ||
    trimmed.startsWith('far ') ||
    trimmed.startsWith('fal ') ||
    trimmed.startsWith('fad ')
  ) {
    return <i className={trimmed} />;
  }
  return <span className="text-xl leading-none">{trimmed}</span>;
};

const getThemeIndex = (filterKey: string): number => {
  const mapping: Record<string, number> = {
    'ai-automation-services': 0,          // Cyan
    'cyber-security-services': 4,        // Purple
    'web-developement-services': 2,      // Emerald
    'mobile-app-developement-services': 3, // Amber
    'cloud-devops-services': 7,          // Teal
    'data-analytics-services': 5,        // Rose
    'ui-ux-product-design': 6,           // Orange
    'quality-assurance-testing': 4,      // Purple
    'it-consulting-strategy': 1,         // Sky
  };
  return mapping[filterKey] !== undefined ? mapping[filterKey] : 0;
};

export type ServiceCard = {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  linkLabel: string;
  category: string;
  /** When set, links to `/services/[seoSlug]` inner landing */
  detailSlug?: string;
};

export type FeaturedService = {
  badge: string;
  title: string;
  description: string;
  features: string[];
};

export type ServiceCategory = {
  id: string;
  label: string;
  anchorId: string;
  filterKey: string;
  featured?: FeaturedService;
  cards: ServiceCard[];
};

export function MainServicesSection() {
  const filter = useFilterListener('serviceFilter') as FilterId;
  const { language, t } = useLanguage();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  useEffect(() => {
    async function fetchDbServicesAndCategories() {
      try {
        const [catsRes, servicesRes] = await Promise.all([
          fetch('/api/service-categories'),
          fetch('/api/services')
        ]);
        if (!catsRes.ok || !servicesRes.ok) throw new Error('API offline');
        
        const catsData = await catsRes.json();
        const servicesData = await servicesRes.json();
        
        const grouped = catsData.map((cat: any) => {
          // Find if there is a featured service in DB for this category
          const dbFeatured = servicesData.find((s: any) => s.category === cat.filterKey && s.badge_en);

          // Gather all normal cards for this category from database
          const dbCards = servicesData.filter((s: any) => s.category === cat.filterKey).map((s: any) => ({
            icon: s.icon,
            title: language === 'ar' ? s.title_ar : s.title_en,
            description: language === 'ar' ? s.description_ar : s.description_en,
            tags: language === 'ar' ? s.tags_ar : s.tags_en,
            linkLabel: language === 'ar' ? s.linkLabel_ar : s.linkLabel_en,
            category: s.category,
            detailSlug: s.detailSlug,
          }));

          return {
            id: cat.id,
            label: language === 'ar' ? cat.label_ar : cat.label_en,
            anchorId: cat.anchorId,
            filterKey: cat.filterKey,
            featured: dbFeatured ? {
              badge: language === 'ar' ? (dbFeatured.badge_ar || dbFeatured.badge_en) : dbFeatured.badge_en,
              title: language === 'ar' ? (dbFeatured.title_ar || dbFeatured.title_en) : dbFeatured.title_en,
              description: language === 'ar' ? (dbFeatured.description_ar || dbFeatured.description_en) : dbFeatured.description_en,
              features: language === 'ar' ? (dbFeatured.features_ar || dbFeatured.features_en) : dbFeatured.features_en,
            } : undefined,
            cards: dbCards,
          };
        });
        const filteredGrouped = grouped.filter((cat: any) => {
          return cat.cards.length > 0 || cat.featured !== undefined;
        });
        setCategories(filteredGrouped);
      } catch (e) {
        console.warn('API error retrieving services and categories:', e);
      }
    }
    fetchDbServicesAndCategories();
  }, [language]);

  return (
    <section
      id="services"
      aria-labelledby="main-services-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 pt-20 pb-24"
    >
      <Container>
        {categories.map((category) => {
          const show = filter === 'all' || filter === category.filterKey;
          if (!show) return null;

          const themeIndex = getThemeIndex(category.filterKey);
          const theme = CATEGORY_THEMES[themeIndex];

          return (
            <div key={category.id} id={category.anchorId} data-category={category.filterKey} className="mb-16 last:mb-0 scroll-mt-48">
              <div className="mb-6 flex items-center gap-4">
                <span className={`font-display text-[0.68rem] font-bold uppercase tracking-[0.15em] ${theme.labelColor}`}>
                  {category.label}
                </span>
                <div className="h-px flex-1 bg-corematrix-border" />
              </div>

              {category.featured && (
                <div className="reveal relative mb-8 overflow-hidden rounded-3xl border border-corematrix-border2 bg-corematrix-card2 lg:grid lg:grid-cols-2">
                  <div className={`absolute left-0 right-0 top-0 z-10 h-[3px] bg-gradient-to-r ${theme.topHighlight}`} />
                  <div className="relative p-8 lg:p-10">
                    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${theme.tagBorderBgText}`}>
                      {category.featured.badge}
                    </span>
                    <h2 className="mt-4 font-display text-2xl font-bold text-corematrix-textPrimary">
                      {category.featured.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-corematrix-textSecondary">
                      {category.featured.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {category.featured.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${theme.linkText}`} />
                          <span className="text-sm text-corematrix-textSecondary">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link
                        href="/contact"
                        className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition ${theme.btnFilled}`}
                      >
                        {t('Get a consultation →', 'احصل على استشارة ←')}
                      </Link>
                      <Link
                        href="/services/ai-product-development"
                        className={`inline-flex items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-semibold transition ${theme.btnBordered}`}
                      >
                        {t('Service overview', 'نظرة عامة على الخدمة')}
                      </Link>
                      <Link
                        href="#case-studies"
                        className={`inline-flex items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-semibold transition ${theme.btnBordered}`}
                      >
                        {t('See case studies', 'شاهد دراسات الحالة')}
                      </Link>
                    </div>
                  </div>
                  <div className="flex min-h-[280px] min-w-0 items-center justify-center overflow-hidden border-t border-corematrix-border bg-corematrix-bg2 p-6 sm:p-10 lg:min-h-[360px] lg:border-l lg:border-t-0">
                    <Image
                      src="/images/services-featured-ai.png"
                      alt="Illustration of a smartphone with an AI robot, people working on laptops, and icons connected by data paths"
                      width={1024}
                      height={682}
                      className="h-auto w-full max-w-xl rounded-lg border border-corematrix-border bg-black object-contain"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {category.cards.map((card) => (
                  <article
                    key={card.title}
                    className={`group relative flex flex-col gap-0 overflow-hidden rounded-2xl border p-7 transition-all duration-300 card-glow hover:-translate-y-1 reveal ${theme.cardBg} ${theme.cardBorder} ${theme.cardHover}`}
                  >
                    <div className={`absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r ${theme.topHighlight} opacity-0 transition-opacity group-hover:opacity-100`} />
                    <div className={`mb-5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border text-xl ${theme.iconBorderBgText}`}>
                      {renderCardIcon(card.icon)}
                    </div>
                    <h3 className={`font-display text-base font-bold transition-colors duration-200 ${theme.titleText}`}>
                      {card.title}
                    </h3>
                    <p className={`mt-2 flex-1 font-light leading-relaxed transition-colors duration-200 ${theme.descText}`}>
                      {card.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded border px-2 py-1 font-mono text-xs ${theme.tagBorderBgText}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                      {card.detailSlug && (
                        <Link
                          href={`/services/${card.detailSlug}`}
                          className={`text-sm font-semibold ${theme.linkText} hover:opacity-85 transition-opacity`}
                        >
                          {t('Service overview →', 'نظرة عامة على الخدمة ←')}
                        </Link>
                      )}
                      <Link
                        href="/contact"
                        className={`flex items-center gap-2 text-sm font-semibold ${theme.linkText} hover:opacity-85 transition-opacity`}
                      >
                        {card.linkLabel} →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
