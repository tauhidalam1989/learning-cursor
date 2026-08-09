import { proxyToBackend } from '@/lib/apiProxy';

const FALLBACK_PARTNERS = [
  { id: 1, name: 'Microsoft Gold Partner', logo: '/uploads/partners/microsoft.png', isActive: true, order: 1 },
  { id: 2, name: 'AWS Cloud Premier Partner', logo: '/uploads/partners/aws.png', isActive: true, order: 2 },
  { id: 3, name: 'Google Cloud Platform Partner', logo: '/uploads/partners/gcp.png', isActive: true, order: 3 },
  { id: 4, name: 'NVIDIA AI Alliance Partner', logo: '/uploads/partners/nvidia.png', isActive: true, order: 4 }
];

export async function GET(request: Request) {
  return proxyToBackend(request, '/api/client-partner/partners', FALLBACK_PARTNERS);
}

export async function POST(request: Request) {
  return proxyToBackend(request, '/api/client-partner/partners');
}
