import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.sm,
  padding: vars.space.sm,
});

export const empty = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  fontStyle: "italic",
});

export const row = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  gap: vars.space.sm,
  alignItems: "center",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  selectors: {
    "&:hover": {
      background: vars.color.surfaceHigh,
    },
  },
});

export const positionBadge = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  letterSpacing: vars.tracking.label,
  minWidth: "1.5rem",
  textAlign: "right",
});

export const labelGroup = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.space.sm,
  minWidth: 0,
});

export const modeLabel = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
});

export const params = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const removeButton = style({
  background: "transparent",
  border: "none",
  color: vars.color.textMuted,
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  lineHeight: 1,
  cursor: "pointer",
  padding: vars.space.xs,
  borderRadius: vars.radius.sm,
  selectors: {
    "&:hover": {
      color: vars.color.danger,
      background: `color-mix(in oklab, ${vars.color.danger} 14%, transparent)`,
    },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.accent}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
});
