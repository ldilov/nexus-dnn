import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme/contract.css";

export const root = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "100%",
  paddingInline: vars.density.d6,
  gap: vars.density.d6,
});

export const leftZone = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  flex: "1 1 auto",
  minWidth: 0,
  overflow: "hidden",
});

export const breadcrumbList = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.04em",
  color: vars.color.text.secondary,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const breadcrumbCrumb = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: vars.density.d2,
    color: vars.color.text.secondary,
    background: "transparent",
    border: "none",
    padding: 0,
    fontFamily: "inherit",
    fontSize: "inherit",
    letterSpacing: "inherit",
    textTransform: "uppercase",
    cursor: "pointer",
    ":hover": {
      color: vars.color.text.primary,
    },
    ":disabled": {
      cursor: "default",
    },
  },
  variants: {
    last: {
      true: {
        color: vars.color.text.primary,
        cursor: "default",
        ":hover": {
          color: vars.color.text.primary,
        },
      },
    },
  },
  defaultVariants: { last: false },
});

export const breadcrumbSeparator = style({
  color: vars.color.text.muted,
  fontSize: vars.font.size.caption,
  userSelect: "none",
});

export const rightZone = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  flex: "0 0 auto",
});

export const searchAffordance = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d3,
  height: vars.control.heightSm,
  paddingInline: vars.density.d3,
  background: vars.color.bg.lowest,
  color: vars.color.text.muted,
  borderRadius: vars.radius.control,
  border: "none",
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.secondary,
  },
});

export const iconButton = style({
  width: vars.control.heightSm,
  height: vars.control.heightSm,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  border: "none",
  color: vars.color.text.secondary,
  borderRadius: vars.radius.full,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
});

export const profileAvatar = style({
  width: vars.control.heightSm,
  height: vars.control.heightSm,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.full,
  background: `linear-gradient(135deg, ${vars.color.accent.primaryDim}, ${vars.color.accent.secondaryDim})`,
  color: vars.color.onColor.primary,
  fontFamily: vars.font.ui,
  fontWeight: vars.font.weight.semibold,
  fontSize: vars.font.size.caption,
  border: "none",
  cursor: "pointer",
});
