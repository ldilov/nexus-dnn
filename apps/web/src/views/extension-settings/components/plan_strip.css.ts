import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "../../../theme/contract.css";

const segPulse = keyframes({
  "0%": { opacity: 1 },
  "50%": { opacity: 0.55 },
  "100%": { opacity: 1 },
});

export const strip = style({
  display: "flex",
  gap: vars.space.gapXs,
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "6px",
});

export const seg = style({
  flex: 1,
  minWidth: 0,
  // audit-allow: px — below minimum token granularity (sub-10px)
  borderRadius: "3px",
  background: vars.color.bg.elevated,
});

export const segPending = style({});

export const segOk = style({
  background: `color-mix(in oklch, ${vars.color.success.base} 60%, transparent)`,
});

export const segRunning = style({
  background: vars.color.accent.accent,
  // audit-allow: px — below minimum token granularity (sub-10px)
  boxShadow: `0 0 8px ${vars.color.accent.accentGlow}`,
  animation: `${segPulse} 1.5s ease-in-out infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});

export const segFail = style({
  background: vars.color.error.base,
});

export const segPartial = style({
  background: `color-mix(in oklch, ${vars.color.accent.accent} 45%, transparent)`,
});
