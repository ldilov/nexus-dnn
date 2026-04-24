import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const shell = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.2fr) minmax(320px, 0.8fr)",
  gap: vars.space.lg,
  padding: vars.space.lg,
  minHeight: "100vh",
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.body,
});

export const leftColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  minWidth: 0,
});

export const rightColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  position: "sticky",
  top: vars.space.md,
  alignSelf: "flex-start",
});

export const panel = style({
  background: vars.color.surfaceRaised,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.subtle,
  padding: vars.space.md,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const panelTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.subhead,
  fontWeight: 600,
  margin: 0,
});

export const deploymentHeader = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.md,
  padding: `${vars.space.md} ${vars.space.lg}`,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
  gridColumn: "1 / -1",
});

export const deploymentTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.head,
  margin: 0,
});

export const scriptTextarea = style({
  width: "100%",
  minHeight: "320px",
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  padding: vars.space.sm,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.borderSubtle}`,
  background: vars.color.surface,
  color: vars.color.text,
  resize: "vertical",
});

export const label = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const controlRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm,
  alignItems: "center",
});

export const button = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.sm,
  border: "none",
  fontFamily: vars.font.body,
  fontWeight: 600,
  cursor: "pointer",
  transition: `transform ${vars.motion.fast}, background ${vars.motion.fast}`,
  ":hover": { transform: "translateY(-1px)" },
  ":active": { transform: "translateY(0)" },
  ":disabled": { cursor: "not-allowed", opacity: 0.5 },
});

export const primaryButton = style([
  button,
  {
    background: vars.color.accent,
    color: vars.color.surfaceRaised,
  },
]);

export const secondaryButton = style([
  button,
  {
    background: vars.color.surfaceMuted,
    color: vars.color.text,
    border: `1px solid ${vars.color.borderSubtle}`,
  },
]);

export const dangerButton = style([
  button,
  {
    background: vars.color.danger,
    color: vars.color.surfaceRaised,
  },
]);

export const warningBanner = style({
  padding: vars.space.sm,
  borderRadius: vars.radius.sm,
  background: `oklch(from ${vars.color.warning} l c h / 0.14)`,
  color: vars.color.text,
  fontSize: vars.text.body,
});

export const dangerBanner = style({
  padding: vars.space.sm,
  borderRadius: vars.radius.sm,
  background: `oklch(from ${vars.color.danger} l c h / 0.12)`,
  color: vars.color.danger,
  fontSize: vars.text.body,
});

export const filenameList = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const progressTable = style({
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
});

export const progressRow = style({
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
});

export const progressCell = style({
  padding: `${vars.space.xs} ${vars.space.sm}`,
  textAlign: "left",
  verticalAlign: "middle",
});

export const statusPill = style({
  display: "inline-block",
  padding: `2px 8px`,
  borderRadius: "999px",
  fontSize: "0.7rem",
  fontWeight: 600,
  textTransform: "uppercase",
});

export const statusPillCompleted = style([
  statusPill,
  {
    background: `oklch(from ${vars.color.success} l c h / 0.2)`,
    color: vars.color.success,
  },
]);

export const statusPillRunning = style([
  statusPill,
  {
    background: `oklch(from ${vars.color.accent} l c h / 0.2)`,
    color: vars.color.accent,
  },
]);

export const statusPillFailed = style([
  statusPill,
  {
    background: `oklch(from ${vars.color.danger} l c h / 0.2)`,
    color: vars.color.danger,
  },
]);
