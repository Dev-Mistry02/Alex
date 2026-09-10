import { useEffect, useState } from 'react';

const WelcomeScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const enterSite = () => {
    localStorage.setItem('alex-welcome-seen', 'true');

    setVisible(false);

    setTimeout(() => {
      onComplete();
    }, 500);
  };

  if (!visible) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white pointer-events-none animate-welcome-out" />
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white">

      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-[#4F46E5]/10 blur-[120px]" />

      <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] rounded-full bg-[#F59E0B]/10 blur-[120px]" />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #111 1px, transparent 1px),
            linear-gradient(#111 1px, transparent 1px)
          `,
          backgroundSize: '70px 70px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">

        <div className="mb-8 animate-welcome-scale">
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[28px] rotate-45 flex items-center justify-center shadow-[0_25px_70px_rgba(79,70,229,0.18)]"
            style={{
              background:
                'linear-gradient(135deg, #4F46E5, #F59E0B)',
            }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90" />
          </div>
        </div>

        <div className="animate-welcome-up">
          <p className="font-body text-[10px] sm:text-xs tracking-[0.4em] text-gray-400 mb-3">
            WELCOME TO
          </p>

          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-[#111111]">
            ALEX
          </h1>

          <div
            className="mt-2 text-lg sm:text-xl font-heading font-semibold bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #4F46E5, #F59E0B)',
            }}
          >
            Graphic Design Studio
          </div>
        </div>

        <p className="mt-6 max-w-md font-body text-sm sm:text-base leading-relaxed text-gray-500 animate-welcome-up animation-delay-200">
          Creative design, professional printing & video editing —
          bringing your ideas to life.
        </p>

        <button
          type="button"
          onClick={enterSite}
          className="group mt-9 inline-flex items-center gap-3 rounded-full px-7 py-4 bg-[#111111] text-white font-heading font-semibold text-sm shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-300 animate-welcome-up animation-delay-400"
        >
          <span>EXPLORE STUDIO</span>

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
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </button>

        <div className="mt-8 flex items-center gap-2 animate-welcome-up animation-delay-600">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
          <span className="font-body text-[9px] tracking-[0.25em] text-gray-400">
            DESIGN • PRINT • CREATE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
        </div>

      </div>

      <style>{`
        @keyframes welcome-scale {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(45deg);
          }

          100% {
            opacity: 1;
            transform: scale(1) rotate(45deg);
          }
        }

        @keyframes welcome-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes welcome-out {
          0% {
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }

        .animate-welcome-scale {
          animation: welcome-scale 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-welcome-up {
          opacity: 0;
          animation: welcome-up 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animate-welcome-out {
          animation: welcome-out 500ms ease forwards;
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;