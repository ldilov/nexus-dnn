import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/contract.css";

const dashFlow = keyframes({
  from: { strokeDashoffset: "20" },
  to: { strokeDashoffset: "0" },
});

export const container = style({
  width: "100%",
  height: "100%",
  minHeight: "400px",
  position: "relative",
  backgroundColor: vars.color.bg.canvas,
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(186, 158, 255, 0.06), transparent 60%), radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.05), transparent 55%)",
});

globalStyle(".react-flow__edge-path", {
  transition: "stroke 200ms ease",
});

globalStyle(".react-flow__edge:hover .react-flow__edge-path", {
  strokeWidth: "3px",
  filter: "drop-shadow(0 0 4px currentColor)",
});

globalStyle(".react-flow__edge.animated .react-flow__edge-path", {
  strokeDasharray: "6 4",
  animation: `${dashFlow} 700ms linear infinite`,
});

globalStyle(".react-flow__node", {
  transition: "transform 160ms cubic-bezier(0.34, 1.56, 0.64, 1)",
});

globalStyle(".react-flow__connection-path", {
  strokeWidth: "2.5px",
  filter: "drop-shadow(0 0 6px rgba(186, 158, 255, 0.45))",
});

export const graphNode = style({});
export const graphNodeRunning = style({});
export const graphNodeCompleted = style({});
export const graphNodeFailed = style({});
export const nodeName = style({});
export const nodeOperator = style({});

export const nodeDraft = style({});
globalStyle(`.${nodeDraft} .react-flow__handle, .${nodeDraft}`, {
  opacity: 0.92,
});
globalStyle(`.react-flow__node.${nodeDraft} > *:first-child`, {
  outline: `1.5px dashed ${vars.color.accent.tertiary}`,
  outlineOffset: "2px",
  borderRadius: "10px",
});

globalStyle(".react-flow__controls", {
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
  borderRadius: "10px",
  overflow: "hidden",
  border: `1px solid ${vars.color.outline.variant}`,
  backgroundColor: "rgba(17, 20, 22, 0.85)",
});

globalStyle(".react-flow__controls-button", {
  backgroundColor: "transparent",
  color: vars.color.text.secondary,
  border: "none",
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  transition: `color 120ms ease, background 120ms ease`,
});

globalStyle(".react-flow__controls-button:hover", {
  color: vars.color.accent.primary,
  backgroundColor: "rgba(186, 158, 255, 0.08)",
});

globalStyle(".react-flow__controls-button svg", {
  fill: "currentColor",
});

globalStyle(".react-flow__minimap", {
  borderRadius: "10px",
  overflow: "hidden",
  border: `1px solid ${vars.color.outline.variant}`,
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
});
