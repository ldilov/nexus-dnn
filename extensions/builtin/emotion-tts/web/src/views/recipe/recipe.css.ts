import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const shell = style({
  display: "flex",
  flexDirection: "column",
  gap: "var(--d-9, 64px)",
  padding: vars.space.xl,
  paddingTop: vars.space.section,
  paddingBottom: "var(--d-9, 64px)",
  minHeight: "100vh",
  background: vars.color.surface,
  // audit-allow: px — fixed layout breakpoint
  backgroundImage: `radial-gradient(900px 520px at 88% -10%, color-mix(in oklab, ${vars.color.accent} 14%, transparent), transparent 62%), radial-gradient(680px 480px at -10% 110%, color-mix(in oklab, ${vars.color.secondary} 8%, transparent), transparent 60%)`,
  color: vars.color.text,
  fontFamily: vars.font.body,
  // audit-allow: px — fixed layout breakpoint
  maxWidth: "1440px",
  marginInline: "auto",
  width: "100%",
  "@media": {
    // audit-allow: px — modal/dialog/drawer width per UX spec
    "(min-width: 1441px)": {
      // audit-allow: px — modal/dialog/drawer width per UX spec
      maxWidth: "1600px",
    },
    // audit-allow: px — fixed layout breakpoint
    "(max-width: 768px)": {
      gap: vars.space.section,
      padding: vars.space.lg,
      paddingTop: vars.space.xl,
    },
  },
});

export const heroBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const heroTopRow = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: vars.space.lg,
  flexWrap: "wrap",
});

export const heroEyebrow = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textMuted,
});

export const heroTitle = style({
  fontFamily: vars.font.display,
  fontSize: "clamp(1.75rem, 1.2rem + 1.5vw, 2.75rem)",
  letterSpacing: vars.tracking.display,
  color: vars.color.text,
  margin: 0,
  fontWeight: 600,
});

export const heroLede = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.subhead,
  lineHeight: 1.5,
  color: vars.color.textMuted,
  margin: 0,
  maxWidth: "62ch",
});

export const heroMetaRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.lg,
  flexWrap: "wrap",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const heroMetaItem = style({
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.space.sm,
});

export const heroMetaLabel = style({
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textFaint,
});

export const heroMetaValue = style({
  color: vars.color.text,
});

export const sectionStack = style({
  display: "flex",
  flexDirection: "column",
  gap: "var(--d-9, 64px)",
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(max-width: 768px)": {
      gap: vars.space.section,
    },
  },
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const sectionHeader = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.lg,
  flexWrap: "wrap",
});

export const sectionEyebrow = style({
  display: "inline-flex",
  alignItems: "baseline",
  gap: "0.4em",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textMuted,
});

export const sectionTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.head,
  letterSpacing: vars.tracking.display,
  margin: 0,
  fontWeight: 600,
});

export const sectionMeta = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const sectionToggle = style({
  appearance: "none",
  background: "transparent",
  border: "none",
  display: "flex",
  alignItems: "baseline",
  gap: vars.space.md,
  width: "100%",
  padding: 0,
  cursor: "pointer",
  textAlign: "left",
  color: "inherit",
  selectors: {
    "&:hover": {
      color: vars.color.text,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "4px",
      borderRadius: vars.radius.sm,
    },
  },
});

export const sectionEyebrowNumber = style({
  color: vars.color.accent,
  fontWeight: 700,
  transition: `letter-spacing ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    [`${sectionToggle}:hover &`]: {
      letterSpacing: "0.04em",
    },
  },
});

export const sectionEyebrowSlash = style({
  color: vars.color.textFaint,
});

export const sectionEyebrowLabel = style({
  color: vars.color.textMuted,
});

export const sectionChevron = style({
  marginLeft: "auto",
  fontSize: vars.text.subhead,
  color: vars.color.textMuted,
  transition: `transform ${vars.motion.fast}`,
  selectors: {
    '&[data-collapsed="true"]': {
      transform: "rotate(-90deg)",
    },
  },
});

export const quickActions = style({
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.md,
  alignItems: "center",
  padding: vars.space.lg,
  borderRadius: vars.radius.lg,
  background: `color-mix(in oklab, ${vars.color.accent} 6%, ${vars.color.surfaceMuted})`,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 20%, transparent)`,
  overflow: "hidden",
  selectors: {
    /* soft accent halo cohesion with the run-panel card */
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: `radial-gradient(420px 160px at 0% 0%, color-mix(in oklab, ${vars.color.accent} 12%, transparent), transparent 70%)`,
    },
  },
});

/* Lift direct children above the ::before halo so content reads cleanly. */
globalStyle(`${quickActions} > *`, {
  position: "relative",
});

/* Scroll-up FAB — must satisfy two competing constraints:
 *   1. `position: fixed` needs to be relative to the viewport, not the
 *      transformed ancestor (route-transition wrapper / panel motion
 *      container). That means portaling to document.body, NOT into the
 *      <emotion-tts-app> custom element.
 *   2. But emotion-tts CSS vars only resolve INSIDE <emotion-tts-app>.
 *      Portaled to body, every `vars.color.*` resolves to empty string
 *      and the FAB renders transparent-on-transparent.
 *
 * Resolution: portal to body AND hardcode the visuals (matches the
 * sticky-toolbar fix in commit 4258e67). Spectral-Graphite violet
 * accent + near-white glyph + raised shadow.
 *
 * audit-allow: hex — established escape-hatch for body-portaled
 * extension UI per 4258e67. */
