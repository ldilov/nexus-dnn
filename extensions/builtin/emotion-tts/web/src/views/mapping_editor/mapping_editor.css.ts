import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

const fadeUp = keyframes({
  from: { opacity: 0, transform: "translateY(8px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const pulse = keyframes({
  "0%, 100%": { opacity: 0.6 },
  "50%": { opacity: 1 },
});

export const shell = style({
  display: "grid",
  gridTemplateColumns: "minmax(280px, 360px) 1fr",
  gap: vars.space.lg,
  padding: vars.space.lg,
  minHeight: "100vh",
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.body,
  "@media": {
    "(max-width: 960px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const sidebar = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  minWidth: 0,
});

export const sidebarHeader = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.sm,
  paddingBottom: vars.space.sm,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
});

export const sidebarTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.head,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  margin: 0,
});

export const sidebarCount = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const searchField = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radius.sm,
  background: vars.color.surfaceMuted,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  transition: `border-color ${vars.motion.fast}`,
  selectors: {
    "&:focus": {
      outline: "none",
      borderColor: vars.color.accent,
    },
  },
});

export const sidebarList = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  overflowY: "auto",
  paddingRight: vars.space.xs,
});

export const mappingRow = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: vars.space.sm,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.sm,
  background: "transparent",
  border: "1px solid transparent",
  color: vars.color.text,
  cursor: "pointer",
  fontSize: vars.text.body,
  textAlign: "left",
  width: "100%",
  animationName: fadeUp,
  animationDuration: "240ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  transition: `background ${vars.motion.fast}, transform ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      background: vars.color.surfaceMuted,
      transform: "translateX(2px)",
    },
  },
});

export const mappingRowSelected = style([
  mappingRow,
  {
    background: vars.color.surfaceRaised,
    borderColor: vars.color.borderSubtle,
    boxShadow: vars.shadow.subtle,
    selectors: {
      "&:hover": {
        background: vars.color.surfaceRaised,
        transform: "translateX(0)",
      },
    },
  },
]);

export const characterInitial = style({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  background: `color-mix(in oklab, ${vars.color.accent} 22%, transparent)`,
  color: vars.color.accent,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
  fontWeight: 600,
});

export const rowMeta = style({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
});

export const rowName = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.subhead,
  fontWeight: 500,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const rowKind = style({
  fontFamily: vars.font.mono,
  fontSize: "0.7rem",
  color: vars.color.textMuted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const emptySidebar = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.textMuted,
  padding: `${vars.space.md} ${vars.space.sm}`,
  textAlign: "center",
  border: `1px dashed ${vars.color.borderSubtle}`,
  borderRadius: vars.radius.md,
});

export const detail = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  minWidth: 0,
});

export const detailHeader = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const detailTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.display,
  fontWeight: 600,
  letterSpacing: "-0.02em",
  margin: 0,
  lineHeight: 1.05,
});

export const detailSubtitle = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
});

export const detailBody = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
  gap: vars.space.lg,
  "@media": {
    "(max-width: 1200px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const fieldset = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  padding: vars.space.md,
  background: vars.color.surfaceRaised,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.subtle,
});

export const fieldLabel = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  fontWeight: 600,
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const input = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radius.sm,
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  transition: `border-color ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:focus": {
      outline: "none",
      borderColor: vars.color.accent,
      boxShadow: `0 0 0 3px color-mix(in oklab, ${vars.color.accent} 20%, transparent)`,
    },
  },
});

export const textarea = style([
  input,
  {
    minHeight: "96px",
    fontFamily: vars.font.mono,
    resize: "vertical",
  },
]);

export const dropzone = style({
  padding: vars.space.lg,
  borderRadius: vars.radius.md,
  border: `2px dashed ${vars.color.borderSubtle}`,
  background: vars.color.surfaceMuted,
  color: vars.color.textMuted,
  textAlign: "center",
  cursor: "pointer",
  transition: `border-color ${vars.motion.fast}, background ${vars.motion.fast}, transform ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      borderColor: vars.color.accent,
      color: vars.color.text,
    },
  },
});

