import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.padSection,
  paddingBlock: vars.density.padSection,
  // audit-allow: px — fixed layout breakpoint
  maxWidth: "1400px",
  marginInline: "auto",
  width: "100%",
});

export const filterBar = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  flexWrap: "wrap",
  position: "sticky",
  top: 0,
  zIndex: 1,
  paddingBlock: vars.density.d3,
  background: vars.color.bg.canvas,
});

export const moduleSelect = style({
  height: vars.control.heightSm,
  paddingInline: vars.density.d4,
  background: vars.color.bg.lowest,
  color: vars.color.text.primary,
  border: "none",
  borderRadius: vars.radius.full,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  cursor: "pointer",
});

export const cardGrid = style({
  display: "grid",
  // audit-allow: px — fixed layout breakpoint
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: vars.density.gapCard,
  listStyle: "none",
  padding: 0,
  margin: 0,
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(min-width: 1280px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    // audit-allow: px — fixed layout breakpoint
    "(min-width: 960px) and (max-width: 1279px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
  padding: vars.density.padCard,
  borderRadius: vars.radius.card,
  background: vars.card.bg,
  boxShadow: vars.card.shadow,
  backdropFilter: vars.card.backdrop,
  cursor: "pointer",
  textAlign: "left",
  border: "none",
  transition: `transform ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    backgroundColor: vars.color.bg.hover,
    transform: "translateY(-1px)",
  },
});

export const cardHeader = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: vars.density.d3,
});

export const cardTitle = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: "-0.01em",
  margin: 0,
});

export const cardSlug = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  letterSpacing: "0.02em",
});

export const cardMeta = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.density.d3,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
});

export const cardMetaItem = style({
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.density.d2,
});

export const cardMetaLabel = style({
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const cardModuleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  marginTop: "auto",
});

export const summaryGrid = style({
  display: "grid",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: vars.density.gapCard,
});

export const summaryStat = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  padding: vars.density.padCard,
  borderRadius: vars.radius.card,
  background: vars.card.bg,
});

export const summaryStatLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const summaryStatValue = style({
  fontFamily: vars.font.code,
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "clamp(28px, 1.6vw + 18px, 44px)",
  fontWeight: vars.font.weight.regular,
  color: vars.color.text.primary,
  lineHeight: 1,
  letterSpacing: "-0.02em",
});

export const error = style({
  padding: vars.density.padCard,
  borderRadius: vars.radius.card,
  background: vars.card.bg,
  color: vars.color.error.text,
  fontSize: vars.font.size.bodySm,
});

export const subtitle = style({
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
  margin: 0,
});

export const cardWrapper = style({
  position: "relative",
  display: "block",
});

export const deleteButton = style({
  position: "absolute",
  top: vars.density.d3,
  right: vars.density.d3,
  width: vars.control.heightSm,
  height: vars.control.heightSm,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderRadius: vars.radius.full,
  background: "transparent",
  color: vars.color.text.muted,
  cursor: "pointer",
  opacity: 0,
  transition: `opacity ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  zIndex: 1,
  selectors: {
    [`${cardWrapper}:hover &, ${cardWrapper}:focus-within &`]: {
      opacity: 1,
    },
    "&:hover, &:focus-visible": {
      background: vars.color.bg.hover,
      color: vars.color.error.text,
      opacity: 1,
    },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
      outlineOffset: vars.focus.offset,
    },
  },
});

export const deleteIcon = style({
  fontSize: vars.icon.sm,
});
