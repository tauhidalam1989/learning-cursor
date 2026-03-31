'use client';

import { useState, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { RoleCard } from '@/components/careers/RoleCard';
import { OPEN_ROLES, DEPARTMENT_FILTERS } from '@/data/careersData';
import type { Department } from '@/types/careers';

export function OpenRolesSection() {
  const [activeDept, setActiveDept] = useState<string>('all');

  const grouped = useMemo(() => {
    const groups: Record<Exclude<Department, 'all'>, typeof OPEN_ROLES> = {
      engineering: [],
      design: [],
      product: [],
      devops: [],
    };
    for (const role of OPEN_ROLES) {
      groups[role.department].push(role);
    }
    return groups;
  }, []);

  const deptsToShow: (Exclude<Department, 'all'>)[] =
    activeDept === 'all'
      ? ['engineering', 'design', 'product', 'devops']
      : [activeDept as Exclude<Department, 'all'>];

  return (
    <section
      id="open-roles"
      aria-labelledby="open-roles-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <div className="text-center">
          <p className="section-label text-corematrix-green400">OPEN ROLES</p>
          <h2
            id="open-roles-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Join Our Growing Team
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-corematrix-textSecondary">
            Find a role that matches your skills. Every position is remote-first and offers
            real ownership from day one.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {DEPARTMENT_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveDept(f.id)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all cursor-pointer ${
                activeDept === f.id
                  ? 'border-corematrix-green400/30 bg-corematrix-green900/20 font-semibold text-corematrix-green400'
                  : 'border-corematrix-border bg-corematrix-card text-corematrix-textMuted hover:text-corematrix-textPrimary'
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-12">
          {deptsToShow.map((dept) => {
            const roles = grouped[dept];
            if (roles.length === 0) return null;
            const labels: Record<Exclude<Department, 'all'>, string> = {
              engineering: 'Engineering',
              design: 'Design',
              product: 'Product',
              devops: 'DevOps',
            };
            const label = labels[dept];
            return (
              <div key={dept}>
                <div className="mb-4 flex items-center gap-4">
                  <span className="font-display text-[0.68rem] font-bold uppercase tracking-[0.15em] text-corematrix-green400">
                    {label}
                  </span>
                  <div className="h-px flex-1 bg-corematrix-border" />
                </div>
                <div className="flex flex-col gap-3">
                  {roles.map((role) => (
                    <RoleCard key={role.id} role={role} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
