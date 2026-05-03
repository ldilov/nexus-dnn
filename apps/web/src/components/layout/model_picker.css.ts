import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideIn = keyframes({
  // audit-allow: px — translateY offset below token granularity, decorative entrance motion
  from: { opacity: 0, transform: "translateY(10px) scale(0.975)" },
  to: { opacity: 1, transform: "translateY(0) scale(1)" },
});

const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

const reducedMotion = "(prefers-reduced-motion: reduce)";

export const backdrop = style({
  position: "fixed",
  inset: 0,
  // audit-allow: hex — glassmorphism radial backdrop, multi-stop rgba gradient per design lang
  background:
    "radial-gradient(ellipse at top, rgba(10,12,18,0.55) 0%, rgba(2,3,6,0.82) 60%, rgba(2,3,6,0.92) 100%)",
  // audit-allow: px — blur radius for glassmorphism material
  backdropFilter: "blur(16px) saturate(140%)",
  // audit-allow: px — blur radius for glassmorphism material
  WebkitBackdropFilter: "blur(16px) saturate(140%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 120,
  animation: `${fadeIn} 200ms ease-out`,
  padding: `${vars.density.d7} ${vars.density.d6}`,
  "@media": {
    [reducedMotion]: { animation: "none" },
  },
});

export const dialog = style({
  // audit-allow: px — fixed modal width per IA contract, responsive via min()
  width: "min(620px, 100%)",
  // audit-allow: px — vh-based modal max-height, not a spacing token domain
  maxHeight: "82vh",
  // audit-allow: hex — layered glass surface gradient per design lang
  background:
    "linear-gradient(180deg, rgba(30,33,38,0.98) 0%, rgba(15,17,20,0.98) 100%)",
  // audit-allow: px — 22px radius between panel(14) and container(16); designer-specified dialog shape
  borderRadius: "22px",
  boxShadow: [
    // audit-allow: px — multi-layer elevation + outline shadow system per design lang
    "0 40px 120px rgba(0,0,0,0.6)",
    `0 0 0 1px rgba(186,158,255,0.10)`,
    "inset 0 1px 0 rgba(255,255,255,0.04)",
  ].join(", "),
  display: "flex",
  flexDirection: "column",
  gap: vars.density.gapCard,
  // audit-allow: px — 22px inset between d5(20) and d6(24), designer-specified dialog padding
  padding: "22px 22px 18px",
  animation: `${slideIn} 240ms cubic-bezier(0.16, 1, 0.3, 1)`,
  fontFamily: vars.font.ui,
  color: vars.color.text.primary,
  overflow: "hidden",
  "@media": {
    [reducedMotion]: { animation: "none" },
  },
});

export const header = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: vars.density.d4,
});

export const title = style({
  fontSize: vars.font.size.headingSm,
  fontWeight: 600,
  margin: 0,
  letterSpacing: "-0.01em",
});

export const subtitle = style({
  // audit-allow: px — 12.5px between bodySm(12) and body(13), below token granularity
  fontSize: "12.5px",
  color: vars.color.text.secondary,
  marginTop: vars.space.insetSm,
});

export const closeButton = style({
  appearance: "none",
  background: "transparent",
  color: vars.color.text.secondary,
  border: "none",
  fontSize: vars.font.size.headingLg,
  lineHeight: 1,
  cursor: "pointer",
  // audit-allow: px — 4px×10px close button hit padding, fixed UX target not density-scaled
  padding: "4px 10px",
  borderRadius: vars.radius.control,
  transition: `background ${vars.motion.durationFast} ease, color ${vars.motion.durationFast} ease`,
  ":hover": {
    background: "rgba(255,255,255,0.06)",
    color: vars.color.text.primary,
  },
  ":disabled": {
    opacity: 0.35,
    cursor: "not-allowed",
  },
});

export const searchWrap = style({
  position: "relative",
});

export const search = style({
  width: "100%",
  // audit-allow: px — 10px×14px input padding, fixed UX hit-target geometry
  padding: "10px 14px",
  // audit-allow: px — 13.5px between body(13) and bodyLg(14), below token granularity
  fontSize: "13.5px",
  fontFamily: vars.font.ui,
  color: vars.color.text.primary,
  background: "rgba(255,255,255,0.035)",
  border: "none",
  borderRadius: vars.radius.card,
  outline: "none",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
  transition: `box-shadow ${vars.motion.durationFast} ease, background ${vars.motion.durationFast} ease`,
  ":focus": {
    background: `rgba(186,158,255,0.06)`,
    // audit-allow: px — 1.5px focus ring width, sub-pixel border convention
    boxShadow: "inset 0 0 0 1.5px rgba(186,158,255,0.45)",
  },
  "::placeholder": {
    color: vars.color.text.secondary,
  },
});

