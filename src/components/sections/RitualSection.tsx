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

        {/* Image grid — CSS atmospheric panels until real spa photos arrive */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
          {([
            { cls: 'ritual-placeholder-1', label: 'Private suite', height: 'md:row-span-1' },
            { cls: 'ritual-placeholder-2', label: 'Treatment room' },
            { cls: 'ritual-placeholder-3', label: 'Ambience' },
          ] as const).map((panel, i) => (
            <div
              key={i}
              className={`ritual-img relative overflow-hidden rounded-sm grain ${panel.cls} ${
                i === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'
              }`}
            >
              {/* Inner subtle texture lines */}
              <div
                className="absolute inset-0"
                style={{
                  background: i === 0
                    ? 'linear-gradient(180deg, transparent 60%, rgba(8,8,8,0.5) 100%)'
                    : 'linear-gradient(180deg, rgba(8,8,8,0.2) 0%, transparent 40%, rgba(8,8,8,0.4) 100%)',
                }}
              />
              {/* Subtle gold line accent */}
              <div
                className="absolute bottom-4 left-4"
                style={{ width: 32, height: 1, background: 'rgba(201,168,76,0.4)' }}
              />
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
