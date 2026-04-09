import Link from 'next/link';
import {
  TwoColumnFaqSection,
  FAQ_GRID_HOME,
} from '@/components/shared/TwoColumnFaqSection';
import type { FaqItem } from '@/types/shared';

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
    <TwoColumnFaqSection
      sectionId="faq"
      headingId="faq-heading"
      title="You've Got Questions."
      description="We believe in radical transparency — no jargon, no vague answers."
      items={FAQ_ITEMS}
      sectionClassName="border-t border-corematrix-border bg-corematrix-bg0 py-16 lg:py-24"
      gridClassName={FAQ_GRID_HOME}
      faqVariant="compact"
      cta={
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
        >
          Talk to Us →
        </Link>
      }
    />
  );
}
