import { style } from "@vanilla-extract/css";
import { terminal } from "../../styles/tokens/terminal.css";

export const cursorRootMount = style({
  position: "fixed",
  pointerEvents: "none",
  zIndex: 70,
  transition: `left ${terminal.motion.snapTransition} ease-out, top ${terminal.motion.snapTransition} ease-out`,
});
