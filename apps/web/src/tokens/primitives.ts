export const color = {
  surface: {
    base: "#0c0e10",
    containerLowest: "#000000",
    containerLow: "#111416",
    container: "#1c2025",
    containerHigh: "#262a30",
    containerHighest: "#31353b",
    bright: "#36393f",
    variant: "#31353b",
  },
  onSurface: {
    base: "#e0e2ea",
    variant: "#c1c6d4",
  },
  primary: {
    base: "#ba9eff",
    dim: "#8455ef",
    container: "#6a3de8",
    onPrimary: "#1c0062",
  },
  secondary: {
    base: "#9093ff",
    container: "#4816cb",
    onSecondary: "#1c0062",
  },
  tertiary: {
    base: "#ff8439",
    container: "#5a3200",
  },
  acidGreen: "#22C55E",
  error: {
    base: "#ff6e84",
    container: "#93000a",
  },
  warning: {
    base: "#F5B942",
    text: "#fef3c7",
  },
  outline: {
    base: "#8b919d",
    variant: "#414752",
  },
  modality: {
    image: "#B57CFF",
    video: "#21C7D9",
    audio: "#34D399",
    text: "#F5B942",
    model: "#ba9eff",
    system: "#94A3B8",
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
    headline: "'Space Grotesk', system-ui, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    code: "'JetBrains Mono', 'Fira Code', monospace",
  },
  size: {
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
