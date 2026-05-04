import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  // Span both columns of the parent splitBody grid — this view owns its own
  // internal radar+bars layout below.
  gridColumn: "1 / -1",
  minWidth: 0,
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const eyebrow = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textMuted,
});

export const modeBar = style({
  display: "inline-flex",
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
  selectors: {
    "&:focus-visible": {
      outline: "none",
      boxShadow: vars.shadow.focusRing,
    },
  },
});

export const modeButtonActive = style({
  background: vars.color.surfaceRaised,
  color: vars.color.accent,
});

export const radarColumn = style({
  alignItems: "center",
  gap: vars.space.lg,
});

export const barsColumn = style({
  gap: vars.space.md,
  position: "relative",
});

export const dominantBlock = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "2px",
  paddingBottom: vars.space.md,
  boxShadow: `inset 0 -1px 0 0 ${vars.color.borderSubtle}`,
});

export const dominantName = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.subhead,
  color: vars.color.accent,
  fontWeight: 600,
  textTransform: "capitalize",
  letterSpacing: vars.tracking.display,
});

export const dominantMag = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});

export const barsActions = style({
  display: "flex",
  paddingTop: vars.space.sm,
  boxShadow: `inset 0 1px 0 0 ${vars.color.borderSubtle}`,
});

export const resetButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  background: "transparent",
  border: "none",
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 500,
  color: vars.color.textMuted,
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  ":hover": {
    background: vars.color.surfaceMuted,
    color: vars.color.text,
  },
  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.4,
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: vars.shadow.focusRing,
    },
  },
});

export const resetIcon = style({
  display: "inline-block",
  flexShrink: 0,
});

// Inner split: radar on the left, bars stack on the right.
// Sits inside the parent recipe section's splitBody card; no extra chrome here.
export const splitBody = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
  gap: vars.space.xl,
  alignItems: "start",
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(max-width: 1024px)": {
      gridTemplateColumns: "1fr",
    },
  },
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

export const qwenColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
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

export const qwenActions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  flexWrap: "wrap",
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

// ─── Save preset composer ───
export const savePreset = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  padding: `${vars.space.md} ${vars.space.lg}`,
  background: `color-mix(in oklab, ${vars.color.accent} 6%, ${vars.color.surfaceMuted})`,
  borderRadius: vars.radius.md,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 22%, transparent)`,
  transition: `opacity ${vars.motion.fast}`,
});

export const savePresetDisabled = style({
  opacity: 0.55,
  background: vars.color.surfaceMuted,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const savePresetHead = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textMuted,
});

export const savePresetTitle = style({
  color: vars.color.text,
  fontWeight: 500,
});

export const savePresetHint = style({
  marginLeft: "auto",
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
  textTransform: "none",
  letterSpacing: vars.tracking.body,
});

export const savePresetBody = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const savePresetChips = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.space.xs,
  minWidth: 0,
});

export const chip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  // audit-allow: px — control-height token, sub-token granularity
  height: "22px",
  padding: `0 ${vars.space.sm}`,
  background: vars.color.surface,
  borderRadius: vars.radius.pill,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.micro,
  color: vars.color.text,
  textTransform: "capitalize",
});

export const chipValue = style({
  fontFamily: vars.font.mono,
  fontWeight: 500,
  fontVariantNumeric: "tabular-nums",
  color: vars.color.accent,
});

export const chipEmpty = style({
  color: vars.color.textFaint,
  fontStyle: "italic",
});

export const savePresetForm = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: vars.space.sm,
  alignItems: "center",
});

export const savePresetInput = style({
  // audit-allow: px — control-height token, no density token at this step
  height: "34px",
  padding: `0 ${vars.space.md}`,
  background: vars.color.surface,
  borderRadius: vars.radius.sm,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.text,
  border: "none",
  outline: "none",
  transition: `box-shadow ${vars.motion.fast}`,
  selectors: {
    "&::placeholder": {
      color: vars.color.textFaint,
      fontStyle: "italic",
    },
    "&:focus": {
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, 0 0 0 2px color-mix(in oklab, ${vars.color.accent} 20%, transparent)`,
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.55,
    },
  },
});
