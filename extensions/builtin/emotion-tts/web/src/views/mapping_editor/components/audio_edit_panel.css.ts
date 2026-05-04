import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const labelRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.sm,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
});

export const labelLeft = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — sub-token gap between label text and help dot
  gap: "6px",
});

export const numericLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  color: vars.color.text,
  letterSpacing: 0,
  textTransform: "none",
});

export const advancedDisclosure = style({
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: `${vars.space.sm} 0`,
  textAlign: "left",
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  alignSelf: "flex-start",
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — sub-token gap for inline glyph
  gap: "8px",
  transition: `color ${vars.motion.fast}`,
  selectors: {
    "&:hover": { color: vars.color.accent },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "2px",
      borderRadius: vars.radius.sm,
    },
  },
});

export const advancedCaret = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — caret glyph width
  width: "12px",
  color: vars.color.textMuted,
});

export const advancedSummary = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  letterSpacing: 0,
  textTransform: "none",
});

export const chainDigestValue = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.secondary,
  letterSpacing: 0,
  textTransform: "none",
});

export const controls = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const controlBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const toggleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.text,
  letterSpacing: 0,
  textTransform: "none",
});

export const opsList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.sm,
  padding: vars.space.sm,
});

export const opRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.text,
});

export const opName = style({
  color: vars.color.text,
});

export const opMeta = style({
  color: vars.color.textMuted,
});

export const removeButton = style({
  background: "transparent",
  border: "none",
  color: vars.color.danger,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  cursor: "pointer",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  selectors: {
    "&:hover": { background: vars.color.surfaceHigh },
  },
});

export const lufsLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  letterSpacing: 0,
  textTransform: "none",
});

export const audioPlayer = style({
  width: "100%",
  marginTop: vars.space.sm,
});

export const slider = style({
  width: "100%",
});

export const auditSection = style({
  marginTop: vars.space.sm,
});

export const auditSummary = style({
  cursor: "pointer",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
  padding: `${vars.space.xs} 0`,
  selectors: {
    "&:focus-visible": {
      outline: "none",
      boxShadow: vars.shadow.focusRing,
      borderRadius: vars.radius.sm,
    },
    "&:hover": {
      color: vars.color.text,
    },
  },
});

export const previewHint = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  letterSpacing: 0,
  textTransform: "none",
  paddingLeft: vars.space.sm,
  borderLeft: `1px solid ${vars.color.borderSubtle}`,
  marginLeft: vars.space.xs,
});
