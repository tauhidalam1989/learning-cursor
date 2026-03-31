import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function ServicesCtaSection() {
  return (
    <section
      id="services-cta"
      aria-labelledby="services-cta-heading"
      className="relative overflow-hidden border-t border-corematrix-border bg-corematrix-bg2 py-28"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.08] blur-[140px]"
        aria-hidden
      />
      <Container>
        <div className="relative z-10 text-center">
          <p className="section-label text-corematrix-green400">READY TO START?</p>
          <h2
            id="services-cta-heading"
            className="mx-auto mb-5 max-w-[700px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight text-corematrix-textPrimary"
          >
            Let&apos;s Build Something Extraordinary Together
          </h2>
          <p className="mx-auto mb-8 max-w-[600px] text-base leading-relaxed text-corematrix-textSecondary">
            Tell us about your project. We&apos;ll respond within 24 hours with a genuine technical
            perspective — not a sales pitch.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
