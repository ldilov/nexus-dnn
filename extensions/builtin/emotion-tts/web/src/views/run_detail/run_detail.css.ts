// audit-allow: px — fixed layout breakpoint
// audit-allow: px — modal/dialog/drawer width per UX spec
// audit-allow: px — sub-token spacing value, no density token at this step
import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

const fadeUp = keyframes({
  // audit-allow: px — sub-token spacing value, no density token at this step
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const shimmer = keyframes({
  from: { backgroundPosition: "-200% 0" },
  to: { backgroundPosition: "200% 0" },
});

export const shell = style({
  minHeight: "100vh",
  background: vars.color.surface,
  // audit-allow: px — fixed layout breakpoint
  backgroundImage: `radial-gradient(900px 520px at 10% -10%, color-mix(in oklab, ${vars.color.accent} 14%, transparent), transparent 60%), radial-gradient(760px 500px at 110% 110%, color-mix(in oklab, ${vars.color.secondary} 9%, transparent), transparent 60%)`,
  color: vars.color.text,
  fontFamily: vars.font.body,
  padding: `${vars.space.xl} ${vars.space.lg} ${vars.space.section}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.xl,
});

export const frame = style({
  width: "100%",
  // audit-allow: px — fixed layout breakpoint
  maxWidth: "1080px",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const hero = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  animation: `${fadeUp} 320ms cubic-bezier(0.16, 1, 0.3, 1) both`,
});

export const eyebrow = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
  margin: 0,
});

export const eyebrowLink = style({
  color: vars.color.accent,
  textDecoration: "none",
  transition: `color ${vars.motion.fast}`,
  ":hover": {
    color: vars.color.text,
  },
});

export const eyebrowSeparator = style({
  color: vars.color.textFaint,
});

export const titleRow = style({
  display: "flex",
  alignItems: "flex-end",
  gap: vars.space.md,
  flexWrap: "wrap",
  justifyContent: "space-between",
});

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.display,
  fontWeight: 600,
  letterSpacing: vars.tracking.display,
  margin: 0,
  lineHeight: 1.05,
});

export const titleRunId = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  color: vars.color.textMuted,
  fontWeight: 400,
  marginLeft: vars.space.sm,
  letterSpacing: 0,
});



export const stats = style({
  display: "grid",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: vars.space.md,
  animation: `${fadeUp} 360ms 80ms cubic-bezier(0.16, 1, 0.3, 1) both`,
});

export const statCard = style({
  background: vars.color.surfaceRaised,
  borderRadius: vars.radius.md,
  padding: `${vars.space.md} ${vars.space.lg}`,
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "2px",
  position: "relative",
  overflow: "hidden",
  transition: `transform ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  ":hover": {
    transform: "translateY(-1px)",
    boxShadow: vars.shadow.subtle,
  },
});

export const statLabel = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  fontWeight: 600,
});

export const statValue = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.head,
  fontWeight: 600,
  letterSpacing: vars.tracking.display,
  color: vars.color.text,
  lineHeight: 1.1,
});

export const statValueMono = style([
  statValue,
  {
    fontFamily: vars.font.mono,
    fontSize: vars.text.subhead,
  },
]);

export const statBar = style({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "3px",
  background: `linear-gradient(90deg, ${vars.color.accent}, ${vars.color.secondary})`,
  transformOrigin: "left center",
  transform: "scaleX(var(--progress, 0))",
  transition: `transform ${vars.motion.slow}`,
});

export const resumePanel = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  padding: `${vars.space.md} ${vars.space.lg}`,
  background: `linear-gradient(135deg, color-mix(in oklab, ${vars.color.warning} 16%, ${vars.color.surfaceRaised}), ${vars.color.surfaceRaised})`,
  borderRadius: vars.radius.lg,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.warning} 35%, transparent)`,
  animation: `${fadeUp} 400ms 160ms cubic-bezier(0.16, 1, 0.3, 1) both`,
});

export const resumeCopy = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "2px",
  minWidth: 0,
});

export const resumeTitle = style({
  fontSize: vars.text.subhead,
  fontWeight: 600,
  color: vars.color.text,
  margin: 0,
});

export const resumeBody = style({
  fontSize: vars.text.body,
  color: vars.color.textMuted,
  margin: 0,
});

export const resumeError = style({
  flex: "1 1 100%",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.danger,
  margin: 0,
  paddingTop: vars.space.xs,
});

export const cacheSummary = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
});

export const cacheRatio = style({
  color: vars.color.accent,
  fontWeight: 600,
});

export const utteranceList = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "2px",
});

export const utterance = style({
  display: "grid",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gridTemplateColumns: "auto minmax(120px, 160px) 1fr auto",
  alignItems: "baseline",
  gap: vars.space.md,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.sm,
  transition: `background ${vars.motion.fast}`,
  ":hover": {
    background: vars.color.surfaceMuted,
  },
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(max-width: 720px)": {
      gridTemplateColumns: "auto 1fr",
      rowGap: vars.space.xs,
    },
  },
});

export const utteranceItem = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const editChip = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "4px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "2px 8px",
  borderRadius: vars.radius.pill,
  background: `color-mix(in oklab, ${vars.color.tertiary} 14%, transparent)`,
  color: vars.color.tertiary,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  fontWeight: 600,
  textTransform: "lowercase",
  letterSpacing: "0.02em",
});

export const uttIndex = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textFaint,
  fontVariantNumeric: "tabular-nums",
});

export const uttCharacter = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.secondary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const uttText = style({
  fontSize: vars.text.body,
  color: vars.color.text,
  lineHeight: 1.55,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  minWidth: 0,
});

export const uttMeta = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  justifySelf: "end",
  whiteSpace: "nowrap",
});

export const cacheChip = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "4px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "2px 8px",
  borderRadius: vars.radius.pill,
  background: `color-mix(in oklab, ${vars.color.accent} 14%, transparent)`,
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  fontWeight: 600,
  textTransform: "lowercase",
  letterSpacing: "0.02em",
});

export const footer = style({
  display: "flex",
  justifyContent: "flex-end",
  paddingTop: vars.space.sm,
  animation: `${fadeUp} 480ms 320ms cubic-bezier(0.16, 1, 0.3, 1) both`,
});

export const exportLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.accent,
  textDecoration: "none",
  background: `linear-gradient(90deg, color-mix(in oklab, ${vars.color.accent} 12%, transparent), color-mix(in oklab, ${vars.color.secondary} 12%, transparent))`,
  backgroundSize: "200% 100%",
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 45%, transparent)`,
  transition: `box-shadow ${vars.motion.fast}, color ${vars.motion.fast}`,
  ":hover": {
    color: vars.color.text,
    boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.color.accentGlow}`,
    animation: `${shimmer} 1.6s linear infinite`,
  },
});

export const exportArrow = style({
  fontFamily: vars.font.mono,
  fontWeight: 400,
});

export const rebuildBlock = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: vars.space.xs,
});

export const rebuildHint = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.warning,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  margin: 0,
});

export const inlineToast = style({
  position: "fixed",
  bottom: vars.space.xl,
  right: vars.space.xl,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceHigh,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  boxShadow: vars.shadow.raised,
  zIndex: 50,
});

