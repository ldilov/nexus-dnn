import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";
import { terminal } from "../../styles/tokens/terminal.css";

export const blockContainer = style({
  display: "block",
  outline: "none",
  background: vars.color.surfaceContainerLow,
  color: vars.color.onSurface,
  selectors: {
    "&:focus-visible": {
      boxShadow: `inset 0 0 0 ${terminal.phosphor.insetRadius} ${terminal.state.activeGlow}`,
    },
    "&:hover": {
      background: vars.color.surfaceContainer,
    },
  },
});

export const blockFocused = style({
  boxShadow: `inset 0 0 0 ${terminal.phosphor.insetRadius} ${terminal.state.activeGlow}`,
  transitionProperty: "box-shadow, background",
  transitionDuration: terminal.phosphor.fadeIn,
  transitionTimingFunction: terminal.motion.ease,
});

export const block = style({
  display: "flex",
  flexDirection: "column",
  gap: terminal.block.gapStack,
  padding: terminal.block.paddingDense,
  fontFamily: terminal.type.mono,
  fontSize: terminal.type.monoStream,
});

export const blockHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: terminal.block.gapInline,
  height: terminal.block.headerHeight,
  padding: terminal.block.paddingHead,
  fontFamily: terminal.type.mono,
  fontSize: terminal.type.monoHeader,
  color: vars.color.onSurface,
});

export const blockHeaderLeft = style({
  display: "flex",
  alignItems: "center",
  gap: terminal.block.gapInline,
  minWidth: 0,
  flex: 1,
});

export const blockHeaderRight = style({
  display: "flex",
  alignItems: "center",
  gap: terminal.block.gapInline,
});

export const blockPromptButton = style({
  display: "inline-block",
  padding: 0,
  margin: 0,
  background: "transparent",
  border: "none",
  color: vars.color.onSurface,
  fontFamily: terminal.type.mono,
  fontSize: terminal.type.monoHeader,
  textAlign: "left",
  cursor: "pointer",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: 0,
  selectors: {
    "&:hover": {
      color: terminal.state.resident,
    },
    "&:focus-visible": {
      outline: `${terminal.phosphor.insetRadius} solid ${terminal.state.activeGlow}`,
      outlineOffset: terminal.phosphor.insetRadius,
    },
  },
});

export const blockMnemonicChip = style({
  display: "inline-flex",
  alignItems: "center",
  padding: terminal.block.paddingDense,
  fontFamily: terminal.type.mono,
  fontSize: terminal.type.monoCompact,
  color: vars.color.onSurfaceVariant,
  background: vars.color.surfaceContainerHigh,
  letterSpacing: vars.tracking.wide,
});

export const blockToggle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: terminal.block.headerHeight,
  height: terminal.block.headerHeight,
  padding: 0,
  background: "transparent",
  border: "none",
  color: vars.color.onSurfaceVariant,
  fontFamily: terminal.type.mono,
  fontSize: terminal.type.monoHeader,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      color: terminal.state.resident,
      background: vars.color.surfaceContainer,
    },
    "&:focus-visible": {
      outline: `${terminal.phosphor.insetRadius} solid ${terminal.state.activeGlow}`,
      outlineOffset: 0,
    },
  },
});

export const blockBody = style({
  display: "block",
  padding: terminal.block.paddingHead,
  fontFamily: terminal.type.mono,
  fontSize: terminal.type.monoStream,
  color: vars.color.onSurface,
});

export const blockSummary = style({
  display: "flex",
  alignItems: "center",
  gap: terminal.block.gapInline,
  padding: terminal.block.paddingHead,
  fontFamily: terminal.type.mono,
  fontSize: terminal.type.monoCompact,
  color: vars.color.onSurfaceVariant,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const blockSummaryMetric = style({
  color: vars.color.onSurface,
});

export const blockSparkline = style({
  display: "inline-block",
  width: "80px",
  height: terminal.block.sparklineHeight,
  marginLeft: terminal.block.gapInline,
  flexShrink: 0,
});

export const blockSparklinePath = style({
  fill: "none",
  stroke: terminal.state.resident,
  strokeWidth: 1,
  opacity: terminal.pulseFloor.traceOpacity,
  vectorEffect: "non-scaling-stroke",
});
