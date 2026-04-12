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
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    backgroundColor: vars.color.bg.hover,
  },
});

export const artifactCardSelected = style({
  boxShadow: `0 0 12px 0 ${vars.color.accent.primaryDim}44`,
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
