import { Container } from '@/components/ui/Container';

export function TeamSection() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Our team</h2>
        <p className="text-gray-600 max-w-2xl">
          Meet the people behind our work. We believe in collaboration, transparency,
          and continuous learning.
        </p>
      </Container>
    </section>
  );
}
