# Destiny Wellness & Spa — Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic, scroll-animated luxury spa marketing website for Destiny Wellness & Spa using Next.js 15 + Tailwind CSS 3.4 + GSAP ScrollTrigger, deployed as a static export on Cloudflare Pages.

**Architecture:** Single long-scroll page composed of 8 animated sections. All animations are GSAP ScrollTrigger-driven via a shared `useScrollAnimation` hook that wraps `gsap.context().revert()` for React safety. The page assembles server-side; each section is a `'use client'` component with its own GSAP timeline.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 3.4, GSAP 3 + ScrollTrigger, Lenis (smooth scroll), sharp (image pipeline), Cloudflare Pages (static export)

---

## File Map

```
destiny-wellness-spa/
├── public/
│   └── images/
│       └── optimized/          # WebP outputs from sharp pipeline
│           ├── hero-bg.webp    # 2400w
│           ├── hero-bg@1x.webp # 1200w
│           ├── ritual-1.webp
│           ├── ritual-2.webp
│           └── ritual-3.webp
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Fonts, metadata, GSAPProvider wrapper
│   │   ├── page.tsx            # Server component — assembles all sections
│   │   └── globals.css         # Tailwind directives + CSS custom properties
│   ├── components/
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── PhilosophySection.tsx
│   │   │   ├── TreatmentsSection.tsx
│   │   │   ├── RitualSection.tsx
│   │   │   ├── MembershipSection.tsx
│   │   │   ├── SocialProofSection.tsx
│   │   │   ├── GiftSection.tsx
│   │   │   └── BookingFooter.tsx
│   │   ├── ui/
│   │   │   ├── RevealText.tsx      # Text slice reveal (translateY)
│   │   │   ├── GoldCurtain.tsx     # Hero→Philosophy transition
│   │   │   ├── ServiceCard.tsx     # Treatment card component
│   │   │   ├── MembershipCard.tsx  # Membership tier card
│   │   │   └── ParallaxLayer.tsx   # Parallax speed wrapper
│   │   └── layout/
│   │       ├── Nav.tsx             # Floating nav, scroll-aware
│   │       └── Footer.tsx          # Bottom contact/links strip
│   ├── hooks/
│   │   ├── useScrollAnimation.ts   # gsap.context + revert wrapper
│   │   └── useReducedMotion.ts     # prefers-reduced-motion
│   ├── lib/
│   │   └── gsap.ts                 # GSAP import + plugin registration
│   └── constants/
│       └── site.ts                 # Business data, services, membership tiers
├── scripts/
│   └── optimize-images.mjs         # sharp WebP conversion script
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`

- [ ] **Step 1: Scaffold Next.js project**

Run from `/Users/naveengalla/Documents/Claude/`:
```bash
npx create-next-app@latest destiny-wellness-spa \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint
```
When prompted for anything else, accept defaults.

- [ ] **Step 2: Install dependencies**

```bash
cd destiny-wellness-spa
npm install gsap lenis
npm install -D sharp
```

- [ ] **Step 3: Configure static export in `next.config.ts`**

Replace entire file:
```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 4: Verify build config works**

```bash
npm run build
```
Expected: Build completes. `out/` directory created. No errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 project with static export config"
```

---

## Task 2: Tailwind Design Tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#080808',
        charcoal: '#111111',
        smoke: '#1A1A1A',
        gold: '#C9A84C',
        brass: '#8B6914',
        champagne: '#E8D5A3',
        parchment: '#F0EAD6',
        ash: '#8A8A8A',
        crimson: '#6B1A2A',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        cinzel: ['var(--font-cinzel)', 'serif'],
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        md: '2px',
        lg: '4px',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Replace `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-cormorant: 'Cormorant Garamond', Georgia, serif;
  --font-dm-sans: 'DM Sans', system-ui, sans-serif;
  --font-cinzel: 'Cinzel', serif;
}

html {
  background-color: #080808;
  color: #F0EAD6;
}

body {
  overflow-x: hidden;
}

/* Prevent layout shift on scroll */
html.lenis {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

/* Gold gradient border utility */
.border-gradient-gold {
  border: 1px solid transparent;
  background-clip: padding-box;
  position: relative;
}
.border-gradient-gold::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: linear-gradient(135deg, #C9A84C, #E8D5A3, #C9A84C);
  border-radius: inherit;
  z-index: -1;
}

/* Text reveal clip */
.reveal-clip {
  overflow: hidden;
  display: block;
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add design tokens — color palette, typography, Tailwind config"
```

---

