import { SERVICE_LANDING } from '@/lib/seo-service-landings';

/** Every SEO slug that has a landing page. */
export function getAllServiceLandingSlugs(): string[] {
  return Object.keys(SERVICE_LANDING);
}

/**
 * Stable ids for `/services` cards or hero modules → canonical service path.
 * Use when a component only knows an id, not the slug string.
 */
export const SERVICE_SEO_PATH_BY_ID: Record<string, string> = {
  'svc-ai-product': '/services/ai-product-development',
  'svc-ai-automation': '/services/ai-automation-workflow-intelligence',
  'svc-ml-analytics': '/services/machine-learning-predictive-analytics',
  'svc-conversational-ai': '/services/conversational-ai-chatbots',
  'svc-web-apps': '/services/custom-web-application-development',
  'svc-mobile': '/services/mobile-app-development',
  'svc-ui-ux': '/services/ui-ux-product-design',
  'svc-api-integrations': '/services/api-development-system-integrations',
  'svc-ecommerce': '/services/ecommerce-marketplace-development',
  'svc-performance-cloud': '/services/performance-engineering-cloud-migration',
  'svc-saas': '/services/saas-platform-development',
  'svc-enterprise': '/services/enterprise-software-development',
  'svc-devops': '/services/devops-security-infrastructure',
  'svc-teams': '/services/dedicated-development-teams',
  'svc-staff-aug': '/services/staff-augmentation-specialists',
  'svc-odc': '/services/offshore-development-centre',
};

export function getServiceSeoHref(serviceId: string): string | undefined {
  return SERVICE_SEO_PATH_BY_ID[serviceId];
}
