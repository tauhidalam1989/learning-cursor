'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getAllDbPosts } from '@/lib/blog';
import { useLanguage } from '@/context/LanguageContext';
import type { BlogPost } from '@/types/blog';

export function LatestPostsSection() {
  const { language, t } = useLanguage();
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    async function loadLatest() {
      const posts = await getAllDbPosts(language);
      setLatestPosts(posts.slice(0, 6)); // latest 6 published posts
      setTotalCount(posts.length);
    }
    loadLatest();
  }, [language]);

  if (latestPosts.length === 0) return null;

  return (
    <section
      id="latest-posts"
      aria-labelledby="latest-posts-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="section-label text-corematrix-green400">{t('LATEST', 'آخر الأخبار')}</p>
            <h2
              id="latest-posts-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              {t('Fresh Off the Press', 'جديد من المطبعة')}
            </h2>
          </div>
          <Link
            href="/blog"
            className="rounded-lg border border-corematrix-border px-5 py-2.5 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
          >
            {t('View All Articles →', 'عرض كل المقالات ←')}
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {latestPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex gap-5 rounded-2xl border border-corematrix-border bg-corematrix-card p-6 transition-all hover:-translate-y-0.5 hover:border-corematrix-border2 hover:bg-corematrix-card2"
            >
              <span className="mt-1 flex h-11 w-11 flex-shrink-0 font-display text-[2rem] font-extrabold leading-none text-corematrix-textDim">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.65rem] font-bold uppercase tracking-wider text-corematrix-green700">
                  {post.categoryLabel}
                </p>
                <h3 className="mt-1 font-display text-base font-bold leading-snug text-corematrix-textPrimary hover:text-corematrix-green400">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs text-corematrix-textDim">
                  {post.author.name} · {post.publishedAt} · {post.readTime} {t('min read', 'دقائق قراءة')}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-corematrix-border px-8 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
          >
            {language === 'ar' 
              ? `عرض جميع المقالات الـ ${totalCount} ←` 
              : `View All ${totalCount} Articles →`}
          </Link>
        </div>
      </Container>
    </section>
  );
}
