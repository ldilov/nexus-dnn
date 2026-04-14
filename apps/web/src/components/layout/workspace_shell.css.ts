import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const slideIn = keyframes({
  from: { transform: "translateX(100%)" },
  to: { transform: "translateX(0)" },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const shell = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  overflow: "hidden",
  position: "relative",
});

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapMd,
  height: "48px",
  padding: `0 ${vars.space.insetLg}`,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  backgroundColor: vars.color.bg.panel,
  flexShrink: 0,
});

export const toolbarEyebrow = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  fontFamily: vars.font.code,
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: vars.color.text.secondary,
});

export const toolbarSpacer = style({ flex: 1 });

export const toolbarActions = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

export const toolbarButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  height: "32px",
  padding: "0 12px",
  borderRadius: vars.radius.control,
  border: `1px solid ${vars.color.outline.variant}`,
  backgroundColor: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: "12px",
  fontWeight: 500,
  cursor: "pointer",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    borderColor: vars.color.accent.primary,
    color: vars.color.text.primary,
    backgroundColor: `${vars.color.accent.primary}12`,
  },
});

export const toolbarButtonActive = style({
  borderColor: vars.color.accent.primary,
  color: vars.color.text.primary,
  backgroundColor: `${vars.color.accent.primary}1a`,
});

export const content = style({
  flex: 1,
  minHeight: 0,
  position: "relative",
  overflow: "hidden",
});

export const backdrop = style({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.45)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  zIndex: 10,
  animation: `${fadeIn} ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const drawer = style({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: vars.color.bg.panel,
  borderLeft: `1px solid ${vars.color.outline.variant}`,
  display: "flex",
  flexDirection: "column",
  zIndex: 11,
  boxShadow: "-24px 0 48px rgba(0, 0, 0, 0.45)",
  animation: `${slideIn} ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const drawerHeader = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  padding: `${vars.space.insetMd} ${vars.space.insetLg}`,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  flexShrink: 0,
});

export const drawerTitle = style({
  fontFamily: vars.font.headline,
  fontSize: "16px",
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: vars.color.text.primary,
  flex: 1,
});

export const drawerCloseButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  border: "none",
  borderRadius: vars.radius.control,
  backgroundColor: "transparent",
  color: vars.color.text.muted,
  cursor: "pointer",
  fontSize: "18px",
  transition: `color ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    color: vars.color.text.primary,
    backgroundColor: vars.color.bg.hover,
  },
});

export const drawerBody = style({
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
  minHeight: 0,
});
