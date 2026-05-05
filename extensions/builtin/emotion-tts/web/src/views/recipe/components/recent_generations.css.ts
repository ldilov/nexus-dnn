import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const wrapper = style({
  position: "relative",
  display: "inline-flex",
});

/* Trigger — compact pill matching the existing `Pill` primitive's resting
 * shape but with a subtle accent dot to telegraph "you can hear things
 * here". Disappears into the run-panel toolbar when count is small. */
export const trigger = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — sub-token gap between glyph and label
  gap: "6px",
  height: "32px",
  paddingInline: vars.space.md,
  background: "transparent",
  color: vars.color.textMuted,
  border: "none",
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  cursor: "pointer",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  transition: "color 160ms, box-shadow 160ms, background 160ms",
  selectors: {
    "&:hover": {
      color: vars.color.text,
      boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
      background: `color-mix(in oklab, ${vars.color.accent} 6%, transparent)`,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "2px",
    },
    "&[aria-expanded='true']": {
      color: vars.color.accent,
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}`,
      background: `color-mix(in oklab, ${vars.color.accent} 12%, transparent)`,
    },
  },
});

export const triggerGlyph = style({
  // audit-allow: px — accent dot
  fontSize: "8px",
  color: vars.color.accent,
});

export const popover = style({
  position: "absolute",
  // audit-allow: px — anchor offset
  top: "calc(100% + 8px)",
  right: 0,
  zIndex: 80,
  // audit-allow: px — popover width tuned to text + duration column
  width: "420px",
  // audit-allow: px — narrow viewport guard
  maxWidth: "calc(100vw - 24px)",
  background: vars.color.surface,
  borderRadius: vars.radius.lg,
  boxShadow: `0 16px 40px rgba(0, 0, 0, 0.42), inset 0 0 0 1px ${vars.color.borderSubtle}`,
  padding: vars.space.sm,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingInline: vars.space.sm,
  paddingTop: vars.space.xs,
});

export const headerTitle = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
  fontWeight: 600,
});

export const headerButton = style({
  appearance: "none",
  background: "transparent",
  border: "none",
  color: vars.color.textMuted,
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  // audit-allow: px — touch-target square
  width: "28px",
  // audit-allow: px — touch-target square
  height: "28px",
  borderRadius: vars.radius.pill,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "color 120ms, background 120ms",
  selectors: {
    "&:hover": {
      color: vars.color.text,
      background: vars.color.surfaceMuted,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "2px",
    },
  },
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const row = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  padding: vars.space.sm,
  borderRadius: vars.radius.md,
  transition: "background 120ms",
  selectors: {
    "&:hover": {
      background: vars.color.surfaceMuted,
    },
  },
});

export const rowMain = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
});

export const playButton = style({
  appearance: "none",
  // audit-allow: px — touch-target square
  width: "32px",
  // audit-allow: px — touch-target square
  height: "32px",
  flexShrink: 0,
  background: `color-mix(in oklab, ${vars.color.accent} 14%, transparent)`,
  color: vars.color.accent,
  border: "none",
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.mono,
  // audit-allow: px — glyph size matched to button
  fontSize: "12px",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 120ms, transform 120ms",
  selectors: {
    "&:hover": {
      background: `color-mix(in oklab, ${vars.color.accent} 24%, transparent)`,
      transform: "scale(1.06)",
    },
    "&:active": {
      transform: "scale(0.96)",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "2px",
    },
    "&[aria-pressed='true']": {
      background: vars.color.accent,
      color: vars.color.accentOn,
    },
  },
});

export const rowMeta = style({
  flex: "1 1 auto",
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — sub-token line spacing inside row
  gap: "2px",
});

export const character = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 600,
  color: vars.color.text,
});

export const line = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const duration = style({
  flexShrink: 0,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const download = style({
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — touch-target square
  width: "28px",
  // audit-allow: px — touch-target square
  height: "28px",
  borderRadius: vars.radius.pill,
  color: vars.color.textMuted,
  textDecoration: "none",
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  transition: "color 120ms, background 120ms",
  selectors: {
    "&:hover": {
      color: vars.color.accent,
      background: `color-mix(in oklab, ${vars.color.accent} 14%, transparent)`,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "2px",
    },
  },
});

export const audio = style({
  width: "100%",
  // audit-allow: px — compact inline audio element height
  height: "32px",
});

export const empty = style({
  padding: `${vars.space.lg} ${vars.space.md}`,
  textAlign: "center",
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const error = style({
  padding: `${vars.space.lg} ${vars.space.md}`,
  textAlign: "center",
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.danger,
});

export const footer = style({
  display: "flex",
  justifyContent: "flex-end",
  paddingInline: vars.space.sm,
  paddingBottom: vars.space.xs,
});

export const footerHint = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
});

export const kbd = style({
  display: "inline-block",
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  // audit-allow: px — kbd chip padding
  padding: "1px 4px",
  borderRadius: vars.radius.sm,
  background: vars.color.surfaceMuted,
  color: vars.color.textMuted,
  // audit-allow: px — kbd chip outline
  border: `1px solid ${vars.color.borderSubtle}`,
});
