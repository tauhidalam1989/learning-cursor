import { proxyToBackend } from '@/lib/apiProxy';

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  const { id } = await context.params;
  return proxyToBackend(request, `/api/products/${id}/unpublish`);
}
