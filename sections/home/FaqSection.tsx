import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import FaqAccordion, { type FaqItem } from '@/components/shared/FaqAccordion';

const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'What AI services does Corematrix offer?',
    a: 'We offer end-to-end AI development including LLM integration, AI agent development, custom ML models, computer vision, NLP, RAG pipelines, and AI-powered automation workflows.',
  },
  {
    q: 'Do you build with Next.js and modern tech stacks?',
    a: 'Yes — our default web stack is Next.js 14+ (App Router), React, TypeScript, and Tailwind CSS, with Node.js or Python backends. We adapt to project requirements.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'An MVP typically takes 6–12 weeks. Full-scale products range from 3–6 months. We work in sprints with weekly deliverables so you see continuous progress throughout.',
  },
  {
    q: 'Can you integrate AI into our existing product?',
    a: 'Absolutely. We specialize in retrofitting AI capabilities — LLM features, automation layers, recommendation engines — into existing products without disruption.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Yes. We offer flexible support packages covering bug fixes, feature additions, performance monitoring, infrastructure management, and AI model updates.',
  },
  {
    q: 'How does the dedicated team model work?',
    a: 'You get pre-vetted developers embedded in your workflow — using your tools, attending your standups, delivering on your roadmap. Full transparency, flexible contracts, no lock-in.',
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-16 lg:py-24"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start lg:gap-20">
          <div className="reveal">
            <p className="section-label text-corematrix-green400">FAQ</p>
            <h2
              id="faq-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              You&apos;ve Got Questions.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              We believe in radical transparency — no jargon, no vague answers.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              Talk to Us →
            </Link>
          </div>

          <div className="reveal reveal-delay-2">
            <FaqAccordion items={FAQ_ITEMS} variant="compact" />
          </div>
        </div>
      </Container>
    </section>
  );
}
