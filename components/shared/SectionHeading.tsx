interface SectionHeadingProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({
  id,
  children,
  className,
}: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={`section-heading mt-3 text-3xl font-bold sm:text-4xl ${className ?? ''}`}
    >
      {children}
    </h2>
  );
}
