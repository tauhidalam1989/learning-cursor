import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { ARTICLE_SERIES } from '@/data/blogData';

export function ArticleSeriesSection() {
  return (
    <section
      id="article-series"
      aria-labelledby="article-series-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label="ARTICLE SERIES"
          title="Deep-Dive Series Worth Reading Start to Finish"
          titleId="article-series-heading"
          description="Multi-part guides that take you from fundamentals to production."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {ARTICLE_SERIES.map((s) => (
            <Link
              key={s.slug}
              href={`/blog/series/${s.slug}`}
              className="reveal group relative overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-7 transition-all duration-300 card-glow hover:-translate-y-1"
            >
              <div
                className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-corematrix-green700/20 bg-corematrix-green900/40 text-2xl">
                {s.icon}
              </div>
              <p className="font-display text-[0.62rem] font-bold uppercase tracking-[0.1em] text-corematrix-green700">
                {s.seriesLabel}
              </p>
              <h3 className="mt-1 font-display text-base font-extrabold tracking-tight text-corematrix-textPrimary">
                {s.title}
              </h3>
              <p className="mt-3 mb-4 text-sm font-light leading-relaxed text-corematrix-textMuted">
                {s.description}
              </p>
              <div className="flex items-center justify-between text-xs text-corematrix-textDim">
                <span>
                  {s.postCount} parts · {s.totalReadTime} min total
                </span>
                <span className="font-semibold text-corematrix-green400 group-hover:underline">
                  Start reading →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
