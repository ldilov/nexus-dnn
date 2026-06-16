import { globalStyle, keyframes, style } from "@vanilla-extract/css";

import { vars } from "../../../theme/contract.css";

const spin = keyframes({ to: { transform: "rotate(360deg)" } });

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
});

export const banner = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
  padding: vars.space.insetLg,
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
});

export const bannerRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapLg,
});

export const bannerFraction = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.display,
  fontWeight: vars.font.weight.medium,
  lineHeight: 1,
  letterSpacing: "-0.03em",
  color: vars.color.text.primary,
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
});

export const bannerDenominator = style({
  fontSize: "0.55em",
  fontWeight: vars.font.weight.regular,
  color: vars.color.text.secondary,
});

export const bannerText = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minWidth: 0,
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "3px",
});

export const bannerEyebrow = style({
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const bannerHeadline = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.medium,
  letterSpacing: "-0.005em",
  color: vars.color.text.primary,
});

export const bannerNote = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.accent.tertiary,
});

export const bannerActions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
});

export const installButton = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.onColor.primary,
  background: vars.color.accent.primary,
  border: "none",
  cursor: "pointer",
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: `10px ${vars.space.insetXl}`,
  borderRadius: vars.radius.control,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.accent.primaryHover,
      transform: "translateY(-1px)",
    },
    "&:active:not(:disabled)": { transform: "translateY(0)" },
    // "All set" rest state: the primary stays violet but dims out (canonical mock).
    "&:disabled": {
      background: `color-mix(in oklch, ${vars.color.accent.primary} 32%, transparent)`,
      color: `color-mix(in oklch, ${vars.color.onColor.primary} 70%, transparent)`,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.accent.primary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
});

export const cancelButton = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  background: vars.color.bg.elevated,
  border: "none",
  cursor: "pointer",
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: `10px ${vars.space.insetLg}`,
  borderRadius: vars.radius.control,
  selectors: {
    "&:hover": { background: vars.color.bg.bright },
  },
});

/**
 * Secondary "Reinstall everything" CTA. Outlined / ghost styling so it sits
 * next to the primary install button without competing for attention — the
 * primary remains the green-path action; reinstall is the recovery action.
 */
export const reinstallButton = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  background: "transparent",
  border: `1px solid ${vars.color.bg.bright}`,
  cursor: "pointer",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: `9px ${vars.space.insetLg}`,
  borderRadius: vars.radius.control,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.bg.elevated,
      borderColor: vars.color.accent.primary,
    },
    "&:disabled": {
      color: vars.color.text.muted,
      borderColor: vars.color.bg.elevated,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.accent.primary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
});

/**
 * "Uninstall" CTA. Ghost/outlined like reinstall but danger-tinted on hover so
 * the reversal action reads as destructive without dominating the banner.
 */
export const uninstallButton = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.error.text,
  background: "transparent",
  border: `1px solid ${vars.color.bg.bright}`,
  cursor: "pointer",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: `9px ${vars.space.insetLg}`,
  borderRadius: vars.radius.control,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.bg.elevated,
      borderColor: vars.color.error.base,
    },
    "&:disabled": {
      color: vars.color.text.muted,
      borderColor: vars.color.bg.elevated,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.error.base}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
});

export const stepList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
});

export const group = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const groupHead = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.space.gapMd,
  paddingInline: vars.space.insetSm,
});

/** Mono micro-cap group ordinal ("01") in dim outline color. */
export const groupIndex = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.08em",
  color: vars.color.text.muted,
  fontVariantNumeric: "tabular-nums",
});

export const groupTitle = style({
  margin: 0,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodyLg,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "-0.005em",
  color: vars.color.text.primary,
});

export const groupMeta = style({
  marginLeft: "auto",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  fontVariantNumeric: "tabular-nums",
});

/** One surface-low card per group; rows inside separate by hairline dividers. */
export const groupCard = style({
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
  overflow: "hidden",
});

// Legal hairline row divider inside a card (G1) — tonal, token-derived.
globalStyle(`${groupCard} > article + article`, {
  borderTop: `1px solid color-mix(in oklch, ${vars.color.outline.variant} 40%, transparent)`,
});

export const emptyState = style({
  padding: vars.space.insetXl,
  textAlign: "center",
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.text.secondary,
});

export const allSatisfied = style({
  background: `linear-gradient(135deg, ${vars.color.accent.secondaryContainer}, ${vars.color.bg.panel})`,
});

export const loadingRow = style([
  emptyState,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.space.gapMd,
  },
]);

export const spinner = style({
  // audit-allow: px — spinner glyph sub-token
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  flexShrink: 0,
  border: "2px solid rgba(255,255,255,0.14)",
  borderTopColor: "var(--accent, #ba9eff)",
  animation: `${spin} 0.8s linear infinite`,
});
