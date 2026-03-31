'use client';
import { Container } from '@/components/ui/Container';

export default function BlogError({ error }: { error: Error }) {
  // Minimal error UI that preserves existing design.
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <h2 className="mb-6 text-3xl font-bold text-gray-900">Blog</h2>
        <p className="text-red-600">Something went wrong loading posts: {error?.message ?? 'Unknown error'}</p>
      </Container>
    </section>
  );
}

