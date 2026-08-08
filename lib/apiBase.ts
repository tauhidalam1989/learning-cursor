const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://corematrixs.com').replace(/\/$/, '');

/** Public API origin used in server/client requests and generated URLs. */
export function getApiOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (configured) return configured.replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    // In browser: return empty string so relative URLs like '/api/...' work directly in production
    return '';
  }

  // On server: fallback to localhost port
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
