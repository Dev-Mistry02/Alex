import React from 'react';

const Background = () => {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-white" />

      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `
            radial-gradient(
              circle at 8% 8%,
              rgba(79, 70, 229, 0.11) 0%,
              transparent 34%
            ),

            radial-gradient(
              circle at 92% 18%,
              rgba(245, 158, 11, 0.09) 0%,
              transparent 32%
            ),

            radial-gradient(
              circle at 12% 82%,
              rgba(79, 70, 229, 0.07) 0%,
              transparent 35%
            ),

            radial-gradient(
              circle at 88% 90%,
              rgba(245, 158, 11, 0.07) 0%,
              transparent 38%
            ),

            radial-gradient(
              circle at 50% 50%,
              rgba(79, 70, 229, 0.025) 0%,
              transparent 55%
            )
          `,
        }}
      />

      <div
        className="
          absolute
          -top-[15%]
          -left-[12%]
          w-[55vw]
          h-[55vw]
          max-w-[700px]
          max-h-[700px]
          rounded-full
          bg-gradient-to-br
          from-indigo-500/20
          via-indigo-400/10
          to-transparent
          blur-[120px]
          animate-orb-1
        "
      />

      <div
        className="
          absolute
          top-[20%]
          -right-[15%]
          w-[50vw]
          h-[50vw]
          max-w-[650px]
          max-h-[650px]
          rounded-full
          bg-gradient-to-bl
          from-amber-400/16
          via-amber-300/8
          to-transparent
          blur-[125px]
          animate-orb-2
        "
      />

      <div
        className="
          absolute
          top-[62%]
          left-[-5%]
          w-[45vw]
          h-[45vw]
          max-w-[600px]
          max-h-[600px]
          rounded-full
          bg-gradient-to-tr
          from-indigo-500/14
          via-indigo-400/7
          to-transparent
          blur-[120px]
          animate-orb-3
        "
      />

      <div
        className="
          absolute
          -bottom-[15%]
          right-[8%]
          w-[50vw]
          h-[50vw]
          max-w-[650px]
          max-h-[650px]
          rounded-full
          bg-gradient-to-tl
          from-amber-400/12
          via-indigo-400/7
          to-transparent
          blur-[135px]
          animate-orb-1
        "
      />

      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(
              circle at 50% 0%,
              rgba(255,255,255,0.95) 0%,
              transparent 45%
            ),

            radial-gradient(
              circle at 50% 100%,
              rgba(0,0,0,0.025) 0%,
              transparent 45%
            )
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.018] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(
            circle_at_center,
            transparent_45%,
            rgba(0,0,0,0.055)_100%
          )]
          opacity-40
        "
      />

      <style>{`
        @keyframes orb-float-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }

          33% {
            transform: translate(40px, -55px) scale(1.08);
          }

          66% {
            transform: translate(-30px, 30px) scale(0.95);
          }
        }

        @keyframes orb-float-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }

          33% {
            transform: translate(-50px, 40px) scale(1.07);
          }

          66% {
            transform: translate(35px, -35px) scale(0.94);
          }
        }

        @keyframes orb-float-3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }

          50% {
            transform: translate(30px, 45px) scale(1.06);
          }
        }

        .animate-orb-1 {
          animation: orb-float-1 28s ease-in-out infinite;
          will-change: transform;
        }

        .animate-orb-2 {
          animation: orb-float-2 34s ease-in-out infinite;
          will-change: transform;
        }

        .animate-orb-3 {
          animation: orb-float-3 30s ease-in-out infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-orb-1,
          .animate-orb-2,
          .animate-orb-3 {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Background;