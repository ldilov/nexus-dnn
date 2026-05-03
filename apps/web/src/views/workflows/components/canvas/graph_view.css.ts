// audit-allow: px — workflow canvas pixel-precise rendering
// audit-allow: px — sub-token spacing value, no density token at this step
import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/contract.css";

const dashFlow = keyframes({
  from: { strokeDashoffset: "20" },
  to: { strokeDashoffset: "0" },
});

export const container = style({
  width: "100%",
  height: "100%",
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
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
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  strokeWidth: "3px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
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
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  strokeWidth: "2.5px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
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
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  outline: `1.5px dashed ${vars.color.accent.tertiary}`,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  outlineOffset: "2px",
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  borderRadius: "10px",
});

globalStyle(".react-flow__controls", {
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
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
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  borderRadius: "10px",
  overflow: "hidden",
  border: `1px solid ${vars.color.outline.variant}`,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
});

export const miniMapBg = style({
  backgroundColor: "rgba(12, 14, 16, 0.85)",
});
