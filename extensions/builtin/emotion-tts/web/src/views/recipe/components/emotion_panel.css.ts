import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const shell = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 220px) minmax(0, 1fr)",
  gap: vars.space.lg,
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
  padding: vars.space.md,
  borderRadius: vars.radius.lg,
  background: vars.color.surfaceMuted,
  color: vars.color.accent,
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
  gap: "2px",
  padding: "3px",
  borderRadius: vars.radius.md,
  background: vars.color.surfaceMuted,
});

export const modeButton = style({
  flex: "1 1 auto",
  padding: `${vars.space.xs} ${vars.space.md}`,
  border: "none",
  borderRadius: vars.radius.sm,
  background: "transparent",
  color: vars.color.textMuted,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 600,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  ":hover": { color: vars.color.text },
});

export const modeButtonActive = style([
  modeButton,
  {
    background: vars.color.surfaceHigh,
    color: vars.color.text,
    boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
  },
]);

export const sliderGrid = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const sliderRow = style({
  display: "grid",
  gridTemplateColumns: "minmax(96px, auto) 1fr 64px",
  gap: vars.space.sm,
  alignItems: "center",
});

export const sliderLabel = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  fontWeight: 600,
});

export const slider = style({
  width: "100%",
  accentColor: vars.color.accent,
});

export const sliderNumber = style({
  width: "100%",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  border: "none",
  outline: "none",
  background: vars.color.surfaceMuted,
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  textAlign: "right",
  transition: `box-shadow ${vars.motion.fast}`,
  boxShadow: `inset 0 -1px 0 ${vars.color.borderGhost}`,
  ":focus": {
    boxShadow: `inset 0 -2px 0 ${vars.color.accent}`,
  },
});

export const presetBar = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm,
  alignItems: "center",
});

export const presetSelect = style({
  flex: "1 1 200px",
  minWidth: 0,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  border: "none",
  background: vars.color.surfaceMuted,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  boxShadow: `inset 0 -1px 0 ${vars.color.borderGhost}`,
  outline: "none",
  ":focus": { boxShadow: `inset 0 -2px 0 ${vars.color.accent}` },
});

export const presetAction = style({
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.sm,
  border: "none",
  background: "transparent",
  color: vars.color.textMuted,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 600,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  cursor: "pointer",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  ":hover": { background: vars.color.surfaceHigh, color: vars.color.text },
  ":disabled": { cursor: "not-allowed", opacity: 0.45 },
});

export const presetActionPrimary = style([
  presetAction,
  {
    background: vars.color.accent,
    color: vars.color.accentOn,
    boxShadow: `0 0 0 1px ${vars.color.accent}`,
    ":hover": {
      background: vars.color.accent,
      color: vars.color.accentOn,
      boxShadow: `0 0 0 1px ${vars.color.accent}, ${vars.color.accentGlow}`,
    },
  },
]);

export const presetActionDanger = style([
  presetAction,
  {
    color: vars.color.danger,
    boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.danger} 40%, transparent)`,
    ":hover": {
      background: `color-mix(in oklab, ${vars.color.danger} 10%, transparent)`,
      color: vars.color.danger,
    },
  },
]);

export const alphaRow = style({
  display: "grid",
  gridTemplateColumns: "minmax(96px, auto) 1fr 64px",
  gap: vars.space.sm,
  alignItems: "center",
});

export const templateArea = style({
  width: "100%",
  minHeight: "104px",
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  border: "none",
  outline: "none",
  background: vars.color.surfaceMuted,
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  lineHeight: 1.55,
  resize: "vertical",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
  ":focus": {
    boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.glow}`,
  },
});

export const helpText = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  margin: 0,
  lineHeight: 1.5,
});

export const savePresetForm = style({
  display: "flex",
  gap: vars.space.sm,
  flexWrap: "wrap",
  alignItems: "center",
});

export const presetNameInput = style({
  flex: "1 1 220px",
  minWidth: 0,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.sm,
  border: "none",
  outline: "none",
  background: vars.color.surfaceMuted,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  boxShadow: `inset 0 -1px 0 ${vars.color.borderGhost}`,
  transition: `box-shadow ${vars.motion.fast}`,
  ":focus": { boxShadow: `inset 0 -2px 0 ${vars.color.accent}` },
  "::placeholder": { color: vars.color.textFaint },
});

export const errorText = style({
  color: vars.color.danger,
  fontSize: vars.text.caption,
  margin: 0,
});

export const overrideDocs = style({
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
  padding: vars.space.md,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  lineHeight: 1.55,
  whiteSpace: "pre-wrap",
  margin: 0,
});
