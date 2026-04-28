import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  padding: vars.space.md,
  background: vars.color.surfaceRaised,
  borderRadius: vars.radius.md,
});

export const header = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.sm,
});

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.subhead,
  fontWeight: 600,
  margin: 0,
  color: vars.color.text,
});

export const sourceMeta = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

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

export const buttonRow = style({
  display: "flex",
  gap: vars.space.sm,
  alignItems: "center",
  flexWrap: "wrap",
});

export const applyButton = style({
  background: vars.color.accent,
  color: vars.color.accentOn,
  border: "none",
  borderRadius: vars.radius.sm,
  padding: `${vars.space.sm} ${vars.space.md}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontWeight: 600,
  cursor: "pointer",
  transition: `transform ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:hover:not(:disabled)": {
      transform: "translateY(-1px)",
      boxShadow: vars.shadow.glow,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

export const previewButton = style({
  background: "transparent",
  color: vars.color.accent,
  border: `1px solid ${vars.color.accent}`,
  borderRadius: vars.radius.sm,
  padding: `${vars.space.sm} ${vars.space.md}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontWeight: 500,
  cursor: "pointer",
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.surfaceHigh,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

export const resetButton = style({
  background: "transparent",
  color: vars.color.textMuted,
  border: "none",
  borderRadius: vars.radius.sm,
  padding: `${vars.space.sm} ${vars.space.md}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  cursor: "pointer",
  selectors: {
    "&:hover:not(:disabled)": {
      color: vars.color.text,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

export const errorBanner = style({
  background: `color-mix(in oklab, ${vars.color.danger} 14%, transparent)`,
  color: vars.color.danger,
  borderRadius: vars.radius.sm,
  padding: `${vars.space.sm} ${vars.space.md}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
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
