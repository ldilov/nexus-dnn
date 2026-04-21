import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../../../theme/contract.css";

export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "3px 10px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.bg.elevated,
  boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.04)",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  lineHeight: vars.font.lineHeight.tight,
  userSelect: "none",
  cursor: "default",
  height: "22px",
  boxSizing: "border-box",
  whiteSpace: "nowrap",
});

export const label = styleVariants({
  cpu: { color: vars.color.text.primary },
  max: { color: vars.color.accent.primary },
  partial: { color: vars.color.text.primary },
});

export const dot = style({
  width: "4px",
  height: "4px",
  borderRadius: vars.radius.full,
  flexShrink: 0,
});

export const dotVariant = styleVariants({
  cpu: { backgroundColor: vars.color.text.secondary },
  max: { backgroundColor: vars.color.accent.primary },
});

export const labelText = style({
  display: "inline-block",
});
