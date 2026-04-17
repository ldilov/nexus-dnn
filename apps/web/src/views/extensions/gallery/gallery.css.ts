import { style, globalStyle, keyframes } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXl,
  padding: vars.space.insetLg,
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.insetLg,
});

export const sectionHeader = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.insetMd,
});

export const sectionTitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
});

export const sectionCount = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.accent.primary,
  background: vars.color.bg.elevated,
  padding: `2px ${vars.space.insetSm}`,
  borderRadius: vars.radius.control,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: vars.space.gapLg,
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.insetMd,
  padding: vars.space.insetLg,
  background: vars.color.bg.panel,
  borderRadius: vars.radius.card,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      background: vars.color.bg.elevated,
    },
  },
});

export const cardDisabled = style({
  opacity: 0.72,
});

export const cardHead = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.space.insetMd,
});

export const iconTile = style({
  width: "40px",
  height: "40px",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.control,
  background: vars.color.accent.secondaryContainer,
  color: vars.color.accent.primary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.bold,
});

export const headText = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: 0,
});

export const titleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  flexWrap: "wrap",
});

export const title = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodyLg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  lineHeight: vars.font.lineHeight.tight,
});

export const sourceChip = style({
  fontFamily: vars.font.ui,
  fontSize: "9px",
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  padding: `2px 6px`,
  borderRadius: "3px",
  background: vars.color.bg.hover,
  color: vars.color.text.secondary,
});

export const statusPill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontFamily: vars.font.ui,
  fontSize: "10px",
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: `2px ${vars.space.insetSm}`,
  borderRadius: vars.radius.full,
  background: vars.color.bg.hover,
  color: vars.color.text.secondary,
});

export const statusDot = style({
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
  flexShrink: 0,
});

export const statusDotActive = style({
  background: vars.color.success.base,
});

export const statusDotDisabled = style({
  background: vars.color.warning.base,
});

export const statusDotInvalid = style({
  background: vars.color.error.base,
});

export const meta = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const capabilityRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.gapXs,
});

export const capability = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  fontFamily: vars.font.ui,
  fontSize: "10px",
  fontWeight: vars.font.weight.medium,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  padding: `3px ${vars.space.insetSm}`,
  borderRadius: vars.radius.control,
  background: vars.color.bg.hover,
  color: vars.color.text.secondary,
});

export const metrics = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: vars.space.insetMd,
  paddingTop: vars.space.insetSm,
});

export const metricLabel = style({
  fontFamily: vars.font.ui,
  fontSize: "9px",
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const metricValue = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodyLg,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.primary,
  marginTop: "2px",
});

export const metricValueMuted = style({
  color: vars.color.text.muted,
});

export const footer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "auto",
  paddingTop: vars.space.insetMd,
});

export const footerActions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapXs,
});

export const iconButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "28px",
  height: "28px",
  border: "none",
  borderRadius: vars.radius.control,
  background: "transparent",
  color: vars.color.text.muted,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      background: vars.color.bg.hover,
      color: vars.color.text.primary,
    },
    "&:disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

export const iconButtonDanger = style({
  selectors: {
    "&:hover": {
      color: vars.color.error.base,
    },
  },
});

// ---------- Toggle switch ----------
export const toggle = style({
  position: "relative",
  width: "36px",
  height: "20px",
  border: "none",
  borderRadius: vars.radius.full,
  background: vars.color.bg.hover,
  cursor: "pointer",
  padding: 0,
  transition: `background ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
  selectors: {
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

export const toggleOn = style({
  background: vars.color.accent.primary,
  boxShadow: `0 0 10px 0 ${vars.color.accent.primaryDim}66`,
});

export const toggleKnob = style({
  position: "absolute",
  top: "2px",
  left: "2px",
  width: "16px",
  height: "16px",
  borderRadius: vars.radius.full,
  background: "#ffffff",
  transition: `transform ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
});

export const toggleKnobOn = style({
  transform: "translateX(16px)",
});

// ---------- Install drop zone ----------
const dashPulse = keyframes({
  "0%, 100%": { opacity: 0.6 },
  "50%": { opacity: 1 },
});

export const installCard = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.insetSm,
  minHeight: "220px",
  borderRadius: vars.radius.card,
  background: vars.color.bg.panel,
  color: vars.color.text.muted,
  cursor: "pointer",
  outline: `1px dashed ${vars.color.outline.variant}`,
  outlineOffset: "-1px",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}, outline-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      background: vars.color.bg.elevated,
      color: vars.color.accent.primary,
      outlineColor: vars.color.accent.primary,
    },
  },
});

export const installCardActive = style({
  background: vars.color.bg.elevated,
  color: vars.color.accent.primary,
  outline: `1px dashed ${vars.color.accent.primary}`,
  animation: `${dashPulse} 1.2s ease-in-out infinite`,
});

export const installIcon = style({
  width: "48px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.full,
  fontSize: "28px",
  lineHeight: 1,
});

export const installTitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
});

export const installHint = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const emptyState = style({
  padding: vars.space.insetLg,
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});

export const errorState = style({
  padding: vars.space.insetLg,
  color: vars.color.error.base,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});

// Make sure hidden file input doesn't take visual space
globalStyle(`.${installCard} input[type="file"]`, {
  display: "none",
});
