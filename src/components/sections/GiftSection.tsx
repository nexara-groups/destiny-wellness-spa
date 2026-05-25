'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { WHATSAPP_GIFT } from '@/constants/site';

export default function GiftSection() {
  const reducedMotion = useReducedMotion();

  const sectionRef = useScrollAnimation<HTMLElement>((el, gsap) => {
    if (reducedMotion) return;
    gsap.fromTo(
      '.gift-content',
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, [reducedMotion]);

  return (
    <section id="gift" ref={sectionRef} className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0a04 0%, #080808 100%)' }}
    >
      {/* Ambient center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className={`gift-content ${reducedMotion ? '' : 'opacity-0'} relative max-w-xl mx-auto text-center`}>
        {/* Decorative top rule */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-12" style={{ background: 'linear-gradient(to left, rgba(201,168,76,0.4), transparent)' }} />
          <span className="font-cinzel text-[10px] tracking-[0.35em] text-gold uppercase">Gift a Session</span>
          <div className="h-[1px] w-12" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.4), transparent)' }} />
        </div>

        <h2
          className="font-cormorant font-light text-parchment mb-5"
          style={{ fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.1 }}
        >
          Give the gift of stillness.
        </h2>

        <p className="font-sans font-light text-ash text-[14px] leading-relaxed mb-10">
          For birthdays, anniversaries, or the person who deserves rest more than
          anyone you know. Gift a session or a membership at Destiny Wellness &amp; Spa.
        </p>

        <a
          href={WHATSAPP_GIFT}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-3 border border-gold text-gold font-sans font-medium text-[11px] tracking-[0.2em] uppercase rounded-[2px] hover:bg-gold hover:text-obsidian transition-all duration-300"
          aria-label="Inquire about gift vouchers at Destiny Wellness & Spa"
        >
          Inquire on WhatsApp
        </a>

        {/* Decorative bottom rule */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="h-[1px] w-8" style={{ background: 'linear-gradient(to left, rgba(201,168,76,0.2), transparent)' }} />
          <div className="w-1 h-1 rounded-full bg-gold/30" />
          <div className="h-[1px] w-8" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.2), transparent)' }} />
        </div>
      </div>
    </section>
  );
}
