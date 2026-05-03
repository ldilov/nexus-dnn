import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const labelRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
});

export const numericLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  color: vars.color.text,
});

export const controls = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: vars.space.md,
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
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  paddingLeft: vars.space.sm,
  borderLeft: `1px solid ${vars.color.surfaceHigh}`,
  marginLeft: vars.space.xs,
});
