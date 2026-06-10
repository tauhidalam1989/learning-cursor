import type {
  PolicySection,
  RetentionRow,
  PurposeRow,
  CookieRow,
  UserRight,
} from '@/types/privacy';

export const POLICY_SECTIONS: PolicySection[] = [
  { id: 's1', num: '01', title: 'Who We Are' },
  { id: 's2', num: '02', title: 'Data We Collect' },
  { id: 's3', num: '03', title: 'How We Use Data' },
  { id: 's4', num: '04', title: 'Legal Basis' },
  { id: 's5', num: '05', title: 'Data Sharing' },
  { id: 's6', num: '06', title: 'Retention' },
  { id: 's7', num: '07', title: 'Your Rights' },
  { id: 's8', num: '08', title: 'Security' },
  { id: 's9', num: '09', title: 'Cookies' },
  { id: 's10', num: '10', title: 'International Transfers' },
  { id: 's11', num: '11', title: "Children's Privacy" },
  { id: 's12', num: '12', title: 'Changes' },
  { id: 's13', num: '13', title: 'Contact Us' },
];

export const PURPOSE_ROWS: PurposeRow[] = [
  {
    purpose: 'Respond to enquiries and project requests',
    dataUsed: 'Name, email, phone, project details',
    basis: 'Legitimate interest / Contract',
  },
  {
    purpose: 'Deliver contracted services',
    dataUsed: 'Contact, billing, project data',
    basis: 'Contract performance',
  },
  {
    purpose: 'Send newsletter (if subscribed)',
    dataUsed: 'Email, first name',
    basis: 'Consent',
  },
  {
    purpose: 'Process job applications',
    dataUsed: 'Application data',
    basis: 'Pre-contractual steps',
  },
  {
    purpose: 'Improve our website and services',
    dataUsed: 'Usage and analytics data',
    basis: 'Legitimate interest',
  },
  {
    purpose: 'Legal and compliance obligations',
    dataUsed: 'As required by law',
    basis: 'Legal obligation',
  },
  {
    purpose: 'Prevent fraud and ensure security',
    dataUsed: 'Technical and usage data',
    basis: 'Legitimate interest',
  },
];

export const RETENTION_ROWS: RetentionRow[] = [
  {
    dataType: 'Contact enquiry data',
    period: '3 years from last contact',
    reason: 'Business relationship management',
  },
  {
    dataType: 'Active client data',
    period: 'Contract + 7 years',
    reason: 'Legal, tax, and contractual obligations',
  },
  {
    dataType: 'Newsletter subscribers',
    period: 'Until unsubscribed',
    reason: 'Consent-based — you control this',
  },
  {
    dataType: 'Unsuccessful job applications',
    period: '6 months',
    reason: 'Future opportunities (with notice)',
  },
  {
    dataType: 'Website analytics data',
    period: '14 months (anonymised)',
    reason: 'Trend analysis',
  },
  {
    dataType: 'Server logs',
    period: '90 days',
    reason: 'Security and fraud prevention',
  },
  {
    dataType: 'Financial records',
    period: '7 years',
    reason: 'Legal / tax compliance',
  },
];

export const COOKIE_ROWS: CookieRow[] = [
  {
    category: 'Strictly Necessary',
    purpose: 'Essential website functionality (security tokens, session management)',
    consentRequired: 'No — required for site to function',
  },
  {
    category: 'Analytics',
    purpose: 'Understanding how visitors use our site — data anonymised',
    consentRequired: 'Yes — opt-in only',
  },
  {
    category: 'Functional',
    purpose: 'Remembering preferences (language, form state)',
    consentRequired: 'Yes — opt-in only',
  },
  {
    category: 'Marketing',
    purpose: 'We do not use marketing or tracking cookies',
    consentRequired: 'N/A — not used',
  },
];

export const USER_RIGHTS: UserRight[] = [
  {
    icon: 'far fa-eye',
    title: 'Right to Access',
    description:
      'Request a copy of the personal data we hold about you and how we use it.',
  },
  {
    icon: 'fas fa-edit',
    title: 'Right to Rectification',
    description: 'Ask us to correct inaccurate or incomplete personal data about you.',
  },
  {
    icon: 'fas fa-trash-alt',
    title: 'Right to Erasure',
    description:
      'Request deletion of your data where there is no compelling reason to continue processing.',
  },
  {
    icon: 'fas fa-lock',
    title: 'Right to Restriction',
    description:
      'Request that we restrict processing of your data in certain circumstances.',
  },
  {
    icon: 'fas fa-box-open',
    title: 'Right to Portability',
    description:
      'Receive your data in a structured, machine-readable format and transfer it.',
  },
  {
    icon: 'fas fa-ban',
    title: 'Right to Object',
    description:
      'Object to processing based on legitimate interests or for direct marketing at any time.',
  },
  {
    icon: 'fas fa-undo',
    title: 'Withdraw Consent',
    description:
      'Where processing is based on consent, withdraw it at any time without affecting past processing.',
  },
  {
    icon: 'fas fa-balance-scale',
    title: 'Right to Complain',
    description: 'Lodge a complaint with your local data protection authority.',
  },
];
