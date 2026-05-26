'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  MEMBERSHIPS,
  SERVICES,
  SITE,
  STEAM_BATH_ADDON,
  WHATSAPP_BOOKING,
  WHATSAPP_GIFT,
  WHATSAPP_MEMBERSHIP,
  getWhatsAppUrl,
  type Service,
} from '@/constants/site';
import { useLenis } from '@/lib/lenis-context';

const ROMAN = ['I', 'II', 'III', 'IV'];

const SERVICE_META: Record<
  string,
  { kicker: string; ordinal: string; imageClass: string; subtitle: string; section: 'therapies' | 'signature' }
> = {
  balinese: {
    kicker: 'No. 01 · Indonesia',
    ordinal: 'i',
    imageClass: 'img-balinese',
    subtitle: 'Deep Tissue · Aromatic Oils',
    section: 'therapies',
  },
  aromatherapy: {
    kicker: 'No. 02 · Botanical',
    ordinal: 'ii',
    imageClass: 'img-aroma',
    subtitle: 'Essential Oils · Limbic Calm',
    section: 'therapies',
  },
  'hot-candle': {
    kicker: 'No. 03 · Candle Oil',
    ordinal: 'iii',
    imageClass: 'img-candle',
    subtitle: 'Soy Wax · Warmth Therapy',
    section: 'signature',
  },
  'body-scrubs': {
    kicker: 'No. 04 · Mineral',
    ordinal: 'iv',
    imageClass: 'img-scrub',
    subtitle: 'Sea Salt · Sugar · Polish',
    section: 'signature',
  },
  signature: {
    kicker: 'No. 05 · Bespoke',
    ordinal: 'v',
    imageClass: 'img-signature',
    subtitle: 'Tailored · House Method',
    section: 'signature',
  },
};

function formatPrice(value: number) {
  return value.toLocaleString('en-IN');
}

function Brand() {
  return (
    <div className="brand">
      <div className="brand-mark">D</div>
      <div className="brand-text">
        <span>DESTINY</span>
        <span>Wellness &amp; Spa</span>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  lineOne,
  emphasis,
  lineTwo,
  lede,
}: {
  eyebrow: string;
  lineOne: string;
  emphasis: string;
  lineTwo?: string;
  lede: string;
}) {
  return (
    <div className="section-head reveal">
      <div className="ornament-line">
        <span className="line" />
        <span className="dot" />
        <span className="line" />
      </div>
      <div className="eyebrow-row">
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2>
        <span className="h-line">
          <span className="inner">
            {lineOne} <em>{emphasis}</em>
          </span>
        </span>
        {lineTwo && (
          <span className="h-line">
            <span className="inner">{lineTwo}</span>
          </span>
        )}
      </h2>
      <p className="lede">{lede}</p>
    </div>
  );
}

