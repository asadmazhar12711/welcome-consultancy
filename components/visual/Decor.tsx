/** Decorative SVG atmospheres — brand navy/gold line art */

export function TradeRouteLines({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 400"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 220C180 80 320 320 480 180C640 40 760 300 920 160C1040 60 1120 200 1160 140"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeOpacity="0.35"
        strokeDasharray="6 10"
      />
      <path
        d="M20 280C160 160 300 340 460 240C620 140 780 320 940 200C1060 120 1140 260 1180 220"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.2"
      />
      <circle cx="180" cy="140" r="4" fill="currentColor" fillOpacity="0.45" />
      <circle cx="480" cy="180" r="5" fill="currentColor" fillOpacity="0.55" />
      <circle cx="920" cy="160" r="4" fill="currentColor" fillOpacity="0.45" />
      <circle cx="760" cy="280" r="3" fill="currentColor" fillOpacity="0.35" />
    </svg>
  );
}

export function GoldOrb({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full bg-gold-muted blur-[90px] ${className}`}
      aria-hidden
    />
  );
}

export function GridMesh({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 opacity-[0.35] ${className}`}
      aria-hidden
      style={{
        backgroundImage: `
          linear-gradient(color-mix(in srgb, var(--border-subtle) 80%, transparent) 1px, transparent 1px),
          linear-gradient(90deg, color-mix(in srgb, var(--border-subtle) 80%, transparent) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
      }}
    />
  );
}
