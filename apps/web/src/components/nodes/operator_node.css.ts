import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const pulse = keyframes({
  "0%, 100%": { boxShadow: "0 0 0 0 rgba(186, 158, 255, 0)" },
  "50%": { boxShadow: "0 0 0 6px rgba(186, 158, 255, 0.25)" },
});

const shimmer = keyframes({
  "0%": { backgroundPosition: "0% 50%" },
  "100%": { backgroundPosition: "200% 50%" },
});

const fadeInUp = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(6px) scale(0.96)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0) scale(1)",
  },
});

const borderFlow = keyframes({
  "0%": { backgroundPosition: "0% 50%" },
  "100%": { backgroundPosition: "200% 50%" },
});

export const node = style({
  position: "relative",
  width: "240px",
  borderRadius: "12px",
  background: `linear-gradient(160deg, ${vars.color.bg.elevated} 0%, ${vars.color.bg.panel} 100%)`,
  border: `1px solid ${vars.color.outline.variant}`,
  boxShadow:
    "0 12px 28px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
  overflow: "visible",
  transformOrigin: "center center",
  willChange: "transform, box-shadow, border-color",
  animation: `${fadeInUp} 260ms ${vars.motion.easingSpring} both`,
  transition: [
    `transform 180ms ${vars.motion.easingSpring}`,
    `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
    `box-shadow 220ms ${vars.motion.easingDefault}`,
  ].join(", "),
  selectors: {
    "&:hover": {
      borderColor: vars.color.accent.primary,
      transform: "translateY(-2px)",
      boxShadow:
        "0 18px 38px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(186, 158, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
    },
    "&:active": {
      transform: "translateY(0) scale(0.995)",
      transition: "transform 80ms ease-out",
    },
    "&::before": {
      content: "''",
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      borderRadius: "12px",
      padding: "1px",
      background:
        "linear-gradient(135deg, rgba(186,158,255,0.25), rgba(34,211,238,0.12) 60%, transparent)",
      WebkitMask:
        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      opacity: 0.6,
      transition: "opacity 200ms ease-out",
    },
    "&:hover::before": {
      opacity: 1,
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      transition: "border-color 120ms ease, box-shadow 120ms ease",
    },
  },
});

export const nodeSelected = style({
  borderColor: vars.color.accent.primary,
  boxShadow: `0 16px 32px rgba(0, 0, 0, 0.5), 0 0 0 2px ${vars.color.accent.primary}, 0 0 24px rgba(186, 158, 255, 0.28)`,
  selectors: {
    "&::before": {
      background:
        "linear-gradient(135deg, rgba(186,158,255,0.55), rgba(34,211,238,0.35) 50%, rgba(186,158,255,0.55) 100%)",
      backgroundSize: "200% 100%",
      animation: `${borderFlow} 3.2s linear infinite`,
      opacity: 1,
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      selectors: {
        "&::before": { animation: "none" },
      },
    },
  },
});

export const nodeRunning = style({
  borderColor: vars.color.accent.primary,
  animation: `${pulse} 1.6s ease-in-out infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const nodeCompleted = style({
  borderColor: vars.color.success.base,
});

export const nodeFailed = style({
  borderColor: vars.color.error.base,
});

export const nodeMissingSpec = style({
  borderColor: vars.color.warning.base,
});

export const header = style({
  position: "relative",
  padding: "10px 12px 8px 12px",
  background:
    "linear-gradient(90deg, rgba(186,158,255,0.18), rgba(34,211,238,0.12) 60%, transparent)",
  backgroundSize: "200% 100%",
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const headerRunning = style({
  animation: `${shimmer} 3s linear infinite`,
});

export const titleRow = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

export const statusDot = style({
  width: "8px",
  height: "8px",
  borderRadius: "999px",
  flexShrink: 0,
  backgroundColor: vars.color.text.muted,
});

export const statusDotRunning = style({
  backgroundColor: vars.color.accent.primary,
  boxShadow: `0 0 8px ${vars.color.accent.primary}`,
});

export const statusDotCompleted = style({
  backgroundColor: vars.color.success.base,
  boxShadow: `0 0 8px ${vars.color.success.base}`,
});

export const statusDotFailed = style({
  backgroundColor: vars.color.error.base,
  boxShadow: `0 0 8px ${vars.color.error.base}`,
});

export const title = style({
  fontFamily: vars.font.headline,
  fontSize: "14px",
  fontWeight: 700,
  color: vars.color.text.primary,
  letterSpacing: "-0.01em",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  flex: 1,
});

export const badgeRow = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginLeft: "auto",
  flexShrink: 0,
});

export const chip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  padding: "1px 6px",
  borderRadius: "999px",
  fontFamily: vars.font.code,
  fontSize: "9px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: vars.color.text.secondary,
  backgroundColor: vars.color.bg.hover,
  border: `1px solid ${vars.color.outline.variant}`,
});

export const chipAccent = style({
  color: vars.color.accent.primary,
  backgroundColor: "rgba(186, 158, 255, 0.12)",
  borderColor: "rgba(186, 158, 255, 0.3)",
});

export const chipGpu = style({
  color: vars.color.accent.tertiary,
  backgroundColor: "rgba(255, 132, 57, 0.12)",
  borderColor: "rgba(255, 132, 57, 0.3)",
});

export const chipDraft = style({
  color: vars.color.accent.tertiary,
  backgroundColor: "rgba(255, 132, 57, 0.14)",
  borderColor: vars.color.accent.tertiary,
  borderStyle: "dashed",
});

export const operatorId = style({
  fontFamily: vars.font.code,
  fontSize: "10px",
  color: vars.color.text.secondary,
  opacity: 0.85,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const body = style({
  padding: "8px 0",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const portRow = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "0 12px",
  height: "28px",
  fontFamily: vars.font.code,
  fontSize: "11.5px",
  fontWeight: 500,
  color: vars.color.text.primary,
  transition: `color 140ms ease, background 140ms ease`,
  selectors: {
    "&:hover": {
      color: vars.color.text.primary,
      backgroundColor: "rgba(186, 158, 255, 0.08)",
    },
  },
});

export const portRowTarget = style({
  justifyContent: "flex-start",
});

export const portRowSource = style({
  justifyContent: "flex-end",
  textAlign: "right",
});

export const portName = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const requiredMark = style({
  color: vars.color.error.base,
  marginLeft: "2px",
  fontSize: "10px",
});

export const portType = style({
  fontSize: "9.5px",
  color: vars.color.text.secondary,
  opacity: 0.95,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});

export const widgetRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  padding: "0 12px",
  height: "28px",
  fontFamily: vars.font.code,
  fontSize: "11px",
  backgroundColor: "rgba(255, 255, 255, 0.015)",
  borderTop: `1px dashed ${vars.color.outline.variant}`,
  borderBottom: `1px dashed ${vars.color.outline.variant}`,
});

export const widgetLabel = style({
  color: vars.color.text.secondary,
  fontSize: "10.5px",
  fontWeight: 600,
  letterSpacing: "0.05em",
});

export const widgetValue = style({
  color: vars.color.accent.primary,
  fontWeight: 500,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "140px",
});

export const footer = style({
  padding: "6px 12px 8px 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  borderTop: `1px solid ${vars.color.outline.variant}`,
  borderBottomLeftRadius: "12px",
  borderBottomRightRadius: "12px",
  fontFamily: vars.font.code,
  fontSize: "9.5px",
  fontWeight: 600,
  color: vars.color.text.secondary,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
});

export const footerMetric = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
});

