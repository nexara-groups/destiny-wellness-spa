'use client';
import { useEffect, useState } from 'react';
import { WHATSAPP_BOOKING } from '@/constants/site';

const NAV_LINKS = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'Membership', href: '#membership' },
  { label: 'About', href: '#ritual' },
  { label: 'Contact', href: '#booking' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-obsidian/90 backdrop-blur-md border-b border-gold/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="font-cinzel text-[11px] tracking-[0.3em] text-champagne uppercase">
          DESTINY
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-parchment/70 hover:text-parchment transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={WHATSAPP_BOOKING}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center px-5 py-2 bg-gold text-obsidian font-medium text-[11px] tracking-[0.15em] uppercase rounded-sm transition-opacity duration-200 hover:opacity-90"
          aria-label="Book a treatment via WhatsApp"
        >
          Book Now
        </a>

        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`block w-6 h-[1px] bg-gold transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-6 h-[1px] bg-gold transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[1px] bg-gold transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: '#0D0D0D' }}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-cinzel text-[11px] tracking-[0.25em] text-parchment uppercase"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_BOOKING}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center px-5 py-3 bg-gold text-obsidian font-medium text-[11px] tracking-[0.15em] uppercase rounded-sm"
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
}
