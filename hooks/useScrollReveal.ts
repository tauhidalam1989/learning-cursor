'use client';

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    const observeAll = () => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    };
    observeAll();
    let debounceId: ReturnType<typeof setTimeout>;
    const mut = new MutationObserver(() => {
      clearTimeout(debounceId);
      debounceId = setTimeout(observeAll, 100);
    });
    mut.observe(document.body, { childList: true, subtree: true });
    return () => {
      clearTimeout(debounceId);
      observer.disconnect();
      mut.disconnect();
    };
  }, []);
}
