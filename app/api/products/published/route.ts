import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const backendUrl = (process.env.BACKEND_URL || process.env.API_URL || 'http://127.0.0.1:5000').replace(/\/$/, '');
    const res = await fetch(`${backendUrl}/api/products/published`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.data) && data.data.length > 0) {
        return NextResponse.json(data);
      }
    }
  } catch (error) {
    console.error('Error fetching published products from Express backend:', error);
  }

  return NextResponse.json({
    success: true,
    data: [
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
    ]
  });
}
