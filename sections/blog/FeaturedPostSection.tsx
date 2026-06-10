'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { getAllDbPosts } from '@/lib/blog';
import { useLanguage } from '@/context/LanguageContext';
import type { BlogPost } from '@/types/blog';

export function FeaturedPostSection() {
  const { language } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    async function loadFeatured() {
      const posts = await getAllDbPosts(language);
      if (posts && posts.length > 0) {
        setPost(posts[0]);
      } else {
        setPost(null);
      }
    }
    loadFeatured();
  }, [language]);

  if (!post) return null;

  const imageUrl = post.coverImage 
    ? (post.coverImage.startsWith('http') ? post.coverImage : `${post.coverImage}`)
    : null;

  return (
    <section
      id="featured-post"
      aria-labelledby="featured-post-heading"
      className="bg-corematrix-bg0 pb-0 pt-16"
    >
      <Container>
        <div className="reveal relative overflow-hidden rounded-3xl border border-corematrix-border2 bg-corematrix-card2 lg:grid lg:grid-cols-[1.1fr_1fr]">
          <div
            className="absolute left-0 right-0 top-0 z-10 h-[3px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent"
            aria-hidden
          />
          <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-corematrix-bg2">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={post.title} 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            ) : (
              <>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-corematrix-green900/60 to-corematrix-card2"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.12] blur-[80px]"
                  aria-hidden
                />
                <i className="fas fa-newspaper text-7xl text-corematrix-green400/60 relative z-10" aria-hidden />
              </>
            )}
            <span className="absolute top-4 left-4 z-10 rounded-full border border-corematrix-green700/30 bg-corematrix-green900/40 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-corematrix-green400">
              Featured
            </span>
          </div>
          <div className="p-8 lg:p-11">
            <p className="font-display text-[0.68rem] font-bold uppercase tracking-[0.12em] text-corematrix-green400">
              {post.categoryLabel}
            </p>
            <h2
              id="featured-post-heading"
              className="mt-3 font-display text-2xl font-extrabold tracking-tight text-corematrix-textPrimary lg:text-3xl"
            >
              {post.title}
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-corematrix-textMuted">
              {post.excerpt}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-corematrix-green700/20 bg-corematrix-green900/20 px-2 py-0.5 font-mono text-[0.65rem] text-corematrix-green700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-corematrix-textDim">
              <span>{post.author.name}</span>
              <span aria-hidden>·</span>
              <span>{post.publishedAt}</span>
              <span aria-hidden>·</span>
              <span>{post.readTime} min read</span>
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              Read Full Article →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
