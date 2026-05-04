import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/tokens.css";

const recordPulse = keyframes({
  "0%, 100%": { transform: "scale(1)", opacity: 0.85 },
  "50%": { transform: "scale(1.18)", opacity: 1 },
});

const ringPulse = keyframes({
  "0%": {
    boxShadow: "0 0 0 0 color-mix(in oklab, var(--etts-danger, #ef4444) 45%, transparent)",
  },
  "70%": {
    boxShadow: "0 0 0 16px color-mix(in oklab, var(--etts-danger, #ef4444) 0%, transparent)",
  },
  "100%": {
    boxShadow: "0 0 0 0 color-mix(in oklab, var(--etts-danger, #ef4444) 0%, transparent)",
  },
});

export const backdrop = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: vars.space.lg,
  zIndex: 80,
  backdropFilter: "blur(8px) saturate(1.1)",
});

export const dialog = style({
  background: vars.color.surfaceHigh,
  color: vars.color.text,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.raised,
  width: "min(420px, 100%)",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  padding: vars.space.xl,
});

export const heading = style({
  margin: 0,
  fontFamily: vars.font.display,
  fontSize: vars.text.subhead,
  fontWeight: 600,
});

export const lede = style({
  margin: 0,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const recordOrb = style({
  alignSelf: "center",
  width: "96px",
  height: "96px",
  borderRadius: vars.radius.pill,
  border: `2px solid ${vars.color.borderSubtle}`,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: vars.font.mono,
  fontSize: vars.text.head,
  color: vars.color.textMuted,
  background: vars.color.surfaceMuted,
  selectors: {
    "&[data-state='recording']": {
      borderColor: vars.color.danger,
      color: vars.color.danger,
      animation: `${ringPulse} 1.4s ease-in-out infinite`,
      "@media": {
        "(prefers-reduced-motion: reduce)": {
          animation: "none",
          boxShadow: `0 0 0 8px color-mix(in oklab, ${vars.color.danger} 18%, transparent)`,
        },
      },
    },
    "&[data-state='ready']": {
      borderColor: `color-mix(in oklab, ${vars.color.accent} 60%, transparent)`,
      color: vars.color.accent,
    },
  },
});

export const transport = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  flexWrap: "wrap",
  justifyContent: "center",
});

export const btn = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 600,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  background: "transparent",
  color: vars.color.text,
  border: `1px solid ${vars.color.borderSubtle}`,
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, border-color ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      borderColor: vars.color.accent,
      color: vars.color.accent,
    },
    "&[data-tone='danger']": {
      background: vars.color.danger,
      color: vars.color.accentOn,
      border: "none",
    },
    "&[data-tone='accent']": {
      background: vars.color.accent,
      color: vars.color.accentOn,
      border: "none",
    },
    "&[disabled]": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

export const label = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const labelInput = style({
  appearance: "none",
  background: vars.color.surfaceMuted,
  color: vars.color.text,
  padding: `${vars.space.sm} ${vars.space.md}`,
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  outline: "none",
  selectors: {
    "&:focus": {
      borderColor: vars.color.accent,
    },
  },
});

export const error = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.danger,
});

export const elapsed = style({
  textAlign: "center",
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  color: vars.color.textMuted,
});

export const audioPreview = style({
  width: "100%",
});

export const redDot = style({
  display: "inline-block",
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  background: vars.color.danger,
  flexShrink: 0,
  selectors: {
    '[data-active="true"] &': {
      animation: `${recordPulse} 1.2s ease-in-out infinite`,
      "@media": {
        "(prefers-reduced-motion: reduce)": {
          animation: "none",
        },
      },
    },
  },
});

export const stopSquare = style({
  display: "inline-block",
  width: "10px",
  height: "10px",
  background: "currentColor",
  flexShrink: 0,
});

export const footer = style({
  display: "flex",
  justifyContent: "space-between",
  gap: vars.space.sm,
  flexWrap: "wrap",
});
