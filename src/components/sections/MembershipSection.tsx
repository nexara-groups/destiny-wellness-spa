'use client';
import { useEffect, useRef } from 'react';
import { gsap as gsapInstance, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MEMBERSHIPS } from '@/constants/site';
import MembershipCard from '@/components/ui/MembershipCard';

export default function MembershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    const cards = Array.from(sticky.querySelectorAll<HTMLElement>('.membership-deck-card'));
    const totalCards = cards.length;

    if (reducedMotion) return;

    // Set initial z-index stacking (first card on top)
    cards.forEach((card, i) => {
      gsapInstance.set(card, { zIndex: totalCards - i });
    });
    // First card visible, rest scaled down
    cards.forEach((card, i) => {
      if (i > 0) {
        gsapInstance.set(card, { scale: 0.88, opacity: 0, y: '4%' });
      }
    });

    const ctx = gsapInstance.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${totalCards * 100}%`,
        pin: sticky,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const activeIndex = Math.min(Math.floor(progress * totalCards), totalCards - 1);

          cards.forEach((card, i) => {
            if (i < activeIndex) {
              gsapInstance.to(card, {
                y: '-100%',
                opacity: 0,
                scale: 0.95,
                duration: 0.5,
                ease: 'power2.inOut',
                overwrite: 'auto',
              });
            } else if (i === activeIndex) {
              gsapInstance.to(card, {
                y: '0%',
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            } else {
              gsapInstance.to(card, {
                y: '4%',
                opacity: 0,
                scale: 0.88,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="membership" ref={sectionRef} className="relative bg-obsidian">
      {/* Header — outside pin */}
      <div className="py-20 px-6 text-center">
        <p className="font-cinzel text-[10px] tracking-[0.3em] text-gold uppercase mb-4">Membership</p>
        <h2
          className="font-cormorant font-light text-parchment mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
        >
          A standing reservation for your stillness.
        </h2>
        <p className="text-ash text-[14px] max-w-xl mx-auto">
          A membership at Destiny is not a subscription. It is a commitment to yourself.
        </p>
      </div>

      {/* Pinned deck — reduced motion: grid */}
      {reducedMotion ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-20 max-w-4xl mx-auto">
          {MEMBERSHIPS.map((m) => (
            <MembershipCard key={m.id} membership={m} />
          ))}
        </div>
      ) : (
        <div ref={stickyRef} className="relative" style={{ height: '100vh' }}>
          <div className="absolute inset-0 flex items-center justify-center px-6">
            {MEMBERSHIPS.map((membership) => (
              <div
                key={membership.id}
                className="membership-deck-card absolute inset-x-0 flex items-center justify-center px-6"
              >
                <MembershipCard membership={membership} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
