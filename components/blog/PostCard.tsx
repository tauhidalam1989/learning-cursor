import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

type PostCardProps = {
  post: BlogPost;
};

export function PostCard({ post }: PostCardProps) {
  const imageUrl = post.coverImage 
    ? (post.coverImage.startsWith('http') ? post.coverImage : `${post.coverImage}`)
    : null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card transition-all duration-300 card-glow hover:-translate-y-1"
    >
      <div className="relative h-40 flex-shrink-0 overflow-hidden border-b border-corematrix-border bg-corematrix-bg0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <i className="fas fa-newspaper text-3xl text-corematrix-green400/60 absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2" aria-hidden />
          </>
        )}
        <span className="absolute top-3 left-3 z-10 rounded-full border border-corematrix-green700/30 bg-corematrix-green900/40 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-corematrix-green400">
          {post.categoryLabel}
        </span>
        <div
          className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 font-display text-base font-bold leading-snug text-corematrix-textPrimary group-hover:text-corematrix-green400">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm font-light leading-relaxed text-corematrix-textMuted">
            {post.excerpt}
          </p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded border border-corematrix-green700/20 bg-corematrix-green900/20 px-2 py-0.5 font-mono text-[0.65rem] text-corematrix-green700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-corematrix-textDim">
          <span>{post.author.name}</span>
          <span aria-hidden>·</span>
          <span>{post.readTime} min read</span>
          <span className="ml-auto flex items-center gap-1.5 font-semibold text-corematrix-green400 transition-all group-hover:gap-3">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}
