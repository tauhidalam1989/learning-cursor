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
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('Error in /api/client-partner/clients route:', error);
  }
  return NextResponse.json({ success: true, data: [] });
}
