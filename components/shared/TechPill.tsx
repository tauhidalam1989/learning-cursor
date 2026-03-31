interface TechPillProps {
  label: string;
  size?: 'sm' | 'md';
  className?: string;
}

export default function TechPill({
  label,
  size = 'md',
  className,
}: TechPillProps) {
  const sizes = {
    sm: 'text-[0.65rem] px-1.5 py-0.5',
    md: 'text-[0.7rem] px-2 py-1',
  };
  return (
    <span
      className={`font-mono font-semibold text-corematrix-green700 
        bg-corematrix-green900/20 border border-corematrix-green700/20 
        rounded ${sizes[size]} ${className ?? ''}`}
    >
      {label}
    </span>
  );
}
