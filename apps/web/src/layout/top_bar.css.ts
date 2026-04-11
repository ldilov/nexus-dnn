import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const title = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  marginRight: "auto",
});

export const viewSwitcher = style({
  display: "flex",
  gap: vars.space.xxs,
});

export const viewTab = style({
  padding: `${vars.space.xs} ${vars.space.md}`,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.muted,
  backgroundColor: "transparent",
  border: "none",
  borderRadius: vars.radius.md,
  cursor: "pointer",
  transition: "background 150ms, color 150ms",
  fontFamily: vars.font.family.body,
  ":hover": {
    backgroundColor: vars.color.surface.overlay,
    color: vars.color.text.primary,
  },
});

export const viewTabActive = style({
  backgroundColor: vars.color.surface.overlay,
  color: vars.color.accent.primary,
});
