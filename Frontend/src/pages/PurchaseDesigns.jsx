import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../components/Footer';
import designs from '../data/Purchasedesign';
import { useTheme } from '../context/ThemeContext';

const WHATSAPP = '919356047231';

const categories = ['All', 'Business', 'Social Media', 'Print'];

const whatsappMessage = (design) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Hi ALEX Graphic Design Studio, I'm interested in purchasing "${design.title}" for ₹${design.price}. Please share the details.`
  )}`;

const customDesignUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  "Hi ALEX Graphic Design Studio, I'd like to discuss a custom design."
)}`;

function ThemeIcon({ isDark }) {
  return isDark ? (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
    </svg>
  );
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['/', 'Home'],
    ['/#services', 'Services'],
    ['/#portfolio', 'Our Work'],
    ['/#why-alex', 'Why Alex'],
    ['/#contact', 'Contact'],
  ];

  return (
    <header className="fixed top-3 sm:top-4 md:top-5 left-0 right-0 z-50 px-3 sm:px-5 lg:px-6 pointer-events-none">
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`pointer-events-auto relative mx-auto w-full max-w-[1180px] rounded-[22px] sm:rounded-full border px-2.5 sm:px-3 md:px-4 py-2 transition-all duration-500 ${scrolled
          ? 'bg-white/[0.92] backdrop-blur-[30px] border-black/[0.10] shadow-[0_18px_45px_-12px_rgba(0,0,0,0.18)]'
          : 'bg-white/[0.80] backdrop-blur-[26px] border-black/[0.07] shadow-[0_14px_38px_-10px_rgba(0,0,0,0.12)]'
          }`}
      >
        {/* ================= DESKTOP / TABLET NAV ================= */}
        <div className="hidden md:grid md:grid-cols-[minmax(150px,1fr)_auto_minmax(150px,1fr)] md:items-center md:min-h-[42px]">

          {/* Logo */}
          <a
            href="/"
            className="justify-self-start flex items-center min-w-0 pl-1 sm:pl-2"
          >
            <img
              src="/icon.png"
              alt="ALEX Graphic Design Studio"
              className="h-8 sm:h-9 md:h-10 w-auto max-w-[150px] object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.14)]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </a>

          {/* Center Navigation */}
          <nav className="justify-self-center flex items-center gap-0.5 lg:gap-1">
            {links.map(([href, label]) => (
              <a
                key={label}
                href={href}
                className="
              whitespace-nowrap
              px-2.5 lg:px-3.5
              py-2
              rounded-full
              text-[12px] lg:text-sm
              font-medium
              text-gray-600
              hover:text-black
              hover:bg-black/[0.055]
              border border-transparent
              hover:border-black/[0.08]
              transition-all duration-200
            "
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Purchase CTA */}
          <div className="justify-self-end flex items-center">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-pressed={isDark}
              className="mr-2 flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.10] bg-black/[0.04] text-current outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-500/70 dark:border-white/10 dark:bg-white/10"
            >
              <ThemeIcon isDark={isDark} />
            </button>
            <a
              href="/purchase-designs"
              className="
            group
            relative
            overflow-hidden
            flex
            items-center
            gap-1.5
            lg:gap-2
            rounded-full
            bg-black
            text-white
            px-3
            lg:px-4
            py-2
            text-[12px]
            lg:text-sm
            font-semibold
            whitespace-nowrap
            shadow-[0_7px_20px_rgba(0,0,0,0.18)]
            hover:bg-neutral-800
            hover:-translate-y-0.5
            transition-all
          "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] animate-pulse shrink-0" />

              <span>Purchase Designs</span>

              <span
                className="
              absolute
              inset-y-0
              -left-12
              w-8
              rotate-12
              bg-white/20
              blur-sm
              transition-transform
              duration-700
              group-hover:translate-x-[180px]
            "
              />
            </a>
          </div>
        </div>

        {/* ================= MOBILE NAV ================= */}
        <div className="md:hidden flex items-center justify-between min-h-[40px]">

          {/* Mobile Logo */}
          <a
            href="/"
            className="flex items-center min-w-0 pl-1"
          >
            <img
              src="/icon.png"
              alt="ALEX Graphic Design Studio"
              className="h-8 sm:h-9 w-auto max-w-[145px] object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.14)]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </a>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-pressed={isDark}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.10] bg-black/[0.04] text-current outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-500/70 dark:border-white/10 dark:bg-white/10"
            >
              <ThemeIcon isDark={isDark} />
            </button>

            {/* Small Purchase Button */}
            <a
              href="/purchase-designs"
              className="
            hidden
            xs:flex
            items-center
            gap-1.5
            rounded-full
            bg-black
            text-white
            px-3
            py-2
            text-[11px]
            sm:text-xs
            font-semibold
            whitespace-nowrap
            shadow-[0_6px_18px_rgba(0,0,0,0.16)]
            active:scale-95
            transition-all
          "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] animate-pulse" />
              <span className="hidden sm:inline">
                Purchase Designs
              </span>
              <span className="sm:hidden">
                Designs
              </span>
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="
            flex
            shrink-0
            items-center
            justify-center
            w-10
            h-10
            rounded-full
            bg-black/[0.05]
            hover:bg-black/[0.10]
            border
            border-black/[0.10]
            transition-all
            active:scale-95
          "
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ================= MOBILE DROPDOWN ================= */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -8,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -8,
                scale: 0.98,
              }}
              transition={{
                duration: 0.2,
                ease: 'easeOut',
              }}
              className="
            md:hidden
            mt-2.5
            rounded-[22px]
            border
            border-black/[0.08]
            bg-white/[0.95]
            backdrop-blur-[30px]
            p-2
            shadow-[0_20px_45px_rgba(0,0,0,0.14)]
          "
            >
              <nav className="flex flex-col gap-1">

                {links.map(([href, label]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="
                  flex
                  items-center
                  justify-between
                  rounded-[16px]
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-gray-700
                  hover:bg-black/[0.05]
                  hover:text-black
                  active:scale-[0.99]
                  transition-all
                "
                  >
                    <span>{label}</span>

                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-30"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </a>
                ))}

                {/* Mobile Purchase CTA */}
                <a
                  href="/purchase-designs"
                  onClick={() => setMobileOpen(false)}
                  className="
                mt-1
                flex
                items-center
                justify-center
                gap-2
                rounded-[16px]
                bg-black
                text-white
                px-4
                py-3
                text-sm
                font-semibold
                shadow-[0_8px_20px_rgba(0,0,0,0.16)]
                active:scale-[0.98]
                transition-all
              "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  Purchase Designs
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

