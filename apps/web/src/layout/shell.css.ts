import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const shellContainer = style({
  display: "grid",
  gridTemplateColumns: "260px 1fr 320px",
  gridTemplateRows: "48px 1fr",
  height: "100vh",
  backgroundColor: vars.color.surface.base,
});

export const topBar = style({
  gridColumn: "1 / -1",
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  padding: `0 ${vars.space.lg}`,
  borderBottom: `1px solid ${vars.color.border.default}`,
  backgroundColor: vars.color.surface.raised,
});

export const leftRail = style({
  gridRow: "2",
  borderRight: `1px solid ${vars.color.border.default}`,
  overflow: "auto",
  backgroundColor: vars.color.surface.sunken,
});

export const canvas = style({
  gridRow: "2",
  overflow: "auto",
  padding: vars.space.lg,
});

export const inspector = style({
  gridRow: "2",
  borderLeft: `1px solid ${vars.color.border.default}`,
  overflow: "auto",
  backgroundColor: vars.color.surface.sunken,
});
