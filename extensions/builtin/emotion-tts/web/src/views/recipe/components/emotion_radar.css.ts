import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const wrap = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.xs,
});

export const svgInteractive = style({
  cursor: "crosshair",
  touchAction: "none",
  outline: "none",
  borderRadius: vars.radius.md,
  ":focus-visible": {
    // audit-allow: px — px — below minimum token granularity (sub-10px)
    boxShadow: `0 0 0 2px ${vars.color.accent}`,
  },
});

export const dominant = style({
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.space.xs,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  letterSpacing: vars.tracking.label,
});

export const dominantAxis = style({
  color: vars.color.text,
  fontWeight: 600,
  textTransform: "uppercase",
});

export const dominantValue = style({
  color: vars.color.accent,
  fontWeight: 600,
});

export const dominantNeutral = style({
  color: vars.color.textMuted,
});
