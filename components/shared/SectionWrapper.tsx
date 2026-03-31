type SectionBg = 'bg0' | 'bg1' | 'bg2';

interface SectionWrapperProps {
  children: React.ReactNode;
  bg?: SectionBg;
  borderTop?: boolean;
  className?: string;
  id?: string;
  as?: 'section' | 'div' | 'article' | 'aside';
}

const bgMap: Record<SectionBg, string> = {
  bg0: 'bg-corematrix-bg0',
  bg1: 'bg-corematrix-bg1',
  bg2: 'bg-corematrix-bg2',
};

export default function SectionWrapper({
  children,
  bg = 'bg0',
  borderTop = true,
  className,
  id,
  as: Tag = 'section',
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      className={`py-24 px-[6vw] 
        ${bgMap[bg]} 
        ${borderTop ? 'border-t border-corematrix-border' : ''} 
        ${className ?? ''}`}
    >
      {children}
    </Tag>
  );
}
