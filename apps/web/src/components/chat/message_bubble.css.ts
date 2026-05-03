import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const row = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  maxWidth: "80%",
});

export const rowUser = style({ alignSelf: "flex-end", alignItems: "flex-end" });
export const rowAssistant = style({ alignSelf: "flex-start", alignItems: "flex-start" });
export const rowSystem = style({
  alignSelf: "stretch",
  maxWidth: "100%",
  alignItems: "stretch",
});

export const eyebrow = style({
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: vars.color.accent.secondary,
});

export const bubble = style({
  paddingBlock: vars.density.d3,
  paddingInline: vars.density.d4,
  borderRadius: vars.radius.card,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  lineHeight: vars.font.lineHeight.relaxed,
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
});

export const bubbleUser = style({
  background: vars.color.bg.bright,
  color: vars.color.text.primary,
});

export const bubbleAssistant = style({
  background: "transparent",
  color: vars.color.text.primary,
  paddingInline: 0,
});

export const bubbleSchemaMismatch = style({
  background: `color-mix(in oklab, ${vars.color.warning.base} 12%, transparent)`,
  color: vars.color.warning.text,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
});

export const bubbleFailed = style({
  background: `color-mix(in oklab, ${vars.color.error.base} 18%, transparent)`,
  color: vars.color.error.text,
});

const blink = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.3 },
});

export const cursor = style({
  display: "inline-block",
  width: "0.6em",
  height: "1em",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  marginInlineStart: "2px",
  background: vars.color.accent.secondary,
  verticalAlign: "text-bottom",
  animation: `${blink} 0.9s ease-in-out infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 0.6,
    },
  },
});

export const meta = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const retryBtn = style({
  background: "transparent",
  border: "none",
  color: vars.color.accent.primary,
  cursor: "pointer",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  padding: 0,
  ":hover": { color: vars.color.accent.primaryHover },
});
