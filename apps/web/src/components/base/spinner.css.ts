import { keyframes, style, styleVariants } from "@vanilla-extract/css";

const spin = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const spinner = style({
  display: "inline-block",
  flexShrink: 0,
  boxSizing: "border-box",
  borderStyle: "solid",
  borderColor: "color-mix(in oklab, currentColor 22%, transparent)",
  borderTopColor: "currentColor",
  borderRadius: "50%",
  animation: `${spin} 0.8s linear infinite`,
  "@media": {
    // Keep a perceptible loader but ease the cadence for motion-sensitive users.
    "(prefers-reduced-motion: reduce)": {
      animationDuration: "1.6s",
    },
  },
});

export const sizes = styleVariants({
  // audit-allow: px — spinner glyph diameter + ring thickness sub-tokens.
  sm: { width: "14px", height: "14px", borderWidth: "2px" },
  // audit-allow: px — spinner glyph diameter + ring thickness sub-tokens.
  md: { width: "18px", height: "18px", borderWidth: "2px" },
  // audit-allow: px — spinner glyph diameter + ring thickness sub-tokens.
  lg: { width: "26px", height: "26px", borderWidth: "3px" },
});

export const centered = style({
  display: "grid",
  placeItems: "center",
  width: "100%",
});
