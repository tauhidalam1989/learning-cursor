import { proxyToBackend } from '@/lib/apiProxy';

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: 'Core Matrix Enterprise ERP',
    titleAr: 'نظام إدارة الموارد المتكاملة كور ماتريكس',
    slug: 'core-matrix-erp',
    shortDescription: 'Comprehensive ERP suite empowering enterprise resource management, financial tracking, and operational automation.',
    shortDescriptionAr: 'مجموعة برامج تخطيط موارد المؤسسات الشاملة لتمكين إدارة الموارد والمالية والعمليات.',
    cardIcon: 'LayoutGrid',
    isPublished: true,
    order: 1
  },
  {
    id: 2,
    title: 'Intelligent AI Vision Platform',
    titleAr: 'منصة الرؤية الاصطناعية الذكية',
    slug: 'intelligent-ai-vision',
    shortDescription: 'AI-driven computer vision system for real-time video analytics, security monitoring, and automated quality control.',
    shortDescriptionAr: 'نظام الرؤية الحاسوبية بالذكاء الاصطناعي للتحليل الفوري للمراقبة والجودة.',
    cardIcon: 'Cpu',
    isPublished: true,
    order: 2
  }
];

export async function GET(request: Request) {
  return proxyToBackend(request, '/api/products/published', FALLBACK_PRODUCTS);
}
