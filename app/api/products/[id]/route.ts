import { proxyToBackend } from '@/lib/apiProxy';

export async function GET(request: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  const { id } = await context.params;
  return proxyToBackend(request, `/api/products/${id}`);
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  const { id } = await context.params;
  return proxyToBackend(request, `/api/products/${id}`);
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  const { id } = await context.params;
  return proxyToBackend(request, `/api/products/${id}`);
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  const { id } = await context.params;
  return proxyToBackend(request, `/api/products/${id}`);
}
