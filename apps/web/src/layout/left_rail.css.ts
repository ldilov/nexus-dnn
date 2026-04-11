import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

export const tabStrip = style({
  display: "flex",
  borderBottom: `1px solid ${vars.color.border.default}`,
  flexShrink: 0,
});

export const tab = style({
  flex: 1,
  padding: `${vars.space.sm} ${vars.space.xs}`,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  fontFamily: vars.font.family.body,
  color: vars.color.text.muted,
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "2px solid transparent",
  cursor: "pointer",
  textAlign: "center",
  transition: "color 150ms, border-color 150ms",
  ":hover": {
    color: vars.color.text.primary,
  },
});

export const tabActive = style({
  color: vars.color.accent.primary,
  borderBottomColor: vars.color.accent.primary,
});

export const content = style({
  flex: 1,
  overflow: "auto",
  padding: vars.space.md,
});
