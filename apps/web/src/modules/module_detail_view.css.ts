import { style } from "@vanilla-extract/css";
import { vars } from "../styles";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  padding: vars.space.xl,
  height: "100%",
  overflow: "auto",
});

export const backLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  color: vars.color.onSurfaceVariant,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.text.bodyS,
  padding: 0,
  alignSelf: "flex-start",
  selectors: {
    "&:hover": { color: vars.color.onSurface },
  },
});

export const header = style({
  display: "flex",
  gap: vars.space.lg,
  alignItems: "center",
});

export const headerText = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const title = style({
  fontSize: vars.text.titleL,
  fontWeight: 600,
  color: vars.color.onSurface,
  margin: 0,
  letterSpacing: vars.tracking.tight,
});

export const meta = style({
  fontSize: vars.text.bodyM,
  color: vars.color.onSurfaceVariant,
  fontFamily: vars.font.mono,
  margin: 0,
});

export const actions = style({
  display: "flex",
  gap: vars.space.sm,
});

export const primaryBtn = style({
  background: vars.color.primary,
  color: vars.color.onPrimary,
  border: "none",
  padding: `${vars.space.sm} ${vars.space.lg}`,
  fontWeight: 600,
  borderRadius: vars.radius.md,
  cursor: "pointer",
  fontFamily: vars.font.ui,
  selectors: {
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
    "&:hover:not(:disabled)": { background: vars.color.primaryDim },
  },
});

export const secondaryBtn = style({
  background: "transparent",
  color: vars.color.onSurface,
  border: `1px solid ${vars.color.outlineVariant}`,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  borderRadius: vars.radius.md,
  cursor: "pointer",
  fontFamily: vars.font.ui,
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const sectionTitle = style({
  fontSize: vars.text.titleS,
  fontWeight: 600,
  color: vars.color.onSurface,
  margin: 0,
  letterSpacing: vars.tracking.wide,
  textTransform: "uppercase",
});

export const card = style({
  background: vars.color.surfaceContainerLow,
  border: `1px solid ${vars.color.outlineVariant}`,
  borderRadius: vars.radius.lg,
  padding: vars.space.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const blueprintCard = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const deploymentRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${vars.space.md} ${vars.space.lg}`,
  background: vars.color.surfaceContainerLow,
  border: `1px solid ${vars.color.outlineVariant}`,
  borderRadius: vars.radius.md,
});

export const chip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.full,
  fontSize: vars.text.labelS,
  background: vars.color.surfaceContainerHigh,
  color: vars.color.onSurfaceVariant,
});

export const chipOk = style({
  background: vars.color.secondaryContainer,
  color: vars.color.onSecondaryContainer,
});

export const chipWarn = style({
  background: vars.color.tertiaryContainer,
  color: vars.color.onTertiaryContainer,
});

export const empty = style({
  padding: vars.space.xl,
  textAlign: "center",
  color: vars.color.onSurfaceVariant,
  fontStyle: "italic",
});

export const errorBox = style({
  padding: vars.space.lg,
  background: vars.color.errorContainer,
  color: vars.color.onErrorContainer,
  borderRadius: vars.radius.md,
});
