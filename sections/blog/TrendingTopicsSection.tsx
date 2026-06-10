'use client';

import { useState, useEffect } from 'react';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { getAllDbPosts } from '@/lib/blog';
import { useLanguage } from '@/context/LanguageContext';

export function TrendingTopicsSection() {
  const { language, t } = useLanguage();
  const [topics, setTopics] = useState<{ category: string; icon: string; name: string; postCount: number; monthlyReads: string; barWidth: number }[]>([]);

  useEffect(() => {
    async function loadTrending() {
      const posts = await getAllDbPosts(language);
      if (posts.length === 0) {
        setTopics([]);
        return;
      }

      // Deriving unique categories dynamically from the active posts retrieved from DB
      const uniqueCategoryKeys = Array.from(new Set(posts.map((p) => p.category)));
      const counts = uniqueCategoryKeys.map(catKey => posts.filter((p) => p.category === catKey).length);
      const maxCount = Math.max(1, ...counts);
      
      const emojiMap: Record<string, string> = {
        ai: '🧠',
        nextjs: '💻',
        saas: '☁️',
        devops: '🛡️',
        mobile: '📱',
        tutorials: '📚',
      };

      const computed = uniqueCategoryKeys.map((catKey) => {
        const count = posts.filter((p) => p.category === catKey).length;
        const firstPost = posts.find((p) => p.category === catKey);
        const name = firstPost ? firstPost.categoryLabel : catKey.toUpperCase();
        
        // Dynamically compute reads based on articles count
        const reads = count > 0 ? `${(count * 1.8).toFixed(1)}k` : '0k';
        const barWidth = Math.max(15, Math.min(100, Math.round((count / maxCount) * 100)));
        const icon = emojiMap[catKey] || '📝';
        
        return {
          category: catKey,
          icon,
          name,
          postCount: count,
          monthlyReads: reads,
          barWidth,
        };
      });

      setTopics(computed);
    }
    loadTrending();
  }, [language]);

  const handleTopicClick = (category: string) => {
    window.dispatchEvent(new CustomEvent('blogFilter', { detail: category }));
    document.getElementById('blog-posts')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (topics.length === 0) return null;

  return (
    <section
      id="trending-topics"
      aria-labelledby="trending-topics-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MarketingSectionHeader
          label={t('TRENDING NOW', 'شائع الآن')}
          title={t('Topics Readers Are Exploring Most', 'المواضيع الأكثر استكشافاً')}
          titleId="trending-topics-heading"
          description={t("See what's resonating with our audience this month.", 'تعرف على ما يثير اهتمام جمهورنا هذا الشهر.')}
        />

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-border sm:grid-cols-3 lg:grid-cols-6">
          {topics.map((topic) => (
            <button
              key={topic.category}
              type="button"
              onClick={() => handleTopicClick(topic.category)}
              className="block bg-corematrix-card p-7 text-left transition-colors hover:bg-corematrix-card2"
            >
              <span className="mb-3 block text-3xl" aria-hidden>
                {topic.icon}
              </span>
              <p className="mb-1 font-display text-sm font-bold text-corematrix-textPrimary">
                {topic.name}
              </p>
              <p className="mb-3 text-xs text-corematrix-textDim">
                {topic.postCount} {t('articles', 'مقالات')} · {topic.monthlyReads} {t('reads/mo', 'قراءة/شهر')}
              </p>
              <div className="h-[2px] overflow-hidden rounded-full bg-corematrix-border">
                <div
                  className="h-full bg-gradient-to-r from-corematrix-green700 to-corematrix-green400"
                  style={{ width: `${topic.barWidth}%` }}
                  aria-hidden
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
