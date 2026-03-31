import { Container } from '@/components/ui/Container';

const CLIENT_LOGOS = ['TECHCORP', 'NEXAFLOW', 'DATAZEN', 'BUILDIFY', 'SCALR', 'ORBITLAB'];

export function ClientLogosSection() {
  return (
    <section
      id="client-logos"
      aria-label="Trusted by teams at"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-16"
    >
      <Container>
      <p className="mb-10 text-center font-display text-[0.68rem] font-bold uppercase tracking-[0.15em] text-corematrix-textDim">
        TRUSTED BY TEAMS AT
      </p>
      {/* TODO: Replace text placeholders with <Image> components once logo assets are available */}
      <div className="reveal grid grid-cols-3 divide-x divide-y divide-corematrix-border overflow-hidden rounded-2xl border border-corematrix-border md:grid-cols-6">
        {CLIENT_LOGOS.map((logo) => (
          <div
            key={logo}
            className="flex cursor-default items-center justify-center bg-corematrix-card px-6 py-7 font-display text-sm font-bold tracking-[0.05em] text-corematrix-textDim transition-all hover:bg-corematrix-card2 hover:text-corematrix-textMuted"
          >
            {logo}
          </div>
        ))}
      </div>
      </Container>
    </section>
  );
}
