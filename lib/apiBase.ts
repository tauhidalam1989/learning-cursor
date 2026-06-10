const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://corematrixs.com').replace(/\/$/, '');

/** Public API origin used in server/client requests and generated URLs. */
export function getApiOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim();
  return configured ? configured.replace(/\/$/, '') : SITE_URL;
}

export function apiEndpoint(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${getApiOrigin()}${normalized}`;
}
