'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { PROJECTS } from '@/data/portfolioData';
import { useFilterListener } from '@/hooks/usePortalFilter';

// TODO: Replace PROJECTS with CMS fetch when cms-portfolio collection is available
// TODO: Create individual project case study pages at app/portfolio/[slug]/page.tsx

export function ProjectsGridSection() {
  const activeFilter = useFilterListener('portfolioFilter');

  const filtered =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section
      aria-labelledby="projects-grid-heading"
      className="bg-corematrix-bg0 px-4 pb-20 pt-8 sm:px-6 lg:px-8"
    >
      <Container>
        <h2 id="projects-grid-heading" className="sr-only">
          All projects
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
          >
            See All 50+ Projects — Contact Us →
          </Link>
        </div>
      </Container>
    </section>
  );
}
