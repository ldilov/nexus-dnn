// audit-allow: px — sub-token values where density tokens have no coverage
import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
  width: "100%",
});

export const emptyNote = style({
  padding: vars.space.insetMd,
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontStyle: "italic",
});

export const presetRow = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const presetLabel = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const sectionTitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  margin: 0,
  padding: `${vars.space.insetSm} 0`,
});

export const advancedDetails = style({
  borderTop: `1px solid ${vars.color.outline.variant}`,
  paddingTop: vars.space.insetSm,
});

export const advancedSummary = style({
  listStyle: "none",
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  padding: `${vars.space.insetSm} 0`,
  userSelect: "none",
  selectors: {
    "&::-webkit-details-marker": {
      display: "none",
    },
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.primary}`,
    outlineOffset: vars.focus.offset,
  },
});

export const advancedContent = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  paddingTop: vars.space.insetSm,
});

export const errorText = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.error.text,
  marginTop: vars.space.gapXs,
});

export const fieldWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const submitRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  paddingTop: vars.space.insetSm,
});

export const submitBtn = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  padding: `${vars.space.insetSm} ${vars.space.insetLg}`,
  background: vars.color.accent.primary,
  color: vars.color.onColor.primary,
  border: "none",
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.accent.primaryHover,
    },
  },
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.primary}`,
    outlineOffset: vars.focus.offset,
  },
});

export const progressPanel = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  padding: vars.space.insetMd,
  background: vars.color.bg.panel,
  borderRadius: vars.radius.card,
  border: `1px solid ${vars.color.outline.variant}`,
});

export const progressTitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const nodeProgressList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
});

export const nodeProgressRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
});

export const nodeId = style({
  color: vars.color.text.muted,
  flex: "0 0 auto",
});

export const nodeStatus = style({
  flex: "0 0 auto",
});

export const nodeStatusRunning = style({
  color: vars.color.state.running,
});

export const nodeStatusCompleted = style({
  color: vars.color.state.completed,
});

export const nodeStatusFailed = style({
  color: vars.color.state.failed,
});

export const resultSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  paddingTop: vars.space.insetMd,
  borderTop: `1px solid ${vars.color.outline.variant}`,
});

// ─── RecipePinnedGraph ────────────────────────────────────────────────────

export const pinnedGraphRoot = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const pinnedGraphToggle = style({
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  cursor: "pointer",
  ":hover": {
    color: vars.color.text.primary,
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.primary}`,
    outlineOffset: vars.focus.offset,
  },
});

export const graphContainer = style({
  // audit-allow: px — fixed viewport height cap for embedded graph, no token at this scale
  height: "480px",
  borderRadius: vars.radius.card,
  overflow: "hidden",
  border: `1px solid ${vars.color.outline.variant}`,
});