function ServiceCard({
  service,
  delayClass,
  onReview,
}: {
  service: Service;
  delayClass: string;
  onReview: (service: Service) => void;
}) {
  const [selected, setSelected] = useState(0);
  const meta = SERVICE_META[service.id];
  const price = service.durations[selected]?.price ?? service.durations[0].price;

  return (
    <article className={`card ${delayClass}`} data-card>
      <div className="card-visual">
        <div
          className={`img ${meta.imageClass} parallax-img`}
          role="img"
          aria-label={`Cinematic view of our ${service.name}`}
        />
        <div className="ordinal">{meta.ordinal}</div>
      </div>
      <div className="card-body-wrap">
        <div className="card-header">
          <div>
            <h3 className="card-title">{service.name}</h3>
            <div className="card-title-sub">{meta.subtitle}</div>
          </div>
          <div className="card-price">
            <span className="small">₹</span>
            <span>{formatPrice(price)}</span>
          </div>
        </div>
        <p className="card-body">{service.description}</p>
        <div className="durations" aria-label={`${service.name} duration`}>
          {service.durations.map((duration, index) => (
            <button
              key={duration.mins}
              type="button"
              className={selected === index ? 'active' : undefined}
              onClick={() => setSelected(index)}
            >
              {duration.mins} min
            </button>
          ))}
        </div>
        <div className="steam-tag">
          <span className="pulse" /> + Steam Bath · ₹{STEAM_BATH_ADDON}
        </div>
        <div className="card-actions">
          <button type="button" className="card-review" onClick={() => onReview(service)}>
            Review in detail
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <a
              className="card-book"
              href={getWhatsAppUrl(`Hi, I'd like to book ${service.name} at Destiny Wellness & Spa.`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Book ${service.name} on WhatsApp`}
            >
              Reserve this ritual
            </a>
            <span className="reply-note">Replies within 30 min · 10 AM–10 PM</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function ServiceDetailModal({
  service,
  onClose,
}: {
  service: Service | null;
  onClose: () => void;
}) {
  if (!service) return null;

  const meta = SERVICE_META[service.id];
  const bookingUrl = getWhatsAppUrl(
    `Hi, I'd like to book ${service.name} at Destiny Wellness & Spa. Please share available slots.`
  );

  return (
    <div className="service-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title">
      <button className="service-modal-backdrop" type="button" aria-label="Close details" onClick={onClose} />
      <div className="service-modal-panel">
        <button className="service-modal-close" type="button" aria-label="Close details" onClick={onClose}>
          Close
        </button>

        <div className="service-modal-visual">
          <div 
            className={`img ${meta.imageClass}`} 
            role="img" 
            aria-label={`Detailed view of ${service.name}`} 
          />
        </div>

        <div className="service-modal-copy">
          <p className="service-modal-kicker">About This Ritual</p>
          <h3 id="service-modal-title">{service.name}</h3>
          <p className="service-modal-sub">{meta.subtitle}</p>
          <p className="service-modal-review">{service.detail.feel}</p>

          <div className="service-modal-facts">
            <div>
              <span>Pressure</span>
              <strong>{service.detail.pressure}</strong>
            </div>
            <div>
              <span>Suggested Time</span>
              <strong>{service.detail.recommendedDuration}</strong>
            </div>
          </div>

          <div className="service-modal-grid">
            <div>
              <h4>Best For</h4>
              <ul>
                {service.detail.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>What You Can Expect</h4>
              <ul>
                {service.detail.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="service-modal-prices" aria-label={`${service.name} prices`}>
            {service.durations.map((duration) => (
              <div key={duration.mins}>
                <span>{duration.mins} min</span>
                <strong>₹{formatPrice(duration.price)}</strong>
              </div>
            ))}
          </div>

          <p className="service-modal-note">{service.detail.goodToKnow}</p>

          <div className="service-modal-actions">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Book this treatment
            </a>
            <button type="button" onClick={onClose}>
              Keep browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DestinyV4Page() {
  const [reviewService, setReviewService] = useState<Service | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const savedTheme = localStorage.getItem('destiny-theme');
    if (savedTheme === 'light') {
      setIsLightMode(true);
    }
  }, []);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-theme');
      localStorage.setItem('destiny-theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      localStorage.setItem('destiny-theme', 'dark');
    }
    return () => {
      document.body.classList.remove('light-theme');
    };
  }, [isLightMode]);

  useEffect(() => {
    if (!lenis) return;
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72 });
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [lenis]);

  const therapies = useMemo(
    () => SERVICES.filter((service) => SERVICE_META[service.id]?.section === 'therapies'),
    []
  );
  const signature = useMemo(
    () => SERVICES.filter((service) => SERVICE_META[service.id]?.section === 'signature'),
    []
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reviewId = params.get('review');
    const service = SERVICES.find((item) => item.id === reviewId);
    if (service) setReviewService(service);
  }, []);

  useEffect(() => {
    if (!reviewService) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setReviewService(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [reviewService]);

  useEffect(() => {
    const body = document.body;
    body.classList.add('loaded');

    const nav = document.getElementById('nav');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -20px 0px' }
    );

    document
      .querySelectorAll('.reveal, .card, .tier, .editorial, .callout')
      .forEach((element) => revealObserver.observe(element));

    const railLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.chapter-rail a'));
    const railTargets = railLinks.map((link) => document.getElementById(link.dataset.anchor ?? ''));

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const vh = window.innerHeight;
        nav?.classList.toggle('scrolled', y > 30);

        const heroInner = document.querySelector<HTMLElement>('.hero-inner');
        const heroBg = document.querySelector<HTMLElement>('.hero-bg');
        const progress = Math.min(1, Math.max(0, y / Math.max(vh, 1)));
        if (heroInner) {
          heroInner.style.transform = `translate3d(0, ${-progress * 80}px, 0) scale(${1 - progress * 0.04})`;
          heroInner.style.opacity = String(Math.max(0, 1 - progress * 1.6));
        }
        if (heroBg && supportsHover) {
          heroBg.style.transform = `scale(${1 + progress * 0.12}) translateY(${progress * 24}px)`;
        }
        document.querySelectorAll('.hero-meta, .hero-scroll').forEach((element) => {
          if (element instanceof HTMLElement) {
            element.style.setProperty('opacity', String(Math.max(0, 1 - progress * 2.0)), 'important');
          }
        });

        if (supportsHover) {
          document.querySelectorAll<HTMLElement>('.parallax-img, .parallax-veil').forEach((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.bottom < -180 || rect.top > vh + 180) return;
            const speed = Number(element.dataset.speed ?? '1');
            const localProgress = (rect.top + rect.height / 2 - vh / 2) / vh;
            const translateY = localProgress * -52 * speed;
            if (element.classList.contains('parallax-img')) {
              const baseScale = element.closest('.intro-bg') ? 1.1 : 1.08;
              element.style.transform = `translate3d(0, ${translateY}px, 0) scale(${baseScale})`;
            } else {
              element.style.transform = `translate3d(0, ${translateY}px, 0)`;
            }
          });
        }

        const activeY = y + vh * 0.45;
        let active = -1;
        railTargets.forEach((target, index) => {
          if (target && target.offsetTop <= activeY) active = index;
        });
        railLinks.forEach((link, index) => link.classList.toggle('active', index === active));
        ticking = false;
      });
    };

    const cursor = document.querySelector<HTMLElement>('.cursor');
    const dot = document.querySelector<HTMLElement>('.cursor-dot');
    let raf = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (dot) dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%,-50%)`;
    };
    const cursorLoop = () => {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      if (cursor) cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(cursorLoop);
    };

    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (supportsHover && cursor && dot) {
      window.addEventListener('mousemove', onMouseMove);
      raf = requestAnimationFrame(cursorLoop);
    }

    return () => {
      body.classList.remove('loaded', 'cursor-grow', 'cursor-text');
      document.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <main className={`spa-v4 ${isLightMode ? 'light-theme' : ''}`}>
      <div className="cursor" />
      <div className="cursor-dot" />

      <nav className="chapter-rail" aria-label="Sections">
        <a href="#therapies" data-anchor="therapies">
          <span className="num">I</span>
          <span className="bar" />
          <span className="lbl">Therapies</span>
        </a>
        <a href="#signature" data-anchor="signature">
          <span className="num">II</span>
          <span className="bar" />
          <span className="lbl">Signature</span>
        </a>
        <a href="#membership" data-anchor="membership">
          <span className="num">III</span>
          <span className="bar" />
          <span className="lbl">Membership</span>
        </a>
        <a href="#gift" data-anchor="gift">
          <span className="num">IV</span>
          <span className="bar" />
          <span className="lbl">Gift</span>
        </a>
        <a href="#contact" data-anchor="contact">
          <span className="num">V</span>
          <span className="bar" />
          <span className="lbl">Reserve</span>
        </a>
      </nav>

      <div className="grain" />

      <nav className="nav" id="nav">
        <Brand />
        <ul className="nav-links">
          <li>
            <a href="#therapies">Therapies</a>
          </li>
          <li>
            <a href="#signature">Signature</a>
          </li>
          <li>
            <a href="#membership">Membership</a>
          </li>
          <li>
            <a href="#contact">Reserve</a>
          </li>
        </ul>
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setIsLightMode(!isLightMode)}
          aria-label="Toggle light/dark theme"
        >
          {isLightMode ? '☾' : '☼'}
        </button>
        <button
          className="nav-hamburger"
          aria-label="Open navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigation">
          <button
            className="mobile-drawer-close"
            aria-label="Close navigation"
            onClick={() => setMobileMenuOpen(false)}
          >
            Close
          </button>
          <div className="mobile-drawer-brand">
            <span className="mobile-drawer-wordmark">Destiny</span>
            <span className="mobile-drawer-sub">Wellness &amp; Spa</span>
          </div>
          <div className="mobile-drawer-ornament" aria-hidden="true" />
          <nav>
            <a href="#therapies" onClick={() => setMobileMenuOpen(false)}>Therapies</a>
            <a href="#signature" onClick={() => setMobileMenuOpen(false)}>Signature</a>
            <a href="#membership" onClick={() => setMobileMenuOpen(false)}>Membership</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Reserve</a>
          </nav>
          <div className="mobile-drawer-ornament" aria-hidden="true" />
          <a
            className="mobile-drawer-cta"
            href={WHATSAPP_BOOKING}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
          >
            Reserve Now
          </a>
        </div>
      )}

      <header className="hero" id="hero">
        <div className="hero-bg">
          <div className="photo" role="img" aria-label="Quiet sanctuary candlelit spa background" />
        </div>
        <div className="hero-meta left">
          <span>Est. Visakhapatnam</span>
          <span className="bar" />
          <span>India</span>
        </div>
        <div className="hero-meta right">
          <span>By Appointment</span>
        </div>
        <div className="hero-inner">
          <div className="hero-ornament">
            <span className="line" />
            <span className="dot" />
            <span className="line" />
          </div>
          <div className="hero-eyebrow eyebrow">Fourth Floor, Madhurawada</div>
          <h1>
            <span className="h1-line">
              <span className="word italic">
                <span className="inner">Silence,</span>
              </span>
            </span>
            <span className="h1-line">
              <span className="word">
                <span className="inner">four</span>
              </span>{' '}
              <span className="word">
                <span className="inner">floors</span>
              </span>{' '}
              <span className="word">
                <span className="inner">up.</span>
              </span>
            </span>
          </h1>
          <p className="hero-sub">
            {SITE.subTagline}
          </p>
          <a href="#therapies" className="cta">
            Find Your Ritual
            <span className="arrow" />
          </a>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="rail" />
        </div>
      </header>

      <div className="marquee" aria-hidden="true">
        <div className="track">
          {['Ritual', 'Quiet', 'Breath', 'Warmth', 'Oil', 'Stone', 'Candle', 'Return', 'Ritual', 'Rest'].map(
            (word, index) => (
              <span key={`${word}-${index}`}>
                {word}
                <span className="star">✦</span>
              </span>
            )
          )}
        </div>
      </div>

      <section className="editorial var-pause reveal">
        <div className="photo parallax-img" data-speed="0.4" role="img" aria-label="Relaxing aromatic steam therapy scene" />
        <div className="veil parallax-veil" data-speed="-0.15" />
        <div className="editorial-content">
          <div className="num">— Pause —</div>
          <div className="big">
            <span className="h-line">
              <span className="inner">
                An <em>hour</em> here
              </span>
            </span>
            <span className="h-line">
              <span className="inner">is a day elsewhere.</span>
            </span>
          </div>
        </div>
      </section>

      <section className="section" id="therapies">
        <SectionHeading
          eyebrow="I — Curated Therapies"
          lineOne="The"
          emphasis="foundation"
          lineTwo="of our practice"
          lede="Two foundations, two different needs. Balinese works the body; Aromatherapy quiets the mind. Unsure which to choose? Start with Balinese — most first-time guests do."
        />
        <div className="grid-2">
          {therapies.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              delayClass={`card-d${index + 1}`}
              onReview={setReviewService}
            />
          ))}
        </div>
      </section>

      <section className="editorial reveal">
        <div className="photo parallax-img" data-speed="0.3" role="img" aria-label="Luxury thermal massage stone setup" />
        <div className="veil parallax-veil" data-speed="-0.1" />
        <div className="editorial-content">
          <div className="num">— Interlude —</div>
          <div className="big">
            <span className="h-line">
              <span className="inner">Most treatments ease the body.</span>
            </span>
            <span className="h-line">
              <span className="inner">
                These were composed for <em>something quieter.</em>
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="section" id="signature">
        <SectionHeading
          eyebrow="II — Signature Indulgences"
          lineOne="The"
          emphasis="house"
          lineTwo="rituals"
          lede="Four treatments you will not find on a standard menu. Each one was chosen for what it does, not what it sounds like."
        />
        <div className="grid-3">
          {signature.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              delayClass={`card-d${Math.min(index + 1, 3)}`}
              onReview={setReviewService}
            />
          ))}
        </div>
      </section>

      <section className="intro reveal">
        <div className="intro-bg">
          <div className="photo parallax-img" data-speed="0.4" role="img" aria-label="Therapeutic warm oil pouring treatment" />
          <div className="veil parallax-veil" data-speed="-0.15" />
        </div>
        <span className="intro-mark">&ldquo;</span>
        <p className="intro-quote">
          <span className="line">
            <span className="text">You booked an hour.</span>
          </span>
          <span className="line">
            <span className="text">
              You will leave counting the <span className="accent">weeks</span> until the next one.
            </span>
          </span>
        </p>
        <div className="intro-flourish">
          <span className="line" />
          <span className="diamond" />
          <span className="line" />
        </div>
      </section>

      <section className="testimonials">
        <div className="section-head reveal">
          <div className="ornament-line">
            <span className="line" />
            <span className="dot" />
            <span className="line" />
          </div>
          <div className="eyebrow-row">
            <h2 className="eyebrow">Heard from guests</h2>
          </div>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card reveal">
            <div className="tmark">&ldquo;</div>
            <p className="tquote">
              I had never been to a spa before. A friend from my team dragged me here. I booked the 90-minute Balinese on a Thursday evening and spent the entire Friday wondering why I waited so long.
            </p>
            <div className="tmeta">
              <div className="tname">Priya K.</div>
              <div className="ttreatment">Software Engineer · Balinese 90 min · First visit</div>
            </div>
          </div>
          <div className="testimonial-card reveal card-d2">
            <div className="tmark">&ldquo;</div>
            <p className="tquote">
              Six sessions into my Gold membership and I have not had neck pain in two months. My manager noticed before I did.
            </p>
            <div className="tmeta">
              <div className="tname">Venkat R.</div>
              <div className="ttreatment">Product Manager · Gold Member</div>
            </div>
          </div>
          <div className="testimonial-card reveal card-d3">
            <div className="tmark">&ldquo;</div>
            <p className="tquote">
              Booked the Hot Candle on a whim after a late Friday. I fell asleep within the first 15 minutes. Left at 10 PM feeling like it was Sunday morning.
            </p>
            <div className="tmeta">
              <div className="tname">Sriram N.</div>
              <div className="ttreatment">Senior Developer · Hot Candle 90 min</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="membership">
        <div className="membership-wrap">
          <SectionHeading
            eyebrow="III — Membership"
            lineOne="Become a"
            emphasis="member"
            lede="Members pay between ₹1,250 and ₹1,667 per session — less than most Vizag salons charge for a haircut. Steam included from Gold, priority scheduling, and dedicated WhatsApp access at Diamond."
          />
          <div className="tiers">
            {MEMBERSHIPS.map((membership, index) => (
              <a
                key={membership.id}
                className={`tier t${index + 1}`}
                href={WHATSAPP_MEMBERSHIP}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Enquire about ${membership.name} membership`}
              >
                {membership.badge && (
                  <div className={`tier-badge tier-badge-${membership.badge.variant}`}>
                    {membership.badge.text}
                  </div>
                )}
                <div className="crest">
                  <span>{ROMAN[index]}</span>
                </div>
                <div className="tier-name">{membership.name}</div>
                <div className="tier-eyebrow">Tier {ROMAN[index]}</div>
                <div className="tier-divider" />
                <div className="tier-price">
                  <span className="ru">₹</span>
                  {formatPrice(membership.price)}
                </div>
                <div className="tier-sessions">
                  <strong>{membership.sessions}</strong> Sessions
                </div>
                <ul className="tier-benefits">
                  {membership.benefits.slice(0, 2).map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <div className="tier-persession">
                  ₹{formatPrice(Math.round(membership.price / membership.sessions))} per visit
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="gift-section reveal" id="gift">
        <div className="gift-inner">
          <div className="gift-copy">
            <span className="eyebrow">Gift Vouchers</span>
            <h2>Give the hour <em>they haven&apos;t taken.</em></h2>
            <p>
              The kind of gift that gets remembered. A Destiny voucher covers any treatment, any duration — redeemable any day within six months of purchase. Available for birthdays, anniversaries, or corporate occasions.
            </p>
            <a href={WHATSAPP_GIFT} target="_blank" rel="noopener noreferrer" className="cta">
              Enquire on WhatsApp
              <span className="arrow" />
            </a>
            <span className="reply-note">We reply within 30 minutes · 10 AM – 10 PM</span>
          </div>
          <div className="gift-denoms">
            <div className="gift-denom">
              <span className="gift-amount">₹2,500</span>
              <span className="gift-label">A first treatment</span>
            </div>
            <div className="gift-denom">
              <span className="gift-amount">₹5,000</span>
              <span className="gift-label">A full ritual</span>
            </div>
            <div className="gift-denom featured">
              <span className="gift-amount">₹10,000</span>
              <span className="gift-label">Couple or extended</span>
            </div>
            <p className="gift-note">Valid 6 months from date of purchase. Any treatment, any duration.</p>
          </div>
        </div>
      </section>

      <section className="callout reveal">
        <div className="photo parallax-img" data-speed="0.4" role="img" aria-label="Tranquil wellness relaxation room" />
        <div className="veil parallax-veil" data-speed="-0.15" />
        <div className="callout-content">
          <div className="eyebrow-mini">— By appointment —</div>
          <h2>
            <span className="h-line">
              <span className="inner">Reserve</span>
            </span>
            <span className="h-line">
              <span className="inner">
                your <em>ritual</em>.
              </span>
            </span>
          </h2>
          <div className="phone-cta">
            <span className="lab">Call us</span>
            <a className="num" href={`tel:+91${SITE.phone.replace(/\s/g, '')}`}>
              {SITE.phone}
            </a>
          </div>
          <div className="meta">
            <span>Open daily · 10:00 — 22:00</span>
            <span className="dot" />
            <span>Madhurawada, Visakhapatnam</span>
          </div>
        </div>
      </section>

      <section className="faq-section reveal">
        <div className="faq-inner">
          <div className="faq-head">
            <span className="eyebrow">Before you arrive</span>
            <h2>Your first visit, answered.</h2>
            <p>Everything you need to know before you step through the door — so your session starts the moment you arrive.</p>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <span className="faq-num">01</span>
              <div>
                <h4>What should I wear?</h4>
                <p>We provide everything — draping, robes, and towels are all arranged before you arrive. Just come as you are.</p>
              </div>
            </div>
            <div className="faq-item">
              <span className="faq-num">02</span>
              <div>
                <h4>How early should I arrive?</h4>
                <p>10 minutes before your slot. This gives you time to settle in, share preferences with the therapist, and begin without rushing.</p>
              </div>
            </div>
            <div className="faq-item">
              <span className="faq-num">03</span>
              <div>
                <h4>Is it for men and women?</h4>
                <p>Yes. All treatments are available to all guests. Same-gender therapist requests are always accommodated — just mention it when you book.</p>
              </div>
            </div>
            <div className="faq-item">
              <span className="faq-num">04</span>
              <div>
                <h4>Can I book the same day?</h4>
                <p>Often yes. WhatsApp us and we confirm within 30 minutes. Evening slots on weekdays are usually available same day.</p>
              </div>
            </div>
            <div className="faq-item">
              <span className="faq-num">05</span>
              <div>
                <h4>What is the steam bath add-on?</h4>
                <p>A private steam session for ₹500, before or after your treatment. It opens the pores, loosens tight muscles, and makes the massage work deeper. Included with every Gold session.</p>
              </div>
            </div>
            <div className="faq-item">
              <span className="faq-num">06</span>
              <div>
                <h4>What is the cancellation policy?</h4>
                <p>We ask for at least 4 hours' notice to reschedule or cancel. Same-day cancellations within 4 hours may forfeit the session. WhatsApp us directly for anything urgent.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="footer-grid">
          <div className="reveal">
            <Brand />
            <h3>
              Reserve your <em>ritual</em>.
            </h3>
            <p className="footer-note">On the fourth floor, above the city. By appointment only.</p>
          </div>
          <div className="reveal d1">
            <div className="col-label">Visit</div>
            <p>
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
              <br />
              {SITE.address.city}
            </p>
          </div>
          <div className="reveal d2">
            <div className="col-label">Reservations</div>
            <p>Open daily · 10:00 — 22:00</p>
            <a className="phone" href={`tel:+91${SITE.phone.replace(/\s/g, '')}`}>
              {SITE.phone}
            </a>
            <a className="whatsapp-link" href={WHATSAPP_BOOKING} target="_blank" rel="noopener noreferrer">
              Book on WhatsApp
            </a>
            <span className="reply-note" style={{ textAlign: 'left', marginTop: '6px' }}>We reply within 30 minutes · 10 AM – 10 PM</span>
            <a className="whatsapp-link" href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: '10px' }}>
              View on Google Maps
            </a>
          </div>
        </div>
        <div className="footer-bot">
          <div>© 2026 Destiny Wellness &amp; Spa</div>
          <div>
            <a href="#therapies">Therapies</a>
            <a href="#signature">Signature</a>
            <a href="#membership">Membership</a>
          </div>
        </div>
      </footer>

      <ServiceDetailModal service={reviewService} onClose={() => setReviewService(null)} />
    </main>
  );
}
