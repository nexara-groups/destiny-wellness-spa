'use client';
import { useEffect, useRef } from 'react';
import { gsap as gsapInstance, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SITE, WHATSAPP_BOOKING } from '@/constants/site';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsapInstance.context(() => {
      if (!reducedMotion) {
        // Entrance animation
        const tl = gsapInstance.timeline({ delay: 0.3 });
        tl.fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
          .fromTo('.hero-line', { y: '100%' }, { y: '0%', duration: 1, stagger: 0.06, ease: 'power3.out' }, '-=0.4')
          .fromTo('.hero-rule', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.3')
          .fromTo('.hero-sub', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
          .fromTo('.hero-cta', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');

        // Content floats away on scroll
        gsapInstance.to(content, {
          y: -80,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'center top',
            scrub: true,
          },
        });

        // Background parallax
        gsapInstance.to('.hero-bg-img', {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background — atmospheric CSS, replaced by real spa photo before launch */}
      <div className="hero-bg-img absolute inset-0 scale-110 hero-atmosphere grain">
        {/* Vignette edge */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(8,8,8,0.7) 100%)' }}
        />
        {/* Warm horizontal band */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, transparent 30%, transparent 60%, rgba(8,8,8,0.6) 100%)' }}
        />
      </div>

      {/* "D" watermark */}
      <div
        className="absolute font-cinzel font-semibold pointer-events-none select-none"
        style={{
          fontSize: 'clamp(200px, 40vw, 480px)',
          color: 'rgba(201,168,76,0.04)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        D
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="hero-eyebrow font-cinzel text-[10px] tracking-[0.4em] text-brass uppercase mb-8 opacity-0">
          {SITE.name} · Est. Visakhapatnam
        </p>

        <h1
          className="font-cormorant font-light text-parchment leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(48px, 8vw, 88px)' }}
        >
          <span className="reveal-clip block">
            <span className="hero-line inline-block">Where the City Ends,</span>
          </span>
          <span className="reveal-clip block">
            <span className="hero-line inline-block italic">Stillness Begins.</span>
          </span>
        </h1>

        <div
          className="hero-rule h-[1px] w-16 mx-auto mb-6"
          style={{ background: '#C9A84C', opacity: 0.6, transform: 'scaleX(0)', transformOrigin: 'left center' }}
        />

        <p className="hero-sub text-ash text-[15px] tracking-wide mb-10 opacity-0">
          {SITE.subTagline}
        </p>

        <a
          href={WHATSAPP_BOOKING}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta inline-flex items-center px-8 py-3 bg-gold text-obsidian font-medium text-[11px] tracking-[0.2em] uppercase rounded-sm transition-opacity duration-300 hover:opacity-85 opacity-0"
          aria-label="Book a treatment at Destiny Wellness & Spa via WhatsApp"
        >
          Book a Session
        </a>
      </div>
    </section>
  );
}
