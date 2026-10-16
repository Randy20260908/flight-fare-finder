/*
 * Purely decorative, hand-inked scenery for the "sunny departure" theme:
 * clouds, sparkles, a little airliner and two suitcases. Every piece is
 * aria-hidden and pointer-events-none, so it never affects layout logic,
 * focus order or screen readers.
 */

const INK = "var(--ink)";

type DecorProps = { className?: string };

export function Cloud({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 120 64"
      aria-hidden
      focusable="false"
      className={`pointer-events-none select-none ${className ?? ""}`}
    >
      <path
        d="M20 56C8 56 4 46 10 39C6 30 14 21 24 24C26 12 40 6 50 13C56 3 74 2 80 14C92 10 104 18 102 30C114 32 118 46 108 53C106 55 104 56 100 56Z"
        fill="#ffffff"
      />
      <path
        d="M14 50C30 47 50 52 70 48C84 46 96 50 106 48C104 53 102 55 100 55H20C16 55 14 53 14 50Z"
        fill="#d6eef4"
      />
      <path
        d="M20 56C8 56 4 46 10 39C6 30 14 21 24 24C26 12 40 6 50 13C56 3 74 2 80 14C92 10 104 18 102 30C114 32 118 46 108 53C106 55 104 56 100 56Z"
        fill="none"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      className={`pointer-events-none select-none ${className ?? ""}`}
    >
      <path
        d="M12 1C13 8 16 11 23 12C16 13 13 16 12 23C11 16 8 13 1 12C8 11 11 8 12 1Z"
        fill="#ffffff"
        stroke={INK}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Airliner({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 140 70"
      aria-hidden
      focusable="false"
      className={`pointer-events-none select-none ${className ?? ""}`}
    >
      <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        {/* far wing + tailplane sit behind the fuselage */}
        <path d="M58 36H82L64 62H50Z" fill="#1a6f8a" />
        <path d="M16 36H34L26 46H18Z" fill="var(--sun)" />
        <path d="M14 30L6 8H22L38 27Z" fill="var(--sun)" />
        <path
          d="M10 38C10 30 18 26 30 26H104C120 26 132 32 134 38C132 44 120 48 104 48H30C18 48 10 44 10 38Z"
          fill="#ffffff"
        />
        <path d="M30 43H118" stroke="var(--rust)" strokeWidth="3" />
        <path d="M112 30C118 30 124 33 127 36H113Z" fill="var(--sky)" strokeWidth="2" />
      </g>
      <g fill="var(--sky)" stroke={INK} strokeWidth="1.5">
        {[46, 56, 66, 76, 86, 96].map((x) => (
          <circle key={x} cx={x} cy="35" r="3" />
        ))}
      </g>
    </svg>
  );
}

export function Luggage({ className }: DecorProps) {
  return (
    <svg
      viewBox="0 0 150 112"
      aria-hidden
      focusable="false"
      className={`pointer-events-none select-none ${className ?? ""}`}
    >
      <g stroke={INK} strokeLinejoin="round" strokeLinecap="round">
        {/* terracotta duffel-style case */}
        <path d="M34 42C34 30 58 30 58 42" fill="none" strokeWidth="3" />
        <rect x="6" y="42" width="78" height="60" rx="13" fill="var(--rust)" strokeWidth="3" />
        <path d="M28 47V97M62 47V97" strokeWidth="2" opacity="0.45" />
        <path d="M14 54C14 50 16 48 20 48" stroke="#ffffff" strokeWidth="2.5" opacity="0.5" />

        {/* teal roller with telescoping handle */}
        <path d="M104 36V10M130 36V10" fill="none" strokeWidth="3" />
        <rect x="100" y="4" width="34" height="9" rx="4.5" fill="var(--ink)" strokeWidth="2" />
        <rect x="92" y="36" width="50" height="66" rx="10" fill="#2a83a0" strokeWidth="3" />
        <rect
          x="99"
          y="44"
          width="36"
          height="48"
          rx="6"
          fill="none"
          strokeWidth="1.75"
          opacity="0.55"
        />
        <path d="M98 44C98 41 100 40 103 40" stroke="#ffffff" strokeWidth="2.5" opacity="0.5" />
        <circle cx="101" cy="106" r="4.5" fill="var(--ink)" strokeWidth="0" />
        <circle cx="133" cy="106" r="4.5" fill="var(--ink)" strokeWidth="0" />
      </g>
    </svg>
  );
}
