import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const shell = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.3fr) minmax(340px, 0.7fr)",
  gap: vars.space.lg,
  padding: vars.space.lg,
  minHeight: "100vh",
  background: vars.color.surface,
  backgroundImage: `radial-gradient(900px 520px at 88% -10%, color-mix(in oklab, ${vars.color.accent} 14%, transparent), transparent 62%), radial-gradient(680px 480px at -10% 110%, color-mix(in oklab, ${vars.color.secondary} 8%, transparent), transparent 60%)`,
  color: vars.color.text,
  fontFamily: vars.font.body,
  "@media": {
    "(max-width: 960px)": {
      gridTemplateColumns: "1fr",
    },
  },
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
  "@media": {
    "(max-width: 960px)": {
      position: "static",
    },
  },
});

export const deploymentHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  flexWrap: "wrap",
  padding: `${vars.space.md} ${vars.space.lg}`,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.lg,
  gridColumn: "1 / -1",
});

export const deploymentTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.head,
  letterSpacing: vars.tracking.display,
  margin: 0,
});

export const scriptTextarea = style({
  width: "100%",
  minHeight: "360px",
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  lineHeight: 1.55,
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  border: "none",
  outline: "none",
  background: vars.color.surfaceMuted,
  color: vars.color.text,
  resize: "vertical",
  transition: `box-shadow ${vars.motion.fast}`,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
  ":focus": {
    boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.glow}`,
  },
  "::placeholder": {
    color: vars.color.textFaint,
    fontFamily: vars.font.mono,
  },
});

export const label = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  fontWeight: 600,
});

export const controlRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm,
  alignItems: "center",
});

export const filenameList = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  listStyle: "none",
  padding: `${vars.space.sm} ${vars.space.md}`,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.sm,
  maxHeight: "180px",
  overflowY: "auto",
});

export const progressTable = style({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
});

export const progressRow = style({
  transition: `background ${vars.motion.fast}`,
  ":hover": { background: vars.color.surfaceMuted },
});

export const progressCell = style({
  padding: `${vars.space.sm} ${vars.space.sm}`,
  textAlign: "left",
  verticalAlign: "middle",
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
});

