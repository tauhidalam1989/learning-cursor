import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';

const AI_TILES = [
  {
    icon: '🤖',
    title: 'LLM Integration & Fine-tuning',
    body: 'Deploy GPT-4, Claude, Gemini, or open-source models into your product with custom fine-tuning and retrieval-augmented generation pipelines.',
  },
  {
    icon: '⚡',
    title: 'AI Agents & Automation',
    body: 'Build multi-step autonomous agents that handle complex business workflows — from customer support to data processing pipelines.',
  },
  {
    icon: '📊',
    title: 'Predictive Analytics & ML',
    body: 'Turn your data into actionable intelligence with custom ML models, forecasting systems, and intelligent recommendation engines.',
  },
];

export function AiSpotlightSection() {
  return (
    <section
      id="ai-spotlight"
      aria-labelledby="ai-spotlight-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-12 sm:py-16 lg:py-24"
    >
      <Container>
        <div className="grid min-w-0 gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="reveal min-w-0">
            <MarketingSectionHeader
              align="left"
              descriptionMax="none"
              label="AI-FIRST COMPANY"
              title="We Don't Just Talk AI — We Ship It"
              titleId="ai-spotlight-heading"
              description="Every solution we deliver is designed with AI capabilities at its core. We help businesses integrate large language models, build autonomous agents, and create intelligent systems that learn and adapt."
            />
            <div className="mt-8 space-y-4">
              {AI_TILES.map((tile) => (
                <div
                  key={tile.title}
                  className="flex min-w-0 items-start gap-3 rounded-xl border border-corematrix-border bg-corematrix-card p-4 transition-colors hover:border-corematrix-border2 sm:gap-4 sm:p-5"
                >
                  <span className="shrink-0 text-2xl" aria-hidden>
                    {tile.icon}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-corematrix-textPrimary">
                      {tile.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-corematrix-textSecondary">
                      {tile.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              Explore AI Services →
            </Link>
          </div>
          <div className="reveal reveal-delay-2 flex w-full min-w-0 justify-center lg:justify-end">
            <div className="w-full max-w-[460px] min-w-0">
              <Image
                src="/images/ai-spotlight-illustration.png"
                alt="Isometric illustration of a laptop with a robot, AI cube, brain, and media icons on a circuit-board floor"
                width={1024}
                height={1024}
                className="h-auto w-full rounded-2xl border border-corematrix-border bg-black object-contain"
                sizes="(max-width: 1024px) 100vw, 460px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
