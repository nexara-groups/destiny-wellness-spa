'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const TRUST_PILLARS = [
  {
    icon: '◈',
    title: 'Private Rooms',
    desc: 'Every session in your own dedicated space. No shared areas, no interruptions.',
  },
  {
    icon: '◇',
    title: 'Trained Therapists',
    desc: 'Certified practitioners with deep expertise in the techniques we offer.',
  },
  {
    icon: '◉',
    title: 'Hygiene First',
    desc: 'Fresh linen, sterilised equipment, and end-to-end sanitation for every guest.',
  },
];

export default function RitualSection() {
  const reducedMotion = useReducedMotion();

  const sectionRef = useScrollAnimation<HTMLElement>((el, gsap) => {
    if (reducedMotion) return;

    // Parallax on ritual images
    const images = el.querySelectorAll('.ritual-img');
    images.forEach((img, i) => {
      const speed = i % 2 === 0 ? -15 : -8;
      gsap.to(img, {
        yPercent: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // Trust pillars stagger
    gsap.fromTo(
      '.ritual-pillar',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.ritual-pillars',
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, [reducedMotion]);

  return (
    <section id="ritual" ref={sectionRef} className="py-24 px-6 bg-obsidian overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <p className="font-cinzel text-[10px] tracking-[0.3em] text-gold uppercase mb-4">The Experience</p>
          <h2
            className="font-cormorant font-light text-parchment mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            A ritual, not just a treatment.
          </h2>
          <p className="text-ash text-[14px] leading-relaxed">
            From the moment you arrive to the moment you leave, every detail is
            considered. Arrive as you are. Leave as you should be.
          </p>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="ritual-img relative overflow-hidden rounded-sm aspect-[4/3]"
            >
              <picture>
                <source srcSet={`/images/optimized/ritual-${i}.webp`} media="(min-width: 768px)" />
                <img
                  src={`/images/optimized/ritual-${i}@1x.webp`}
                  alt={`Destiny Wellness & Spa — atmosphere ${i}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-obsidian/40" />
            </div>
          ))}
        </div>

        {/* Trust pillars */}
        <div className="ritual-pillars grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRUST_PILLARS.map((pillar) => (
            <div key={pillar.title} className="ritual-pillar opacity-0">
              <span className="text-gold text-xl mb-4 block" aria-hidden="true">
                {pillar.icon}
              </span>
              <h3 className="font-cormorant font-semibold text-parchment text-lg mb-2">
                {pillar.title}
              </h3>
              <p className="text-ash text-[13px] leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
