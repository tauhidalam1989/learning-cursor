'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BLOG_CATEGORIES, BLOG_POSTS } from '@/data/blogData';

const FEATURED_AUTHOR = {
  initials: 'SR',
  name: 'Sara Raza',
  role: 'CTO',
  bio: 'Leads our AI and engineering practice. Former ML engineer at scale-ups.',
};

export function BlogSidebar() {
  const [email, setEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setNewsletterLoading(true);
    try {
      // TODO: Wire to your email marketing service (Mailchimp, ConvertKit, Resend, etc.)
      await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'newsletter',
          fullName: 'Newsletter',
          email: email.trim(),
          message: 'Newsletter signup from blog',
        }),
      });
      setNewsletterSubmitted(true);
    } catch {
      setNewsletterLoading(false);
    } finally {
      setNewsletterLoading(false);
    }
  };

  const popularPosts = [...BLOG_POSTS].slice(0, 5);

  const handleTopicClick = (cat: string) => {
    window.dispatchEvent(new CustomEvent('blogFilter', { detail: cat }));
    document.getElementById('blog-posts')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="sticky top-[136px] space-y-6">
      <div className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6">
        <h3 className="font-display text-sm font-bold text-corematrix-textPrimary">
          Newsletter
        </h3>
        {newsletterSubmitted ? (
          <p className="mt-3 text-sm text-corematrix-green400">
            ✓ You&apos;re subscribed! Check your inbox.
          </p>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="mt-3 space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-3 py-2 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={newsletterLoading}
              className="w-full rounded-lg bg-corematrix-green700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-corematrix-green500 disabled:opacity-50"
            >
              {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>

      <div className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6">
        <h3 className="font-display text-sm font-bold text-corematrix-textPrimary">
          Popular Posts
        </h3>
        {/* TODO: Sort by CMS view count */}
        <ol className="mt-4 space-y-3">
          {popularPosts.map((post, i) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex gap-3 hover:text-corematrix-green400"
              >
                <span className="flex-shrink-0 font-display text-lg font-extrabold text-corematrix-textDim">
                  {i + 1}
                </span>
                <span className="line-clamp-2 text-sm text-corematrix-textSecondary">
                  {post.title}
                </span>
              </Link>
              <p className="ml-7 mt-0.5 text-xs text-corematrix-textDim">
                {post.readTime} min read
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6">
        <h3 className="font-display text-sm font-bold text-corematrix-textPrimary">
          Topics
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {BLOG_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleTopicClick(c.id)}
              className="rounded-full border border-corematrix-border bg-corematrix-bg0 px-3 py-1.5 text-xs font-medium text-corematrix-textMuted transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-6">
        <h3 className="font-display text-sm font-bold text-corematrix-textPrimary">
          Featured Author
        </h3>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-corematrix-green900/40 font-display text-sm font-bold text-corematrix-green400">
            {FEATURED_AUTHOR.initials}
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-corematrix-textPrimary">
              {FEATURED_AUTHOR.name}
            </p>
            <p className="text-xs text-corematrix-textDim">{FEATURED_AUTHOR.role}</p>
          </div>
        </div>
        <p className="mt-3 text-xs font-light text-corematrix-textMuted">
          {FEATURED_AUTHOR.bio}
        </p>
        <Link
          href="/blog?author=sara"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-corematrix-green400 hover:gap-3"
        >
          View All Articles →
        </Link>
      </div>
    </aside>
  );
}
