'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const REVIEWS = [
  {
    name: 'Priya R.',
    rating: 5,
    text: 'The Signature Massage was extraordinary. The therapist was incredibly skilled — I left completely restored. This is now my monthly ritual.',
  },
  {
    name: 'Karthik M.',
    rating: 5,
    text: 'Booked the Hot Candle Massage for my anniversary. The private room, the ambience, the attention to detail — genuinely the best spa experience in Vizag.',
  },
  {
    name: 'Sneha V.',
    rating: 5,
    text: 'I have the Diamond membership and it has changed how I approach the week. The priority booking alone is worth it. Destiny is a different league.',
  },
];

export default function SocialProofSection() {
  const reducedMotion = useReducedMotion();

  const sectionRef = useScrollAnimation<HTMLElement>((el, gsap) => {
    if (reducedMotion) return;
    gsap.fromTo(
      '.review-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative py-24 px-6 bg-charcoal overflow-hidden">
      {/* Large decorative opening quotation mark */}
      <div
        className="absolute top-6 left-1/2 -translate-x-1/2 font-cormorant text-gold/[0.04] pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(160px, 20vw, 240px)' }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="relative max-w-5xl mx-auto">
        <p className="font-cinzel text-[10px] tracking-[0.3em] text-gold uppercase mb-4 text-center">
          Experiences
        </p>
        <h2
          className="font-cormorant font-light text-parchment text-center mb-16"
          style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}
        >
          What our guests say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className={`review-card ${reducedMotion ? '' : 'opacity-0'} bg-obsidian border border-smoke rounded-[2px] p-7 flex flex-col`}
            >
              <div className="flex gap-1 mb-5" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-gold text-[13px]">★</span>
                ))}
              </div>

              <p className="font-cormorant font-light text-parchment/80 text-[16px] leading-relaxed mb-6 italic flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="h-[1px] w-5 bg-gold/30" />
                <p className="font-cinzel text-[10px] tracking-[0.2em] text-brass uppercase">
                  {review.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
