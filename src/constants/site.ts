export const SITE = {
  name: 'Destiny Wellness & Spa',
  tagline: 'Silence, four floors up.',
  subTagline: 'One hour here earns you back the rest of the week.',
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
  "Hi, I'd like to send a gift voucher from Destiny Wellness & Spa."
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
  detail: {
    feel: string;
    bestFor: string[];
    benefits: string[];
    pressure: string;
    recommendedDuration: string;
    goodToKnow: string;
  };
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
      'Built for long desk hours and longer commutes. Flowing strokes, careful stretching, and focused pressure on the places you actually carry tension.',
    detail: {
      feel:
        'A steady full-body massage with flowing strokes, gentle stretching, and focused work on tired areas. It feels grounding rather than intense, making it easy to settle in even if this is your first spa visit.',
      bestFor: [
        'Busy workdays around Madhurawada and the Vizag IT corridor',
        'General body fatigue, travel tiredness, and stiff shoulders',
        'Guests who want a complete reset without very deep pressure',
      ],
      benefits: [
        'The body feels lighter before you are halfway dressed',
        'The kind of tired-but-good that gets you to sleep before 10',
        'Start here if you have never had a massage before — the therapist will calibrate to you',
      ],
      pressure: 'Medium, adjusted to comfort',
      recommendedDuration: '90 minutes for a full reset; 60 minutes if you are short on time.',
      goodToKnow:
        'Tell the therapist if you prefer softer pressure on the neck, lower back, or calves.',
    },
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
      'Slower, softer, and built around scent. Choose this when your head is heavier than your body — after screens, traffic, and a day that would not stop.',
    detail: {
      feel:
        'A softer, slower massage built around aromatic oils and calm pacing. The experience is quiet, breathable, and sensory, ideal when you want to switch off more than work through heavy knots.',
      bestFor: [
        'Guests looking for calm after traffic, screens, and city noise',
        'Light body tiredness with mental fatigue',
        'First-time spa visitors who prefer gentle pressure',
      ],
      benefits: [
        'Within ten minutes the nervous system genuinely quiets — not just relaxes',
        'Leaves the skin feeling nourished and lightly scented',
        'The scent stays with you — quiet, not overpowering. Most guests sleep better the same night.',
      ],
      pressure: 'Light to medium',
      recommendedDuration: '60 minutes for relaxation; 90 minutes for deeper unwinding.',
      goodToKnow:
        'Share any fragrance sensitivity before the session so the oil choice can be kept subtle.',
    },
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
      'Melted massage candle oil, warm and slow. Skin feels nourished; tension melts before you realise it has gone. The evening appointment, done right.',
    detail: {
      feel:
        'A warm, slow massage using melted massage candle oil. The warmth makes the session feel indulgent and comforting, especially for guests who enjoy heat-based relaxation.',
      bestFor: [
        'Evening appointments after long work or travel days',
        'Guests who enjoy warmth, oil, and a softer luxury feel',
        'Dry-feeling skin that needs a more nourishing ritual',
      ],
      benefits: [
        'Leaves the skin feeling soft and moisturised',
        'Warmth helps the body ease into relaxation',
        'Feels premium without needing very strong pressure',
      ],
      pressure: 'Medium, with warm oil comfort',
      recommendedDuration: '90 minutes for a richer experience; 120 minutes for a slow premium ritual.',
      goodToKnow:
        'Not ideal if you dislike warm oil or prefer a dry, high-pressure massage.',
    },
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
      "Your skin takes a beating in Vizag's heat — dust, sweat, salt air. This scrub removes a week of it. Book it before an event, or just when you want to feel clean in a way a shower cannot reach.",
    detail: {
      feel:
        'A polishing body ritual with careful exfoliation followed by a refreshed, clean finish. It feels more like skin renewal than a classic massage, with light pressure and attention to comfort.',
      bestFor: [
        'Guests preparing for an event, trip, or weekend plan in Vizag',
        'Dull, tired-feeling skin from heat, sweat, and daily exposure',
        'Anyone who wants freshness and glow rather than muscle work',
      ],
      benefits: [
        'Helps skin feel smoother and fresher',
        'Creates a clean, renewed feeling from head to toe',
        'Pairs well before a massage or steam bath add-on',
      ],
      pressure: 'Light exfoliation pressure',
      recommendedDuration: '60 minutes is usually enough; 90 minutes for an unhurried ritual.',
      goodToKnow:
        'Avoid booking immediately after shaving, waxing, or if your skin is irritated.',
    },
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
      'You tell the therapist two things: where you carry the most tension, and how much pressure you want. They handle the rest. No fixed routine, no guesswork.',
    detail: {
      feel:
        'A tailored house massage where the therapist changes pace, pressure, and focus areas based on what your body needs that day. It can be calm, firm, or balanced depending on your preference.',
      bestFor: [
        'Regular spa guests who know where they carry tension',
        'Desk posture, driving fatigue, and uneven body tiredness',
        'Anyone who wants a more personalised session than a fixed routine',
      ],
      benefits: [
        'Focuses time on the areas that matter most to you',
        'Balances relaxation with targeted pressure',
        'Works well as a monthly maintenance ritual',
      ],
      pressure: 'Custom, from medium to firm',
      recommendedDuration: '90 minutes for the best balance of focus and full-body flow.',
      goodToKnow:
        'Before the session, mention your top two focus areas so the therapist can plan the flow.',
    },
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
      'Book any treatment, any day — no restrictions',
      'Change or reschedule up to 4 hours before',
      'Six months to use all three sessions',
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
      'Preferred scheduling — your day and time held on request',
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
      'A single WhatsApp contact — no hold times, no front-desk queue',
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
      '30-minute skin and treatment review with a senior therapist each quarter',
      '₹1,250 per session — 25% below walk-in',
    ],
    whatsappUrl: getWhatsAppUrl("Hi, I'd like to join the Platinum membership at Destiny Wellness & Spa."),
  },
];
