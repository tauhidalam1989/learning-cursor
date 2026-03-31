import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';

export function ContactCtaSection() {
  return (
    <section
      id="contact-cta"
      aria-labelledby="contact-cta-heading"
      className="relative overflow-hidden border-t border-corematrix-border bg-corematrix-bg2 py-28"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.08] blur-[140px]"
        aria-hidden
      />
      <Container>
        <div className="relative z-10 text-center">
          <p className="section-label text-corematrix-green400">
            START THE CONVERSATION
          </p>
          <h2
            id="contact-cta-heading"
            className="mx-auto mb-5 max-w-[700px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight text-corematrix-textPrimary"
          >
            Your Next Great Product Starts With a Message
          </h2>
          <p className="mx-auto mb-8 max-w-[600px] text-base leading-relaxed text-corematrix-textSecondary">
            Stop overthinking it. Send us a message today and let&apos;s figure
            out together whether we&apos;re the right team to build it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
