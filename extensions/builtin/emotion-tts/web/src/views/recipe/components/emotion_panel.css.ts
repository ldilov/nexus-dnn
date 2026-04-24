import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const shell = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 200px) minmax(0, 1fr)",
  gap: vars.space.md,
  alignItems: "start",
  "@media": {
    "(max-width: 780px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const radarColumn = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.sm,
});

export const controlsColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  minWidth: 0,
});

export const modeBar = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.xs,
  padding: vars.space.xs,
  borderRadius: vars.radius.sm,
  background: vars.color.surfaceMuted,
});

export const modeButton = style({
  flex: "1 1 auto",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  border: "none",
  borderRadius: vars.radius.sm,
  background: "transparent",
  color: vars.color.textMuted,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontWeight: 500,
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  ":hover": { color: vars.color.text },
});

export const modeButtonActive = style([
  modeButton,
  {
    background: vars.color.surfaceRaised,
    color: vars.color.text,
    boxShadow: vars.shadow.subtle,
    fontWeight: 600,
  },
]);

export const sliderGrid = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const sliderRow = style({
  display: "grid",
  gridTemplateColumns: "minmax(90px, auto) 1fr 56px",
  gap: vars.space.sm,
  alignItems: "center",
});

export const sliderLabel = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const slider = style({
  width: "100%",
  accentColor: vars.color.accent,
});

export const sliderNumber = style({
  width: "100%",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.borderSubtle}`,
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  textAlign: "right",
});

export const presetBar = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm,
  alignItems: "center",
});

export const presetSelect = style({
  flex: "1 1 180px",
  minWidth: 0,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.borderSubtle}`,
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
});

export const presetAction = style({
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.borderSubtle}`,
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  cursor: "pointer",
  transition: `background ${vars.motion.fast}`,
  ":hover": { background: vars.color.surfaceMuted },
  ":disabled": { cursor: "not-allowed", opacity: 0.5 },
});

export const presetActionPrimary = style([
  presetAction,
  {
    background: vars.color.accent,
    borderColor: vars.color.accent,
    color: vars.color.surfaceRaised,
    ":hover": { background: vars.color.accentMuted },
  },
]);

export const presetActionDanger = style([
  presetAction,
  {
    color: vars.color.danger,
    borderColor: `oklch(from ${vars.color.danger} l c h / 0.4)`,
    ":hover": { background: `oklch(from ${vars.color.danger} l c h / 0.08)` },
  },
]);

export const alphaRow = style({
  display: "grid",
  gridTemplateColumns: "minmax(80px, auto) 1fr 56px",
  gap: vars.space.sm,
  alignItems: "center",
});

export const templateArea = style({
  width: "100%",
  minHeight: "96px",
  padding: vars.space.sm,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.borderSubtle}`,
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  resize: "vertical",
});

export const helpText = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  margin: 0,
  lineHeight: 1.4,
});

export const savePresetForm = style({
  display: "flex",
  gap: vars.space.sm,
  flexWrap: "wrap",
  alignItems: "center",
});

export const presetNameInput = style({
  flex: "1 1 180px",
  minWidth: 0,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.borderSubtle}`,
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
});

export const errorText = style({
  color: vars.color.danger,
  fontSize: vars.text.caption,
  margin: 0,
});

export const overrideDocs = style({
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.sm,
  padding: vars.space.sm,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",
});