export const dropzoneActive = style([
  dropzone,
  {
    borderColor: vars.color.accent,
    borderStyle: "solid",
    background: `color-mix(in oklab, ${vars.color.accent} 10%, transparent)`,
    transform: "scale(1.01)",
    boxShadow: `0 0 0 4px color-mix(in oklab, ${vars.color.accent} 14%, transparent)`,
  },
]);

export const dropzoneBusy = style([
  dropzone,
  {
    animationName: pulse,
    animationDuration: "1.4s",
    animationIterationCount: "infinite",
    cursor: "wait",
  },
]);

export const voiceMeta = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.md,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const durationBar = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const durationTrack = style({
  position: "relative",
  height: "6px",
  borderRadius: "999px",
  background: vars.color.surfaceMuted,
  overflow: "hidden",
});

export const durationFill = style({
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  background: `linear-gradient(90deg, ${vars.color.accent}, ${vars.color.accentMuted})`,
  transition: `width ${vars.motion.normal}`,
});

export const durationWarn = style({
  fontSize: vars.text.caption,
  color: vars.color.warning,
});

export const durationDanger = style({
  fontSize: vars.text.caption,
  color: vars.color.danger,
});

export const actionsRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm,
  alignItems: "center",
});

export const primaryButton = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.sm,
  border: "none",
  background: vars.color.accent,
  color: vars.color.surfaceRaised,
  fontWeight: 600,
  fontFamily: vars.font.body,
  cursor: "pointer",
  transition: `transform ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:hover:not(:disabled)": {
      transform: "translateY(-1px)",
      boxShadow: vars.shadow.raised,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

export const secondaryButton = style([
  primaryButton,
  {
    background: vars.color.surfaceMuted,
    color: vars.color.text,
    border: `1px solid ${vars.color.borderSubtle}`,
    selectors: {
      "&:hover:not(:disabled)": {
        background: vars.color.surfaceRaised,
        transform: "translateY(-1px)",
      },
    },
  },
]);

export const dangerButton = style([
  primaryButton,
  {
    background: "transparent",
    color: vars.color.danger,
    border: `1px solid color-mix(in oklab, ${vars.color.danger} 45%, transparent)`,
    selectors: {
      "&:hover:not(:disabled)": {
        background: `color-mix(in oklab, ${vars.color.danger} 14%, transparent)`,
      },
    },
  },
]);

export const toast = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: `color-mix(in oklab, ${vars.color.success} 18%, ${vars.color.surfaceRaised})`,
  color: vars.color.text,
  fontSize: vars.text.body,
});

export const testLineBar = style({
  display: "flex",
  gap: vars.space.sm,
  alignItems: "center",
  padding: vars.space.sm,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.sm,
});

export const testLineInput = style([
  input,
  {
    flex: 1,
    fontFamily: vars.font.mono,
  },
]);

export const waveform = style({
  display: "flex",
  alignItems: "flex-end",
  gap: "2px",
  height: "48px",
  padding: `${vars.space.sm} 0`,
});

export const waveformBar = style({
  width: "3px",
  borderRadius: "2px",
  background: vars.color.accentMuted,
  transition: `height ${vars.motion.normal}`,
});

globalStyle(`${dropzone} input`, {
  display: "none",
});

export const emptyOnboarding = style({
  padding: `${vars.space.xl} ${vars.space.lg}`,
});

export const emptyOnboardingHeader = style({
  textAlign: "center",
  marginBottom: vars.space.lg,
});

export const emptyOnboardingTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.head,
  margin: `0 0 ${vars.space.sm}`,
  color: vars.color.text,
});

export const emptyOnboardingSubtitle = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.textMuted,
  maxWidth: "44ch",
  margin: "0 auto",
  lineHeight: 1.5,
});

export const emptyHint = style({
  textAlign: "center",
  padding: vars.space.section,
});

export const emptyHintText = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.subhead,
  color: vars.color.textMuted,
});

export const testStatusDone = style({
  marginLeft: vars.space.sm,
  color: vars.color.success,
});

export const testStatusError = style({
  marginLeft: vars.space.sm,
  color: vars.color.danger,
});

export const hiddenFileInput = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});
