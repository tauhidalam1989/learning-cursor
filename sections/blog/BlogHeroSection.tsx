'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';

type Topic = { label: string; cat: string };
type MiniPost = { cat: string; title: string; readTime: number; emoji: string; slug: string };

const QUICK_TOPICS: readonly Topic[] = [
  { label: 'All', cat: 'all' },
  { label: 'AI Development', cat: 'ai' },
  { label: 'Next.js', cat: 'nextjs' },
  { label: 'SaaS', cat: 'saas' },
  { label: 'DevOps', cat: 'devops' },
  { label: 'Tutorials', cat: 'tutorials' },
];

const HERO_MINI_POSTS: readonly MiniPost[] = [
  {
    cat: 'AI Development',
    title:
      'Building Production-Ready RAG Systems with LangChain and Next.js',
    readTime: 8,
    emoji: 'fas fa-robot',
    slug: 'production-ready-rag-systems',
  },
  {
    cat: 'Next.js',
    title: 'Next.js 14 App Router: Architecture Decisions We Swear By',
    readTime: 6,
    emoji: 'fas fa-code',
    slug: 'nextjs-app-router-architecture',
  },
  {
    cat: 'SaaS',
    title: 'How We Cut Infrastructure Costs by 60% Using AI Automation',
    readTime: 5,
    emoji: 'fas fa-cloud',
    slug: 'cut-infrastructure-costs-ai',
  },
];

// Explicitly typed translation maps for i18n
const topicTranslations: Record<string, string> = {
  'All': 'الكل',
  'AI Development': 'تطوير الذكاء الاصطناعي',
  'Next.js': 'Next.js',
  'SaaS': 'منصات SaaS',
  'DevOps': 'DevOps',
  'Tutorials': 'دروس تعليمية',
};

const miniPostCatTranslations: Record<string, string> = {
  'AI Development': 'تطوير الذكاء الاصطناعي',
  'Next.js': 'Next.js',
  'SaaS': 'منصات SaaS',
};

const miniPostTitleTranslations: Record<string, string> = {
  'Building Production-Ready RAG Systems with LangChain and Next.js':
    'بناء أنظمة RAG جاهزة للإنتاج باستخدام LangChain و Next.js',
  'Next.js 14 App Router: Architecture Decisions We Swear By':
    'Next.js 14 App Router: قرارات هندسية معمارية نلتزم بها',
  'How We Cut Infrastructure Costs by 60% Using AI Automation':
    'كيف قمنا بخفض تكاليف البنية التحتية بنسبة 60% باستخدام أتمتة الذكاء الاصطناعي',
};

const TAG_THEMES = [
  { bg: 'bg-cyan-950/20', text: 'text-cyan-300', border: 'border-cyan-500/20' },
  { bg: 'bg-amber-950/20', text: 'text-amber-300', border: 'border-amber-500/20' },
  { bg: 'bg-indigo-950/20', text: 'text-indigo-300', border: 'border-indigo-500/20' },
  { bg: 'bg-purple-950/20', text: 'text-purple-300', border: 'border-purple-500/20' },
  { bg: 'bg-orange-950/20', text: 'text-orange-300', border: 'border-orange-500/20' },
  { bg: 'bg-sky-950/20', text: 'text-sky-300', border: 'border-sky-500/20' },
  { bg: 'bg-rose-950/20', text: 'text-rose-300', border: 'border-rose-500/20' },
  { bg: 'bg-emerald-950/20', text: 'text-emerald-300', border: 'border-emerald-500/20' },
];

function getTagTheme(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % TAG_THEMES.length;
  return TAG_THEMES[index];
}

function getMiniPostTheme(cat: string) {
  switch (cat) {
    case 'AI Development':
      return {
        cardBg: 'bg-purple-950/20',
        cardBorder: 'border-purple-500/15',
        iconBg: 'bg-purple-500/10 border-purple-500/20',
        iconColor: 'text-purple-400',
        catColor: 'text-purple-400',
        hoverBorder: 'hover:border-purple-500/45',
        hoverBg: 'hover:bg-purple-950/35',
        hoverGlow: 'hover:shadow-[0_0_15px_rgba(168,85,247,0.12)]',
        titleColor: 'text-purple-300',
      };
    case 'Next.js':
      return {
        cardBg: 'bg-cyan-950/20',
        cardBorder: 'border-cyan-500/15',
        iconBg: 'bg-cyan-500/10 border-cyan-500/20',
        iconColor: 'text-cyan-400',
        catColor: 'text-cyan-400',
        hoverBorder: 'hover:border-cyan-500/45',
        hoverBg: 'hover:bg-cyan-950/35',
        hoverGlow: 'hover:shadow-[0_0_15px_rgba(6,182,212,0.12)]',
        titleColor: 'text-cyan-300',
      };
    case 'SaaS':
    default:
      return {
        cardBg: 'bg-amber-950/20',
        cardBorder: 'border-amber-500/15',
        iconBg: 'bg-amber-500/10 border-amber-500/20',
        iconColor: 'text-amber-400',
        catColor: 'text-amber-400',
        hoverBorder: 'hover:border-amber-500/45',
        hoverBg: 'hover:bg-amber-950/35',
        hoverGlow: 'hover:shadow-[0_0_15px_rgba(245,158,11,0.12)]',
        titleColor: 'text-amber-300',
      };
  }
}

