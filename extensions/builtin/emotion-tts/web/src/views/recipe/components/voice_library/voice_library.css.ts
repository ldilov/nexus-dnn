import { style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const dropZone = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: vars.space.lg,
  padding: vars.space.xl,
  borderRadius: vars.radius.lg,
  background: `color-mix(in oklab, ${vars.color.accent} 4%, ${vars.color.surfaceMuted})`,
  border: `1px dashed color-mix(in oklab, ${vars.color.accent} 32%, transparent)`,
  transition: `border-color ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    "&[data-over='true']": {
      borderColor: vars.color.accent,
      background: `color-mix(in oklab, ${vars.color.accent} 12%, ${vars.color.surfaceMuted})`,
    },
  },
});

export const dropIcon = style({
  width: "48px",
  height: "48px",
  borderRadius: vars.radius.md,
  background: `color-mix(in oklab, ${vars.color.accent} 14%, transparent)`,
  color: vars.color.accent,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.5rem",
});

export const dropBody = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  minWidth: 0,
});

export const dropTitle = style({
  display: "flex",
  alignItems: "baseline",
  flexWrap: "wrap",
  gap: vars.space.md,
  fontSize: vars.text.body,
  color: vars.color.text,
  fontWeight: 600,
});

export const dropTitleHint = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  textTransform: "none",
  letterSpacing: 0,
  fontWeight: 400,
});

export const dropLinkRow = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.space.sm,
});

export const linkBtn = style({
  appearance: "none",
  background: "transparent",
  border: "none",
  padding: 0,
  margin: 0,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.accent,
  cursor: "pointer",
  textDecoration: "underline dotted",
  textUnderlineOffset: "3px",
  selectors: {
    "&:hover": {
      color: vars.color.text,
    },
  },
});

export const dropCta = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  borderRadius: vars.radius.pill,
  background: vars.color.accent,
  color: vars.color.accentOn,
  border: "none",
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 600,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  cursor: "pointer",
  transition: `box-shadow ${vars.motion.fast}, transform ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      boxShadow: vars.shadow.glow,
    },
    "&:active": {
      transform: "translateY(1px)",
    },
    "&[disabled]": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const search = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.pill,
  background: vars.color.surface,
  border: `1px solid ${vars.color.borderSubtle}`,
  flex: "1 1 240px",
  minWidth: 0,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  selectors: {
    "&:focus-within": {
      borderColor: `color-mix(in oklab, ${vars.color.accent} 60%, transparent)`,
      color: vars.color.text,
    },
  },
});

export const searchInput = style({
  flex: "1 1 auto",
  background: "transparent",
  border: "none",
  outline: "none",
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.text,
  minWidth: 0,
  selectors: {
    "&::placeholder": {
      color: vars.color.textFaint,
    },
  },
});

export const filterGroup = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "2px",
  borderRadius: vars.radius.pill,
  background: vars.color.surface,
  border: `1px solid ${vars.color.borderSubtle}`,
});

export const filterBtn = style({
  appearance: "none",
  background: "transparent",
  border: "none",
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&[data-active='true']": {
      background: `color-mix(in oklab, ${vars.color.accent} 18%, transparent)`,
      color: vars.color.accent,
    },
    "&:hover[data-active='false']": {
      color: vars.color.text,
    },
  },
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: vars.space.md,
});

export const emptyState = style({
  padding: vars.space.xl,
  borderRadius: vars.radius.lg,
  background: vars.color.surface,
  border: `1px dashed ${vars.color.borderSubtle}`,
  color: vars.color.textMuted,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  textAlign: "center",
});

export const summary = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.space.sm,
});

export const summaryStrong = style({
  color: vars.color.accent,
  fontWeight: 600,
});

export const fileInput = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
});
