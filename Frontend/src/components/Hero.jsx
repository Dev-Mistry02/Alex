import { useEffect, useRef, useState } from 'react';
import { heroImages } from '../data/hero';

const Hero = () => {
  const heroRef = useRef(null);

  const INDIGO = '#4F46E5';
  const AMBER = '#F59E0B';

  const deckImages = heroImages;

  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  const advanceDeck = (direction = 1) => {
    setActiveDeckIndex(
      (current) =>
        (current + direction + deckImages.length) % deckImages.length
    );
    setDragX(0);
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    dragStartX.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;
    setDragX(event.clientX - dragStartX.current);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragX) > 90) {
      advanceDeck(dragX < 0 ? 1 : -1);
    } else {
      setDragX(0);
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragX(0);
  };

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

    const elements = heroRef.current?.querySelectorAll(
      '.reveal-up, .reveal-left, .reveal-right, .reveal-scale'
    );

    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const whatsappUrl =
    'https://wa.me/919356047231?text=Hi%20ALEX%20Graphic%20Design%20Studio%2C%20I%27m%20interested%20in%20your%20services.%20I%27d%20like%20to%20know%20more%20about%20your%20pricing%20and%20services.';

  return (
    <section
      ref={heroRef}
      className="hero-section relative min-h-screen flex items-center overflow-hidden pt-24 sm:pt-28"
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-white" />

        <div
          className="absolute -top-40 -left-40 w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] lg:w-[620px] lg:h-[620px] rounded-full blur-[100px] sm:blur-[120px]"
          style={{
            background: `radial-gradient(
              circle,
              ${INDIGO}42 0%,
              ${INDIGO}18 38%,
              transparent 72%
            )`,
          }}
        />

        <div
          className="absolute -bottom-48 -right-40 w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] lg:w-[680px] lg:h-[680px] rounded-full blur-[100px] sm:blur-[130px]"
          style={{
            background: `radial-gradient(
              circle,
              ${AMBER}38 0%,
              ${AMBER}12 42%,
              transparent 72%
            )`,
          }}
        />

        <div
          className="absolute left-[28%] top-[20%] w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px] rounded-full blur-[100px] sm:blur-[140px]"
          style={{
            background: `radial-gradient(
              circle,
              ${INDIGO}20 0%,
              transparent 70%
            )`,
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #111 1px, transparent 1px),
              linear-gradient(#111 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #111 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div
          className="absolute left-[-8%] top-[36%] w-[420px] h-[180px] sm:w-[600px] sm:h-[260px] rounded-[50%] border rotate-[-18deg]"
          style={{
            borderColor: `${INDIGO}12`,
          }}
        />

        <div
          className="absolute left-[-5%] top-[39%] w-[340px] h-[140px] sm:w-[500px] sm:h-[210px] rounded-[50%] border rotate-[-18deg]"
          style={{
            borderColor: `${INDIGO}09`,
          }}
        />

        <div
          className="absolute right-[-8%] top-[13%] w-[380px] h-[180px] sm:w-[540px] sm:h-[250px] rounded-[50%] border rotate-[24deg]"
          style={{
            borderColor: `${AMBER}14`,
          }}
        />

        <div
          className="absolute right-[4%] bottom-[8%] w-[170px] h-[170px] sm:w-[230px] sm:h-[230px] rounded-full border"
          style={{
            borderColor: `${INDIGO}10`,
          }}
        />

        <div
          className="absolute right-[7%] bottom-[11%] w-[110px] h-[110px] sm:w-[160px] sm:h-[160px] rounded-full border"
          style={{
            borderColor: `${AMBER}12`,
          }}
        />

        <div className="absolute top-[14%] left-[7%] hidden sm:block">
          <div
            className="w-12 h-12 rounded-full border-[1.5px]"
            style={{
              borderColor: `${INDIGO}35`,
            }}
          />

          <div
            className="absolute top-1/2 left-[-10px] w-[68px] h-px"
            style={{
              backgroundColor: `${INDIGO}20`,
            }}
          />

          <div
            className="absolute left-1/2 top-[-10px] h-[68px] w-px"
            style={{
              backgroundColor: `${INDIGO}20`,
            }}
          />

          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: `${INDIGO}45`,
            }}
          />
        </div>

        <div className="absolute top-[22%] right-[6%] hidden md:block">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-px"
              style={{
                backgroundColor: `${AMBER}35`,
              }}
            />

            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: `${AMBER}55`,
              }}
            />

            <div
              className="w-14 h-px"
              style={{
                backgroundColor: `${AMBER}20`,
              }}
            />
          </div>
        </div>

        <div className="absolute left-[12%] bottom-[16%] hidden lg:block">
          <div
            className="w-16 h-16 border rotate-45"
            style={{
              borderColor: `${INDIGO}12`,
            }}
          />

          <div
            className="absolute inset-3 border rotate-45"
            style={{
              borderColor: `${AMBER}15`,
            }}
          />
        </div>

        <div className="absolute top-[48%] right-[12%] hidden md:block">
          <div
            className="w-20 h-20 border border-dashed rounded-full"
            style={{
              borderColor: `${INDIGO}18`,
            }}
          />

          <div
            className="absolute top-1/2 left-[-15px] w-[110px] h-px"
            style={{
              backgroundColor: `${INDIGO}10`,
            }}
          />

          <div
            className="absolute left-1/2 top-[-15px] h-[110px] w-px"
            style={{
              backgroundColor: `${INDIGO}10`,
            }}
          />
        </div>

        <div className="absolute left-[42%] top-[10%] hidden lg:block">
          <div
            className="w-24 h-px"
            style={{
              backgroundColor: `${INDIGO}18`,
            }}
          />

          <div
            className="absolute left-0 top-3 w-14 h-px"
            style={{
              backgroundColor: `${AMBER}22`,
            }}
          />

          <div
            className="absolute left-0 top-6 w-7 h-px"
            style={{
              backgroundColor: `${INDIGO}14`,
            }}
          />
        </div>

        <div className="absolute bottom-[10%] right-[36%] hidden lg:block">
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((item) => (
              <span
                key={item}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor:
                    item % 2 === 0
                      ? `${INDIGO}30`
                      : `${AMBER}35`,
                }}
              />
            ))}
          </div>
        </div>

        <div
          className="absolute top-[16%] left-[7%] w-2 h-2 rounded-full animate-float"
          style={{
            backgroundColor: `${INDIGO}75`,
          }}
        />

        <div
          className="absolute top-[27%] right-[9%] w-3 h-3 rounded-full animate-float animation-delay-2000"
          style={{
            backgroundColor: `${AMBER}80`,
          }}
        />

        <div
          className="absolute bottom-[17%] left-[45%] w-1.5 h-1.5 rounded-full animate-float animation-delay-4000"
          style={{
            backgroundColor: `${INDIGO}65`,
          }}
        />

        <div
          className="absolute top-[52%] left-[20%] w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: `${AMBER}55`,
          }}
        />

        <div
          className="absolute top-[72%] right-[22%] w-2 h-2 rounded-full"
          style={{
            backgroundColor: `${INDIGO}45`,
          }}
        />
      </div>

      <div className="section-container relative z-10 py-20 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center">

          <div className="reveal-left text-center lg:text-left">

            <div className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-full glass-card border border-black/[0.06] mb-7 shadow-sm">
              <span className="relative flex w-2 h-2">
                <span
                  className="absolute inset-0 rounded-full animate-ping opacity-50"
                  style={{
                    backgroundColor: INDIGO,
                  }}
                />

                <span
                  className="relative w-2 h-2 rounded-full"
                  style={{
                    background: `linear-gradient(
                      135deg,
                      ${INDIGO},
                      ${AMBER}
                    )`,
                  }}
                />
              </span>

              <span className="font-body text-xs sm:text-sm font-medium text-text-secondary tracking-wide">
                GRAPHIC DESIGN • PRINTING • VIDEO EDITING
              </span>
            </div>

            <h1 className="font-heading font-bold tracking-tight leading-[0.95] text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] mb-7">
              <span className="block text-text-primary">
                Ideas
              </span>

              <span
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(
                    90deg,
                    ${INDIGO},
                    ${AMBER}
                  )`,
                }}
              >
                Printed
              </span>

              <span className="block text-text-primary">
                Beautifully.
              </span>
            </h1>

            <p className="font-body text-base sm:text-lg lg:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 mb-9 leading-relaxed">
              Creative graphic design, professional printing & video editing —
              all under one roof. We turn your ideas into visuals that get
              noticed.
            </p>

            <div className="flex flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 mb-10">

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp group"
                aria-label="Chat on WhatsApp"
              >
                <span className="flex items-center gap-2 sm:gap-3">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:rotate-6 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>

                  WHATSAPP

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
              </a>

              <a
                href="#portfolio"
                className="hero-secondary-cta group inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-7 py-4 rounded-full bg-white border border-black/[0.08] text-[#111111] font-heading font-semibold text-sm sm:text-base shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                aria-label="View our work"
              >
                <span>EXPLORE </span>

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-xl mx-auto lg:mx-0">

              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    color: INDIGO,
                    backgroundColor: `${INDIGO}0D`,
                    border: `1px solid ${INDIGO}18`,
                  }}
                >
                  <svg
                    width="17"
                    height="17"
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
                </div>

                <div className="text-left">
                  <div className="font-heading text-xs font-semibold text-text-primary">
                    10+ Years
                  </div>

                  <div className="font-body text-[11px] text-text-muted">
                    Experience
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    color: AMBER,
                    backgroundColor: `${AMBER}0D`,
                    border: `1px solid ${AMBER}18`,
                  }}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 7h-9" />
                    <path d="M14 17H5" />
                    <circle cx="17" cy="17" r="3" />
                    <circle cx="7" cy="7" r="3" />
                  </svg>
                </div>

                <div className="text-left">
                  <div className="font-heading text-xs font-semibold text-text-primary">
                    500+
                  </div>

                  <div className="font-body text-[11px] text-text-muted">
                    Projects
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    color: INDIGO,
                    backgroundColor: `${INDIGO}0D`,
                    border: `1px solid ${INDIGO}18`,
                  }}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>

                <div className="text-left">
                  <div className="font-heading text-xs font-semibold text-text-primary">
                    100%
                  </div>

                  <div className="font-body text-[11px] text-text-muted">
                    Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative reveal-right hidden lg:block">
            <div className="relative w-full max-w-[620px] mx-auto aspect-square flex items-center justify-center">

              <div
                className="absolute inset-[12%] rounded-full blur-3xl opacity-25"
                style={{
                  background: `radial-gradient(
                    circle,
                    ${INDIGO}28 0%,
                    ${AMBER}18 45%,
                    transparent 72%
                  )`,
                }}
              />

              <div
                className="relative w-[72%] h-[76%] min-h-[420px] select-none"
                style={{
                  perspective: '1200px',
                  touchAction: 'pan-y',
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                onPointerLeave={(event) => {
                  if (isDragging) handlePointerUp(event);
                }}
                role="region"
                aria-label="Interactive portfolio image deck"
              >
                {deckImages.map((image, position) => {
                  const relativeIndex =
                    (position -
                      activeDeckIndex +
                      deckImages.length) %
                    deckImages.length;

                  if (relativeIndex > 3) return null;

                  const depth = relativeIndex;
                  const isFront = depth === 0;

                  const deckLayout = [
                    {
                      x: 0,
                      y: 0,
                      rotate: 0,
                      scale: 1,
                      opacity: 1,
                    },
                    {
                      x: -52,
                      y: 34,
                      rotate: -7,
                      scale: 0.93,
                      opacity: 0.92,
                    },
                    {
                      x: 54,
                      y: -18,
                      rotate: 6,
                      scale: 0.86,
                      opacity: 0.78,
                    },
                    {
                      x: -34,
                      y: 78,
                      rotate: 8,
                      scale: 0.79,
                      opacity: 0.62,
                    },
                  ];

                  const layout = deckLayout[depth];

                  const dragRotation = isFront
                    ? dragX / 18
                    : 0;

                  const translateX = isFront
                    ? dragX
                    : layout.x;

                  const translateY = layout.y;
                  const scale = layout.scale;
                  const rotate = isFront
                    ? dragRotation
                    : layout.rotate;

                  const opacity = layout.opacity;

                  return (
                    <div
                      key={`${image.src}-${position}`}
                      className="absolute inset-0 rounded-[32px] p-2 bg-white/80 border border-white/80 shadow-[0_30px_80px_rgba(0,0,0,0.14)] backdrop-blur-xl"
                      style={{
                        zIndex: deckImages.length - depth,
                        opacity,
                        transform: `translate3d(${translateX}px, ${translateY}px, ${
                          -depth * 30
                        }px) rotate(${rotate}deg) scale(${scale})`,
                        transition:
                          isDragging && isFront
                            ? 'none'
                            : 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms ease',
                        cursor: isFront
                          ? isDragging
                            ? 'grabbing'
                            : 'grab'
                          : 'default',
                        pointerEvents: isFront
                          ? 'auto'
                          : 'none',
                      }}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-white">
                        <img
                          src={image.src}
                          alt={image.title}
                          draggable="false"
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
                          <div>
                            <div className="text-[9px] font-semibold tracking-[0.2em] opacity-80">
                              {image.label}
                            </div>

                            <div className="mt-1 font-heading text-xl sm:text-2xl font-bold">
                              {image.title}
                            </div>
                          </div>

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14" />
                              <path d="m13 6 6 6-6 6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="absolute -top-7 -right-7 z-20 hidden sm:flex items-center gap-2 rounded-2xl border border-white/80 bg-white/65 px-4 py-3 shadow-[0_15px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${INDIGO}, ${AMBER})`,
                    }}
                  />

                  <span className="font-body text-[10px] font-semibold tracking-[0.16em] text-text-secondary">
                    SWIPE TO EXPLORE
                  </span>
                </div>

                <div className="absolute -bottom-7 left-1/2 z-20 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-white/80 bg-white/70 px-3 py-2 shadow-[0_12px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                  {deckImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Show portfolio image ${index + 1}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveDeckIndex(index);
                        setDragX(0);
                      }}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width:
                          index === activeDeckIndex
                            ? 22
                            : 6,
                        background:
                          index === activeDeckIndex
                            ? `linear-gradient(90deg, ${INDIGO}, ${AMBER})`
                            : '#D1D5DB',
                      }}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  aria-label="Previous portfolio image"
                  onClick={(event) => {
                    event.stopPropagation();
                    advanceDeck(-1);
                  }}
                  className="hero-carousel-button absolute left-[-7%] top-1/2 z-30 hidden sm:flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/70 text-[#111111] shadow-[0_12px_35px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="Next portfolio image"
                  onClick={(event) => {
                    event.stopPropagation();
                    advanceDeck(1);
                  }}
                  className="hero-carousel-button absolute right-[-7%] top-1/2 z-30 hidden sm:flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/70 text-[#111111] shadow-[0_12px_35px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>

                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[78%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[36px] border border-white/50 bg-white/5 backdrop-blur-[1px]"
                  style={{
                    transform: `translate(calc(-50% + ${
                      (dragX < 0 ? -1 : 1) *
                      Math.min(Math.abs(dragX) * 0.04, 8)
                    }px), -50%)`,
                    opacity: isDragging ? 0.4 : 0,
                    transition: isDragging
                      ? 'none'
                      : 'opacity 300ms ease',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 reveal-scale"
        style={{
          transitionDelay: '800ms',
        }}
      >
        <a
          href="#services"
          className="flex flex-col items-center gap-2 text-text-muted hover:text-[#111111] transition-colors"
          aria-label="Scroll to explore"
        >
          <span className="font-body text-[10px] tracking-[0.2em] uppercase">
            Scroll to explore
          </span>

          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce-slow"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;