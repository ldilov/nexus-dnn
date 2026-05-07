import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d4,
  padding: vars.density.padCard,
  background: vars.card.bg,
  boxShadow: vars.card.shadow,
  backdropFilter: vars.card.backdrop,
  borderRadius: vars.radius.card,
  position: "relative",
  overflow: "hidden",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      background: vars.color.bg.hover,
      transform: "translateY(-1px)",
    },
  },
});

export const accentVariants = styleVariants({
  none: {},
  primary: {
    selectors: {
      "&::before": {
        content: "",
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        // audit-allow: px — fixed decorative accent stripe width below density token granularity
        width: "3px",
        background: vars.color.accent.accent,
      },
    },
  },
  secondary: {
    selectors: {
      "&::before": {
        content: "",
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        // audit-allow: px — fixed decorative accent stripe width below density token granularity
        width: "3px",
        background: vars.color.accent.secondary,
      },
    },
  },
  tertiary: {
    selectors: {
      "&::before": {
        content: "",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        // audit-allow: px — fixed decorative accent stripe height below density token granularity
        height: "2px",
        background: vars.color.accent.tertiary,
      },
    },
  },
});

export const header = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: vars.density.d3,
});

export const headerText = style({
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d1,
});

export const owner = style({
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: vars.color.accent.secondary,
});

export const ownerTertiary = style({
  color: vars.color.accent.tertiary,
});

export const ownerMuted = style({
  color: vars.color.text.muted,
});

export const title = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  lineHeight: 1.2,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: "-0.01em",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  margin: 0,
});

export const stats = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: vars.density.d1,
  flexShrink: 0,
});

export const stat = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  fontVariantNumeric: "tabular-nums",
});

export const statIcon = style({
  fontSize: vars.icon.sm,
});

export const chipsRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.density.d2,
});

export const chip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  paddingInline: vars.density.d2,
  // audit-allow: px — chip vertical padding 2px is below minimum density token granularity
  paddingBlock: "2px",
  borderRadius: vars.radius.control,
  background: vars.color.bg.elevated,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.color.text.secondary,
});

export const chipPrimary = style({
  background: `color-mix(in oklch, ${vars.color.accent.primary} 16%, transparent)`,
  color: vars.color.accent.primary,
});

export const description = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.secondary,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  margin: 0,
});

export const precisionRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.density.d3,
  paddingBlock: vars.density.d2,
  paddingInline: vars.density.d3,
  background: vars.color.bg.lowest,
  borderRadius: vars.radius.control,
});

export const precisionLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const precisionValue = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
  fontWeight: vars.font.weight.semibold,
  fontVariantNumeric: "tabular-nums",
});

export const precisionAssumed = style({
  color: vars.color.text.muted,
  fontStyle: "italic",
  fontWeight: vars.font.weight.medium,
});

export const actions = style({
  display: "flex",
  gap: vars.density.d2,
  marginTop: "auto",
  paddingTop: vars.density.d2,
});

export const actionPrimary = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  flex: 1,
  height: vars.control.heightLg,
  paddingInline: vars.density.d4,
  borderRadius: vars.radius.control,
  background: vars.color.accent.tertiary,
  color: vars.color.onColor.tertiary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      transform: "translateY(-1px)",
    },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.tertiary}`,
      outlineOffset: vars.focus.offset,
    },
    "&:disabled": { opacity: 0.4, cursor: "not-allowed", transform: "none" },
  },
});

export const actionSecondary = style([
  actionPrimary,
  {
    background: vars.color.bg.elevated,
    color: vars.color.text.primary,
    selectors: {
      "&:hover": { background: vars.color.bg.bright, transform: "translateY(-1px)" },
      "&:focus-visible": {
        outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
        outlineOffset: vars.focus.offset,
      },
    },
  },
]);

export const actionGhost = style([
  actionPrimary,
  {
    background: "transparent",
    color: vars.color.text.secondary,
    selectors: {
      "&:hover": {
        background: vars.color.bg.elevated,
        color: vars.color.text.primary,
        transform: "translateY(-1px)",
      },
      "&:focus-visible": {
        outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
        outlineOffset: vars.focus.offset,
      },
    },
  },
]);

export const authOverlay = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  padding: vars.density.d3,
  background: `color-mix(in oklch, ${vars.color.accent.tertiary} 10%, transparent)`,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
});

export const authIcon = style({
  color: vars.color.accent.tertiary,
  fontSize: vars.icon.lg,
});

export const authButton = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  marginLeft: "auto",
  height: vars.control.heightSm,
  paddingInline: vars.density.d3,
  borderRadius: vars.radius.full,
  background: vars.color.accent.tertiary,
  color: vars.color.onColor.tertiary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  selectors: {
    "&:hover": { opacity: 0.9 },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.tertiary}`,
      outlineOffset: vars.focus.offset,
    },
  },
});