export const scrollTopBtn = style({
  position: "fixed",
  // audit-allow: px — bottom safe-area clearance for host dock + scrollbar
  bottom: "72px",
  // audit-allow: px — clear right-side scrollbar gutter
  right: "40px",
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  background: "#8455ef",
  color: "#f0f0f3",
  border: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  lineHeight: 1,
  cursor: "pointer",
  boxShadow:
    "0 8px 24px rgba(0, 0, 0, 0.32), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)",
  zIndex: 60,
  opacity: 0,
  pointerEvents: "none",
  transform: "translateY(8px)",
  transition:
    "opacity 200ms ease, transform 200ms ease, box-shadow 120ms ease, background 120ms ease",
  selectors: {
    '&[data-visible="true"]': {
      opacity: 1,
      pointerEvents: "auto",
      transform: "translateY(0)",
    },
    "&:hover": {
      background: "#9b6ffa",
      boxShadow:
        "0 12px 28px rgba(132, 85, 239, 0.36), inset 0 1px 0 0 rgba(255, 255, 255, 0.24)",
      transform: "translateY(-2px)",
    },
    "&:focus-visible": {
      outline: "2px solid #ba9eff",
      outlineOffset: "3px",
    },
  },
});

export const sectionBody = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  padding: vars.space.xl,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.lg,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  minWidth: 0,
});

export const splitBody = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
  gap: vars.space.xl,
  padding: vars.space.xl,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.lg,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  alignItems: "start",
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(max-width: 1024px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const splitColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  minWidth: 0,
});

export const scriptShell = style({
  position: "relative",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — fluid clamp anchors for editor min-height
  minHeight: "clamp(360px, 36vh, 520px)",
  borderRadius: vars.radius.md,
  background: "transparent",
  transition: `box-shadow ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    "&:focus-within": {
      background: `color-mix(in oklab, ${vars.color.accent} 4%, transparent)`,
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 45%, transparent)`,
    },
  },
});

const scriptShared = {
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  lineHeight: 1.65,
  padding: `${vars.space.lg} ${vars.space.lg}`,
  border: "none",
  outline: "none",
  background: "transparent",
  whiteSpace: "pre-wrap" as const,
  wordWrap: "break-word" as const,
  margin: 0,
  letterSpacing: 0,
  tabSize: 2,
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
  display: "block",
  boxSizing: "border-box",
  flex: "1 1 auto",
  color: "transparent",
  caretColor: vars.color.accent,
  resize: "none",
  selectors: {
    "&::placeholder": {
      color: vars.color.textFaint,
      fontFamily: vars.font.mono,
      fontStyle: "italic",
      opacity: 0.6,
    },
    "&::selection": {
      background: `color-mix(in oklab, ${vars.color.accent} 35%, transparent)`,
      color: vars.color.text,
    },
  },
});

/* Quick mode treatment — anchors the textarea with an accent left-rail
 * (mirrors the toolbar above) and switches typography from mono syntax
 * to readable UI prose. Standalone class (no compose-with-base) so the
 * non-Quick scriptTextarea's `color: transparent` can never bleed in;
 * any layout property the textarea needs must therefore live HERE. */
export const scriptShellQuick = style({
  position: "relative",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  background: vars.color.surface,
  borderRadius: vars.radius.md,
  borderLeft: `2px solid ${vars.color.accent}`,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  // audit-allow: px — design-system-spec'd minimum prose height
  minHeight: "240px",
  transition: `box-shadow ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    "&:focus-within": {
      background: vars.color.surface,
      boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}, inset 4px 0 0 -2px var(--accent-glow, rgba(132, 85, 239, 0.55))`,
    },
  },
});

export const scriptTextareaQuick = style({
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  flex: "1 1 auto",
  margin: 0,
  border: "none",
  outline: "none",
  background: "transparent",
  fontFamily: vars.font.body,
  // audit-allow: px — design-system-spec'd prose body size
  fontSize: "15px",
  lineHeight: 1.7,
  letterSpacing: 0,
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  color: vars.color.text,
  caretColor: vars.color.accent,
  // audit-allow: px — design-system-spec'd prose padding (more breathing room than the syntax editor)
  padding: "18px 20px",
  resize: "vertical",
  selectors: {
    "&::placeholder": {
      color: vars.color.textMuted,
      fontStyle: "italic",
      opacity: 0.55,
      fontFamily: vars.font.body,
    },
    "&::selection": {
      background: `color-mix(in oklab, ${vars.color.accent} 35%, transparent)`,
      color: vars.color.text,
    },
  },
});

export const scriptCharacter = style({});

export const scriptText = style({
  color: vars.color.text,
});

export const scriptUnresolved = style({
  textDecoration: "underline wavy",
  textDecorationColor: vars.color.danger,
  // audit-allow: px — below minimum token granularity (sub-10px)
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
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "2px",
  background: vars.color.surface,
  borderRadius: vars.radius.sm,
  // audit-allow: px — sub-token spacing value, no density token at this step
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
  ":hover": { background: vars.color.surfaceRaised },
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
  background: vars.color.surface,
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

export const castListItem = style({
  listStyle: "none",
});
