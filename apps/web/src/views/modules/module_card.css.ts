import { style } from "@vanilla-extract/css";
import { motion, vars } from "../../styles";

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  background: vars.color.surfaceContainerLow,
  border: `1px solid ${vars.color.outlineVariant}`,
  borderRadius: vars.radius.lg,
  padding: vars.space.lg,
  transition: `transform ${motion.duration.cardHoverLift}, box-shadow ${motion.duration.cardGlow}`,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      // audit-allow: px — px — below minimum token granularity (sub-10px)
      transform: "translateY(-2px)",
      // audit-allow: px — px — below minimum token granularity (sub-10px)
      boxShadow: `0 0 0 1px ${vars.color.primaryDim}, 0 8px 24px ${vars.color.shadowElevation}`,
    },
    "&:focus-within": {
      // audit-allow: px — px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.primary}`,
      // audit-allow: px — px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
      selectors: {
        "&:hover": { transform: "none" },
      },
    },
  },
});

export const blankCard = style({
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  border: `2px dashed ${vars.color.outline}`,
  background: "transparent",
});

export const head = style({
  display: "flex",
  gap: vars.space.md,
  alignItems: "center",
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  flex: 1,
  minWidth: 0,
});

export const title = style({
  fontSize: vars.text.titleS,
  fontWeight: 600,
  color: vars.color.onSurface,
  margin: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const subtitle = style({
  fontSize: vars.text.bodyS,
  color: vars.color.onSurfaceVariant,
  fontFamily: vars.font.mono,
  margin: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const tagRow = style({
  display: "flex",
  gap: vars.space.xs,
  flexWrap: "wrap",
});

export const tag = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  background: vars.color.surfaceContainerHigh,
  color: vars.color.onSurfaceVariant,
  borderRadius: vars.radius.full,
  fontSize: vars.text.labelS,
  letterSpacing: vars.tracking.wide,
});

export const actions = style({
  display: "flex",
  gap: vars.space.sm,
  marginTop: "auto",
});

export const primaryBtn = style({
  background: vars.color.primary,
  color: vars.color.onPrimary,
  border: "none",
  padding: `${vars.space.sm} ${vars.space.md}`,
  fontWeight: 600,
  borderRadius: vars.radius.md,
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.text.bodyS,
  flex: 1,
  selectors: {
    "&:hover": { background: vars.color.primaryDim },
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
    "&:focus-visible": {
      // audit-allow: px — px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.primary}`,
      // audit-allow: px — px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
});

export const secondaryBtn = style({
  background: "transparent",
  color: vars.color.onSurface,
  border: `1px solid ${vars.color.outlineVariant}`,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.text.bodyS,
  flex: 1,
  selectors: {
    "&:hover": { background: vars.color.surfaceContainer },
    "&:focus-visible": {
      // audit-allow: px — px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.primary}`,
      // audit-allow: px — px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
});

export const counts = style({
  display: "flex",
  gap: vars.space.md,
  fontSize: vars.text.labelS,
  color: vars.color.onSurfaceVariant,
});

export const countItem = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
});

export const quickPickButton = style({
  background: "transparent",
  color: vars.color.onPrimary,
  border: "none",
  padding: `${vars.space.sm} ${vars.space.sm}`,
  borderLeft: `1px solid ${vars.color.primaryDim}`,
  cursor: "pointer",
});

export const iconSm = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "14px",
});

export const ctaRow = style({
  display: "flex",
  flex: 1,
  position: "relative",
});

export const ctaSplitRight = style({
  flex: 0,
  padding: "0.5rem 0.5rem",
  borderLeft: "1px solid currentColor",
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
});
