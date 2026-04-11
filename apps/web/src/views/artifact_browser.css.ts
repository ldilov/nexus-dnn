import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const artifactGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: vars.space.md,
});

export const artifactCard = style({
  backgroundColor: vars.color.surface.raised,
  borderRadius: vars.radius.md,
  padding: vars.space.md,
  border: `1px solid ${vars.color.border.subtle}`,
  cursor: "pointer",
  transition: "border-color 150ms",
  ":hover": {
    borderColor: vars.color.accent.primary,
  },
});

export const artifactCardSelected = style({
  borderColor: vars.color.accent.primary,
});

export const artifactName = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
  marginBottom: vars.space.xxs,
});

export const artifactMeta = style({
  fontSize: vars.font.size.xs,
  color: vars.color.text.muted,
  fontFamily: vars.font.family.mono,
});

export const preview = style({
  marginTop: vars.space.lg,
  padding: vars.space.lg,
  backgroundColor: vars.color.surface.raised,
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.border.default}`,
});

export const previewImage = style({
  maxWidth: "100%",
  borderRadius: vars.radius.md,
});

export const emptyState = style({
  color: vars.color.text.muted,
  fontSize: vars.font.size.sm,
  textAlign: "center",
  padding: vars.space.xxxl,
});
