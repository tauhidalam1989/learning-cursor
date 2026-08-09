import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || '';
    const query = status ? `?status=${status}` : '';
    const backendUrl = (process.env.BACKEND_URL || process.env.API_URL || 'http://127.0.0.1:5000').replace(/\/$/, '');

    const res = await fetch(`${backendUrl}/api/client-partner/partners${query}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      const data = await res.json();
      if (data && (Array.isArray(data.data) || Array.isArray(data.result))) {
        return NextResponse.json(data);
      }
    }
  } catch (error) {
    console.error('Error fetching partners from Express backend:', error);
  }

  return NextResponse.json({
    success: true,
    data: [
      { id: 1, name: 'Microsoft Gold Partner', logo: '/uploads/partners/microsoft.png', isActive: true, order: 1 },
      { id: 2, name: 'AWS Cloud Premier Partner', logo: '/uploads/partners/aws.png', isActive: true, order: 2 },
      { id: 3, name: 'Google Cloud Platform Partner', logo: '/uploads/partners/gcp.png', isActive: true, order: 3 },
      { id: 4, name: 'NVIDIA AI Alliance Partner', logo: '/uploads/partners/nvidia.png', isActive: true, order: 4 }
    ]
  });
}
