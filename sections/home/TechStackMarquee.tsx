const TECHS = [
  'Next.js',
  'React',
  'TypeScript',
  'Python',
  'Node.js',
  'TensorFlow',
  'PyTorch',
  'OpenAI API',
  'LangChain',
  'LlamaIndex',
  'AWS',
  'GCP',
  'Docker',
  'Kubernetes',
  'PostgreSQL',
  'MongoDB',
  'FastAPI',
  'Pinecone',
  'Supabase',
  'Vercel',
  'Redis',
  'GraphQL',
  'Prisma',
  'Tailwind CSS',
  'LLM Fine-tuning',
];

const THEMES = [
  {
    bg: 'bg-cyan-950/20',
    border: 'border-cyan-500/15',
    text: 'text-cyan-300',
    dot: 'bg-cyan-400',
    hoverBorder: 'hover:border-cyan-400/40',
    hoverBg: 'hover:bg-cyan-950/35',
  },
  {
    bg: 'bg-amber-950/20',
    border: 'border-amber-500/15',
    text: 'text-amber-300',
    dot: 'bg-amber-400',
    hoverBorder: 'hover:border-amber-400/40',
    hoverBg: 'hover:bg-amber-950/35',
  },
  {
    bg: 'bg-indigo-950/20',
    border: 'border-indigo-500/15',
    text: 'text-indigo-300',
    dot: 'bg-indigo-400',
    hoverBorder: 'hover:border-indigo-400/40',
    hoverBg: 'hover:bg-indigo-950/35',
  },
  {
    bg: 'bg-purple-950/20',
    border: 'border-purple-500/15',
    text: 'text-purple-300',
    dot: 'bg-purple-400',
    hoverBorder: 'hover:border-purple-400/40',
    hoverBg: 'hover:bg-purple-950/35',
  },
  {
    bg: 'bg-orange-950/20',
    border: 'border-orange-500/15',
    text: 'text-orange-300',
    dot: 'bg-orange-400',
    hoverBorder: 'hover:border-orange-400/40',
    hoverBg: 'hover:bg-orange-950/35',
  },
  {
    bg: 'bg-sky-950/20',
    border: 'border-sky-500/15',
    text: 'text-sky-300',
    dot: 'bg-sky-400',
    hoverBorder: 'hover:border-sky-400/40',
    hoverBg: 'hover:bg-sky-950/35',
  },
  {
    bg: 'bg-rose-950/20',
    border: 'border-rose-500/15',
    text: 'text-rose-300',
    dot: 'bg-rose-400',
    hoverBorder: 'hover:border-rose-400/40',
    hoverBg: 'hover:bg-rose-950/35',
  },
  {
    bg: 'bg-emerald-950/20',
    border: 'border-emerald-500/15',
    text: 'text-emerald-300',
    dot: 'bg-emerald-400',
    hoverBorder: 'hover:border-emerald-400/40',
    hoverBg: 'hover:bg-emerald-950/35',
  },
];

export function TechStackMarquee() {
  return (
    <section
      aria-label="Technologies we master"
      className="relative overflow-hidden border-y border-corematrix-border bg-corematrix-bg0 py-6"
    >
      <div
        className="absolute left-0 -top-1 z-10 h-[calc(100%+0.5rem)] w-24 bg-gradient-to-r from-corematrix-bg0 to-transparent"
        aria-hidden
      />
      <div className="flex animate-marquee gap-0 whitespace-nowrap">
        {[...TECHS, ...TECHS].map((tech, i) => {
          const theme = THEMES[i % THEMES.length];
          return (
            <span
              key={`${tech}-${i}`}
              className={`mx-1.5 flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 cursor-default ${theme.border} ${theme.bg} ${theme.text} ${theme.hoverBorder} ${theme.hoverBg}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
              {tech}
            </span>
          );
        })}
      </div>
    </section>
  );
}
