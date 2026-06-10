'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { useFilterListener } from '@/hooks/usePortalFilter';
import type { FilterId } from './ServiceFilterNav';
import { useLanguage } from '@/context/LanguageContext';

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
          fetch('http://localhost:5000/api/service-categories'),
          fetch('http://localhost:5000/api/services')
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
        setCategories(grouped);
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

          return (
            <div key={category.id} data-category={category.filterKey} className="mb-16 last:mb-0">
              <div id={category.anchorId} className="scroll-mt-24" />
              <div className="mb-6 flex items-center gap-4">
                <span className="font-display text-[0.68rem] font-bold uppercase tracking-[0.15em] text-corematrix-green400">
                  {category.label}
                </span>
                <div className="h-px flex-1 bg-corematrix-border" />
              </div>

              {category.featured && (
                <div className="reveal relative mb-8 overflow-hidden rounded-3xl border border-corematrix-border2 bg-corematrix-card2 lg:grid lg:grid-cols-2">
                  <div className="absolute left-0 right-0 top-0 z-10 h-[3px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent" />
                  <div className="relative p-8 lg:p-10">
                    <span className="inline-block rounded-full border border-corematrix-green700/30 bg-corematrix-green900/20 px-3 py-1 text-xs font-semibold text-corematrix-green400">
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
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-corematrix-green400" />
                          <span className="text-sm text-corematrix-textSecondary">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
                      >
                        {t('Get a consultation →', 'احصل على استشارة ←')}
                      </Link>
                      <Link
                        href="/services/ai-product-development"
                        className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 px-5 py-2.5 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700"
                      >
                        {t('Service overview', 'نظرة عامة على الخدمة')}
                      </Link>
                      <Link
                        href="#case-studies"
                        className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 px-5 py-2.5 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700"
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
                    className="group relative flex flex-col gap-0 overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-7 transition-all duration-300 card-glow hover:-translate-y-1 reveal"
                  >
                    <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="mb-5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-corematrix-green700/20 bg-corematrix-green900/40 text-xl text-corematrix-green400">
                      <i className={card.icon} />
                    </div>
                    <h3 className="font-display text-base font-bold text-corematrix-textPrimary">
                      {card.title}
                    </h3>
                    <p className="mt-2 flex-1 font-light leading-relaxed text-corematrix-textMuted">
                      {card.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-corematrix-green700/20 bg-corematrix-green900/20 px-2 py-1 font-mono text-xs text-corematrix-green700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                      {card.detailSlug && (
                        <Link
                          href={`/services/${card.detailSlug}`}
                          className="text-sm font-semibold text-corematrix-textSecondary transition-colors hover:text-corematrix-green400"
                        >
                          {t('Service overview →', 'نظرة عامة على الخدمة ←')}
                        </Link>
                      )}
                      <Link
                        href="/contact"
                        className="flex items-center gap-2 text-sm font-semibold text-corematrix-green400 transition-all hover:gap-3"
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
