import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const group = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const groupLabel = style({
  fontSize: "11px",
  fontWeight: vars.weight.semibold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.color.textMuted,
});

export const controlRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.lg,
  flexWrap: "wrap",
});

export const segmentWrap = style({
  display: "inline-flex",
  padding: "4px",
  gap: "2px",
  background: vars.color.surface,
  borderRadius: "11px",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const segment = style({
  height: "34px",
  padding: "0 16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "transparent",
  color: vars.color.textMuted,
  fontFamily: vars.font.body,
  fontSize: "12.5px",
  fontWeight: vars.weight.semibold,
  fontVariantNumeric: "tabular-nums",
  transition: `all ${vars.motion.fast}`,
  selectors: {
    "&:hover:not(:disabled)": { color: vars.color.text },
    "&:disabled": { cursor: "not-allowed", opacity: 0.45 },
  },
});

export const segmentActive = style({
  background: vars.color.surfaceHigh,
  color: vars.color.text,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 3px rgba(0,0,0,0.35)",
});

export const secondsWrap = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
});

export const secondsInput = style({
  width: "118px",
  height: "42px",
  background: vars.color.surface,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  borderRadius: "9px",
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: "15px",
  fontWeight: vars.weight.semibold,
  fontVariantNumeric: "tabular-nums",
  padding: "0 38px 0 14px",
  outline: "none",
  transition: `box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:focus-visible": {
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, 0 0 0 3px ${vars.color.accentGlow}`,
    },
  },
});

export const secondsSuffix = style({
  position: "absolute",
  right: "13px",
  fontSize: vars.text.caption,
  color: vars.color.textFaint,
  pointerEvents: "none",
  fontFamily: vars.font.mono,
});

export const summary = style({
  fontFamily: vars.font.mono,
  fontSize: "11.5px",
  color: vars.color.textMuted,
  letterSpacing: "0.01em",
  fontVariantNumeric: "tabular-nums",
});

export const resGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: vars.space.md,
  "@media": {
    "screen and (max-width: 720px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
});

export const resCard = style({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  textAlign: "left",
  padding: "14px 15px",
  borderRadius: "12px",
  cursor: "pointer",
  background: vars.color.surface,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  transition: `all ${vars.motion.normal}`,
  selectors: {
    "&:hover": {
      boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
    },
  },
});

export const resCardActive = style({
  background: `color-mix(in oklab, ${vars.color.accent} 7%, ${vars.color.surface})`,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 55%, transparent), 0 0 0 3px ${vars.color.accentGlow}, 0 8px 22px rgba(0,0,0,0.38)`,
  selectors: {
    "&:hover": {
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 55%, transparent), 0 0 0 3px ${vars.color.accentGlow}, 0 8px 22px rgba(0,0,0,0.38)`,
    },
  },
});

export const resHead = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const resValue = style({
  fontFamily: vars.font.mono,
  fontSize: "15.5px",
  fontWeight: vars.weight.semibold,
  color: vars.color.text,
  fontVariantNumeric: "tabular-nums",
  letterSpacing: "0.01em",
});

export const resCheck = style({
  display: "inline-flex",
  width: "18px",
  height: "18px",
  color: vars.color.accent,
  opacity: 0,
  transform: "scale(0.7)",
  transition: `opacity ${vars.motion.fast}, transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
});

export const resCheckActive = style({
  opacity: 1,
  transform: "scale(1)",
});

export const resLabel = style({
  fontSize: "12.5px",
  fontWeight: vars.weight.semibold,
  color: vars.color.text,
});

export const resSub = style({
  fontSize: "11px",
  color: vars.color.textMuted,
  lineHeight: 1.4,
});

const badgeBase = style({
  alignSelf: "flex-start",
  marginTop: "3px",
  fontFamily: vars.font.mono,
  fontSize: "9.5px",
  fontWeight: vars.weight.semibold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "2px 7px",
  borderRadius: "5px",
});

export const resBadgeNeutral = style([
  badgeBase,
  {
    color: vars.color.textMuted,
    background: vars.color.surfaceHighest,
  },
]);

export const resBadgeWarn = style([
  badgeBase,
  {
    color: vars.color.warning,
    background: `color-mix(in oklab, ${vars.color.warning} 10%, transparent)`,
    boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.warning} 25%, transparent)`,
  },
]);

export const selectWrap = style({
  position: "relative",
});

export const select = style({
  width: "100%",
  height: "46px",
  appearance: "none",
  WebkitAppearance: "none",
  background: vars.color.surface,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  borderRadius: "10px",
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: "13.5px",
  padding: "0 44px 0 15px",
  outline: "none",
  cursor: "pointer",
  transition: `box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:focus-visible": {
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, 0 0 0 3px ${vars.color.accentGlow}`,
    },
  },
});

export const selectChevron = style({
  position: "absolute",
  right: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  display: "inline-flex",
  width: "18px",
  height: "18px",
  color: vars.color.textMuted,
  pointerEvents: "none",
});

export const hint = style({
  fontSize: "11.5px",
  color: vars.color.textMuted,
  fontStyle: "italic",
  lineHeight: 1.5,
});

export const loadError = style({
  fontSize: "11.5px",
  color: vars.color.danger,
  lineHeight: 1.5,
});

export const customRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  flexWrap: "wrap",
});
