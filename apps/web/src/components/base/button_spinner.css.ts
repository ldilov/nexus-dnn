import { keyframes, style } from "@vanilla-extract/css";

const spin = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const spinner = style({
  display: "inline-block",
  // audit-allow: px — spinner glyph size sub-token.
  width: "14px",
  // audit-allow: px — spinner glyph size sub-token.
  height: "14px",
  // audit-allow: px — spinner border thickness sub-token.
  border: "2px solid color-mix(in oklab, currentColor 25%, transparent)",
  borderTopColor: "currentColor",
  borderRadius: "50%",
  animation: `${spin} 0.8s linear infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});
