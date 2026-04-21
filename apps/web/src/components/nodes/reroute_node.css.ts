import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const popIn = keyframes({
  from: { opacity: 0, transform: "scale(0.2)" },
  to: { opacity: 1, transform: "scale(1)" },
});

export const reroute = style({
  position: "relative",
  width: "18px",
  height: "18px",
  borderRadius: "999px",
  background: vars.color.bg.panel,
  border: `1px solid ${vars.color.outline.variant}`,
  boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
  animation: `${popIn} 240ms ${vars.motion.easingSpring} both`,
  transition: "transform 160ms ease, box-shadow 160ms ease",
  selectors: {
    "&:hover": {
      transform: "scale(1.25)",
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

globalStyle(`.react-flow__node:has(${reroute})`, {
  cursor: "grab",
});
globalStyle(`.react-flow__node.dragging:has(${reroute})`, {
  cursor: "grabbing",
});
globalStyle(`.react-flow__node.dragging ${reroute}`, {
  transform: "scale(1.4)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.65), 0 0 16px rgba(186, 158, 255, 0.4)",
});
