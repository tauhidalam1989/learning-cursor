 'use client';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Accordion, AccordionRow } from '@/components/common/Accordion';
import { useState } from 'react';

const faqs = [
  'How long does a typical project take?',
  'What technologies do you specialise in?',
  'Do you provide ongoing support after launch?',
  'Can you integrate with our existing systems?',
];

export function FaqSection() {
  return (
    <section
      id="faq"
      className="bg-transparent py-12 sm:py-16 lg:py-20"
      style={{
        borderTopWidth: 2,
        borderTopStyle: 'solid',
        borderImageSource: 'linear-gradient(90deg, #010D07 0%, #026835 49.04%, #010D07 98.56%)',
        borderImageSlice: 1,
      }}
    >
      <Container>
        <SectionHeader
          label="FAQ"
          title="You've got questions? We've got answers!"
          description="We follow agile methodologies to ensure transparency"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {/* Use Accordion component for smooth behavior */}
          {/* Build items array with content */}
          <div className="col-span-2 sm:col-span-2">
            {/* Importing Accordion below via dynamic usage */}
            {/* We'll render two-column visually by CSS; Accordion itself is single column */}
          </div>
        </div>
        {/* Render accordion grid using AccordionRow for two-column layout */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <FaqGrid />
        </div>
      </Container>
    </section>
  );
}

function FaqGrid() {
  const items = [
    'How long does a typical project take?',
    'What technologies do you specialise in?',
    'Do you provide ongoing support after launch?',
    'Can you integrate with our existing systems?',
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {items.map((q, i) => (
        <div key={i}>
          <AccordionRow
            item={{ id: i, title: q, content: 'Lorem ipsum is simply dummy placeholder content.' }}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        </div>
      ))}
    </>
  );
}

