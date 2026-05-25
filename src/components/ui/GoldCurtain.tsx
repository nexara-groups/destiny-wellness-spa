'use client';
import { useEffect, useRef } from 'react';
import { gsap as gsapInstance, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function GoldCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain || reducedMotion) return;

    const ctx = gsapInstance.context(() => {
      const tl = gsapInstance.timeline({ paused: true });

      tl.fromTo(
        curtain,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 0.65, ease: 'power2.inOut' }
      )
        .to(curtain, {
          scaleY: 0,
          transformOrigin: 'bottom center',
          duration: 0.55,
          ease: 'power2.inOut',
          delay: 0.1,
        })
        .set(curtain, { display: 'none' });

      ScrollTrigger.create({
        trigger: '#hero',
        start: 'bottom 20%',
        end: 'bottom top',
        once: true,
        onEnter: () => tl.play(),
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-40 pointer-events-none"
      style={{
        background: 'linear-gradient(180deg, #C9A84C 0%, #8B6914 100%)',
        transform: 'scaleY(0)',
        transformOrigin: 'top center',
      }}
      aria-hidden="true"
    />
  );
}
