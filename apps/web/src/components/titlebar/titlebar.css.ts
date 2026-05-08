/**
 * Spec 042 — Titlebar (T027) styles.
 *
 * Bloomberg-dense, mono-first prompt strip pinned to the top of the desktop
 * window. Drag handled by `data-tauri-drag-region` on the host strip and the
 * passive breadcrumb children. Window controls on the right opt out of the
 * drag region. macOS uses Tauri's `titleBarStyle: "Overlay"` — the
 * traffic-light cluster floats above the strip and is reserved by the left
 * spacer instead of custom buttons.
 *
 * No hard-coded colors / durations / spacing — every visual quantity reads
 * from the `terminal.*` semantic group or the `vars.color.*` palette.
 */

import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";
import { terminal } from "../../styles/tokens/terminal.css";

const STRIP_HEIGHT = "32px";
const MAC_TRAFFIC_LIGHT_INSET = "78px";

export const titlebar = style({
  display: "flex",
  alignItems: "center",
  height: STRIP_HEIGHT,
  paddingInline: terminal.block.gapInline,
  background: vars.color.surface,
  color: vars.color.onSurface,
  fontFamily: terminal.type.mono,
  fontSize: terminal.type.monoHeader,
  userSelect: "none",
  selectors: {
    '&[data-platform="darwin"]': {
      paddingLeft: MAC_TRAFFIC_LIGHT_INSET,
    },
  },
});

export const breadcrumb = style({
  display: "flex",
  alignItems: "center",
  gap: terminal.block.gapInline,
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  color: vars.color.onSurfaceVariant,
});

export const breadcrumbCwd = style({
  color: vars.color.onSurface,
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: 0,
});

export const breadcrumbSuffix = style({
  color: terminal.state.resident,
  flexShrink: 0,
});

export const controls = style({
  display: "flex",
  alignItems: "center",
  gap: terminal.block.paddingDense,
  flexShrink: 0,
});

export const controlButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: terminal.block.headerHeight,
  height: terminal.block.headerHeight,
  padding: 0,
  border: "none",
  background: "transparent",
  color: vars.color.onSurfaceVariant,
  fontFamily: terminal.type.mono,
  fontSize: terminal.type.monoHeader,
  cursor: "pointer",
  transitionProperty: "color, background",
  transitionDuration: terminal.phosphor.fadeIn,
  transitionTimingFunction: terminal.motion.ease,
  selectors: {
    "&:hover": {
      color: vars.color.onSurface,
      background: vars.color.surfaceContainer,
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 ${terminal.phosphor.insetRadius} ${terminal.state.activeGlow}`,
    },
  },
});

export const controlButtonClose = style({
  selectors: {
    "&:hover": {
      color: vars.color.onSurface,
      background: terminal.state.error,
    },
  },
});

export const glyph = style({
  fontSize: terminal.type.monoCompact,
  lineHeight: 1,
  pointerEvents: "none",
});
