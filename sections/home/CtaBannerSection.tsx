import Link from 'next/link';
import { MarketingCtaBand } from '@/components/shared/MarketingCtaBand';

export function CtaBannerSection() {
  return (
    <MarketingCtaBand
      id="cta-banner"
      headingId="cta-banner-heading"
      sectionClassName="bg-corematrix-bg2"
      glow="inset"
      label="GET STARTED"
      title={
        <>
          Ready to Build Your Next
          <br />
          AI-Powered Product?
        </>
      }
      titleClassName="section-heading mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl"
      description={
        <p className="mx-auto mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
          Whether you&apos;re a startup with an idea or an enterprise ready to modernize — we&apos;re
          your technical co-founder for the long haul.
        </p>
      }
      actionsWrapperClassName="mt-10 flex flex-wrap items-center justify-center gap-4"
    >
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
      >
        Start a Project →
      </Link>
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 bg-transparent px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
      >
        Schedule a Free Call
      </Link>
    </MarketingCtaBand>
  );
}
