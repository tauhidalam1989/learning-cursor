interface PageHeroWrapperProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
  id?: string;
}

export default function PageHeroWrapper({
  children,
  className,
  minHeight = 'min-h-[72vh]',
  id,
}: PageHeroWrapperProps) {
  return (
    <section
      id={id}
      className={`${minHeight} flex flex-col justify-center 
        pt-36 pb-20 px-[6vw] relative overflow-hidden 
        bg-corematrix-bg1 ${className ?? ''}`}
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          aria-hidden
        >
          <defs>
            <pattern
              id="hero-grid-pattern"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M60 0L0 0 0 60"
                fill="none"
                stroke="#1a3525"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
        </svg>
      </div>

      {/* Top-right glow */}
      <div
        className="absolute -top-44 -right-24 w-[700px] h-[700px] rounded-full 
          bg-corematrix-green700 opacity-[0.10] blur-[130px] pointer-events-none"
        aria-hidden
      />

      {/* Bottom-left glow */}
      <div
        className="absolute -bottom-24 -left-36 w-[550px] h-[350px] rounded-full 
          bg-corematrix-green400 opacity-[0.04] blur-[100px] pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10">{children}</div>
    </section>
  );
}
