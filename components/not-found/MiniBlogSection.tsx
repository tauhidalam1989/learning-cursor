'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { getAllDbPosts } from '@/lib/blog';
import { useLanguage } from '@/context/LanguageContext';
import type { BlogPost } from '@/types/blog';

export function MiniBlogSection() {
  const { language, t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function loadMiniPosts() {
      const dbPosts = await getAllDbPosts(language);
      setPosts(dbPosts.slice(0, 3));
    }
    loadMiniPosts();
  }, [language]);

  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="mini-blog-heading"
      className="border-t border-corematrix-border bg-corematrix-bg1 py-16"
    >
      <Container>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2
            id="mini-blog-heading"
            className="flex items-center gap-2 font-display text-lg font-bold text-corematrix-textPrimary"
          >
            <i className="fas fa-book-open text-corematrix-green400" aria-hidden="true" />
            {t("While You're Here — Read Something Useful", 'بينما أنت هنا — اقرأ شيئاً مفيداً')}
          </h2>
          <Link
            href="/blog"
            className="text-sm font-semibold text-corematrix-green400 transition hover:text-corematrix-green300"
          >
            {t('View all articles →', 'عرض كل المقالات ←')}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {posts.map((post) => {
            const imageUrl = post.coverImage 
              ? (post.coverImage.startsWith('http') ? post.coverImage : `${post.coverImage}`)
              : null;
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-1.5 rounded-2xl border border-corematrix-border bg-corematrix-card2 p-5 transition-all hover:-translate-y-0.5 hover:border-corematrix-border2"
              >
                <div
                  className="relative mb-3 aspect-video w-full rounded-xl bg-gradient-to-br from-corematrix-green900/40 to-corematrix-card border border-corematrix-border2 overflow-hidden"
                >
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={post.title} 
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <i className="fas fa-newspaper text-3xl text-corematrix-green400/60" aria-hidden />
                    </div>
                  )}
                </div>
                <span className="font-display text-[0.62rem] font-bold uppercase tracking-wider text-corematrix-green400">
                  {post.categoryLabel}
                </span>
                <h3 className="font-display text-sm font-bold leading-snug text-corematrix-textPrimary">
                  {post.title}
                </h3>
                <p className="text-xs text-corematrix-textDim">
                  {post.author.name} · {post.readTime} {t('min read', 'دقائق قراءة')}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
