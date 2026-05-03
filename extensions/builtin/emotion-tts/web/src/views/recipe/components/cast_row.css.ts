import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  borderRadius: vars.radius.md,
  background: vars.color.surface,
  transition: `background ${vars.motion.fast}`,
  overflow: "hidden",
});

export const rootActive = style({
  background: vars.color.surfaceRaised,
  boxShadow: `0 0 0 1px ${vars.color.accent}`,
});

export const summary = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto auto",
  alignItems: "center",
  gap: vars.space.lg,
  padding: `${vars.space.md} ${vars.space.lg}`,
  cursor: "pointer",
  border: "none",
  background: "transparent",
  width: "100%",
  textAlign: "left",
  color: vars.color.text,
  ":hover": {
    background: `color-mix(in oklab, ${vars.color.accent} 6%, transparent)`,
  },
  "@media": {
    "(max-width: 640px)": {
      gridTemplateColumns: "auto 1fr",
      gridAutoRows: "min-content",
    },
  },
});

export const avatar = style({
  width: "44px",
  height: "44px",
  borderRadius: vars.radius.pill,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: vars.font.display,
  fontWeight: 700,
  fontSize: vars.text.subhead,
  flexShrink: 0,
});

export const nameBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: 0,
});

export const name = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
  fontWeight: 600,
  letterSpacing: 0,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const lineCount = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  fontVariantNumeric: "tabular-nums",
});

export const mappingBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  alignItems: "flex-end",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const mappingPrimary = style({
  color: vars.color.text,
  fontVariantNumeric: "tabular-nums",
});

export const statusChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  fontWeight: 600,
});

export const statusMapped = style({
  background: `color-mix(in oklab, ${vars.color.success} 16%, transparent)`,
  color: vars.color.success,
});

export const statusUnmapped = style({
  background: `color-mix(in oklab, ${vars.color.tertiary} 16%, transparent)`,
  color: vars.color.tertiary,
});

export const chainDigest = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.secondary,
  marginLeft: vars.space.xs,
});

export const expansion = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  padding: vars.space.lg,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const expansionRow = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: vars.space.lg,
  alignItems: "center",
  "@media": {
    "(max-width: 640px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const expansionLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textMuted,
});

export const dropZone = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.sm,
  padding: vars.space.lg,
  borderRadius: vars.radius.md,
  background: `color-mix(in oklab, ${vars.color.tertiary} 6%, transparent)`,
  border: `1px dashed ${vars.color.tertiary}`,
  color: vars.color.tertiary,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  textAlign: "center",
  transition: `background ${vars.motion.fast}`,
});

export const dropZoneActive = style({
  background: `color-mix(in oklab, ${vars.color.tertiary} 12%, transparent)`,
});

export const presetGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
  gap: vars.space.sm,
});

export const presetCard = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceMuted,
  border: "none",
  textAlign: "left",
  cursor: "pointer",
  transition: `background ${vars.motion.fast}`,
  ":hover": {
    background: vars.color.surfaceRaised,
  },
});

export const presetCardActive = style({
  background: `color-mix(in oklab, ${vars.color.accent} 14%, transparent)`,
  outline: `1px solid ${vars.color.accent}`,
});

export const presetName = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
  color: vars.color.text,
  fontWeight: 600,
});

export const presetSub = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});

export const sectionHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.lg,
  marginBottom: vars.space.lg,
});

export const aggregatedChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  fontWeight: 600,
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const empty = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.textMuted,
  margin: 0,
});
