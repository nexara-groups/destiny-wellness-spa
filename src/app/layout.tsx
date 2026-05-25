import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, Cinzel } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/providers/LenisProvider';

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
  preload: true,
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel',
  display: 'swap',
  preload: false,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

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
      <body className="bg-obsidian text-parchment antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
