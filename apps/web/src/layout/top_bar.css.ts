import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme/contract.css";
import { media } from "../theme/breakpoints";

export const root = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "100%",
  paddingInline: vars.density.d6,
  gap: vars.density.d6,
  "@media": {
    [media.maxMobile]: {
      paddingInline: vars.density.d3,
      gap: vars.density.d3,
    },
  },
});

export const hamburger = style({
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  width: vars.control.heightLg,
  height: vars.control.heightLg,
  flexShrink: 0,
  background: "transparent",
  border: "none",
  color: vars.color.text.secondary,
  borderRadius: vars.radius.control,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  "@media": {
    [media.maxTablet]: {
      display: "inline-flex",
    },
  },
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
  "@media": {
    [media.maxMobile]: {
      gap: vars.density.d2,
    },
  },
});

export const statusCluster = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  "@media": {
    // Runtime/host chips are non-essential on a phone — drop them so the
    // primary actions keep their touch targets.
    [media.maxMobile]: {
      display: "none",
    },
  },
});

export const searchLabel = style({
  "@media": {
    [media.maxMobile]: {
      display: "none",
    },
  },
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

export const gcButton = style({
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
    background: vars.color.warning.base,
    color: vars.color.onColor.primary,
  },
  ":disabled": {
    cursor: "default",
    color: vars.color.text.muted,
  },
  selectors: {
    "&:disabled:hover": {
      background: "transparent",
      color: vars.color.text.muted,
    },
  },
});

const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const spinningIcon = style({
  animation: `${spin} ${vars.motion.durationSlower} linear infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
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
