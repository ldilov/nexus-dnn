import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";
import { media } from "../../theme/breakpoints";

const reducedMotion = "(prefers-reduced-motion: reduce)";

const dockIn = keyframes({
  // audit-allow: px — entrance slide offset, sub-token motion geometry
  from: { opacity: 0, transform: "translateY(12px) scale(0.98)" },
  to: { opacity: 1, transform: "translateY(0) scale(1)" },
});

export const dock = style({
  position: "fixed",
  // audit-allow: px — floating dock inset from the viewport corner
  right: "20px",
  // audit-allow: px — clears the pulse floor / bottom drawer band
  bottom: "20px",
  // audit-allow: px — dock width cap + viewport gutter, fixed float geometry
  width: "min(380px, calc(100vw - 40px))",
  // audit-allow: px — dock height ceiling, fixed float geometry
  maxHeight: "min(70vh, 560px)",
  display: "flex",
  flexDirection: "column",
  background: `color-mix(in oklch, ${vars.color.bg.elevated} 88%, transparent)`,
  // audit-allow: px — glass backdrop blur radius per design system (20px)
  backdropFilter: "blur(20px) saturate(1.2)",
  // audit-allow: px — glass backdrop blur radius per design system (20px)
  WebkitBackdropFilter: "blur(20px) saturate(1.2)",
  borderRadius: vars.radius.panel,
  boxShadow: [
    vars.shadow.lg,
    `0 0 0 1px color-mix(in oklch, ${vars.color.accent.primary} 12%, transparent)`,
    `inset 0 1px 0 ${vars.color.outline.variant}`,
  ].join(", "),
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  overflow: "hidden",
  // Floats over page content but yields to the mobile nav scrim (z.dropdown=100)
  // and drawer (z.drawer=200); above the pulse floor (60). No token in this gap.
  zIndex: 70,
  animation: `${dockIn} ${vars.motion.durationNormal} ${vars.motion.easingSpring}`,
  "@media": {
    [reducedMotion]: { animation: "none" },
    [media.maxMobile]: {
      right: 0,
      left: 0,
      bottom: 0,
      width: "100%",
      maxHeight: "62vh",
      borderRadius: 0,
      borderTopLeftRadius: vars.radius.panel,
      borderTopRightRadius: vars.radius.panel,
    },
  },
});

export const dockCollapsed = style({
  maxHeight: "none",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  paddingInline: vars.density.d4,
  paddingBlock: vars.density.d3,
  background: `color-mix(in oklch, ${vars.color.bg.bright} 40%, transparent)`,
  boxShadow: `inset 0 -1px 0 ${vars.color.outline.variant}`,
});

export const headerIcon = style({
  fontSize: vars.icon.sm,
  color: vars.color.accent.primary,
  flexShrink: 0,
});

export const headerTitle = style({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  flex: 1,
  lineHeight: vars.font.lineHeight.tight,
});

export const titleLabel = style({
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: "0.02em",
});

export const countLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  color: vars.color.text.muted,
  letterSpacing: "0.04em",
  fontVariantNumeric: "tabular-nums",
});

export const headerActions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  flexShrink: 0,
});

export const headerButton = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.density.d1,
  height: vars.control.heightSm,
  paddingInline: vars.density.d2,
  borderRadius: vars.radius.control,
  background: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.medium,
  letterSpacing: "0.04em",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      background: `color-mix(in oklch, ${vars.color.bg.hover} 80%, transparent)`,
      color: vars.color.text.primary,
    },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.primary}`,
      outlineOffset: vars.focus.offset,
    },
  },
});

export const headerButtonIcon = style({
  fontSize: vars.icon.sm,
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  padding: vars.density.d3,
  overflowY: "auto",
  minHeight: 0,
});

export const jobRow = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  padding: vars.density.d3,
  borderRadius: vars.radius.card,
  background: `color-mix(in oklch, ${vars.color.bg.panel} 55%, transparent)`,
});

export const jobHead = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  minWidth: 0,
});

export const jobLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
  letterSpacing: "0.02em",
  flex: 1,
  minWidth: 0,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const iconButton = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: vars.control.heightSm,
  height: vars.control.heightSm,
  borderRadius: vars.radius.control,
  background: "transparent",
  color: vars.color.text.muted,
  flexShrink: 0,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      background: `color-mix(in oklch, ${vars.color.error.base} 16%, transparent)`,
      color: vars.color.error.base,
    },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.primary}`,
      outlineOffset: vars.focus.offset,
    },
  },
});

export const iconButtonNeutral = style({
  selectors: {
    "&:hover": {
      background: `color-mix(in oklch, ${vars.color.bg.hover} 80%, transparent)`,
      color: vars.color.text.primary,
    },
  },
});

export const iconGlyph = style({
  fontSize: vars.icon.sm,
});

export const jobProgressSlot = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
});
