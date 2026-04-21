import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const boundaryFadeIn = keyframes({
  from: { opacity: 0, transform: "scale(0.96)" },
  to: { opacity: 1, transform: "scale(1)" },
});

export const node = style({
  position: "relative",
  width: "180px",
  borderRadius: "12px",
  background: `linear-gradient(160deg, ${vars.color.bg.panel} 0%, ${vars.color.bg.canvas} 100%)`,
  border: `1px dashed ${vars.color.outline.variant}`,
  padding: "10px 12px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.35)",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  animation: `${boundaryFadeIn} 320ms ${vars.motion.easingSpring} both`,
  transition: "border-color 160ms ease, box-shadow 200ms ease, transform 180ms ease",
  willChange: "transform, box-shadow",
  selectors: {
    "&:hover": {
      borderColor: vars.color.accent.primary,
      boxShadow: "0 12px 28px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(186, 158, 255, 0.2)",
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const nodeInput = style({
  borderLeft: `3px solid ${vars.color.accent.primary}`,
});

export const nodeOutput = style({
  borderRight: `3px solid ${vars.color.accent.tertiary}`,
});

export const title = style({
  fontFamily: vars.font.code,
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: vars.color.text.secondary,
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

export const subtitle = style({
  fontFamily: vars.font.ui,
  fontSize: "11px",
  color: vars.color.text.muted,
  marginTop: "-2px",
});

export const portRow = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  height: "28px",
  padding: "0 0",
  fontFamily: vars.font.code,
  fontSize: "11px",
  color: vars.color.text.primary,
});

export const portRowSource = style({
  justifyContent: "flex-end",
  textAlign: "right",
});

export const portType = style({
  fontSize: "9px",
  color: vars.color.text.muted,
  letterSpacing: "0.04em",
});

globalStyle(`${node} .react-flow__handle`, {
  width: "12px",
  height: "12px",
  borderRadius: "999px",
  border: "2px solid rgba(12, 14, 16, 0.9)",
  transition: "transform 140ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 180ms ease-out",
  cursor: "crosshair",
});

globalStyle(`${node} .react-flow__handle:hover`, {
  transform: "translateY(-50%) scale(1.3)",
  boxShadow: "0 0 0 1px rgba(255,255,255,0.18), 0 0 14px rgba(186, 158, 255, 0.35)",
});

globalStyle(`${node} .react-flow__handle-left`, {
  left: "-6px",
});
globalStyle(`${node} .react-flow__handle-right`, {
  right: "-6px",
});

globalStyle(`.react-flow__node:has(${node})`, {
  cursor: "grab",
});
globalStyle(`.react-flow__node.dragging:has(${node})`, {
  cursor: "grabbing",
});
globalStyle(`.react-flow__node.dragging ${node}`, {
  transform: "scale(1.03) rotate(-0.4deg)",
  boxShadow:
    "0 24px 48px rgba(0, 0, 0, 0.55), 0 0 0 2px rgba(186, 158, 255, 0.4)",
  borderColor: "rgba(186, 158, 255, 0.5)",
  borderStyle: "solid",
});
