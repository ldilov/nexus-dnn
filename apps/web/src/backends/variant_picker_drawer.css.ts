import { style, styleVariants, keyframes } from "@vanilla-extract/css";
import { motion } from "../styles/motion.css";
import { vars } from "../theme/contract.css";

const slideIn = keyframes({
  from: { transform: "translateX(24px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

export const scrim = style({
  position: "fixed",
  inset: 0,
  background: vars.color.scrim,
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  zIndex: 40,
  display: "flex",
  justifyContent: "flex-end",
});

export const drawer = style({
  width: "min(440px, 100vw)",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  background: `color-mix(in srgb, ${vars.color.bg.elevated} 82%, transparent)`,
  backdropFilter: "blur(20px) saturate(140%)",
  WebkitBackdropFilter: "blur(20px) saturate(140%)",
  boxShadow: `0 12px 32px 0 ${vars.color.shadowElevation}`,
  animation: `${slideIn} ${motion.duration.drawerSlide} ${motion.ease.outExpo}`,
  color: vars.color.text.primary,
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  padding: `${vars.space.insetXl} ${vars.space.insetXl} ${vars.space.insetLg}`,
  background: vars.color.bg.panel,
});

export const eyebrow = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const title = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingLg,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "-0.01em",
  color: vars.color.text.primary,
  margin: 0,
});

export const subtitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
  margin: 0,
  lineHeight: 1.5,
});

export const body = style({
  flex: 1,
  overflowY: "auto",
  padding: vars.space.insetXl,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  background: vars.color.bg.canvas,
});

export const loading = style({
  padding: vars.space.insetXl,
  textAlign: "center",
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
});

export const errorBanner = style({
  padding: vars.space.insetMd,
  background: `color-mix(in srgb, ${vars.color.error.base} 18%, ${vars.color.bg.panel})`,
  color: vars.color.error.base,
  borderRadius: vars.radius.card,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  lineHeight: 1.5,
});

const rowBase = {
  display: "flex" as const,
  alignItems: "center" as const,
  gap: vars.space.gapSm,
  padding: vars.space.insetMd,
  borderRadius: vars.radius.card,
  background: vars.color.bg.panel,
  cursor: "pointer",
  transition: `background ${motion.duration.cardGlow}, transform ${motion.duration.cardGlow}`,
  userSelect: "none" as const,
};

export const row = styleVariants({
  idle: {
    ...rowBase,
    selectors: {
      "&:hover": {
        background: vars.color.bg.hover,
      },
    },
  },
  selected: {
    ...rowBase,
    background: vars.color.bg.elevated,
    boxShadow: `inset 0 0 0 1px ${vars.color.accent.primary}`,
  },
  disabled: {
    ...rowBase,
    cursor: "not-allowed",
    opacity: 0.55,
    background: vars.color.bg.panel,
  },
});

export const radioMark = style({
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  background: vars.color.bg.canvas,
  boxShadow: `inset 0 0 0 1.5px ${vars.color.outline.variant}`,
  flexShrink: 0,
  transition: `box-shadow ${motion.duration.focusRing}, background ${motion.duration.focusRing}`,
  selectors: {
    [`${row.selected} &`]: {
      background: vars.color.accent.primary,
      boxShadow: `inset 0 0 0 1.5px ${vars.color.accent.primary}, 0 0 12px 0 color-mix(in srgb, ${vars.color.accent.primaryDim} 50%, transparent)`,
    },
  },
});

export const rowContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  flex: 1,
  minWidth: 0,
});

export const rowLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodyLg,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
  letterSpacing: "0.02em",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const rowMeta = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  letterSpacing: "0.02em",
});

export const recommendedChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "2px 8px",
  borderRadius: vars.radius.full,
  background: vars.color.bg.elevated,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.accent.primary,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  flexShrink: 0,
  selectors: {
    "&::before": {
      content: "",
      display: "block",
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: vars.color.accent.primary,
      boxShadow: `0 0 8px 0 ${vars.color.accent.primaryDim}`,
    },
  },
});

export const unsupportedTag = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  fontStyle: "italic",
});

export const footer = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.space.gapSm,
  padding: vars.space.insetXl,
  background: vars.color.bg.panel,
});

const buttonBase = {
  display: "inline-flex" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  minHeight: "40px",
  padding: `${vars.space.insetSm} ${vars.space.insetLg}`,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
  border: "1px solid transparent",
  cursor: "pointer",
  transition: `background ${motion.duration.cardGlow}, box-shadow ${motion.duration.cardGlow}, border-color ${motion.duration.cardGlow}`,
};

export const primaryButton = style({
  ...buttonBase,
  background: vars.color.accent.primary,
  color: vars.color.onColor.primary,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.accent.primaryHover,
      boxShadow: `0 0 12px 0 color-mix(in srgb, ${vars.color.accent.primaryDim} 45%, transparent)`,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent.primary}`,
      outlineOffset: "2px",
    },
    "&:disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

export const secondaryButton = style({
  ...buttonBase,
  background: "transparent",
  color: vars.color.text.primary,
  selectors: {
    "&:hover": {
      background: vars.color.bg.hover,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent.primary}`,
      outlineOffset: "2px",
    },
  },
});

export const modeBadge = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 8px",
  borderRadius: vars.radius.full,
  background: vars.color.bg.elevated,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.color.accent.tertiary,
  width: "fit-content",
});
