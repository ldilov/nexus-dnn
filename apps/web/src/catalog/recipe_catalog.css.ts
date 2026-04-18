import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: vars.space.gapLg,
});

export const card = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  padding: "20px 22px",
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
    transform: "translateY(-2px)",
    boxShadow: `0 16px 36px rgba(0,0,0,0.4), 0 0 0 1px ${vars.color.accent.primary}22`,
  },
  ":focus-visible": {
    outline: `2px solid ${vars.color.accent.primary}`,
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
      width: "260px",
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
  gap: "12px",
  zIndex: 1,
});

export const iconBox = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "44px",
  height: "44px",
  borderRadius: "12px",
  background: `linear-gradient(135deg, ${vars.color.accent.primary}26 0%, #22D3EE26 100%)`,
  border: `1px solid ${vars.color.accent.primary}3a`,
  color: "#ffffff",
  flexShrink: 0,
});

export const categoryBadge = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "3px 10px",
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
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
  gap: "4px",
  padding: "3px 10px",
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#22D3EE",
  backgroundColor: "rgba(34, 211, 238, 0.1)",
  border: "1px solid rgba(34, 211, 238, 0.3)",
});

export const title = style({
  position: "relative",
  zIndex: 1,
  fontFamily: vars.font.headline,
  fontSize: "18px",
  fontWeight: 600,
  letterSpacing: "-0.015em",
  color: vars.color.text.primary,
});

export const summary = style({
  position: "relative",
  zIndex: 1,
  fontFamily: vars.font.ui,
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
  paddingTop: "8px",
});

export const workflowRef = style({
  fontFamily: vars.font.code,
  fontSize: "11px",
  color: vars.color.text.muted,
});

export const openHint = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  fontFamily: vars.font.ui,
  fontSize: "12px",
  fontWeight: 500,
  color: vars.color.accent.primary,
});

export const bannerSpaced = style({
  marginBottom: "16px",
});

export const iconSm = style({
  fontSize: "14px",
});

export const iconCard = style({
  fontSize: "22px",
  fontVariationSettings: "'FILL' 1, 'wght' 500",
});
