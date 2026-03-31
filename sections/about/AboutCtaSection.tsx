import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function AboutCtaSection() {
  return (
    <section
      id="about-cta"
      aria-labelledby="about-cta-heading"
      className="relative overflow-hidden border-t border-corematrix-border bg-corematrix-bg0 py-28 text-center"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.08] blur-[120px]"
        aria-hidden
      />

      <Container className="relative z-10">
        <p className="section-label text-corematrix-green400">LET&apos;S WORK TOGETHER</p>
        <h2
          id="about-cta-heading"
          className="section-heading mx-auto mb-5 max-w-[680px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight"
        >
          Ready to Build Something That Matters?
        </h2>
        <p className="mx-auto mb-10 max-w-[500px] font-light leading-[1.75] text-corematrix-textMuted">
          Whether you have a fully-formed spec or just an idea on a napkin — we&apos;d love to have a
          real conversation about what you&apos;re trying to build.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
          >
            Start a Conversation →
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 bg-transparent px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
          >
            See Our Services
          </Link>
        </div>
      </Container>
    </section>
  );
}
