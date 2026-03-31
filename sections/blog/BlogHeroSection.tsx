'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

const QUICK_TOPICS = [
  { label: 'All', cat: 'all' },
  { label: 'AI Development', cat: 'ai' },
  { label: 'Next.js', cat: 'nextjs' },
  { label: 'SaaS', cat: 'saas' },
  { label: 'DevOps', cat: 'devops' },
  { label: 'Tutorials', cat: 'tutorials' },
] as const;

const HERO_MINI_POSTS = [
  {
    cat: 'AI Development',
    title:
      'Building Production-Ready RAG Systems with LangChain and Next.js',
    readTime: 8,
    emoji: '🤖',
    slug: 'production-ready-rag-systems',
  },
  {
    cat: 'Next.js',
    title: 'Next.js 14 App Router: Architecture Decisions We Swear By',
    readTime: 6,
    emoji: '💻',
    slug: 'nextjs-app-router-architecture',
  },
  {
    cat: 'SaaS',
    title: 'How We Cut Infrastructure Costs by 60% Using AI Automation',
    readTime: 5,
    emoji: '☁️',
    slug: 'cut-infrastructure-costs-ai',
  },
] as const;

export function BlogHeroSection() {
  const [search, setSearch] = useState('');

  const handleSearchChange = (value: string) => {
    setSearch(value);
    window.dispatchEvent(new CustomEvent('blogSearch', { detail: value }));
  };

  const handleFilter = (cat: string) => {
    window.dispatchEvent(new CustomEvent('blogFilter', { detail: cat }));
    document.getElementById('blog-posts')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="blog-hero"
      aria-labelledby="blog-hero-heading"
      className="relative overflow-hidden border-b border-corematrix-border bg-corematrix-bg1 pb-16 pt-36"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.15]"
        aria-hidden
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="blog-hero-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#1a3525"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blog-hero-grid)" />
        </svg>
      </div>
      <div
        className="pointer-events-none absolute -right-24 -top-44 h-[700px] w-[700px] rounded-full bg-corematrix-green700 opacity-[0.10] blur-[130px]"
        aria-hidden
      />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-corematrix-textDim">
            <Link href="/" className="hover:text-corematrix-textMuted">
              Home
            </Link>
            <span aria-hidden>›</span>
            <span className="text-corematrix-green400">Blog</span>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corematrix-green400">
            <span className="h-1.5 w-1.5 rounded-full bg-corematrix-green400 dot-pulse" />
            Engineering Blog
          </div>

          <h1
            id="blog-hero-heading"
            className="font-display text-[clamp(2.2rem,4vw,3.8rem)] font-extrabold leading-[1.06] tracking-tight text-corematrix-textPrimary"
          >
            Insights From the{' '}
            <span className="not-italic text-corematrix-green400">
              AI & Engineering
            </span>{' '}
            Frontier
          </h1>

          <p className="mt-6 max-w-[560px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            Deep dives, tutorials, and real-world lessons from our engineering
            team — covering AI development, Next.js, LLM integration, SaaS
            architecture, and modern software craft.
          </p>

          <div className="mt-6 flex max-w-[460px] gap-3">
            <div className="relative flex-1">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-corematrix-textDim"
                aria-hidden
              >
                🔍
              </span>
              <input
                type="search"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-lg border border-corematrix-border bg-corematrix-card pl-10 pr-4 py-2.5 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="rounded-lg bg-corematrix-green700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              Search
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {QUICK_TOPICS.map((t) => (
              <button
                key={t.cat}
                type="button"
                onClick={() => handleFilter(t.cat)}
                className="rounded-full border border-corematrix-border bg-corematrix-card px-4 py-1.5 text-xs font-medium text-corematrix-textMuted transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-corematrix-border2 bg-corematrix-card2 p-4 text-center">
              <span className="font-display text-2xl font-extrabold text-corematrix-green400">
                48+
              </span>
              <p className="mt-1 text-xs text-corematrix-textDim">Articles</p>
            </div>
            <div className="rounded-xl border border-corematrix-border2 bg-corematrix-card2 p-4 text-center">
              <span className="font-display text-2xl font-extrabold text-corematrix-green400">
                12k
              </span>
              <p className="mt-1 text-xs text-corematrix-textDim">
                Readers/mo
              </p>
            </div>
            <div className="rounded-xl border border-corematrix-border2 bg-corematrix-card2 p-4 text-center">
              <span className="font-display text-2xl font-extrabold text-corematrix-green400">
                2×
              </span>
              <p className="mt-1 text-xs text-corematrix-textDim">
                Weekly posts
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {HERO_MINI_POSTS.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="flex items-start gap-3 rounded-xl border border-corematrix-border bg-corematrix-card p-3.5 transition-all hover:translate-x-1 hover:border-corematrix-border2"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-corematrix-green700/20 bg-corematrix-green900/40 text-lg">
                  {p.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-corematrix-green700">
                    {p.cat}
                  </p>
                  <p className="mt-0.5 line-clamp-2 font-display text-sm font-bold text-corematrix-textPrimary">
                    {p.title}
                  </p>
                  <p className="mt-1 text-xs text-corematrix-textDim">
                    {p.readTime} min read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
