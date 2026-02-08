import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export interface CtaSectionProps {
  /** Section heading */
  title?: string;
  /** Supporting text below the heading */
  description?: string;
  /** CTA button label */
  buttonLabel?: string;
  /** CTA button href (default: /contact) */
  buttonHref?: string;
  /** Optional id for the section (e.g. for anchor links) */
  id?: string;
}

/**
 * Reusable CTA section: heading, description, and single primary action.
 * Used as Contact CTA on the home page; configurable for other contexts.
 * Semantic: section with h2. Mobile-first padding and text alignment.
 */
export function CtaSection({
  title = 'Ready to get started?',
  description = "Let's talk about how we can help you reach your goals.",
  buttonLabel = 'Contact us',
  buttonHref = '/contact',
  id = 'contact-cta',
}: CtaSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="py-12 sm:py-16 lg:py-24 bg-gray-900 text-white"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id={`${id}-heading`}
            className="text-2xl font-bold sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-gray-300 sm:text-lg">{description}</p>
          <div className="mt-8">
            <Link
              href={buttonHref}
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
