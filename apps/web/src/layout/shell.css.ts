import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const shellContainer = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gridTemplateRows: "48px 1fr auto",
  height: "100vh",
  backgroundColor: vars.color.bg.app,
  overflow: "hidden",
  marginLeft: "64px",
  transition: `margin-left ${vars.motion.durationNormal} cubic-bezier(0.4, 0, 0.2, 1)`,
});

export const shellContainerSidebarPinned = style({
  marginLeft: "256px",
});

export const topBar = style({
  gridColumn: "1 / -1",
  gridRow: "1",
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapMd,
  padding: `0 ${vars.space.insetXl}`,
  backgroundColor: vars.color.bg.panel,
  zIndex: vars.z.base,
});

export const canvas = style({
  gridColumn: "1",
  gridRow: "2",
  overflow: "auto",
  backgroundColor: vars.color.bg.canvas,
});

export const inspector = style({
  gridColumn: "2",
  gridRow: "2 / -1",
  width: "320px",
  backgroundColor: vars.color.bg.panel,
  overflow: "auto",
});

export const inspectorCollapsed = style({
  width: "0px",
  overflow: "hidden",
});

export const bottomDrawer = style({
  gridColumn: "1",
  gridRow: "3",
  backgroundColor: vars.color.bg.panel,
  overflow: "hidden",
});

export const bottomDrawerCollapsed = style({
  height: "0px",
});
