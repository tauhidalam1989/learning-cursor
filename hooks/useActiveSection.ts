'use client';

import { useState, useEffect } from 'react';

export function useActiveSection(
  sectionSelector: string,
  rootMargin = '-20% 0px -70% 0px'
): string {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const sections = document.querySelectorAll(sectionSelector);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [sectionSelector, rootMargin]);

  return activeId;
}
