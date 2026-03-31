export type ExploreCard = {
  icon: string;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
};

export type QuickLink = {
  icon: string;
  label: string;
  href: string;
};

export type MiniBlogPost = {
  slug: string;
  category: string;
  title: string;
  author: string;
  readTime: number;
};

export type TerminalLine = {
  id: string;
  prefix: 'command' | 'error' | 'warn' | 'success' | 'cursor';
  text: string;
  highlight?: string;
};
