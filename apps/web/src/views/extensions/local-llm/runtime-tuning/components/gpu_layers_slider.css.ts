import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../../../theme/contract.css";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  fontFamily: vars.font.ui,
  color: vars.color.text.primary,
  width: "100%",
});

export const label = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.secondary,
  letterSpacing: "0.01em",
});

export const row = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapMd,
  width: "100%",
});

export const trackWrapper = style({
  position: "relative",
  flex: 1,
  height: "24px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

export const track = style({
  position: "absolute",
  left: 0,
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  height: "6px",
  borderRadius: vars.radius.full,
  background: vars.color.bg.elevated,
  overflow: "hidden",
  pointerEvents: "none",
});

export const fill = style({
  position: "absolute",
  inset: 0,
  background: vars.color.accent.primary,
  borderRadius: vars.radius.full,
  transformOrigin: "left center",
  transition: `transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  willChange: "transform",
});

export const fillReduced = style({
  transition: "none",
});

export const thumb = style({
  position: "absolute",
  top: "50%",
  width: "24px",
  height: "24px",
  borderRadius: vars.radius.full,
  background: vars.color.accent.primary,
  boxShadow: `0 0 0 4px ${vars.color.shadowElevation}`,
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
  transition: `left ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  willChange: "left",
});

export const thumbReduced = style({
  transition: "none",
});

export const nativeInput = style({
  position: "absolute",
  inset: "-10px 0",
  width: "100%",
  height: "44px",
  margin: 0,
  padding: 0,
  opacity: 0,
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  background: "transparent",
  selectors: {
    "&:focus": {
      outline: "none",
    },
  },
});

export const focusRing = style({
  position: "absolute",
  inset: "-6px -2px",
  borderRadius: vars.radius.full,
  pointerEvents: "none",
  boxShadow: "none",
  transition: `box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
});

globalStyle(`${nativeInput}:focus-visible ~ ${focusRing}`, {
  boxShadow: `0 0 0 2px ${vars.color.accent.primary}`,
});

export const readout = style({
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.space.gapXs,
  minWidth: "7ch",
  justifyContent: "flex-end",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  fontVariantNumeric: "tabular-nums",
});

export const readoutSuffix = style({
  fontWeight: vars.font.weight.regular,
  color: vars.color.text.secondary,
  fontSize: vars.font.size.bodySm,
});

export const hint = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  lineHeight: vars.font.lineHeight.normal,
});
