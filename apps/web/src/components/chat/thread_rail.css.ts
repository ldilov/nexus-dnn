import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

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
    "(max-width: 1280px)": {
      display: "none",
    },
  },
});

export const newThreadBtn = style({
  height: "28px",
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
  gap: "2px",
});

export const item = style({
  flex: "1 1 auto",
  display: "flex",
  flexDirection: "column",
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
    "(max-width: 1280px)": {
      display: "none",
    },
  },
});
