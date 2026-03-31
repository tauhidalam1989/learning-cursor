'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Use in the DISPATCHER component (filter nav / category nav).
 * Fires a CustomEvent when the active filter changes.
 */
export function useFilterDispatch(eventName: string) {
  const [active, setActive] = useState<string>('all');

  const dispatch = useCallback(
    (value: string) => {
      setActive(value);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(eventName, { detail: value }));
      }
    },
    [eventName]
  );

  return { active, dispatch };
}

/**
 * Use in the LISTENER component (posts grid / project grid / service grid).
 * Listens for a CustomEvent and returns the current active filter.
 */
export function useFilterListener(eventName: string) {
  const [active, setActive] = useState<string>('all');

  useEffect(() => {
    const handler = (e: Event) =>
      setActive((e as CustomEvent<string>).detail);
    window.addEventListener(eventName, handler);
    return () => window.removeEventListener(eventName, handler);
  }, [eventName]);

  return active;
}
