import { useEffect, useRef } from 'react';

const INDIGO = '#4F46E5';
const AMBER = '#F59E0B';

const WhyAlex = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = sectionRef.current?.querySelectorAll(
      '.reveal-up, .why-card'
    );

    elements?.forEach((el, index) => {
      el.style.transitionDelay = `${index * 100}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const points = [
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
      title: 'CREATIVE & PROFESSIONAL',
      description:
        'Every project gets our full creative attention — from concept to delivery, we blend artistic vision with production expertise.',
    },
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v-4" />
          <path d="M2 7h20M20 7v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7" />
        </svg>
      ),
      title: 'DESIGN + PRINTING UNDER ONE ROOF',
      description:
        'No back-and-forth between agencies and print shops. We design, proof, and produce everything in-house — faster turnaround, consistent quality.',
    },
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
          <path d="M12 18v.01" />
        </svg>
      ),
      title: 'AFFORDABLE & CUSTOM',
      description:
        'No cookie-cutter templates. Every design is built from scratch for your brand — at prices that work for startups and established businesses alike.',
    },
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a7 7 0 0 0-7-7 7 7 0 0 0-7 7 7 7 0 0 0 7 7 7 7 0 0 0 7-7 7 7 0 0 0-7-7 7 7 0 0 0-7 7" />
        </svg>
      ),
      title: 'QUICK & RELIABLE SERVICE',
      description:
        'Deadlines are sacred. We communicate clearly, deliver on time, and keep you updated at every stage — no surprises, no excuses.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="why-alex"
      className="
        why-section
        relative
        bg-[#F5F3FF]
        py-20
        sm:py-28
        lg:py-32
        overflow-hidden
      "
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          aria-hidden="true"
          className="why-bg-text pointer-events-none absolute -left-8 top-8 z-0 select-none whitespace-nowrap text-[clamp(4rem,11vw,10rem)] font-black uppercase leading-none tracking-[-0.08em]"
          style={{ textShadow: `0 0 60px ${INDIGO}22` }}
        >
          CREATIVE
        </div>

        <div
          aria-hidden="true"
          className="why-bg-text pointer-events-none absolute -right-8 bottom-8 z-0 select-none whitespace-nowrap text-[clamp(4rem,11vw,10rem)] font-black uppercase leading-none tracking-[-0.08em]"
          style={{ textShadow: `0 0 60px ${AMBER}22` }}
        >
          DESIGNS
        </div>

        <div
          className="
            absolute
            top-1/4
            -left-40
            w-80
            h-80
            rounded-full
            blur-[120px]
            opacity-[0.07]
          "
          style={{ backgroundColor: INDIGO }}
        />

        <div
          className="
            absolute
            bottom-1/4
            -right-40
            w-80
            h-80
            rounded-full
            blur-[120px]
            opacity-[0.06]
          "
          style={{ backgroundColor: AMBER }}
        />

        <div
          className="
            absolute
            bottom-0
            left-1/2
            -translate-x-1/2
            w-full
            h-1/2
            bg-gradient-to-t
            from-black/[0.025]
            via-transparent
            to-transparent
          "
        />
      </div>

      <div className="section-container relative z-10">

        <div
          className="
            text-center
            max-w-3xl
            mx-auto
            mb-16
            reveal-up
          "
        >
          <span
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white/70
              backdrop-blur-xl
              border border-black/[0.07]
              shadow-sm
              text-sm
              font-medium
              text-gray-600
              mb-6
            "
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${INDIGO}, ${AMBER})`,
              }}
            />

            WHY CHOOSE US
          </span>

          <h2
            className="
              section-heading
              text-gradient
              mb-4
            "
          >
            WHY ALEX
          </h2>

          <p className="section-subheading mx-auto">
            We don't just make things look good — we make them work for your
            business.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {points.map((point, index) => {
            const isIndigo = index % 2 === 0;
            const accent = isIndigo ? INDIGO : AMBER;

            return (
              <article
                key={point.title}
                className="
                  why-card
                  glass-card-hover
                  p-6
                  sm:p-8
                  text-center
                  relative
                  overflow-hidden
                  group
                  reveal-up
                "
              >
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-[0.045]
                    transition-opacity
                    duration-500
                  "
                  style={{
                    background: `linear-gradient(
                      135deg,
                      ${INDIGO},
                      ${AMBER}
                    )`,
                  }}
                />

                <div className="relative z-10">

                  <div
                    className="
                      inline-flex
                      items-center
                      justify-center
                      w-16
                      h-16
                      rounded-2xl
                      mb-6
                      border
                      border-white/80
                      shadow-[0_8px_25px_rgba(0,0,0,0.08)]
                      group-hover:scale-110
                      transition-transform
                      duration-300
                    "
                    style={{
                      background: `linear-gradient(
                        135deg,
                        ${accent}18,
                        ${accent}08
                      )`,
                      color: accent,
                    }}
                  >
                    {point.icon}
                  </div>

                  <h3
                    className="
                      font-heading
                      text-lg
                      sm:text-xl
                      font-bold
                      text-text-primary
                      mb-3
                      group-hover:text-gray-800
                      transition-colors
                      duration-300
                    "
                  >
                    {point.title}
                  </h3>

                  <p
                    className="
                      font-body
                      text-sm
                      text-text-secondary
                      leading-relaxed
                    "
                  >
                    {point.description}
                  </p>
                </div>

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    h-[3px]
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-300
                  "
                  style={{
                    background: `linear-gradient(
                      90deg,
                      ${INDIGO},
                      ${AMBER}
                    )`,
                  }}
                />
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .reveal-up {
          opacity: 0;
          transform: translateY(30px);
          transition:
            opacity 800ms ease-out,
            transform 800ms ease-out;
        }

        .reveal-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-up {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyAlex;