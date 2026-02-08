import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden py-20 lg:py-28 bg-transparent"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#06210f]/30 to-transparent opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:items-center">
          <div className="relative z-10">
            <h1
              id="hero-heading"
              className="max-w-[640px] text-[40px] sm:text-[48px] md:text-[60px] lg:text-[60px] xl:text-[60px] text-white leading-[1.06] font-medium font-display"
            >
              Technology Services Built for
              <br />
              Taking Your Business to the Next Level
            </h1>

            <p className="mt-6 max-w-[560px] text-[19px] text-[#9fbfb3] leading-[1.78] font-light font-sans">
              Our team designs, builds, and scales secure digital solutions — from web
              apps and SaaS platforms to enterprise systems and integrations that help
              your business grow.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-[272px] h-[46px] rounded-[5px] bg-gradient-to-r from-[#016C36] to-[#084225] text-white font-sans font-semibold text-[15px] leading-[1.45] uppercase transition"
              >
                NEED SOME EXPERT ADVICE?
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center w-[317px] h-[46px] rounded-[5px] border border-[#026634] bg-transparent text-white font-sans font-semibold text-[15px] leading-[1.45] uppercase px-4 transition"
              >
                LET'S GET STARTED ON YOUR PROJECT
              </Link>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px] lg:max-w-[640px] transform translate-x-[6%] -translate-y-[8%]">
              <div className="relative overflow-visible">
                <Image
                  src="/images/Frame (3).png"
                  alt="Technology services illustration"
                  width={640}
                  height={640}
                  className="h-auto w-full object-cover drop-shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
                  priority
                  quality={95}
                />
                {/* subtle bottom fade to blend with page */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#021E14] to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

