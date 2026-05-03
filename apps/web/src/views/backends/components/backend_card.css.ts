import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

// Spectral Graphite-aligned BackendCard — drops the pre-theme fallback hex
// audit-allow: hex — neon decorative palette per design lang
// literals (var(--surface-raised, #1c1d22)) that pre-dated the vanilla-extract
// theme contract; every value now flows through `vars.*` so the card
// participates in the same design system as the rest of the shell.

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  padding: vars.space.insetLg,
  borderRadius: vars.radius.card,
  background: vars.color.bg.panel,
  border: `1px solid ${vars.color.outline.variant}`,
  // audit-allow: px — fixed layout breakpoint
  minWidth: "320px",
  transition: "border-color 150ms ease, background 150ms ease",
  selectors: {
    "&:hover": {
      borderColor: vars.color.outline.base,
    },
  },
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.insetMd,
});

export const title = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.heading,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
});

// State-aware badges — each card_state picks its own pill color.
const badgeBase = {
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: `2px ${vars.space.insetSm}`,
  borderRadius: vars.radius.full,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  fontFamily: vars.font.code,
  fontWeight: vars.font.weight.semibold,
  border: "1px solid transparent",
  whiteSpace: "nowrap" as const,
};

export const badge = styleVariants({
  neutral: {
    ...badgeBase,
    background: vars.color.bg.elevated,
    color: vars.color.text.secondary,
    borderColor: vars.color.outline.variant,
  },
  ready: {
    ...badgeBase,
    background: vars.color.bg.elevated,
    color: vars.color.success.base,
    borderColor: vars.color.success.base,
  },
  installing: {
    ...badgeBase,
    background: vars.color.bg.elevated,
    color: vars.color.accent.primary,
    borderColor: vars.color.accent.primary,
  },
  warn: {
    ...badgeBase,
    background: vars.color.bg.elevated,
    color: vars.color.warning.base,
    borderColor: vars.color.warning.base,
  },
  error: {
    ...badgeBase,
    background: vars.color.bg.elevated,
    color: vars.color.error.base,
    borderColor: vars.color.error.base,
  },
});

export const body = style({
  fontSize: vars.font.size.bodySm,
  lineHeight: 1.55,
  color: vars.color.text.secondary,
  margin: 0,
});

export const version = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  letterSpacing: "0.04em",
});

export const actions = style({
  display: "flex",
  gap: vars.space.insetSm,
  marginTop: vars.space.insetXs,
  flexWrap: "wrap",
});

const buttonBase = {
  display: "inline-flex" as const,
  alignItems: "center" as const,
  gap: vars.space.insetXs,
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.04em",
  cursor: "pointer",
  border: "1px solid transparent",
  textTransform: "uppercase" as const,
  transition: "background 150ms ease, border-color 150ms ease, color 150ms ease",
};

export const buttonPrimary = style({
  ...buttonBase,
  background: vars.color.accent.primary,
  color: vars.color.onColor.primary,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.accent.primaryHover,
    },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.accent.primary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

export const buttonSecondary = style({
  ...buttonBase,
  background: "transparent",
  color: vars.color.text.primary,
  borderColor: vars.color.outline.variant,
  selectors: {
    "&:hover:not(:disabled)": {
      borderColor: vars.color.outline.base,
      background: vars.color.bg.hover,
    },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.accent.primary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

export const footerNote = style({
  fontSize: vars.font.size.bodySm,
  lineHeight: 1.5,
  color: vars.color.text.muted,
  margin: 0,
  marginTop: vars.space.insetXs,
});
