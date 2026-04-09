import Link from 'next/link';
import { MarketingCtaBand } from '@/components/shared/MarketingCtaBand';

export function BlogCtaSection() {
  return (
    <MarketingCtaBand
      id="blog-cta"
      headingId="blog-cta-heading"
      sectionClassName="bg-corematrix-bg2"
      glow="lg"
      label="WORK WITH US"
      title="Liked What You Read? Let's Build Together"
      titleClassName="mx-auto mb-5 max-w-[700px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight text-corematrix-textPrimary"
      description={
        <p className="mx-auto mb-8 max-w-[600px] text-base leading-relaxed text-corematrix-textSecondary">
          The same team that writes these articles builds production AI systems, Next.js apps, and
          SaaS platforms for companies worldwide. Let&apos;s talk about your project.
        </p>
      }
      actionsWrapperClassName="flex flex-wrap items-center justify-center gap-4"
    >
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
      >
        Start a Project →
      </Link>
      <Link
        href="/services"
        className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-8 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
      >
        See Our Services
      </Link>
    </MarketingCtaBand>
  );
}
