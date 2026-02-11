import { Container } from '@/components/ui/Container';

export default function LoadingBlogPost() {
  return (
    <Container as="main" size="narrow" className="py-12">
      <div className="animate-pulse">
        <div className="h-8 w-3/4 bg-gray-200 rounded mb-4" />
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-8" />
        <div className="h-64 bg-gray-100 rounded mb-8" />
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
        </div>
      </div>
    </Container>
  );
}

import { Container } from '@/components/ui/Container';

// Loading skeleton for the blog detail route.
export default function Loading() {
  return (
    <Container size="narrow" className="py-12">
      <div className="animate-pulse">
        <div className="h-10 bg-slate-200 rounded w-3/4 mb-4" />
        <div className="h-6 bg-slate-200 rounded w-1/3 mb-6" />
        <div className="h-60 bg-slate-200 rounded mb-6" />
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
          <div className="h-4 bg-slate-200 rounded w-2/3" />
        </div>
      </div>
    </Container>
  );
}

