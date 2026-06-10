import { NextResponse } from 'next/server';
import { apiEndpoint } from '@/lib/apiBase';

const BACKEND = apiEndpoint('/api/blogs');

export async function GET() {
  try {
    const res = await fetch(BACKEND, { cache: 'no-store' });
    if (!res.ok) return NextResponse.json([], { status: res.status });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 503 });
  }
}
