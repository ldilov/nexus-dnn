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

export const stickyHeader = style({
  position: "sticky",
  top: 0,
  zIndex: vars.z.sticky,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${vars.space.md} 0`,
  background: vars.color.surface,
  borderBottom: `1px solid ${vars.color.outlineVariant}`,
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
  selectors: {
    "&:hover": { color: vars.color.onSurface },
  },
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
  selectors: {
    "&:disabled": { opacity: 0.5 },
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
});

export const title = style({
  fontSize: vars.text.titleL,
  fontWeight: 600,
  margin: 0,
});

export const pillRow = style({
  display: "flex",
  gap: vars.space.sm,
  flexWrap: "wrap",
});

export const pill = style({
  padding: `${vars.space.xs} ${vars.space.md}`,
  background: vars.color.surfaceContainer,
  border: `1px solid ${vars.color.outlineVariant}`,
  color: vars.color.onSurface,
  borderRadius: vars.radius.full,
  fontSize: vars.text.bodyS,
  cursor: "pointer",
  selectors: {
    "&[aria-pressed='true']": {
      background: vars.color.primaryContainer,
      color: vars.color.onPrimaryContainer,
      borderColor: vars.color.primary,
    },
  },
});

export const stepList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const step = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: vars.space.md,
  padding: vars.space.lg,
  background: vars.color.surfaceContainerLow,
  border: `1px solid ${vars.color.outlineVariant}`,
  borderRadius: vars.radius.md,
});

export const stepNumber = style({
  fontSize: vars.text.titleM,
  fontWeight: 700,
  color: vars.color.onSurfaceVariant,
  fontFamily: vars.font.mono,
});

export const stepBody = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const opCode = style({
  fontFamily: vars.font.mono,
  color: vars.color.secondary,
  fontSize: vars.text.bodyS,
});

export const stepTitle = style({
  fontSize: vars.text.bodyM,
  color: vars.color.onSurface,
  fontWeight: 500,
});

export const planBox = style({
  padding: vars.space.lg,
  background: vars.color.surfaceContainer,
  borderRadius: vars.radius.md,
  fontFamily: vars.font.mono,
  fontSize: vars.text.bodyS,
  whiteSpace: "pre-wrap",
});

export const deploymentItem = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${vars.space.sm} 0`,
  borderBottom: `1px solid ${vars.color.outlineVariant}`,
});
