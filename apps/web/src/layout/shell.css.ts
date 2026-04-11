import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const shellContainer = style({
  display: "grid",
  gridTemplateColumns: "56px auto 1fr auto",
  gridTemplateRows: "48px 1fr auto",
  height: "100vh",
  backgroundColor: vars.color.bg.app,
  overflow: "hidden",
});

export const topBar = style({
  gridColumn: "1 / -1",
  gridRow: "1",
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapMd,
  padding: `0 ${vars.space.insetXl}`,
  borderBottom: `1px solid ${vars.color.border.subtle}`,
  backgroundColor: vars.color.bg.panel,
  zIndex: vars.z.base,
});

export const iconRail = style({
  gridColumn: "1",
  gridRow: "2 / -1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: vars.space.insetMd,
  borderRight: `1px solid ${vars.color.border.subtle}`,
  backgroundColor: vars.color.bg.panel,
  width: "56px",
  overflow: "hidden",
});

export const secondaryPanel = style({
  gridColumn: "2",
  gridRow: "2 / -1",
  width: "240px",
  borderRight: `1px solid ${vars.color.border.subtle}`,
  backgroundColor: vars.color.bg.panel,
  overflow: "auto",
});

export const secondaryPanelCollapsed = style({
  width: "0px",
  borderRight: "none",
  overflow: "hidden",
});

export const canvas = style({
  gridColumn: "3",
  gridRow: "2",
  overflow: "auto",
  backgroundColor: vars.color.bg.canvas,
});

export const inspector = style({
  gridColumn: "4",
  gridRow: "2 / -1",
  width: "320px",
  borderLeft: `1px solid ${vars.color.border.subtle}`,
  backgroundColor: vars.color.bg.panel,
  overflow: "auto",
});

export const inspectorCollapsed = style({
  width: "0px",
  borderLeft: "none",
  overflow: "hidden",
});

export const bottomDrawer = style({
  gridColumn: "3",
  gridRow: "3",
  borderTop: `1px solid ${vars.color.border.strong}`,
  backgroundColor: vars.color.bg.panel,
  overflow: "hidden",
});

export const bottomDrawerCollapsed = style({
  height: "0px",
  borderTop: "none",
});
