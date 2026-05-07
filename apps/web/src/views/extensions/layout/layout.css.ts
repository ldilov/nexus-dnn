import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

const spin = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const container = style({
  height: "100%",
  width: "100%",
  overflow: "hidden",
});

export const stateShell = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  gap: vars.density.d4,
  paddingInline: vars.density.padCard,
  paddingBlock: vars.density.padSection,
  textAlign: "center",
});

export const spinner = style({
  // audit-allow: px — fixed spinner geometry below density token granularity
  width: "28px",
  // audit-allow: px — fixed spinner geometry below density token granularity
  height: "28px",
  // audit-allow: px — sub-density 2px stroke for the loader ring
  border: `2px solid ${vars.color.outline.variant}`,
  borderTopColor: vars.color.accent.primary,
  borderRadius: vars.radius.full,
  animation: `${spin} 0.8s linear infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      borderTopColor: vars.color.accent.primary,
    },
  },
});

export const stateEyebrow = style({
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const stateTitle = style({
  margin: 0,
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.heading,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: "-0.01em",
});

export const stateMessage = style({
  margin: 0,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.secondary,
  // audit-allow: px — readable measure cap for body copy in the state shell
  maxWidth: "440px",
});

export const errorTitle = style([
  stateTitle,
  {
    color: vars.color.error.text,
  },
]);