## Task 3: Fonts & Metadata

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, Cinzel } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: false,
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Destiny Wellness & Spa — Visakhapatnam',
  description:
    'Where the city ends, stillness begins. Luxury spa treatments in Madhurawada, Visakhapatnam. Balinese massage, aromatherapy, hot candle, body scrubs, and membership plans.',
  keywords: 'luxury spa visakhapatnam, wellness spa vizag, balinese massage vizag, spa madhurawada',
  openGraph: {
    title: 'Destiny Wellness & Spa',
    description: 'Where the city ends, stillness begins.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${cinzel.variable}`}
    >
      <body className="bg-obsidian text-parchment font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify dev server starts**

```bash
npm run dev
```
Open `http://localhost:3000`. Expected: Black page, no font errors in console.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add Google Fonts — Cormorant Garamond, DM Sans, Cinzel"
```

---

## Task 4: GSAP Infrastructure

**Files:**
- Create: `src/lib/gsap.ts`
- Create: `src/hooks/useScrollAnimation.ts`
- Create: `src/hooks/useReducedMotion.ts`

- [ ] **Step 1: Create `src/lib/gsap.ts`**

```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 2: Create `src/hooks/useReducedMotion.ts`**

```ts
'use client';
import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}
```

- [ ] **Step 3: Create `src/hooks/useScrollAnimation.ts`**

```ts
'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

type AnimationFn = (
  el: HTMLElement,
  gsap: typeof gsap,
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

    const ctx = gsap.context(() => {
      animationFn(el, gsap, ScrollTrigger);
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
```

- [ ] **Step 4: Write a smoke test to confirm hooks export correctly**

Create `src/hooks/__tests__/useReducedMotion.test.ts`:
```ts
import { renderHook } from '@testing-library/react';
import { useReducedMotion } from '../useReducedMotion';

// Install: npm install -D @testing-library/react vitest @vitejs/plugin-react jsdom
// Add to package.json scripts: "test": "vitest"

describe('useReducedMotion', () => {
  it('returns false when prefers-reduced-motion is no-preference', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });
});
```

> **Note:** If setting up Vitest is out of scope, skip this test file and verify by running `npm run build` instead — TypeScript will catch type errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/ src/hooks/
git commit -m "feat: add GSAP infrastructure — lib, useScrollAnimation, useReducedMotion"
```

---

## Task 5: Site Constants & Services Data

**Files:**
- Create: `src/constants/site.ts`

- [ ] **Step 1: Create `src/constants/site.ts`**

```ts
export const SITE = {
  name: 'Destiny Wellness & Spa',
  tagline: 'Where the City Ends, Stillness Begins.',
  subTagline: 'Crafted for those who have everything except rest.',
  phone: '7673 996 993',
  whatsappNumber: '917673996993',
  address: {
    line1: 'PNB Complex, 4th Floor, Flat No. 504',
    line2: 'Above Zeeshan Mandi, Car Shed Junction',
    city: 'Madhurawada, Visakhapatnam 530041',
  },
  mapUrl: 'https://maps.google.com/?q=Destiny+Wellness+Spa+Madhurawada+Visakhapatnam',
} as const;

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_BOOKING = getWhatsAppUrl(
  "Hi, I'd like to book a treatment at Destiny Wellness & Spa."
);

export const WHATSAPP_GIFT = getWhatsAppUrl(
  "Hi, I'd like to inquire about a gift voucher at Destiny Wellness & Spa."
);

export const WHATSAPP_MEMBERSHIP = getWhatsAppUrl(
  "Hi, I'd like to know more about membership plans at Destiny Wellness & Spa."
);

export type ServiceTier = 'normal' | 'signature' | 'premium';

export interface Service {
  id: string;
  name: string;
  tier: ServiceTier;
  durations: { mins: number; price: number }[];
  description: string;
  badge?: string;
}

export const SERVICES: Service[] = [
  {
    id: 'balinese',
    name: 'Balinese Massage',
    tier: 'normal',
    durations: [
      { mins: 60, price: 3000 },
      { mins: 90, price: 4000 },
      { mins: 120, price: 5500 },
    ],
    description:
      'Gentle pressure techniques that relax muscles, improve circulation, and reduce stress — a journey to complete unwind.',
  },
  {
    id: 'aromatherapy',
    name: 'Aromatherapy Massage',
    tier: 'normal',
    durations: [
      { mins: 60, price: 2500 },
      { mins: 90, price: 3500 },
      { mins: 120, price: 4500 },
    ],
    description:
      'Natural essential oils crafted to elevate mood, calm the nervous system, and restore your sense of self.',
  },
  {
    id: 'signature',
    name: 'Signature Massage',
    tier: 'signature',
    durations: [
      { mins: 60, price: 3500 },
      { mins: 90, price: 4500 },
      { mins: 120, price: 6500 },
    ],
    description:
      'A bespoke blend of techniques tailored to your body\'s precise needs. No two sessions are the same.',
  },
  {
    id: 'hot-candle',
    name: 'Hot Candle Massage',
    tier: 'premium',
    durations: [
      { mins: 60, price: 3500 },
      { mins: 90, price: 4500 },
      { mins: 120, price: 6500 },
    ],
    description:
      'Warm melted candle wax nourishes the skin while deep heat dissolves every knot and releases the day.',
  },
  {
    id: 'body-scrubs',
    name: 'Body Scrubs',
    tier: 'premium',
    durations: [
      { mins: 60, price: 3500 },
      { mins: 90, price: 4500 },
      { mins: 120, price: 6500 },
    ],
    description:
      'A ritual of renewal — exfoliation that reveals brighter skin, boosts circulation, and restores your glow.',
  },
  {
    id: 'couple',
    name: 'Couple Session',
    tier: 'premium',
    durations: [
      { mins: 60, price: 6000 },
      { mins: 90, price: 8000 },
      { mins: 120, price: 11000 },
    ],
    description:
      'Share the ritual of stillness. A private suite, side-by-side, tailored to both of you.',
    badge: 'For Two',
  },
];

export const STEAM_BATH_ADDON = 500;

export type MembershipTier = 'silver' | 'gold' | 'diamond' | 'platinum';

export interface Membership {
  id: MembershipTier;
  name: string;
  price: number;
  sessions: number;
  label: string;
  badge?: { text: string; variant: 'popular' | 'limited' };
  benefits: string[];
  whatsappUrl: string;
}

export const MEMBERSHIPS: Membership[] = [
  {
    id: 'silver',
    name: 'Silver',
    price: 5000,
    sessions: 3,
    label: 'Entry',
    benefits: [
      'Access to all treatments',
      'Flexible booking',
      'Valid 6 months',
    ],
    whatsappUrl: getWhatsAppUrl("Hi, I'd like to join the Silver membership at Destiny Wellness & Spa."),
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 10000,
    sessions: 6,
    label: 'Preferred',
    benefits: [
      'All Silver benefits',
      'Complimentary steam bath per session',
      'Priority slot booking',
    ],
    whatsappUrl: getWhatsAppUrl("Hi, I'd like to join the Gold membership at Destiny Wellness & Spa."),
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 15000,
    sessions: 9,
    label: 'Exclusive',
    badge: { text: 'Most Popular', variant: 'popular' },
    benefits: [
      'All Gold benefits',
      '1 complimentary guest session per quarter',
      'Dedicated concierge booking',
    ],
    whatsappUrl: getWhatsAppUrl("Hi, I'd like to join the Diamond membership at Destiny Wellness & Spa."),
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 30000,
    sessions: 24,
    label: 'Ultimate',
    badge: { text: 'Limited', variant: 'limited' },
    benefits: [
      'All Diamond benefits',
      'Quarterly skin consultation',
      '₹1,250 per session — 25% below walk-in',
    ],
    whatsappUrl: getWhatsAppUrl("Hi, I'd like to join the Platinum membership at Destiny Wellness & Spa."),
  },
];
```

- [ ] **Step 2: Confirm TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/constants/
git commit -m "feat: add site constants — services data, membership tiers, WhatsApp URLs"
```

---

## Task 6: Image Optimization Pipeline

**Files:**
- Create: `scripts/optimize-images.mjs`
- Create: `public/images/optimized/` (directory, populated by script)

- [ ] **Step 1: Create `scripts/optimize-images.mjs`**

```mjs
import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join, basename, extname } from 'path';

const INPUT_DIR = './public/images/source';
const OUTPUT_DIR = './public/images/optimized';

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const files = readdirSync(INPUT_DIR).filter(f =>
  ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase())
);

for (const file of files) {
  const input = join(INPUT_DIR, file);
  const name = basename(file, extname(file));

  // Full width (desktop)
  await sharp(input)
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(OUTPUT_DIR, `${name}.webp`));

  // Half width (mobile)
  await sharp(input)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(join(OUTPUT_DIR, `${name}@1x.webp`));

  console.log(`✓ ${name}.webp + ${name}@1x.webp`);
}

console.log('Image optimization complete.');
```

- [ ] **Step 2: Prepare source images**

```bash
mkdir -p public/images/source
# Copy the converted JPGs from project root as source material
cp IMG_9570.jpg public/images/source/ritual-1.jpg
cp IMG_9571.jpg public/images/source/ritual-2.jpg
cp IMG_9572.jpg public/images/source/ritual-3.jpg
cp IMG_9573.jpg public/images/source/hero-bg.jpg
```

- [ ] **Step 3: Run the pipeline**

```bash
node scripts/optimize-images.mjs
```
Expected output:
```
✓ ritual-1.webp + ritual-1@1x.webp
✓ ritual-2.webp + ritual-2@1x.webp
✓ ritual-3.webp + ritual-3@1x.webp
✓ hero-bg.webp + hero-bg@1x.webp
Image optimization complete.
```

- [ ] **Step 4: Commit**

```bash
git add scripts/ public/images/
git commit -m "feat: add image optimization pipeline + WebP outputs"
```

---

## Task 7: Lenis Smooth Scroll Integration

**Files:**
- Create: `src/components/providers/LenisProvider.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create `src/components/providers/LenisProvider.tsx`**

```tsx
'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from '@/lib/gsap';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Add LenisProvider to `src/app/layout.tsx`**

Add import at top:
```tsx
import LenisProvider from '@/components/providers/LenisProvider';
```

Wrap `{children}` in `<body>`:
```tsx
<body className="bg-obsidian text-parchment font-sans antialiased">
  <LenisProvider>{children}</LenisProvider>
</body>
```

- [ ] **Step 3: Verify dev server still starts cleanly**

```bash
npm run dev
```
Expected: No console errors. Page scrolls with smooth inertia feel.

- [ ] **Step 4: Commit**

```bash
git add src/components/providers/ src/app/layout.tsx
git commit -m "feat: integrate Lenis smooth scroll with GSAP ScrollTrigger sync"
```

---

## Task 8: Navigation Component

**Files:**
- Create: `src/components/layout/Nav.tsx`

- [ ] **Step 1: Create `src/components/layout/Nav.tsx`**

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
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
          ? 'bg-obsidian/92 backdrop-blur-md border-b border-gold/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-cinzel text-[11px] tracking-[0.3em] text-champagne uppercase">
          DESTINY
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[13px] text-parchment/70 hover:text-parchment transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Book CTA */}
        <a
          href={WHATSAPP_BOOKING}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center px-5 py-2 bg-gold text-obsidian font-sans font-medium text-[11px] tracking-[0.15em] uppercase rounded transition-opacity duration-200 hover:opacity-90"
          aria-label="Book a treatment via WhatsApp"
        >
          Book Now
        </a>

        {/* Mobile hamburger */}
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

      {/* Mobile drawer */}
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
            className="mt-2 inline-flex items-center justify-center px-5 py-3 bg-gold text-obsidian font-sans font-medium text-[11px] tracking-[0.15em] uppercase rounded"
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Add Nav to `src/app/page.tsx`**

