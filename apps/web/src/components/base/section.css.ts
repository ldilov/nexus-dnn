import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: "var(--d-3)",
  paddingBlock: "var(--pad-section)",
});

export const sectionDense = style({
  paddingBlock: "var(--d-4)",
});

export const sectionHead = style({
  display: "flex",
  alignItems: "baseline",
  gap: "var(--d-3)",
});

export const sectionNum = style({
  fontFamily: vars.font.code,
  fontVariantNumeric: "tabular-nums",
  fontSize: vars.font.size.body,
  color: vars.color.text.secondary,
  letterSpacing: "0.05em",
});

export const sectionTitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.text.sectionTitle,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: vars.color.text.primary,
  margin: 0,
});

export const sectionRight = style({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: "var(--d-2)",
});

export const sectionBody = style({
  display: "flex",
  flexDirection: "column",
  gap: "var(--d-3)",
});
