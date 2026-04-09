import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { TECH_CATEGORIES } from '@/data/portfolioData';

export function PortfolioTechSection() {
  return (
    <section
      aria-labelledby="tech-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label="TECHNOLOGY STACK"
          title="The Tools That Power Every Project We Ship"
          titleId="tech-heading"
          description="Modern, production-ready technologies — no legacy lock-in."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TECH_CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="reveal rounded-2xl border border-corematrix-border bg-corematrix-card p-7"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="font-display text-[0.68rem] font-bold uppercase tracking-[0.12em] text-corematrix-green400">
                  {cat.label}
                </span>
                <div className="h-px flex-1 bg-corematrix-border" />
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-corematrix-border bg-corematrix-card2 px-3 py-1.5 text-xs font-medium text-corematrix-textMuted transition-all hover:border-corematrix-border2 hover:bg-corematrix-green900/[0.05] hover:text-corematrix-textSecondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
