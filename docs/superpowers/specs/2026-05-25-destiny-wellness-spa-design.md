# Destiny Wellness & Spa — Website Design Spec

**Date:** 2026-05-25  
**Project:** Cinematic luxury spa marketing website  
**Location:** PNB Complex, 4th Floor, Madhurawada, Visakhapatnam 530041  
**Phone:** 7673 996 993  
**Aesthetic:** Dark Luxury — deep blacks, rich golds, cinematic scroll  

---

## 1. Brand Identity

### Logo
Ornate gold "D" with laurel wreath. Already aligns perfectly with the Dark Luxury aesthetic. Used as:
- Primary: Full logo + wordmark in nav and hero
- Watermark: Oversized "D" at 4% opacity centered behind hero content

### Tagline (approved)
> **"Where the City Ends, Stillness Begins."**  
> Sub-headline: *"Crafted for those who have everything except rest."*

### Voice
Premium. Understated. No discounting language. No filler. Every word earns its place. Speak to the guest who has earned rest, not the guest hunting deals.

---

## 2. Visual Design System

### Color Palette
| Token | Name | Hex | Usage |
|---|---|---|---|
| `--obsidian` | Obsidian | `#080808` | Page background, nav base |
| `--charcoal` | Charcoal Depth | `#111111` | Cards, panels |
| `--smoke` | Smoke | `#1A1A1A` | Hover states, dividers |
| `--gold` | Sovereign Gold | `#C9A84C` | Headlines, CTAs, logo echo |
| `--brass` | Antique Brass | `#8B6914` | Borders, inactive states |
| `--champagne` | Champagne | `#E8D5A3` | Shimmer highlights, Platinum tier |
| `--parchment` | Parchment | `#F0EAD6` | Primary body text |
| `--ash` | Ash | `#8A8A8A` | Metadata, captions, secondary labels |
| `--crimson` | Deep Crimson | `#6B1A2A` | "Limited" badges, urgency |

**Contrast floor:** Never use `--ash` (`#8A8A8A`) on any background darker than `#080808` for readable body copy. Minimum 4.6:1 (AA). All body copy uses `--parchment` (`#F0EAD6`) at 11.3:1 — AAA.

### Typography

| Role | Font | Weight | Size (desktop) | Notes |
|---|---|---|---|---|
| Hero H1 | Cormorant Garamond | 300 | 72–96px | tracking: -0.02em, line-height: 1.05 |
| Section H2 | Cormorant Garamond | 400 | 48–56px | |
| Card title | Cormorant Garamond | 600 | 22–26px | |
| Eyebrow | Cinzel | 400 | 11px | uppercase, tracking: 0.25em |
| Price | Cinzel | 400 | 18–24px | color: `--gold` |
| Body | DM Sans | 300 | 15–17px | line-height: 1.7 |
| Caption | DM Sans | 400 | 13px | color: `--ash` |
| Nav links | DM Sans | 400 | 13px | color: `--parchment` at 70% opacity |
| CTA button | DM Sans | 500 | 12px | uppercase, tracking: 0.15em |

**Google Fonts load:** Cormorant Garamond (300, 400, 600, 300italic, 400italic) + DM Sans (300, 400, 500) + Cinzel (400). Use `next/font/google` with `display: 'swap'` and `preload: true` for Cormorant Garamond only.

### Border Radius
`2px` throughout. Deliberately tight — luxury avoids soft corners.

---

## 3. Page Architecture (Single-Page Scroll)

### Section Flow
```
01 → Hero (full-screen, pinned 150vh)
02 → Brand Philosophy (stark, text-only)
03 → Treatments — Three Tiers (stagger cards)
04 → The Ritual — Atmosphere & Trust (image grid)
05 → Membership Tiers (pinned deck peel, 400vh)
06 → Social Proof (Google reviews)
07 → Gift a Session (strip)
08 → Contact & Booking Footer
```

