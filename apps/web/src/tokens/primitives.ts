export const color = {
  surface: {
    base: "#0c0e10",
    containerLowest: "#000000",
    containerLow: "#111416",
    container: "#171a1c",
    containerHigh: "#1d2023",
    containerHighest: "#232629",
    bright: "#292c30",
    variant: "#232629",
  },
  onSurface: {
    base: "#f0f0f3",
    variant: "#aaabae",
  },
  primary: {
    base: "#ba9eff",
    dim: "#8455ef",
    container: "#6D28D9",
    onPrimary: "#39008c",
  },
  secondary: {
    base: "#9093ff",
    dim: "#6063ee",
    container: "#2f2ebe",
    onSecondary: "#080079",
  },
  tertiary: {
    base: "#ff8439",
    dim: "#fd761a",
    container: "#7C2D12",
    onTertiary: "#471a00",
  },
  acidGreen: "#22C55E",
  error: {
    base: "#ff6e84",
    container: "#7F1D1D",
  },
  warning: {
    base: "#F59E0B",
    text: "#FEF3C7",
  },
  outline: {
    base: "#747578",
    variant: "#46484a",
  },
  modality: {
    image: "#A78BFA",
    video: "#21C7D9",
    audio: "#34D399",
    text: "#F59E0B",
    model: "#ba9eff",
    system: "#94A3B8",
  },
  neon: {
    cyan: "#22D3EE",
    cyanDim: "#0891B2",
    pink: "#F472B6",
    pinkDim: "#DB2777",
    magenta: "#E879F9",
    lime: "#A3E635",
  },
} as const;

export const spacing = {
  0: "0px",
  1: "2px",
  2: "4px",
  3: "6px",
  4: "8px",
  5: "10px",
  6: "12px",
  8: "16px",
  10: "20px",
  12: "24px",
  16: "32px",
  20: "40px",
  24: "48px",
} as const;

export const radii = {
  2: "2px",
  4: "4px",
  6: "6px",
  8: "8px",
  10: "10px",
  12: "12px",
  14: "14px",
  16: "16px",
  full: "9999px",
} as const;

export const typography = {
  family: {
    headline: "'Sora', 'Space Grotesk', system-ui, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    code: "'JetBrains Mono', 'Fira Code', monospace",
  },
  size: {
    10: "0.625rem",
    11: "0.6875rem",
    12: "0.75rem",
    13: "0.8125rem",
    14: "0.875rem",
    16: "1rem",
    20: "1.25rem",
    24: "1.5rem",
    32: "2rem",
  },
  weight: {
    400: "400",
    500: "500",
    600: "600",
    700: "700",
    900: "900",
  },
  lineHeight: {
    1.0: "1",
    1.2: "1.2",
    1.4: "1.4",
    1.5: "1.5",
    1.6: "1.6",
  },
} as const;

export const motion = {
  duration: {
    instant: "100ms",
    fast: "150ms",
    normal: "250ms",
    slow: "400ms",
    slower: "600ms",
  },
  easing: {
    default: "cubic-bezier(0.2, 0, 0, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },
} as const;

export const density = {
  compact: {
    d1: "2px", d2: "6px", d3: "8px", d4: "12px",
    d5: "14px", d6: "16px", d7: "22px", d8: "32px", d9: "48px",
    padCard: "16px", padSection: "22px", rowH: "44px", gapCard: "10px",
  },
  cozy: {
    d1: "4px", d2: "8px", d3: "12px", d4: "16px",
    d5: "20px", d6: "24px", d7: "32px", d8: "44px", d9: "64px",
    padCard: "22px", padSection: "28px", rowH: "52px", gapCard: "14px",
  },
  spacious: {
    d1: "6px", d2: "10px", d3: "16px", d4: "22px",
    d5: "28px", d6: "36px", d7: "48px", d8: "64px", d9: "96px",
    padCard: "32px", padSection: "44px", rowH: "64px", gapCard: "20px",
  },
} as const;

export const cardStyle = {
  flat: {
    bg: "var(--color-surface-container-low)",
    border: "none",
    shadow: "none",
    backdrop: "none",
  },
  glass: {
    bg: "rgba(29, 32, 35, 0.62)",
    border: "1px solid rgba(186, 158, 255, 0.08)",
    shadow: "0 4px 16px rgba(0, 0, 0, 0.32)",
    backdrop: "blur(20px) saturate(1.2)",
  },
  elevated: {
    bg: "var(--color-surface-container-high)",
    border: "1px solid rgba(70, 72, 74, 0.22)",
    shadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
    backdrop: "none",
  },
} as const;

export const accentMode = {
  primary: {
    accent: "#ba9eff",
    accentDim: "#8455ef",
    accentGlow: "rgba(132, 85, 239, 0.27)",
  },
  secondary: {
    accent: "#9093ff",
    accentDim: "#6063ee",
    accentGlow: "rgba(96, 99, 238, 0.32)",
  },
  tertiary: {
    accent: "#ff8439",
    accentDim: "#fd761a",
    accentGlow: "rgba(253, 118, 26, 0.28)",
  },
} as const;
