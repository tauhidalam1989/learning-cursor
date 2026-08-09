import { proxyToBackend } from '@/lib/apiProxy';

const FALLBACK_CATEGORIES = [
  { id: 1, name: 'Enterprise Platforms', nameAr: 'منصات المؤسسات الكبرى', slug: 'enterprise-platforms', icon: 'Building2', order: 1, isActive: true },
  { id: 2, name: 'AI & Data Intelligence', nameAr: 'الذكاء الاصطناعي وذكاء البيانات', slug: 'ai-data-intelligence', icon: 'Cpu', order: 2, isActive: true },
  { id: 3, name: 'Cloud & Infrastructure', nameAr: 'السحابة والبنية التحتية', slug: 'cloud-infrastructure', icon: 'Cloud', order: 3, isActive: true }
];

export async function GET(request: Request) {
  return proxyToBackend(request, '/api/product-categories', FALLBACK_CATEGORIES);
}

export async function POST(request: Request) {
  return proxyToBackend(request, '/api/product-categories');
}
