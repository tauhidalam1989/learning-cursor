'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { BENEFITS } from '@/data/careersData';
import { useLanguage } from '@/context/LanguageContext';

// Explicitly typed translation maps for i18n
const benefitTitleTranslations: Record<string, string> = {
  'Competitive Salary': 'راتب تنافسي',
  'Equity & Bonuses': 'أسهم ومكافآت مجزية',
  'Health Coverage': 'تأمين صحي شامل',
  'Unlimited PTO': 'إجازات غير محدودة',
  'Top-Tier Hardware': 'أحدث الأجهزة والعتاد',
  '$1,500 Learning Budget': 'ميزانية تعلم بقيمة 1,500 دولار',
  'Flexible Hours': 'ساعات عمل مرنة',
  'Work From Anywhere': 'العمل من أي مكان',
};

const benefitDescTranslations: Record<string, string> = {
  'Market-rate pay benchmarked globally, reviewed annually. We share our salary bands openly.':
    'رواتب بمعدل السوق قياساً بالمعايير العالمية، تتم مراجعتها سنوياً. نشارك نطاقات رواتبنا بكل شفافية.',
  'Meaningful equity for key roles. Performance bonuses tied to company and personal outcomes.':
    'أسهم مجدية للأدوار الرئيسية والمحورية. مكافآت أداء مرتبطة بالنتائج الشخصية ونتائج الشركة.',
  'Comprehensive health insurance (medical, dental, vision) for you and your family.':
    'تأمين صحي شامل (طبي، أسنان، نظر) لك ولأفراد عائلتك.',
  'We mean it. Minimum 20 days encouraged. Leaders take time off to model healthy behavior.':
    'نحن نعني ذلك تماماً. نشجع على أخذ 20 يوماً كحد أدنى. يأخذ القادة إجازات لتقديم نموذج صحي للجميع.',
  'MacBook Pro or Linux workstation of your choice, plus a $500 home office setup budget.':
    'جهاز MacBook Pro أو محطة عمل Linux من اختيارك، بالإضافة إلى ميزانية 500 دولار لتجهيز مكتبك المنزلي.',
  'Courses, conferences, books, workshops. Use it however you learn best — no approval needed.':
    'دورات، مؤتمرات، كتب، ورش عمل. استخدمها بالطريقة التي تتعلم بها بشكل أفضل — لا داعي لطلب موافقة مسبقة.',
  'Core overlap hours, but otherwise you set your schedule. We care about output, not clock-watching.':
    'ساعات توافق أساسية، ولكن خلاف ذلك يمكنك تحديد جدولك الخاص. نحن نهتم بالنتائج، وليس بمراقبة ساعات الحضور.',
  'Fully distributed team. Our processes are built for async — not bolted on as an afterthought.':
    'فريق عمل موزع بالكامل. تم بناء عملياتنا للعمل غير المتزامن — وليس كفكرة ثانوية مضافة.',
};

export function BenefitsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="careers-benefits"
      aria-labelledby="careers-benefits-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t('BENEFITS & PERKS', 'المزايا والامتيازات')}
          title={t('Built for People Who Do Serious Work', 'صُممت للأشخاص الذين يقومون بأعمال جادة')}
          titleId="careers-benefits-heading"
          description={t(
            'Competitive compensation, real flexibility, and investments in your growth.',
            'تعويضات تنافسية، مرونة حقيقية، واستثمار مستمر في نموك وتطورك.'
          )}
        />

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-border sm:grid-cols-4">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="bg-corematrix-card p-8 transition-colors hover:bg-corematrix-card2"
            >
              <span className="mb-4 block text-2xl text-corematrix-green400" aria-hidden>
                <i className={b.icon} />
              </span>
              <h3 className="mb-2 font-display text-sm font-bold text-corematrix-textPrimary">
                {t(b.title, benefitTitleTranslations[b.title] ?? b.title)}
              </h3>
              <p className="text-xs font-light leading-snug text-corematrix-textMuted">
                {t(b.description, benefitDescTranslations[b.description] ?? b.description)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
