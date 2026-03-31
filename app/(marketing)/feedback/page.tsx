import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Share feedback with the Corematrix team.',
  alternates: { canonical: `${siteConfig.url}/feedback` },
};

export default function FeedbackPage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-20 px-[6vw] text-center">
      <div className="inline-flex items-center gap-2 bg-corematrix-green900/20 border border-corematrix-green400/15 rounded-full px-4 py-1.5 text-[0.72rem] font-bold tracking-[0.1em] uppercase text-corematrix-green400 mb-6">
        We Read Every Message
      </div>
      <h1
        className="font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold tracking-tight text-corematrix-textPrimary mb-4"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Share Your Feedback
      </h1>
      <p className="text-corematrix-textMuted font-light max-w-[480px] leading-relaxed mb-8">
        Have a suggestion, complaint, or something kind to say? Use our contact
        form and we&apos;ll respond within 24 hours.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 bg-corematrix-green700 text-white px-6 py-3 rounded-lg text-sm font-semibold border border-corematrix-green500 hover:bg-corematrix-green500 hover:shadow-[0_0_28px_rgba(34,197,94,0.3)] transition-all hover:-translate-y-px"
      >
        Go to Contact Form →
      </Link>
    </main>
  );
}
