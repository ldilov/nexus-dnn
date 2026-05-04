import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const item = style({
  display: "grid",
  gridTemplateColumns: "auto auto 1fr",
  alignItems: "baseline",
  gap: vars.space.md,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
  transition: `background ${vars.motion.fast}`,
  ":hover": {
    background: vars.color.surfaceRaised,
  },
});

export const itemNarration = style({
  background: "transparent",
  // audit-allow: px — below minimum token granularity (sub-10px)
  borderLeft: `2px solid ${vars.color.borderGhost}`,
  borderRadius: 0,
  paddingLeft: vars.space.md,
  gridTemplateColumns: "auto 1fr",
});

export const idx = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textFaint,
  fontVariantNumeric: "tabular-nums",
  minWidth: "2ch",
});

export const character = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
  fontWeight: 600,
  letterSpacing: "0",
});

export const text = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  lineHeight: 1.55,
  color: vars.color.text,
});

export const narrationText = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontStyle: "italic",
  lineHeight: 1.55,
  color: vars.color.textMuted,
});

export const overrideBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  marginLeft: vars.space.sm,
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  whiteSpace: "nowrap",
});

export const overrideKindStyles = styleVariants({
  vector: {
    color: vars.color.accent,
    background: `color-mix(in oklab, ${vars.color.accent} 14%, transparent)`,
  },
  qwen: {
    color: vars.color.secondary,
    background: `color-mix(in oklab, ${vars.color.secondary} 14%, transparent)`,
  },
  preset: {
    color: vars.color.tertiary,
    background: `color-mix(in oklab, ${vars.color.tertiary} 14%, transparent)`,
  },
  audio: {
    color: vars.color.success,
    background: `color-mix(in oklab, ${vars.color.success} 14%, transparent)`,
  },
  raw: {
    color: vars.color.textMuted,
    background: `color-mix(in oklab, ${vars.color.textMuted} 14%, transparent)`,
  },
});

export const empty = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.textMuted,
  margin: 0,
});

export const summaryRow = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.space.lg,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  marginBottom: vars.space.md,
});

export const summaryStat = style({
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.space.sm,
});

export const summaryValue = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.subhead,
  color: vars.color.text,
  fontWeight: 600,
});
