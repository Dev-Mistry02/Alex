import { useEffect, useRef } from 'react';

const INDIGO = '#4F46E5';
const AMBER = '#F59E0B';

const Promo = () => {
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
      '.reveal-up, .reveal-scale'
    );

    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const whatsappUrl =
    'https://wa.me/919356047231?text=Hi%20ALEX%20Graphic%20Design%20Studio%2C%20I%27m%20interested%20in%20Customized%20Gifts%20starting%20from%20%E2%82%B9100.%20Could%20you%20share%20options%20and%20pricing%3F';


  return (
    <section
      ref={sectionRef}
      id="promo"
      className="
        relative
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
          className="
            absolute
            top-1/2
            left-[20%]
            -translate-x-1/2
            -translate-y-1/2
            w-[500px]
            h-[500px]
            rounded-full
            blur-[130px]
            opacity-[0.07]
            animate-pulse-slow
          "
          style={{ backgroundColor: INDIGO }}
        />

        <div
          className="
            absolute
            top-1/2
            right-[10%]
            -translate-y-1/2
            w-[450px]
            h-[450px]
            rounded-full
            blur-[130px]
            opacity-[0.055]
            animate-pulse-slow
          "
          style={{
            backgroundColor: AMBER,
            animationDelay: '1s',
          }}
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(
              ellipse_at_center,
              rgba(255,255,255,0.9)_0%,
              transparent_70%
            )]
          "
        />
      </div>

      <div className="section-container relative z-10">

        <div className="max-w-4xl mx-auto text-center reveal-up">

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

            SPECIAL OFFER
          </span>

          <div className="relative mb-8">
            <div className="inline-flex items-baseline gap-1">

              <span
                className="
                  font-heading
                  text-6xl
                  sm:text-8xl
                  lg:text-9xl
                  font-bold
                  leading-none
                  text-[#111111]
                "
              >
                ₹
              </span>

              <span
                className="
                  font-heading
                  text-6xl
                  sm:text-8xl
                  lg:text-9xl
                  font-bold
                  leading-none
                  bg-clip-text
                  text-transparent
                "
                style={{
                  backgroundImage: `linear-gradient(
                    90deg,
                    ${INDIGO},
                    ${AMBER}
                  )`,
                }}
              >
                100
              </span>
            </div>

            <div
              className="
                absolute
                top-0
                right-0
                w-32
                h-32
                rounded-full
                blur-2xl
                opacity-[0.10]
              "
              style={{ backgroundColor: INDIGO }}
              aria-hidden="true"
            />

            <div
              className="
                absolute
                bottom-0
                left-0
                w-24
                h-24
                rounded-full
                blur-2xl
                opacity-[0.08]
              "
              style={{ backgroundColor: AMBER }}
              aria-hidden="true"
            />
          </div>

          <h2
            className="
              font-heading
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              text-[#111111]
              mb-6
              reveal-scale
            "
            style={{ transitionDelay: '200ms' }}
          >
            Customized Gifts
          </h2>

          <p
            className="
              font-body
              text-lg
              sm:text-xl
              text-gray-600
              max-w-2xl
              mx-auto
              mb-10
              leading-relaxed
              reveal-scale
            "
            style={{ transitionDelay: '300ms' }}
          >
            Personalized mugs, t-shirts, frames, keychains, pens,
            notebooks, phone cases, and corporate gifting — all fully
            customizable with your logo, photos, or designs.
          </p>

          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-4
              justify-center
              reveal-scale
            "
            style={{ transitionDelay: '400ms' }}
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                relative
                inline-flex
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-[#111111]
                px-7
                py-4
                text-white
                font-semibold
                shadow-[0_12px_30px_rgba(0,0,0,0.15)]
                hover:-translate-y-0.5
                transition-all
                duration-300
              "
            >
              <span
                className="
                  absolute
                  inset-0
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

              <span className="relative z-10 flex items-center gap-3">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>

                ORDER CUSTOM GIFTS
              </span>
            </a>

            <a
              href="#portfolio"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-white/75
                backdrop-blur-xl
                border
                border-black/[0.10]
                px-7
                py-4
                text-[#111111]
                font-semibold
                shadow-sm
                hover:bg-gray-50
                hover:border-black/20
                hover:-translate-y-0.5
                transition-all
                duration-300
              "
            >
              VIEW GIFT EXAMPLES
            </a>
          </div>

          <div
            className="
              mt-12 sm:mt-16
              flex sm:grid
              sm:grid-cols-3
              gap-4 sm:gap-5
              overflow-x-auto sm:overflow-visible
              snap-x snap-mandatory sm:snap-none
              pb-4 sm:pb-0
              -mx-4 px-4 sm:mx-0 sm:px-0
              reveal-up
              scrollbar-hide
            "
            style={{ transitionDelay: '500ms' }}
          >
            {giftCategories.map((item) => (
              <div
                key={item.label}
                className="
                  relative
                  glass-card-hover
                  p-5 sm:p-6
                  text-center
                  group
                  overflow-hidden
                  min-w-[78vw] sm:min-w-0
                  shrink-0
                  snap-center sm:snap-none
                "
              >
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-[0.04]
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
                      w-14 h-14
                      sm:w-16 sm:h-16
                      rounded-2xl
                      mb-4
                      bg-white/70
                      backdrop-blur-xl
                      border border-black/[0.06]
                      shadow-sm
                      group-hover:scale-110
                      transition-transform
                      duration-300
                    "
                  >
                    <span
                      className="text-4xl sm:text-5xl"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                  </div>

                  <h4
                    className="
                      font-heading
                      text-lg
                      font-semibold
                      text-[#111111]
                      mb-1
                    "
                  >
                    {item.label}
                  </h4>

                  <p
                    className="
                      font-body
                      text-sm
                      text-gray-500
                    "
                  >
                    {item.desc}
                  </p>
                </div>

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    h-[2px]
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
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }

          50% {
            opacity: 0.55;
            transform: scale(1.08);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

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

        .reveal-scale {
          opacity: 0;
          transform: scale(0.92);
          transition:
            opacity 600ms ease-out,
            transform 600ms ease-out;
        }

        .reveal-scale.visible {
          opacity: 1;
          transform: scale(1);
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-slow,
          .reveal-up,
          .reveal-scale {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Promo;