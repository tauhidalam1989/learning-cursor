import { Container } from '@/components/ui/Container';
import { ServiceCard } from './ServiceCard';

/**
 * Service data structure matching the screenshot exactly.
 * Each service includes an icon component, title, and description.
 */
interface ServiceData {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/**
 * SVG Icon Components - Placeholder icons matching the screenshot design.
 * These can be replaced with actual icon library components later.
 */

// Web Applications Icon - Desktop monitor with window
function WebAppIcon() {
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
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <rect x="5" y="6" width="14" height="8" rx="1" />
    </svg>
  );
}

// Enterprise Software Icon - Network/interconnected nodes
function EnterpriseIcon() {
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
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <line x1="7.59" y1="7.59" x2="9.41" y2="9.41" />
      <line x1="14.59" y1="7.59" x2="12.77" y2="9.41" />
      <line x1="7.59" y1="16.41" x2="9.41" y2="14.59" />
      <line x1="14.59" y1="16.41" x2="12.77" y2="14.59" />
    </svg>
  );
}

// SaaS Platforms Icon - Cloud with text
function SaaSIcon() {
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
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      <text
        x="12"
        y="14"
        textAnchor="middle"
        className="text-[8px] font-bold"
        fill="currentColor"
      >
        SaaS
      </text>
    </svg>
  );
}

// API & System Integration Icon - Two gears interlocking
function APIIcon() {
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
      <circle cx="9" cy="9" r="3" />
      <circle cx="15" cy="15" r="3" />
      <path d="M9 9l6 6" />
      <path d="M9 12l3-3" />
      <path d="M12 9l3 3" />
      <path d="M15 12l-3 3" />
      <path d="M12 15l-3-3" />
    </svg>
  );
}

/**
 * Services data array - Exact content from the screenshot.
 * Each service includes icon, title, and description matching the design.
 */
const services: ServiceData[] = [
  {
    icon: <WebAppIcon />,
    title: 'Web Applications',
    description:
      'We build custom web applications that breeze through performance tests, keep your users safe, and just plain work - on any device, anywhere.',
  },
  {
    icon: <EnterpriseIcon />,
    title: 'Enterprise Software',
    description:
      'Robust, complex enterprise solutions that really make a difference - streamlining your ops, making things more efficient, and keeping workflows running smoothly at scale.',
  },
  {
    icon: <SaaSIcon />,
    title: 'SaaS Platforms',
    description:
      'We focus on building SaaS solutions that just work - and keep on working - from that initial Minimum Viable Product (MVP) right up to a full-scale platform that scales with your business.',
  },
  {
    icon: <APIIcon />,
    title: 'API & System Integration',
    description:
      'Secure API development and system integrations that keep your systems talking - automating workflows and ensuring data flows smoothly between platforms.',
  },
];

/**
 * Pixel-perfect Core Services section component.
 *
 * Layout:
 * - Centered section header (label, heading, subtitle)
 * - 4-column grid on desktop (lg:grid-cols-4)
 * - 2-column grid on tablet (md:grid-cols-2)
 * - 1-column grid on mobile
 * - Equal spacing between cards
 *
 * Background:
 * - Dark green-black gradient matching the screenshot
 * - Subtle overlay glow effects
 *
 * Typography:
 * - Small uppercase label in neon green
 * - Large bold heading in white
 * - Muted subtitle text in light gray
 */
export function CoreServices() {
  return (
    <section
      id="core-services"
      aria-labelledby="core-services-heading"
      className="relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#021E14] to-[#063C2C] py-16 sm:py-20"
    >
      {/* Subtle glow overlay effect */}
      <div
        className="absolute right-0 top-0 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#22C55E] opacity-5 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        {/* Section Header - Centered */}
        <div className="relative z-10 text-center">
          {/* Label - Small uppercase neon green */}
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#22C55E] sm:text-sm">
            WHAT WE DO
          </p>

          {/* Main Heading - Large bold white */}
          <h2
            id="core-services-heading"
            className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            The Core Services
          </h2>

          {/* Subtitle - Light gray, centered, comfortable line height */}
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
            We craft scalable, secure software solutions that work seamlessly
            across the web, SaaS, and enterprise systems - because you need
            technology that just gets on with it.
          </p>
        </div>

        {/* Service Cards Grid - Responsive layout */}
        <div className="relative z-10 mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
