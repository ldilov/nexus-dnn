import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const heroEyebrowIcon = style({
  fontSize: "14px",
});

export const ctaStat = style({
  cursor: "pointer",
  textAlign: "left",
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  padding: "32px 40px",
  maxWidth: "1400px",
  margin: "0 auto",
});

export const hero = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const heroEyebrow = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  fontFamily: vars.font.code,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "#22D3EE",
});

export const heroTitle = style({
  fontFamily: vars.font.headline,
  fontSize: "36px",
  fontWeight: 700,
  letterSpacing: "-0.025em",
  lineHeight: 1.1,
  color: vars.color.text.primary,
  margin: 0,
});

export const heroSubtitle = style({
  fontFamily: vars.font.ui,
  fontSize: "15px",
  color: vars.color.text.secondary,
  maxWidth: "640px",
  lineHeight: 1.5,
});

export const statGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
});

export const stat = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  padding: "16px 18px",
  borderRadius: "14px",
  backgroundColor: vars.color.bg.panel,
  border: `1px solid ${vars.color.outline.variant}`,
});

export const statLabel = style({
  fontFamily: vars.font.code,
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const statValue = style({
  fontFamily: vars.font.headline,
  fontSize: "28px",
  fontWeight: 700,
  color: vars.color.text.primary,
  lineHeight: 1.1,
});

export const statDelta = style({
  fontFamily: vars.font.code,
  fontSize: "11px",
  color: vars.color.text.secondary,
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: "14px",
});

export const sectionHeader = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "16px",
});

export const sectionTitle = style({
  fontFamily: vars.font.headline,
  fontSize: "18px",
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: vars.color.text.primary,
});

export const sectionLink = style({
  fontFamily: vars.font.ui,
  fontSize: "13px",
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
  fontSize: "13px",
  color: vars.color.text.muted,
});
