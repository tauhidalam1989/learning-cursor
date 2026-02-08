import { Container } from '@/components/ui/Container';
import type { Service } from '@/types';

const services: Service[] = [
  { id: '1', title: 'Strategy & Planning', description: 'Audits, positioning, and roadmaps.' },
  { id: '2', title: 'Brand & Creative', description: 'Identity, design systems, and content.' },
  { id: '3', title: 'Digital Marketing', description: 'Paid, organic, and conversion optimization.' },
];

export function ServicesListSection() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.id} className="p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
