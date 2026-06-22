import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";
import { media } from "../theme/breakpoints";

export const shellContainer = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  // audit-allow: px — workspace shell scaffolding dimension
  gridTemplateRows: "48px 1fr auto",
  height: "100vh",
  backgroundColor: vars.color.bg.app,
  overflow: "hidden",
  marginLeft: "64px",
  transition: `margin-left ${vars.motion.durationNormal} cubic-bezier(0.4, 0, 0.2, 1)`,
  "@media": {
    // The rail floats off-canvas on mobile, so the shell reclaims its margin.
    [media.maxTablet]: {
      marginLeft: 0,
    },
  },
});

export const shellContainerSidebarPinned = style({
  // audit-allow: px — workspace shell scaffolding dimension
  marginLeft: "232px",
  "@media": {
    [media.maxTablet]: {
      marginLeft: 0,
    },
  },
});

export const topBar = style({
  gridColumn: "1 / -1",
  gridRow: "1",
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapMd,
  backgroundColor: "transparent",
  zIndex: vars.z.base,
});

export const canvas = style({
  gridColumn: "1",
  gridRow: "2",
  overflow: "hidden",
  backgroundColor: vars.color.bg.canvas,
  paddingInline: vars.density.padSection,
  position: "relative",
  isolation: "isolate",
  "@media": {
    [media.maxMobile]: {
      paddingInline: vars.density.d3,
    },
  },
  "::before": {
    content: "",
    position: "fixed",
    // audit-allow: px — atmosphere blob geometry, single fixed decoration
    top: "-180px",
    // audit-allow: px — atmosphere blob geometry, single fixed decoration
    left: "-140px",
    // audit-allow: px — atmosphere blob geometry, single fixed decoration
    width: "560px",
    // audit-allow: px — atmosphere blob geometry, single fixed decoration
    height: "560px",
    borderRadius: vars.radius.full,
    background: `radial-gradient(circle, ${vars.color.accent.accentGlow} 0%, transparent 70%)`,
    // audit-allow: px — atmosphere blob blur per design spec (60px)
    filter: "blur(60px)",
    opacity: 0.6,
    pointerEvents: "none",
    zIndex: -1,
  },
});

export const inspector = style({
  gridColumn: "2",
  gridRow: "2 / -1",
  // audit-allow: px — fixed layout breakpoint
  width: "320px",
  // audit-allow: px — workspace shell scaffolding dimension
  marginLeft: "-80px",
  marginTop: vars.density.d4,
  marginBottom: vars.density.d4,
  marginRight: vars.density.d4,
  zIndex: 2,
  backgroundColor: "transparent",
  overflow: "visible",
  "@media": {
    // The fixed-width inspector cannot share a phone viewport with the canvas.
    [media.maxTablet]: {
      display: "none",
    },
  },
});

export const inspectorCollapsed = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
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
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "0px",
});
