import { Container } from '@/components/ui/Container';

export function AboutHeroSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <Container>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          About us
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          We are a team of strategists, designers, and growth experts focused on
          helping brands succeed in a changing world.
        </p>
      </Container>
    </section>
  );
}
