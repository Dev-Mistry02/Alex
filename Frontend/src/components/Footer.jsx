import { useEffect, useRef } from 'react';

const INDIGO = '#4F46E5';
const AMBER = '#F59E0B';
const WHATSAPP = '#25D366';

const WHATSAPP_URL =
  "https://wa.me/919356047231?text=Hi%20ALEX%20Graphic%20Design%20Studio%2C%20I%27m%20interested%20in%20your%20services.%20I%27d%20like%20to%20know%20more%20about%20your%20pricing%20and%20services.";

const MAPS_URL =
  "https://maps.google.com/?q=Office+No.+50,+BLDG+No.+10,+Avenue+J,+Global+City,+Virar+West+-+401303";

const services = [
  'Logo Design',
  'Print Design',
  'Social Media',
  'Video Editing',
];

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (name === 'arrow') {
    return (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    );
  }

  if (name === 'pin') {
    return (
      <svg {...common}>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  if (name === 'phone') {
    return (
      <svg {...common}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" />
      </svg>
    );
  }

  if (name === 'mail') {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }

  if (name === 'clock') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  return null;
}

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const element = footerRef.current;
    if (!element) return;

    const items = element.querySelectorAll('.footer-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('footer-visible');
          }
        });
      },
      { threshold: 0.08 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-glow footer-glow-indigo" />
      <div className="footer-glow footer-glow-amber" />
      <div className="footer-ring footer-ring-one" />
      <div className="footer-ring footer-ring-two" />

      <div className="footer-container">
        <div className="footer-top footer-reveal">
          <div className="footer-brand">
            <img
              src="/icon.png"
              alt="ALEX Graphic Design Studio"
              className="footer-logo"
            />
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-whatsapp"
          >
            <span className="footer-whatsapp-dot" />
            <span>Start a project</span>
            <Icon name="arrow" size={17} />
          </a>
        </div>

        <div className="footer-grid">
          <div className="footer-column footer-reveal">
            <span className="footer-number">01</span>
            <h3>Services</h3>

            <ul>
              {services.map((service) => (
                <li key={service}>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column footer-reveal">
            <span className="footer-number">02</span>
            <h3>Studio</h3>

            <div className="footer-info">
              <div className="footer-info-row">
                <Icon name="pin" size={17} />
                <p>
                  Office No. 50, BLDG No. 10,
                  <br />
                  Avenue J, Global City,
                  <br />
                  Virar West - 401303
                </p>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-location-link"
              >
                Get directions
                <Icon name="arrow" size={15} />
              </a>

              <div className="footer-info-row">
                <Icon name="clock" size={17} />
                <p>
                  Monday – Saturday
                  <br />
                  10:00 AM – 7:00 PM
                  <br />
                  <span>Sunday — Closed</span>
                </p>
              </div>
            </div>
          </div>

          <div className="footer-column footer-reveal">
            <span className="footer-number">03</span>
            <h3>Connect</h3>

            <div className="footer-info">
              <a
                href="tel:+919356047231"
                className="footer-contact-link"
              >
                <Icon name="phone" size={17} />
                <span>+91 93560 47231</span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link"
              >
                <span
                  className="footer-social-icon"
                  style={{ color: WHATSAPP }}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.5-8.3ZM12.1 21.6c-1.7 0-3.4-.5-4.9-1.3l-.4-.2-3.9 1 1-3.8-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.9-9.8 2.6 0 5.1 1 7 2.9 1.9 1.9 2.9 4.3 2.9 7 0 5.4-4.4 9.8-9.9 9.8Zm5.4-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.3-.3-.5.3-.5.8-1.7.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.2.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.8 4.3 2.8 1.2 2.8.8 3.3.8.5 0 1.7-.7 1.9-1.3.2-.6.2-1.1.1-1.2Z" />
                  </svg>
                </span>
                <span>WhatsApp</span>
              </a>

              <a
                href="mailto:alexgraphicdesignstudio@example.com"
                className="footer-contact-link"
              >
                <Icon name="mail" size={17} />
                <span>Send an email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom footer-reveal">
          <p>© {year} ALEX Graphic Design Studio</p>

          <div className="footer-bottom-center">
            <span />
            <p>Made to stand out.</p>
            <span />
          </div>

          <button
            type="button"
            className="footer-top-button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          >
            Back to top
            <Icon name="arrow" size={14} />
          </button>
        </div>
      </div>

      <style>{`
        .footer {
          position: relative;
          overflow: hidden;
          background: #ffffff;
          border-top: 1px solid rgba(15, 23, 42, 0.07);
          color: #111827;
        }

        .footer-container {
          position: relative;
          z-index: 2;
          max-width: 1180px;
          margin: 0 auto;
          padding: 72px 32px 26px;
        }

        .footer-glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(70px);
          pointer-events: none;
          opacity: 0.42;
        }

        .footer-glow-indigo {
          width: 320px;
          height: 320px;
          top: -170px;
          left: -100px;
          background: rgba(79, 70, 229, 0.13);
        }

        .footer-glow-amber {
          width: 280px;
          height: 280px;
          right: -90px;
          bottom: -130px;
          background: rgba(245, 158, 11, 0.12);
        }

        .footer-ring {
          position: absolute;
          border: 1px solid rgba(79, 70, 229, 0.07);
          border-radius: 50%;
          pointer-events: none;
        }

        .footer-ring-one {
          width: 180px;
          height: 180px;
          right: 8%;
          top: 40px;
        }

        .footer-ring-two {
          width: 100px;
          height: 100px;
          left: 6%;
          bottom: 45px;
          border-color: rgba(245, 158, 11, 0.08);
        }

        .footer-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          padding-bottom: 54px;
          border-bottom: 1px solid rgba(15, 23, 42, 0.08);
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .footer-logo {
          width: 82px;
          height: auto;
          display: block;
          object-fit: contain;
        }

        .footer-brand-name {
          margin: 0;
          font-size: 18px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .footer-brand-label {
          margin: 6px 0 0;
          color: #64748b;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
        }

        .footer-tagline {
          margin: 0 auto 2px 0;
          color: #64748b;
          font-size: 13px;
          line-height: 1.6;
        }

        .footer-tagline span {
          color: ${AMBER};
          font-weight: 800;
        }

        .footer-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 999px;
          background: #111827;
          color: #ffffff;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.01em;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          white-space: nowrap;
        }

        .footer-whatsapp:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.14);
        }

        .footer-whatsapp-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${WHATSAPP};
          box-shadow: 0 0 0 4px rgba(37, 211, 102, 0.12);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr 1fr;
          gap: 70px;
          padding: 54px 0 62px;
        }

        .footer-column {
          min-width: 0;
        }

        .footer-number {
          display: block;
          margin-bottom: 12px;
          color: ${INDIGO};
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.18em;
        }

        .footer-column h3 {
          margin: 0 0 22px;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .footer-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-column li {
          margin-bottom: 11px;
        }

        .footer-column li span {
          color: #64748b;
          font-size: 13px;
          transition: color 0.2s ease;
        }

        .footer-column li:hover span {
          color: ${INDIGO};
        }

        .footer-info {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .footer-info-row {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          color: #64748b;
        }

        .footer-info-row svg {
          flex-shrink: 0;
          color: ${INDIGO};
          margin-top: 1px;
        }

        .footer-info-row p {
          margin: 0;
          font-size: 13px;
          line-height: 1.7;
        }

        .footer-info-row p span {
          color: #94a3b8;
        }

        .footer-location-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          width: fit-content;
          margin-left: 28px;
          color: ${INDIGO};
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
        }

        .footer-location-link:hover {
          text-decoration: underline;
        }

        .footer-contact-link {
          display: flex;
          align-items: center;
          gap: 11px;
          color: #64748b;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .footer-contact-link:hover {
          color: ${INDIGO};
          transform: translateX(2px);
        }

        .footer-contact-link svg {
          color: ${INDIGO};
          flex-shrink: 0;
        }

        .footer-social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 17px;
          height: 17px;
          flex-shrink: 0;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding-top: 22px;
          border-top: 1px solid rgba(15, 23, 42, 0.08);
          color: #94a3b8;
        }

        .footer-bottom p {
          margin: 0;
          font-size: 10px;
          letter-spacing: 0.02em;
        }

        .footer-bottom-center {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-bottom-center span {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: ${AMBER};
        }

        .footer-top-button {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border: 0;
          padding: 0;
          background: transparent;
          color: #64748b;
          font: inherit;
          font-size: 10px;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .footer-top-button:hover {
          color: ${INDIGO};
        }

        .footer-reveal {
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity 0.7s ease,
            transform 0.7s ease;
        }

        .footer-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 900px) {
          .footer-container {
            padding-left: 24px;
            padding-right: 24px;
          }

          .footer-top {
            flex-wrap: wrap;
            align-items: center;
          }

          .footer-tagline {
            margin-right: auto;
          }

          .footer-grid {
            gap: 40px;
          }
        }

        @media (max-width: 680px) {
          .footer-container {
            padding: 58px 20px 22px;
          }

          .footer-top {
            display: block;
            padding-bottom: 40px;
          }

          .footer-brand {
            margin-bottom: 18px;
          }

          .footer-logo {
            width: 76px;
          }

          .footer-tagline {
            margin: 0 0 24px;
            max-width: 280px;
          }

          .footer-whatsapp {
            width: fit-content;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 44px 28px;
            padding: 42px 0;
          }

          .footer-column:last-child {
            grid-column: 1 / -1;
          }

          .footer-bottom {
            flex-wrap: wrap;
          }

          .footer-bottom-center {
            order: 3;
            width: 100%;
            justify-content: center;
          }

          .footer-top-button {
            margin-left: auto;
          }
        }

        @media (max-width: 430px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 38px;
          }

          .footer-column:last-child {
            grid-column: auto;
          }

          .footer-bottom {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 14px;
          }

          .footer-bottom-center {
            grid-column: 1 / -1;
            grid-row: 2;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .footer-whatsapp,
          .footer-contact-link {
            transition: none;
          }
        }

        .dark .footer {
          background: var(--color-bg-primary);
          border-top-color: var(--color-border-subtle);
          color: var(--color-text-primary);
        }

        .dark .footer-top,
        .dark .footer-bottom {
          border-color: var(--color-border-subtle);
        }

        .dark .footer-brand-label,
        .dark .footer-tagline,
        .dark .footer-column li span,
        .dark .footer-info-row,
        .dark .footer-contact-link,
        .dark .footer-bottom {
          color: var(--color-text-secondary);
        }

        .dark .footer-info-row p span,
        .dark .footer-bottom p,
        .dark .footer-top-button {
          color: var(--color-text-muted);
        }

        .dark .footer-whatsapp {
          background: var(--color-button-bg);
          color: var(--color-button-text);
        }
      `}</style>
    </footer>
  );
}

export default Footer;