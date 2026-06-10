'use client';

import { useState, useMemo, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { RoleCard } from '@/components/careers/RoleCard';
import { getAllDbCareers } from '@/lib/careers';
import { useLanguage } from '@/context/LanguageContext';
import type { OpenRole } from '@/types/careers';

export function OpenRolesSection() {
  const { language, t } = useLanguage();
  const [activeDept, setActiveDept] = useState<string>('all');
  const [roles, setRoles] = useState<OpenRole[]>([]);

  useEffect(() => {
    async function loadJobs() {
      const dbJobs = await getAllDbCareers(language);
      setRoles(dbJobs);
    }
    loadJobs();
  }, [language]);

  const DEPT_LABELS: Record<string, { en: string; ar: string }> = {
    engineering: { en: 'Engineering', ar: 'الهندسة' },
    design: { en: 'Design', ar: 'التصميم' },
    product: { en: 'Product', ar: 'إدارة المنتجات' },
    devops: { en: 'DevOps', ar: 'العمليات والتطوير' },
  };

  const grouped = useMemo(() => {
    const groups: Record<string, OpenRole[]> = {};
    for (const role of roles) {
      if (role.department) {
        if (!groups[role.department]) {
          groups[role.department] = [];
        }
        groups[role.department].push(role);
      }
    }
    return groups;
  }, [roles]);

  const departmentFilters = useMemo(() => {
    const depts = Object.keys(grouped);
    const filters = depts.map(deptId => {
      const labelObj = DEPT_LABELS[deptId] || {
        en: deptId.charAt(0).toUpperCase() + deptId.slice(1),
        ar: deptId
      };
      return {
        id: deptId,
        label: language === 'ar' ? labelObj.ar : labelObj.en,
        count: grouped[deptId].length
      };
    });

    return [
      {
        id: 'all',
        label: language === 'ar' ? 'كل الوظائف' : 'All Roles',
        count: roles.length
      },
      ...filters
    ];
  }, [grouped, roles, language]);

  const deptsToShow = useMemo(() => {
    if (activeDept === 'all') {
      return Object.keys(grouped);
    }
    return grouped[activeDept] ? [activeDept] : [];
  }, [activeDept, grouped]);

  return (
    <section
      id="open-roles"
      aria-labelledby="open-roles-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t('OPEN ROLES', 'الوظائف الشاغرة')}
          title={t('Join Our Growing Team', 'انضم إلى فريقنا المتنامي')}
          titleId="open-roles-heading"
          description={t(
            'Find a role that matches your skills. Every position is remote-first and offers real ownership from day one.',
            'ابحث عن دور يطابق مهاراتك. كل وظيفة لدينا هي عن بعد وتوفر لك ملكية حقيقية لنتائج عملك من اليوم الأول.'
          )}
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {departmentFilters.map((f) => (
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
            const labelObj = DEPT_LABELS[dept] || {
              en: dept.charAt(0).toUpperCase() + dept.slice(1),
              ar: dept
            };
            const label = language === 'ar' ? labelObj.ar : labelObj.en;
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
