import { useEffect, useRef } from 'react';

const INDIGO = '#4F46E5';
const AMBER = '#F59E0B';

const CONTACT = {
  phone: '+91 93560 47231',
  address: 'Office No. 50, BLDG No. 10, Avenue J, Global City, Virar West - 401303',
  whatsapp:
    'https://wa.me/919356047231?text=Hi%20ALEX%20Graphic%20Design%20Studio%2C%20I%27d%20like%20to%20visit%20your%20studio.%20Could%20you%20share%20directions%20and%20timings%3F',
  maps:
    'https://maps.google.com/?q=Office+No.+50,+BLDG+No.+10,+Avenue+J,+Global+City,+Virar+West+-+401303',
};

const Icon = ({ type, size = 20 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  };

  if (type === 'location') {
    return (
      <svg {...common}>
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }

  if (type === 'phone') {
    return (
      <svg {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.85 4.18 2 2 0 0 1 5.82 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.63a2 2 0 0 1-.45 2.11L7.73 9.73a16 16 0 0 0 6.54 6.54l1.73-1.73a2 2 0 0 1 2.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }

  if (type === 'clock') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (type === 'arrow') {
    return (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    );
  }

  if (type === 'whatsapp') {
    return (
      <svg {...common} strokeWidth="2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    );
  }

  return null;
};

const ContactRow = ({ number, icon, label, children, href }) => {
  const content = (
    <>
      <span className="contact-number">{number}</span>

      <span className="contact-icon">
        <Icon type={icon} size={19} />
      </span>

      <span className="contact-copy">
        <span className="contact-label">{label}</span>
        <span className="contact-value">{children}</span>
      </span>

      <span className="contact-arrow">
        <Icon type="arrow" size={16} />
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className="contact-row">
        {content}
      </a>
    );
  }

  return <div className="contact-row">{content}</div>;
};

const Location = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll(
      '.reveal-left, .reveal-right, .reveal-up, .reveal-scale'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="location-section"
    >
      <div className="location-background" aria-hidden="true">
        <div className="glow glow-indigo" />
        <div className="glow glow-amber" />
        <div className="glow glow-center" />

        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />

        <span className="dot dot-one" />
        <span className="dot dot-two" />
        <span className="dot dot-three" />
        <span className="dot dot-four" />

        <div className="cross cross-one" />
        <div className="cross cross-two" />
      </div>

      <div className="section-container location-container">
        <div className="location-top reveal-up">
          <div className="location-kicker">
            <span className="kicker-line" />
            <span>CONTACT / 01</span>
          </div>

          <span className="location-small-text">
            ALEX GRAPHIC DESIGN STUDIO
          </span>
        </div>

        <div className="location-layout">
          <div className="location-content reveal-left">
            <p className="eyebrow">
              HAVE A PROJECT IN MIND?
            </p>

            <h2 className="location-heading">
              LET&apos;S MAKE
              <span> SOMETHING.</span>
            </h2>

            <p className="location-description">
              Good design starts with a conversation. Tell us what you&apos;re
              working on, what you&apos;re imagining, or simply drop in for a
              chat.
            </p>

            <div className="contact-list">
              <ContactRow
                number="01"
                icon="location"
                label="STUDIO"
                href={CONTACT.maps}
              >
                <span>
                  Virar West
                  <small>Global City, Maharashtra</small>
                </span>
              </ContactRow>

              <ContactRow
                number="02"
                icon="phone"
                label="CALL / WHATSAPP"
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              >
                {CONTACT.phone}
              </ContactRow>

              <ContactRow
                number="03"
                icon="clock"
                label="STUDIO HOURS"
              >
                <span>
                  10:00 AM — 7:00 PM
                  <small>Monday — Saturday</small>
                </span>
              </ContactRow>
            </div>

            <div className="location-actions">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-button"
              >
                <Icon type="whatsapp" size={19} />
                <span>START A CONVERSATION</span>
                <Icon type="arrow" size={17} />
              </a>

              <a
                href={CONTACT.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="directions-link"
              >
                GET DIRECTIONS
                <Icon type="arrow" size={16} />
              </a>
            </div>
          </div>

          <div className="location-art reveal-right">
            <div className="art-label art-label-top">
              <span>LOCATION</span>
              <strong>01</strong>
            </div>

            <div className="art-label art-label-bottom">
              <span>INDIA</span>
              <strong>19°27&apos;N</strong>
            </div>

            <div className="location-stage">
              <div className="stage-glow" />

              <div className="stage-ring ring-large" />
              <div className="stage-ring ring-medium" />
              <div className="stage-ring ring-small" />

              <div className="stage-dashed-ring" />

              <div className="stage-line stage-line-horizontal" />
              <div className="stage-line stage-line-vertical" />

              <div className="location-pin">
                <div className="pin-inner">
                  <Icon type="location" size={30} />
                </div>
              </div>

              <div className="stage-center-dot" />

              <div className="floating-tag tag-city">
                <span>WE ARE HERE</span>
                <strong>VIRAR WEST</strong>
              </div>

              <div className="floating-tag tag-hours">
                <span>OPEN</span>
                <strong>10 — 07</strong>
              </div>

              <div className="floating-tag tag-type">
                <span>STUDIO</span>
                <strong>DESIGN / PRINT / EDIT</strong>
              </div>

              <div className="stage-typography">
                <span>GLOBAL</span>
                <strong>CITY</strong>
              </div>
            </div>

            <div className="art-footer">
              <span>OFFICE NO. 50</span>
              <span>AVENUE J</span>
              <span>401303</span>
            </div>
          </div>
        </div>

        <div className="location-bottom reveal-up">
          <span>DESIGNED TO CONNECT.</span>

          <div className="bottom-line" />

          <span>LET&apos;S CREATE SOMETHING MEMORABLE.</span>
        </div>
      </div>

      <style>{`
        .location-section {
          position: relative;
          overflow: hidden;
          background: #ffffff;
          padding: 110px 0 70px;
          isolation: isolate;
        }

        .location-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: -1;
        }

        .glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(90px);
        }

        .glow-indigo {
          width: 520px;
          height: 520px;
          top: -240px;
          left: -180px;
          opacity: 0.17;
          background: radial-gradient(
            circle,
            ${INDIGO}45 0%,
            transparent 70%
          );
        }

        .glow-amber {
          width: 500px;
          height: 500px;
          right: -220px;
          bottom: -200px;
          opacity: 0.16;
          background: radial-gradient(
            circle,
            ${AMBER}40 0%,
            transparent 70%
          );
        }

        .glow-center {
          width: 700px;
          height: 700px;
          left: 50%;
          top: 45%;
          transform: translate(-50%, -50%);
          opacity: 0.06;
          background: radial-gradient(
            circle,
            ${INDIGO}30 0%,
            ${AMBER}15 35%,
            transparent 70%
          );
        }

        .orbit {
          position: absolute;
          border: 1px solid rgba(0, 0, 0, 0.045);
          border-radius: 50%;
        }

        .orbit-one {
          width: 560px;
          height: 560px;
          left: -390px;
          top: 20%;
        }

        .orbit-two {
          width: 700px;
          height: 700px;
          right: -520px;
          top: 5%;
        }

        .dot {
          position: absolute;
          border-radius: 50%;
        }

        .dot-one {
          width: 8px;
          height: 8px;
          left: 8%;
          top: 24%;
          background: ${INDIGO};
          opacity: 0.45;
          animation: floatLocation 5s ease-in-out infinite;
        }

        .dot-two {
          width: 11px;
          height: 11px;
          right: 12%;
          top: 17%;
          background: ${AMBER};
          opacity: 0.55;
          animation: floatLocation 6s ease-in-out infinite reverse;
        }

        .dot-three {
          width: 5px;
          height: 5px;
          left: 44%;
          bottom: 12%;
          background: ${INDIGO};
          opacity: 0.35;
        }

        .dot-four {
          width: 7px;
          height: 7px;
          right: 31%;
          bottom: 19%;
          background: ${AMBER};
          opacity: 0.45;
        }

        .cross {
          position: absolute;
          width: 18px;
          height: 18px;
          opacity: 0.12;
        }

        .cross::before,
        .cross::after {
          content: '';
          position: absolute;
          background: #111111;
        }

        .cross::before {
          width: 100%;
          height: 1px;
          top: 50%;
        }

        .cross::after {
          width: 1px;
          height: 100%;
          left: 50%;
        }

        .cross-one {
          left: 5%;
          bottom: 23%;
        }

        .cross-two {
          right: 5%;
          top: 38%;
        }

        .location-container {
          position: relative;
          z-index: 2;
        }

        .location-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 65px;
        }

        .location-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-body, sans-serif);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #666666;
        }

        .kicker-line {
          width: 35px;
          height: 1px;
          background: linear-gradient(
            90deg,
            ${INDIGO},
            ${AMBER}
          );
        }

        .location-small-text {
          font-family: var(--font-body, sans-serif);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: #999999;
        }

        .location-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1.1fr);
          gap: 80px;
          align-items: center;
        }

        .location-content {
          max-width: 620px;
        }

        .eyebrow {
          margin: 0 0 18px;
          font-family: var(--font-body, sans-serif);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: ${INDIGO};
        }

        .location-heading {
          margin: 0;
          max-width: 650px;
          font-family: var(--font-heading, sans-serif);
          font-size: clamp(3.8rem, 7vw, 7.2rem);
          line-height: 0.87;
          letter-spacing: -0.065em;
          font-weight: 800;
          color: #111111;
        }

        .location-heading span {
          display: block;
          background: linear-gradient(
            100deg,
            ${INDIGO} 0%,
            #6366f1 42%,
            ${AMBER} 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .location-description {
          max-width: 500px;
          margin: 30px 0 38px;
          font-family: var(--font-body, sans-serif);
          font-size: 15px;
          line-height: 1.8;
          color: #666666;
        }

        .contact-list {
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .contact-row {
          position: relative;
          display: grid;
          grid-template-columns: 34px 44px 1fr 24px;
          align-items: center;
          gap: 14px;
          min-height: 82px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          text-decoration: none;
          transition: all 300ms ease;
        }

        .contact-row:hover {
          padding-left: 7px;
        }

        .contact-number {
          font-family: var(--font-body, sans-serif);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #b1b1b1;
        }

        .contact-icon {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          color: ${INDIGO};
          background: rgba(79, 70, 229, 0.07);
          transition: all 300ms ease;
        }

        .contact-row:nth-child(2) .contact-icon {
          color: ${AMBER};
          background: rgba(245, 158, 11, 0.09);
        }

        .contact-row:hover .contact-icon {
          color: white;
          transform: rotate(-4deg) scale(1.08);
          background: linear-gradient(
            135deg,
            ${INDIGO},
            ${AMBER}
          );
        }

        .contact-copy {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }

        .contact-label {
          font-family: var(--font-body, sans-serif);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.17em;
          color: #999999;
        }

        .contact-value {
          font-family: var(--font-heading, sans-serif);
          font-size: 16px;
          font-weight: 650;
          color: #222222;
        }

        .contact-value small {
          display: block;
          margin-top: 3px;
          font-family: var(--font-body, sans-serif);
          font-size: 11px;
          font-weight: 400;
          color: #999999;
        }

        .contact-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #aaaaaa;
          transition: all 300ms ease;
        }

        .contact-row:hover .contact-arrow {
          color: ${INDIGO};
          transform: translateX(4px);
        }

        .location-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 22px;
          margin-top: 35px;
        }

        .whatsapp-button {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          min-height: 52px;
          padding: 0 19px;
          border-radius: 16px;
          color: white;
          background: #111111;
          text-decoration: none;
          font-family: var(--font-body, sans-serif);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.11em;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
          transition: all 300ms ease;
        }

        .whatsapp-button:hover {
          transform: translateY(-3px);
          background: linear-gradient(
            135deg,
            #111111,
            #242424
          );
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.17);
        }

        .whatsapp-button svg:last-child {
          transition: transform 300ms ease;
        }

        .whatsapp-button:hover svg:last-child {
          transform: translateX(4px);
        }

        .directions-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: #555555;
          text-decoration: none;
          font-family: var(--font-body, sans-serif);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          transition: color 300ms ease;
        }

        .directions-link:hover {
          color: ${INDIGO};
        }

        .directions-link svg {
          transition: transform 300ms ease;
        }

        .directions-link:hover svg {
          transform: translateX(4px);
        }

        .location-art {
          position: relative;
          width: 100%;
          max-width: 680px;
          justify-self: end;
        }

        .location-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 0.94;
          min-height: 500px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 36px;
          background:
            radial-gradient(
              circle at 30% 28%,
              ${INDIGO}10,
              transparent 34%
            ),
            radial-gradient(
              circle at 72% 72%,
              ${AMBER}12,
              transparent 36%
            ),
            rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(20px);
          box-shadow:
            0 35px 90px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .stage-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          filter: blur(50px);
          background: linear-gradient(
            135deg,
            ${INDIGO}22,
            ${AMBER}20
          );
        }

        .stage-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(79, 70, 229, 0.13);
        }

        .ring-large {
          width: 74%;
          aspect-ratio: 1;
        }

        .ring-medium {
          width: 53%;
          aspect-ratio: 1;
          border-color: rgba(245, 158, 11, 0.18);
        }

        .ring-small {
          width: 29%;
          aspect-ratio: 1;
          border-color: rgba(79, 70, 229, 0.18);
        }

        .stage-dashed-ring {
          position: absolute;
          width: 62%;
          aspect-ratio: 1;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border: 1px dashed rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          animation: rotateLocation 28s linear infinite;
        }

        .stage-line {
          position: absolute;
          background: rgba(0, 0, 0, 0.05);
        }

        .stage-line-horizontal {
          left: 8%;
          right: 8%;
          top: 50%;
          height: 1px;
        }

        .stage-line-vertical {
          top: 9%;
          bottom: 9%;
          left: 50%;
          width: 1px;
        }

        .location-pin {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 108px;
          height: 108px;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          box-shadow:
            0 20px 55px rgba(79, 70, 229, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          z-index: 5;
        }

        .pin-inner {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 24px;
          color: white;
          background: linear-gradient(
            135deg,
            ${INDIGO},
            #6366f1 50%,
            ${AMBER}
          );
          box-shadow: 0 15px 30px rgba(79, 70, 229, 0.2);
        }

        .stage-center-dot {
          position: absolute;
          left: calc(50% + 44%);
          top: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          transform: translateY(-50%);
          background: ${AMBER};
          box-shadow: 0 0 0 5px rgba(245, 158, 11, 0.1);
        }

        .floating-tag {
          position: absolute;
          z-index: 7;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px 15px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(18px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.07);
        }

        .floating-tag span {
          font-family: var(--font-body, sans-serif);
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #999999;
        }

        .floating-tag strong {
          font-family: var(--font-heading, sans-serif);
          font-size: 12px;
          font-weight: 750;
          color: #222222;
        }

        .tag-city {
          left: 7%;
          top: 16%;
          animation: floatLocation 6s ease-in-out infinite;
        }

        .tag-hours {
          right: 7%;
          top: 22%;
          animation: floatLocation 5s ease-in-out infinite reverse;
        }

        .tag-hours strong {
          color: ${AMBER};
        }

        .tag-type {
          left: 9%;
          bottom: 15%;
          animation: floatLocation 7s ease-in-out infinite;
        }

        .tag-type strong {
          color: ${INDIGO};
          font-size: 10px;
        }

        .stage-typography {
          position: absolute;
          right: 7%;
          bottom: 13%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          line-height: 0.82;
          opacity: 0.075;
          user-select: none;
        }

        .stage-typography span {
          font-family: var(--font-heading, sans-serif);
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 900;
          letter-spacing: -0.08em;
        }

        .stage-typography strong {
          font-family: var(--font-heading, sans-serif);
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 900;
          letter-spacing: -0.08em;
        }

        .art-label {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          z-index: 5;
          font-family: var(--font-body, sans-serif);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        .art-label-top {
          top: -25px;
          left: 5px;
          right: 5px;
          color: #999999;
        }

        .art-label-top strong {
          color: ${INDIGO};
        }

        .art-label-bottom {
          bottom: -25px;
          left: 5px;
          right: 5px;
          color: #aaaaaa;
        }

        .art-label-bottom strong {
          color: ${AMBER};
        }

        .art-footer {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 28px;
          padding: 0 5px;
          font-family: var(--font-body, sans-serif);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #a5a5a5;
        }

        .location-bottom {
          display: flex;
          align-items: center;
          gap: 22px;
          margin-top: 95px;
          font-family: var(--font-body, sans-serif);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.17em;
          color: #a0a0a0;
        }

        .bottom-line {
          height: 1px;
          flex: 1;
          background: linear-gradient(
            90deg,
            rgba(79, 70, 229, 0.25),
            rgba(245, 158, 11, 0.2),
            transparent
          );
        }

        .reveal-left,
        .reveal-right,
        .reveal-up,
        .reveal-scale {
          opacity: 0;
          transition:
            opacity 900ms ease,
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .reveal-left {
          transform: translateX(-45px);
        }

        .reveal-right {
          transform: translateX(45px);
        }

        .reveal-up {
          transform: translateY(30px);
        }

        .reveal-scale {
          transform: scale(0.94);
        }

        .reveal-left.visible,
        .reveal-right.visible,
        .reveal-up.visible,
        .reveal-scale.visible {
          opacity: 1;
          transform: translate(0) scale(1);
        }

        @keyframes floatLocation {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-9px);
          }
        }

        @keyframes rotateLocation {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @media (max-width: 1100px) {
          .location-layout {
            grid-template-columns: 1fr;
            gap: 80px;
          }

          .location-content {
            max-width: 760px;
          }

          .location-art {
            max-width: 720px;
            justify-self: center;
            width: 90%;
          }

          .location-heading {
            max-width: 760px;
          }
        }

        @media (max-width: 768px) {
          .location-section {
            padding: 85px 0 55px;
          }

          .location-top {
            margin-bottom: 50px;
          }

          .location-small-text {
            display: none;
          }

          .location-layout {
            gap: 60px;
          }

          .location-heading {
            font-size: clamp(3.2rem, 15vw, 5rem);
          }

          .location-description {
            font-size: 14px;
            margin: 25px 0 30px;
          }

          .location-stage {
            min-height: 420px;
            border-radius: 28px;
          }

          .location-pin {
            width: 88px;
            height: 88px;
          }

          .pin-inner {
            width: 58px;
            height: 58px;
            border-radius: 19px;
          }

          .tag-type {
            display: none;
          }

          .stage-typography {
            right: 5%;
          }

          .art-footer {
            margin-top: 23px;
          }

          .location-bottom {
            margin-top: 70px;
          }
        }

        @media (max-width: 520px) {
          .location-section {
            padding: 70px 0 45px;
          }

          .location-top {
            margin-bottom: 42px;
          }

          .location-heading {
            font-size: 3.35rem;
            line-height: 0.9;
          }

          .contact-row {
            grid-template-columns: 24px 38px 1fr 18px;
            gap: 10px;
            min-height: 76px;
          }

          .contact-icon {
            width: 34px;
            height: 34px;
            border-radius: 10px;
          }

          .contact-value {
            font-size: 14px;
          }

          .contact-label {
            font-size: 8px;
          }

          .contact-number {
            font-size: 8px;
          }

          .location-actions {
            align-items: stretch;
            flex-direction: column;
            gap: 17px;
          }

          .whatsapp-button {
            justify-content: space-between;
            width: 100%;
          }

          .directions-link {
            padding-left: 4px;
          }

          .location-art {
            width: 100%;
          }

          .location-stage {
            min-height: 350px;
            aspect-ratio: 1 / 1;
            border-radius: 24px;
          }

          .ring-large {
            width: 82%;
          }

          .ring-medium {
            width: 58%;
          }

          .stage-dashed-ring {
            width: 68%;
          }

          .floating-tag {
            padding: 9px 11px;
            border-radius: 12px;
          }

          .floating-tag strong {
            font-size: 10px;
          }

          .floating-tag span {
            font-size: 6px;
          }

          .tag-city {
            left: 5%;
            top: 12%;
          }

          .tag-hours {
            right: 5%;
            top: 15%;
          }

          .stage-typography {
            display: none;
          }

          .stage-center-dot {
            display: none;
          }

          .art-label-top {
            top: -21px;
          }

          .art-label-bottom {
            bottom: -21px;
          }

          .art-footer {
            font-size: 7px;
            gap: 8px;
          }

          .location-bottom {
            display: none;
          }

          .glow-indigo {
            width: 360px;
            height: 360px;
            left: -220px;
          }

          .glow-amber {
            width: 350px;
            height: 350px;
            right: -230px;
          }

          .reveal-left,
          .reveal-right,
          .reveal-up,
          .reveal-scale {
            transform: translateY(25px);
          }

          .reveal-left.visible,
          .reveal-right.visible,
          .reveal-up.visible,
          .reveal-scale.visible {
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-left,
          .reveal-right,
          .reveal-up,
          .reveal-scale {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .floating-tag,
          .stage-dashed-ring,
          .dot {
            animation: none !important;
          }
        }

        .dark .location-section {
          background: var(--color-bg-primary);
          color: var(--color-text-primary);
        }

        .dark .location-kicker,
        .dark .location-heading,
        .dark .contact-copy,
        .dark .contact-value,
        .dark .location-description,
        .dark .contact-label,
        .dark .art-label-top,
        .dark .art-label-bottom,
        .dark .art-footer,
        .dark .location-bottom {
          color: var(--color-text-secondary);
        }

        .dark .location-heading,
        .dark .contact-value,
        .dark .contact-copy {
          color: var(--color-text-primary);
        }

        .dark .location-small-text,
        .dark .contact-number,
        .dark .stage-typography span {
          color: var(--color-text-muted);
        }

        .dark .location-stage {
          border-color: var(--color-border-subtle);
          background:
            radial-gradient(circle at 30% 28%, ${INDIGO}18, transparent 34%),
            radial-gradient(circle at 72% 72%, ${AMBER}18, transparent 36%),
            var(--color-bg-card);
          box-shadow: var(--shadow-card);
        }

        .dark .orbit,
        .dark .stage-dashed-ring {
          border-color: var(--color-border-accent);
        }

        .dark .stage-line {
          background: var(--color-border-subtle);
        }

        .dark .location-pin,
        .dark .floating-tag {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--color-border-accent);
          color: var(--color-text-primary);
        }

        .dark .floating-tag strong,
        .dark .stage-typography strong {
          color: var(--color-text-primary);
        }

        .dark .cross::before,
        .dark .cross::after {
          background: var(--color-border-accent);
        }
      `}</style>
    </section>
  );
};

export default Location;