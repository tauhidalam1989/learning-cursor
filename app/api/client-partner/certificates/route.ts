import { proxyToBackend } from '@/lib/apiProxy';

const FALLBACK_CERTIFICATES = [
  { id: 1, name: 'ISO 27001 Information Security Management', image: '/uploads/certificates/iso27001.png', isActive: true, order: 1 },
  { id: 2, name: 'ISO 9001 Quality Management System', image: '/uploads/certificates/iso9001.png', isActive: true, order: 2 },
  { id: 3, name: 'SOC 2 Type II Security & Privacy Compliance', image: '/uploads/certificates/soc2.png', isActive: true, order: 3 }
];

export async function GET(request: Request) {
  return proxyToBackend(request, '/api/client-partner/certificates', FALLBACK_CERTIFICATES);
}

export async function POST(request: Request) {
  return proxyToBackend(request, '/api/client-partner/certificates');
}