export const list = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d1,
  flex: 1,
});

export const option = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d1,
  padding: `${vars.density.d3} ${vars.font.size.bodyLg}`,
  // audit-allow: px — 12px radius between control(6) and card(10); designer-specified list-item shape
  borderRadius: "12px",
  cursor: "pointer",
  outline: "none",
  background: "rgba(255,255,255,0.025)",
  transition:
    `background ${vars.motion.durationFast} ease, box-shadow 200ms ease, transform 200ms ease`,
  ":hover": {
    background: "rgba(186,158,255,0.08)",
    // audit-allow: px — 1px outline shadow ring, sub-pixel border convention
    boxShadow: "0 0 0 1px rgba(186,158,255,0.22)",
  },
  ":focus-visible": {
    background: "rgba(186,158,255,0.10)",
    // audit-allow: px — 1.5px focus ring width, sub-pixel border convention
    boxShadow: `0 0 0 1.5px ${vars.color.accent.primary}`,
  },
});

export const optionSelected = style({
  background: "rgba(186,158,255,0.12)",
  // audit-allow: px — 1px outline shadow ring, sub-pixel border convention
  boxShadow: "0 0 0 1px rgba(186,158,255,0.38)",
});

export const optionBusy = style({
  cursor: "progress",
  pointerEvents: "none",
});

export const optionRow1 = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.density.d3,
});

export const optionRow2 = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  flexWrap: "wrap",
  // audit-allow: px — 11.5px between caption(11) and bodySm(12), below token granularity
  fontSize: "11.5px",
  color: vars.color.text.secondary,
});

export const familyLabel = style({
  // audit-allow: px — 14.5px between bodyLg(14) and headingSm(16), below token granularity
  fontSize: "14.5px",
  fontWeight: 600,
  letterSpacing: "-0.005em",
  color: vars.color.text.primary,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: 0,
  flex: 1,
});

export const sizeLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
  flexShrink: 0,
});

export const quantChip = style({
  display: "inline-flex",
  alignItems: "center",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: 600,
  padding: `${vars.space.insetXs} ${vars.density.d2}`,
  borderRadius: vars.radius.control,
  color: vars.color.accent.primary,
  background: "rgba(186,158,255,0.12)",
  letterSpacing: "0.02em",
});

export const metaSep = style({
  opacity: 0.4,
});

export const metaText = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  // audit-allow: px — fixed max-width cap for meta text truncation per IA contract
  maxWidth: "220px",
});

export const inlineStatus = style({
  marginLeft: "auto",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.insetSm,
  color: vars.color.accent.primary,
  fontWeight: 500,
  // audit-allow: px — 11.5px between caption(11) and bodySm(12), below token granularity
  fontSize: "11.5px",
});

export const inlineSpinner = style({
  // audit-allow: px — 10px fixed spinner geometry, below icon.sm(14) minimum
  width: "10px",
  // audit-allow: px — 10px fixed spinner geometry, below icon.sm(14) minimum
  height: "10px",
  borderRadius: vars.radius.full,
  // audit-allow: px — 1.5px spinner ring border, sub-pixel border convention
  border: "1.5px solid rgba(186,158,255,0.3)",
  borderTopColor: vars.color.accent.primary,
  animation: `${spin} 900ms linear infinite`,
  "@media": {
    [reducedMotion]: { animation: "none" },
  },
});

export const empty = style({
  // audit-allow: px — 28px top/bottom padding between d6(24) and d7(32), below token granularity
  padding: `28px ${vars.density.d2}`,
  textAlign: "center",
  color: vars.color.text.secondary,
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d5,
  alignItems: "center",
});

export const emptyLink = style({
  color: vars.color.accent.primary,
  textDecoration: "none",
  fontWeight: 500,
  ":hover": { textDecoration: "underline" },
});

