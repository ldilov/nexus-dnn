import { style } from "@vanilla-extract/css";

import { vars } from "../../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
});

export const summaryCard = style({
  padding: vars.space.insetXl,
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
});

export const cardHead = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.space.insetLg,
});

export const iconTile = style({
  width: "56px",
  height: "56px",
  borderRadius: vars.radius.card,
  background: vars.color.accent.secondaryContainer,
  color: vars.color.accent.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.heading,
  fontWeight: vars.font.weight.bold,
  flexShrink: 0,
});

export const headText = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  minWidth: 0,
});

export const title = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingLg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
});

export const meta = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
});

export const description = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.text.secondary,
  lineHeight: vars.font.lineHeight.relaxed,
});

export const statsRow = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: vars.space.gapLg,
  paddingTop: vars.space.insetMd,
  borderTop: `1px solid ${vars.color.outline.variant}`,
});

export const stat = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const statLabel = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: vars.color.text.muted,
});

export const statValue = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
});

export const capabilities = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.gapXs,
});

export const capabilityChip = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
  background: vars.color.bg.elevated,
  padding: `4px ${vars.space.insetMd}`,
  borderRadius: vars.radius.full,
});
