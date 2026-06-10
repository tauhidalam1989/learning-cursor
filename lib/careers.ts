import type { OpenRole } from '@/types/careers';
import { apiEndpoint } from '@/lib/apiBase';

const API_BASE = apiEndpoint('/api/careers');

export interface DbCareer {
  id: string;
  department: string;
  icon: string;
  salaryRange: string;
  badge_en?: string | null;
  badge_ar?: string | null;
  title_en: string;
  title_ar: string;
  location_en: string;
  location_ar: string;
  employmentType_en: string;
  employmentType_ar: string;
  description_en: string;
  description_ar: string;
  requirements_en: string[];
  requirements_ar: string[];
  responsibilities_en: string[];
  responsibilities_ar: string[];
  createdAt: string;
  updatedAt: string;
}

export function mapDbCareerToOpenRole(dbJob: any, language: 'en' | 'ar'): OpenRole {
  const isAr = language === 'ar';
  return {
    id: dbJob.id,
    icon: dbJob.icon || 'fas fa-laptop-code',
    title: isAr ? (dbJob.title_ar || dbJob.title_en) : dbJob.title_en,
    department: dbJob.department,
    location: isAr ? (dbJob.location_ar || dbJob.location_en) : dbJob.location_en,
    salaryRange: dbJob.salaryRange,
    employmentType: isAr ? (dbJob.employmentType_ar || dbJob.employmentType_en) : dbJob.employmentType_en,
    badge: isAr ? (dbJob.badge_ar || dbJob.badge_en || undefined) : (dbJob.badge_en || undefined),
  };
}

export async function getAllDbCareers(language: 'en' | 'ar'): Promise<OpenRole[]> {
  try {
    const res = await fetch(API_BASE, { cache: 'no-store' });
    if (!res.ok) throw new Error('API down');
    const dbJobs = await res.json();
    return dbJobs.map((job: any) => mapDbCareerToOpenRole(job, language));
  } catch (err) {
    console.warn('getAllDbCareers: failed to fetch from dynamic DB API', err);
    return [];
  }
}

export async function getDbCareerById(id: string): Promise<DbCareer | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('getDbCareerById: failed to fetch details for id', id, err);
    return null;
  }
}
