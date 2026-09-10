import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const INDIGO = '#4F46E5';
const AMBER = '#F59E0B';

const Lightbox = ({ portfolio, currentIndex, onClose, onNavigate }) => {
  const lightboxRef = useRef(null);
  const item = portfolio[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNavigate]);

  useEffect(() => {
    lightboxRef.current?.focus();
  }, []);

  if (!item) return null;

  const imageSrc = item.image || item.src || item.url || item.imageUrl;

  const whatsappUrl = `https://wa.me/919356047231?text=Hi%20ALEX%20Graphic%20Design%20Studio%2C%20I%27m%20interested%20in%20%22${encodeURIComponent(
    item.title
  )}%22.%20Could%20you%20share%20pricing%20and%20details%3F`;

  return createPortal((
    <div
      ref={lightboxRef}
      className="site-lightbox fixed inset-0 z-[9999] w-screen h-[100dvh] flex items-start sm:items-center justify-center bg-black/80 backdrop-blur-2xl p-0 sm:p-5 overflow-x-hidden overflow-y-auto overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} - Full view`}
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="absolute -top-40 -left-40 w-[450px] h-[450px] rounded-full blur-[150px] opacity-20 pointer-events-none"
        style={{ backgroundColor: INDIGO }}
      />

      <div
        className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full blur-[150px] opacity-15 pointer-events-none"
        style={{ backgroundColor: AMBER }}
      />

      <div
        className="relative w-full max-w-none sm:max-w-5xl min-w-0 my-0 sm:my-0 pb-16 sm:pb-0 max-h-none sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="lightbox-close-button absolute top-3 right-3 sm:-top-12 sm:right-0 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 sm:bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div         className="lightbox-content site-lightbox-panel w-full max-w-full min-w-0 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] max-h-none sm:max-h-[88vh] overflow-y-visible lg:overflow-hidden rounded-none sm:rounded-[24px] bg-white/[0.95] backdrop-blur-3xl border border-white/80 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
          
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[500px] max-h-[46dvh] sm:max-h-none flex items-center justify-center overflow-hidden bg-[#F5F6FA]">
            
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(
                    circle at 15% 15%,
                    rgba(79,70,229,0.18),
                    transparent 38%
                  ),
                  radial-gradient(
                    circle at 85% 85%,
                    rgba(245,158,11,0.15),
                    transparent 38%
                  ),
                  linear-gradient(
                    135deg,
                    #F5F6FF 0%,
                    #FFFFFF 50%,
                    #FFFAF0 100%
                  )
                `,
              }}
            />

            <div
              className="absolute -top-20 -left-20 w-56 h-56 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: INDIGO }}
            />

            <div
              className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: AMBER }}
            />

            <div className="relative z-10 w-[92%] sm:w-[78%] lg:w-[76%] aspect-[4/3] rounded-[14px] sm:rounded-[20px] bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_15px_40px_rgba(0,0,0,0.14)] overflow-hidden">
              <div className="absolute inset-2 sm:inset-3 rounded-[13px] sm:rounded-[16px] border border-white/80 bg-white/10 overflow-hidden">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={item.title || 'Portfolio project'}
                    className="absolute inset-0 h-full w-full object-contain"
                    loading="eager"
                    draggable="false"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-black/20"
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
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-semibold text-white/70 uppercase tracking-[0.15em]">
                    {item.category}
                  </span>

                  <h3 className="text-base sm:text-xl font-bold text-white truncate max-w-[62vw] sm:max-w-none">
                    {item.title}
                  </h3>
                </div>

              </div>
            </div>
          </div>

          <div className="p-4 sm:p-7 lg:p-8 xl:p-9 flex flex-col justify-center bg-white/85 backdrop-blur-2xl min-w-0">
            
            <div className="mb-6 sm:mb-7">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-black/5 text-[10px] font-semibold text-gray-600 uppercase tracking-[0.14em]">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${INDIGO}, ${AMBER})`,
                  }}
                />
                PROJECT DETAILS
              </span>

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111] mt-4 mb-3 break-words">
                {item.title}
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-words">
                {item.description}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${INDIGO}, #6366F1)`,
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="3"
                      width="20"
                      height="14"
                      rx="2"
                    />
                    <path d="M8 21h8M12 17v-4" />
                  </svg>
                </div>

                <div>
                  <span className="block text-[9px] font-semibold text-gray-400 uppercase tracking-[0.15em]">
                    Category
                  </span>

                  <p className="text-sm font-semibold text-[#111]">
                    {item.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${AMBER}, #FBBF24)`,
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>

                <div>
                  <span className="block text-[9px] font-semibold text-gray-400 uppercase tracking-[0.15em]">
                    Delivered
                  </span>

                  <p className="text-sm font-semibold text-[#111]">
                    On Schedule
                  </p>
                </div>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lightbox-project-button group relative w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-full bg-[#111] text-white text-xs sm:text-sm font-bold tracking-wide overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `#000`,
                }}
              />

              <span className="relative z-10 flex items-center gap-3">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>

                START A SIMILAR PROJECT
              </span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-2 sm:static left-0 right-0 flex items-center justify-center gap-3 sm:gap-4 mt-0 sm:mt-4">
          <button
            onClick={() => onNavigate(-1)}
            className="lightbox-navigation-button w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 hover:scale-105 transition-all shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Previous project"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5 max-w-[120px] sm:max-w-[180px] overflow-hidden">
            {portfolio.map((_, i) => {
              const isActive = i === currentIndex;

              return (
                <button
                  key={i}
                  onClick={() => onNavigate(i - currentIndex)}
                  className={`lightbox-indicator h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-6'
                      : 'w-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(90deg, ${INDIGO}, ${AMBER})`,
                        }
                      : undefined
                  }
                  aria-label={`Go to project ${i + 1}`}
                  aria-current={isActive ? 'true' : 'false'}
                />
              );
            })}
          </div>

          <button
            onClick={() => onNavigate(1)}
            className="lightbox-navigation-button w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 hover:scale-105 transition-all shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Next project"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .lightbox-scroll {
            scrollbar-width: none;
          }

          .lightbox-scroll::-webkit-scrollbar {
            display: none;
          }

          .lightbox-content {
            max-width: 100vw;
            width: 100vw;
            min-width: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  ), document.body);
};

export default Lightbox;