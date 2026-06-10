'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';

export function BlogNewsletterSection() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/newsletters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.status === 409) {
        setError(t('This email is already subscribed!', 'هذا البريد الإلكتروني مشترك بالفعل!'));
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || t('Something went wrong. Please try again.', 'حدث خطأ ما. يرجى المحاولة مرة أخرى.'));
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError(t('Network error. Please try again later.', 'خطأ في الشبكة. يرجى المحاولة مرة أخرى لاحقاً.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="blog-newsletter"
      aria-labelledby="blog-newsletter-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-20"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-corematrix-border2 bg-corematrix-card2 p-8 sm:p-14 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
          <div
            className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.08] blur-[100px]"
            aria-hidden
          />
          <div className="relative z-10">
            <p className="section-label text-corematrix-green400">{t('NEWSLETTER', 'النشرة البريدية')}</p>
            <h2
              id="blog-newsletter-heading"
              className="mt-3 font-display text-2xl font-bold text-corematrix-textPrimary sm:text-3xl"
            >
              {t('Engineering Insights, Every Tuesday', 'رؤى وأفكار هندسية، كل ثلاثاء')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              {t(
                "Join 2,400+ engineers and founders who read our weekly newsletter. No AI-generated filler — just real, useful content from the team that's actually shipping AI products in production.",
                'انضم إلى أكثر من 2,400 مهندس ومؤسس يقرأون نشرتنا الأسبوعية. بدون حشو مولد بالذكاء الاصطناعي — فقط محتوى حقيقي ومفيد من الفريق الذي يطلق منتجات الذكاء الاصطناعي في بيئة الإنتاج الفعلية.'
              )}
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-corematrix-textSecondary">
              <li className="flex items-center gap-2">
                <span className="text-corematrix-green400">✓</span>
                {t('One deep-dive article per week', 'مقالة واحدة متعمقة أسبوعياً')}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-corematrix-green400">✓</span>
                {t('Curated links from across the engineering web', 'روابط مختارة بعناية من مختلف مواقع هندسة البرمجيات')}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-corematrix-green400">✓</span>
                {t('Occasional early access to our tools and frameworks', 'وصول مبكر بين الحين والآخر لأدواتنا وأطر عملنا')}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-corematrix-green400">✓</span>
                {t('Unsubscribe in one click, anytime', 'إلغاء الاشتراك بنقرة واحدة في أي وقت')}
              </li>
            </ul>
            <p className="mt-6 text-xs text-corematrix-textDim">
              {t('Join 2,400+ engineers already subscribed', 'انضم إلى أكثر من 2,400 مهندس مشترك بالفعل')}
            </p>
          </div>
          <div className="relative z-10 mt-8 lg:mt-0">
            {submitted ? (
              <p className="text-lg font-semibold text-corematrix-green400">
                {t("✓ You're subscribed! Check your inbox for a confirmation.", '✓ تم اشتراكك بنجاح! يرجى التحقق من بريدك الإلكتروني للتأكيد.')}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center w-full rounded-xl border border-corematrix-border bg-corematrix-bg0 p-1.5 focus-within:border-corematrix-green500 focus-within:ring-1 focus-within:ring-corematrix-green500 transition-all duration-300 gap-2 sm:gap-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(null); }}
                    placeholder={t('Your email', 'بريدك الإلكتروني')}
                    required
                    className="flex-grow bg-transparent px-4 py-3 sm:py-2.5 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:outline-none w-full"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="shrink-0 rounded-lg bg-corematrix-green700 px-6 py-3 sm:py-2.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        {t('Subscribing...', 'جاري الاشتراك...')}
                      </span>
                    ) : (
                      t('Subscribe', 'اشترك الآن')
                    )}
                  </button>
                </div>
                {error && (
                  <p className="text-sm font-medium text-amber-400">
                    <i className="fas fa-exclamation-circle mr-1.5" />
                    {error}
                  </p>
                )}
                <p className="text-xs text-corematrix-textDim">
                  {t('We respect your privacy. Unsubscribe anytime.', 'نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.')}
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
