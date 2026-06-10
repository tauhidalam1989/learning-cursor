import { NextResponse } from 'next/server';

const BACKEND = 'http://127.0.0.1:5000/api/blogs';

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const params = await context.params;
    const res = await fetch(`${BACKEND}/${params.slug}`, { cache: 'no-store' });
    if (!res.ok) return NextResponse.json(null, { status: res.status });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null, { status: 503 });
  }
}
