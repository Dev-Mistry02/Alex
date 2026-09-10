import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { href: '#', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Our Work' },
  { href: '#why-alex', label: 'Why Alex' },
  { href: '#contact', label: 'Contact' },
];

const PURCHASE_URL = '/purchase-designs';

const WHATSAPP_URL =
  'https://wa.me/919356047231?text=Hi%20ALEX%20Graphic%20Design%20Studio%2C%20I%27m%20interested%20in%20your%20services.%20I%27d%20like%20to%20know%20more%20about%20your%20pricing%20and%20services.';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const { isDark: darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      const sections = [
        ['contact', 'Contact'],
        ['why-alex', 'Why Alex'],
        ['portfolio', 'Our Work'],
        ['services', 'Services'],
      ];

      const currentSection = sections.find(([id]) => {
        const element = document.getElementById(id);
        return element && scrollPosition >= element.offsetTop;
      });

      setActiveSection(currentSection?.[1] || 'Home');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (href, label) => {
    setActiveSection(label);
    setMobileMenuOpen(false);

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 82,
      behavior: 'smooth',
    });
  };

  const handleNavClick = (event, link) => {
    event.preventDefault();

    if (link.label === 'Contact') {
      const contact = document.getElementById('contact') ||
        document.getElementById('whatsapp-cta');

      setActiveSection('Contact');
      setMobileMenuOpen(false);

      if (contact) {
        window.scrollTo({
          top: contact.getBoundingClientRect().top + window.scrollY - 82,
          behavior: 'smooth',
        });
      } else {
        window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
      }

      return;
    }

    scrollToSection(link.href, link.label);
  };

  const glassNavbar = darkMode
    ? 'bg-neutral-950/65 border-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.48),inset_0_1px_1px_rgba(255,255,255,0.08)]'
    : 'bg-white/75 border-black/[0.08] shadow-[0_18px_45px_-12px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.9)]';

  const glassMenu = darkMode
    ? 'bg-neutral-950/85 border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)]'
    : 'bg-white/90 border-black/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.15)]';

  const mutedText = darkMode
    ? 'text-white/65 hover:text-white'
    : 'text-gray-600 hover:text-black';

  return (
    <header className="fixed top-3.5 sm:top-4 md:top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <motion.div
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className={`pointer-events-auto relative w-full max-w-[1200px] rounded-full border backdrop-blur-2xl saturate-150 transition-[background,border,box-shadow] duration-500 ${glassNavbar}`}
      >
        <div className="flex min-h-[54px] items-center px-3 sm:px-4">
          <button
            type="button"
            onClick={() => scrollToSection('#', 'Home')}
            className="relative z-10 flex shrink-0 items-center pl-1 sm:pl-2 md:ml-2 lg:ml-4 outline-none"
            aria-label="ALEX Graphic Design Studio Home"
          >
            <img
              src="/icon.png"
              alt="ALEX Studio"
              className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
            />
          </button>

          <nav
            className="hidden md:flex flex-1 items-center justify-center gap-1.5 px-6"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const active = activeSection === link.label;

              return (
                <button
                  type="button"
                  key={link.label}
                  onClick={(event) => handleNavClick(event, link)}
                  className={`relative rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-300 outline-none ${
                    active
                      ? darkMode
                        ? 'text-white font-semibold'
                        : 'text-black font-semibold'
                      : mutedText
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeNavPill"
                      className={`absolute inset-0 rounded-full border ${
                        darkMode
                          ? 'bg-white/10 border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]'
                          : 'bg-black/[0.055] border-black/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]'
                      }`}
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2 shrink-0 mr-2 lg:mr-4">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 ${
                darkMode
                  ? 'bg-white/10 border-white/10 text-white hover:bg-white/15'
                  : 'bg-black/[0.045] border-black/[0.08] text-black hover:bg-black/[0.08]'
              }`}
              aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-pressed={darkMode}
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={darkMode ? 'sun' : 'moon'}
                  initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                >
                  {darkMode ? <SunIcon /> : <MoonIcon />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <motion.a
              href={PURCHASE_URL}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className={`relative flex items-center justify-center gap-2 overflow-hidden rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-[0_7px_20px_rgba(0,0,0,0.2)] ${
                darkMode
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-black text-white hover:bg-neutral-800'
              }`}
            >
              <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-[#25D366] shadow-[0_0_8px_rgba(37,211,102,0.85)]" />
              <span className="relative z-10">Purchase Designs</span>

              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover:left-[120%]" />
            </motion.a>
          </div>

          <div className="ml-auto flex items-center gap-2 md:hidden">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 ${
                darkMode
                  ? 'bg-white/10 border-white/10 text-white'
                  : 'bg-black/[0.045] border-black/[0.08] text-black'
              }`}
              aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-pressed={darkMode}
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                darkMode
                  ? 'bg-white/10 border-white/10 text-white'
                  : 'bg-black/[0.045] border-black/[0.08] text-black'
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <MenuIcon open={mobileMenuOpen} />
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`absolute left-0 right-0 top-[calc(100%+10px)] flex flex-col gap-1.5 rounded-3xl border p-3 backdrop-blur-2xl saturate-150 md:hidden ${glassMenu}`}
            >
              {navLinks.map((link) => {
                const active = activeSection === link.label;

                return (
                  <button
                    type="button"
                    key={link.label}
                    onClick={(event) => handleNavClick(event, link)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                      active
                        ? darkMode
                          ? 'bg-white/10 text-white border border-white/10'
                          : 'bg-black/[0.07] text-black border border-black/[0.08]'
                        : darkMode
                          ? 'text-white/65 hover:bg-white/[0.06] hover:text-white'
                          : 'text-gray-600 hover:bg-black/[0.04] hover:text-black'
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                  </button>
                );
              })}

              <div className={`my-1 h-px ${darkMode ? 'bg-white/10' : 'bg-black/[0.08]'}`} />

              <a
                href={PURCHASE_URL}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold ${
                  darkMode ? 'bg-white text-black' : 'bg-black text-white'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                Purchase Designs
                <ArrowIcon />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium ${
                  darkMode
                    ? 'bg-white/[0.08] text-white hover:bg-white/[0.12]'
                    : 'bg-black/[0.05] text-black hover:bg-black/[0.08]'
                }`}
              >
                Chat on WhatsApp
                <ArrowIcon />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Navbar;
  