export const statusRow = style({
  // audit-allow: px — 12.5px between bodySm(12) and body(13), below token granularity
  fontSize: "12.5px",
  color: vars.color.text.secondary,
  padding: `${vars.density.d3} ${vars.density.d1}`,
  textAlign: "center",
});

export const runtimePanel = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d5,
  // audit-allow: px — 10px×12px panel inset between d2(8)/d3(12), designer-specified runtime panel
  padding: "10px 12px 12px",
  borderRadius: vars.radius.card,
  background: "rgba(255,255,255,0.025)",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
});

export const runtimeHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  listStyle: "none",
  userSelect: "none",
  fontSize: vars.font.size.caption,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: vars.color.text.secondary,
  transition: `color ${vars.motion.durationFast} ease`,
  selectors: {
    "&::-webkit-details-marker": { display: "none" },
    "&:hover": { color: vars.color.text.primary },
  },
});

export const runtimeHeaderBadge = style({
  // audit-allow: px — 10.5px between kbd(10) and caption(11), below token granularity
  fontSize: "10.5px",
  fontWeight: 500,
  letterSpacing: "0.02em",
  textTransform: "none",
  color: vars.color.accent.primary,
  opacity: 0.8,
});

export const runtimeRow = style({
  display: "grid",
  // audit-allow: px — fixed grid columns for label(86px)/value/input(56px) per IA contract
  gridTemplateColumns: "86px 1fr 56px",
  alignItems: "center",
  gap: vars.density.d5,
});

export const runtimeRowFull = style({
  display: "grid",
  // audit-allow: px — fixed grid columns for label(86px)/value per IA contract
  gridTemplateColumns: "86px 1fr",
  alignItems: "center",
  gap: vars.density.d5,
});

export const runtimeLabel = style({
  // audit-allow: px — 11.5px between caption(11) and bodySm(12), below token granularity
  fontSize: "11.5px",
  fontWeight: 500,
  color: vars.color.text.primary,
});

export const runtimeValue = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.accent.primary,
  textAlign: "right",
});

export const runtimeSlider = style({
  width: "100%",
  accentColor: vars.color.accent.primary,
  // audit-allow: px — 18px native range input height, fixed browser control geometry
  height: "18px",
  background: "transparent",
});

export const runtimeSelect = style({
  width: "100%",
  // audit-allow: px — 5px×8px select inset, fixed UX hit-target geometry
  padding: "5px 8px",
  fontSize: vars.font.size.bodySm,
  fontFamily: vars.font.ui,
  background: "rgba(255,255,255,0.04)",
  color: vars.color.text.primary,
  border: "none",
  borderRadius: vars.radius.control,
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
  outline: "none",
  cursor: "pointer",
  ":focus": {
    // audit-allow: px — 1.5px focus ring width, sub-pixel border convention
    boxShadow: "inset 0 0 0 1.5px rgba(186,158,255,0.5)",
  },
  selectors: {
    "&:disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

export const runtimeCheckboxRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  cursor: "pointer",
  userSelect: "none",
});

export const runtimeCheckboxRowDisabled = style({
  opacity: 0.45,
  cursor: "not-allowed",
});

export const runtimeCheckbox = style({
  accentColor: vars.color.accent.primary,
  width: vars.icon.sm,
  height: vars.icon.sm,
  margin: 0,
});

export const runtimeHint = style({
  // audit-allow: px — 10.5px between kbd(10) and caption(11), below token granularity
  fontSize: "10.5px",
  color: vars.color.text.secondary,
  // audit-allow: px — -4px negative margin-top for visual tightening, no token domain
  marginTop: "-4px",
  lineHeight: 1.4,
});

export const runtimeReset = style({
  appearance: "none",
  background: "transparent",
  color: vars.color.text.secondary,
  border: "none",
  cursor: "pointer",
  // audit-allow: px — 10.5px between kbd(10) and caption(11), below token granularity
  fontSize: "10.5px",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  // audit-allow: px — 3px×6px reset button hit padding, fixed UX target not density-scaled
  padding: "3px 6px",
  // audit-allow: px — 5px radius between control(6) and no lower token; 1px silent shift acceptable
  borderRadius: "5px",
  transition: `color ${vars.motion.durationFast} ease, background ${vars.motion.durationFast} ease`,
  ":hover": {
    color: vars.color.accent.primary,
    background: "rgba(186,158,255,0.08)",
  },
});
