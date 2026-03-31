'use client';

import Link from 'next/link';
import { POLICY_SECTIONS } from '@/data/privacyData';
import { siteConfig } from '@/config/site';
import { useActiveSection } from '@/hooks/useActiveSection';

export function PrivacyToc() {
  const activeId = useActiveSection('.policy-section') || 's1';

  return (
    <aside className="lg:sticky lg:top-[88px]">
      <nav aria-label="Privacy policy sections">
        <p className="mb-3 font-display text-[0.68rem] font-bold uppercase tracking-[0.12em] text-corematrix-green400">
          ON THIS PAGE
        </p>
        <div className="overflow-hidden rounded-2xl border border-corematrix-border">
          {POLICY_SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className={`flex items-center gap-3 border-b border-corematrix-border/50 bg-corematrix-card px-4 py-3 text-sm font-medium transition-all last:border-0 hover:bg-corematrix-green900/[0.06] hover:text-corematrix-textPrimary ${
                activeId === section.id
                  ? 'toc-link-active bg-corematrix-green900/10 text-corematrix-green400'
                  : 'text-corematrix-textMuted'
              }`}
            >
              <span className="w-5 flex-shrink-0 font-mono text-[0.65rem] text-corematrix-textDim">
                {section.num}
              </span>
              {section.title}
            </Link>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-corematrix-border bg-corematrix-card p-5">
          <p className="mb-3 font-display text-[0.62rem] font-bold uppercase tracking-wider text-corematrix-green400">
            DATA CONTROLLER
          </p>
          <p className="text-sm font-medium text-corematrix-textPrimary">Corematrix</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-1 block text-sm text-corematrix-textMuted transition-colors hover:text-corematrix-green400"
          >
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.phoneTel}
            className="mt-1 block text-sm text-corematrix-textMuted transition-colors hover:text-corematrix-green400"
          >
            {siteConfig.phone}
          </a>
        </div>
      </nav>
    </aside>
  );
}
