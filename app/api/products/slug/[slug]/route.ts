import { proxyToBackend } from '@/lib/apiProxy';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await context.params;
  return proxyToBackend(request, `/api/products/slug/${slug}`);
}
