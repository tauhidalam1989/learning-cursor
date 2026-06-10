import type { Metadata } from 'next';
import { BlogDetailWrapper } from '@/components/blog/BlogDetailWrapper';
import { getPostBySlug } from '@/lib/blog';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, dynamicArticleJsonLd } from '@/lib/seo/jsonld';
import { siteUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: 'Blog Post — Corematrix',
      description: 'Read this article on the Corematrix engineering blog.',
      alternates: {
        canonical: `${siteUrl}/blog/${slug}`,
      },
    };
  }
  return {
    title: `${post.title_en} — Corematrix Blog`,
    description: post.excerpt_en || 'Read this article on the Corematrix engineering blog.',
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return <BlogDetailWrapper slug={slug} />;
  }

  const articleSchema = dynamicArticleJsonLd(post);
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', item: siteUrl },
    { name: 'Blog', item: `${siteUrl}/blog` },
    { name: post.title_en, item: `${siteUrl}/blog/${post.slug}` }
  ]);

  return (
    <>
      <JsonLd schema={articleSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <BlogDetailWrapper slug={slug} />
    </>
  );
}

