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
    <section id="gift" ref={sectionRef} className="py-24 px-6 bg-obsidian border-t border-smoke">
      <div className="gift-content opacity-0 max-w-2xl mx-auto text-center">
        <p className="font-cinzel text-[10px] tracking-[0.3em] text-brass uppercase mb-6">
          Gift a Session
        </p>

        <h2
          className="font-cormorant font-light text-parchment mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
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
      </div>
    </section>
  );
}
