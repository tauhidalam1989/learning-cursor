import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function CareersCtaSection() {
  return (
    <section
      id="careers-cta"
      aria-labelledby="careers-cta-heading"
      className="relative overflow-hidden border-t border-corematrix-border bg-corematrix-bg2 py-28 text-center"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.08] blur-[140px]"
        aria-hidden
      />
      <Container className="relative z-10">
        <p className="section-label text-corematrix-green400">JOIN THE TEAM</p>
        <h2
          id="careers-cta-heading"
          className="section-heading mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl"
        >
          Ready to Build Something Extraordinary?
        </h2>
        <p className="mx-auto mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
          We&apos;re looking for people who care deeply about their craft, think like owners,
          and want to work on AI products that actually matter.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="#open-roles"
            className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
          >
            View Open Roles →
          </Link>
          <Link
            href="#open-application"
            className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
          >
            Send Open Application
          </Link>
        </div>
      </Container>
    </section>
  );
}
