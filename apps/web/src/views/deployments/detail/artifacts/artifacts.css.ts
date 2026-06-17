import { style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
  width: "100%",
});

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.gapMd,
  flexWrap: "wrap",
});

export const toolbarLeft = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const summary = style({
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
});

export const summaryStrong = style({
  color: vars.color.text.primary,
  fontVariantNumeric: "tabular-nums",
});

export const toolbarActions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
});

export const tableWrapper = style({
  overflowX: "auto",
  borderRadius: vars.radius.panel,
  background: vars.color.bg.panel,
});

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
  fontSize: vars.font.size.bodySm,
});

export const th = style({
  textAlign: "left",
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
  fontWeight: vars.font.weight.medium,
  position: "sticky",
  top: 0,
  background: vars.color.bg.panel,
});

export const td = style({
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  color: vars.color.text.primary,
  verticalAlign: "middle",
});

export const tdMono = style([
  td,
  {
    fontFamily: vars.font.code,
    fontVariantNumeric: "tabular-nums",
    fontSize: vars.font.size.caption,
    color: vars.color.text.muted,
  },
]);

export const row = style({
  borderTop: `1px solid ${vars.color.outline.variant}`,
  selectors: {
    "&:hover": { background: vars.color.bg.hover },
  },
});

export const textCell = style([
  td,
  {
    maxWidth: "320px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: vars.color.text.muted,
  },
]);

export const characterCell = style([
  td,
  {
    color: vars.color.text.primary,
    fontWeight: vars.font.weight.medium,
  },
]);

export const editedBadge = style({
  marginLeft: vars.space.gapSm,
  padding: `2px 6px`,
  borderRadius: vars.radius.control,
  fontSize: vars.font.size.kbd,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  background: vars.color.accent.secondaryContainer,
  color: vars.color.accent.secondary,
});

export const actionsCell = style([
  td,
  {
    display: "flex",
    gap: "6px",
    alignItems: "center",
    justifyContent: "flex-end",
  },
]);

/* Anchor variant of the icon button — used for the <a download> link.
 * Visually mirrors a Button variant="ghost" size="sm" iconOnly so the
 * 32px round-icon affordance. */
export const iconLink = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — Button-equivalent touch-target.
  width: "32px",
  // audit-allow: px — Button-equivalent touch-target.
  height: "32px",
  borderRadius: vars.radius.full,
  border: "none",
  background: "transparent",
  color: vars.color.text.secondary,
  textDecoration: "none",
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      background: vars.color.bg.hover,
      color: vars.color.text.primary,
    },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
      outlineOffset: vars.focus.offset,
    },
  },
});

export const player = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  background: vars.color.bg.panel,
  borderRadius: vars.radius.control,
  marginTop: "4px",
});

export const playerLabel = style({
  flex: "0 0 auto",
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  fontFamily: vars.font.code,
});

export const playerAudio = style({
  flex: "1 1 auto",
  height: "32px",
});

export const empty = style({
  padding: `${vars.space.insetXl} ${vars.space.insetMd}`,
  textAlign: "center",
  color: vars.color.text.muted,
  fontSize: vars.font.size.bodySm,
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
});

export const error = style({
  padding: vars.space.insetMd,
  borderRadius: vars.radius.control,
  background: vars.color.bg.panel,
  color: vars.color.error.text,
  fontSize: vars.font.size.bodySm,
});

export const checkboxCell = style([
  td,
  {
    width: "1px",
    paddingRight: 0,
  },
]);

export const checkboxHeader = style([
  th,
  {
    width: "1px",
    paddingRight: 0,
  },
]);

export const checkbox = style({
  // audit-allow: px — Button-equivalent touch-target square.
  width: "18px",
  // audit-allow: px — Button-equivalent touch-target square.
  height: "18px",
  cursor: "pointer",
  accentColor: vars.color.accent.accent,
});

export const rowSelected = style({
  background: vars.color.bg.hover,
});

export const selectionBanner = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.gapMd,
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  background: vars.color.bg.elevated,
  borderRadius: vars.radius.control,
  flexWrap: "wrap",
});

export const selectionLeft = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
});

export const selectionCount = style({
  fontFamily: vars.font.code,
  fontVariantNumeric: "tabular-nums",
  color: vars.color.text.primary,
  fontWeight: vars.font.weight.semibold,
});

export const selectionActions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
});

export const clearLink = style({
  background: "transparent",
  border: "none",
  color: vars.color.text.muted,
  fontSize: vars.font.size.caption,
  cursor: "pointer",
  padding: `4px 8px`,
  borderRadius: vars.radius.control,
  selectors: {
    "&:hover": { color: vars.color.text.primary },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
      outlineOffset: vars.focus.offset,
    },
  },
});
