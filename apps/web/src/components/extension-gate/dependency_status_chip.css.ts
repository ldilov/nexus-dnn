import { style, styleVariants } from "@vanilla-extract/css";

import { vars } from "../../theme/contract.css";

export const chip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.chip.gap,
  height: vars.chip.height,
  padding: `0 ${vars.chip.padX}`,
  background: vars.color.bg.hover,
  borderRadius: vars.radius.full,
  fontFamily: vars.font.ui,
  fontSize: vars.chip.fontSize,
  fontWeight: 500,
  letterSpacing: "0.02em",
  textDecoration: "none",
  whiteSpace: "nowrap",
  selectors: {
    "&:hover": { textDecoration: "underline" },
  },
});

export const tone = styleVariants({
  ready: { color: vars.color.success.text },
  missing: { color: vars.color.warning.text },
  loading: { color: vars.color.text.muted },
});

export const dot = style({
  width: vars.chip.dot,
  height: vars.chip.dot,
  borderRadius: vars.radius.full,
  flex: "0 0 auto",
});

export const dotTone = styleVariants({
  ready: { background: vars.color.success.base },
  missing: { background: vars.color.warning.base },
  loading: { background: vars.color.text.muted },
});
