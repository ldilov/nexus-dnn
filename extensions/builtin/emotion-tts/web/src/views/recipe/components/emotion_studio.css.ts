import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "contents",
});

export const radarColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  alignItems: "center",
});

export const controlColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  minWidth: 0,
});

export const modeBar = style({
  display: "inline-flex",
  alignSelf: "flex-start",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "2px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "4px",
  borderRadius: vars.radius.pill,
  background: vars.color.surface,
});

export const modeButton = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 600,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  ":hover": {
    color: vars.color.text,
  },
});

export const modeButtonActive = style({
  background: vars.color.surfaceRaised,
  color: vars.color.accent,
});

export const alphaRow = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: vars.space.lg,
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
});

export const alphaLabel = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
  color: vars.color.text,
  fontWeight: 600,
});

export const alphaHint = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const range = style({
  width: "100%",
  // audit-allow: px — sub-token spacing value, no density token at this step
  height: "32px",
  appearance: "none",
  WebkitAppearance: "none",
  background: "transparent",
  cursor: "pointer",
  selectors: {
    "&::-webkit-slider-runnable-track": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      height: "6px",
      background: `linear-gradient(to right, ${vars.color.tertiary}, ${vars.color.tertiary} var(--fill, 50%), ${vars.color.borderGhost} var(--fill, 50%), ${vars.color.borderGhost})`,
      borderRadius: vars.radius.pill,
    },
    "&::-webkit-slider-thumb": {
      WebkitAppearance: "none",
      appearance: "none",
      // audit-allow: px — sub-token spacing value, no density token at this step
      width: "18px",
      // audit-allow: px — sub-token spacing value, no density token at this step
      height: "18px",
      borderRadius: "50%",
      background: vars.color.tertiary,
      // audit-allow: px — below minimum token granularity (sub-10px)
      marginTop: "-6px",
      cursor: "grab",
      transition: `box-shadow ${vars.motion.fast}`,
    },
    "&:focus-visible::-webkit-slider-thumb": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      boxShadow: `0 0 0 4px color-mix(in oklab, ${vars.color.tertiary} 30%, transparent)`,
    },
    "&::-moz-range-thumb": {
      // audit-allow: px — sub-token spacing value, no density token at this step
      width: "18px",
      // audit-allow: px — sub-token spacing value, no density token at this step
      height: "18px",
      borderRadius: "50%",
      background: vars.color.tertiary,
      border: "none",
      cursor: "grab",
    },
  },
});

export const value = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  color: vars.color.tertiary,
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
});

export const qwenInput = style({
  width: "100%",
  // audit-allow: px — sub-token spacing value, no density token at this step
  minHeight: "96px",
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  border: "none",
  outline: "none",
  resize: "vertical",
  transition: `box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:focus": {
      boxShadow: `inset 0 0 0 1px ${vars.color.secondary}`,
    },
  },
});

export const qwenHint = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const errorBanner = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.danger,
  padding: vars.space.sm,
  borderRadius: vars.radius.sm,
  background: `color-mix(in oklab, ${vars.color.danger} 10%, transparent)`,
});

export const noneNotice = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.textMuted,
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
});
