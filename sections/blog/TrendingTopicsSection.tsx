'use client';

import { TRENDING_TOPICS } from '@/data/blogData';

export function TrendingTopicsSection() {
  const handleTopicClick = (category: string) => {
    window.dispatchEvent(new CustomEvent('blogFilter', { detail: category }));
    document.getElementById('blog-posts')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="trending-topics"
      aria-labelledby="trending-topics-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="section-label text-corematrix-green400">TRENDING NOW</p>
          <h2
            id="trending-topics-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Topics Readers Are Exploring Most
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-corematrix-textSecondary">
            See what&apos;s resonating with our audience this month.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-border sm:grid-cols-4">
          {TRENDING_TOPICS.map((topic) => (
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
                {topic.postCount} articles · {topic.monthlyReads} reads/mo
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
