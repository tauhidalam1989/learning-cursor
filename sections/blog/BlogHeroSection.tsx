import { Container } from '@/components/ui/Container';

export function BlogHeroSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <Container>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Insights and updates from our team on strategy, design, and growth.
        </p>
      </Container>
    </section>
  );
}
