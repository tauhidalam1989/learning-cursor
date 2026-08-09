import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const backendUrl = (process.env.BACKEND_URL || process.env.API_URL || 'http://127.0.0.1:5000').replace(/\/$/, '');
    const res = await fetch(`${backendUrl}/api/product-categories`, {
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
    console.error('Error fetching product categories from Express backend:', error);
  }

  return NextResponse.json({
    success: true,
    data: [
      {
        id: 1,
        name: 'Enterprise Platforms',
        nameAr: 'منصات المؤسسات الكبرى',
        slug: 'enterprise-platforms',
        icon: 'Building2',
        order: 1,
        isActive: true
      },
      {
        id: 2,
        name: 'AI & Data Intelligence',
        nameAr: 'الذكاء الاصطناعي وذكاء البيانات',
        slug: 'ai-data-intelligence',
        icon: 'Cpu',
        order: 2,
        isActive: true
      },
      {
        id: 3,
        name: 'Cloud & Infrastructure',
        nameAr: 'السحابة والبنية التحتية',
        slug: 'cloud-infrastructure',
        icon: 'Cloud',
        order: 3,
        isActive: true
      }
    ]
  });
}
