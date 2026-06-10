import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

// Canonical Spectral Graphite RuntimeCard — flat borderless card, density
// tokens, mono pill status chips, sentence-case action buttons.

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
  padding: vars.density.padCard,
  borderRadius: vars.radius.card,
  background: vars.card.bg,
  boxShadow: vars.card.shadow,
  // audit-allow: px — hover-warm hairline, documented accent-25% exception
  border: "1px solid transparent",
  // audit-allow: px — fixed layout breakpoint
  minWidth: "280px",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      borderColor: `color-mix(in srgb, ${vars.color.accent.accent} 25%, transparent)`,
    },
  },
});

export const header = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.density.d3,
});

export const title = style({
  fontFamily: vars.font.headline,
  // audit-allow: px — RuntimeCard canonical name size per design kit
  fontSize: "17px",
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  lineHeight: 1.3,
  letterSpacing: "-0.01em",
  flex: 1,
  minWidth: 0,
});

// Status chips — fixed-height mono pills; status color on text + hairline only.
const badgeBase = {
  display: "inline-flex" as const,
  alignItems: "center" as const,
  // audit-allow: px — RuntimeCard canonical chip height per design kit
  height: "22px",
  // audit-allow: px — RuntimeCard canonical chip inset per design kit
  padding: "0 10px",
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  whiteSpace: "nowrap" as const,
  flexShrink: 0,
  background: "transparent",
  // audit-allow: px — hairline status outline per chip anatomy
  border: "1px solid transparent",
};

export const badge = styleVariants({
  neutral: {
    ...badgeBase,
    color: vars.color.text.secondary,
    borderColor: `color-mix(in srgb, ${vars.color.outline.variant} 40%, transparent)`,
  },
  ready: {
    ...badgeBase,
    color: vars.color.success.base,
    borderColor: `color-mix(in srgb, ${vars.color.success.base} 50%, transparent)`,
  },
  installing: {
    ...badgeBase,
    color: vars.color.accent.accent,
    borderColor: `color-mix(in srgb, ${vars.color.accent.accent} 50%, transparent)`,
  },
  warn: {
    ...badgeBase,
    color: vars.color.warning.base,
    borderColor: `color-mix(in srgb, ${vars.color.warning.base} 50%, transparent)`,
  },
  error: {
    ...badgeBase,
    color: vars.color.error.base,
    borderColor: `color-mix(in srgb, ${vars.color.error.base} 50%, transparent)`,
  },
});

export const body = style({
  fontSize: vars.font.size.body,
  lineHeight: 1.55,
  color: vars.color.text.secondary,
  margin: 0,
});

export const version = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
  fontVariantNumeric: "tabular-nums",
});

export const actions = style({
  display: "flex",
  gap: vars.density.d2,
  flexWrap: "wrap",
});

const buttonBase = {
  display: "inline-flex" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  gap: vars.density.d2,
  height: vars.control.heightMd,
  padding: `0 ${vars.density.d3}`,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  letterSpacing: "0",
  cursor: "pointer",
  border: "none",
  whiteSpace: "nowrap" as const,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationNormal} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
};

export const buttonPrimary = style({
  ...buttonBase,
  background: vars.color.accent.accent,
  color: vars.color.onColor.primary,
  selectors: {
    "&:hover:not(:disabled)": {
      boxShadow: vars.shadow.glowAccent,
    },
    "&:active:not(:disabled)": {
      background: vars.color.accent.accentDim,
    },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
      outlineOffset: vars.focus.offset,
    },
    "&:disabled": {
      opacity: 0.45,
      cursor: "not-allowed",
      boxShadow: "none",
    },
  },
});

export const buttonSecondary = style({
  ...buttonBase,
  background: vars.color.bg.hover,
  color: vars.color.text.primary,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.bg.bright,
    },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
      outlineOffset: vars.focus.offset,
    },
    "&:disabled": {
      opacity: 0.45,
      cursor: "not-allowed",
    },
  },
});

export const footerNote = style({
  fontSize: vars.font.size.bodySm,
  lineHeight: 1.5,
  color: vars.color.text.secondary,
  margin: 0,
  paddingTop: vars.density.d2,
  // audit-allow: px — legal hairline row divider inside card
  borderTop: `1px solid color-mix(in srgb, ${vars.color.outline.variant} 16%, transparent)`,
});
