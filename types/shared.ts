/** A single FAQ question/answer pair */
export type FaqItem = {
  q: string;
  a: string;
};

/** Navigation link */
export type NavLink = {
  label: string;
  href: string;
  labelAr?: string;
};

/** Animated stat counter data */
export type Stat = {
  count: number;
  suffix: string;
  label: string;
  sub?: string;
};

/** Industry card */
export type Industry = {
  icon: string;
  name: string;
  description: string;
};

/** Testimonial/quote */
export type Testimonial = {
  stars: number;
  quote: string;
  initials: string;
  name: string;
  role: string;
  badge?: string;
};

/** Tech stack category */
export type TechCategory = {
  label: string;
  items: string[];
};

/** Author info */
export type Author = {
  initials: string;
  name: string;
  role?: string;
};

/** Generic metric (value + label) */
export type Metric = {
  value: string;
  label: string;
};