const DesignCard = ({ design, index, onPreview }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.18) }}
    className="purchase-card group h-full rounded-[28px] border border-black/[0.08] bg-white overflow-hidden shadow-[0_12px_35px_-18px_rgba(0,0,0,0.28)] hover:shadow-[0_22px_45px_-18px_rgba(0,0,0,0.30)] transition-all duration-500"
  >
    <button
      type="button"
      onClick={() => onPreview(design)}
      className="block w-full text-left"
      aria-label={`Preview ${design.title}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <img
          src={design.image}
          alt={design.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          loading={index < 6 ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="purchase-card-badge absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md border border-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-black shadow-sm">
          {design.category}
        </div>
        <div className="purchase-card-preview absolute right-4 bottom-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-2 text-xs font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Preview
        </div>
      </div>
    </button>

    <div className="p-5 sm:p-6 flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-black">{design.title}</h3>
          {design.description && (
            <p className="mt-2 text-sm leading-6 text-gray-500 line-clamp-2">
              {design.description}
            </p>
          )}
        </div>
        <span className="shrink-0 text-lg font-extrabold text-black">
          ₹{design.price}
        </span>
      </div>

      <a
        href={whatsappMessage(design)}
        target="_blank"
        rel="noopener noreferrer"
        className="purchase-card-cta mt-5 flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800 active:scale-[0.98] transition-all"
      >
        Purchase on WhatsApp
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </a>
    </div>
  </motion.article>
);

const PurchaseDesigns = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [preview, setPreview] = useState(null);

  const filteredDesigns = useMemo(() => {
    if (activeCategory === 'All') return designs;
    return designs.filter((design) => design.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    document.title = 'Purchase Designs | ALEX Graphic Design Studio';
    document.body.style.background = 'var(--color-bg-primary)';

    if (preview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [preview]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setPreview(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="purchase-page min-h-screen bg-bg-primary text-text-primary overflow-x-hidden">
      <Navbar />

      <main>
        <section className="purchase-hero relative min-h-[760px] sm:min-h-[820px] lg:min-h-[900px] flex items-center overflow-hidden px-5 sm:px-8 pt-28 pb-16">
          <div className="absolute inset-0 bg-white" />

          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
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
                background: 'radial-gradient(circle, #4F46E555 0%, transparent 68%)',
              }}
            />

            <div
              className="absolute -bottom-56 -right-48 w-[700px] h-[700px] rounded-full blur-3xl opacity-20"
              style={{
                background: 'radial-gradient(circle, #F59E0B45 0%, transparent 68%)',
              }}
            />

            <div
              className="absolute top-1/2 left-1/2 w-[620px] h-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-[0.08]"
              style={{ borderColor: '#4F46E5' }}
            />

            <div
              className="absolute top-1/2 left-1/2 w-[460px] h-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-[0.07]"
              style={{ borderColor: '#F59E0B' }}
            />

            <div
              className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed opacity-[0.1]"
              style={{ borderColor: '#4F46E5' }}
            />

            <div
              className="absolute top-[18%] left-[8%] w-28 h-28 rotate-45 border opacity-[0.1]"
              style={{ borderColor: '#4F46E5' }}
            />

            <div
              className="absolute bottom-[15%] right-[8%] w-32 h-32 rotate-12 border opacity-[0.1]"
              style={{ borderColor: '#F59E0B' }}
            />

            <div
              className="absolute top-[22%] right-[14%] w-3 h-3 rounded-full"
              style={{ backgroundColor: '#4F46E5', opacity: 0.35 }}
            />

            <div
              className="absolute bottom-[24%] left-[15%] w-2 h-2 rounded-full"
              style={{ backgroundColor: '#F59E0B', opacity: 0.4 }}
            />

            <div
              className="absolute top-[35%] left-[6%] w-20 h-px opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent, #4F46E5)',
              }}
            />

            <div
              className="absolute top-[38%] left-[6%] w-12 h-px opacity-20"
              style={{
                background: 'linear-gradient(90deg, transparent, #4F46E5)',
              }}
            />

            <div
              className="absolute bottom-[32%] right-[6%] w-20 h-px opacity-30"
              style={{
                background: 'linear-gradient(90deg, #F59E0B, transparent)',
              }}
            />

            <div
              className="absolute top-16 right-1/4 w-24 h-24 rounded-full border border-dashed opacity-[0.08] animate-[spin_25s_linear_infinite]"
              style={{ borderColor: '#4F46E5' }}
            />

            <div
              className="absolute bottom-12 left-1/4 w-16 h-16 rounded-full border opacity-[0.08]"
              style={{ borderColor: '#F59E0B' }}
            />

            <div
              className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-20 opacity-20"
              style={{
                background: 'linear-gradient(to bottom, transparent, #4F46E5)',
              }}
            />

            <div
              className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-20 opacity-20"
              style={{
                background: 'linear-gradient(to top, transparent, #F59E0B)',
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
              style={{ backgroundColor: '#4F46E5', opacity: 0.3 }}
            />

            <div
              className="absolute bottom-[18%] right-[42%] w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: '#F59E0B', opacity: 0.3 }}
            />

            <div
              className="absolute top-1/2 left-8 sm:left-12 w-5 h-5"
              style={{ opacity: 0.18 }}
            >
              <span
                className="absolute top-1/2 left-0 w-5 h-px"
                style={{ backgroundColor: '#4F46E5' }}
              />
              <span
                className="absolute top-0 left-1/2 h-5 w-px"
                style={{ backgroundColor: '#4F46E5' }}
              />
            </div>

            <div
              className="absolute top-1/2 right-8 sm:right-12 w-5 h-5"
              style={{ opacity: 0.18 }}
            >
              <span
                className="absolute top-1/2 left-0 w-5 h-px"
                style={{ backgroundColor: '#F59E0B' }}
              />
              <span
                className="absolute top-0 left-1/2 h-5 w-px"
                style={{ backgroundColor: '#F59E0B' }}
              />
            </div>

            <div className="absolute left-1/2 top-[13%] -translate-x-1/2 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.34em] text-black/20 whitespace-nowrap">
              ALEX / GRAPHIC DESIGN / VISUAL STUDIO
            </div>

            <div className="absolute left-1/2 bottom-[7%] -translate-x-1/2 hidden sm:flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-300">
              <span>IDEA</span>
              <span className="h-px w-12 bg-black/10" />
              <span>DESIGN</span>
              <span className="h-px w-12 bg-black/10" />
              <span>IMPACT</span>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/75 backdrop-blur-xl px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-600 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            >
              <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
              Graphic Design • Printing • Video Editing
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="mt-7 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#4F46E5]"
            >
              ALEX Graphic Design Studio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 font-black tracking-[-0.065em] leading-[0.86] text-[clamp(3.5rem,8.5vw,5.6rem)]"
            >
              <span className="text-black">GOOD DESIGN.</span>
              <br />
              <span
                className="bg-gradient-to-r from-[#4F46E5] via-[#6256D8] to-[#A97878] bg-clip-text text-transparent"
              >
                READY TO GO.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-7 max-w-2xl text-base sm:text-lg leading-7 text-gray-600"
            >
              Choose from ready-to-use designs created by ALEX. Preview your
              favorite, then purchase it directly through WhatsApp.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <a
                href="#designs"
                className="purchase-primary-cta group inline-flex items-center justify-center gap-3 rounded-full bg-[#111111] text-white px-7 py-3.5 text-sm font-semibold shadow-[0_14px_30px_rgba(0,0,0,0.18)] hover:bg-neutral-800 hover:-translate-y-0.5 transition-all"
              >
                Explore Designs
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black group-hover:translate-y-0.5 transition-transform">
                  ↓
                </span>
              </a>

              <a
                href={customDesignUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="purchase-secondary-cta inline-flex items-center justify-center rounded-full border border-black/[0.10] bg-white/70 backdrop-blur-md px-7 py-3.5 text-sm font-semibold text-black hover:bg-white hover:-translate-y-0.5 transition-all"
              >
                Need Custom Design?
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="mx-auto mt-12 flex w-full max-w-2xl items-center justify-center gap-0"
            >
              {[
                ['01', 'CHOOSE', '#4F46E5'],
                ['02', 'PREVIEW', '#F59E0B'],
                ['03', 'WHATSAPP', '#a56666'],
              ].map(([number, label, color], index) => (
                <React.Fragment key={number}>
                  {index > 0 && (
                    <span className="h-px w-12 sm:w-20 bg-black/[0.10]" />
                  )}
                  <div className="flex items-center gap-2 rounded-full bg-white/55 px-3 py-2 backdrop-blur-sm">
                    <span
                      className="text-sm font-black"
                      style={{ color }}
                    >
                      {number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                      {label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </section>

        <section
          id="designs"
          className="px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32"
        >
          <div className="mx-auto max-w-7xl">

            <div className="relative mb-12 sm:mb-16">

              <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end">


                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-px w-8 bg-[#4F46E5]" />

                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#4F46E5]">
                      The Collection
                    </p>
                  </div>

                  <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[86px] font-black tracking-[-0.065em] leading-[0.86] text-[#111111]">
                    READY-MADE
                    <br />

                    <span className="bg-gradient-to-r from-[#4F46E5] via-[#6256D8] to-[#A97878] bg-clip-text text-transparent">
                      DESIGNS.
                    </span>
                  </h2>

                  <p className="mt-6 max-w-xl text-sm sm:text-base text-gray-500 leading-relaxed">
                    Professionally crafted designs made to help your brand stand out.
                    Pick a design, preview it and connect with us directly.
                  </p>
                </div>

                {/* Collection Index */}
                <div className="hidden lg:block pb-1">
                  <div className="text-right">
                    <span className="block text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                      ALEX / STUDIO
                    </span>

                    <span className="block mt-2 text-sm font-medium text-gray-400">
                      01 — COLLECTION
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-10 sm:mt-12 border-t border-black/[0.08]">
                <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 pt-4">
                  {categories.map((category, index) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`purchase-category-button
                relative pb-2
                text-[11px] sm:text-xs
                font-bold
                uppercase
                tracking-[0.14em]
                transition-colors
                duration-300
                ${activeCategory === category
                          ? 'text-[#111111]'
                          : 'text-gray-400 hover:text-[#111111]'
                        }
              `}
                    >
                      <span className="mr-2 text-[9px] text-gray-300">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {category}

                      {activeCategory === category && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4F46E5]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {filteredDesigns.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 sm:gap-x-6 gap-y-10 sm:gap-y-12">

                {filteredDesigns.map((design, index) => (
                  <div
                    key={design.id ?? `${design.title}-${index}`}
                    className="group"
                  >
                    <DesignCard
                      design={design}
                      index={index}
                      onPreview={setPreview}
                    />
                  </div>
                ))}

              </div>
            ) : (
              <div className="border-t border-b border-black/[0.08] py-16 sm:py-20 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-black/[0.08] bg-white">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>
                </div>

                <p className="mt-5 font-heading text-lg sm:text-xl font-bold text-[#111111]">
                  No designs found
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Try another category to explore the collection.
                </p>

                <button
                  type="button"
                  onClick={() => setActiveCategory('All')}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  View All Designs

                  <svg
                    width="16"
                    height="16"
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
                </button>
              </div>
            )}


            {filteredDesigns.length > 0 && (
              <div className="mt-12 sm:mt-16 pt-5 border-t border-black/[0.08] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-gray-400">
                  {filteredDesigns.length} designs available
                </p>

                <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-gray-400">
                  Choose • Preview • Connect
                </p>
              </div>
            )}

          </div>
        </section>

        <section className="px-5 sm:px-8 pb-24 sm:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="purchase-custom-section relative overflow-hidden rounded-[36px] bg-black text-white p-8 sm:p-12 lg:p-16">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#4F46E5]/30 blur-[80px]" />
              <div className="absolute -left-20 -bottom-24 h-72 w-72 rounded-full bg-[#F59E0B]/20 blur-[80px]" />
              <div className="relative max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                  Need something different?
                </p>
                <h2 className="mt-4 text-5xl sm:text-7xl font-black tracking-[-0.06em] leading-[0.88]">
                  LET&apos;S MAKE
                  <br />
                  <span className="text-[#4F46E5]">SOMETHING</span>
                  <br />
                  <span className="text-[#F59E0B]">YOURS.</span>
                </h2>
                <p className="mt-7 max-w-xl text-white/65 text-base sm:text-lg leading-7">
                  Want a design made specifically for your brand? Tell us what you
                  need and we&apos;ll take it from there.
                </p>
                <a
                  href={customDesignUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="purchase-custom-cta mt-8 inline-flex items-center gap-3 rounded-full bg-white text-black px-6 py-3.5 text-sm font-bold hover:bg-white/90 transition-all"
                >
                  Start a Custom Design
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>



      <motion.a
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
          "Hi ALEX Graphic Design Studio, I'd like to know more about your designs."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_14px_30px_rgba(37,211,102,0.35)] border-4 border-white"
        aria-label="Chat on WhatsApp"
      >
        <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.53 0 .2 5.33.2 11.88c0 2.09.55 4.13 1.59 5.93L.1 24l6.33-1.66a11.86 11.86 0 0 0 5.65 1.43h.01c6.54 0 11.87-5.33 11.87-11.88 0-3.17-1.23-6.15-3.44-8.41ZM12.09 21.8h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.76.99 1-3.67-.23-.38a9.9 9.9 0 0 1-1.51-5.27C2.17 6.4 6.61 1.96 12.08 1.96c2.65 0 5.14 1.03 7.01 2.9a9.86 9.86 0 0 1 2.9 7.03c0 5.47-4.44 9.91-9.9 9.91Zm5.43-7.42c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.78-1.66-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.68-1.64-.93-2.24-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.07-.81.38-.28.3-1.06 1.04-1.06 2.54s1.09 2.95 1.24 3.15c.15.2 2.15 3.28 5.21 4.6.73.32 1.3.51 1.74.65.73.23 1.4.2 1.93.12.59-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.12-.28-.2-.58-.35Z" />
        </svg>
      </motion.a>

      <Footer />

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="purchase-preview-modal relative w-full max-w-6xl max-h-[92vh] overflow-auto rounded-[30px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
            >
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="purchase-preview-close absolute right-4 top-4 z-10 h-10 w-10 rounded-full bg-white/90 backdrop-blur border border-black/[0.08] flex items-center justify-center text-black shadow-sm"
                aria-label="Close preview"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
                <div className="purchase-preview-image bg-neutral-100 min-h-[300px] lg:min-h-[620px] flex items-center justify-center">
                  <img
                    src={preview.image}
                    alt={preview.title}
                    className="w-full h-full max-h-[78vh] object-contain"
                  />
                </div>

                <div className="purchase-preview-details p-7 sm:p-10 lg:p-12 flex flex-col">
                  <span className="w-fit rounded-full bg-black text-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em]">
                    {preview.category}
                  </span>

                  <h3 className="mt-6 text-4xl sm:text-5xl font-black tracking-[-0.05em] leading-none">
                    {preview.title}
                  </h3>

                  {preview.description && (
                    <p className="mt-5 text-gray-600 leading-7">
                      {preview.description}
                    </p>
                  )}

                  <div className="mt-8 pt-6 border-t border-black/[0.08]">
                    <p className="text-xs uppercase tracking-[0.16em] font-bold text-gray-400">
                      Price
                    </p>
                    <p className="mt-1 text-3xl font-black">₹{preview.price}</p>
                  </div>

                  <a
                    href={whatsappMessage(preview)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="purchase-preview-cta mt-8 flex items-center justify-center gap-2 rounded-full bg-black text-white px-6 py-4 font-semibold hover:bg-neutral-800 transition-all"
                  >
                    Purchase on WhatsApp
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </a>

                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="purchase-preview-cancel mt-3 rounded-full border border-black/[0.10] px-6 py-3.5 text-sm font-semibold text-gray-700 hover:text-black hover:border-black/[0.20] transition-all"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchaseDesigns;
