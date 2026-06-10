'use client';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { GlassCard } from '@/components/common/GlassCard';
import { useLanguage } from '@/context/LanguageContext';

interface TechnologySolutionsSectionProps {
  imageSrc?: string;
  imageAlt?: string;
}

/**
 * "Technology Solutions Built for Real Business Needs" section.
 * Two-column: text left, image right. Dark theme.
 */
export function TechnologySolutionsSection({
  imageSrc = '/services-tech.png',
  imageAlt = 'Digital workspace with laptop, mobile devices, cloud and charts',
}: TechnologySolutionsSectionProps) {
  const { t } = useLanguage();
  const localizedAlt = t(
    'Digital workspace with laptop, mobile devices, cloud and charts',
    'مساحة عمل رقمية مع لابتوب، أجهزة محمولة، سحابة ومخططات'
  );
  return (
    <section
      id="technology-solutions"
      aria-labelledby="technology-solutions-heading"
      className="bg-transparent py-16 sm:py-20"
    >
      <Container>
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left: Header + description (placed in left column for pixel-perfect layout) */}
          <div>
            <div className="text-left">
              <h2
                id="technology-solutions-heading"
                className="section-heading mt-3 text-white"
                style={{ fontSize: 39, lineHeight: '106%' }}
              >
                {t(
                  'Technology Solutions Built for Real Business Needs',
                  'حلول تقنية مبنية على احتياجات الأعمال الحقيقية'
                )}
              </h2>
              <p
                className="mt-4"
                style={{
                  fontSize: 17,
                  lineHeight: '178%',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  maxWidth: 680,
                }}
              >
                {t(
                  'At Corematrix, we focus on IT solutions that deliver performance, security, scalability, and reliability.',
                  'في كورماتريكس، نركز على حلول تقنية معلومات توفر الأداء، الأمان، القابلية للتوسع والموثوقية.'
                )}
              </p>

              <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg max-w-[560px]">
                {t(
                  'From custom web applications to enterprise software, we build systems that drive real results.',
                  'من تطبيقات الويب المخصصة إلى برامج الشركات، نبني أنظمة تحقق نتائج حقيقية.'
                )}
              </p>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-[640px]">
              <GlassCard className="overflow-hidden p-0">
                <div className="relative aspect-[16/10] w-full">
                  <Image src={imageSrc} alt={localizedAlt} fill className="object-cover" quality={90} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
