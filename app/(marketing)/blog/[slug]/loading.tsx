import { Container } from '@/components/ui/Container';

export default function LoadingBlogPost() {
  return (
    <Container as="main" size="narrow" className="py-12">
      <div className="animate-pulse">
        <div className="mb-4 h-8 w-3/4 rounded bg-gray-200" />
        <div className="mb-8 h-6 w-1/3 rounded bg-gray-200" />
        <div className="mb-8 h-64 rounded bg-gray-100" />
        <div className="space-y-4">
          <div className="h-4 rounded bg-gray-200" />
          <div className="h-4 rounded bg-gray-200" />
          <div className="h-4 rounded bg-gray-200" />
        </div>
      </div>
    </Container>
  );
}