### Section 01 — Hero
- **Layout:** Full viewport. Background: slow ambient image/video of spa, desaturated 60%, color-graded amber. Large "D" watermark at 4% opacity.
- **Nav:** Transparent on load. Logo left. Links center. "Book Now" CTA button right (gold fill, always visible).
- **Content stack (centered):** Eyebrow → H1 → Gold rule (drawn left-to-right) → sub-headline → "Book a Session" CTA
- **Scroll behavior:** Pinned for 150vh. Text floats upward + fades at 80vh. Gold curtain wipes down at end, revealing Section 02.
- **Nav scroll state:** Past 80px → `background: rgba(8,8,8,0.92)` + `backdrop-filter: blur(12px)` + 1px gold bottom border at 30% opacity. Transition: 0.3s ease.

### Section 02 — Brand Philosophy
- **Layout:** Single column. Obsidian background, no imagery. Left vertical gold line (2px, 80px) with lotus SVG at base.
- **Content:** One-sentence brand statement + 2-sentence philosophy + "Our Story —" link
- **Animation:** Each headline line slides from alternating sides (left/right/left). Gold vertical line draws downward in sync.
- **Background detail:** Single ambient gold radial glow drifts rightward, 18s CSS loop. No scroll sync.

### Section 03 — Treatments (Three Tiers)
- **Layout:** Three visual groups stacked vertically. Each group: eyebrow tier label + 1–2 cards.
- **Tier groupings:**
  - Normal: Balinese Massage (₹3,000–5,500) + Aromatherapy (₹2,500–4,500). Background `#111111` + faint marble SVG at 6%.
  - Signature: Signature Massage (₹3,500–6,500). Background `#0D0A04`. Single wide card (520px), left gold accent stripe, "SIGNATURE" vertical watermark at 8%.
  - Premium: Hot Candle Massage + Body Scrubs + **Couple Session** (₹3,500–6,500 base). Background back to `#111111`, flame glow at base. Cards enter from opposite sides simultaneously. Couple Session card gets a special "For Two" badge.
- **Steam bath add-on:** ₹500, shown as dashed-border card alongside Premium tier.
- **Card spec:** 340px wide, 2px radius, 1px border (default `#1F1F1F`, hover `--gold`). Image top 200px with gradient overlay. Hover: `translateY(-8px)` + `box-shadow: 0 20px 60px rgba(201,168,76,0.12)`. Transition: `0.4s cubic-bezier(0.16,1,0.3,1)`.
- **Animation:** Cards stagger in from right with `rotate(2deg → 0deg)`. Background tone deepens per tier.

### Section 04 — The Ritual (Trust)
- **Layout:** 3–4 cinematic images in asymmetric grid. 2–3 icon strips below: hygiene, private rooms, trained therapists.
- **Content:** Philosophy of the spa experience. No price mention. Purely establishes trust before membership ask.
- **Animation:** Images enter with parallax depth layering (3 speed layers).
- **Note:** Therapist credentials + working hours + gender/privacy statement live here.

### Section 05 — Membership Tiers
- **Layout:** Pinned for 400vh. Single card visible at a time, centered (560px wide).
- **Reveal sequence:** Silver (0vh) → Gold (100vh) → Diamond (200vh) → Platinum (300vh).
- **Card exit:** `translateY(-100%) + opacity(0)`. Next card: `scale(0.88 → 1.0) + fadeIn`. 0.2s overlap.
- **Tier visual spec:**

| Tier | Background | Border | Special |
|---|---|---|---|
| Silver | `#1A1A1A` | `#6B6B6B` 1px | Clean minimal |
| Gold | `#1A1A1A` | `#8B6914` 1px | Shimmer border CSS animation |
| Diamond | `#0F0F1A` | `#4A5FB0` 1px + `#C9A84C` 1px outer | Cool-blue flash on entry |
| Platinum | `#0A0A0A` | Animated gradient (`#C9A84C→#E8D5A3→#C9A84C`) | Light sweep across card on entry |

- **Labels:** Gold = "Preferred", Diamond = "Most Popular" badge, Platinum = "Limited" badge in crimson.
- **Pricing (current):**
  - Silver: ₹5,000 / 3 sessions
  - Gold: ₹10,000 / 6 sessions
  - Diamond: ₹15,000 / 9 sessions
  - Platinum: ₹30,000 / 24 sessions