export const footerValueAccent = style({
  color: vars.color.accent.primary,
});

globalStyle(`${node} .react-flow__handle`, {
  width: "12px",
  height: "12px",
  borderRadius: "999px",
  border: "2px solid rgba(12, 14, 16, 0.9)",
  boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.08)",
  transition: "transform 140ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 180ms ease-out",
  cursor: "crosshair",
  zIndex: 10,
});

globalStyle(`${node} .react-flow__handle::after`, {
  content: "''",
  position: "absolute",
  inset: "-8px",
  borderRadius: "999px",
});

globalStyle(`${node} .react-flow__handle:hover`, {
  transform: "translateY(-50%) scale(1.35)",
  boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.18), 0 0 14px rgba(186, 158, 255, 0.35)",
});

globalStyle(`${node} .react-flow__handle.connecting`, {
  transform: "translateY(-50%) scale(1.35)",
  boxShadow: "0 0 0 5px rgba(186, 158, 255, 0.3), 0 0 18px rgba(186, 158, 255, 0.45)",
});

globalStyle(`${node} .react-flow__handle.valid`, {
  boxShadow: "0 0 0 5px rgba(34, 211, 238, 0.4), 0 0 22px rgba(34, 211, 238, 0.5)",
});

/* The host div sits in a `.react-flow__node` element that React Flow toggles
 * `.selected` / `.dragging` on. Pick those up for the grab/lift effect. */
globalStyle(`.react-flow__node:has(${node})`, {
  cursor: "grab",
});

globalStyle(`.react-flow__node.dragging:has(${node})`, {
  cursor: "grabbing",
});

globalStyle(`.react-flow__node.dragging ${node}`, {
  transform: "scale(1.04) rotate(0.6deg)",
  boxShadow:
    "0 40px 80px rgba(0, 0, 0, 0.7), 0 0 0 2px rgba(186, 158, 255, 0.65), 0 0 60px rgba(186, 158, 255, 0.35), 0 0 120px rgba(34, 211, 238, 0.12)",
  borderColor: "rgba(186, 158, 255, 0.75)",
  transition: "transform 160ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 160ms ease-out",
  filter: "brightness(1.08) saturate(1.1)",
});

globalStyle(`.react-flow__node.dragging`, {
  zIndex: 1000,
});

globalStyle(`.react-flow__node:not(.dragging) ${node}`, {
  transition:
    "transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 220ms ease, border-color 160ms ease",
});

globalStyle(`.react-flow__node.dragging ${node}::before`, {
  opacity: 1,
});

globalStyle(`${node} .react-flow__handle-left`, {
  left: "-6px",
});
globalStyle(`${node} .react-flow__handle-right`, {
  right: "-6px",
});

globalStyle(".react-flow__edge-path", {
  strokeWidth: 2,
});

globalStyle(".react-flow__edge.animated .react-flow__edge-path", {
  strokeDasharray: "6 4",
});

export const warningColor = style({
  color: "var(--color-warning, #F59E0B)",
});
