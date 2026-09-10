import { useEffect, useRef, useState } from 'react';
import { portfolioCategories } from '../data/portfolio';

const Portfolio = ({ portfolio, onOpenLightbox }) => {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const INDIGO = '#4F46E5';
  const AMBER = '#F59E0B';

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
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal-up');

    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeCategory]);

  const filteredPortfolio =
    activeCategory === 'All'
      ? portfolio
      : portfolio.filter((item) => item.category === activeCategory);

  const firstRow = filteredPortfolio.filter((_, index) => index % 2 === 0);
  const secondRow = filteredPortfolio.filter((_, index) => index % 2 !== 0);

  const topRow = [...firstRow, ...firstRow];
  const bottomRow = [...secondRow, ...secondRow];

  const handleOpen = (item) => {
    const originalIndex = portfolio.findIndex((p) => p.id === item.id);

    if (originalIndex !== -1) {
      onOpenLightbox(originalIndex);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="portfolio-section relative py-20 sm:py-28 lg:py-32 overflow-hidden"
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
          className="absolute -top-72 -left-64 w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, ${INDIGO}55 0%, transparent 68%)`,
          }}
        />

        <div
          className="absolute -bottom-72 -right-64 w-[850px] h-[850px] rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, ${AMBER}45 0%, transparent 68%)`,
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-[0.045]"
          style={{ borderColor: INDIGO }}
        />

        <div
          className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-[0.055]"
          style={{ borderColor: AMBER }}
        />

        <div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed opacity-[0.07]"
          style={{ borderColor: INDIGO }}
        />

        <div
          className="absolute top-[16%] left-[6%] w-32 h-32 rotate-45 border opacity-[0.08]"
          style={{ borderColor: INDIGO }}
        />

        <div
          className="absolute top-[18%] left-[7%] w-20 h-20 rotate-45 border opacity-[0.05]"
          style={{ borderColor: AMBER }}
        />

        <div
          className="absolute bottom-[12%] right-[7%] w-36 h-36 rotate-12 border opacity-[0.08]"
          style={{ borderColor: AMBER }}
        />

        <div
          className="absolute bottom-[15%] right-[9%] w-24 h-24 rotate-12 border opacity-[0.05]"
          style={{ borderColor: INDIGO }}
        />

        <div
          className="absolute top-[25%] right-[12%] w-28 h-28 rounded-full border border-dashed opacity-[0.08] animate-[spin_30s_linear_infinite]"
          style={{ borderColor: INDIGO }}
        />

        <div
          className="absolute bottom-[24%] left-[12%] w-20 h-20 rounded-full border opacity-[0.07]"
          style={{ borderColor: AMBER }}
        />

        <div
          className="absolute top-[28%] left-[4%] w-24 h-px opacity-25"
          style={{
            background: `linear-gradient(90deg, transparent, ${INDIGO})`,
          }}
        />

        <div
          className="absolute top-[31%] left-[4%] w-14 h-px opacity-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${INDIGO})`,
          }}
        />

        <div
          className="absolute bottom-[28%] right-[4%] w-24 h-px opacity-25"
          style={{
            background: `linear-gradient(90deg, ${AMBER}, transparent)`,
          }}
        />

        <div
          className="absolute bottom-[31%] right-[4%] w-14 h-px opacity-20"
          style={{
            background: `linear-gradient(90deg, ${AMBER}, transparent)`,
          }}
        />

        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-24 opacity-15"
          style={{
            background: `linear-gradient(to bottom, transparent, ${INDIGO})`,
          }}
        />

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-24 opacity-15"
          style={{
            background: `linear-gradient(to top, transparent, ${AMBER})`,
          }}
        />

        <div
          className="absolute top-[20%] right-[22%] w-2 h-2 rounded-full animate-pulse"
          style={{
            backgroundColor: INDIGO,
            opacity: 0.35,
          }}
        />

        <div
          className="absolute top-[42%] left-[10%] w-3 h-3 rounded-full animate-pulse"
          style={{
            backgroundColor: AMBER,
            opacity: 0.3,
          }}
        />

        <div
          className="absolute bottom-[20%] right-[16%] w-2 h-2 rounded-full animate-pulse"
          style={{
            backgroundColor: INDIGO,
            opacity: 0.3,
          }}
        />

        <div
          className="absolute bottom-[38%] left-[22%] w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: AMBER,
            opacity: 0.4,
          }}
        />

        <div
          className="absolute top-20 left-10 sm:left-14 w-5 h-5 opacity-20"
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
          className="absolute top-20 right-10 sm:right-14 w-5 h-5 opacity-20"
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

        <div className="absolute top-8 left-8 text-[9px] tracking-[0.35em] font-mono opacity-[0.13]">
          ALEX / PORTFOLIO
        </div>

        <div className="absolute bottom-8 right-8 text-[9px] tracking-[0.35em] font-mono opacity-[0.13]">
          SELECTED / WORK
        </div>

        <div
          className="absolute top-1/2 left-1/2 w-[1100px] h-[1100px] -translate-x-1/2 -translate-y-1/2 opacity-[0.025]"
          style={{
            backgroundImage: `
              radial-gradient(circle, #111 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
            maskImage:
              'radial-gradient(circle, black 0%, transparent 65%)',
            WebkitMaskImage:
              'radial-gradient(circle, black 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="section-container mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 reveal-up">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-text-secondary mb-6 border border-black/5">
                <span className="relative flex w-2 h-2 rounded-full bg-accent-coral">
                  <span className="absolute inset-0 rounded-full bg-accent-coral animate-ping opacity-50" />
                </span>
                PORTFOLIO
              </span>

              <h2 className="section-heading text-gradient-cyan mb-4">
                SELECTED WORK
              </h2>

              <p className="section-subheading max-w-xl">
                A curated collection of our recent projects across branding,
                print, digital, and custom creations.
              </p>
            </div>

            <div
              className="flex flex-wrap gap-2 self-center"
              role="tablist"
              aria-label="Portfolio categories"
            >
              {portfolioCategories.map((category) => (
                <button
                  key={category}
                  role="tab"
                  aria-selected={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl font-body text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-neutral-900 text-white shadow-[0_4px_20px_rgba(0,0,0,0.18)]'
                      : 'glass-card-hover text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredPortfolio.length > 0 && (
          <div className="portfolio-marquee-wrapper">
            <div className="portfolio-marquee-row marquee-right-to-left">
              {topRow.map((item, index) => (
                <PortfolioCard
                  key={`top-${item.id}-${index}`}
                  item={item}
                  onClick={() => handleOpen(item)}
                />
              ))}
            </div>

            <div className="portfolio-marquee-row marquee-left-to-right">
              {bottomRow.map((item, index) => (
                <PortfolioCard
                  key={`bottom-${item.id}-${index}`}
                  item={item}
                  onClick={() => handleOpen(item)}
                />
              ))}
            </div>
          </div>
        )}

        {filteredPortfolio.length === 0 && (
          <div className="section-container">
            <div className="text-center py-20 glass-card rounded-2xl reveal-up">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="mx-auto text-text-muted mb-4"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                />
              </svg>

              <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
                No projects in this category
              </h3>

              <p className="font-body text-text-secondary">
                Select a different category to view projects.
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .portfolio-marquee-wrapper {
          width: 100%;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .portfolio-marquee-row {
          display: flex;
          width: max-content;
          gap: 28px;
          will-change: transform;
        }

        .portfolio-marquee-card {
          position: relative;
          flex: 0 0 auto;
          width: 360px;
          height: 230px;
          overflow: hidden;
          border-radius: 18px;
          cursor: pointer;
          background: var(--bg-secondary);
          transition:
            transform 400ms ease,
            box-shadow 400ms ease;
        }

        @media (min-width: 768px) {
          .portfolio-marquee-card {
            width: 430px;
            height: 270px;
          }
        }

        @media (min-width: 1280px) {
          .portfolio-marquee-card {
            width: 500px;
            height: 310px;
          }
        }

        .portfolio-marquee-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition:
            transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1),
            filter 500ms ease;
        }

        .portfolio-marquee-card:hover {
          transform: scale(1.025);
          z-index: 5;
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.4);
        }

        .portfolio-marquee-card:hover .portfolio-marquee-image {
          transform: scale(1.06);
        }

        .portfolio-marquee-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding: 24px;
          background:
            linear-gradient(
              to top,
              rgba(0, 0, 0, 0.75),
              rgba(0, 0, 0, 0.15) 60%,
              transparent
            );
          opacity: 0;
          transition: opacity 350ms ease;
        }

        .portfolio-marquee-card:hover .portfolio-marquee-overlay {
          opacity: 1;
        }

        .marquee-right-to-left {
          animation: marqueeRightToLeft 35s linear infinite;
        }

        .marquee-left-to-right {
          animation: marqueeLeftToRight 35s linear infinite;
        }

        @keyframes marqueeRightToLeft {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 14px));
          }
        }

        @keyframes marqueeLeftToRight {
          from {
            transform: translateX(calc(-50% - 14px));
          }

          to {
            transform: translateX(0);
          }
        }

        .portfolio-marquee-row:hover {
          animation-play-state: paused;
        }

        .portfolio-marquee-wrapper::before,
        .portfolio-marquee-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 10;
          pointer-events: none;
        }

        .portfolio-marquee-wrapper::before {
          left: 0;
          background:
            linear-gradient(
              to right,
              var(--bg-primary),
              transparent
            );
        }

        .portfolio-marquee-wrapper::after {
          right: 0;
          background:
            linear-gradient(
              to left,
              var(--bg-primary),
              transparent
            );
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

        @media (max-width: 640px) {
          .portfolio-marquee-wrapper {
            gap: 18px;
          }

          .portfolio-marquee-row {
            gap: 18px;
          }

          .portfolio-marquee-card {
            width: 280px;
            height: 180px;
            border-radius: 14px;
          }

          .portfolio-marquee-overlay {
            opacity: 1;
            padding: 16px;
          }

          .portfolio-marquee-wrapper::before,
          .portfolio-marquee-wrapper::after {
            width: 50px;
          }

          .portfolio-marquee-wrapper::before {
            background:
              linear-gradient(
                to right,
                var(--bg-primary),
                transparent
              );
          }

          .portfolio-marquee-wrapper::after {
            background:
              linear-gradient(
                to left,
                var(--bg-primary),
                transparent
              );
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-marquee-row {
            animation: none !important;
            transform: none !important;
          }

          .portfolio-marquee-card,
          .portfolio-marquee-image,
          .reveal-up {
            transition: none !important;
          }

          .reveal-up {
            opacity: 1 !important;
            transform: none !important;
          }

          .animate-pulse,
          .animate-\\[spin_30s_linear_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

const PortfolioCard = ({ item, onClick }) => {
  return (
    <article
      className="portfolio-marquee-card"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View ${item.title} - ${item.category}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div
        className="portfolio-marquee-image"
        style={{
          backgroundImage: item.image
            ? `url(${item.image})`
            : `linear-gradient(
                135deg,
                ${item.colors?.[0] || '#888'}40,
                ${item.colors?.[1] || '#444'}40
              )`,
        }}
      >
        {!item.image && (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-text-muted/50"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
              />

              <circle
                cx="8.5"
                cy="8.5"
                r="1.5"
              />

              <path d="M21 15l-5-5L5 17" />
            </svg>
          </div>
        )}
      </div>

      <div className="portfolio-marquee-overlay">
        <div className="space-y-1">
          <span className="font-body text-xs font-medium text-white/80 uppercase tracking-wider">
            {item.category}
          </span>

          <h3 className="font-heading text-xl font-bold text-white">
            {item.title}
          </h3>

          <p className="font-body text-sm text-white/70">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Portfolio;