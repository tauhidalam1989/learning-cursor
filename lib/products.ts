export interface ProductCategory {
  id: number;
  name: string;
  nameAr?: string;
  slug: string;
  icon?: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  title: string;
  titleAr?: string;
  slug: string;
  shortDescription?: string;
  shortDescriptionAr?: string;
  metaDescription?: string;
  metaDescriptionAr?: string;
  categoryId?: number;
  category?: ProductCategory;
  cardIcon?: string;
  heroTitle?: string;
  heroTitleAr?: string;
  heroSubtitle?: string;
  heroSubtitleAr?: string;
  heroDescription?: string;
  heroDescriptionAr?: string;
  heroIcon?: string;
  heroPrimaryCtaText?: string;
  heroPrimaryCtaTextAr?: string;
  heroPrimaryCtaLink?: string;
  heroSecondaryCtaText?: string;
  heroSecondaryCtaTextAr?: string;
  heroSecondaryCtaLink?: string;
  aboutTitle?: string;
  aboutTitleAr?: string;
  aboutContent?: string;
  aboutContentAr?: string;
  aboutImage?: string;
  aboutImageAlt?: string;
  aboutImageAltAr?: string;
  howItWorks?: any[];
  keyFeaturesTitle?: string;
  keyFeaturesTitleAr?: string;
  keyFeaturesImages?: string[];
  keyFeaturesImageAlt?: string;
  keyFeaturesImageAltAr?: string;
  keyFeaturesList?: any[];
  keyFeaturesListAr?: any[];
  benefits?: any[];
  visionTitle?: string;
  visionTitleAr?: string;
  visionSubtitle?: string;
  visionSubtitleAr?: string;
  visionItems?: any[];
  whySharpTitle?: string;
  whySharpTitleAr?: string;
  whySharpContent?: string;
  whySharpContentAr?: string;
  whySharpImage?: string;
  whySharpImageAlt?: string;
  whySharpImageAltAr?: string;
  ctaTitle?: string;
  ctaTitleAr?: string;
  ctaDescription?: string;
  ctaDescriptionAr?: string;
  ctaButton1Text?: string;
  ctaButton1TextAr?: string;
  ctaButton1Link?: string;
  ctaButton2Text?: string;
  ctaButton2TextAr?: string;
  ctaButton2Link?: string;
  faqs?: any[];
  metaTitle?: string;
  metaTitleAr?: string;
  metaKeywords?: string;
  metaKeywordsAr?: string;
  gallery?: string[];
  order: number;
  isPublished: boolean;
  publishedAt?: string;
  views?: number;
  brochure?: string;
  createdAt?: string;
  updatedAt?: string;
}

const getBaseUrl = () => {
  const rawUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
  return rawUrl.endsWith('/api') ? rawUrl : `${rawUrl}/api`;
};

export function getMediaUrl(path?: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const origin = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/api\/?$/, '').replace(/\/$/, '');
  return `${origin}/${path.startsWith('/') ? path.slice(1) : path}`;
}

// Product Categories API
export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    const res = await fetch(`${getBaseUrl()}/product-categories`, {
      next: { revalidate: 10 },
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return [];
  }
}

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('corematrix-admin-token') || localStorage.getItem('token');
  }
  return null;
};

export async function createProductCategory(data: Partial<ProductCategory>): Promise<{ success: boolean; data?: ProductCategory; message?: string }> {
  try {
    const token = getToken();
    const res = await fetch(`${getBaseUrl()}/product-categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'admin-secret-key-corematrix',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    return json;
  } catch (error: any) {
    return { success: false, message: error.message || 'Error creating category' };
  }
}

export async function updateProductCategory(id: number, data: Partial<ProductCategory>): Promise<{ success: boolean; data?: ProductCategory; message?: string }> {
  try {
    const token = getToken();
    const res = await fetch(`${getBaseUrl()}/product-categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'admin-secret-key-corematrix',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    return json;
  } catch (error: any) {
    return { success: false, message: error.message || 'Error updating category' };
  }
}

export async function deleteProductCategory(id: number): Promise<{ success: boolean; message?: string }> {
  try {
    const token = getToken();
    const res = await fetch(`${getBaseUrl()}/product-categories/${id}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': 'admin-secret-key-corematrix',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    const json = await res.json();
    return json;
  } catch (error: any) {
    return { success: false, message: error.message || 'Error deleting category' };
  }
}

// Products API
export async function getPublishedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${getBaseUrl()}/products/published`, {
      next: { revalidate: 10 },
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching published products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/products/slug/${slug}`, {
      next: { revalidate: 10 },
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
}

export async function getAdminProducts(params: { page?: number; limit?: number; search?: string; categoryId?: string } = {}): Promise<{ products: Product[]; total: number; page: number; totalPages: number }> {
  try {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.search) query.append('search', params.search);
    if (params.categoryId) query.append('categoryId', params.categoryId);

    const res = await fetch(`${getBaseUrl()}/products?${query.toString()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    });

    if (!res.ok) return { products: [], total: 0, page: 1, totalPages: 1 };
    const json = await res.json();
    return json.data || { products: [], total: 0, page: 1, totalPages: 1 };
  } catch (error) {
    console.error('Error fetching admin products:', error);
    return { products: [], total: 0, page: 1, totalPages: 1 };
  }
}

export async function createProduct(formData: FormData): Promise<{ success: boolean; data?: Product; message?: string }> {
  try {
    const token = getToken();
    const res = await fetch(`${getBaseUrl()}/products`, {
      method: 'POST',
      headers: {
        'x-api-key': 'admin-secret-key-corematrix',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: formData
    });
    const json = await res.json();
    return json;
  } catch (error: any) {
    return { success: false, message: error.message || 'Error creating product' };
  }
}

export async function updateProduct(id: number, formData: FormData | Record<string, any>): Promise<{ success: boolean; data?: Product; message?: string }> {
  try {
    const token = getToken();
    const isFormData = formData instanceof FormData;

    const headers: Record<string, string> = {
      'x-api-key': 'admin-secret-key-corematrix',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(`${getBaseUrl()}/products/${id}`, {
      method: 'PUT',
      headers,
      body: isFormData ? formData : JSON.stringify(formData)
    });
    const json = await res.json();
    return json;
  } catch (error: any) {
    return { success: false, message: error.message || 'Error updating product' };
  }
}

export async function deleteProduct(id: number): Promise<{ success: boolean; message?: string }> {
  try {
    const token = getToken();
    const res = await fetch(`${getBaseUrl()}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': 'admin-secret-key-corematrix',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    const json = await res.json();
    return json;
  } catch (error: any) {
    return { success: false, message: error.message || 'Error deleting product' };
  }
}

export async function togglePublishProduct(id: number, publish: boolean): Promise<{ success: boolean; message?: string }> {
  try {
    const token = getToken();
    const endpoint = publish ? 'publish' : 'unpublish';
    const res = await fetch(`${getBaseUrl()}/products/${id}/${endpoint}`, {
      method: 'PATCH',
      headers: {
        'x-api-key': 'admin-secret-key-corematrix',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    const json = await res.json();
    return json;
  } catch (error: any) {
    return { success: false, message: error.message || 'Error toggling publish status' };
  }
}
