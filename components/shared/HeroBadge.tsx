interface HeroBadgeProps {
  children: React.ReactNode;
  pulsing?: boolean;
  className?: string;
}

export default function HeroBadge({
  children,
  pulsing = true,
  className,
}: HeroBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 
        bg-corematrix-green900/20 border border-corematrix-green400/20 
        rounded-full px-4 py-1.5 text-[0.72rem] font-bold tracking-[0.1em] 
        uppercase text-corematrix-green400 mb-6 w-fit ${className ?? ''}`}
    >
      {pulsing && (
        <span className="w-1.5 h-1.5 bg-corematrix-green400 rounded-full dot-pulse flex-shrink-0" />
      )}
      {children}
    </div>
  );
}
