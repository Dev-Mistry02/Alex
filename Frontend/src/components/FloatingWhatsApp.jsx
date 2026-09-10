import { useState, useEffect } from 'react';

const FloatingWhatsApp = () => {
  const [visible, setVisible] = useState(true);
  const [pulse, setPulse] = useState(true);

  const INDIGO = '#4F46E5';
  const AMBER = '#F59E0B';
  const WHATSAPP = '#25D366';

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const whatsappUrl =
    'https://wa.me/919356047231?text=Hi%20ALEX%20Graphic%20Design%20Studio%2C%20I%27m%20interested%20in%20your%20services.%20I%27d%20like%20to%20know%20more%20about%20your%20pricing%20and%20services.';

  if (!visible) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 sm:w-16 sm:h-16
        rounded-full
        flex items-center justify-center
        border border-white/80
        hover:scale-110
        hover:-translate-y-1
        active:scale-95
        transition-all duration-300
        focus:outline-none
        focus-visible:ring-4
        ${pulse ? 'animate-pulse-ring' : ''}
      `}
      style={{
        background: `linear-gradient(145deg, ${WHATSAPP}, #1ebe5d)`,
        boxShadow: `
          0 10px 35px rgba(37, 211, 102, 0.30),
          0 0 0 1px rgba(255,255,255,0.8)
        `,
        '--tw-ring-color': `${INDIGO}4D`,
      }}
      aria-label="Chat on WhatsApp"
    >
      <span
        className="absolute -inset-2 rounded-full opacity-0 hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${INDIGO}, ${AMBER})`,
        }}
        aria-hidden="true"
      />

      <span
        className="absolute inset-0 rounded-full opacity-30 animate-pulse-ring"
        style={{
          backgroundColor: WHATSAPP,
        }}
        aria-hidden="true"
      />

      <span
        className="absolute inset-[3px] rounded-full border border-white/25"
        aria-hidden="true"
      />

      <svg
        width="31"
        height="31"
        viewBox="0 0 32 32"
        fill="none"
        className="relative z-10 drop-shadow-sm"
        aria-hidden="true"
      >
        <path
          d="M16 3.2C8.93 3.2 3.2 8.93 3.2 16c0 2.32.63 4.49 1.72 6.36L3.2 28.8l6.59-1.69A12.74 12.74 0 0 0 16 28.8c7.07 0 12.8-5.73 12.8-12.8S23.07 3.2 16 3.2Z"
          fill="white"
        />

        <path
          d="M11.55 9.3c.3-.05.62.1.8.39l1.4 2.28c.18.3.17.67-.03.95l-1.02 1.35c-.13.17-.15.4-.05.59.43.83 1.08 1.62 1.82 2.31.74.69 1.56 1.27 2.42 1.63.2.08.42.04.58-.1l1.25-1.08c.26-.22.64-.27.95-.12l2.39 1.15c.31.15.49.47.46.81-.1 1.02-.57 2.01-1.39 2.62-.7.52-1.59.73-2.53.55-2.03-.39-4.46-1.89-6.61-3.89-2.15-2-3.82-4.31-4.36-6.31-.25-.91-.11-1.82.35-2.56.54-.86 1.49-1.4 2.51-1.57.02 0 .04 0 .06 0Z"
          fill={WHATSAPP}
        />
      </svg>

      <span className="sr-only">
        Chat on WhatsApp
      </span>
    </a>
  );
};

export default FloatingWhatsApp;