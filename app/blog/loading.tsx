import { Container } from '@/components/ui/Container';

export default function LoadingBlogPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <h2 className="mb-12 text-3xl font-bold text-gray-900">Latest posts</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="mt-4 h-3 w-1/2 bg-gray-200 rounded" />
              <div className="mt-6 h-24 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

