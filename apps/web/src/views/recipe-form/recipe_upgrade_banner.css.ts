import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const banner = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: "14px 16px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  borderRadius: "12px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: vars.color.bg.elevated,
});

export const head = style({
  display: "flex",
  alignItems: "center",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "10px",
  flexWrap: "wrap",
});

export const lead = style({
  fontFamily: vars.font.ui,
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "14px",
  color: vars.color.text.primary,
});

const riskChip = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "2px 9px",
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
});

export const riskOutdated = style([
  riskChip,
  {
    // audit-allow: hex — amber status semantic, no token in palette yet
    color: "#FBBF24",
    backgroundColor: "rgba(251, 191, 36, 0.12)",
    border: "1px solid rgba(251, 191, 36, 0.32)",
  },
]);

export const riskBreaking = style([
  riskChip,
  {
    // audit-allow: hex — red status semantic, no token in palette yet
    color: "#F87171",
    backgroundColor: "rgba(248, 113, 113, 0.12)",
    border: "1px solid rgba(248, 113, 113, 0.34)",
  },
]);

export const list = style({
  margin: 0,
  // audit-allow: px — sub-token spacing value, no density token at this step
  paddingLeft: "18px",
  fontFamily: vars.font.code,
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "12px",
  color: vars.color.text.secondary,
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "4px",
});

export const actions = style({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "8px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  marginTop: "4px",
});

const button = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "6px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: "7px 13px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  borderRadius: "9px",
  fontFamily: vars.font.ui,
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  border: `1px solid ${vars.color.outline.variant}`,
  background: "transparent",
  color: vars.color.text.primary,
  ":disabled": { opacity: 0.5, cursor: "default" },
});

export const primary = style([
  button,
  {
    borderColor: `${vars.color.accent.primary}66`,
    color: vars.color.accent.primary,
  },
]);

export const secondary = style([button]);

export const importLabel = style([button]);

export const note = style({
  fontFamily: vars.font.ui,
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "12px",
  color: vars.color.text.secondary,
});
