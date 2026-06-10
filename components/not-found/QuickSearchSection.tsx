'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { QUICK_LINKS } from '@/data/notFoundData';
import { useLanguage } from '@/context/LanguageContext';

export function QuickSearchSection() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [filteredLinks, setFilteredLinks] = useState<{ icon: string; label: string; href: string }[]>([]);

  useEffect(() => {
    const mapped = QUICK_LINKS.map((l) => ({
      icon: l.icon,
      href: l.href,
      label: language === 'ar' ? l.label_ar : l.label_en,
    }));

    if (!query.trim()) {
      setFilteredLinks(mapped);
      return;
    }
    setFilteredLinks(
      mapped.filter((l) => l.label.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, language]);

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/blog?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section
      aria-labelledby="quick-search-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-14 text-center"
    >
      <Container>
        <h3
          id="quick-search-heading"
          className="font-display text-xl font-bold text-corematrix-textPrimary"
        >
          {t('Quick Navigation', 'التنقل السريع')}
        </h3>
        <p className="mt-2 text-sm text-corematrix-textMuted">
          {t('Search or browse common pages to find what you need.', 'ابحث أو تصفح الصفحات الشائعة للعثور على ما تحتاجه.')}
        </p>
        <div className="mx-auto mt-6 flex max-w-md items-center gap-2">
          <label htmlFor="nf-search" className="sr-only">
            {t('Search site', 'البحث في الموقع')}
          </label>
          <input
            id="nf-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={t('Search pages...', 'البحث في الصفحات...')}
            aria-label={t('Search site', 'البحث في الموقع')}
            className="flex-1 rounded-xl border border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none placeholder:text-corematrix-textDim focus:border-corematrix-green700 focus:ring-2 focus:ring-corematrix-green700/20"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="rounded-xl bg-corematrix-green700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
          >
            {t('Search →', 'بحث ←')}
          </button>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {filteredLinks.length > 0 ? (
            filteredLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-corematrix-border bg-corematrix-card px-4 py-2 text-xs font-medium text-corematrix-textSecondary transition hover:border-corematrix-border2 hover:text-corematrix-textPrimary"
              >
                <span className="text-corematrix-green400 text-xs" aria-hidden>
                  <i className={link.icon} />
                </span>
                {link.label}
              </Link>
            ))
          ) : (
            <p className="text-sm text-corematrix-textDim">{t('No matches found', 'لم يتم العثور على تطابقات')}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
