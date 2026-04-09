import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';

type TechCategory = { label: string; items: string[] };

const TECH_CATEGORIES: TechCategory[] = [
  {
    label: 'AI & Machine Learning',
    items: [
      'OpenAI API',
      'LangChain',
      'LlamaIndex',
      'Pinecone',
      'Hugging Face',
      'PyTorch',
      'TensorFlow',
      'Claude API',
      'Gemini',
      'Mistral',
      'RAG Pipelines',
      'Vector DBs',
    ],
  },
  {
    label: 'Frontend & Web',
    items: [
      'Next.js 14',
      'React 18',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'React Native',
      'Flutter',
      'Remix',
      'tRPC',
      'GraphQL',
      'Zustand',
      'React Query',
    ],
  },
  {
    label: 'Backend & Infrastructure',
    items: [
      'Node.js',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Docker',
      'Kubernetes',
      'AWS',
      'GCP',
      'Supabase',
      'Vercel',
    ],
  },
];

export function TechStackSection() {
  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
      <MarketingSectionHeader
        label="TECH STACK"
        title="Technologies We Build With"
        titleId="tech-stack-heading"
        description="Modern, battle-tested tools that power production systems worldwide."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {TECH_CATEGORIES.map((cat) => (
          <article
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
                  className="rounded-lg border border-corematrix-border bg-corematrix-card2 px-3 py-1.5 text-xs font-medium text-corematrix-textMuted transition-all hover:border-corematrix-border2 hover:bg-corematrix-green900/10 hover:text-corematrix-textSecondary"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      </Container>
    </section>
  );
}
