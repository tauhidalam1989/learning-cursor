export type Department = string;

export type EmploymentType = string;

export type RoleBadge = string;

export type OpenRole = {
  id: string;
  icon: string;
  title: string;
  department: string;
  location: string;
  salaryRange: string;
  employmentType: string;
  badge?: string;
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
