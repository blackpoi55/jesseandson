import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ---------- Tailoring line icons (drawn for this site) ---------- */

export function ScissorsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <g {...line}>
        <circle cx="13" cy="36" r="6" />
        <circle cx="35" cy="36" r="6" />
        <path d="M17 31.5 32 6M31 31.5 16 6" />
        <circle cx="24" cy="19" r="1" />
      </g>
    </svg>
  );
}

export function FabricIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <g {...line}>
        <ellipse cx="14" cy="24" rx="7" ry="13" />
        <ellipse cx="14" cy="24" rx="2.5" ry="4.5" />
        <path d="M14 11h20c4 0 7 6 7 13s-3 13-7 13H14" />
        <path d="M41 30c2 3 3 8 1 11H24" />
      </g>
    </svg>
  );
}

export function JacketIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M18 5 8 10 5 42h14l5-17 5 17h14l-3-32-10-5" />
        <path d="M18 5l6 20 6-20" />
        <path d="M18 5l-4 9 5 4-3 6M30 5l4 9-5 4 3 6" />
        <path d="M24 30v.01M24 35v.01" />
        <path d="M33 21h5" />
      </g>
    </svg>
  );
}

export function DiamondIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M13 8h22l8 11-19 22L5 19z" />
        <path d="M5 19h38M18 8l-5 11 11 22 11-22-5-11M13 19l11-11 11 11" />
      </g>
    </svg>
  );
}

export function NeedleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M39 6 10 35l-3 7 7-3L43 10z" />
        <path d="M35 10l3 3" />
        <path d="M37 8c-10 4-26 14-30 27 6 3 16 1 22-6" strokeDasharray="2 3" />
      </g>
    </svg>
  );
}

export function TapeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <g {...line}>
        <circle cx="20" cy="22" r="14" />
        <circle cx="20" cy="22" r="4" />
        <path d="M34 22v16h9v-7" />
        <path d="M37 38v-3M40 38v-3" />
      </g>
    </svg>
  );
}

export function ButtonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <g {...line}>
        <circle cx="24" cy="24" r="17" />
        <circle cx="24" cy="24" r="12" />
        <circle cx="20" cy="20" r="1.5" />
        <circle cx="28" cy="20" r="1.5" />
        <circle cx="20" cy="28" r="1.5" />
        <circle cx="28" cy="28" r="1.5" />
      </g>
    </svg>
  );
}

export function HangerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M20 12a4 4 0 1 1 4 4v4L5 34c-2 1-1 4 1 4h36c2 0 3-3 1-4L24 20" />
      </g>
    </svg>
  );
}

export function ShoeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M4 34V19c4 0 7 2 9 5 3 3 8 3 11 1l6-4c6 4 14 6 14 11v2z" />
        <path d="M4 38h40v-4H4z" />
        <path d="M16 25l2-3M20 26l2-3M24 25l2-3" />
      </g>
    </svg>
  );
}

/* ---------- Social & messaging marks ---------- */

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.6l.4-3.1h-3V8.5c0-.9.3-1.5 1.6-1.5h1.6V4.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H7.9v3.1h2.6V21z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function LineIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <mask id="line-knockout">
        <rect width="24" height="24" fill="#fff" />
        <text
          x="12"
          y="13.1"
          textAnchor="middle"
          fontSize="5.1"
          fontWeight="700"
          fontFamily="Arial, Helvetica, sans-serif"
          fill="#000"
        >
          LINE
        </text>
      </mask>
      <path
        mask="url(#line-knockout)"
        fill="currentColor"
        d="M12 3C6.48 3 2 6.6 2 11.05c0 3.99 3.55 7.33 8.35 7.96.33.07.77.22.88.5.1.25.07.64.03.9l-.14.85c-.04.25-.2 1 .87.54 1.08-.45 5.8-3.42 7.92-5.85C21.37 14.34 22 12.77 22 11.05 22 6.6 17.52 3 12 3z"
      />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.5a9.4 9.4 0 0 0-8.1 14.2L2.5 21.5l4.9-1.3A9.4 9.4 0 1 0 12 2.5zm0 17.2c-1.4 0-2.9-.4-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3a7.8 7.8 0 1 1 6.7 3.6zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.4 6.4 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.2.1-.2 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1c0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3z" />
    </svg>
  );
}

export function TripAdvisorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z" />
    </svg>
  );
}

export function GoogleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.2-2.7l-3.5-2.7c-1 .7-2.2 1-3.7 1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.2a11 11 0 0 0 0 9.8z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.1-3.1A11 11 0 0 0 2.2 7.1l3.6 2.8C6.7 7.3 9.1 5.4 12 5.4z" />
    </svg>
  );
}
