import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const shell = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xl,
  width: "100%",
  maxWidth: "1480px",
  margin: "0 auto",
  padding: vars.space.xl,
});

export const header = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: vars.space.lg,
  flexWrap: "wrap",
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.head,
  fontWeight: 700,
  letterSpacing: vars.tracking.display,
  color: vars.color.text,
});

export const subtitle = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  maxWidth: "60ch",
});

export const main = style({
  display: "flex",
  flexDirection: "column",
});
