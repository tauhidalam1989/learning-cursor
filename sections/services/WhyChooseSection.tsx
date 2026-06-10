'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type CellType = 'yes' | 'partial' | 'no';

type CompareRow = {
  feature: string;
  corematrix: { text: string; type: CellType };
  freelancer: { text: string; type: CellType };
  agency: { text: string; type: CellType };
  inHouse: { text: string; type: CellType };
};

const COMPARE_ROWS: CompareRow[] = [
  {
    feature: 'AI-Native Development',
    corematrix: { text: 'Built-in by default', type: 'yes' },
    freelancer: { text: 'Depends on freelancer', type: 'partial' },
    agency: { text: 'Usually an add-on', type: 'no' },
    inHouse: { text: 'Requires AI hire', type: 'partial' },
  },
  {
    feature: 'Senior Engineer Quality',
    corematrix: { text: 'Guaranteed vetted seniors', type: 'yes' },
    freelancer: { text: 'Hit or miss', type: 'partial' },
    agency: { text: 'Often juniors + PM', type: 'partial' },
    inHouse: { text: 'If you hire right', type: 'yes' },
  },
  {
    feature: 'Time to First Delivery',
    corematrix: { text: '1–2 weeks', type: 'yes' },
    freelancer: { text: 'Fast', type: 'yes' },
    agency: { text: '4–8 weeks setup', type: 'no' },
    inHouse: { text: '3–6 months hiring', type: 'no' },
  },
  {
    feature: 'Full-Stack Capability',
    corematrix: { text: 'AI + Web + Mobile + DevOps', type: 'yes' },
    freelancer: { text: 'Usually one speciality', type: 'no' },
    agency: { text: 'Web only typically', type: 'partial' },
    inHouse: { text: "One person's skills", type: 'partial' },
  },
  {
    feature: 'Transparent Process',
    corematrix: { text: 'Weekly demos, open boards', type: 'yes' },
    freelancer: { text: 'Variable', type: 'partial' },
    agency: { text: 'Monthly reports', type: 'partial' },
    inHouse: { text: 'Full visibility', type: 'yes' },
  },
  {
    feature: 'Scales Up/Down Quickly',
    corematrix: { text: 'Add/remove in weeks', type: 'yes' },
    freelancer: { text: 'Find new freelancers', type: 'no' },
    agency: { text: 'Slow', type: 'partial' },
    inHouse: { text: 'Months to hire/fire', type: 'no' },
  },
  {
    feature: 'IP Ownership',
    corematrix: { text: '100% yours at signing', type: 'yes' },
    freelancer: { text: 'Depends on contract', type: 'partial' },
    agency: { text: 'Check small print', type: 'partial' },
    inHouse: { text: 'Full ownership', type: 'yes' },
  },
  {
    feature: 'Post-Launch Support',
    corematrix: { text: 'Ongoing retainer available', type: 'yes' },
    freelancer: { text: 'Usually ends at handoff', type: 'no' },
    agency: { text: 'Expensive SLAs', type: 'partial' },
    inHouse: { text: 'Internal team', type: 'yes' },
  },
];

// Explicitly typed translation maps for i18n
const featureTranslations: Record<string, string> = {
  'AI-Native Development': 'تطوير أصلي بالذكاء الاصطناعي',
  'Senior Engineer Quality': 'جودة المهندسين الكبار',
  'Time to First Delivery': 'الوقت المستغرق لأول تسليم',
  'Full-Stack Capability': 'قدرات التطوير المتكامل (Full-Stack)',
  'Transparent Process': 'عملية شفافة بالكامل',
  'Scales Up/Down Quickly': 'سرعة التوسع والتقليص',
  'IP Ownership': 'ملكية الملكية الفكرية',
  'Post-Launch Support': 'دعم ما بعد الإطلاق',
};

const corematrixTranslations: Record<string, string> = {
  'Built-in by default': 'مدمج افتراضياً بالكامل',
  'Guaranteed vetted seniors': 'مهندسون كبار موثوقون ومفحوصون',
  '1–2 weeks': 'خلال أسبوع إلى أسبوعين',
  'AI + Web + Mobile + DevOps': 'ذكاء اصطناعي + ويب + موبايل + DevOps',
  'Weekly demos, open boards': 'عروض أسبوعية ولوحات عمل مفتوحة',
  'Add/remove in weeks': 'إضافة/إزالة خلال أسابيع معدودة',
  '100% yours at signing': '100% لك عند توقيع العقد',
  'Ongoing retainer available': 'متاح عقود صيانة ودعم مستمر',
};

const freelancerTranslations: Record<string, string> = {
  'Depends on freelancer': 'يعتمد على كفاءة المستقل',
  'Hit or miss': 'نجاح أو فشل غير مضمون',
  'Fast': 'سريع',
  'Usually one speciality': 'عادة تخصص واحد فقط',
  'Variable': 'متغير وغير مستقر',
  'Find new freelancers': 'البحث عن مستقلين آخرين',
  'Depends on contract': 'يعتمد على بنود العقد',
  'Usually ends at handoff': 'ينتهي المشروع عادة عند التسليم',
};

