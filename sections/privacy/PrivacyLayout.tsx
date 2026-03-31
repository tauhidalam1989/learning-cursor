import { PrivacyToc } from '@/components/privacy/PrivacyToc';
import { PolicyContent } from '@/components/privacy/PolicyContent';

export function PrivacyLayout() {
  return (
    <section
      aria-label="Privacy policy content"
      className="bg-corematrix-bg0 px-[6vw] py-16"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-[260px_1fr]">
        <PrivacyToc />
        <PolicyContent />
      </div>
    </section>
  );
}
