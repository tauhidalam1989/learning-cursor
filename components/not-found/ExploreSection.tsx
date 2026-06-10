'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { EXPLORE_CARDS } from '@/data/notFoundData';
import { useLanguage } from '@/context/LanguageContext';

export function ExploreSection() {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section
      aria-labelledby="explore-heading"
      className="border-t border-corematrix-border bg-corematrix-bg1 py-20"
    >
      <Container>
        <MarketingSectionHeader
          label={t('YOU MIGHT BE LOOKING FOR', 'قد تكون تبحث عن')}
          title={t('Explore What We Do Best', 'استكشف ما تميزنا في بنائه')}
          titleId="explore-heading"
          description={t('Find what you need — from AI development to dedicated teams.', 'اعثر على ما تحتاجه — من خدمات الذكاء الاصطناعي إلى الفرق المخصصة.')}
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORE_CARDS.map((card) => {
            const title = isAr ? card.title_ar : card.title_en;
            const description = isAr ? card.description_ar : card.description_en;
            const linkLabel = isAr ? card.linkLabel_ar : card.linkLabel_en;
            return (
              <Link
                key={title}
                href={card.href}
                className="reveal group relative flex flex-col gap-0 overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-7 transition-all duration-300 card-glow hover:-translate-y-1"
              >
                <div
                  className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
                <span className="mb-4 block text-xl text-corematrix-green400" aria-hidden>
                  <i className={card.icon} />
                </span>
                <h3 className="font-display text-base font-bold text-corematrix-textPrimary">
                  {title}
                </h3>
                <p className="mt-2 flex-1 font-light text-corematrix-textMuted leading-relaxed">
                  {description}
                </p>
                <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-corematrix-green400 transition-all group-hover:gap-2.5">
                  {linkLabel}
                  <span aria-hidden>→</span>
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
