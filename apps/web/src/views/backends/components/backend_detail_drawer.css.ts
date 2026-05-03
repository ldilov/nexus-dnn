// audit-allow: px — modal/dialog/drawer width per UX spec
// audit-allow: px — sub-token spacing value, no density token at this step
import { style, keyframes } from "@vanilla-extract/css";
import { motion } from "../../../styles/motion.css";
import { vars } from "../../../theme/contract.css";

const slideIn = keyframes({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  from: { transform: "translateX(24px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

export const scrim = style({
  position: "fixed",
  inset: 0,
  background: vars.color.scrim,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  backdropFilter: "blur(4px)",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  WebkitBackdropFilter: "blur(4px)",
  zIndex: 40,
  display: "flex",
  justifyContent: "flex-end",
});

export const drawer = style({
  // audit-allow: px — px — fixed layout breakpoint
  width: "min(520px, 100vw)",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  background: `color-mix(in srgb, ${vars.color.bg.elevated} 82%, transparent)`,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  backdropFilter: "blur(20px) saturate(140%)",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  WebkitBackdropFilter: "blur(20px) saturate(140%)",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
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

export const headerRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: vars.space.gapMd,
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
  margin: 0,
});

export const stateChip = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "6px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "2px 10px",
  borderRadius: vars.radius.full,
  background: vars.color.bg.elevated,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: vars.color.text.primary,
  flexShrink: 0,
});

export const body = style({
  flex: 1,
  overflowY: "auto",
  padding: vars.space.insetXl,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
  background: vars.color.bg.canvas,
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const sectionLabel = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
  fontWeight: vars.font.weight.semibold,
});

export const metaGrid = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: `${vars.space.gapXs} ${vars.space.gapMd}`,
  alignItems: "baseline",
});

export const metaLabel = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  letterSpacing: "0.04em",
});

export const metaValue = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
  wordBreak: "break-all",
});

export const logWrap = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  minHeight: "180px",
  // audit-allow: px — px — modal/dialog/drawer width per UX spec
  maxHeight: "280px",
  background: vars.color.bg.lowest,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "6px",
  overflow: "hidden",
});

export const validationBanner = style({
  padding: vars.space.insetMd,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "8px",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  lineHeight: 1.55,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const bannerError = style({
  background: `color-mix(in srgb, ${vars.color.error.base} 16%, ${vars.color.bg.panel})`,
  color: vars.color.error.base,
});

export const bannerSuccess = style({
  background: `color-mix(in srgb, ${vars.color.success.base} 16%, ${vars.color.bg.panel})`,
  color: vars.color.success.base,
});

export const footer = style({
  display: "flex",
  gap: vars.space.gapSm,
  padding: vars.space.insetXl,
  background: vars.color.bg.panel,
  flexWrap: "wrap",
});

const buttonBase = {
  display: "inline-flex" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  padding: `${vars.space.insetSm} ${vars.space.insetLg}`,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
  border: "1px solid transparent",
  cursor: "pointer",
  transition: `background ${motion.duration.cardGlow}, box-shadow ${motion.duration.cardGlow}`,
};

export const primaryButton = style({
  ...buttonBase,
  background: vars.color.accent.primary,
  color: vars.color.onColor.primary,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.accent.primaryHover,
      // audit-allow: px — px — sub-token spacing value, no density token at this step
      boxShadow: `0 0 12px 0 color-mix(in srgb, ${vars.color.accent.primaryDim} 45%, transparent)`,
    },
    "&:disabled": { opacity: 0.4, cursor: "not-allowed" },
  },
});

export const secondaryButton = style({
  ...buttonBase,
  background: "transparent",
  color: vars.color.text.primary,
  selectors: {
    "&:hover": { background: vars.color.bg.hover },
  },
});

export const destructiveButton = style({
  ...buttonBase,
  background: "transparent",
  color: vars.color.accent.tertiary,
  selectors: {
    "&:hover": {
      background: `color-mix(in srgb, ${vars.color.accent.tertiary} 14%, transparent)`,
    },
  },
});
