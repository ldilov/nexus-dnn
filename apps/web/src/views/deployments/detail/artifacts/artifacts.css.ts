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

export const iconButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "30px",
  height: "30px",
  borderRadius: vars.radius.control,
  border: "none",
  background: "transparent",
  color: vars.color.text.muted,
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
    "&:disabled": { opacity: 0.4, cursor: "default" },
  },
});

export const iconButtonDanger = style([
  iconButton,
  {
    selectors: {
      "&:hover": {
        background: vars.color.bg.hover,
        color: vars.color.error.text,
      },
    },
  },
]);

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
