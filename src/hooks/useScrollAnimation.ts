'use client';
import { useEffect, useRef } from 'react';
import { gsap as gsapInstance, ScrollTrigger } from '@/lib/gsap';

type AnimationFn = (
  el: HTMLElement,
  gsap: typeof gsapInstance,
  ST: typeof ScrollTrigger
) => gsap.core.Timeline | void;

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  animationFn: AnimationFn,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsapInstance.context(() => {
      animationFn(el, gsapInstance, ScrollTrigger);
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
