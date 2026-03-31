import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function CtaBannerSection() {
  return (
    <section
      id="cta-banner"
      aria-labelledby="cta-banner-heading"
      className="relative overflow-hidden border-t border-corematrix-border bg-corematrix-bg2 py-28 text-center"
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div className="h-[400px] w-[800px] rounded-full bg-corematrix-green700 opacity-[0.07] blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <p className="section-label text-corematrix-green400">GET STARTED</p>
        <h2
          id="cta-banner-heading"
          className="section-heading mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl"
        >
          Ready to Build Your Next
          <br />
          AI-Powered Product?
        </h2>
        <p className="mx-auto mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
          Whether you&apos;re a startup with an idea or an enterprise ready to modernize — we&apos;re
          your technical co-founder for the long haul.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
        </div>
      </Container>
    </section>
  );
}
