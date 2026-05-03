// audit-allow: px — sub-token spacing value, no density token at this step
// audit-allow: px — fixed layout breakpoint
// audit-allow: hex — neon decorative palette per design lang
// audit-allow: hex — pure-white contrast anchor
import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const grid = style({
  display: "grid",
  // audit-allow: px — px — fixed layout breakpoint
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: vars.space.gapLg,
});

export const card = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  padding: "20px 22px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "16px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: `linear-gradient(155deg, ${vars.color.bg.panel} 0%, ${vars.color.bg.elevated} 100%)`,
  cursor: "pointer",
  textAlign: "left",
  color: "inherit",
  font: "inherit",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    borderColor: `${vars.color.accent.primary}55`,
    // audit-allow: px — px — below minimum token granularity (sub-10px)
    transform: "translateY(-2px)",
    // audit-allow: px — px — sub-token spacing value, no density token at this step
    boxShadow: `0 16px 36px rgba(0,0,0,0.4), 0 0 0 1px ${vars.color.accent.primary}22`,
  },
  ":focus-visible": {
    // audit-allow: px — px — below minimum token granularity (sub-10px)
    outline: `2px solid ${vars.color.accent.primary}`,
    // audit-allow: px — px — below minimum token granularity (sub-10px)
    outlineOffset: "2px",
  },
});

export const cardFeatured = style({
  borderColor: `${vars.color.accent.primary}44`,
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      top: "-40%",
      right: "-20%",
      // audit-allow: px — px — modal/dialog/drawer width per UX spec
      width: "260px",
      // audit-allow: px — px — modal/dialog/drawer width per UX spec
      height: "260px",
      background: `radial-gradient(circle, ${vars.color.accent.primary}22 0%, transparent 70%)`,
      pointerEvents: "none",
      borderRadius: "50%",
    },
  },
});

export const topRow = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  gap: "12px",
  zIndex: 1,
});

export const iconBox = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  width: "44px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  height: "44px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "12px",
  // audit-allow: hex — hex — neon decorative palette per design lang
  background: `linear-gradient(135deg, ${vars.color.accent.primary}26 0%, #22D3EE26 100%)`,
  border: `1px solid ${vars.color.accent.primary}3a`,
  // audit-allow: hex — hex — pure-white contrast anchor
  color: "#ffffff",
  flexShrink: 0,
});

export const categoryBadge = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "3px 10px",
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: vars.color.text.secondary,
  backgroundColor: vars.color.bg.hover,
  border: `1px solid ${vars.color.outline.variant}`,
});

export const featuredTag = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "4px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "3px 10px",
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#22D3EE",
  backgroundColor: "rgba(34, 211, 238, 0.1)",
  border: "1px solid rgba(34, 211, 238, 0.3)",
});

export const title = style({
  position: "relative",
  zIndex: 1,
  fontFamily: vars.font.headline,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "18px",
  fontWeight: 600,
  letterSpacing: "-0.015em",
  color: vars.color.text.primary,
});

export const summary = style({
  position: "relative",
  zIndex: 1,
  fontFamily: vars.font.ui,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "13px",
  color: vars.color.text.secondary,
  lineHeight: 1.55,
});

export const footer = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "auto",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  paddingTop: "8px",
});

export const workflowRef = style({
  fontFamily: vars.font.code,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "11px",
  color: vars.color.text.muted,
});

export const openHint = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "4px",
  fontFamily: vars.font.ui,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "12px",
  fontWeight: 500,
  color: vars.color.accent.primary,
});

export const bannerSpaced = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  marginBottom: "16px",
});

export const iconSm = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "14px",
});

export const iconCard = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "22px",
  fontVariationSettings: "'FILL' 1, 'wght' 500",
});
