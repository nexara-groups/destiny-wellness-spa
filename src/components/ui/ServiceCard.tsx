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
    <article className="group relative bg-charcoal border border-smoke rounded-sm overflow-hidden transition-all duration-[400ms] ease-in-out hover:-translate-y-2 hover:border-gold hover:shadow-[0_20px_60px_rgba(201,168,76,0.12)]">
      {/* Image area */}
      <div className="relative h-48 overflow-hidden">
        {imageSlot ?? (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1208] to-[#2d1e0a]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal" />
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
        <p className="text-ash text-[13px] leading-relaxed mb-4 line-clamp-3">
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
          <p className="text-[11px] text-ash/60 mt-3">
            + ₹500 steam bath add-on available
          </p>
        )}
      </div>
    </article>
  );
}
