interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p className={`section-label text-corematrix-green400 ${className ?? ''}`}>
      {children}
    </p>
  );
}