- **Recommended tier benefits** (to differentiate Silver/Gold/Diamond which share ₹1,667/session cost):
  - Silver: Flexible booking, all treatments accessible
  - Gold: + Complimentary steam bath per session, priority slot booking
  - Diamond: + 1 guest session per quarter, dedicated concierge booking
  - Platinum: + Quarterly skin consultation, lowest per-session rate (₹1,250)

### Section 06 — Social Proof
- **Content:** 3–5 real Google review quotes with names + star ratings.
- **Fallback (if no reviews at launch):** Replace with "By appointment only" authority strip + therapist count.

### Section 07 — Gift a Session
- **Layout:** Single-focus strip. Gold accent background variant.
- **Content:** "Give the gift of stillness." + WhatsApp inquire CTA.
- **Purpose:** Captures birthday/anniversary/corporate gifting segment without polluting main booking flow.

### Section 08 — Contact & Booking Footer
- **Top CTA zone (background `#0D0A04`):**
  - Headline: *"Begin Your Ritual"* — Cormorant 64px weight 300, centered
  - Sub: *"Book a session. Gift a membership. Arrive as you are."*
  - Two CTAs: "Book a Session" (gold filled) + "Gift a Session" (gold outlined)
  - Animation: Headline halves slide in from opposite sides on scroll entry.
- **Bottom footer (background `#080808`):**
  - Three columns: Brand (logo + tagline) / Quick links / Contact
  - Address: PNB Complex, 4th Floor, flat no 504, Above Zeeshan Mandi, Car shed Junction, Madhurawada, Visakhapatnam 530041
  - Phone: 7673 996 993 (clickable `tel:` link)
  - Working hours: [TO BE PROVIDED BY CLIENT]
  - Google Maps embed (lazy loaded)
  - 1px gold rule separating top and bottom zones

---

## 4. Cinematic Scroll Techniques

### Technique 1 — Gold Curtain Transition
Used once: Hero → Philosophy. Full-viewport gold (`#C9A84C`) panel drops from top (`scaleY 0→1`, transform-origin: top, 0.7s ease-in-out), holds 0.15s, next section fades in beneath, curtain retracts upward. GSAP `position: fixed` overlay div.

### Technique 2 — Deck Peel (Membership)
Cards stack as z-index deck. Each exits `translateY(-100%) opacity(0)` while next `scale(0.88→1.0) fadeIn`. 0.2s overlap. Pin duration 400vh. Tied to scroll position via `scrub: 1`.

### Technique 3 — Text Slice Reveal
All major section headlines. `overflow: hidden` parent. Text `translateY(100% → 0)` — line by line, stagger 0.08s per line. Text travels, never fades. Supporting copy only uses opacity fade. This distinction is the primary differentiator between cinematic and amateur.

### Technique 4 — Parallax Depth Layering
Three scroll-speed layers per section:
- Layer 0: Grain texture overlay (fixed, CSS only, `opacity: 0.04`)
- Layer 1 at 0.6x: Background ambient glow/gradient
- Layer 2 at 1.0x: Card content (normal scroll)
- Layer 3 at 1.2x: Eyebrow label above section titles

---

## 5. Primary CTAs (Three Only)

| CTA | Placement | Action |
|---|---|---|
| **Book a Session** | Hero (sticky), Nav, Footer | WhatsApp deeplink with pre-filled message |
| **Explore Memberships** | Nav, Section 03 | Smooth scroll to Section 05 |
| **Inquire on WhatsApp** | Gift strip, Footer | WhatsApp deeplink — general inquiry |

**WhatsApp deeplink format:**
```
https://wa.me/917673996993?text=Hi%2C%20I%E2%80%99d%20like%20to%20book%20a%20treatment%20at%20Destiny%20Wellness%20%26%20Spa.
```

No contact forms. No mailto. WhatsApp is the single conversion channel.

---

## 6. Technical Architecture

### Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 3.4 (stable config, not v4)
- **Animation:** GSAP 3 + ScrollTrigger plugin
- **Smooth scroll:** Lenis (integrates natively with GSAP ScrollTrigger)
- **Deployment:** Cloudflare Pages — static export (`output: 'export'`)
- **Images:** Pre-converted WebP via sharp (2400w + 1200w). HEIC source images exist in project root.
- **Fonts:** `next/font/google`

