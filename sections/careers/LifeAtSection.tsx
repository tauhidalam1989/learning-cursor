import { Container } from '@/components/ui/Container';
import { LIFE_CELLS } from '@/data/careersData';

export function LifeAtSection() {
  return (
    <section
      id="careers-life"
      aria-labelledby="careers-life-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <p className="section-label text-corematrix-green400">LIFE AT COREMATRIX</p>
        <h2
          id="careers-life-heading"
          className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
        >
          The Way We Work, Day to Day
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {LIFE_CELLS.map((cell) => (
            <div
              key={cell.label}
              className={`relative flex min-h-[10rem] cursor-default items-center justify-center overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card transition-all hover:scale-[1.02] hover:border-corematrix-border2 ${
                cell.span === 'tall' ? 'lg:row-span-2 lg:min-h-[22rem]' : ''
              } ${cell.span === 'wide' ? 'col-span-2' : ''}`}
            >
              {/* TODO: Replace placeholder with <Image src={cell.image} alt={cell.label} fill className="object-cover" /> */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-corematrix-green900/40 to-corematrix-card2 opacity-[0.95]"
                aria-hidden
              />
              <div
                className="life-cell-pattern pointer-events-none absolute inset-0 opacity-[0.05]"
                aria-hidden
              />
              <span className="relative z-10 text-4xl" aria-hidden>
                {cell.icon}
              </span>
              <span className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-corematrix-bg0/80 to-transparent p-3 font-display text-xs font-bold text-corematrix-textSecondary">
                {cell.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
