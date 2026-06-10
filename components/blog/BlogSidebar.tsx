'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllDbPosts } from '@/lib/blog';
import { useLanguage } from '@/context/LanguageContext';
import type { BlogPost } from '@/types/blog';

const FEATURED_AUTHOR = {
  initials: 'SR',
  name: 'Sara Raza',
  role: 'CTO',
  bio: 'Leads our AI and engineering practice. Former ML engineer at scale-ups.',
  bioAr: 'تقود ممارسة الذكاء الاصطناعي والهندسة لدينا. مهندسة تعلم آلي سابقة في شركات التكنولوجيا الكبرى.',
};

export function BlogSidebar() {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([]);
  const [topics, setTopics] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    async function loadData() {
      const posts = await getAllDbPosts(language);
      // Fallback or slice the first 5 published posts as popular
      setPopularPosts(posts.slice(0, 5));

      // Extract unique categories dynamically
      const uniqueCategories = new Set<string>();
      const categoryMap = new Map<string, string>();

      posts.forEach(post => {
        if (post.category) {
          uniqueCategories.add(post.category);
          if (post.categoryLabel) {
            categoryMap.set(post.category, post.categoryLabel);
          }
        }
      });

      const computedTopics = Array.from(uniqueCategories).map(catId => ({
        id: catId,
        name: categoryMap.get(catId) || catId.toUpperCase()
      }));
      setTopics(computedTopics);
    }
    loadData();
  }, [language]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setNewsletterLoading(true);
    setNewsletterError(null);
    try {
      const res = await fetch('/api/newsletters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.status === 409) {
        setNewsletterError(t('This email is already subscribed!', 'هذا البريد مشترك بالفعل!'));
        setNewsletterLoading(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setNewsletterError(data.message || t('Something went wrong.', 'حدث خطأ ما.'));
        setNewsletterLoading(false);
        return;
      }

      setNewsletterSubmitted(true);
    } catch {
      setNewsletterError(t('Network error. Please try again.', 'خطأ في الاتصال. حاول مجدداً.'));
    } finally {
      setNewsletterLoading(false);
    }
  };

  const handleTopicClick = (cat: string) => {
    window.dispatchEvent(new CustomEvent('blogFilter', { detail: cat }));
    document.getElementById('blog-posts')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="sticky top-[136px] space-y-6">
      <div className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6">
        <h3 className="font-display text-sm font-bold text-corematrix-textPrimary">
          {t('Newsletter', 'النشرة الإخبارية')}
        </h3>
        {newsletterSubmitted ? (
          <p className="mt-3 text-sm text-corematrix-green400">
            {t("✓ You're subscribed! Check your inbox.", '✓ لقد تم اشتراكك بنجاح! تفقد بريدك الوارد.')}
          </p>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="mt-4 space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setNewsletterError(null); }}
              placeholder={t('Your email', 'بريدك الإلكتروني')}
              className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-3 py-2.5 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none"
            />
            {newsletterError && (
              <p className="text-xs font-medium text-amber-400">
                <i className="fas fa-exclamation-circle mr-1" />
                {newsletterError}
              </p>
            )}
            <button
              type="submit"
              disabled={newsletterLoading}
              className="w-full rounded-lg bg-corematrix-green700 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500 disabled:opacity-50 cursor-pointer"
            >
              {newsletterLoading ? t('Subscribing...', 'جاري الاشتراك...') : t('Subscribe', 'اشترك الآن')}
            </button>
          </form>
        )}
      </div>

      <div className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6">
        <h3 className="font-display text-sm font-bold text-corematrix-textPrimary">
          {t('Popular Posts', 'المقالات الشائعة')}
        </h3>
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
                {post.readTime} {t('min read', 'دقائق قراءة')}
              </p>
            </li>
          ))}
        </ol>
        {popularPosts.length === 0 && (
          <p className="text-xs text-corematrix-textMuted mt-2">{t('No popular articles found.', 'لا توجد مقالات شائعة.')}</p>
        )}
      </div>

      <div className="rounded-2xl border border-corematrix-border bg-corematrix-card p-6">
        <h3 className="font-display text-sm font-bold text-corematrix-textPrimary">
          {t('Topics', 'المواضيع')}
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => handleTopicClick(t.id)}
              className="rounded-full border border-corematrix-border bg-corematrix-bg0 px-3 py-1.5 text-xs font-medium text-corematrix-textMuted transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-6">
        <h3 className="font-display text-sm font-bold text-corematrix-textPrimary">
          {t('Featured Author', 'الكاتب المتميز')}
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
        <p className="mt-3 text-xs font-light text-corematrix-textMuted leading-relaxed">
          {language === 'ar' ? FEATURED_AUTHOR.bioAr : FEATURED_AUTHOR.bio}
        </p>
        <div className="mt-4 pt-1">
          <Link
            href="/blog?author=sara"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-corematrix-green400 hover:gap-3 transition-all duration-300"
          >
            {t('View All Articles →', 'عرض كل المقالات ←')}
          </Link>
        </div>
      </div>
    </aside>
  );
}
