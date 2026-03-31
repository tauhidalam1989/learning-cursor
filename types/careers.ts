export type Department =
  | 'engineering'
  | 'design'
  | 'product'
  | 'devops'
  | 'all';

export type EmploymentType = 'full-time' | 'contract' | 'part-time';

export type RoleBadge = 'hot' | 'new' | 'open';

export type OpenRole = {
  id: string;
  icon: string;
  title: string;
  department: Exclude<Department, 'all'>;
  location: string;
  salaryRange: string;
  employmentType: EmploymentType;
  badge?: RoleBadge;
};

export type WhyCard = {
  icon: string;
  title: string;
  body: string;
};

export type Benefit = {
  icon: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  num: string;
  icon: string;
  title: string;
  body: string;
  timing: string;
};

export type TeamStory = {
  initials: string;
  name: string;
  role: string;
  joinedYear: number;
  quote: string;
  tags: string[];
};

export type CultureValue = {
  num: string;
  title: string;
  description: string;
};

export type LifeCell = {
  icon: string;
  label: string;
  span?: 'tall' | 'wide';
};
