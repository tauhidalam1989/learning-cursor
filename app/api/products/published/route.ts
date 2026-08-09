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
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('Error in /api/products/published route:', error);
  }
  return NextResponse.json({ success: true, data: [] });
}
