import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const row = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: vars.space.gapMd,
  width: "100%",
});

export const label = style({
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
  whiteSpace: "nowrap",
});

export const detail = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  textAlign: "right",
  whiteSpace: "nowrap",
  fontVariantNumeric: "tabular-nums",
});

export const track = style({
  position: "relative",
  width: "100%",
  // audit-allow: px — hairline progress track thickness.
  height: "3px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.bg.hover,
  overflow: "hidden",
});

export const trackThick = style({
  // audit-allow: px — emphasized progress track thickness.
  height: "6px",
});

export const fill = style({
  position: "absolute",
  inset: 0,
  transformOrigin: "left center",
  borderRadius: "inherit",
  backgroundColor: vars.color.accent.accent,
  transition: `transform ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },
});

export const tones = styleVariants({
  accent: { backgroundColor: vars.color.accent.accent },
  ai: { backgroundColor: vars.color.accent.secondary },
  success: { backgroundColor: vars.color.success.base },
  error: { backgroundColor: vars.color.error.base },
});

const slide = keyframes({
  "0%": { transform: "translateX(-100%)" },
  "100%": { transform: "translateX(400%)" },
});

export const indeterminate = style({
  width: "28%",
  inset: 0,
  right: "auto",
  transform: "translateX(-100%)",
  animation: `${slide} 1.15s ${vars.motion.easingDefault} infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      // Fall back to a static partial fill rather than a sliding bar.
      animation: "none",
      width: "100%",
      transform: "none",
      opacity: 0.5,
    },
  },
});
