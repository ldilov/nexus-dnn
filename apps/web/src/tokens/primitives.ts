export const color = {
  navy: {
    50: "#E8EEF8",
    100: "#A8B3C7",
    200: "#718096",
    300: "#334155",
    400: "#253041",
    500: "#212C3A",
    600: "#1B2430",
    700: "#151C24",
    800: "#0F141B",
    900: "#0B0F14",
  },
  blue: {
    400: "#5EA1FF",
    500: "#4A8FE8",
    600: "#3A7BD4",
  },
  violet: {
    400: "#7C5CFF",
    500: "#6B4FE0",
    600: "#5A42C0",
  },
  cyan: {
    400: "#21C7D9",
    500: "#1AB3C4",
    600: "#158FA0",
  },
  green: {
    400: "#22C55E",
    500: "#1DAF52",
    600: "#189A47",
  },
  amber: {
    400: "#F5B942",
    500: "#E0A838",
    600: "#C9952F",
  },
  red: {
    400: "#F05D5E",
    500: "#D94F50",
    600: "#C24344",
  },
  slate: {
    400: "#94A3B8",
    500: "#7C8B9E",
  },
  modality: {
    image: "#B57CFF",
    video: "#21C7D9",
    audio: "#34D399",
    text: "#F5B942",
    model: "#5EA1FF",
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
    ui: "'Geist', 'Inter', system-ui, -apple-system, sans-serif",
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
