import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const reconcilePulseAnim = keyframes({
  "0%, 100%": { opacity: 0.55 },
  "50%": { opacity: 1 },
});

export const reconcilePulse = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  marginInlineStart: "auto",
  marginInlineEnd: vars.density.d2,
  paddingInline: vars.density.d2,
  paddingBlock: 0,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.06em",
  color: vars.color.accent.primary,
  textTransform: "uppercase",
  animation: `${reconcilePulseAnim} 1400ms ${vars.motion.easingDefault} infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 0.85,
    },
  },
});

export const reconcileDot = style({
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
  background: vars.color.accent.primary,
});

export const rail = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  paddingInline: vars.density.d3,
  paddingBlock: vars.density.d4,
  background: vars.color.bg.panel,
  overflowY: "auto",
  borderRight: `1px solid ${vars.color.outline.variant}`,
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(max-width: 1280px)": {
      paddingInline: vars.density.d2,
    },
  },
});

export const railHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBlock: vars.density.d2,
  paddingInline: vars.density.d2,
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(max-width: 1280px)": {
      display: "none",
    },
  },
});

export const newThreadBtn = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  height: "28px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  width: "28px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.full,
  background: vars.color.bg.lowest,
  color: vars.color.text.secondary,
  border: "none",
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
});

export const row = style({
  display: "flex",
  alignItems: "stretch",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "2px",
});

export const item = style({
  flex: "1 1 auto",
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "2px",
  paddingInline: vars.density.d3,
  paddingBlock: vars.density.d2,
  borderRadius: vars.radius.control,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
  color: vars.color.text.secondary,
  minWidth: 0,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  selectors: {
    "&[aria-current='true']": {
      backgroundImage: `linear-gradient(135deg, color-mix(in oklab, ${vars.color.accent.primaryDim} 38%, transparent), color-mix(in oklab, ${vars.color.accent.secondaryDim} 22%, transparent))`,
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent.primaryDim} 55%, transparent)`,
      color: vars.color.text.primary,
    },
  },
});

export const iconBtn = style({
  flex: "0 0 auto",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — sub-token spacing value, no density token at this step
  width: "28px",
  borderRadius: vars.radius.control,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: vars.color.text.muted,
  opacity: 0,
  transition: `opacity ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": { background: vars.color.bg.hover, color: vars.color.text.primary, opacity: 1 },
  ":focus-visible": { opacity: 1 },
  selectors: {
    [`${row}:hover &`]: { opacity: 1 },
  },
});

export const renameInput = style({
  width: "100%",
  // audit-allow: px — below minimum token granularity (sub-10px)
  paddingBlock: "2px",
  paddingInline: vars.density.d2,
  borderRadius: vars.radius.control,
  background: vars.color.bg.lowest,
  color: vars.color.text.primary,
  border: `1px solid ${vars.color.outline.variant}`,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  outline: "none",
  ":focus": { borderColor: vars.color.accent.secondary },
});

export const itemTitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const itemMeta = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(max-width: 1280px)": {
      display: "none",
    },
  },
});
