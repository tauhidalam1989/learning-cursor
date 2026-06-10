'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import type { BlogDetail } from '@/lib/blog';
import { getAllDbPosts } from '@/lib/blog';
import type { BlogPost } from '@/types/blog';

interface DynamicBlogDetailProps {
  post: BlogDetail;
}

export function DynamicBlogDetailClient({ post }: DynamicBlogDetailProps) {
  const { language, t } = useLanguage();
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  const title = language === 'ar' ? (post.title_ar || post.title_en) : post.title_en;
  const excerpt = language === 'ar' ? (post.excerpt_ar || post.excerpt_en) : post.excerpt_en;
  const content = language === 'ar' ? (post.content_ar || post.content_en) : post.content_en;
  const authorName = language === 'ar' ? (post.authorName_ar || post.authorName_en) : post.authorName_en;
  const authorRole = language === 'ar' ? (post.authorRole_ar || post.authorRole_en) : post.authorRole_en;

  const imageUrl = post.coverImage
    ? (post.coverImage.startsWith('http') ? post.coverImage : `${post.coverImage}`)
    : null;

  useEffect(() => {
    async function loadRelated() {
      const all = await getAllDbPosts(language);
      const filtered = all
        .filter((p) => p.slug !== post.slug)
        .filter((p) => p.category === post.category)
        .slice(0, 3);
      setRelatedPosts(filtered);
    }
    loadRelated();
  }, [language, post.slug, post.category]);

  return (
    <article
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-corematrix-bg0 text-corematrix-textPrimary font-sans"
    >
      {/* Full-area Hero */}
      <section className="relative min-h-[78vh] flex flex-col justify-center overflow-hidden bg-corematrix-bg1 pt-12 pb-16">
        <div className="noise-overlay absolute inset-0 z-0" aria-hidden />
        <div
          className="pointer-events-none absolute -right-24 -top-44 h-[700px] w-[700px] rounded-full bg-corematrix-green700 opacity-[0.10] blur-[130px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-[500px] w-[500px] rounded-full bg-corematrix-green700 opacity-[0.05] blur-[120px]"
          aria-hidden
        />

        <Container className="relative z-10">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-corematrix-textDim"
          >
            <Link href="/" className="transition-colors hover:text-corematrix-textMuted">
              {t('Home', 'الرئيسية')}
            </Link>
            <span aria-hidden>{language === 'ar' ? '‹' : '›'}</span>
            <Link href="/blog" className="transition-colors hover:text-corematrix-textMuted">
              {t('Blog', 'المقالات')}
            </Link>
            <span aria-hidden>{language === 'ar' ? '‹' : '›'}</span>
            <span className="text-corematrix-green400 line-clamp-1 max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg">
              {title}
            </span>
          </nav>

          {/* Back Link */}
          {/* <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-corematrix-green400 hover:text-corematrix-green300 mb-4 sm:mb-6 transition"
          >
            {language === 'ar' ? '→' : '←'} {t('Back to all blogs', 'العودة لجميع المقالات')}
          </Link> */}

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[2.1fr,1.2fr]">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corematrix-green400">
                  <span className="h-1.5 w-1.5 rounded-full bg-corematrix-green400 dot-pulse" aria-hidden />
                  {post.category}
                </span>

                <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-corematrix-textDim">
                  <i className="fas fa-calendar-alt text-corematrix-green400" aria-hidden />
                  {new Date(post.publishedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <h1
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-[clamp(2.2rem,4vw,3.8rem)] font-extrabold leading-[1.06] tracking-tight text-corematrix-textPrimary"
              >
                {(() => {
                  if (!title) return '';
                  const words = title.trim().split(/\s+/);
                  if (words.length <= 2) {
                    return <span className="text-corematrix-green400">{title}</span>;
                  }
                  const mainBody = words.slice(0, -2).join(' ');
                  const highlighted = words.slice(-2).join(' ');
                  return (
                    <>
                      {mainBody}{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-corematrix-green400 to-corematrix-green300">
                        {highlighted}
                      </span>
                    </>
                  );
                })()}
              </h1>

              {excerpt && (
                <p className="mt-6 max-w-[620px] text-base font-light leading-relaxed text-corematrix-textSecondary">
                  {excerpt}
                </p>
              )}

              <div className="mt-8 flex items-center gap-3 rounded-xl border border-corematrix-border2 bg-corematrix-card2 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-corematrix-green900/80 text-sm text-corematrix-green400 font-bold border border-corematrix-green700/20">
                  {post.authorInitials || 'AD'}
                </span>
                <div>
                  <p className="font-semibold text-corematrix-textPrimary">{authorName}</p>
                  <p className="text-xs text-corematrix-textDim">{authorRole}</p>
                </div>
              </div>
            </div>

            {/* Expert Highlight Card */}
            <aside className="rounded-2xl border border-corematrix-border2 bg-corematrix-card2/70 backdrop-blur p-6 shadow-[0_32px_80px_rgba(0,0,0,0.35)]">
              <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.14em] text-corematrix-green400">
                {t('Expert Insight', 'رأي الخبراء')}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-corematrix-textSecondary">
                {t(
                  'Learn how AI-powered solutions are transforming critical infrastructure, improving safety, and enabling smarter decision-making for cities and enterprises.',
                  'تعرّف على كيف تغيّر حلول الذكاء الاصطناعي البنية التحتية الحيوية، وتحسّن السلامة، وتمكّن الجهات من اتخاذ قرارات أكثر ذكاءً.'
                )}
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-corematrix-border bg-corematrix-bg0/30 p-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-corematrix-green900/40 text-sm font-bold text-corematrix-green400 border border-corematrix-green700/20">
                  {post.authorInitials || 'AD'}
                </span>
                <div>
                  <p className="font-semibold text-corematrix-textPrimary">{authorName}</p>
                  <p className="text-[0.7rem] uppercase tracking-wide text-corematrix-textDim">
                    {t('Official Publisher', 'الناشر الرسمي')}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Main Content + Sidebar */}
      <Container className="pb-16">
        <section className="mt-10 grid gap-10 lg:grid-cols-[2.1fr,1.2fr] items-start">
          {/* Blog Rich Text Content */}
          {/* <div className="rounded-3xl bg-corematrix-bg1/40 border border-corematrix-border2 px-5 sm:px-8 py-8 sm:py-10 shadow-lg"> */}
          <div className="rounded-3xl bg-corematrix-bg1/40 px-5 sm:px-8 py-8 sm:py-10 shadow-lg">
            <div
              className="prose max-w-none dark:prose-invert text-corematrix-textSecondary leading-relaxed text-base sm:text-lg font-light space-y-6"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Tags + Share */}
            <div className="mt-10 border-t border-corematrix-border pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-corematrix-textDim mb-3">
                  {t('Related Tags', 'الوسوم المرتبطة')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(post.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-corematrix-bg2 px-3 py-1 text-xs font-medium text-corematrix-textSecondary border border-corematrix-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-corematrix-textDim mb-3">
                  {t('Share Article', 'مشاركة المقال')}
                </p>
                <div className="flex items-center gap-3">
                  {['facebook', 'twitter', 'linkedin'].map((network) => (
                    <button
                      key={network}
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-corematrix-border bg-corematrix-bg2 text-corematrix-textSecondary hover:bg-corematrix-bg3 transition"
                    >
                      <span className="text-xs font-semibold">
                        {network === 'facebook' && 'f'}
                        {network === 'twitter' && 't'}
                        {network === 'linkedin' && 'in'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Cover image + Need Expert Advice */}
          <aside className="space-y-6">
            {imageUrl && (
              <div className="rounded-3xl overflow-hidden border border-corematrix-border bg-corematrix-bg2 shadow-xl aspect-[4/3]">
                <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
              </div>
            )}

            <div className="group relative rounded-3xl border border-corematrix-border bg-corematrix-card/30 backdrop-blur-sm p-6 sm:p-7 shadow-xl overflow-hidden hover:bg-corematrix-card/50 hover:border-corematrix-green700/40 hover:shadow-[0_0_30px_rgba(21,128,61,0.15)] hover:scale-[1.01] transition-all duration-300">
              {/* Accent glow line inside */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green500/20 to-transparent group-hover:via-corematrix-green500/60 transition-all duration-300" />

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-corematrix-green400 mb-2">
                {t('Need Expert Advice?', 'تحتاج إلى استشارة خبراء؟')}
              </p>
              <h2 className="text-lg sm:text-xl font-bold leading-snug mb-3 text-corematrix-textPrimary group-hover:text-corematrix-green300 transition-colors duration-200">
                {t(
                  'Our team is ready to help you navigate tech challenges.',
                  'فريقنا جاهز لمساعدتك في تجاوز تحديات التقنية.'
                )}
              </h2>
              <p className="text-xs sm:text-sm text-corematrix-textSecondary/80 mb-5 leading-relaxed font-light">
                {t(
                  'Tell us about your use case and we will propose the right strategy, architecture, and roadmap.',
                  'شاركنا رؤيتك وسنقترح لك الإستراتيجية والمعمارية وخارطة الطريق الأنسب.'
                )}
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 text-white px-5 py-3 text-xs sm:text-sm font-semibold shadow-lg shadow-corematrix-green900/40 hover:bg-corematrix-green500 hover:scale-[1.02] transition-all duration-300"
              >
                {t('Talk to our experts', 'تحدث مع خبرائنا')}
              </Link>
            </div>
          </aside>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-corematrix-textDim">
                  {t('Keep Reading', 'استمر في القراءة')}
                </p>
                <h2 className="mt-1 text-lg sm:text-xl font-bold text-corematrix-textPrimary">
                  {t('You Might Also Like', 'قد يعجبك أيضاً')}
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-corematrix-green500 hover:text-corematrix-green400"
              >
                {t('Explore all', 'استعرض الكل')} →
              </Link>
            </div>

            <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group rounded-3xl bg-corematrix-bg1/70 border border-corematrix-border hover:border-corematrix-green500/60 shadow-sm hover:shadow-xl transition flex flex-col overflow-hidden"
                >
                  <div className="h-44 relative overflow-hidden bg-corematrix-bg2">
                    {rp.coverImage ? (
                      <img
                        src={rp.coverImage.startsWith('http') ? rp.coverImage : `${rp.coverImage}`}
                        alt={rp.title}
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-corematrix-green900 via-corematrix-card2 to-corematrix-bg2">
                        <div className="absolute -right-6 -bottom-8 h-24 w-24 rounded-full bg-corematrix-green700/40 blur-2xl" />
                      </div>
                    )}
                    <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-corematrix-bg0/80 px-2 py-0.5 text-[0.65rem] font-semibold text-corematrix-green500 backdrop-blur-sm">
                      {rp.categoryLabel}
                    </div>
                  </div>
                  <div className="flex-1 px-4 sm:px-5 py-4 sm:py-5 flex flex-col">
                    <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-corematrix-textDim mb-1">
                      {rp.publishedAt} &nbsp;·&nbsp; {rp.author.name}
                    </p>
                    <h3 className="text-sm sm:text-[0.95rem] font-bold text-corematrix-textPrimary line-clamp-2 mb-2 leading-snug">
                      {rp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-corematrix-textMuted line-clamp-2 mb-4 leading-relaxed">
                      {rp.excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-corematrix-green500 group-hover:gap-2.5 transition-all">
                      {t('READ MORE', 'اقرأ المزيد')} →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}

export default DynamicBlogDetailClient;
