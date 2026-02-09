import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { FeatureItem } from './FeatureItem';

/**
 * Feature data structure matching the screenshot exactly.
 * Each feature includes an icon component, text, and highlighted state.
 */
interface FeatureData {
  icon: React.ReactNode;
  text: string;
  highlighted?: boolean;
}

/**
 * SVG Icon Components - Matching the screenshot design.
 * These represent the visual icons described in the screenshot.
 */

// Icon 1: Server rack or network infrastructure with graph
function SecureArchitectureIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <rect x="2" y="3" width="8" height="12" rx="1" />
      <rect x="14" y="3" width="8" height="12" rx="1" />
      <line x1="6" y1="7" x2="6" y2="7" />
      <line x1="6" y1="11" x2="6" y2="11" />
      <line x1="18" y1="7" x2="18" y2="7" />
      <line x1="18" y1="11" x2="18" y2="11" />
      <path d="M2 15h20" />
      <path d="M6 15v3" />
      <path d="M18 15v3" />
    </svg>
  );
}

// Icon 2: Monitor with code snippet and circuit board
function LatestTechIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <rect x="2" y="4" width="20" height="12" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <path d="M7 8h10" />
      <path d="M7 12h6" />
      <circle cx="17" cy="10" r="1" />
      <circle cx="17" cy="14" r="1" />
    </svg>
  );
}

// Icon 3: Target/bullseye with gears and graph
function BusinessGoalsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
    </svg>
  );
}

/**
 * Features data array - Exact content from the screenshot.
 * The second item (index 1) is highlighted with glow effect.
 */
const features: FeatureData[] = [
  {
    icon: <SecureArchitectureIcon />,
    text: "We build secure & scalable architecture",
    highlighted: false,
  },
  {
    icon: <LatestTechIcon />,
    text: "We're all about using the latest tech stack",
    highlighted: true,
  },
  {
    icon: <BusinessGoalsIcon />,
    text: 'Business goals come first',
    highlighted: false,
  },
];

/**
 * Pixel-perfect WhyPartner section component.
 *
 * Layout:
 * - Two-column split layout on desktop
 * - Left column: heading + vertical list of feature items
 * - Right column: heading + paragraph + CTA button
 * - Stacked vertically on mobile
 *
 * Colors:
 * - Background: Very dark forest green (#0D1D13)
 * - Text: Off-white/light gray (#E0E0E0, #B0B0B0)
 * - Accent green: Vibrant green (#5BE23D) for borders/glow
 * - Highlighted item: Darker background (#1A2A20) with green border glow
 */
export function WhyPartner() {
  return (
    <section
      id="why-partner"
      aria-labelledby="why-partner-heading"
      className="relative overflow-hidden bg-gradient-to-r from-[#0D1D13] via-[#021E14] to-[#063C2C] py-16 sm:py-20"
    >
      {/* Subtle glow overlay effect */}
      <div
        className="absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 -translate-x-1/4 rounded-full bg-[#5BE23D] opacity-5 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        {/* Two-column grid: left features, right content */}
        <div className="relative z-10 grid gap-12 lg:grid-cols-[45%_55%] lg:gap-16">
          {/* Left Column: Why Partner */}
          <div className="flex flex-col">
            {/* Heading - Large bold white */}
            <h2
              id="why-partner-heading"
              className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              Why Partner with Corematrix?
            </h2>

            {/* Feature Items List - Vertical stack with equal spacing */}
            <ul className="mt-8 space-y-4" role="list">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  text={feature.text}
                  highlighted={feature.highlighted}
                />
              ))}
            </ul>
          </div>

          {/* Right Column: Trusted Partner */}
          <div className="flex flex-col justify-center">
            {/* Main Heading - Large bold white, slightly larger than left */}
            <h3 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Your Trusted Long-Term Tech Partner
            </h3>

            {/* Paragraph - Light gray, readable spacing */}
            <p className="mt-6 text-base leading-relaxed text-[#B0B0B0] sm:text-lg">
              At Corematrix, we&apos;re more than just a service provider – we&apos;re
              your trusted technology partner for the long haul. We collaborate with
              you to build systems that drive real results.
            </p>

            {/* CTA Button - Outlined style with green border */}
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border-2 border-[#5BE23D] bg-transparent px-8 py-4 text-base font-semibold uppercase tracking-wide text-white transition-all hover:bg-[#5BE23D]/10 hover:border-[#5BE23D]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BE23D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1D13]"
              >
                LET&apos;S GET STARTED
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
