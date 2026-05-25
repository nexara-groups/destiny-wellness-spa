'use client';
import { useEffect, useRef } from 'react';
import { gsap as gsapInstance, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RevealTextProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  trigger?: string;
  start?: string;
}

export default function RevealText({
  children,
  as: Tag = 'p',
  className = '',
  delay = 0,
  trigger,
  start = 'top 85%',
}: RevealTextProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || reducedMotion) return;

    const lines = el.querySelectorAll('.reveal-line');

    const ctx = gsapInstance.context(() => {
      gsapInstance.fromTo(
        lines,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          delay,
          scrollTrigger: {
            trigger: trigger ? document.querySelector(trigger) ?? el : el,
            start,
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reducedMotion, delay, trigger, start]);

  const lines = children.split('\n');

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={wrapperRef} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-clip block">
          <span className="reveal-line inline-block">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
