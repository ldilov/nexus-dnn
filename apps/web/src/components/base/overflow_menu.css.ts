import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const wrap = style({
  position: "relative",
  display: "inline-block",
});

const menuReveal = keyframes({
  from: {
    opacity: 0,
    // audit-allow: px — sub-token reveal travel, no density token at this step
    transform: "translateY(-4px)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
});

export const menu = style({
  position: "absolute",
  // audit-allow: px — sub-token gap below the trigger, no density token at this step
  top: "calc(100% + 6px)",
  right: 0,
  zIndex: vars.z.dropdown,
  minWidth: "12rem",
  padding: vars.density.d1,
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d1,
  borderRadius: vars.radius.card,
  // Glass over content: semi-transparent surface lifted off the bar with a
  // backdrop blur, matching the house float treatment.
  backgroundColor: `${vars.color.bg.elevated}e6`,
  boxShadow: vars.shadow.lg,
  // audit-allow: px — glass blur per design spec, matches sidebar float variant
  backdropFilter: "blur(20px) saturate(1.2)",
  // audit-allow: px — glass blur per design spec, matches sidebar float variant
  WebkitBackdropFilter: "blur(20px) saturate(1.2)",
  animation: `${menuReveal} ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const item = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
  width: "100%",
  textAlign: "left",
  padding: `${vars.density.d2} ${vars.density.d3}`,
  borderRadius: vars.radius.control,
  background: "transparent",
  border: "none",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  lineHeight: vars.font.lineHeight.tight,
  color: vars.color.text.primary,
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.bg.hover,
    },
    "&:active:not(:disabled)": {
      background: vars.color.bg.lowest,
    },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
      outlineOffset: `calc(-1 * ${vars.focus.ringWidth})`,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

export const itemDanger = style({
  color: vars.color.error.base,
  selectors: {
    "&:hover:not(:disabled)": {
      background: `${vars.color.error.base}1f`,
      color: vars.color.error.text,
    },
    "&:active:not(:disabled)": {
      background: `${vars.color.error.base}33`,
    },
  },
});

export const itemIcon = style({
  // audit-allow: px — icon size, matches host action-button glyph
  fontSize: "18px",
  flexShrink: 0,
});

export const triggerIcon = style({
  // audit-allow: px — icon size, matches host action-button glyph
  fontSize: "20px",
});
