'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { notFound } from 'next/navigation';

interface BlogErrorProps {
  error: Error;
  reset?: () => void;
}

export default function BlogPostError({ error, reset }: BlogErrorProps) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('Blog route error:', error);
  }, [error]);

  if (error?.message?.includes('404')) {
    notFound();
  }

  return (
    <Container as="main" size="narrow" className="py-12">
      <div className="rounded-md bg-red-50 p-6">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          An unexpected error occurred while loading this post. Please try again later.
        </p>
        {reset && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-block rounded bg-white/5 px-4 py-2 text-sm underline"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}