Replace entire `src/app/page.tsx`:
```tsx
import Nav from '@/components/layout/Nav';

export default function Home() {
  return (
    <main>
      <Nav />
      {/* Sections will be added in subsequent tasks */}
      <div className="h-screen flex items-center justify-center">
        <p className="font-cormorant text-4xl text-gold">Destiny Wellness & Spa</p>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Check nav renders and scroll behavior works**

```bash
npm run dev
```
Open `http://localhost:3000`. Scroll down. Expected: Nav becomes opaque with gold border after 80px.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/ src/app/page.tsx
git commit -m "feat: add navigation with scroll-aware style transition"
```

---

## Task 9: RevealText Component

**Files:**
- Create: `src/components/ui/RevealText.tsx`

- [ ] **Step 1: Create `src/components/ui/RevealText.tsx`**

```tsx
'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RevealTextProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  trigger?: string; // CSS selector for scroll trigger element
  start?: string;   // ScrollTrigger start value
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

    // Split by lines using a wrapping technique
    const lines = el.querySelectorAll('.reveal-line');

    const ctx = gsap.context(() => {
      gsap.fromTo(
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

  // Split text into lines by rendering each word in an overflow-hidden span
  const words = children.split('\n');

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={wrapperRef} className={className}>
      {words.map((line, i) => (
        <span key={i} className="reveal-clip block">
          <span className="reveal-line inline-block">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/RevealText.tsx
git commit -m "feat: add RevealText component with scroll-triggered line-by-line reveal"
```

---

## Task 10: Gold Curtain Transition

**Files:**
- Create: `src/components/ui/GoldCurtain.tsx`

- [ ] **Step 1: Create `src/components/ui/GoldCurtain.tsx`**

```tsx
'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function GoldCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain || reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'bottom 20%',
          end: 'bottom top',
          scrub: false,
          once: true,
          onEnter: () => tl.play(),
        },
      });

      tl.fromTo(
        curtain,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 0.65, ease: 'power2.inOut' }
      )
        .to(curtain, { scaleY: 0, transformOrigin: 'bottom center', duration: 0.55, ease: 'power2.inOut', delay: 0.1 })
        .set(curtain, { display: 'none' });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-40 pointer-events-none"
      style={{
        background: 'linear-gradient(180deg, #C9A84C 0%, #8B6914 100%)',
        scaleY: 0,
        transformOrigin: 'top center',
      }}
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/GoldCurtain.tsx
git commit -m "feat: add GoldCurtain cinematic transition component"
```

---

## Task 11: Hero Section

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Create `src/components/sections/HeroSection.tsx`**

```tsx
'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SITE, WHATSAPP_BOOKING } from '@/constants/site';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Initial entrance — stagger the text elements into view
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo('.hero-h1 .reveal-line', { y: '100%' }, { y: '0%', duration: 1, stagger: 0.06, ease: 'power3.out' }, '-=0.4')
        .fromTo('.hero-rule', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.3')
        .fromTo('.hero-sub', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .fromTo('.hero-cta', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');

      // Scroll: content floats away as user scrolls
      gsap.to(content, {
        y: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'center top',
          scrub: true,
        },
      });

      // Parallax on background image
      gsap.to('.hero-bg', {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="hero-bg absolute inset-0 scale-110">
        <picture>
          <source srcSet="/images/optimized/hero-bg.webp" media="(min-width: 768px)" />
          <img
            src="/images/optimized/hero-bg@1x.webp"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(8,8,8,0.72)' }} />
        {/* Warm radial glow */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(201,168,76,0.08) 0%, transparent 60%)' }}
        />
      </div>

      {/* "D" watermark */}
      <div
        className="absolute font-cinzel font-semibold text-gold pointer-events-none select-none"
        style={{ fontSize: 'clamp(200px, 40vw, 480px)', opacity: 0.04, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', lineHeight: 1 }}
        aria-hidden="true"
      >
        D
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="hero-eyebrow font-cinzel text-[10px] tracking-[0.4em] text-brass uppercase mb-8 opacity-0">
          {SITE.name} · Est. Visakhapatnam
        </p>

        <h1 className="hero-h1 font-cormorant font-light text-parchment leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(48px, 8vw, 88px)' }}>
          <span className="reveal-clip block">
            <span className="reveal-line inline-block">Where the City Ends,</span>
          </span>
          <span className="reveal-clip block">
            <span className="reveal-line inline-block italic">{SITE.tagline.split(',')[1]?.trim()}</span>
          </span>
        </h1>

        <div
          className="hero-rule h-[1px] w-16 bg-gold mx-auto mb-6"
          style={{ scaleX: 0, transformOrigin: 'left center', opacity: 0.6 }}
        />

        <p className="hero-sub font-sans font-light text-ash text-[15px] tracking-wide mb-10 opacity-0">
          {SITE.subTagline}
        </p>

        <a
          href={WHATSAPP_BOOKING}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta inline-flex items-center px-8 py-3 bg-gold text-obsidian font-sans font-medium text-[11px] tracking-[0.2em] uppercase rounded transition-opacity duration-300 hover:opacity-85 opacity-0"
          aria-label="Book a treatment at Destiny Wellness & Spa via WhatsApp"
        >
          Book a Session
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add HeroSection and GoldCurtain to `src/app/page.tsx`**

```tsx
import Nav from '@/components/layout/Nav';
import HeroSection from '@/components/sections/HeroSection';
import GoldCurtain from '@/components/ui/GoldCurtain';

export default function Home() {
  return (
    <main>
      <Nav />
      <GoldCurtain />
      <HeroSection />
    </main>
  );
}
```

- [ ] **Step 3: Check hero renders and animations play**

```bash
npm run dev
```
Open `http://localhost:3000`. Expected: Dark cinematic hero with text entrance animation. Gold rule draws. Scroll — text floats upward.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/HeroSection.tsx src/app/page.tsx
git commit -m "feat: add cinematic hero section with entrance and scroll animations"
```

---

## Task 12: Philosophy Section

**Files:**
- Create: `src/components/sections/PhilosophySection.tsx`

- [ ] **Step 1: Create `src/components/sections/PhilosophySection.tsx`**

```tsx
'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function PhilosophySection() {
  const reducedMotion = useReducedMotion();

  const sectionRef = useScrollAnimation<HTMLElement>((el, gsap) => {
    if (reducedMotion) return;

    const lines = el.querySelectorAll('.philosophy-line');
    const goldLine = el.querySelector('.philosophy-gold-line');

    gsap.fromTo(
      lines,
      { x: (i) => (i % 2 === 0 ? -60 : 60), opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          once: true,
        },
      }
    );

    if (goldLine) {
      gsap.fromTo(
        goldLine,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }
  }, [reducedMotion]);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-32 px-6 bg-obsidian overflow-hidden"
    >
      {/* Ambient drift glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
          animation: 'drift 18s ease-in-out infinite alternate',
          top: '50%',
          left: '10%',
          transform: 'translateY(-50%)',
        }}
        aria-hidden="true"
      />

      <style>{`
        @keyframes drift {
          from { transform: translateY(-50%) translateX(0); }
          to { transform: translateY(-50%) translateX(80px); }
        }
      `}</style>

      <div className="max-w-4xl mx-auto flex gap-12">
        {/* Vertical gold line */}
        <div className="flex flex-col items-center pt-2 flex-shrink-0">
          <div
            className="philosophy-gold-line w-[2px] h-20 bg-gold"
            style={{ scaleY: 0, transformOrigin: 'top center' }}
          />
          <div className="w-2 h-2 rounded-full bg-gold mt-2 opacity-60" />
        </div>

        {/* Content */}
        <div>
          <p className="font-cinzel text-[10px] tracking-[0.3em] text-brass uppercase mb-8 philosophy-line">
            Our Philosophy
          </p>

          <h2 className="font-cormorant font-light text-parchment mb-6 philosophy-line"
              style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.15 }}>
            Rest is not a reward.
            <br />
            <em className="text-champagne">It is the practice.</em>
          </h2>

          <p className="font-sans font-light text-ash text-[15px] leading-relaxed max-w-xl mb-8 philosophy-line">
            At Destiny, we believe genuine luxury is not about excess — it is about
            precision. Every treatment is designed with one purpose: to return you
            to yourself. No distractions. No rush. Just the work of stillness.
          </p>

          <a
            href="#ritual"
            className="philosophy-line font-cinzel text-[10px] tracking-[0.2em] text-gold uppercase hover:text-champagne transition-colors duration-300"
          >
            The Ritual —
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `src/app/page.tsx`**

```tsx
import PhilosophySection from '@/components/sections/PhilosophySection';
// Add after <HeroSection />:
<PhilosophySection />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/PhilosophySection.tsx src/app/page.tsx
git commit -m "feat: add philosophy section with alternating-direction text reveal"
```

---

## Task 13: Service Card Component

**Files:**
- Create: `src/components/ui/ServiceCard.tsx`

- [ ] **Step 1: Create `src/components/ui/ServiceCard.tsx`**

```tsx
import type { Service } from '@/constants/site';
import { WHATSAPP_BOOKING } from '@/constants/site';

interface ServiceCardProps {
  service: Service;
  imageSlot?: React.ReactNode;
}

const TIER_LABELS: Record<Service['tier'], string> = {
  normal: 'Curated',
  signature: 'Signature',
  premium: 'Premium',
};

export default function ServiceCard({ service, imageSlot }: ServiceCardProps) {
  const minPrice = Math.min(...service.durations.map((d) => d.price));
  const durations = service.durations.map((d) => `${d.mins}`).join(' · ');

  return (
    <article className="group relative bg-charcoal border border-smoke rounded overflow-hidden transition-all duration-[400ms] ease-luxury hover:-translate-y-2 hover:border-gold hover:shadow-[0_20px_60px_rgba(201,168,76,0.12)]">
      {/* Image area */}
      <div className="relative h-48 overflow-hidden">
        {imageSlot ?? (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1208] to-[#2d1e0a]" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal" />

        {/* Tier badge */}
        <span className="absolute top-3 left-3 font-cinzel text-[8px] tracking-[0.2em] text-gold uppercase bg-obsidian/70 border border-gold/30 px-2 py-1">
          {service.badge ?? TIER_LABELS[service.tier]}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-cormorant font-semibold text-parchment text-xl mb-1 leading-tight">
          {service.name}
        </h3>
        <p className="font-cinzel text-[9px] tracking-[0.2em] text-ash uppercase mb-3">
          {durations} mins
        </p>
        <p className="font-sans font-light text-ash text-[13px] leading-relaxed mb-4 line-clamp-3">
          {service.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-cinzel text-[15px] text-gold">
            From ₹{minPrice.toLocaleString('en-IN')}
          </span>
          <a
            href={WHATSAPP_BOOKING}
            target="_blank"
            rel="noopener noreferrer"
            className="font-cinzel text-[9px] tracking-[0.15em] text-brass uppercase hover:text-gold transition-colors duration-200"
            aria-label={`Book ${service.name}`}
          >
            Book →
          </a>
        </div>

        {service.id !== 'couple' && (
          <p className="font-sans text-[11px] text-ash/60 mt-3">
            + ₹500 steam bath add-on available
          </p>
        )}
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ServiceCard.tsx
git commit -m "feat: add ServiceCard component"
```

---

## Task 14: Treatments Section

**Files:**
- Create: `src/components/sections/TreatmentsSection.tsx`

- [ ] **Step 1: Create `src/components/sections/TreatmentsSection.tsx`**

```tsx
'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SERVICES } from '@/constants/site';
import ServiceCard from '@/components/ui/ServiceCard';

const TIER_GROUPS = [
  {
    id: 'normal',
    eyebrow: 'Curated Treatments',
    heading: 'The Essentials',
    bg: 'bg-charcoal',
  },
  {
    id: 'signature',
    eyebrow: 'Signature Collection',
    heading: 'Made for You',
    bg: 'bg-[#0D0A04]',
  },
  {
    id: 'premium',
    eyebrow: 'Premium Rituals',
    heading: 'The Extraordinary',
    bg: 'bg-charcoal',
  },
] as const;

export default function TreatmentsSection() {
  const reducedMotion = useReducedMotion();

  const sectionRef = useScrollAnimation<HTMLElement>((el, gsap) => {
    if (reducedMotion) return;

    TIER_GROUPS.forEach((group) => {
      const cards = el.querySelectorAll(`[data-tier="${group.id}"] .service-card`);
      gsap.fromTo(
        cards,
        { x: 60, opacity: 0, rotate: 2 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: el.querySelector(`[data-tier="${group.id}"]`),
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Parallax eyebrow label
      const eyebrow = el.querySelector(`[data-tier="${group.id}"] .tier-eyebrow`);
      if (eyebrow) {
        gsap.to(eyebrow, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: el.querySelector(`[data-tier="${group.id}"]`),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });
  }, [reducedMotion]);

  return (
    <section id="treatments" ref={sectionRef} className="overflow-hidden">
      {TIER_GROUPS.map((group) => {
        const services = SERVICES.filter((s) => s.tier === group.id);
        const isSignature = group.id === 'signature';

        return (
          <div
            key={group.id}
            data-tier={group.id}
            className={`relative py-24 px-6 ${group.bg}`}
          >
            {/* Flame glow for premium tier */}
            {group.id === 'premium' && (
              <div
                className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(201,168,76,0.04) 0%, transparent 100%)' }}
                aria-hidden="true"
              />
            )}

            <div className="max-w-6xl mx-auto">
              {/* Section header */}
              <div className="mb-12">
                <p className="tier-eyebrow font-cinzel text-[10px] tracking-[0.3em] text-gold uppercase mb-3">
                  {group.eyebrow}
                </p>
                <h2 className="font-cormorant font-light text-parchment"
                    style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
                  {group.heading}
                </h2>
              </div>

              {/* Signature watermark */}
              {isSignature && (
                <div
                  className="absolute font-cinzel tracking-[0.3em] text-gold pointer-events-none select-none uppercase"
                  style={{ fontSize: 'clamp(40px, 8vw, 120px)', opacity: 0.04, top: '50%', right: '5%', transform: 'translateY(-50%) rotate(90deg)', letterSpacing: '0.3em' }}
                  aria-hidden="true"
                >
                  SIGNATURE
                </div>
              )}

              {/* Cards grid */}
              <div
                className={`grid gap-6 ${
                  isSignature
                    ? 'grid-cols-1 max-w-lg mx-auto'
                    : services.length === 2
                    ? 'grid-cols-1 md:grid-cols-2 max-w-3xl'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {services.map((service) => (
                  <div key={service.id} className="service-card">
                    <ServiceCard service={service} />
                  </div>
                ))}

                {/* Steam bath add-on card (premium tier only) */}
                {group.id === 'premium' && (
                  <div className="service-card">
                    <div className="h-full bg-charcoal border border-dashed border-gold/30 rounded p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
                      <p className="font-cinzel text-[9px] tracking-[0.2em] text-brass uppercase mb-3">Add-on</p>
                      <h3 className="font-cormorant font-light text-parchment text-xl mb-2">Steam Bath</h3>
                      <p className="font-cinzel text-gold text-lg">+ ₹500</p>
                      <p className="font-sans text-ash text-[12px] mt-3">Available with any treatment</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
```

- [ ] **Step 2: Add to `src/app/page.tsx`**

```tsx
import TreatmentsSection from '@/components/sections/TreatmentsSection';
// Add after <PhilosophySection />:
<TreatmentsSection />
```

- [ ] **Step 3: Check in browser**

```bash
npm run dev
```
Expected: Three treatment tier groups. Cards stagger in from right on scroll. Signature tier on darker bg.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/TreatmentsSection.tsx src/app/page.tsx
git commit -m "feat: add treatments section with three-tier stagger animation"
```

---

## Task 15: Ritual / Trust Section

**Files:**
- Create: `src/components/sections/RitualSection.tsx`

- [ ] **Step 1: Create `src/components/sections/RitualSection.tsx`**

```tsx
'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const TRUST_PILLARS = [
  { icon: '◈', title: 'Private Rooms', desc: 'Every session in your own dedicated space. No shared areas, no interruptions.' },
  { icon: '◇', title: 'Trained Therapists', desc: 'Certified practitioners with deep expertise in the techniques we offer.' },
  { icon: '◉', title: 'Hygiene First', desc: 'Fresh linen, sterilised equipment, and end-to-end sanitation for every guest.' },
];

export default function RitualSection() {
  const reducedMotion = useReducedMotion();

  const sectionRef = useScrollAnimation<HTMLElement>((el, gsap) => {
    if (reducedMotion) return;

    // Images parallax
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

    // Trust pillars stagger in
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
          <h2 className="font-cormorant font-light text-parchment mb-4"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
            A ritual, not just a treatment.
          </h2>
          <p className="font-sans font-light text-ash text-[14px] leading-relaxed">
            From the moment you arrive to the moment you leave, every detail is
            considered. Arrive as you are. Leave as you should be.
          </p>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`ritual-img relative overflow-hidden rounded ${i === 2 ? 'md:row-span-1 aspect-[3/4]' : 'aspect-[4/3]'}`}
            >
              <picture>
                <source srcSet={`/images/optimized/ritual-${i}.webp`} media="(min-width: 768px)" />
                <img
                  src={`/images/optimized/ritual-${i}@1x.webp`}
                  alt={`Destiny Wellness & Spa — ritual image ${i}`}
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
              <span className="text-gold text-xl mb-4 block" aria-hidden="true">{pillar.icon}</span>
              <h3 className="font-cormorant font-semibold text-parchment text-lg mb-2">{pillar.title}</h3>
              <p className="font-sans font-light text-ash text-[13px] leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `src/app/page.tsx`**

```tsx
import RitualSection from '@/components/sections/RitualSection';
// Add after <TreatmentsSection />:
<RitualSection />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/RitualSection.tsx src/app/page.tsx
git commit -m "feat: add ritual trust section with parallax image grid"
```

---

## Task 16: Membership Card Component

**Files:**
- Create: `src/components/ui/MembershipCard.tsx`

- [ ] **Step 1: Create `src/components/ui/MembershipCard.tsx`**

```tsx
import type { Membership } from '@/constants/site';

interface MembershipCardProps {
  membership: Membership;
}

const TIER_STYLES: Record<Membership['id'], { bg: string; border: string; labelColor: string }> = {
  silver: {
    bg: 'bg-smoke',
    border: 'border border-[#6B6B6B]',
    labelColor: 'text-ash',
  },
  gold: {
    bg: 'bg-smoke',
    border: 'border border-brass',
    labelColor: 'text-gold',
  },
  diamond: {
    bg: 'bg-[#0F0F1A]',
    border: 'border border-[#4A5FB0] ring-1 ring-gold/20',
    labelColor: 'text-[#A8B8E8]',
  },
  platinum: {
    bg: 'bg-[#0A0A0A] border-gradient-gold',
    border: '',
    labelColor: 'text-champagne',
  },
};

export default function MembershipCard({ membership }: MembershipCardProps) {
  const styles = TIER_STYLES[membership.id];
  const perSession = Math.round(membership.price / membership.sessions);

  return (
    <article
      className={`relative rounded-[2px] p-10 ${styles.bg} ${styles.border}`}
      style={{ maxWidth: 560, margin: '0 auto', width: '100%' }}
    >
      {/* Badge */}
      {membership.badge && (
        <span
          className={`inline-block font-cinzel text-[9px] tracking-[0.15em] uppercase px-3 py-1 rounded-[1px] mb-4 ${
            membership.badge.variant === 'popular'
              ? 'bg-gold/15 text-gold border border-gold/30'
              : 'bg-crimson/20 text-[#E87878] border border-crimson/40'
          }`}
        >
          {membership.badge.text}
        </span>
      )}

      {/* Tier label */}
      <p className={`font-cinzel text-[10px] tracking-[0.3em] uppercase mb-2 ${styles.labelColor}`}>
        {membership.label}
      </p>

      {/* Name */}
      <h3 className="font-cormorant font-light text-parchment mb-6"
          style={{ fontSize: 'clamp(28px, 4vw, 36px)' }}>
        {membership.name}
      </h3>

      {/* Price */}
      <div className="mb-2">
        <span className="font-cinzel text-2xl text-gold">
          ₹{membership.price.toLocaleString('en-IN')}
        </span>
      </div>
      <p className="font-sans text-[12px] text-ash mb-6">
        {membership.sessions} sessions · ₹{perSession.toLocaleString('en-IN')} per session
      </p>

      {/* Divider */}
      <div className="h-[1px] bg-gradient-to-r from-gold/30 to-transparent mb-6" />

      {/* Benefits */}
      <ul className="space-y-3 mb-8">
        {membership.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 font-sans font-light text-[13px] text-parchment">
            <span className="text-gold text-[10px] mt-[3px] flex-shrink-0">✓</span>
            {benefit}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={membership.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center w-full py-3 font-sans font-medium text-[11px] tracking-[0.15em] uppercase rounded-[2px] transition-opacity duration-200 hover:opacity-85 ${
          membership.id === 'silver'
            ? 'border border-gold/60 text-gold hover:bg-gold/10'
            : 'bg-gold text-obsidian'
        }`}
        aria-label={`Join ${membership.name} membership`}
      >
        Join {membership.name}
      </a>
    </article>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/MembershipCard.tsx
git commit -m "feat: add MembershipCard with tier-specific visual treatments"
```

---

## Task 17: Membership Section (Deck Peel)

**Files:**
- Create: `src/components/sections/MembershipSection.tsx`

- [ ] **Step 1: Create `src/components/sections/MembershipSection.tsx`**

```tsx
'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
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

    const cards = sticky.querySelectorAll<HTMLElement>('.membership-deck-card');
    const totalCards = cards.length;

    if (reducedMotion) {
      // Show all cards in a grid when reduced motion
      cards.forEach((card) => { card.style.position = 'relative'; card.style.opacity = '1'; });
      return;
    }

    // Stack cards: all start fully visible, each one exits as scroll progresses
    cards.forEach((card, i) => {
      gsap.set(card, { zIndex: totalCards - i });
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${totalCards * 100}%`,
        pin: sticky,
        scrub: false,
        onUpdate: (self) => {
          const progress = self.progress;
          const activeIndex = Math.min(
            Math.floor(progress * totalCards),
            totalCards - 1
          );

          cards.forEach((card, i) => {
            if (i < activeIndex) {
              // Already exited
              gsap.to(card, { y: '-100%', opacity: 0, scale: 0.95, duration: 0.5, ease: 'power2.inOut', overwrite: 'auto' });
            } else if (i === activeIndex) {
              // Active
              gsap.to(card, { y: '0%', opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
            } else {
              // Waiting below
              gsap.to(card, { y: '4%', opacity: 0.0, scale: 0.88, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
            }
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="membership" ref={sectionRef} className="relative bg-obsidian">
      {/* Section header — not pinned */}
      <div className="py-20 px-6 text-center">
        <p className="font-cinzel text-[10px] tracking-[0.3em] text-gold uppercase mb-4">Membership</p>
        <h2 className="font-cormorant font-light text-parchment mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
          A standing reservation for your stillness.
        </h2>
        <p className="font-sans font-light text-ash text-[14px] max-w-xl mx-auto">
          A membership at Destiny is not a subscription. It is a commitment to yourself.
        </p>
      </div>

      {/* Pinned deck */}
      <div ref={stickyRef} className="relative" style={{ height: '100vh' }}>
        {/* Reduced motion: grid fallback */}
        <div className={`${reducedMotion ? 'grid grid-cols-1 md:grid-cols-2 gap-6 p-6' : 'hidden'}`}>
          {MEMBERSHIPS.map((m) => (
            <MembershipCard key={m.id} membership={m} />
          ))}
        </div>

        {/* Animated deck */}
        <div className={`${reducedMotion ? 'hidden' : 'block'} absolute inset-0 flex items-center justify-center px-6`}>
          {MEMBERSHIPS.map((membership, i) => (
            <div
              key={membership.id}
              className="membership-deck-card absolute inset-x-0 flex items-center justify-center px-6"
              style={{
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? 'none' : 'scale(0.88) translateY(4%)',
              }}
            >
              <MembershipCard membership={membership} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `src/app/page.tsx`**

```tsx
import MembershipSection from '@/components/sections/MembershipSection';
// Add after <RitualSection />:
<MembershipSection />
```

- [ ] **Step 3: Test deck peel in browser**

```bash
npm run dev
```
Open `http://localhost:3000`. Scroll to membership section. Expected: Silver card visible first, peels away as you scroll, Gold appears, then Diamond, then Platinum.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/MembershipSection.tsx src/app/page.tsx
git commit -m "feat: add membership section with scroll-driven deck peel animation"
```

---

## Task 18: Social Proof Section

**Files:**
- Create: `src/components/sections/SocialProofSection.tsx`

- [ ] **Step 1: Create `src/components/sections/SocialProofSection.tsx`**

```tsx
'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Placeholder reviews — replace with real Google reviews before launch
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
    <section ref={sectionRef} className="py-24 px-6 bg-charcoal">
      <div className="max-w-5xl mx-auto">
        <p className="font-cinzel text-[10px] tracking-[0.3em] text-gold uppercase mb-4 text-center">
          Experiences
        </p>
        <h2 className="font-cormorant font-light text-parchment text-center mb-16"
            style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
          What our guests say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="review-card opacity-0 bg-obsidian border border-smoke rounded-[2px] p-7"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-gold text-[12px]">★</span>
                ))}
              </div>

              <p className="font-sans font-light text-ash text-[13px] leading-relaxed mb-6 italic">
                "{review.text}"
              </p>

              <p className="font-cinzel text-[10px] tracking-[0.2em] text-brass uppercase">
                — {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `src/app/page.tsx`**

```tsx
import SocialProofSection from '@/components/sections/SocialProofSection';
// Add after <MembershipSection />:
<SocialProofSection />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/SocialProofSection.tsx src/app/page.tsx
git commit -m "feat: add social proof section with review cards"
```

---

## Task 19: Gift Section

**Files:**
- Create: `src/components/sections/GiftSection.tsx`

- [ ] **Step 1: Create `src/components/sections/GiftSection.tsx`**

```tsx
'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { WHATSAPP_GIFT } from '@/constants/site';

export default function GiftSection() {
  const reducedMotion = useReducedMotion();

  const sectionRef = useScrollAnimation<HTMLElement>((el, gsap) => {
    if (reducedMotion) return;
    gsap.fromTo(
      '.gift-content',
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-obsidian border-t border-smoke">
      <div className="gift-content opacity-0 max-w-2xl mx-auto text-center">
        <p className="font-cinzel text-[10px] tracking-[0.3em] text-brass uppercase mb-6">
          Gift a Session
        </p>

        <h2 className="font-cormorant font-light text-parchment mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
          Give the gift of stillness.
        </h2>

        <p className="font-sans font-light text-ash text-[14px] leading-relaxed mb-10">
          For birthdays, anniversaries, or the person who deserves rest more than
          anyone you know. Gift a session or a membership at Destiny Wellness & Spa.
        </p>

        <a
          href={WHATSAPP_GIFT}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-3 border border-gold text-gold font-sans font-medium text-[11px] tracking-[0.2em] uppercase rounded-[2px] hover:bg-gold hover:text-obsidian transition-all duration-300"
          aria-label="Inquire about gift vouchers at Destiny Wellness & Spa"
        >
          Inquire on WhatsApp
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `src/app/page.tsx`**

```tsx
import GiftSection from '@/components/sections/GiftSection';
// Add after <SocialProofSection />:
<GiftSection />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/GiftSection.tsx src/app/page.tsx
git commit -m "feat: add gift section for occasion/gifting buyer segment"
```

---

## Task 20: Booking Footer

**Files:**
- Create: `src/components/sections/BookingFooter.tsx`

- [ ] **Step 1: Create `src/components/sections/BookingFooter.tsx`**

```tsx
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
        { x: (i) => (i === 0 ? -60 : 60), opacity: 0 },
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
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative">
          <h2
            className="font-cormorant font-light text-parchment mb-4"
            style={{ fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.1 }}
          >
            <span className="cta-headline-left inline-block opacity-0">Begin&nbsp;</span>
            <span className="cta-headline-right inline-block opacity-0">Your Ritual</span>
          </h2>

          <p className="cta-sub opacity-0 font-sans font-light text-ash text-[14px] mb-10 max-w-md mx-auto">
            Book a session. Gift a membership. Arrive as you are.
          </p>

          <div className="cta-buttons opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
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
      <div className="h-[1px] mx-8" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)' }} />

      {/* Bottom footer */}
      <div className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-cinzel text-[13px] tracking-[0.25em] text-champagne uppercase mb-3">DESTINY</p>
            <p className="font-cormorant font-light text-ash text-[15px] italic mb-4">Wellness & Spa</p>
            <p className="font-sans font-light text-ash text-[12px] leading-relaxed">
              {SITE.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-cinzel text-[9px] tracking-[0.2em] text-brass uppercase mb-4">Navigate</p>
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

          {/* Contact */}
          <div>
            <p className="font-cinzel text-[9px] tracking-[0.2em] text-brass uppercase mb-4">Find Us</p>
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

        {/* Copyright */}
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-smoke/50">
          <p className="font-sans text-[11px] text-ash/50 text-center">
            © {new Date().getFullYear()} Destiny Wellness & Spa. Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Final `src/app/page.tsx` assembly**

Replace entire file:
```tsx
import Nav from '@/components/layout/Nav';
import GoldCurtain from '@/components/ui/GoldCurtain';
import HeroSection from '@/components/sections/HeroSection';
import PhilosophySection from '@/components/sections/PhilosophySection';
import TreatmentsSection from '@/components/sections/TreatmentsSection';
import RitualSection from '@/components/sections/RitualSection';
import MembershipSection from '@/components/sections/MembershipSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import GiftSection from '@/components/sections/GiftSection';
import BookingFooter from '@/components/sections/BookingFooter';

export default function Home() {
  return (
    <main>
      <Nav />
      <GoldCurtain />
      <HeroSection />
      <PhilosophySection />
      <TreatmentsSection />
      <RitualSection />
      <MembershipSection />
      <SocialProofSection />
      <GiftSection />
      <BookingFooter />
    </main>
  );
}
```

- [ ] **Step 3: Full page review in browser**

```bash
npm run dev
```
Walk through the full scroll from top to bottom. Check:
- Hero entrance animations play on load
- Gold curtain fires on scroll past hero
- Philosophy lines reveal from alternating sides
- Treatment cards stagger in from right
- Membership deck peels through all 4 tiers
- Reviews fade in
- Gift strip appears
- Footer CTA headline slides in from both sides

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/BookingFooter.tsx src/app/page.tsx
git commit -m "feat: add booking footer, complete full page assembly"
```

---

## Task 21: Mobile Responsiveness Pass

**Files:**
- Modify: All section components as needed

- [ ] **Step 1: Test on mobile viewport**

In browser DevTools, switch to iPhone 14 Pro (390px). Scroll through entire page. Note anything that breaks.

Common fixes to apply:
- Hero H1: Ensure `clamp(48px, 8vw, 88px)` renders correctly at 390px (≈ 48px ✓)
- Membership deck: Cards must not overflow horizontally on mobile
- Trust pillars: Stacks to single column via `grid-cols-1` ✓
- Nav: Hamburger menu opens and closes ✓

- [ ] **Step 2: Fix any overflow issues**

Check for horizontal scroll on mobile:
```bash
# Inspect with DevTools → CSS → check for elements wider than viewport
```
If any element causes horizontal overflow, add `overflow-x: hidden` to `<main>` in `page.tsx`:
```tsx
<main className="overflow-x-hidden">
```

- [ ] **Step 3: Test on iOS Safari (if available)**

GSAP ScrollTrigger on iOS Safari requires the `overscroll-behavior: none` CSS already set via Lenis. Verify smooth scroll works on touch.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: mobile responsiveness pass"
```

---

## Task 22: Static Build & Cloudflare Deployment

**Files:**
- Create: `.gitignore` (update)

- [ ] **Step 1: Add `out/` to `.gitignore`**

Ensure `.gitignore` contains:
```
node_modules/
.next/
out/
.env*.local
.DS_Store
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```
Expected:
- No TypeScript errors
- No build errors
- `out/` directory created with static HTML/CSS/JS
- `out/index.html` exists

- [ ] **Step 3: Test the static build locally**

```bash
npx serve out
```
Open `http://localhost:3000`. Verify:
- All pages load without server
- Images load (WebP from `public/images/optimized/`)
- Fonts load
- WhatsApp links work (format: `https://wa.me/917673996993?text=...`)
- All anchor links scroll correctly (`#treatments`, `#membership`, etc.)

- [ ] **Step 4: Push to GitHub**

```bash
git remote add origin https://github.com/<your-username>/destiny-wellness-spa.git
git push -u origin main
```

- [ ] **Step 5: Configure Cloudflare Pages**

In Cloudflare Pages dashboard:
1. Create new project → Connect to Git → Select `destiny-wellness-spa`
2. Framework preset: **None**
3. Build command: `npm run build`
4. Build output directory: `out`
5. Environment variables → Add: `NODE_VERSION` = `20`
6. Save and deploy

- [ ] **Step 6: Verify deployment**

Open the Cloudflare Pages URL (e.g., `https://destiny-wellness-spa.pages.dev`). Walk through the full page. Confirm all animations run, all images load, all WhatsApp links resolve correctly.

- [ ] **Step 7: Final commit**

```bash
git add .gitignore
git commit -m "chore: finalize .gitignore for static build artifacts"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Dark Luxury aesthetic — Tailwind tokens in Task 2
- [x] Tagline "Where the City Ends, Stillness Begins." — HeroSection Task 11
- [x] 8-section page flow — Tasks 11–20
- [x] Gold Curtain transition — Task 10
- [x] Deck peel membership reveal — Task 17
- [x] Text slice reveal — RevealText Task 9, used in Hero
- [x] Parallax depth layering — RitualSection Task 15, TreatmentsSection Task 14
- [x] All 6 services including Couple Session — site.ts Task 5
- [x] 4 membership tiers with benefits — Task 5 + 16
- [x] WhatsApp as primary CTA (verified number 917673996993) — Task 5
- [x] Gift vouchers section — Task 19
- [x] Lenis smooth scroll — Task 7
- [x] GSAP context/revert pattern — Task 4
- [x] useReducedMotion — Task 4
- [x] Static export for Cloudflare Pages — Task 1
- [x] Image optimization pipeline — Task 6
- [x] Mobile responsiveness — Task 21
- [x] Fonts (Cormorant, DM Sans, Cinzel) — Task 3

**Type consistency verified:**
- `Service` and `Membership` types defined in `constants/site.ts` (Task 5) and used consistently in ServiceCard (Task 13) and MembershipCard (Task 16)
- `useScrollAnimation` hook signature consistent across all usages
- `getWhatsAppUrl` function used for all WhatsApp URLs — no hardcoded strings outside `constants/site.ts`
