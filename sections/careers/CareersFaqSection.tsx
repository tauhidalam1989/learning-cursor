import { siteConfig } from '@/config/site';
import { TwoColumnFaqSection } from '@/components/shared/TwoColumnFaqSection';

const CAREERS_FAQ = [
  {
    q: 'Do I need to be in a specific timezone to work at Corematrix?',
    a: "No. We have team members in 12+ countries across North America, Europe, Africa, and Asia. We maintain a 4-hour overlap window (typically 2pm–6pm GMT) for real-time collaboration. Outside that, you work whenever you're most productive.",
  },
  {
    q: 'What does the technical assessment look like?',
    a: "We offer a take-home challenge (2–3 hours, paid for senior roles) or a live collaborative session — your choice. We use real problems we've faced in production, not abstract CS puzzles. We care about how you approach a problem, not whether you get the \"right\" answer.",
  },
  {
    q: "I don't have a degree — does that matter?",
    a: "Not at all. We hire based on demonstrated skill and potential. Show us what you've built, what you've shipped, and how you think — that matters infinitely more than credentials. Several of our senior engineers are self-taught or bootcamp graduates.",
  },
  {
    q: 'How does compensation work for international candidates?',
    a: 'We pay competitive rates benchmarked to the global market for senior technical talent — not adjusted down for lower-cost-of-living locations. We use Deel for international contractor payments and can hire through local employer-of-record services in most countries.',
  },
  {
    q: 'What does onboarding look like for new hires?',
    a: "You'll have a structured 30/60/90-day plan before your first day. Week 1 is all setup and context — codebase walkthroughs, architecture docs, meeting everyone. By week 2 you'll ship your first PR. By day 30 you'll own a feature end-to-end. Every new hire gets a dedicated onboarding buddy.",
  },
  {
    q: 'Is there room to grow into leadership at Corematrix?',
    a: 'Yes — and it happens fast for people who want it. We prefer to promote from within. We have both IC and management tracks, and we don\'t force engineers into management to grow their career. Clear promotion criteria are shared at hiring and reviewed quarterly.',
  },
] as const;

export function CareersFaqSection() {
  return (
    <TwoColumnFaqSection
      sectionId="careers-faq"
      headingId="careers-faq-heading"
      title="Your Questions, Answered Honestly"
      description="Everything you need to know about working at Corematrix. Still have questions? Reach out — we respond to every email."
      items={CAREERS_FAQ}
      cta={
        <a
          href={`mailto:${siteConfig.careersEmail}`}
          className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
        >
          Email Our Hiring Team →
        </a>
      }
    />
  );
}
