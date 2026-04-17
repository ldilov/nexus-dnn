import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

// Full-height flex column so the Recipe tab can hand 100% of the remaining
// canvas height to the embedded extension chat UI without squeezing it into
// a fixed 500px pane.
export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
  padding: vars.space.insetLg,
  height: "100%",
  minHeight: 0,
});

export const backLink = style({
  alignSelf: "flex-start",
  background: "transparent",
  border: "none",
  color: vars.color.text.muted,
  fontSize: vars.font.size.bodySm,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  cursor: "pointer",
  padding: 0,
  fontFamily: "inherit",
  selectors: {
    "&:hover": { color: vars.color.text.primary },
  },
});

// Compact single-row hero: back link + title + slug inline. Gives the
// tab panel below as much vertical room as possible — especially
// important for the embedded chat surface on the Recipe tab.
export const hero = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.space.gapMd,
  flexWrap: "wrap",
});

export const title = style({
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  margin: 0,
  lineHeight: 1.1,
});

export const slug = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
});

export const tabs = style({
  display: "inline-flex",
  gap: "2px",
  padding: "3px",
  background: vars.color.bg.panel,
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.control,
  alignSelf: "flex-start",
  flexWrap: "wrap",
});

export const tab = style({
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  background: "transparent",
  border: "none",
  borderRadius: vars.radius.control,
  color: vars.color.text.muted,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  cursor: "pointer",
  fontFamily: "inherit",
  selectors: {
    "&[aria-selected='true']": {
      background: vars.color.bg.elevated,
      color: vars.color.text.primary,
    },
    "&:hover:not([aria-selected='true'])": { color: vars.color.text.primary },
  },
});

export const panel = style({
  padding: vars.space.insetLg,
  background: vars.color.bg.panel,
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.card,
  minHeight: "260px",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
});

export const panelHeading = style({
  fontSize: vars.font.size.bodyLg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  margin: 0,
});

export const panelBody = style({
  color: vars.color.text.muted,
  lineHeight: vars.font.lineHeight.relaxed,
  margin: 0,
  maxWidth: "68ch",
});

export const pendingTag = style({
  alignSelf: "flex-start",
  padding: `${vars.space.insetXs} ${vars.space.insetSm}`,
  background: vars.color.bg.elevated,
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.full,
  color: vars.color.text.muted,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  fontFamily: vars.font.code,
});

export const idBox = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
  padding: vars.space.insetMd,
  background: vars.color.bg.elevated,
  borderRadius: vars.radius.control,
  border: `1px solid ${vars.color.outline.variant}`,
  wordBreak: "break-all",
});

// Live tab panel — no border, no padding. The Recipe tab embeds the
// extension's own full-canvas chat layout (which ships its own header,
// sidebar, input bar, etc.) so wrapping it in another framed panel just
// duplicates chrome. The Workflow Graph tab embeds the editor canvas,
// which also owns its own frame. Both surfaces get the full remaining
// canvas height via `flex: 1`.
export const panelLive = style({
  flex: "1 1 auto",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

// Extension-rendered chat UI lives inside this frame on the Recipe tab.
// `flex: 1` + `minHeight: 0` is the canonical pattern that lets a nested
// flex child actually shrink so the chat's own inner scrollbars work.
export const chatFrame = style({
  flex: "1 1 auto",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

export const fallbackNote = style({
  padding: vars.space.insetLg,
  color: vars.color.text.muted,
  lineHeight: vars.font.lineHeight.relaxed,
  fontSize: vars.font.size.body,
});

export const graphFrame = style({
  padding: vars.space.insetLg,
  overflow: "auto",
});

// ReactFlow reads clientWidth/clientHeight for layout — this frame lives
// inside `panelLive` which is already a full-height flex column, so all
// we need here is to claim the remaining space.
export const realGraphFrame = style({
  flex: "1 1 auto",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
});
