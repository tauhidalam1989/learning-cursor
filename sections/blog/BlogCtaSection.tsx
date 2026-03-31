import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function BlogCtaSection() {
  return (
    <section
      id="blog-cta"
      aria-labelledby="blog-cta-heading"
      className="relative overflow-hidden border-t border-corematrix-border bg-corematrix-bg2 py-28"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.08] blur-[140px]"
        aria-hidden
      />
      <Container>
        <div className="relative z-10 text-center">
          <p className="section-label text-corematrix-green400">WORK WITH US</p>
          <h2
            id="blog-cta-heading"
            className="mx-auto mb-5 max-w-[700px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight text-corematrix-textPrimary"
          >
            Liked What You Read? Let&apos;s Build Together
          </h2>
          <p className="mx-auto mb-8 max-w-[600px] text-base leading-relaxed text-corematrix-textSecondary">
            The same team that writes these articles builds production AI
            systems, Next.js apps, and SaaS platforms for companies worldwide.
            Let&apos;s talk about your project.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
