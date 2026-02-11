'use client';
import { Container } from '@/components/ui/Container';
import { notFound } from 'next/navigation';

export default function BlogPostError({ error }: { error: Error }) {
  // If a post fails due to a missing resource, fall back to 404.
  // Otherwise show a minimal error message.
  if (error?.message?.includes('404')) {
    notFound();
  }

  return (
    <Container as="main" size="narrow" className="py-12">
      <h1 className="text-2xl font-bold">Post unavailable</h1>
      <p className="mt-4 text-red-600">There was an error loading this post: {error?.message ?? 'Unknown error'}</p>
    </Container>
  );
}

 'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/Container';

// Client-side error boundary for the blog post route segment.
// Next.js will render this when an error is thrown during rendering.
// We use a client component so we can access the `reset` callback to retry.
export default function BlogError({ error, reset }: { error: Error; reset?: () => void }) {
  useEffect(() => {
    // Log the error on the client for debugging; server logs will also capture stack traces.
    // eslint-disable-next-line no-console
    console.error('Blog route error:', error);
  }, [error]);

  return (
    <Container size="narrow" className="py-12">
      <div className="rounded-md bg-red-50 p-6">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="mt-2 text-sm text-muted-foreground">An unexpected error occurred while loading this post. Please try again later.</p>
        {reset ? (
          <div className="mt-4">
            <button
              onClick={() => reset && reset()}
              className="inline-block rounded bg-white/5 px-4 py-2 text-sm underline"
            >
              Try again
            </button>
          </div>
        ) : null}
      </div>
    </Container>
  );
}

