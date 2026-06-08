import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const layout = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.6fr) minmax(320px, 1fr)",
  gap: vars.space.xl,
  alignItems: "start",
  "@media": {
    "screen and (max-width: 1100px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
});

export const column = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xl,
  minWidth: 0,
});

export const rightColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xl,
  minWidth: 0,
  position: "sticky",
  top: vars.space.lg,
  "@media": {
    "screen and (max-width: 1100px)": {
      position: "static",
    },
  },
});

export const renderCta = style({
  display: "flex",
  flexDirection: "column",
});

globalStyle(`${renderCta} > button`, {
  width: "100%",
});

export const resolutionWarning = style({
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  background: `color-mix(in oklab, ${vars.color.warning} 12%, transparent)`,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.warning} 35%, transparent)`,
  color: vars.color.warning,
  fontSize: vars.text.caption,
});
