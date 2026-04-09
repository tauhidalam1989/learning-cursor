import Link from 'next/link';
import { MarketingCtaBand } from '@/components/shared/MarketingCtaBand';

export function PortfolioCtaSection() {
  return (
    <MarketingCtaBand
      headingId="portfolio-cta-heading"
      sectionClassName="bg-corematrix-bg0"
      glow="lg"
      label="YOUR PROJECT NEXT"
      title="Ready to Build Something That Makes This List?"
      titleClassName="section-heading mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl"
      description={
        <p className="mx-auto mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
          Every project in this portfolio started with a single conversation. Tell us about what
          you&apos;re building and we&apos;ll tell you honestly whether we&apos;re the right team to
          build it.
        </p>
      }
      actionsWrapperClassName="mt-8 flex flex-wrap justify-center gap-4"
    >
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
      >
        Start a Conversation →
      </Link>
      <Link
        href="/services"
        className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
      >
        Explore Our Services
      </Link>
    </MarketingCtaBand>
  );
}
