import { getClients, getPartners, getCertificates } from '@/lib/clientPartner';
import ClientsSection from './ClientsSection';

export default async function ClientsSectionWrapper({ lang, dict }: { lang?: any; dict?: any }) {
  const [clients, partners, certificates] = await Promise.all([
    getClients('active'),
    getPartners('active'),
    getCertificates('active'),
  ]);

  return (
    <ClientsSection
      lang={lang}
      dict={dict}
      clients={clients}
      partners={partners}
      certificates={certificates}
    />
  );
}
