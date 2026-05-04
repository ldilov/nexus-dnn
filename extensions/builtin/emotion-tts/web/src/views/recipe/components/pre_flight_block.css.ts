import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const headerRow = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.md,
});

export const title = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textMuted,
});

export const summary = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const item = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: vars.space.md,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
});

export const statusDot = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  width: "8px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "8px",
  borderRadius: "50%",
  flex: "0 0 auto",
});

export const statusVariant = styleVariants({
  ok: { background: vars.color.success },
  warn: { background: vars.color.warning },
  info: { background: vars.color.secondary },
});

export const itemLabel = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.text,
});

export const itemDetail = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  fontVariantNumeric: "tabular-nums",
});