### Deployment Config
```ts
// next.config.ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
```

Cloudflare Pages build settings:
- Build command: `npx next build`
- Output directory: `out`
- Node version: `20` (env var `NODE_VERSION=20`)

### Key Dependencies
```json
{
  "dependencies": {
    "next": "15.x",
    "react": "19.x",
    "react-dom": "19.x",
    "gsap": "3.x",
    "lenis": "latest"
  },
  "devDependencies": {
    "typescript": "5.x",
    "tailwindcss": "3.4.x",
    "sharp": "latest",
    "postcss": "8.x",
    "autoprefixer": "10.x",
    "@types/react": "19.x",
    "@types/node": "22.x"
  }
}
```

### Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Fonts, metadata, GSAPProvider
│   ├── page.tsx            # Composes sections (server component)
│   └── globals.css         # Tailwind directives + CSS custom properties
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── PhilosophySection.tsx
│   │   ├── TreatmentsSection.tsx
│   │   ├── RitualSection.tsx
│   │   ├── MembershipSection.tsx
│   │   ├── SocialProofSection.tsx
│   │   ├── GiftSection.tsx
│   │   └── BookingFooter.tsx
│   ├── ui/
│   │   ├── ParallaxImage.tsx
│   │   ├── RevealText.tsx
│   │   ├── PinnedSection.tsx
│   │   └── GoldCurtain.tsx
│   └── layout/
│       ├── Nav.tsx
│       └── Footer.tsx
├── hooks/
│   ├── useScrollAnimation.ts   # gsap.context().revert() wrapper
│   └── useReducedMotion.ts     # prefers-reduced-motion
├── lib/
│   └── gsap.ts                 # Single GSAP import + plugin registration
└── constants/
    └── site.ts                 # Business info, WhatsApp URL, services data
```

### GSAP Pattern (mandatory)
All animated components are `'use client'`. Single import from `src/lib/gsap.ts`. Every ScrollTrigger created inside `gsap.context()` with `.revert()` on unmount. This prevents accumulation on React remount.

### Image Pipeline
Run once before development:
```bash
npx sharp-cli --input "*.jpg" --output public/images/optimized --format webp --quality 80 --width 2400
npx sharp-cli --input "*.jpg" --output public/images/optimized --format webp --quality 80 --width 1200 --suffix @1x
```

### Reduced Motion
`useReducedMotion()` hook checked in every animated section. If `prefers-reduced-motion: reduce`, render final state immediately with no animation.

---

## 7. Content Checklist (Client Must Provide)

- [ ] Working hours (days + first/last slot time)
- [ ] Therapist credentials (training origin, count, years experience)
- [ ] Privacy & gender policy (private rooms, mixed-gender policy)
- [x] Couple sessions — available. Pricing TBD (add to Section 03 as premium card alongside Hot Candle/Body Scrubs)
- [x] Gift vouchers — available. WhatsApp inquiry path. Featured in Section 07.
- [ ] Google Maps landmark note ("near Rushikonda junction, above [bank]")
- [ ] 3–5 real Google review quotes (name + text + star rating)
- [x] WhatsApp number confirmed active: 7673 996 993
- [ ] High-resolution imagery for The Ritual section (ambient spa photos)

---

## 8. Quality Standards (Non-Negotiable)

- **Readability:** All body copy `#F0EAD6` on dark backgrounds. Minimum 11:1 contrast. No grey text on grey backgrounds.
- **Premiumness:** No rounded corners above 2px. No shadows that look "material design". No gradient buttons except gold-on-black.
- **Performance:** Hero image `loading="eager"` + `fetchPriority="high"`. All below-fold sections lazy loaded via `next/dynamic`.
- **Mobile:** Full experience on mobile — Lenis + GSAP ScrollTrigger both work on touch. Pinned sections tested on iOS Safari.
- **Accessibility:** `useReducedMotion` respected. All images have `alt` text. CTAs have `aria-label`.
- **No filler copy:** Every sentence on the site earns its place. No generic wellness platitudes.
