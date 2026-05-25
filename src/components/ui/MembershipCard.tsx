import type { Membership } from '@/constants/site';

interface MembershipCardProps {
  membership: Membership;
}

const TIER_STYLES: Record<
  Membership['id'],
  { bg: string; border: string; labelColor: string; isGradientBorder?: boolean }
> = {
  silver: {
    bg: '#1A1A1A',
    border: '1px solid #6B6B6B',
    labelColor: '#8A8A8A',
  },
  gold: {
    bg: '#1A1A1A',
    border: '1px solid #8B6914',
    labelColor: '#C9A84C',
  },
  diamond: {
    bg: '#0F0F1A',
    border: '1px solid #4A5FB0',
    labelColor: '#A8B8E8',
  },
  platinum: {
    bg: '#0A0A0A',
    border: 'none',
    labelColor: '#E8D5A3',
    isGradientBorder: true,
  },
};

export default function MembershipCard({ membership }: MembershipCardProps) {
  const styles = TIER_STYLES[membership.id];
  const perSession = Math.round(membership.price / membership.sessions);

  const cardStyle: React.CSSProperties = styles.isGradientBorder
    ? {
        background: styles.bg,
        position: 'relative',
      }
    : {
        background: styles.bg,
        border: styles.border,
      };

  return (
    <article
      className="relative rounded-sm p-6 md:p-10"
      style={{ maxWidth: 560, margin: '0 auto', width: '100%', ...cardStyle }}
    >
      {/* Gradient border for platinum */}
      {styles.isGradientBorder && (
        <div
          className="absolute inset-0 rounded-sm pointer-events-none"
          style={{
            padding: '1px',
            background: 'linear-gradient(135deg, #C9A84C, #E8D5A3, #C9A84C)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          aria-hidden="true"
        />
      )}

      {/* Badge */}
      {membership.badge && (
        <span
          className="inline-block font-cinzel text-[9px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm mb-4"
          style={
            membership.badge.variant === 'popular'
              ? { background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }
              : { background: 'rgba(107,26,42,0.2)', color: '#E87878', border: '1px solid rgba(107,26,42,0.4)' }
          }
        >
          {membership.badge.text}
        </span>
      )}

      {/* Label */}
      <p
        className="font-cinzel text-[10px] tracking-[0.3em] uppercase mb-2"
        style={{ color: styles.labelColor }}
      >
        {membership.label}
      </p>

      {/* Name */}
      <h3
        className="font-cormorant font-light text-parchment mb-6"
        style={{ fontSize: 'clamp(28px, 4vw, 36px)' }}
      >
        {membership.name}
      </h3>

      {/* Price */}
      <div className="mb-2">
        <span className="font-cinzel text-2xl text-gold">
          ₹{membership.price.toLocaleString('en-IN')}
        </span>
      </div>
      <p className="text-ash text-[12px] mb-6">
        {membership.sessions} sessions · ₹{perSession.toLocaleString('en-IN')} per session
      </p>

      {/* Divider */}
      <div
        className="h-[1px] mb-6"
        style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)' }}
      />

      {/* Benefits */}
      <ul className="space-y-3 mb-8">
        {membership.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 text-[13px] text-parchment">
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
        className="inline-flex items-center justify-center w-full py-3 font-cinzel font-medium text-[11px] tracking-[0.15em] uppercase rounded-sm transition-opacity duration-200 hover:opacity-85"
        style={
          membership.id === 'silver'
            ? { border: '1px solid rgba(201,168,76,0.6)', color: '#C9A84C' }
            : { background: '#C9A84C', color: '#080808' }
        }
        aria-label={`Join ${membership.name} membership`}
      >
        Join {membership.name}
      </a>
    </article>
  );
}
