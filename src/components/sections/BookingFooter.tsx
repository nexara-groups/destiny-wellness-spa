'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SITE, WHATSAPP_BOOKING, WHATSAPP_GIFT } from '@/constants/site';

const FOOTER_LINKS = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'Membership', href: '#membership' },
  { label: 'About', href: '#ritual' },
  { label: 'Gift a Session', href: '#gift' },
];

export default function BookingFooter() {
  const reducedMotion = useReducedMotion();

  const ctaRef = useScrollAnimation<HTMLDivElement>((el, gsap) => {
    if (reducedMotion) return;

    const headlineLeft = el.querySelector('.cta-headline-left');
    const headlineRight = el.querySelector('.cta-headline-right');

    if (headlineLeft && headlineRight) {
      gsap.fromTo(
        [headlineLeft, headlineRight],
        { x: (i: number) => (i === 0 ? -60 : 60), opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }

    gsap.fromTo(
      '.cta-sub, .cta-buttons',
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.3,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, [reducedMotion]);

  return (
    <footer id="booking" className="bg-obsidian">
      {/* Top CTA zone */}
      <div
        ref={ctaRef}
        className="relative py-24 px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0D0A04 0%, #080808 100%)' }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <h2
            className="font-cormorant font-light text-parchment mb-4"
            style={{ fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.1 }}
          >
            <span className={`cta-headline-left inline-block ${reducedMotion ? '' : 'opacity-0'}`}>Begin&nbsp;</span>
            <span className={`cta-headline-right inline-block ${reducedMotion ? '' : 'opacity-0'}`}>Your Ritual</span>
          </h2>

          <p className={`cta-sub ${reducedMotion ? '' : 'opacity-0'} font-sans font-light text-ash text-[14px] mb-10 max-w-md mx-auto`}>
            Book a session. Gift a membership. Arrive as you are.
          </p>

          <div className={`cta-buttons ${reducedMotion ? '' : 'opacity-0'} flex flex-col sm:flex-row items-center justify-center gap-4`}>
            <a
              href={WHATSAPP_BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-gold text-obsidian font-sans font-medium text-[11px] tracking-[0.2em] uppercase rounded-[2px] hover:opacity-85 transition-opacity duration-300"
              aria-label="Book a treatment via WhatsApp"
            >
              Book a Session
            </a>
            <a
              href={WHATSAPP_GIFT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 border border-gold text-gold font-sans font-medium text-[11px] tracking-[0.2em] uppercase rounded-[2px] hover:bg-gold hover:text-obsidian transition-all duration-300"
              aria-label="Gift a session via WhatsApp"
            >
              Gift a Session
            </a>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div
        className="h-[1px] mx-8"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)' }}
      />

      {/* Bottom footer */}
      <div className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-cinzel text-[13px] tracking-[0.25em] text-champagne uppercase mb-3">DESTINY</p>
            <p className="font-cormorant font-light text-ash text-[15px] italic mb-4">Wellness &amp; Spa</p>
            <p className="font-sans font-light text-ash text-[12px] leading-relaxed">
              {SITE.tagline}
            </p>
          </div>

          <div>
            <p className="font-cinzel text-[10px] tracking-[0.2em] text-brass uppercase mb-4">Navigate</p>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans font-light text-ash text-[13px] hover:text-parchment transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-cinzel text-[10px] tracking-[0.2em] text-brass uppercase mb-4">Find Us</p>
            <address className="not-italic font-sans font-light text-ash text-[13px] leading-relaxed mb-4">
              {SITE.address.line1}<br />
              {SITE.address.line2}<br />
              {SITE.address.city}
            </address>
            <a
              href={`tel:+91${SITE.phone.replace(/\s/g, '')}`}
              className="font-cinzel text-[12px] text-gold hover:text-champagne transition-colors duration-200"
            >
              {SITE.phone}
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-smoke/50">
          <p className="font-sans text-[11px] text-ash/50 text-center">
            &copy; {new Date().getFullYear()} Destiny Wellness &amp; Spa. Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
