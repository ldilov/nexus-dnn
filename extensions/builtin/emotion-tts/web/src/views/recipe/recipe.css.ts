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

export const scriptShell = style({
  position: "relative",
  width: "100%",
  minHeight: "360px",
  borderRadius: vars.radius.md,
  background: vars.color.surfaceMuted,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
  transition: `box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:focus-within": {
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.glow}`,
    },
  },
});

const scriptShared = {
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  lineHeight: 1.55,
  padding: vars.space.md,
  border: "none",
  outline: "none",
  background: "transparent",
  whiteSpace: "pre-wrap" as const,
  wordWrap: "break-word" as const,
  margin: 0,
  letterSpacing: 0,
};

export const scriptOverlay = style({
  ...scriptShared,
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  color: vars.color.textMuted,
  overflow: "hidden",
});

export const scriptTextarea = style({
  ...scriptShared,
  position: "relative",
  width: "100%",
  minHeight: "360px",
  display: "block",
  color: "transparent",
  caretColor: vars.color.text,
  resize: "vertical",
  selectors: {
    "&::placeholder": {
      color: vars.color.textFaint,
      fontFamily: vars.font.mono,
    },
    "&::selection": {
      background: `color-mix(in oklab, ${vars.color.accent} 35%, transparent)`,
      color: vars.color.text,
    },
  },
});

export const scriptCharacter = style({
  fontWeight: 600,
});

export const scriptText = style({
  color: vars.color.text,
});

export const scriptUnresolved = style({
  textDecoration: "underline wavy",
  textDecorationColor: vars.color.danger,
  textUnderlineOffset: "3px",
});

export const scriptOverride = style({
  color: vars.color.secondary,
  fontStyle: "italic",
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

export const preflightList = style({
  listStyle: "none",
  padding: 0,
  margin: `0 0 ${vars.space.sm}`,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const preflightItem = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  background: vars.color.surfaceMuted,
});

export const preflightLabel = style({
  fontSize: vars.text.caption,
  color: vars.color.text,
  fontWeight: 500,
  flex: "1 1 auto",
});

export const preflightDetail = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});
