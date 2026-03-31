import { TECH_STACK_ITEMS } from '@/data/careersData';

export function CareersMarquee() {
  return (
    <section
      aria-label="Our tech stack"
      className="relative overflow-hidden border-y border-corematrix-border bg-corematrix-bg0 py-5"
    >
      <div
        className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-corematrix-bg0 to-transparent"
        aria-hidden
      />
      <p
        className="absolute left-6 top-1/2 z-20 -translate-y-1/2 font-display text-xs font-semibold uppercase tracking-widest text-corematrix-textMuted"
        aria-hidden
      >
        OUR STACK
      </p>
      <div className="flex animate-marquee gap-0 whitespace-nowrap">
        {[...TECH_STACK_ITEMS, ...TECH_STACK_ITEMS].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="mx-1.5 flex items-center gap-2 rounded-full border border-corematrix-border bg-corematrix-card px-4 py-1.5 text-xs font-medium text-corematrix-textMuted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-corematrix-green500" />
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
