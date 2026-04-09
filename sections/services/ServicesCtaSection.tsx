import Link from 'next/link';
import { MarketingCtaBand } from '@/components/shared/MarketingCtaBand';

export function ServicesCtaSection() {
  return (
    <MarketingCtaBand
      id="services-cta"
      headingId="services-cta-heading"
      sectionClassName="bg-corematrix-bg2"
      glow="lg"
      label="READY TO START?"
      title="Let's Build Something Extraordinary Together"
      titleClassName="mx-auto mb-5 max-w-[700px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight text-corematrix-textPrimary"
      description={
        <p className="mx-auto mb-8 max-w-[600px] text-base leading-relaxed text-corematrix-textSecondary">
          Tell us about your project. We&apos;ll respond within 24 hours with a genuine technical
          perspective — not a sales pitch.
        </p>
      }
      actionsWrapperClassName="flex flex-wrap items-center justify-center gap-4"
    >
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
      >
        Start Your Project →
      </Link>
      <Link
        href="/about"
        className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-8 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
      >
        Learn About Our Team
      </Link>
    </MarketingCtaBand>
  );
}
