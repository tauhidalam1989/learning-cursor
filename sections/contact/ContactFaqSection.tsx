import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';
import FaqAccordion from '@/components/shared/FaqAccordion';

const CONTACT_FAQ = [
  {
    q: "What's the best way to start a conversation with Corematrix?",
    a: `The contact form on this page is the best starting point — it helps us understand your project before we respond, so our first message is actually useful. If you prefer, email us at ${siteConfig.email} or message us on LinkedIn. Whichever channel you choose, a real person responds — not a bot.`,
  },
  {
    q: 'Do you sign NDAs before discussing project details?',
    a: "Yes, absolutely — and we do it happily before any sensitive discussion begins. You can request an NDA directly in the contact form. We typically turn around a signed NDA within a few hours of receiving your request. All client information is treated as strictly confidential regardless.",
  },
  {
    q: 'How quickly will I hear back after submitting the form?',
    a: `Within 24 hours on business days — usually much sooner. Our tech lead personally reviews every inquiry. If you submit over a weekend, expect a reply Monday morning (GMT). Urgent enquiries should be sent via WhatsApp at ${siteConfig.phone}.`,
  },
  {
    q: 'Do you offer a free consultation before committing to a project?',
    a: "Yes. After reviewing your inquiry, we'll schedule a free 30-minute discovery call if there's a strong potential fit. This call is genuinely free and commitment-free — just an honest conversation about your project, your goals, and whether we're the right team for you.",
  },
  {
    q: 'What information should I prepare before reaching out?',
    a: "Don't worry about having everything figured out — we help with that. Helpful things to include: a brief description of the problem you're solving, your target users, any existing tech stack, your rough timeline, and an indicative budget range. A napkin sketch or bullet points are completely fine.",
  },
  {
    q: "Can I contact you even if I'm not sure I have a project ready?",
    a: "Absolutely. Some of our best client relationships started with \"I'm not sure if this is even feasible.\" We enjoy exploratory conversations. If you have a vague idea, a technical question, or want a second opinion on an architecture decision — just reach out.",
  },
];

export function ContactFaqSection() {
  return (
    <section
      id="contact-faq"
      aria-labelledby="contact-faq-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-[1fr_1.8fr]">
          <div className="reveal">
            <p className="section-label text-corematrix-green400">FAQ</p>
            <h2
              id="contact-faq-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              Common Questions Before Reaching Out
            </h2>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              Everything you need to know before you send us a message.
            </p>
            <Link
              href="#contact-form"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              Send Us a Message →
            </Link>
          </div>

          <div className="reveal reveal-delay-2">
            <FaqAccordion items={CONTACT_FAQ} />
          </div>
        </div>
      </Container>
    </section>
  );
}
