'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/blog';
import type { BlogDetail } from '@/lib/blog';
import { DynamicBlogDetailClient } from '@/components/blog/DynamicBlogDetailClient';
import { Container } from '@/components/ui/Container';

interface BlogDetailWrapperProps {
  slug: string;
}

export function BlogDetailWrapper({ slug }: BlogDetailWrapperProps) {
  const [post, setPost] = useState<BlogDetail | null | undefined>(undefined);

  useEffect(() => {
    async function load() {
      const data = await getPostBySlug(slug);
      setPost(data);
    }
    load();
  }, [slug]);

  // Still loading
  if (post === undefined) {
    return (
      <div className="min-h-screen bg-corematrix-bg0 flex items-center justify-center">
        <Container>
          <div className="flex flex-col items-center gap-4 py-24 text-corematrix-textMuted">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-corematrix-green700 border-t-transparent" />
            <p className="text-sm">Loading article…</p>
          </div>
        </Container>
      </div>
    );
  }

  // Not found
  if (post === null) {
    return (
      <div className="min-h-screen bg-corematrix-bg0 flex items-center justify-center">
        <Container>
          <div className="flex flex-col items-center gap-4 py-24 text-corematrix-textMuted text-center">
            <i className="fas fa-file-slash text-5xl text-corematrix-green400/40" aria-hidden />
            <h1 className="text-2xl font-bold text-corematrix-textPrimary">Article not found</h1>
            <p className="text-sm">This post may have been removed or the URL is incorrect.</p>
            <a
              href="/blog"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-corematrix-green700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              ← Back to Blog
            </a>
          </div>
        </Container>
      </div>
    );
  }

  return <DynamicBlogDetailClient post={post} />;
}

export default BlogDetailWrapper;
