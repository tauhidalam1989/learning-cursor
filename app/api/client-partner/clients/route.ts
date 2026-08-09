import { proxyToBackend } from '@/lib/apiProxy';

const FALLBACK_CLIENTS = [
  { id: 1, name: 'Saudi Aramco Digital', logo: '/uploads/clients/aramco.png', isActive: true, order: 1 },
  { id: 2, name: 'STC Technology Solutions', logo: '/uploads/clients/stc.png', isActive: true, order: 2 },
  { id: 3, name: 'NEOM Tech & Innovation', logo: '/uploads/clients/neom.png', isActive: true, order: 3 },
  { id: 4, name: 'Al Rajhi Digital Banking', logo: '/uploads/clients/alrajhi.png', isActive: true, order: 4 }
];

export async function GET(request: Request) {
  return proxyToBackend(request, '/api/client-partner/clients', FALLBACK_CLIENTS);
}

export async function POST(request: Request) {
  return proxyToBackend(request, '/api/client-partner/clients');
}
