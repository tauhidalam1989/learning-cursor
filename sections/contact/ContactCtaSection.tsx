import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { MarketingCtaBand } from '@/components/shared/MarketingCtaBand';

export function ContactCtaSection() {
  return (
    <MarketingCtaBand
      id="contact-cta"
      headingId="contact-cta-heading"
      sectionClassName="bg-corematrix-bg2"
      glow="lg"
      label="START THE CONVERSATION"
      title="Your Next Great Product Starts With a Message"
      titleClassName="mx-auto mb-5 max-w-[700px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight text-corematrix-textPrimary"
      description={
        <p className="mx-auto mb-8 max-w-[600px] text-base leading-relaxed text-corematrix-textSecondary">
          Stop overthinking it. Send us a message today and let&apos;s figure out together whether
          we&apos;re the right team to build it.
        </p>
      }
      actionsWrapperClassName="flex flex-wrap items-center justify-center gap-4"
    >
      <Link
        href="#contact-form"
        className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
      >
        Fill Out the Form →
      </Link>
      <Link
        href={`mailto:${siteConfig.email}`}
        className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-8 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
      >
        Email Us Directly
      </Link>
    </MarketingCtaBand>
  );
}