export function BlogHeroSection() {
  const { t } = useLanguage();
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
      className="relative overflow-hidden border-b border-corematrix-border bg-corematrix-bg1 pb-12 pt-12"
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
              {t('Home', 'الرئيسية')}
            </Link>
            <span aria-hidden>›</span>
            <span className="text-corematrix-green400">{t('Blog', 'المدونة')}</span>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corematrix-green400">
            <span className="h-1.5 w-1.5 rounded-full bg-corematrix-green400 dot-pulse" />
            {t('Engineering Blog', 'مدونة الهندسة')}
          </div>

          <h1
            id="blog-hero-heading"
            className="font-display text-[clamp(2.2rem,4vw,3.8rem)] font-extrabold leading-[1.06] tracking-tight text-corematrix-textPrimary"
          >
            {t('Insights From the ', 'رؤى وأفكار من آفاق ')}
            <span className="not-italic text-corematrix-green400">
              {t('AI & Engineering', 'الذكاء الاصطناعي والهندسة')}
            </span>{' '}
            {t('Frontier', '')}
          </h1>

          <p className="mt-6 max-w-[560px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            {t(
              'Deep dives, tutorials, and real-world lessons from our engineering team — covering AI development, Next.js, LLM integration, SaaS architecture, and modern software craft.',
              'تحليلات عميقة، دروس تعليمية، وتجارب واقعية من فريقنا الهندسي — تغطي تطوير الذكاء الاصطناعي، Next.js، تكامل نماذج اللغة الكبيرة (LLM)، بنية SaaS المعمارية، وحرفة البرمجيات الحديثة.'
            )}
          </p>

          <div className="mt-6 flex max-w-[460px] gap-3">
            <div className="relative flex-1">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-corematrix-green400 text-sm"
                aria-hidden="true"
              >
                <i className="fas fa-search" />
              </span>
              <input
                type="search"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={t('Search articles...', 'البحث عن المقالات...')}
                className="w-full rounded-lg border border-corematrix-border bg-corematrix-card pl-10 pr-4 py-2.5 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="rounded-lg bg-corematrix-green700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              {t('Search', 'بحث')}
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {QUICK_TOPICS.map((topic) => {
              const theme = getTagTheme(topic.label);
              return (
                <button
                  key={topic.cat}
                  type="button"
                  onClick={() => handleFilter(topic.cat)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${theme.bg} ${theme.border} ${theme.text}`}
                >
                  {t(topic.label, topicTranslations[topic.label] ?? topic.label)}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-5 grid grid-cols-3 gap-3">
            <div className="group rounded-xl border border-purple-500/15 bg-purple-950/20 p-4 text-center transition-all duration-300 hover:border-purple-500/35 hover:bg-purple-950/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:-translate-y-0.5">
              <span className="font-display text-2xl font-extrabold text-purple-400 transition-colors duration-300 group-hover:text-purple-300">
                48+
              </span>
              <p className="mt-1 text-xs text-corematrix-textDim group-hover:text-corematrix-textSecondary/85">{t('Articles', 'مقالة')}</p>
            </div>
            <div className="group rounded-xl border border-cyan-500/15 bg-cyan-950/20 p-4 text-center transition-all duration-300 hover:border-cyan-500/35 hover:bg-cyan-950/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:-translate-y-0.5">
              <span className="font-display text-2xl font-extrabold text-cyan-400 transition-colors duration-300 group-hover:text-cyan-300">
                12k
              </span>
              <p className="mt-1 text-xs text-corematrix-textDim group-hover:text-corematrix-textSecondary/85">
                {t('Readers/mo', 'قارئ شهرياً')}
              </p>
            </div>
            <div className="group rounded-xl border border-amber-500/15 bg-amber-950/20 p-4 text-center transition-all duration-300 hover:border-amber-500/35 hover:bg-amber-950/30 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:-translate-y-0.5">
              <span className="font-display text-2xl font-extrabold text-amber-400 transition-colors duration-300 group-hover:text-amber-300">
                2×
              </span>
              <p className="mt-1 text-xs text-corematrix-textDim group-hover:text-corematrix-textSecondary/85">
                {t('Weekly posts', 'منشورات أسبوعية')}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {HERO_MINI_POSTS.map((p) => {
              const theme = getMiniPostTheme(p.cat);
              return (
                <div
                  key={p.slug}
                  className={`group flex items-start gap-3 rounded-xl border p-3.5 transition-all duration-300 ${theme.cardBg} ${theme.cardBorder} ${theme.hoverBg} ${theme.hoverBorder} ${theme.hoverGlow}`}
                >
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border transition-all duration-300 group-hover:scale-105 ${theme.iconBg} ${theme.iconColor}`}>
                    <i className={p.emoji} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-[0.65rem] font-bold uppercase tracking-wider transition-colors duration-300 ${theme.catColor}`}>
                      {t(p.cat, miniPostCatTranslations[p.cat] ?? p.cat)}
                    </p>
                    <p className={`mt-0.5 line-clamp-2 font-display text-sm font-bold text-corematrix-textPrimary transition-colors duration-300 group-hover:${theme.titleColor}`}>
                      {t(p.title, miniPostTitleTranslations[p.title] ?? p.title)}
                    </p>
                    <p className="mt-1 text-xs text-corematrix-textDim/80 group-hover:text-corematrix-textSecondary/80">
                      {p.readTime} {t('min read', 'دقائق للقراءة')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
