import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const view = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xl,
  minWidth: 0,
});

export const layout = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 0.85fr)",
  gap: vars.space.xl,
  alignItems: "start",
  "@media": {
    "screen and (max-width: 1040px)": {
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

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const sectionLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textFaint,
});

export const submitRow = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.space.sm,
});
