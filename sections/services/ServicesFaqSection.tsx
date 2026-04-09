import Link from 'next/link';
import { TwoColumnFaqSection } from '@/components/shared/TwoColumnFaqSection';

const FAQ_ITEMS = [
  {
    q: 'How quickly can you start on a new project?',
    a: "For new projects, we typically begin the Discovery Sprint within 1–2 weeks of contract signing. For dedicated team placements, we can have engineers embedded and productive within 5–7 business days. We don't keep a bench of idle engineers — our team is carefully matched to your specific technology requirements.",
  },
  {
    q: "What's the minimum project size you work with?",
    a: 'Our minimum engagement is typically a 6-week project or a 2-month dedicated team retainer. This ensures we can deliver meaningful value rather than rushing through a project that deserves more care. For very small projects (under $10k), we\'re happy to point you toward suitable alternatives honestly.',
  },
  {
    q: 'Do you work with clients who already have a partial codebase?',
    a: "Absolutely — and this is one of our most common engagement types. We begin with a codebase audit during the Discovery Sprint, identify technical debt and architectural issues, and propose a remediation plan before continuing development. We won't inherit a codebase without understanding it first.",
  },
  {
    q: 'How do you handle data security and confidentiality for AI projects?',
    a: 'All client data used in AI projects is handled under strict confidentiality agreements. We use anonymization and synthetic data for development where possible, implement data minimization principles, and ensure no client data is used to train or improve any third-party models. For regulated industries, we have HIPAA and GDPR-compliant infrastructure patterns available.',
  },
  {
    q: 'What technologies do you NOT work with?',
    a: "We don't do .NET/C# development, iOS native Swift-only projects, or low-code/no-code platform customizations. We're a JavaScript/TypeScript and Python house — these are the stacks where we're genuinely world-class, and we'd rather be honest than take work we can't do excellently.",
  },
  {
    q: 'Can you work within our existing project management process?',
    a: "Yes. We adapt to your tooling — Jira, Linear, Notion, Asana, GitHub Projects, whatever you use. We don't require you to change your PM process to work with us. We bring the engineering rigour; we fit into your existing planning and communication rhythms.",
  },
] as const;

export function ServicesFaqSection() {
  return (
    <TwoColumnFaqSection
      sectionId="services-faq"
      headingId="services-faq-heading"
      title="Services FAQ"
      description="Common questions about our services, process, and engagement models."
      items={FAQ_ITEMS}
      cta={
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
        >
          Ask a Different Question →
        </Link>
      }
    />
  );
}
