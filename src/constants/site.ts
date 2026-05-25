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
      "A bespoke blend of techniques tailored to your body's precise needs. No two sessions are the same.",
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
