const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://corematrixs.com').replace(/\/$/, '');

/** Public API origin used in server/client requests and generated URLs. */
export function getApiOrigin(): string {
  let configured =
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    process.env.API_URL?.trim() ||
    process.env.BACKEND_URL?.trim();

  if (typeof window !== 'undefined') {
    const isBrowserLocalhost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    // In browser: if site is accessed on production domain (not localhost) but env variable points to localhost/127.0.0.1, IGNORE it!
    if (!isBrowserLocalhost && configured && (configured.includes('localhost') || configured.includes('127.0.0.1'))) {
      configured = undefined;
    }

    if (configured) return configured.replace(/\/$/, '');

    // In browser: return empty string so relative URLs like '/api/...' work directly in production
    return '';
  }

  if (configured) return configured.replace(/\/$/, '');

  // On server: fallback to 127.0.0.1 loopback to reach Express backend directly
  const port = process.env.PORT || '5000';
  return `http://127.0.0.1:${port}`;
}

export function apiEndpoint(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const origin = getApiOrigin();
  if (!origin) return normalized;
  if (origin.endsWith('/api')) {
    return `${origin}${normalized.replace(/^\/api/, '')}`;
  }
  return `${origin}${normalized}`;
}
