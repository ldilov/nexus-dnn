import { style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/tokens.css";

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  padding: vars.space.lg,
  borderRadius: vars.radius.lg,
  background: vars.color.surface,
  border: `1px solid ${vars.color.borderSubtle}`,
  transition: `border-color ${vars.motion.fast}, box-shadow ${vars.motion.fast}, background ${vars.motion.fast}`,
  position: "relative",
  selectors: {
    "&:hover": {
      borderColor: `color-mix(in oklab, ${vars.color.accent} 40%, transparent)`,
    },
    "&[data-playing='true']": {
      borderColor: vars.color.accent,
      boxShadow: vars.shadow.glow,
    },
  },
});

export const head = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: vars.space.md,
  minWidth: 0,
});

export const icon = style({
  width: "36px",
  height: "36px",
  borderRadius: vars.radius.md,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1rem",
  fontWeight: 700,
  selectors: {
    "&[data-kind='upload']": {
      background: `color-mix(in oklab, ${vars.color.secondary} 18%, transparent)`,
      color: vars.color.secondary,
    },
    "&[data-kind='preset']": {
      background: `color-mix(in oklab, ${vars.color.tertiary} 18%, transparent)`,
      color: vars.color.tertiary,
    },
  },
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: 0,
});

export const title = style({
  appearance: "none",
  background: "transparent",
  border: "none",
  padding: 0,
  margin: 0,
  textAlign: "left",
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.text,
  fontWeight: 600,
  cursor: "text",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  letterSpacing: vars.tracking.body,
  selectors: {
    "&:hover": {
      color: vars.color.accent,
    },
  },
});

export const renameInput = style({
  width: "100%",
  appearance: "none",
  background: vars.color.surfaceMuted,
  border: `1px solid ${vars.color.accent}`,
  borderRadius: vars.radius.sm,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.text,
  outline: "none",
});

export const meta = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const chip = style({
  fontFamily: vars.font.mono,
  fontSize: "0.625rem",
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  padding: `2px 8px`,
  borderRadius: vars.radius.pill,
  selectors: {
    "&[data-kind='upload']": {
      background: `color-mix(in oklab, ${vars.color.secondary} 18%, transparent)`,
      color: vars.color.secondary,
    },
    "&[data-kind='preset']": {
      background: `color-mix(in oklab, ${vars.color.tertiary} 18%, transparent)`,
      color: vars.color.tertiary,
    },
  },
});

export const wave = style({
  appearance: "none",
  background: vars.color.surfaceMuted,
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radius.md,
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  alignItems: "center",
  gap: vars.space.sm,
  padding: `${vars.space.sm} ${vars.space.md}`,
  cursor: "pointer",
  height: "56px",
  width: "100%",
  transition: `background ${vars.motion.fast}, border-color ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      borderColor: `color-mix(in oklab, ${vars.color.accent} 60%, transparent)`,
      background: vars.color.surface,
    },
    "&[data-playing='true']": {
      borderColor: vars.color.accent,
      background: `color-mix(in oklab, ${vars.color.accent} 8%, ${vars.color.surfaceMuted})`,
    },
    "&[disabled]": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
});

export const playGlyph = style({
  width: "28px",
  height: "28px",
  borderRadius: vars.radius.pill,
  background: vars.color.accent,
  color: vars.color.accentOn,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  fontWeight: 700,
});

export const bars = style({
  display: "flex",
  alignItems: "center",
  gap: "2px",
  height: "100%",
  width: "100%",
  minWidth: 0,
});

export const bar = style({
  flex: "1 1 0",
  background: `color-mix(in oklab, ${vars.color.accent} 65%, transparent)`,
  borderRadius: "1px",
  minHeight: "4px",
  transition: `height ${vars.motion.fast}`,
});

export const foot = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  flexWrap: "wrap",
  justifyContent: "space-between",
});

export const usedBy = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  flexWrap: "wrap",
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});

export const usedChip = style({
  padding: `2px 8px`,
  borderRadius: vars.radius.pill,
  border: `1px solid currentColor`,
  fontFamily: vars.font.body,
  fontSize: vars.text.micro,
});

export const actions = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
});

export const iconBtn = style({
  appearance: "none",
  width: "30px",
  height: "30px",
  borderRadius: vars.radius.sm,
  background: "transparent",
  border: `1px solid transparent`,
  color: vars.color.textMuted,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "0.875rem",
  transition: `color ${vars.motion.fast}, background ${vars.motion.fast}, border-color ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      color: vars.color.text,
      background: vars.color.surfaceMuted,
      borderColor: vars.color.borderSubtle,
    },
    "&[data-tone='danger']:hover": {
      color: vars.color.danger,
      borderColor: `color-mix(in oklab, ${vars.color.danger} 50%, transparent)`,
    },
  },
});

export const audio = style({
  display: "none",
});
