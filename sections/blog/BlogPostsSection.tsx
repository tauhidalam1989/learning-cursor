'use client';

import { useState, useEffect, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { PostCard } from '@/components/blog/PostCard';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { getAllDbPosts } from '@/lib/blog';
import { useLanguage } from '@/context/LanguageContext';
import type { BlogPost } from '@/types/blog';

const INITIAL_COUNT = 6;

export function BlogPostsSection() {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_COUNT);

  useEffect(() => {
    async function loadPosts() {
      const dbPosts = await getAllDbPosts(language);
      setPosts(dbPosts);
    }
    loadPosts();
  }, [language]);

  useEffect(() => {
    const catHandler = (e: Event) => {
      const ev = e as CustomEvent<string>;
      if (ev.detail) setActiveCategory(ev.detail);
    };
    const searchHandler = (e: Event) => {
      const ev = e as CustomEvent<string>;
      setSearchQuery(ev.detail ?? '');
    };
    window.addEventListener('blogCategoryChange', catHandler);
    window.addEventListener('blogSearch', searchHandler);
    return () => {
      window.removeEventListener('blogCategoryChange', catHandler);
      window.removeEventListener('blogSearch', searchHandler);
    };
  }, []);

  const filtered = useMemo(() => {
    let list: BlogPost[] = [...posts];
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [posts, activeCategory, searchQuery]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const allCaughtUp = filtered.length > 0 && visible.length === filtered.length;

  return (
    <section
      id="blog-posts"
      aria-labelledby="blog-posts-heading"
      className="bg-corematrix-bg0 pb-20 pt-16"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 xl:grid-cols-[1fr_320px]">
          <div>
            <h2
              id="blog-posts-heading"
              className="font-display text-2xl font-bold text-corematrix-textPrimary"
            >
              All Articles
            </h2>
            <p className="mt-2 text-sm text-corematrix-textSecondary">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}{' '}
              {activeCategory !== 'all' || searchQuery ? 'matching your filters' : ''}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {visible.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="py-12 text-center text-corematrix-textMuted">
                No articles found. Try a different category or search.
              </p>
            )}
            {filtered.length > 0 && (
              <div className="mt-8 flex items-center justify-center">
                {hasMore ? (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount((c) =>
                        Math.min(c + INITIAL_COUNT, filtered.length)
                      )
                    }
                    className="rounded-lg border border-corematrix-border px-8 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
                  >
                    Load More
                  </button>
                ) : (
                  <p className="text-sm text-corematrix-textMuted">
                    All caught up ✓
                  </p>
                )}
              </div>
            )}
          </div>
          <BlogSidebar />
        </div>
      </Container>
    </section>
  );
}
