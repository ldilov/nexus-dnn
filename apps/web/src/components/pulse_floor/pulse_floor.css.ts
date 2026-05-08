import { style } from "@vanilla-extract/css";
import { terminal } from "../../styles/tokens/terminal.css";

export const pulseFloorRoot = style({
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  height: terminal.pulseFloor.height,
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  pointerEvents: "none",
  zIndex: 60,
});

export const pulseFloorTraceSlot = style({
  flex: "1 1 0%",
  minWidth: 0,
  height: "100%",
  display: "block",
});

export const pulseFloorReducedMotion = style({});
