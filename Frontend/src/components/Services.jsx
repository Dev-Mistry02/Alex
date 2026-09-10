import { useEffect, useRef } from 'react';
import { categoryColors } from '../data/services';

const whatsappUrl =
  'https://wa.me/919356047231?text=Hi%20ALEX%20Graphic%20Design%20Studio%2C%20I%27m%20interested%20in%20your%20services.%20I%27d%20like%20to%20know%20more%20about%20your%20pricing%20and%20services.';

const Services = ({ services }) => {
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
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const elements = sectionRef.current?.querySelectorAll(
      '.reveal-up, .service-category, .service-card'
    );

    elements?.forEach((el, index) => {
      if (el.classList.contains('service-category')) {
        el.dataset.categoryIndex = index;
      }

      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="services-section relative py-20 sm:py-28 lg:py-32 overflow-hidden"
    >

      <div
        className="services-art absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />

        <div className="services-light absolute inset-0" />


        <div className="services-word services-word-create">
          CREATE
        </div>

        <div className="services-word services-word-alex">
          ALEX
        </div>


        <svg
          className="services-lines absolute inset-0 w-full h-full"
          viewBox="0 0 1440 1000"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            className="editorial-line editorial-line-1"
            d="M-100 700 C250 450 400 850 720 580 C1000 340 1120 120 1540 280"
          />

          <path
            className="editorial-line editorial-line-2"
            d="M-100 820 C280 580 470 920 760 700 C1040 480 1180 300 1540 400"
          />

          <path
            className="editorial-line editorial-line-3"
            d="M150 100 C420 300 620 120 850 250 C1080 380 1180 180 1500 100"
          />

          <path
            className="editorial-line editorial-line-4"
            d="M-100 300 C220 500 420 260 650 420 C900 600 1160 480 1540 650"
          />

          <circle
            className="editorial-circle"
            cx="1180"
            cy="240"
            r="80"
          />

          <circle
            className="editorial-circle-inner"
            cx="1180"
            cy="240"
            r="55"
          />

          <circle
            className="editorial-circle-small"
            cx="1180"
            cy="240"
            r="7"
          />

          <circle
            className="editorial-circle editorial-circle-2"
            cx="260"
            cy="760"
            r="55"
          />
        </svg>


        <div className="crop-mark crop-top-left">
          <span />
          <span />
        </div>

        <div className="crop-mark crop-top-right">
          <span />
          <span />
        </div>

        <div className="crop-mark crop-bottom-left">
          <span />
          <span />
        </div>

        <div className="crop-mark crop-bottom-right">
          <span />
          <span />
        </div>


        <div className="editorial-label editorial-label-01">
          <span>01</span>
          <span>IDENTITY</span>
        </div>

        <div className="editorial-label editorial-label-02">
          <span>02</span>
          <span>PRINT</span>
        </div>

        <div className="editorial-label editorial-label-03">
          <span>03</span>
          <span>DIGITAL</span>
        </div>


        <div className="registration-mark registration-1">
          <span />
          <span />
        </div>

        <div className="registration-mark registration-2">
          <span />
          <span />
        </div>

        <div className="registration-mark registration-3">
          <span />
          <span />
        </div>


        <div className="editorial-rule editorial-rule-left" />
        <div className="editorial-rule editorial-rule-right" />


        <div className="editorial-dot dot-1" />
        <div className="editorial-dot dot-2" />
        <div className="editorial-dot dot-3" />
        <div className="editorial-dot dot-4" />
      </div>


      <div className="section-container relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16 reveal-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-text-secondary mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-blue" />
            OUR CAPABILITIES
          </span>

          <h2 className="section-heading text-gradient mb-6">
            WHAT WE CREATE
          </h2>

          <p className="section-subheading mx-auto">
            From brand identity to large-format printing, social media content
            to custom gifts — we handle every aspect of your visual
            communication with precision and creativity.
          </p>
        </div>


        <div className="space-y-16">
          {services.map((category, catIndex) => {
            const colors = categoryColors[category.color];

            return (
              <div
                key={category.category}
                className="service-category reveal-up"
                style={{
                  transitionDelay: `${catIndex * 100}ms`,
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
                  <div>
                    <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
                      {category.category}
                    </span>

                    <div
                      className="mt-3 w-24 h-1 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                      }}
                    />
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary whitespace-nowrap self-start"
                  >
                    INQUIRE ABOUT{' '}
                    {category.category.split('—')[1]?.trim().toUpperCase() ||
                      category.category}
                  </a>
                </div>


                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.services.map((service, svcIndex) => (
                    <article
                      key={service.name}
                      className="service-card group relative"
                      style={{
                        transitionDelay: `${
                          catIndex * 100 + svcIndex * 50
                        }ms`,
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                            aria-hidden="true"
                          >
                            {getServiceIcon(service.name)}
                          </svg>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-accent-blue transition-colors duration-300">
                            {service.name}
                          </h3>

                          <p className="font-body text-sm text-text-secondary mt-2 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      <div
                        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                        }}
                      />
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center reveal-up">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <span className="flex items-center gap-3">
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

              DISCUSS YOUR PROJECT ON WHATSAPP
            </span>
          </a>
        </div>
      </div>


      <style>{`


        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        .service-category.visible .service-card {
          animation: slide-up 600ms ease-out both;
        }

        .service-category.visible .service-card:nth-child(1) {
          animation-delay: 100ms;
        }

        .service-category.visible .service-card:nth-child(2) {
          animation-delay: 200ms;
        }

        .service-category.visible .service-card:nth-child(3) {
          animation-delay: 300ms;
        }

        .service-category.visible .service-card:nth-child(4) {
          animation-delay: 400ms;
        }

        .service-category.visible .service-card:nth-child(5) {
          animation-delay: 500ms;
        }

        .service-category.visible .service-card:nth-child(6) {
          animation-delay: 600ms;
        }


        .services-art {
          z-index: 0;
          color: var(--color-text-primary);
        }

        .services-light {
          background:
            radial-gradient(
              ellipse 60% 50% at 50% 35%,
              rgba(128, 128, 128, 0.055),
              transparent 70%
            );
        }


        .services-word {
          position: absolute;

          font-family: var(--font-heading);

          font-weight: 800;

          letter-spacing: -0.09em;

          line-height: 0.75;

          white-space: nowrap;

          color: var(--color-text-primary);

          user-select: none;

          pointer-events: none;

          opacity: 0.035;

          will-change: transform;
        }

        .services-word-create {
          top: 6%;
          left: -2%;

          font-size: clamp(7rem, 20vw, 19rem);

          animation:
            editorial-drift
            18s
            ease-in-out
            infinite
            alternate;
        }

        .services-word-alex {
          bottom: 2%;
          right: -4%;

          font-size: clamp(8rem, 23vw, 22rem);

          opacity: 0.025;

          animation:
            editorial-drift-reverse
            22s
            ease-in-out
            infinite
            alternate;
        }


        .services-lines {
          z-index: 1;

          color: var(--color-text-primary);

          opacity: 0.45;
        }

        .editorial-line {
          fill: none;

          stroke: currentColor;

          stroke-width: 1;

          vector-effect: non-scaling-stroke;

          opacity: 0.15;

          stroke-dasharray: 4 10;

          animation:
            line-flow
            18s
            linear
            infinite;
        }

        .editorial-line-2 {
          opacity: 0.09;

          stroke-dasharray: 2 14;

          animation-duration: 24s;
        }

        .editorial-line-3 {
          opacity: 0.08;

          stroke-dasharray: 1 12;

          animation-duration: 28s;
        }

        .editorial-line-4 {
          opacity: 0.055;

          stroke-dasharray: 3 16;

          animation-duration: 32s;
        }


        .editorial-circle {
          fill: none;

          stroke: currentColor;

          stroke-width: 1;

          opacity: 0.14;

          vector-effect: non-scaling-stroke;

          animation:
            circle-pulse
            8s
            ease-in-out
            infinite;
        }

        .editorial-circle-inner {
          fill: none;

          stroke: currentColor;

          stroke-width: 1;

          opacity: 0.08;

          stroke-dasharray: 3 8;

          animation:
            circle-rotate
            25s
            linear
            infinite;
        }

        .editorial-circle-small {
          fill: currentColor;

          opacity: 0.3;

          animation:
            circle-pulse
            8s
            ease-in-out
            infinite;
        }

        .editorial-circle-2 {
          opacity: 0.08;

          animation-delay: 2s;
        }


        .crop-mark {
          position: absolute;

          width: 28px;

          height: 28px;

          opacity: 0.28;

          z-index: 2;
        }

        .crop-mark span {
          position: absolute;

          display: block;

          background: var(--color-text-primary);
        }

        .crop-mark span:first-child {
          width: 28px;

          height: 1px;
        }

        .crop-mark span:last-child {
          width: 1px;

          height: 28px;
        }

        .crop-top-left {
          top: 34px;

          left: 34px;
        }

        .crop-top-right {
          top: 34px;

          right: 34px;

          transform: rotate(90deg);
        }

        .crop-bottom-left {
          bottom: 34px;

          left: 34px;

          transform: rotate(-90deg);
        }

        .crop-bottom-right {
          bottom: 34px;

          right: 34px;

          transform: rotate(180deg);
        }


        .editorial-label {
          position: absolute;

          display: flex;

          align-items: center;

          gap: 10px;

          font-family: var(--font-heading);

          font-size: 9px;

          font-weight: 600;

          letter-spacing: 0.18em;

          text-transform: uppercase;

          color: var(--color-text-secondary);

          opacity: 0.38;

          z-index: 2;
        }

        .editorial-label span:first-child {
          font-size: 10px;

          color: var(--color-text-primary);

          opacity: 0.8;
        }

        .editorial-label::before {
          content: "";

          width: 22px;

          height: 1px;

          background: var(--color-border-subtle);
        }

        .editorial-label-01 {
          top: 18%;

          left: 5%;

          transform: rotate(-90deg);

          transform-origin: left center;
        }

        .editorial-label-02 {
          top: 55%;

          right: 3%;

          transform: rotate(90deg);

          transform-origin: right center;
        }

        .editorial-label-03 {
          bottom: 17%;

          left: 8%;
        }


        .registration-mark {
          position: absolute;

          width: 20px;

          height: 20px;

          z-index: 2;

          opacity: 0.22;
        }

        .registration-mark::before {
          content: "";

          position: absolute;

          inset: 5px;

          border: 1px solid var(--color-text-primary);

          border-radius: 50%;
        }

        .registration-mark span {
          position: absolute;

          background: var(--color-text-primary);
        }

        .registration-mark span:first-child {
          width: 28px;

          height: 1px;

          top: 10px;

          left: -4px;
        }

        .registration-mark span:last-child {
          width: 1px;

          height: 28px;

          left: 10px;

          top: -4px;
        }

        .registration-1 {
          top: 28%;

          right: 12%;
        }

        .registration-2 {
          bottom: 24%;

          left: 14%;
        }

        .registration-3 {
          top: 72%;

          right: 28%;
        }


        .editorial-rule {
          position: absolute;

          top: 15%;

          bottom: 15%;

          width: 1px;

          background: var(--color-border-subtle);

          opacity: 0.35;

          z-index: 1;
        }

        .editorial-rule-left {
          left: 3%;
        }

        .editorial-rule-right {
          right: 3%;
        }


        .editorial-dot {
          position: absolute;

          width: 4px;

          height: 4px;

          border-radius: 50%;

          background: var(--color-text-primary);

          opacity: 0.25;

          z-index: 2;
        }

        .dot-1 {
          top: 23%;

          left: 12%;
        }

        .dot-2 {
          top: 67%;

          right: 11%;
        }

        .dot-3 {
          bottom: 14%;

          right: 35%;
        }

        .dot-4 {
          top: 38%;

          left: 28%;
        }


        @keyframes editorial-drift {
          from {
            transform: translateX(-2%);
          }

          to {
            transform: translateX(2%);
          }
        }

        @keyframes editorial-drift-reverse {
          from {
            transform: translateX(2%);
          }

          to {
            transform: translateX(-2%);
          }
        }

        @keyframes line-flow {
          from {
            stroke-dashoffset: 0;
          }

          to {
            stroke-dashoffset: -150;
          }
        }

        @keyframes circle-pulse {
          0%,
          100% {
            opacity: 0.10;
          }

          50% {
            opacity: 0.20;
          }
        }

        @keyframes circle-rotate {
          from {
            transform: rotate(0deg);
            transform-origin: 1180px 240px;
          }

          to {
            transform: rotate(360deg);
            transform-origin: 1180px 240px;
          }
        }


        .dark .services-light {
          background:
            radial-gradient(
              ellipse 60% 50% at 50% 35%,
              rgba(255, 255, 255, 0.035),
              transparent 70%
            );
        }

        .dark .services-word {
          opacity: 0.045;
        }

        .dark .services-word-alex {
          opacity: 0.035;
        }

        .dark .services-lines {
          opacity: 0.5;
        }

        .dark .editorial-rule {
          opacity: 0.22;
        }

        .dark .editorial-label {
          opacity: 0.45;
        }

        .dark .crop-mark {
          opacity: 0.32;
        }


        @media (max-width: 640px) {
          .services-word-create {
            top: 10%;

            left: -8%;

            font-size: 7rem;
          }

          .services-word-alex {
            bottom: 5%;

            right: -12%;

            font-size: 8rem;
          }

          .editorial-rule-left {
            left: 16px;
          }

          .editorial-rule-right {
            right: 16px;
          }

          .crop-mark {
            transform: scale(0.7);
          }

          .crop-top-left {
            top: 20px;

            left: 20px;
          }

          .crop-top-right {
            top: 20px;

            right: 20px;
          }

          .crop-bottom-left {
            bottom: 20px;

            left: 20px;
          }

          .crop-bottom-right {
            bottom: 20px;

            right: 20px;
          }

          .editorial-label-01 {
            left: 2%;
          }

          .editorial-label-02 {
            right: 1%;
          }

          .registration-1 {
            right: 8%;
          }

          .registration-2 {
            left: 8%;
          }

          .registration-3 {
            right: 20%;
          }

          .editorial-line {
            opacity: 0.08;
          }

          .editorial-circle {
            opacity: 0.08;
          }
        }


        @media (prefers-reduced-motion: reduce) {
          .reveal-up,
          .services-word,
          .editorial-line,
          .editorial-circle,
          .editorial-circle-inner,
          .editorial-circle-small {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};


function getServiceIcon(name) {
  const icons = {
    'Logo Design': (
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    ),

    'Business Cards': (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="6" y1="12" x2="18" y2="12" />
      </>
    ),

    'ID Cards': (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="8.5" cy="12" r="2.5" />
        <path d="M14 17h6M14 12h6M14 7h4" />
      </>
    ),

    Letterheads: (
      <>
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <line x1="6" y1="8" x2="18" y2="8" />
        <line x1="6" y1="12" x2="14" y2="12" />
        <line x1="6" y1="16" x2="16" y2="16" />
      </>
    ),

    'Flex & Banners': (
      <>
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M6 8h12M6 12h12M6 16h8" />
      </>
    ),

    'Acrylic Boards': (
      <>
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M8 8l8 8M16 8l-8 8" />
      </>
    ),

    'Vinyl Stickers': (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12l2 2 4-4" />
      </>
    ),

    'Brochures & Menu Cards': (
      <>
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="6" y1="8" x2="10" y2="8" />
        <line x1="14" y1="8" x2="18" y2="8" />
      </>
    ),

    'Colour Printing': (
      <>
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <circle cx="12" cy="12" r="5" />
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      </>
    ),

    'Black & White Printing': (
      <>
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M6 9h12M6 13h12M6 17h8" />
      </>
    ),

    'Social Media Posts': (
      <>
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 19v2M19 12h2M12 3v2M3 12h2" />
      </>
    ),

    'Video Editing': (
      <>
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <polygon points="23 7 16 12 23 17 23 7" />
      </>
    ),

    'Typing Services': (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="6" y1="8" x2="18" y2="8" />
        <line x1="6" y1="12" x2="14" y2="12" />
        <line x1="6" y1="16" x2="16" y2="16" />
      </>
    ),

    'Wedding Cards': (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <path d="M12 10v10" />
        <path d="M8 14h8" />
      </>
    ),

    'Customized Gifts': (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
  };

  return icons[name] || <circle cx="12" cy="12" r="3" />;
}

export default Services;
