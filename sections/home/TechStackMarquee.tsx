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
      <p
        className="absolute left-6 top-1/2 z-20 -translate-y-1/2 text-xs font-semibold uppercase tracking-widest text-corematrix-textMuted"
        aria-hidden
      >
        TECHNOLOGIES WE MASTER
      </p>
      <div className="flex animate-marquee gap-0 whitespace-nowrap">
        {[...TECHS, ...TECHS].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="mx-1.5 flex items-center gap-2 rounded-full border border-corematrix-border bg-corematrix-card px-4 py-2 text-xs font-medium text-corematrix-textMuted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-corematrix-green500" />
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
