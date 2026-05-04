import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d5,
  paddingBlock: vars.density.padSection,
  height: "100%",
  minHeight: 0,
  // audit-allow: px — fixed layout breakpoint
  maxWidth: "1400px",
  marginInline: "auto",
  width: "100%",
});

export const backLink = style({
  alignSelf: "flex-start",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
  background: "transparent",
  border: "none",
  color: vars.color.text.muted,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
  // audit-allow: px — keep horizontal padding tight; vertical via minHeight
  padding: "0 4px",
  // WCAG 2.5.8 AA — minimum 24×24 touch target. Use the small-control
  // density token so this scales with the host's density setting.
  minHeight: vars.control.heightSm,
  borderRadius: vars.radius.control,
  selectors: {
    "&:hover": { color: vars.color.text.primary },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent.accent}`,
      // audit-allow: px — focus ring offset matching host Button pattern
      outlineOffset: "2px",
    },
  },
});


export const backIcon = style({
  // audit-allow: px — icon size, no density token at this step
  fontSize: "16px",
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
});

export const headerRow = style({
  display: "flex",
  alignItems: "flex-end",
  gap: vars.density.d5,
  flexWrap: "wrap",
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  minWidth: 0,
  flex: "1 1 auto",
});

export const title = style({
  margin: 0,
  fontFamily: vars.font.ui,
  // audit-allow: px — fluid clamp anchors, design-spec sizing
  fontSize: "clamp(28px, 1.8rem + 1.0vw, 44px)",
  fontWeight: vars.font.weight.regular,
  lineHeight: 1.05,
  letterSpacing: "-0.02em",
  color: vars.color.text.primary,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "baseline",
  // audit-allow: px — relative em-anchored gap
  gap: "0.25em",
  textWrap: "balance",
});

export const titleModule = style({
  color: vars.color.text.muted,
  fontWeight: vars.font.weight.regular,
});

export const titleSep = style({
  color: vars.color.accent.accent,
  fontWeight: vars.font.weight.regular,
  // audit-allow: px — relative em-anchored gap
  margin: "0 0.05em",
});

export const titleName = style({
  color: vars.color.text.primary,
  fontWeight: vars.font.weight.medium,
});

export const meta = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  color: vars.color.text.muted,
  fontSize: vars.font.size.bodySm,
  flexWrap: "wrap",
});

export const metaSep = style({
  opacity: 0.4,
});

export const recipeIdLabel = style({
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.density.d2,
});

export const recipeIdValue = style({
  fontFamily: vars.font.code,
  color: vars.color.accent.accent,
});

export const actions = style({
  display: "flex",
  gap: vars.density.d2,
  flexWrap: "wrap",
  flexShrink: 0,
});

export const actionIcon = style({
  // audit-allow: px — icon size, no density token at this step
  fontSize: "18px",
});

// Inline spinner for actions in `state: "loading"` — borderless,
// accent-tinted, sized to the button label baseline. Honors
// prefers-reduced-motion by halving rotation speed (still indicates
// activity without strobing).
const actionSpin = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const actionSpinner = style({
  // audit-allow: px — fixed 14px disc tuned to the action button label
  width: "14px",
  // audit-allow: px — fixed 14px disc tuned to the action button label
  height: "14px",
  borderRadius: "50%",
  // audit-allow: px — hairline ring
  border: `2px solid ${vars.color.outline.variant}`,
  borderTopColor: vars.color.accent.accent,
  animation: `${actionSpin} 0.9s linear infinite`,
  flexShrink: 0,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationDuration: "1.8s",
    },
  },
});

/* ─── Underlined tab strip ─────────────────────────────────────── */
export const tabs = style({
  display: "flex",
  alignItems: "stretch",
  gap: vars.density.d1,
  // audit-allow: px — hairline border
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  position: "relative",
  // audit-allow: px — hairline negative offset
  marginBottom: "-1px",
  overflowX: "auto",
  scrollbarWidth: "none",
  // The detail page root is `display: flex; flex-direction: column`. Without
  // an explicit shrink-disable, this strip gets flex-squeezed to ~1px tall
  // when the body content is taller than the viewport — which made the
  // tabs invisible on long Recipe Studio pages.
  flexShrink: 0,
  selectors: {
    "&::-webkit-scrollbar": { display: "none" },
  },
});

export const tab = style({
  appearance: "none",
  background: "transparent",
  border: "none",
  fontFamily: vars.font.code,
  // audit-allow: px — design-spec font sizing for tab labels
  fontSize: "11px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
  // audit-allow: px — tab vertical padding tuned to underline anchor
  padding: "14px 18px 13px",
  cursor: "pointer",
  position: "relative",
  whiteSpace: "nowrap",
  transition: `color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  // audit-allow: px — hairline border
  borderBottom: "2px solid transparent",
  // audit-allow: px — hairline negative offset to align with strip baseline
  marginBottom: "-1px",
  selectors: {
    "&:hover": { color: vars.color.text.primary },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent.accent}`,
      // audit-allow: px — focus ring offset matching host Button pattern
      outlineOffset: "-4px",
      borderRadius: vars.radius.control,
    },
    "&[aria-selected='true']": {
      color: vars.color.text.primary,
      borderBottomColor: vars.color.accent.accent,
    },
    "&[aria-selected='true']::after": {
      content: '""',
      position: "absolute",
      // audit-allow: px — design-spec underline glow geometry
      inset: "auto 14px -1px",
      // audit-allow: px — design-spec underline glow geometry
      height: "1px",
      background: vars.color.accent.accent,
      // audit-allow: px — design-spec underline glow geometry
      filter: "blur(3px)",
      opacity: 0.5,
    },
  },
});

/* ─── Tab body ─────────────────────────────────────────────────── */
export const body = style({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  flex: "1 1 auto",
});

export const panelLive = style({
  flex: "1 1 auto",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

export const panelDocument = style({
  display: "flex",
  flexDirection: "column",
  flex: "0 0 auto",
});

export const documentFrame = style({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  flex: "0 0 auto",
});

export const fallbackNote = style({
  padding: vars.density.padCard,
  color: vars.color.text.secondary,
  lineHeight: vars.font.lineHeight.relaxed,
  fontSize: vars.font.size.body,
});

export const realGraphFrame = style({
  flex: "1 1 auto",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
});

/* ─── Stub bodies for not-yet-built tabs ─────────────────────── */
export const stub = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  // audit-allow: px — design-spec stub body padding
  padding: "80px 32px",
  background: vars.card.bg,
  // audit-allow: px — hairline dashed border
  border: `1px dashed ${vars.color.outline.variant}`,
  borderRadius: vars.radius.card,
  // audit-allow: px — design-spec stub body min-height
  minHeight: "360px",
  gap: vars.density.d3,
});

export const stubGlyph = style({
  // audit-allow: px — design-spec glyph size
  fontSize: "56px",
  color: vars.color.accent.accent,
  opacity: 0.45,
  marginBottom: vars.density.d2,
});

export const stubTitle = style({
  fontFamily: vars.font.ui,
  // audit-allow: px — design-spec stub title
  fontSize: "22px",
  fontWeight: vars.font.weight.regular,
  color: vars.color.text.primary,
  letterSpacing: "-0.01em",
});

export const stubBody = style({
  // audit-allow: px — design-spec stub body width
  maxWidth: "460px",
  // audit-allow: px — design-spec stub body type size
  fontSize: "13.5px",
  color: vars.color.text.secondary,
  lineHeight: vars.font.lineHeight.relaxed,
});

export const stubHint = style({
  fontFamily: vars.font.code,
  marginTop: vars.density.d3,
  // audit-allow: px — design-spec hint chip padding
  padding: "4px 10px",
  background: vars.color.bg.lowest,
  borderRadius: vars.radius.full,
  // audit-allow: px — design-spec hint chip type size
  fontSize: "10.5px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
  opacity: 0.7,
});
