'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function PhilosophySection() {
  const reducedMotion = useReducedMotion();

  const sectionRef = useScrollAnimation<HTMLElement>((el, gsapInstance) => {
    if (reducedMotion) return;

    const lines = el.querySelectorAll('.philosophy-line');
    const goldLine = el.querySelector('.philosophy-gold-line');

    gsapInstance.fromTo(
      lines,
      { x: (i: number) => (i % 2 === 0 ? -60 : 60), opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          once: true,
        },
      }
    );

    if (goldLine) {
      gsapInstance.fromTo(
        goldLine,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }
  }, [reducedMotion]);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-32 px-6 bg-obsidian overflow-hidden"
    >
      {/* Ambient drift glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
          animation: 'drift 18s ease-in-out infinite alternate',
          top: '50%',
          left: '10%',
          transform: 'translateY(-50%)',
        }}
        aria-hidden="true"
      />

      <style>{`
        @keyframes drift {
          from { transform: translateY(-50%) translateX(0); }
          to { transform: translateY(-50%) translateX(80px); }
        }
      `}</style>

      <div className="max-w-4xl mx-auto flex gap-12">
        {/* Vertical gold line with dot */}
        <div className="flex flex-col items-center pt-2 flex-shrink-0">
          <div
            className="philosophy-gold-line w-[2px] h-20 bg-gold"
            style={{ transform: 'scaleY(0)', transformOrigin: 'top center' }}
          />
          <div className="w-2 h-2 rounded-full bg-gold mt-2 opacity-60" />
        </div>

        {/* Content */}
        <div>
          <p className="font-cinzel text-[10px] tracking-[0.3em] text-brass uppercase mb-8 philosophy-line">
            Our Philosophy
          </p>

          <h2
            className="font-cormorant font-light text-parchment mb-6 philosophy-line"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.15 }}
          >
            Rest is not a reward.
            <br />
            <em className="text-champagne">It is the practice.</em>
          </h2>

          <p className="text-ash text-[15px] leading-relaxed max-w-xl mb-8 philosophy-line">
            At Destiny, we believe genuine luxury is not about excess — it is about
            precision. Every treatment is designed with one purpose: to return you
            to yourself. No distractions. No rush. Just the work of stillness.
          </p>

          <a
            href="#ritual"
            className="philosophy-line font-cinzel text-[10px] tracking-[0.2em] text-gold uppercase hover:text-champagne transition-colors duration-300"
          >
            The Ritual —
          </a>
        </div>
      </div>
    </section>
  );
}
