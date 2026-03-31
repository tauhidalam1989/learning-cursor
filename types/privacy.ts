export type PolicySection = {
  id: string;
  num: string;
  title: string;
};

export type RetentionRow = {
  dataType: string;
  period: string;
  reason: string;
};

export type PurposeRow = {
  purpose: string;
  dataUsed: string;
  basis: string;
};

export type CookieRow = {
  category: string;
  purpose: string;
  consentRequired: string;
};

export type UserRight = {
  icon: string;
  title: string;
  description: string;
};
