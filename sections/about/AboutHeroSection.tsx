'use client';

import Link from 'next/link';
import { useCountUp } from '@/hooks/useCountUp';
import { Container } from '@/components/ui/Container';

export function AboutHeroSection() {
  const ref50 = useCountUp(50, '+');
  const ref30 = useCountUp(30, '+');
  const ref5 = useCountUp(5, '+');

  return (
    <section
      id="about-hero"
      aria-labelledby="about-hero-heading"
      className="relative min-h-[72vh] flex flex-col justify-center overflow-hidden bg-corematrix-bg1 pt-36 pb-24"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.18]"
        aria-hidden
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#1a3525"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div
        className="pointer-events-none absolute -right-20 -top-40 h-[600px] w-[600px] rounded-full bg-corematrix-green700 opacity-[0.10] blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-corematrix-green700 opacity-[0.05] blur-[100px]"
        aria-hidden
      />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-corematrix-textDim">
            <Link href="/" className="hover:text-corematrix-textMuted">
              Home
            </Link>
            <span aria-hidden>›</span>
            <span className="text-corematrix-green400">About Us</span>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corematrix-green400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-corematrix-green400" />
            Our Story
          </div>

          <h1
            id="about-hero-heading"
            className="font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-corematrix-textPrimary md:text-5xl lg:text-[3.8rem]"
          >
            We&apos;re the Team That Ships
            <br />
            <em className="not-italic text-corematrix-green400">Intelligent</em> Software
          </h1>

          <p className="mt-6 max-w-[560px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            Founded on the belief that technology should be both powerful and purposeful — Corematrix
            brings together engineers, AI specialists, and product thinkers to build digital solutions
            that actually move the needle.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#team"
              className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              Meet the Team →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 bg-transparent px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
            >
              Work With Us
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
            <h3 className="font-display text-lg font-bold">
              Corematrix at a Glance
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-corematrix-textSecondary">
              A results-driven IT services company specializing in AI product development, full-stack
              engineering, and dedicated development teams for global businesses.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div>
                <span
                  ref={ref50}
                  className="block text-3xl font-extrabold leading-none tracking-tight text-corematrix-green400"
                />
                <span className="mt-1 block text-xs text-corematrix-textMuted">Projects</span>
              </div>
              <div>
                <span
                  ref={ref30}
                  className="block text-3xl font-extrabold leading-none tracking-tight text-corematrix-green400"
                />
                <span className="mt-1 block text-xs text-corematrix-textMuted">Clients</span>
              </div>
              <div>
                <span
                  ref={ref5}
                  className="block text-3xl font-extrabold leading-none tracking-tight text-corematrix-green400"
                />
                <span className="mt-1 block text-xs text-corematrix-textMuted">Years</span>
              </div>
            </div>
          </div>

          <div className="absolute -right-4 -top-4 flex items-center gap-3 rounded-xl border border-corematrix-border2 bg-corematrix-card px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] float-anim">
            <span className="text-xl" aria-hidden>🤖</span>
            <div>
              <p className="font-display text-sm font-bold text-corematrix-textPrimary">
                AI-First Since Day One
              </p>
              <p className="text-xs text-corematrix-textDim">LLMs · Agents · Automation</p>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-xl border border-corematrix-border2 bg-corematrix-card px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] float-anim-2">
            <span className="text-xl" aria-hidden>🌍</span>
            <p className="font-display text-sm font-bold text-corematrix-textPrimary">
              Global · Remote-First · Async
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
