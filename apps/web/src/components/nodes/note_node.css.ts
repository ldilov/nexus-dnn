import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const noteFadeIn = keyframes({
  from: { opacity: 0, transform: "rotate(-1.5deg) translateY(6px)" },
  to: { opacity: 1, transform: "rotate(-0.5deg) translateY(0)" },
});

export const ACCENT_COLORS = {
  purple: "rgba(186, 158, 255, 0.18)",
  cyan: "rgba(34, 211, 238, 0.18)",
  pink: "rgba(244, 114, 182, 0.18)",
  orange: "rgba(255, 132, 57, 0.18)",
  green: "rgba(52, 211, 153, 0.18)",
  yellow: "rgba(245, 158, 11, 0.20)",
} as const;

export const note = style({
  minWidth: "180px",
  maxWidth: "320px",
  padding: "10px 12px",
  borderRadius: "8px",
  background: ACCENT_COLORS.yellow,
  border: `1px solid rgba(245, 158, 11, 0.35)`,
  fontFamily: vars.font.ui,
  fontSize: "12px",
  lineHeight: 1.45,
  color: vars.color.text.primary,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  boxShadow: "0 6px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
  transform: "rotate(-0.5deg)",
  animation: `${noteFadeIn} 260ms ${vars.motion.easingSpring} both`,
  transition: "transform 180ms ease, box-shadow 200ms ease",
  selectors: {
    "&:hover": {
      transform: "rotate(0deg) translateY(-2px)",
      boxShadow:
        "0 14px 30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(245, 158, 11, 0.4)",
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transform: "none",
      animation: "none",
    },
  },
});

export const editable = style([
  note,
  {
    outline: "none",
    cursor: "text",
  },
]);

export const textarea = style([
  note,
  {
    background: "transparent",
    border: "1px dashed rgba(245, 158, 11, 0.5)",
    resize: "both",
    minHeight: "60px",
    minWidth: "180px",
    fontFamily: vars.font.ui,
    fontSize: "12px",
    color: vars.color.text.primary,
    transform: "rotate(0deg)",
    animation: "none",
  },
]);

globalStyle(`.react-flow__node:has(${note})`, {
  cursor: "grab",
});
globalStyle(`.react-flow__node.dragging:has(${note})`, {
  cursor: "grabbing",
});
globalStyle(`.react-flow__node.dragging ${note}`, {
  transform: "rotate(1.5deg) scale(1.04)",
  boxShadow:
    "0 28px 54px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 0 1px rgba(245, 158, 11, 0.55)",
  transition: "transform 140ms cubic-bezier(0.34, 1.56, 0.64, 1)",
});
