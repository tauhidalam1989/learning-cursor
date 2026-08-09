import { proxyToBackend } from '@/lib/apiProxy';

export async function GET(request: Request) {
  return proxyToBackend(request, '/api/products');
}

export async function POST(request: Request) {
  return proxyToBackend(request, '/api/products');
}
