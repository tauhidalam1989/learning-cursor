import { Container } from '@/components/ui/Container';

export type LocationDetail = { icon: string; text: string };

const LOCATION_DETAILS: LocationDetail[] = [
  { icon: '⏰', text: 'Overlap hours available for all major time zones' },
  {
    icon: '💬',
    text: 'Async-first: Slack, Notion, Linear — your tools, our workflow',
  },
  { icon: '📹', text: 'Weekly video calls on Google Meet or Zoom' },
  { icon: '🔒', text: 'GDPR-compliant data handling for EU clients' },
  { icon: '📋', text: 'NDA signed before any sensitive project discussions' },
];

export function LocationSection() {
  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative h-[340px] overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              aria-hidden
            >
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="map-grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#1a3525"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
              </svg>
            </div>
            {/* TODO: Replace with actual <iframe> Google Map embed or <Image> map screenshot */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="map-ring map-ring-1" aria-hidden />
              <div className="map-ring map-ring-2" aria-hidden />
              <div className="map-ring map-ring-3" aria-hidden />
              <span
                className="relative z-10 float-anim text-4xl"
                aria-hidden
              >
                📍
              </span>
              <p className="mt-3 font-display text-sm font-bold text-corematrix-textPrimary">
                Remote-First
              </p>
              <p className="text-xs text-corematrix-textMuted">
                Team across multiple time zones
              </p>
            </div>
          </div>

          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-corematrix-green700/20 bg-corematrix-green900/20 px-3 py-1 text-[0.65rem] font-semibold text-corematrix-green700">
              🌍 Global Presence
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold text-corematrix-textPrimary">
              We Work Across Every Time Zone
            </h3>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              Our team is distributed across multiple regions. We design our
              workflows for async collaboration with overlap hours that work for
              your schedule — whether you&apos;re in San Francisco, London, or
              Singapore.
            </p>
            <ul className="mt-6 space-y-4">
              {LOCATION_DETAILS.map((d) => (
                <li key={d.text} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-corematrix-green700/[0.15] bg-corematrix-green900/20 text-sm">
                    {d.icon}
                  </div>
                  <span className="text-sm text-corematrix-textSecondary">
                    {d.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
