import { style, styleVariants } from "@vanilla-extract/css";
import { motion } from "../styles/motion.css";
import { vars } from "../theme/contract.css";

export const panel = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
  padding: `${vars.space.insetXl} 0 0`,
});

export const panelHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const eyebrow = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: vars.color.accent.secondary,
  fontWeight: vars.font.weight.semibold,
});

export const title = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.heading,
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
  maxWidth: "72ch",
  lineHeight: 1.55,
});

export const controls = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.gapSm,
  alignItems: "flex-end",
});

export const searchField = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  minWidth: "240px",
});

export const filterField = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  minWidth: "140px",
});

export const label = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

const recessedInput = {
  background: vars.color.bg.lowest,
  color: vars.color.text.primary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  border: "none",
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  transition: `border-color ${motion.duration.focusRing}, box-shadow ${motion.duration.focusRing}`,
  outline: "none",
};

export const input = style({
  ...recessedInput,
  selectors: {
    "&:focus": {
      borderBottomColor: vars.color.accent.primary,
      boxShadow: `0 2px 0 0 ${vars.color.accent.primary}`,
    },
  },
});

export const select = style({
  ...recessedInput,
  appearance: "none",
  paddingRight: vars.space.insetLg,
  selectors: {
    "&:focus": {
      borderBottomColor: vars.color.accent.primary,
      boxShadow: `0 2px 0 0 ${vars.color.accent.primary}`,
    },
  },
});

export const resultsGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
  gap: vars.space.gapMd,
});

export const resultCard = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  padding: vars.space.insetLg,
  background: vars.color.bg.panel,
  borderRadius: "8px",
  transition: `background ${motion.duration.cardGlow}, transform ${motion.duration.cardGlow}`,
  selectors: {
    "&:hover": {
      background: vars.color.bg.elevated,
    },
  },
});

export const cardHead = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: vars.space.gapSm,
});

export const repoId = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  wordBreak: "break-word",
  lineHeight: 1.35,
});

export const meta = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.gapXs,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  letterSpacing: "0.02em",
});

export const chipRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.gapXs,
});

const chipBase = {
  display: "inline-flex" as const,
  alignItems: "center" as const,
  gap: "6px",
  padding: "2px 10px",
  borderRadius: vars.radius.full,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  letterSpacing: "0.04em",
  background: vars.color.bg.elevated,
};

export const chip = styleVariants({
  neutral: {
    ...chipBase,
    color: vars.color.text.secondary,
  },
  accent: {
    ...chipBase,
    color: vars.color.accent.primary,
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
  },
  success: {
    ...chipBase,
    color: vars.color.success.base,
    selectors: {
      "&::before": {
        content: "",
        display: "block",
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: vars.color.success.base,
      },
    },
  },
  mute: {
    ...chipBase,
    color: vars.color.text.muted,
  },
});

export const installRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: vars.space.insetXs,
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

export const installButton = style({
  ...buttonBase,
  background: vars.color.accent.primary,
  color: vars.color.onColor.primary,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.accent.primaryHover,
      boxShadow: `0 0 12px 0 color-mix(in srgb, ${vars.color.accent.primaryDim} 45%, transparent)`,
    },
    "&:disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

export const emptyState = style({
  padding: vars.space.insetXl,
  textAlign: "center",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
});

export const errorBanner = style({
  padding: vars.space.insetMd,
  background: `color-mix(in srgb, ${vars.color.error.base} 18%, ${vars.color.bg.panel})`,
  color: vars.color.error.base,
  borderRadius: "8px",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});

export const followupNote = style({
  padding: vars.space.insetMd,
  background: vars.color.bg.panel,
  borderRadius: "8px",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
  lineHeight: 1.55,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const followupLabel = style({
  fontSize: vars.font.size.caption,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: vars.color.accent.tertiary,
  fontWeight: vars.font.weight.semibold,
});
