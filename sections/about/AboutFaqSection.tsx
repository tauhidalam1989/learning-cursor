import Link from 'next/link';
import { TwoColumnFaqSection } from '@/components/shared/TwoColumnFaqSection';
import type { FaqItem } from '@/types/shared';

const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'How is Corematrix different from other IT agencies?',
    a: "We embed as technical partners, not vendors. We invest in understanding your business deeply, challenge your assumptions constructively, and stay accountable for outcomes — not just deliverables. We're also genuinely AI-first: AI capabilities are built into every project by default, not sold as an add-on.",
  },
  {
    q: 'What size companies do you typically work with?',
    a: "We work across the spectrum — from well-funded startups building their first product to enterprise teams modernizing legacy systems. What matters more than company size is whether you're serious about technology as a strategic advantage.",
  },
  {
    q: 'How do you handle project communication and transparency?',
    a: 'Every project gets a shared Notion workspace, weekly sprint demos, and async updates via Slack or your preferred tool. We use linear project management with public sprint boards so you can see exactly what\'s being worked on at any moment.',
  },
  {
    q: 'Do you sign NDAs and handle IP ownership correctly?',
    a: 'Yes. We sign NDAs before any discovery conversations. All IP created for your project is assigned to you at contract signing. Our standard agreement includes full IP transfer, non-compete clauses for your specific domain, and data confidentiality provisions.',
  },
  {
    q: 'What does the onboarding process look like?',
    a: 'After signing, we run a 2-week Discovery Sprint — stakeholder interviews, tech audit, architecture planning, and roadmap creation. You get a full technical specification and project plan before a single line of production code is written.',
  },
  {
    q: 'Where is the Corematrix team located?',
    a: "We're a remote-first company with team members across multiple time zones. We deliberately maintain overlap hours across US, European, and Asian time zones. All project management and delivery is optimized for async-first, remote collaboration.",
  },
];

export function AboutFaqSection() {
  return (
    <TwoColumnFaqSection
      sectionId="about-faq"
      headingId="about-faq-heading"
      title="Questions About Working With Us"
      description="Everything you need to know before reaching out. Still have questions? Just ask."
      items={FAQ_ITEMS}
      sectionClassName="border-t border-corematrix-border bg-corematrix-bg2 py-24"
      cta={
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
        >
          Ask Us Anything →
        </Link>
      }
    />
  );
}
