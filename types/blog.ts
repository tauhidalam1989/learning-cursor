export type PostCategory =
  | 'ai'
  | 'nextjs'
  | 'saas'
  | 'devops'
  | 'mobile'
  | 'tutorials'
  | 'backend'
  | 'data';

export type BlogAuthor = {
  initials: string;
  name: string;
  role: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  categoryLabel: string;
  tags: string[];
  author: BlogAuthor;
  publishedAt: string;
  readTime: number; // minutes
  emoji: string;
  featured?: boolean;
  coverImage?: string | null;
};

export type ArticleSeries = {
  icon: string;
  seriesLabel: string;
  title: string;
  description: string;
  postCount: number;
  totalReadTime: number; // minutes
  slug: string;
};

export type TrendingTopic = {
  icon: string;
  name: string;
  category: PostCategory;
  postCount: number;
  monthlyReads: string;
  barWidth: number; // 0-100 percentage
};
