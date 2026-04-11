import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

export const tabStrip = style({
  display: "flex",
  borderBottom: `1px solid ${vars.color.border.subtle}`,
  flexShrink: 0,
});

export const tab = style({
  flex: 1,
  padding: `${vars.space.insetMd} ${vars.space.insetXs}`,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  fontFamily: vars.font.ui,
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
  padding: vars.space.insetLg,
});
