import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const layout = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 2fr) minmax(300px, 1fr)",
  gap: vars.space.xl,
  alignItems: "stretch",
  minHeight: "520px",
  "@media": {
    "screen and (max-width: 1100px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
});

export const canvasWrap = style({
  display: "flex",
  minHeight: "480px",
  borderRadius: vars.radius.lg,
  overflow: "hidden",
});

export const side = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  minWidth: 0,
});

export const stageList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const stageRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceMuted,
  fontSize: vars.text.caption,
});

export const actions = style({
  display: "flex",
  gap: vars.space.sm,
});
