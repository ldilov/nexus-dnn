import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  padding: vars.space.md,
  marginTop: vars.space.xs,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const header = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.sm,
});

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
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
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
});

export const numericLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.text,
});

export const controls = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const toggleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const buttonRow = style({
  display: "flex",
  gap: vars.space.sm,
  alignItems: "center",
  flexWrap: "wrap",
  paddingTop: vars.space.xs,
});

export const applyButton = style({
  background: vars.color.accent,
  color: vars.color.accentOn,
  border: "none",
  borderRadius: vars.radius.sm,
  padding: `${vars.space.xs} ${vars.space.md}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
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

export const cancelButton = style({
  background: "transparent",
  color: vars.color.textMuted,
  border: "none",
  borderRadius: vars.radius.sm,
  padding: `${vars.space.xs} ${vars.space.md}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
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

