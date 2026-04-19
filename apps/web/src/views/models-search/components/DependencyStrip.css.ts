import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const strip = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
  alignItems: "center",
});

export const pill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "4px 10px",
  borderRadius: vars.radius.full,
  background: vars.color.bg.lowest,
  fontFamily: vars.font.ui,
  fontSize: "10px",
  fontWeight: 600,
  color: vars.color.text.secondary,
});

export const pillRequired = style({
  color: vars.color.accent.tertiary,
});

export const dot = style({
  width: "6px",
  height: "6px",
  borderRadius: "999px",
  background: vars.color.text.muted,
  flexShrink: 0,
});

export const dotRequired = style({
  background: vars.color.accent.tertiary,
});

export const dotOptional = style({
  background: "transparent",
  border: `1.5px solid ${vars.color.text.muted}`,
});
