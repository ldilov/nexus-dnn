import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const heroEyebrowIcon = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "14px",
});

export const ctaStat = style({
  cursor: "pointer",
  textAlign: "left",
  background: vars.card.bg,
  border: "none",
  ":hover": {
    backgroundColor: vars.color.bg.hover,
  },
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.padSection,
  paddingBlock: vars.density.padSection,
  // audit-allow: px — fixed layout breakpoint
  maxWidth: "1400px",
  marginInline: "auto",
  width: "100%",
});

export const statGrid = style({
  display: "grid",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: vars.density.gapCard,
});

export const stat = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  padding: vars.density.padCard,
  borderRadius: vars.radius.card,
  backgroundColor: vars.card.bg,
  boxShadow: vars.card.shadow,
  backdropFilter: vars.card.backdrop,
});

export const statLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const statValue = style({
  fontFamily: vars.font.code,
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "clamp(36px, 2vw + 24px, 56px)",
  fontWeight: vars.font.weight.regular,
  color: vars.color.text.primary,
  lineHeight: 1,
  letterSpacing: "-0.02em",
});

export const statDelta = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
});

export const sectionLink = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.accent.primary,
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  ":hover": {
    textDecoration: "underline",
  },
});

export const emptyLine = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
});
