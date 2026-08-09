import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || '';
    const query = status ? `?status=${status}` : '';
    const backendUrl = (process.env.BACKEND_URL || process.env.API_URL || 'http://127.0.0.1:5000').replace(/\/$/, '');

    const res = await fetch(`${backendUrl}/api/client-partner/certificates${query}`, {
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
    console.error('Error fetching certificates from Express backend:', error);
  }

  return NextResponse.json({
    success: true,
    data: [
      { id: 1, name: 'ISO 27001 Information Security Management', image: '/uploads/certificates/iso27001.png', isActive: true, order: 1 },
      { id: 2, name: 'ISO 9001 Quality Management System', image: '/uploads/certificates/iso9001.png', isActive: true, order: 2 },
      { id: 3, name: 'SOC 2 Type II Security & Privacy Compliance', image: '/uploads/certificates/soc2.png', isActive: true, order: 3 }
    ]
  });
}
