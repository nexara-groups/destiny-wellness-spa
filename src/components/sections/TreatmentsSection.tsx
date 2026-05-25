'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SERVICES } from '@/constants/site';
import ServiceCard from '@/components/ui/ServiceCard';

const TIER_GROUPS = [
  { id: 'normal' as const, eyebrow: 'Curated Treatments', heading: 'The Essentials', bg: '#111111' },
  { id: 'signature' as const, eyebrow: 'Signature Collection', heading: 'Made for You', bg: '#0D0A04' },
  { id: 'premium' as const, eyebrow: 'Premium Rituals', heading: 'The Extraordinary', bg: '#111111' },
];

export default function TreatmentsSection() {
  const reducedMotion = useReducedMotion();

  const sectionRef = useScrollAnimation<HTMLElement>((el, gsap) => {
    if (reducedMotion) return;

    TIER_GROUPS.forEach((group) => {
      const tierEl = el.querySelector(`[data-tier="${group.id}"]`);
      if (!tierEl) return;

      const cards = tierEl.querySelectorAll('.service-card-wrapper');
      gsap.fromTo(
        cards,
        { x: 60, opacity: 0, rotate: 2 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: tierEl,
            start: 'top 80%',
            once: true,
          },
        }
      );

      const eyebrow = tierEl.querySelector('.tier-eyebrow');
      if (eyebrow) {
        gsap.to(eyebrow, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: tierEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });
  }, [reducedMotion]);

  return (
    <section id="treatments" ref={sectionRef} className="overflow-hidden">
      {TIER_GROUPS.map((group) => {
        const services = SERVICES.filter((s) => s.tier === group.id);
        const isSignature = group.id === 'signature';

        return (
          <div
            key={group.id}
            data-tier={group.id}
            className="relative py-24 px-6"
            style={{ background: group.bg }}
          >
            {/* Flame glow for premium */}
            {group.id === 'premium' && (
              <div
                className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(201,168,76,0.04) 0%, transparent 100%)' }}
                aria-hidden="true"
              />
            )}

            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                <p className="tier-eyebrow font-cinzel text-[10px] tracking-[0.3em] text-gold uppercase mb-3">
                  {group.eyebrow}
                </p>
                <h2
                  className="font-cormorant font-light text-parchment"
                  style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
                >
                  {group.heading}
                </h2>
              </div>

              {/* Signature watermark */}
              {isSignature && (
                <div
                  className="absolute font-cinzel tracking-[0.3em] text-gold pointer-events-none select-none uppercase"
                  style={{
                    fontSize: 'clamp(40px, 8vw, 120px)',
                    opacity: 0.04,
                    top: '50%',
                    right: '5%',
                    transform: 'translateY(-50%) rotate(90deg)',
                  }}
                  aria-hidden="true"
                >
                  SIGNATURE
                </div>
              )}

              {/* Cards */}
              <div
                className={`grid gap-6 ${
                  isSignature
                    ? 'grid-cols-1 max-w-lg mx-auto'
                    : services.length <= 2
                    ? 'grid-cols-1 md:grid-cols-2 max-w-3xl'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {services.map((service) => (
                  <div key={service.id} className="service-card-wrapper">
                    <ServiceCard service={service} />
                  </div>
                ))}

                {/* Steam bath add-on (premium tier only) */}
                {group.id === 'premium' && (
                  <div className="service-card-wrapper">
                    <div className="h-full bg-charcoal border border-dashed border-gold/30 rounded-sm p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
                      <p className="font-cinzel text-[9px] tracking-[0.2em] text-brass uppercase mb-3">Add-on</p>
                      <h3 className="font-cormorant font-light text-parchment text-xl mb-2">Steam Bath</h3>
                      <p className="font-cinzel text-gold text-lg">+ ₹500</p>
                      <p className="text-ash text-[12px] mt-3">Available with any treatment</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
