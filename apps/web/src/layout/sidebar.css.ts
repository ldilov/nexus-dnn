// audit-allow: px — sidebar width per IA contract
// audit-allow: px — fixed UX hit-target, not density-coupled
// audit-allow: px — sub-token spacing value, no density token at this step
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme/contract.css";

const COLLAPSED_WIDTH = "64px";
// audit-allow: px — workspace shell scaffolding dimension
const EXPANDED_WIDTH = "232px";

export const container = style({
  position: "fixed",
  left: 0,
  // audit-allow: px — workspace shell scaffolding dimension
  top: "24px",
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
  borderTopRightRadius: vars.radius.panel,
  borderBottomRightRadius: vars.radius.panel,
});

export const containerFloat = style({
  width: EXPANDED_WIDTH,
  left: vars.density.d6,
  top: vars.density.d6,
  bottom: vars.density.d6,
  borderRadius: vars.radius.panel,
  boxShadow: vars.shadow.lg,
  // audit-allow: px — workspace shell scaffolding dimension
  backdropFilter: "blur(20px)",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — workspace shell scaffolding dimension
  height: "56px",
  flexShrink: 0,
});

export const headerExpanded = style({
  justifyContent: "space-between",
  // audit-allow: px — workspace shell scaffolding dimension
  paddingLeft: "16px",
  // audit-allow: px — workspace shell scaffolding dimension
  paddingRight: "12px",
});

export const brandSlot = style({
  display: "inline-flex",
  alignItems: "center",
  minWidth: 0,
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
  // audit-allow: px — workspace shell scaffolding dimension
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
    // audit-allow: px — workspace shell scaffolding dimension
    height: "40px",
    // audit-allow: px — workspace shell scaffolding dimension
    paddingLeft: "20px",
    // audit-allow: px — workspace shell scaffolding dimension
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
        color: vars.color.text.primary,
        backgroundImage: `linear-gradient(135deg, color-mix(in oklab, ${vars.color.accent.primaryDim} 38%, transparent), color-mix(in oklab, ${vars.color.accent.secondaryDim} 22%, transparent))`,
        boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent.primaryDim} 55%, transparent)`,
        ":focus-visible": {
          outline: "none",
          // audit-allow: px — below minimum token granularity (sub-10px)
          boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent.primaryDim} 55%, transparent), 0 0 0 2px ${vars.color.accent.primary}`,
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
  // audit-allow: px — workspace shell scaffolding dimension
  width: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — workspace shell scaffolding dimension
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — workspace shell scaffolding dimension
  width: "32px",
  // audit-allow: px — workspace shell scaffolding dimension
  height: "32px",
  border: "none",
  backgroundColor: "transparent",
  color: vars.color.text.secondary,
  cursor: "pointer",
  borderRadius: vars.radius.control,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    backgroundColor: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  ":focus-visible": {
    // audit-allow: px — below minimum token granularity (sub-10px)
    outline: `2px solid ${vars.color.accent.primary}`,
    // audit-allow: px — below minimum token granularity (sub-10px)
    outlineOffset: "2px",
  },
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

export const iconXl = style({
  // audit-allow: px — workspace shell scaffolding dimension
  fontSize: "22px",
});
