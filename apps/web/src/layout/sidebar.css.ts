import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme/contract.css";

const COLLAPSED_WIDTH = "64px";
const EXPANDED_WIDTH = "256px";
const TOP_BAR_HEIGHT = "48px";

export const container = style({
  position: "fixed",
  left: 0,
  top: TOP_BAR_HEIGHT,
  bottom: 0,
  width: COLLAPSED_WIDTH,
  backgroundColor: vars.color.bg.panel,
  display: "flex",
  flexDirection: "column",
  zIndex: vars.z.dropdown,
  transition: `width ${vars.motion.durationNormal} cubic-bezier(0.4, 0, 0.2, 1)`,
  overflow: "hidden",
});

export const containerExpanded = style({
  width: EXPANDED_WIDTH,
});

export const containerHoveredOverlay = style({
  boxShadow: vars.shadow.lg,
});

export const navSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  paddingTop: vars.space.insetMd,
  flex: 1,
});

export const utilitySection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  paddingBottom: vars.space.insetMd,
});

export const divider = style({
  width: "24px",
  height: "1px",
  backgroundColor: vars.color.outline.variant,
  margin: `${vars.space.gapSm} auto`,
  flexShrink: 0,
});

export const navItemRecipe = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    height: "40px",
    paddingLeft: "20px",
    gap: "12px",
    border: "none",
    backgroundColor: "transparent",
    color: vars.color.text.muted,
    cursor: "pointer",
    position: "relative",
    transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
    fontFamily: vars.font.ui,
    fontSize: vars.icon.lg,
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "100%",
    textAlign: "left",
    ":hover": {
      backgroundColor: vars.color.bg.hover,
      color: vars.color.text.secondary,
    },
  },
  variants: {
    active: {
      true: {
        color: vars.color.accent.primary,
        backgroundColor: vars.color.bg.elevated,
        "::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: "3px",
          height: "20px",
          backgroundColor: vars.color.accent.primary,
          borderRadius: "0 2px 2px 0",
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const navItemIcon = style({
  flexShrink: 0,
  width: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  lineHeight: 1,
});

export const navItemLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  opacity: 0,
  transition: `opacity 200ms ${vars.motion.easingDefault}`,
  overflow: "hidden",
});

export const navItemLabelVisible = style({
  opacity: 1,
});

export const pinButton = style({
  position: "absolute",
  top: "12px",
  right: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "28px",
  height: "28px",
  border: "none",
  backgroundColor: "transparent",
  color: vars.color.text.muted,
  cursor: "pointer",
  borderRadius: vars.radius.control,
  opacity: 0,
  transition: `opacity 200ms ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    backgroundColor: vars.color.bg.hover,
    color: vars.color.text.secondary,
  },
});

export const pinButtonVisible = style({
  opacity: 1,
});

export const pinButtonActive = style({
  color: vars.color.accent.primary,
});

export const secondaryContent = style({
  display: "none",
  flexDirection: "column",
  flex: 1,
  overflowY: "auto",
  padding: vars.space.insetLg,
});

export const secondaryContentVisible = style({
  display: "flex",
});
