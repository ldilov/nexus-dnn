import { style } from "@vanilla-extract/css";

export const bannerSpaced = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  marginBottom: "16px",
});

export const iconSpaced = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  marginRight: "10px",
});

export const iconSm = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "14px",
});

export const iconCard = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "22px",
  fontVariationSettings: "'FILL' 1, 'wght' 500",
});

export const warningBadge = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#f59e0b",
});