const agencyTranslations: Record<string, string> = {
  'Usually an add-on': 'عادةً ما يكون كخدمة إضافية',
  'Often juniors + PM': 'غالباً مطورون مبتدئون + مدير مشروع',
  '4–8 weeks setup': 'تستغرق من 4 إلى 8 أسابيع للبدء',
  'Web only typically': 'تطوير مواقع الويب فقط في الغالب',
  'Monthly reports': 'تقارير دورية شهرية',
  'Slow': 'بطيء الحركة والقرار',
  'Check small print': 'تحقق من الشروط الدقيقة والمخفية',
  'Expensive SLAs': 'اتفاقيات مستوى خدمة مكلفة للغاية',
};

const inHouseTranslations: Record<string, string> = {
  'Requires AI hire': 'يتطلب توظيف متخصص ذكاء اصطناعي جديد',
  'If you hire right': 'إذا وفقت في اختيار الموظف المناسب',
  '3–6 months hiring': 'يستغرق التوظيف من 3 إلى 6 أشهر',
  "One person's skills": 'محدود بمهارات وخبرات شخص واحد',
  'Full visibility': 'شفافية ورؤية كاملة',
  'Months to hire/fire': 'يستغرق التوظيف أو الإقالة أشهراً',
  'Full ownership': 'ملكية كاملة ومباشرة',
  'Internal team': 'فريق داخلي مخصص',
};

function TypeIndicator({ type }: { type: CellType }) {
  if (type === 'yes') return <span className="text-corematrix-green400">✓</span>;
  if (type === 'no') return <span className="text-corematrix-textDim">✗</span>;
  return <span className="text-xs text-amber-500">~</span>;
}

export function WhyChooseSection() {
  const { t } = useLanguage();

  return (
    <section
      id="why-choose"
      aria-labelledby="why-choose-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t('WHY COREMATRIX', 'لماذا كورماتريكس')}
          title={t(
            'How We Compare to Other Development Options',
            'كيف نقارن بخيارات التطوير الأخرى'
          )}
          titleId="why-choose-heading"
          description={t(
            'See how Corematrix stacks up against freelancers, agencies, and in-house teams.',
            'شاهد كيف يتفوق كورماتريكس على المستقلين والوكالات والفرق الداخلية.'
          )}
        />

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-2xl border border-corematrix-border">
            <thead>
              <tr className="bg-corematrix-card2">
                <th className="border-b border-corematrix-border py-4 px-5 pt-8 text-left font-display text-[0.72rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                  {t('Feature', 'الميزة')}
                </th>
                <th className="relative border-b border-corematrix-border py-4 px-5 pt-8 text-left font-display text-[0.72rem] font-bold uppercase tracking-wider text-corematrix-green400">
                  <span className="absolute top-1 left-5 rounded bg-corematrix-green900/60 px-2 py-0.5 text-[0.6rem] font-bold uppercase text-corematrix-green400">
                    {t('Recommended', 'موصى به')}
                  </span>
                  {t('Corematrix', 'كورماتريكس')}
                </th>
                <th className="border-b border-corematrix-border py-4 px-5 pt-8 text-left font-display text-[0.72rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                  {t('Freelancer', 'مستقل')}
                </th>
                <th className="border-b border-corematrix-border py-4 px-5 pt-8 text-left font-display text-[0.72rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                  {t('Agency', 'وكالة')}
                </th>
                <th className="border-b border-corematrix-border py-4 px-5 pt-8 text-left font-display text-[0.72rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                  {t('In-House', 'فريق داخلي')}
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr
                  key={row.feature}
                  className="transition-colors hover:[&>td]:bg-corematrix-green900/[0.03]"
                >
                  <td className="border-b border-corematrix-border/40 py-4 px-5 text-sm font-medium text-corematrix-textPrimary last:border-0">
                    {t(row.feature, featureTranslations[row.feature] ?? row.feature)}
                  </td>
                  <td className="border-b border-corematrix-border/40 bg-corematrix-green900/[0.04] py-4 px-5 text-sm font-medium text-corematrix-textPrimary last:border-0">
                    <span className="inline-flex items-center gap-2">
                      <TypeIndicator type={row.corematrix.type} />
                      {t(row.corematrix.text, corematrixTranslations[row.corematrix.text] ?? row.corematrix.text)}
                    </span>
                  </td>
                  <td className="border-b border-corematrix-border/40 py-4 px-5 text-sm text-corematrix-textSecondary last:border-0">
                    <span className="inline-flex items-center gap-2">
                      <TypeIndicator type={row.freelancer.type} />
                      {t(row.freelancer.text, freelancerTranslations[row.freelancer.text] ?? row.freelancer.text)}
                    </span>
                  </td>
                  <td className="border-b border-corematrix-border/40 py-4 px-5 text-sm text-corematrix-textSecondary last:border-0">
                    <span className="inline-flex items-center gap-2">
                      <TypeIndicator type={row.agency.type} />
                      {t(row.agency.text, agencyTranslations[row.agency.text] ?? row.agency.text)}
                    </span>
                  </td>
                  <td className="border-b border-corematrix-border/40 py-4 px-5 text-sm text-corematrix-textSecondary last:border-0">
                    <span className="inline-flex items-center gap-2">
                      <TypeIndicator type={row.inHouse.type} />
                      {t(row.inHouse.text, inHouseTranslations[row.inHouse.text] ?? row.inHouse.text)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
