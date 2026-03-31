import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { getPostBySlug, type BlogDetail } from '@/lib/blog';
import { createPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const revalidate = 60; // ISR: revalidate this page every 60 seconds

type Props = {
  params: { slug: string };
};

/**
 * Server component: blog detail page.
 * - Fetches post by slug on the server using Prisma.
 * - Returns notFound() if post is missing.
 * - Renders HTML content safely inside a container.
 */
export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const post: BlogDetail | null = await getPostBySlug(slug);

  if (!post) {
    // Let Next.js render the 404 page for this route segment.
    notFound();
  }

  return (
    <article>
      <Container as="main" size="narrow" className="py-12">
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold" style={{ fontFamily: 'var(--font-display)' }}>
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className="mt-2 text-sm text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </header>

        {post.coverImage && (
          <div className="w-full mb-8 rounded-lg overflow-hidden shadow-lg">
            <div className="relative aspect-[16/9] w-full bg-slate-100">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="100vw" />
            </div>
          </div>
        )}

        <div className="prose max-w-none dark:prose-invert" /* content container */ dangerouslySetInnerHTML={{ __html: post.content }} />
      </Container>
    </article>
  );
}

/**
 * Build-time and runtime metadata for the blog post page.
 * Uses the post's SEO fields when available.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post not found',
    };
  }
  return createPageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt ?? 'Blog post',
    path: `/blog/${post.slug}`,
    image: post.coverImage ?? undefined,
    imageAlt: post.title,
  });
}
