import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const root = style({
  position: "relative",
  width: "100%",
  minHeight: "360px",
  borderRadius: vars.radius.lg,
  overflow: "hidden",
  background: `radial-gradient(120% 120% at 30% 0%, ${vars.color.surfaceHigh}, ${vars.color.canvas} 70%)`,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const viewer = style({
  display: "block",
  width: "100%",
  height: "100%",
  minHeight: "360px",
  borderRadius: vars.radius.lg,
  background: "transparent",
  outline: "none",
  selectors: {
    "&:focus-visible": { boxShadow: vars.shadow.focusRing },
  },
});

const pulse = keyframes({
  "0%, 100%": { opacity: 0.55 },
  "50%": { opacity: 1 },
});

export const overlay = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.color.textFaint,
  animation: `${pulse} 2.4s ease-in-out infinite`,
  "@media": { "(prefers-reduced-motion: reduce)": { animation: "none" } },
});
