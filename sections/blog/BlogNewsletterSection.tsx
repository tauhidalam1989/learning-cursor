'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';

export function BlogNewsletterSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      // TODO: Wire to email marketing service (Mailchimp, ConvertKit, Resend, etc.)
      await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'newsletter',
          fullName: name.trim() || 'Newsletter Subscriber',
          email: email.trim(),
          message: 'Blog newsletter signup',
        }),
      });
      setSubmitted(true);
    } catch {
      setLoading(false);
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
            <p className="section-label text-corematrix-green400">NEWSLETTER</p>
            <h2
              id="blog-newsletter-heading"
              className="mt-3 font-display text-2xl font-bold text-corematrix-textPrimary sm:text-3xl"
            >
              Engineering Insights, Every Tuesday
            </h2>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              Join 2,400+ engineers and founders who read our weekly newsletter.
              No AI-generated filler — just real, useful content from the team
              that&apos;s actually shipping AI products in production.
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-corematrix-textSecondary">
              <li className="flex items-center gap-2">
                <span className="text-corematrix-green400">✓</span>
                One deep-dive article per week
              </li>
              <li className="flex items-center gap-2">
                <span className="text-corematrix-green400">✓</span>
                Curated links from across the engineering web
              </li>
              <li className="flex items-center gap-2">
                <span className="text-corematrix-green400">✓</span>
                Occasional early access to our tools and frameworks
              </li>
              <li className="flex items-center gap-2">
                <span className="text-corematrix-green400">✓</span>
                Unsubscribe in one click, anytime
              </li>
            </ul>
            <p className="mt-6 text-xs text-corematrix-textDim">
              Join 2,400+ engineers already subscribed
            </p>
          </div>
          <div className="relative z-10 mt-8 lg:mt-0">
            {submitted ? (
              <p className="text-lg font-semibold text-corematrix-green400">
                ✓ You&apos;re subscribed! Check your inbox for a confirmation.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="flex-1 rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="flex-1 rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500 disabled:opacity-50 sm:w-auto"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Subscribing...
                    </span>
                  ) : (
                    'Subscribe'
                  )}
                </button>
                <p className="text-xs text-corematrix-textDim">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
