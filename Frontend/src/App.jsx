import { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import WhyAlex from './components/WhyAlex';
import Feedback from './components/Feedback';
import WhatsAppCTA from './components/WhatsAppCTA';
import Location from './components/Location';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Lightbox from './components/Lightbox';
import Background from './components/Background';
import Loader from './components/Loader';
import PurchaseDesigns from './pages/PurchaseDesigns';
import { portfolioData } from './data/portfolio';
import { servicesData } from './data/services';
import WelcomeScreen from './components/WelcomeScreen';
import { ThemeProvider } from './context/ThemeContext';



function StudioHome() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const navigateLightbox = useCallback((direction) => {
    setLightboxIndex((prev) => {
      const newIndex = prev + direction;

      if (newIndex < 0) {
        return portfolioData.length - 1;
      }

      if (newIndex >= portfolioData.length) {
        return 0;
      }

      return newIndex;
    });
  }, []);

  return (
    <div className="min-h-screen relative bg-transparent text-text-primary selection:bg-black/10 selection:text-text-primary">

      <Background />

      <Navbar />

      <main className="relative z-10">

        <Hero />

        <Services services={servicesData} />

        <Portfolio
          portfolio={portfolioData}
          onOpenLightbox={openLightbox}
        />

        <WhyAlex />

        <Location />

        <WhatsAppCTA />

        <Feedback />

        <Footer />

      </main>

      <FloatingWhatsApp />

      {lightboxOpen && (
        <Lightbox
          portfolio={portfolioData}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}

    </div>
  );
}


function AppContent() {
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);

      const hasSeenWelcome = localStorage.getItem(
        'alex-welcome-seen'
      );

      if (!hasSeenWelcome) {
        setShowWelcome(true);
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const pathname = window.location.pathname;

  if (loading) {
    return <Loader />;
  }

  if (pathname === '/purchase-designs') {
    return <PurchaseDesigns />;
  }

  if (showWelcome) {
    return (
      <WelcomeScreen
        onComplete={() => setShowWelcome(false)}
      />
    );
  }

  return <StudioHome />;
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;