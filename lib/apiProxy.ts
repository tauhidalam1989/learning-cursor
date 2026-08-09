import { NextResponse } from 'next/server';

export async function proxyToBackend(request: Request, targetPath: string, fallbackData?: any) {
  try {
    const backendUrl = (process.env.BACKEND_URL || process.env.API_URL || 'http://127.0.0.1:5000').replace(/\/$/, '');
    const url = new URL(request.url);
    const targetUrl = `${backendUrl}${targetPath}${url.search}`;

    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.delete('content-length');

    const hasBody = ['POST', 'PUT', 'PATCH'].includes(request.method);
    const body = hasBody ? await request.arrayBuffer() : undefined;

    const res = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      cache: 'no-store'
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    }

    const text = await res.text();
    return new NextResponse(text, { status: res.status, headers: { 'content-type': contentType } });
  } catch (error: any) {
    console.error(`API proxy error for ${targetPath}:`, error);
    if (request.method === 'GET' && fallbackData !== undefined) {
      return NextResponse.json({ success: true, data: fallbackData });
    }
    return NextResponse.json(
      { success: false, message: error.message || 'Backend connection error' },
      { status: 500 }
    );
  }
}
