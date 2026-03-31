import Link from 'next/link';
import type { Project } from '@/types/portfolio';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="reveal group flex flex-col overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card transition-all duration-300 card-glow hover:-translate-y-1"
    >
      <div className="relative h-44 flex-shrink-0 overflow-hidden border-b border-corematrix-border bg-corematrix-bg0">
        {/* TODO: Replace with <Image src={project.coverImage} alt={project.title} fill className="object-cover" /> when Payload media is available */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.thumbGradient}`}
          aria-hidden
        />
        <div
          className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
        <span className="absolute left-3 top-3 z-10 rounded-full border border-corematrix-green700/30 bg-corematrix-green900/60 px-2.5 py-0.5 font-mono text-[0.62rem] font-semibold text-corematrix-green400">
          {project.categoryLabel}
        </span>
        <span className="absolute right-3 top-3 z-10 rounded bg-corematrix-bg0/80 px-2 py-0.5 text-[0.6rem] font-medium text-corematrix-textMuted backdrop-blur-sm">
          {project.industry}
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-5xl" aria-hidden>
          {project.emoji}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 font-display text-sm font-bold leading-snug text-corematrix-textPrimary">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 line-clamp-3 text-xs font-light leading-relaxed text-corematrix-textMuted">
          {project.description}
        </p>
        <div className="mt-4 flex gap-4">
          {project.metrics.slice(0, 3).map((m) => (
            <div key={m.label}>
              <p className="font-display text-sm font-bold text-corematrix-green400">
                {m.value}
              </p>
              <p className="text-[0.65rem] text-corematrix-textDim">{m.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded border border-corematrix-border bg-corematrix-card2 px-2 py-0.5 font-mono text-[0.6rem] text-corematrix-textDim"
            >
              {tech}
            </span>
          ))}
        </div>
        <span className="mt-4 flex items-center justify-between text-sm font-semibold text-corematrix-green400">
          View case study
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
