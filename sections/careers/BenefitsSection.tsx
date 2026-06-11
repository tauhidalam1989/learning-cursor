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

const BENEFIT_THEMES = [
  {
    // Purple
    iconColor: 'text-purple-400',
    titleColor: 'text-purple-400 group-hover:text-purple-300',
    hoverBg: 'hover:bg-purple-950/20',
  },
  {
    // Sky
    iconColor: 'text-sky-400',
    titleColor: 'text-sky-400 group-hover:text-sky-300',
    hoverBg: 'hover:bg-sky-950/20',
  },
  {
    // Amber
    iconColor: 'text-amber-400',
    titleColor: 'text-amber-400 group-hover:text-amber-300',
    hoverBg: 'hover:bg-amber-950/20',
  },
  {
    // Rose
    iconColor: 'text-rose-400',
    titleColor: 'text-rose-400 group-hover:text-rose-300',
    hoverBg: 'hover:bg-rose-950/20',
  },
  {
    // Teal
    iconColor: 'text-teal-400',
    titleColor: 'text-teal-400 group-hover:text-teal-300',
    hoverBg: 'hover:bg-teal-950/20',
  },
  {
    // Indigo
    iconColor: 'text-indigo-400',
    titleColor: 'text-indigo-400 group-hover:text-indigo-300',
    hoverBg: 'hover:bg-indigo-950/20',
  },
  {
    // Orange
    iconColor: 'text-orange-400',
    titleColor: 'text-orange-400 group-hover:text-orange-300',
    hoverBg: 'hover:bg-orange-950/20',
  },
  {
    // Emerald
    iconColor: 'text-emerald-400',
    titleColor: 'text-emerald-400 group-hover:text-emerald-300',
    hoverBg: 'hover:bg-emerald-950/20',
  },
];

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
          {BENEFITS.map((b, idx) => {
            const theme = BENEFIT_THEMES[idx % BENEFIT_THEMES.length];
            return (
              <div
                key={b.title}
                className={`group bg-corematrix-card p-8 transition-colors duration-300 ${theme.hoverBg}`}
              >
                <span className={`mb-4 block text-2xl transition-colors duration-300 ${theme.iconColor}`} aria-hidden>
                  <i className={b.icon} />
                </span>
                <h3 className={`mb-2 font-display text-sm font-bold transition-colors duration-300 ${theme.titleColor}`}>
                  {t(b.title, benefitTitleTranslations[b.title] ?? b.title)}
                </h3>
                <p className="text-xs font-light leading-snug text-corematrix-textMuted">
                  {t(b.description, benefitDescTranslations[b.description] ?? b.description)}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
