import { blogJsonLd } from '@/lib/seo/jsonld';
import { BlogHeroSection } from '@/sections/blog/BlogHeroSection';
import { BlogCategoryNav } from '@/sections/blog/BlogCategoryNav';
import { FeaturedPostSection } from '@/sections/blog/FeaturedPostSection';
import { BlogPostsSection } from '@/sections/blog/BlogPostsSection';
import { ArticleSeriesSection } from '@/sections/blog/ArticleSeriesSection';
import { BlogNewsletterSection } from '@/sections/blog/BlogNewsletterSection';
import { TrendingTopicsSection } from '@/sections/blog/TrendingTopicsSection';
import { LatestPostsSection } from '@/sections/blog/LatestPostsSection';
import { BlogCtaSection } from '@/sections/blog/BlogCtaSection';

export const metadata = {
  title: 'Blog — Corematrix | AI, Web Development & Engineering Insights',
  description:
    'The Corematrix engineering blog. Deep dives on AI development, Next.js, LLM integration, SaaS architecture, and modern software engineering from our team.',
  keywords: [
    'AI development blog',
    'Next.js tutorials',
    'LLM integration guide',
    'SaaS architecture articles',
    'software engineering blog',
    'RAG pipeline tutorial',
    'machine learning blog',
    'TypeScript tutorials',
    'DevOps best practices',
    'full-stack development articles',
  ],
  openGraph: {
    title: 'Corematrix Blog — AI & Engineering Insights',
    description:
      'Deep dives, tutorials, and real-world lessons on AI development, Next.js, SaaS architecture, and modern software engineering.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://corematrix.com'}/blog`,
    siteName: 'Corematrix',
    type: 'website' as const,
  },
};

const jsonLd = blogJsonLd();

// TODO: Replace placeholder data with CMS fetches
// e.g. const posts = await getPublishedPosts(); from lib/posts.ts
export default function BlogPage() {
  return (
    <div className="bg-corematrix-bg0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHeroSection />
      <BlogCategoryNav />
      <FeaturedPostSection />
      <BlogPostsSection />
      <ArticleSeriesSection />
      <BlogNewsletterSection />
      <TrendingTopicsSection />
      <LatestPostsSection />
      <BlogCtaSection />
    </div>
  );
}
