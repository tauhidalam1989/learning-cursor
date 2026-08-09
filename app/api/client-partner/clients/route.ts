import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || '';
    const query = status ? `?status=${status}` : '';
    const backendUrl = (process.env.BACKEND_URL || process.env.API_URL || 'http://127.0.0.1:5000').replace(/\/$/, '');

    const res = await fetch(`${backendUrl}/api/client-partner/clients${query}`, {
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
    console.error('Error fetching clients from Express backend:', error);
  }

  return NextResponse.json({
    success: true,
    data: [
      { id: 1, name: 'Saudi Aramco Digital', logo: '/uploads/clients/aramco.png', isActive: true, order: 1 },
      { id: 2, name: 'STC Technology Solutions', logo: '/uploads/clients/stc.png', isActive: true, order: 2 },
      { id: 3, name: 'NEOM Tech & Innovation', logo: '/uploads/clients/neom.png', isActive: true, order: 3 },
      { id: 4, name: 'Al Rajhi Digital Banking', logo: '/uploads/clients/alrajhi.png', isActive: true, order: 4 }
    ]
  });
}
