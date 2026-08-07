import { apiEndpoint } from '@/lib/apiBase';

export interface Client {
  id: number;
  name: string;
  logo: string;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Certificate {
  id: number;
  name: string;
  image: string;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const apiOrigin = process.env.NEXT_PUBLIC_API_URL?.trim()?.replace(/\/$/, '');
    if (apiOrigin) return `${apiOrigin}/api/client-partner`;
    return '/api/client-partner';
  }
  return apiEndpoint('/api/client-partner');
};

// Public Fetchers
export async function getClients(status?: string): Promise<Client[]> {
  try {
    const query = status ? `?status=${status}` : '';
    const res = await fetch(`${getBaseUrl()}/clients${query}`, {
      next: { revalidate: 10 },
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.data) ? data.data : Array.isArray(data.result) ? data.result : [];
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
}

export async function getPartners(status?: string): Promise<Partner[]> {
  try {
    const query = status ? `?status=${status}` : '';
    const res = await fetch(`${getBaseUrl()}/partners${query}`, {
      next: { revalidate: 10 },
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.data) ? data.data : Array.isArray(data.result) ? data.result : [];
  } catch (error) {
    console.error('Error fetching partners:', error);
    return [];
  }
}

export async function getCertificates(status?: string): Promise<Certificate[]> {
  try {
    const query = status ? `?status=${status}` : '';
    const res = await fetch(`${getBaseUrl()}/certificates${query}`, {
      next: { revalidate: 10 },
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.data) ? data.data : Array.isArray(data.result) ? data.result : [];
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
}

// Admin API operations
const getAuthHeader = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('corematrix-admin-token') || localStorage.getItem('corematrix_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function getAdminClients(): Promise<Client[]> {
  return getClients();
}

export async function getAdminPartners(): Promise<Partner[]> {
  return getPartners();
}

export async function getAdminCertificates(): Promise<Certificate[]> {
  return getCertificates();
}

export async function createClient(formData: FormData): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${getBaseUrl()}/clients`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
      body: formData,
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to create client' };
  }
}

export async function updateClient(id: number, formData: FormData): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${getBaseUrl()}/clients/${id}`, {
      method: 'PUT',
      headers: { ...getAuthHeader() },
      body: formData,
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to update client' };
  }
}

export async function deleteClient(id: number): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${getBaseUrl()}/clients/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to delete client' };
  }
}

export async function createPartner(formData: FormData): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${getBaseUrl()}/partners`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
      body: formData,
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to create partner' };
  }
}

export async function updatePartner(id: number, formData: FormData): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${getBaseUrl()}/partners/${id}`, {
      method: 'PUT',
      headers: { ...getAuthHeader() },
      body: formData,
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to update partner' };
  }
}

export async function deletePartner(id: number): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${getBaseUrl()}/partners/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to delete partner' };
  }
}

export async function createCertificate(formData: FormData): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${getBaseUrl()}/certificates`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
      body: formData,
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to create certificate' };
  }
}

export async function updateCertificate(id: number, formData: FormData): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${getBaseUrl()}/certificates/${id}`, {
      method: 'PUT',
      headers: { ...getAuthHeader() },
      body: formData,
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to update certificate' };
  }
}

export async function deleteCertificate(id: number): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${getBaseUrl()}/certificates/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to delete certificate' };
  }
}
