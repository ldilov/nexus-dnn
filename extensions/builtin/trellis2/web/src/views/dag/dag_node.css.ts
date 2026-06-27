import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

const pulseGlow = keyframes({
  "0%, 100%": {
    boxShadow: `inset 0 0 0 1px ${vars.color.accent}, 0 0 0 0 ${vars.color.accentGlow}`,
  },
  "50%": {
    boxShadow: `inset 0 0 0 1px ${vars.color.accent}, 0 0 22px 2px ${vars.color.accentGlow}`,
  },
});

const base = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  width: "168px",
  padding: `${vars.space.md} ${vars.space.lg}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surfaceGlassRaised,
  backdropFilter: "blur(16px) saturate(1.2)",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}, ${vars.shadow.subtle}`,
  color: vars.color.text,
  transition: `box-shadow ${vars.motion.normal}, transform ${vars.motion.normal}, opacity ${vars.motion.normal}`,
});

export const node = styleVariants({
  idle: [base, { opacity: 0.82 }],
  active: [
    base,
    {
      transform: "translateY(-2px)",
      animation: `${pulseGlow} 1.8s ease-in-out infinite`,
      "@media": {
        "(prefers-reduced-motion: reduce)": {
          animation: "none",
          boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.glow}`,
        },
      },
    },
  ],
  done: [
    base,
    {
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.success} 55%, transparent), ${vars.shadow.subtle}`,
    },
  ],
  error: [
    base,
    {
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.danger} 70%, transparent), ${vars.shadow.subtle}`,
    },
  ],
});

export const topRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
  marginBottom: "2px",
});

export const step = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  fontVariantNumeric: "tabular-nums",
  letterSpacing: "0.04em",
  color: vars.color.textFaint,
});

const chipBase = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  height: "18px",
  padding: "0 7px",
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.mono,
  fontSize: "0.625rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});

export const chip = styleVariants({
  idle: [
    chipBase,
    {
      background: vars.color.surfaceInset,
      color: vars.color.textFaint,
    },
  ],
  active: [
    chipBase,
    {
      background: `color-mix(in oklab, ${vars.color.accent} 18%, transparent)`,
      color: vars.color.accent,
    },
  ],
  done: [
    chipBase,
    {
      background: `color-mix(in oklab, ${vars.color.success} 16%, transparent)`,
      color: vars.color.success,
    },
  ],
  error: [
    chipBase,
    {
      background: `color-mix(in oklab, ${vars.color.danger} 18%, transparent)`,
      color: vars.color.danger,
    },
  ],
});

const dotPulse = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.4 },
});

const dotBase = style({
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  flexShrink: 0,
});

export const dot = styleVariants({
  idle: [dotBase, { background: vars.color.textFaint }],
  active: [
    dotBase,
    {
      background: vars.color.accent,
      animation: `${dotPulse} 1.5s ease-in-out infinite`,
      "@media": { "(prefers-reduced-motion: reduce)": { animation: "none" } },
    },
  ],
  done: [dotBase, { background: vars.color.success }],
  error: [dotBase, { background: vars.color.danger }],
});

export const label = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: vars.color.text,
});

export const caption = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: "0.02em",
  color: vars.color.textMuted,
});

export const handle = style({
  width: "7px",
  height: "7px",
  background: vars.color.borderGhost,
  border: "none",
});
