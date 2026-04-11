import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.insetLg,
});

export const artifactGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: vars.space.insetLg,
});

export const artifactCard = style({
  backgroundColor: vars.color.bg.elevated,
  borderRadius: vars.radius.control,
  padding: vars.space.insetLg,
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
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
  marginBottom: vars.space.gapXs,
});

export const artifactMeta = style({
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  fontFamily: vars.font.code,
});

export const preview = style({
  marginTop: vars.space.gapLg,
  padding: vars.space.insetXl,
  backgroundColor: vars.color.bg.elevated,
  borderRadius: vars.radius.card,
  border: `1px solid ${vars.color.border.subtle}`,
});

export const previewImage = style({
  maxWidth: "100%",
  borderRadius: vars.radius.control,
});

export const emptyState = style({
  color: vars.color.text.muted,
  fontSize: vars.font.size.bodySm,
  textAlign: "center",
  padding: "48px",
});
