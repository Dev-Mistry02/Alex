import { useEffect, useRef } from 'react';

const WhatsAppCTA = () => {
  const sectionRef = useRef(null);

  const INDIGO = '#4F46E5';
  const AMBER = '#F59E0B';
  const WHATSAPP = '#25D366';

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
      '.reveal-up, .reveal-left, .reveal-right, .reveal-scale'
    );

    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const whatsappUrl =
    'https://wa.me/919356047231?text=Hi%20ALEX%20Graphic%20Design%20Studio%2C%20I%27m%20interested%20in%20your%20services.%20I%27d%20like%20to%20know%20more%20about%20your%20pricing%20and%20services.';

  const benefits = [
    {
      label: 'Quick Response',
      desc: 'Usually within minutes',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      label: 'Free Consultation',
      desc: 'No obligation quotes',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      label: 'Direct Communication',
      desc: 'Talk to the designer',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="whatsapp-cta"
      className="whatsapp-section relative py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-white" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(#111 1px, transparent 1px),
              linear-gradient(90deg, #111 1px, transparent 1px)
            `,
            backgroundSize: '42px 42px',
          }}
        />

        <div
          className="absolute -top-48 -left-48 w-[650px] h-[650px] rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, ${INDIGO}55 0%, transparent 68%)`,
          }}
        />

        <div
          className="absolute -bottom-56 -right-48 w-[700px] h-[700px] rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, ${AMBER}45 0%, transparent 68%)`,
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 w-[620px] h-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-[0.08]"
          style={{ borderColor: INDIGO }}
        />

        <div
          className="absolute top-1/2 left-1/2 w-[460px] h-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-[0.07]"
          style={{ borderColor: AMBER }}
        />

        <div
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed opacity-[0.1]"
          style={{ borderColor: INDIGO }}
        />

        <div
          className="absolute top-[18%] left-[8%] w-28 h-28 rotate-45 border opacity-[0.1]"
          style={{ borderColor: INDIGO }}
        />

        <div
          className="absolute bottom-[15%] right-[8%] w-32 h-32 rotate-12 border opacity-[0.1]"
          style={{ borderColor: AMBER }}
        />

        <div
          className="absolute top-[22%] right-[14%] w-3 h-3 rounded-full"
          style={{ backgroundColor: INDIGO, opacity: 0.35 }}
        />

        <div
          className="absolute bottom-[24%] left-[15%] w-2 h-2 rounded-full"
          style={{ backgroundColor: AMBER, opacity: 0.4 }}
        />

        <div
          className="absolute top-[35%] left-[6%] w-20 h-px opacity-30"
          style={{
            background: `linear-gradient(90deg, transparent, ${INDIGO})`,
          }}
        />

        <div
          className="absolute top-[38%] left-[6%] w-12 h-px opacity-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${INDIGO})`,
          }}
        />

        <div
          className="absolute bottom-[32%] right-[6%] w-20 h-px opacity-30"
          style={{
            background: `linear-gradient(90deg, ${AMBER}, transparent)`,
          }}
        />

        <div
          className="absolute top-16 right-1/4 w-24 h-24 rounded-full border border-dashed opacity-[0.08] animate-[spin_25s_linear_infinite]"
          style={{ borderColor: INDIGO }}
        />

        <div
          className="absolute bottom-12 left-1/4 w-16 h-16 rounded-full border opacity-[0.08]"
          style={{ borderColor: AMBER }}
        />

        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-20 opacity-20"
          style={{
            background: `linear-gradient(to bottom, transparent, ${INDIGO})`,
          }}
        />

        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-20 opacity-20"
          style={{
            background: `linear-gradient(to top, transparent, ${AMBER})`,
          }}
        />

        <div className="absolute top-10 left-10 text-[10px] tracking-[0.35em] font-mono opacity-[0.15]">
          DESIGN / CREATE / CONNECT
        </div>

        <div className="absolute bottom-10 right-10 text-[10px] tracking-[0.35em] font-mono opacity-[0.15]">
          ALEX / STUDIO
        </div>

        <div
          className="absolute top-[12%] left-[45%] w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: INDIGO, opacity: 0.3 }}
        />

        <div
          className="absolute bottom-[18%] right-[42%] w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: AMBER, opacity: 0.3 }}
        />

        <div
          className="absolute top-1/2 left-8 sm:left-12 w-5 h-5"
          style={{ opacity: 0.18 }}
        >
          <span
            className="absolute top-1/2 left-0 w-5 h-px"
            style={{ backgroundColor: INDIGO }}
          />
          <span
            className="absolute top-0 left-1/2 h-5 w-px"
            style={{ backgroundColor: INDIGO }}
          />
        </div>

        <div
          className="absolute top-1/2 right-8 sm:right-12 w-5 h-5"
          style={{ opacity: 0.18 }}
        >
          <span
            className="absolute top-1/2 left-0 w-5 h-px"
            style={{ backgroundColor: AMBER }}
          />
          <span
            className="absolute top-0 left-1/2 h-5 w-px"
            style={{ backgroundColor: AMBER }}
          />
        </div>
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="reveal-up mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-text-secondary mb-6 border border-black/5">
              <span
                className="relative flex w-2 h-2 rounded-full"
                style={{ backgroundColor: WHATSAPP }}
              >
                <span
                  className="absolute inset-0 rounded-full animate-ping opacity-60"
                  style={{ backgroundColor: WHATSAPP }}
                />
              </span>

              LET'S CONNECT
            </span>

            <h2 className="section-heading text-gradient mb-6">
              LET'S CREATE SOMETHING GREAT.
            </h2>

            <p className="section-subheading mx-auto text-lg sm:text-xl">
              Have a design requirement? Talk directly with ALEX Graphic
              Design Studio on WhatsApp. No bots, no forms — just a real
              conversation about your project.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-10 py-5 text-lg sm:text-xl rounded-full font-semibold text-white reveal-scale group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${WHATSAPP}, #1ebe5d)`,
              boxShadow: `
                0 12px 48px rgba(37, 211, 102, 0.28),
                0 0 0 1px rgba(255,255,255,0.5)
              `,
              transitionDelay: '300ms',
            }}
            aria-label="Chat on WhatsApp to start your project"
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(
                  90deg,
                  transparent 0%,
                  rgba(255,255,255,0.18) 50%,
                  transparent 100%
                )`,
              }}
            />

            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="relative z-10 group-hover:rotate-6 transition-transform duration-300"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>

            <span className="font-heading relative z-10">
              CHAT ON WHATSAPP
            </span>
          </a>

          <p
            className="font-body text-sm text-text-muted mt-6 reveal-up"
            style={{ transitionDelay: '400ms' }}
          >
            We typically respond within minutes during business hours
          </p>

          <div
            className="mt-12 grid sm:grid-cols-3 gap-5 reveal-up"
            style={{ transitionDelay: '500ms' }}
          >
            {benefits.map((item, i) => {
              const accent = i === 1 ? AMBER : INDIGO;

              return (
                <div
                  key={item.label}
                  className="glass-card-hover p-6 text-center group relative overflow-hidden"
                >
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-[2px] transition-all duration-500 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${INDIGO}, ${AMBER})`,
                    }}
                  />

                  <div
                    className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      color: accent,
                      background: `linear-gradient(135deg, ${accent}12, ${accent}06)`,
                      border: `1px solid ${accent}18`,
                    }}
                  >
                    {item.icon}
                  </div>

                  <h4 className="font-heading text-base font-semibold text-text-primary mb-1">
                    {item.label}
                  </h4>

                  <p className="font-body text-sm text-text-secondary">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
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

        .reveal-scale {
          opacity: 0;
          transform: scale(0.9);
          transition:
            opacity 600ms ease-out,
            transform 600ms ease-out;
        }

        .reveal-scale.visible {
          opacity: 1;
          transform: scale(1);
        }

        @media (max-width: 640px) {
          .tracking-\\[0\\.35em\\] {
            letter-spacing: 0.2em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-up,
          .reveal-scale {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .animate-pulse,
          .animate-ping,
          .animate-\\[spin_25s_linear_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhatsAppCTA;