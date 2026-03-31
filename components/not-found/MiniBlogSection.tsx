import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { MINI_BLOG_POSTS } from '@/data/notFoundData';

export function MiniBlogSection() {
  return (
    <section
      aria-labelledby="mini-blog-heading"
      className="border-t border-corematrix-border bg-corematrix-bg1 py-16"
    >
      <Container>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2
            id="mini-blog-heading"
            className="font-display text-lg font-bold text-corematrix-textPrimary"
          >
            📚 While You&apos;re Here — Read Something Useful
          </h2>
          <Link
            href="/blog"
            className="text-sm font-semibold text-corematrix-green400 transition hover:text-corematrix-green300"
          >
            View all articles →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {MINI_BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col gap-1.5 rounded-2xl border border-corematrix-border bg-corematrix-card2 p-5 transition-all hover:-translate-y-0.5 hover:border-corematrix-border2"
            >
              {/* TODO: Replace with <Image src={post.coverImage} alt={post.title} fill className="object-cover rounded-xl" /> */}
              <div
                className="mb-3 aspect-video w-full rounded-xl bg-gradient-to-br from-corematrix-green900/40 to-corematrix-card border border-corematrix-border2"
                aria-hidden
              />
              <span className="font-display text-[0.62rem] font-bold uppercase tracking-wider text-corematrix-green400">
                {post.category}
              </span>
              <h3 className="font-display text-sm font-bold leading-snug text-corematrix-textPrimary">
                {post.title}
              </h3>
              <p className="text-xs text-corematrix-textDim">
                {post.author} · {post.readTime} min read
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
