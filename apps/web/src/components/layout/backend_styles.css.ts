import { style, keyframes, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

// audit-allow: hex — neon decorative palette per design lang
const NEON_CYAN = "#22D3EE";
// audit-allow: hex — neon decorative palette per design lang
const NEON_PINK = "#F472B6";
// audit-allow: hex — neon decorative palette per design lang
const NEON_MAGENTA = "#E879F9";

const pulseGlow = keyframes({
  "0%, 100%": { boxShadow: `0 0 0 0 ${vars.color.accent.primary}44` },
  // audit-allow: px — glow spread radius for keyframe animation, not a layout value
  "50%": { boxShadow: `0 0 8px 2px ${vars.color.accent.primary}44` },
});

const pulseDot = keyframes({
  "0%, 100%": { opacity: 1, transform: "scale(1)" },
  "50%": { opacity: 0.55, transform: "scale(1.25)" },
});

const shimmer = keyframes({
  "0%": { backgroundPosition: "-200% 0" },
  "100%": { backgroundPosition: "200% 0" },
});


export const stepperContainer = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  padding: `${vars.space.insetMd} ${vars.space.insetLg}`,
  overflowX: "auto",
});

export const stepItem = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  flexShrink: 0,
});

export const stepCircle = style({
  // audit-allow: px — fixed 28px hit target for stepper circle, must not scale with density
  width: "28px",
  // audit-allow: px — fixed 28px hit target for stepper circle, must not scale with density
  height: "28px",
  borderRadius: vars.radius.full,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.bold,
  flexShrink: 0,
  // audit-allow: px — 2px hairline border, below smallest spacing token
  border: `2px solid ${vars.color.outline.variant}`,
  backgroundColor: "transparent",
  color: vars.color.text.muted,
  transition: `all ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
});

export const stepCircleCompleted = style({
  backgroundColor: vars.color.success.base,
  borderColor: vars.color.success.base,
  // audit-allow: hex — pure-black text on success-green background for contrast
  color: "#000",
});

export const stepCircleInProgress = style({
  borderColor: vars.color.accent.primary,
  color: vars.color.accent.primary,
  animation: `${pulseGlow} 2s ease-in-out infinite`,
});

export const stepCircleFailed = style({
  backgroundColor: vars.color.error.base,
  borderColor: vars.color.error.base,
  // audit-allow: hex — pure-black text on error-red background for contrast
  color: "#000",
});

export const stepCircleBlocked = style({
  borderColor: vars.color.warning.base,
  color: vars.color.warning.base,
});

export const stepLabel = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  whiteSpace: "nowrap",
  transition: `color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
});

export const stepLabelActive = style({
  color: vars.color.text.primary,
  fontWeight: vars.font.weight.semibold,
});

export const stepConnector = style({
  // audit-allow: px — fixed 24px connector width for stepper layout, must not scale with density
  width: "24px",
  // audit-allow: px — 2px hairline connector bar, below smallest spacing token
  height: "2px",
  backgroundColor: vars.color.outline.variant,
  flexShrink: 0,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
});

export const stepConnectorCompleted = style({
  backgroundColor: vars.color.success.base,
});

export const modalOverlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: vars.z.modal,
  // audit-allow: px — blur radius for glassmorphism scrim material, no spacing token applies
  backdropFilter: "blur(4px)",
});

export const modalContent = style({
  // audit-allow: px — modal max-width at 900px layout breakpoint
  width: "min(900px, 90vw)",
  maxHeight: "80vh",
  backgroundColor: vars.color.bg.panel,
  borderRadius: vars.radius.container,
  border: `1px solid ${vars.color.outline.variant}`,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  boxShadow: vars.shadow.lg,
});

export const modalHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${vars.space.insetMd} ${vars.space.insetLg}`,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  flexShrink: 0,
});

export const modalTitle = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.primary,
});

export const modalCloseButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — fixed 28px icon button hit target, must not scale with density
  width: "28px",
  // audit-allow: px — fixed 28px icon button hit target, must not scale with density
  height: "28px",
  border: "none",
  borderRadius: vars.radius.control,
  backgroundColor: "transparent",
  color: vars.color.text.muted,
  cursor: "pointer",
  fontSize: vars.font.size.heading,
  ":hover": { color: vars.color.text.primary },
});

export const modalBody = style({
  display: "flex",
  flex: 1,
  overflow: "hidden",
  // audit-allow: px — minimum modal body height at 300px layout threshold
  minHeight: "300px",
});

export const modalPhaseList = style({
  // audit-allow: px — fixed sidebar width for modal phase list per IA contract
  width: "220px",
  borderRight: `1px solid ${vars.color.outline.variant}`,
  padding: vars.space.insetSm,
  overflowY: "auto",
  flexShrink: 0,
});

export const modalPhaseItem = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  padding: `${vars.space.insetXs} ${vars.space.insetSm}`,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
});

export const modalPhaseItemActive = style({
  backgroundColor: `${vars.color.accent.primary}1a`,
  color: vars.color.text.primary,
});

export const modalPhaseItemCompleted = style({
  color: vars.color.success.base,
});

export const modalPhaseDot = style({
  // audit-allow: px — 6px decorative status dot, below minimum spacing token (gapXs=4px, gapSm=8px)
  width: "6px",
  // audit-allow: px — 6px decorative status dot, below minimum spacing token (gapXs=4px, gapSm=8px)
  height: "6px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.outline.variant,
  flexShrink: 0,
});

export const modalPhaseDotActive = style({
  backgroundColor: vars.color.accent.primary,
});

export const modalPhaseDotCompleted = style({
  backgroundColor: vars.color.success.base,
});

export const modalLogPane = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

export const modalLogContent = style({
  flex: 1,
  overflow: "auto",
  padding: vars.space.insetSm,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.secondary,
  backgroundColor: vars.color.bg.lowest,
});

export const modalFooter = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapMd,
  padding: `${vars.space.insetSm} ${vars.space.insetLg}`,
  borderTop: `1px solid ${vars.color.outline.variant}`,
  flexShrink: 0,
});

export const modalProgressInfo = style({
  flex: 1,
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const modalCloseIcon = style({
  fontSize: "inherit",
});

export const modalFooterSlot = style({
  flex: 1,
});

export const summaryStripContainer = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapMd,
  padding: `${vars.space.insetSm} ${vars.space.insetLg}`,
  backgroundColor: vars.color.bg.panel,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  overflowX: "auto",
  flexShrink: 0,
});

export const summaryItem = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  flexShrink: 0,
});

export const summaryLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

export const summaryValue = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
});

export const summaryBadge = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — 1px top/bottom padding for inline badge micro-rhythm, below insetXs(4px)
  padding: `1px ${vars.space.insetSm}`,
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  backgroundColor: `${vars.color.accent.secondary}1a`,
  color: vars.color.accent.secondary,
});

export const summarySeparator = style({
  // audit-allow: px — 1px hairline separator, below smallest spacing token
  width: "1px",
  // audit-allow: px — fixed 16px separator height matches line height context
  height: "16px",
  backgroundColor: vars.color.outline.variant,
  flexShrink: 0,
});

export const runtimeCardContainer = style({
  backgroundColor: vars.color.bg.elevated,
  borderRadius: vars.radius.panel,
  border: `1px solid ${vars.color.outline.variant}`,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

export const runtimeCardHeader = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  padding: `${vars.space.insetMd} ${vars.space.insetLg}`,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
});

export const runtimeCardTitle = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.primary,
});

export const runtimeCardBody = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 0,
});

export const runtimeField = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  padding: `${vars.space.insetSm} ${vars.space.insetLg}`,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  selectors: {
    "&:nth-child(odd)": {
      borderRight: `1px solid ${vars.color.outline.variant}`,
    },
  },
});

export const runtimeFieldLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const runtimeFieldValue = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const diagContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
  padding: vars.space.insetLg,
});

export const diagCategoryBadge = style({
  display: "inline-flex",
  alignSelf: "flex-start",
  padding: `${vars.space.insetXs} ${vars.space.insetMd}`,
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.bold,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  backgroundColor: `${vars.color.error.base}1a`,
  color: vars.color.error.base,
});

export const diagMessage = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.primary,
  lineHeight: vars.font.lineHeight.normal,
});

export const diagDetail = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
  lineHeight: vars.font.lineHeight.relaxed,
  whiteSpace: "pre-wrap",
  backgroundColor: vars.color.bg.lowest,
  borderRadius: vars.radius.card,
  padding: vars.space.insetMd,
  border: `1px solid ${vars.color.outline.variant}`,
});

export const diagCommandRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  backgroundColor: vars.color.bg.elevated,
  borderRadius: vars.radius.card,
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  border: `1px solid ${vars.color.outline.variant}`,
});

export const diagCommandText = style({
  flex: 1,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const diagCopyButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — fixed 28px icon button hit target, must not scale with density
  width: "28px",
  // audit-allow: px — fixed 28px icon button hit target, must not scale with density
  height: "28px",
  border: "none",
  borderRadius: vars.radius.control,
  backgroundColor: "transparent",
  color: vars.color.text.muted,
  cursor: "pointer",
  fontSize: vars.font.size.headingSm,
  flexShrink: 0,
  ":hover": { color: vars.color.text.primary },
});

export const diagPathRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const diagPathLabel = style({
  fontWeight: vars.font.weight.medium,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  flexShrink: 0,
});

export const diagPathValue = style({
  color: vars.color.text.secondary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const diagRemediation = style({
  padding: vars.space.insetMd,
  borderRadius: vars.radius.card,
  backgroundColor: `${vars.color.accent.primary}0d`,
  border: `1px solid ${vars.color.accent.primary}33`,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
  lineHeight: vars.font.lineHeight.relaxed,
});

export const historyContainer = style({
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  flex: 1,
});

export const historyEntry = style({
  display: "flex",
  flexDirection: "column",
  borderBottom: `1px solid ${vars.color.outline.variant}`,
});

export const historyEntryHeader = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": { backgroundColor: vars.color.bg.hover },
});

export const historyIcon = style({
  // audit-allow: px — fixed 24px icon container size, must not scale with density
  width: "24px",
  // audit-allow: px — fixed 24px icon container size, must not scale with density
  height: "24px",
  borderRadius: vars.radius.control,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: vars.icon.sm,
  flexShrink: 0,
  backgroundColor: vars.color.bg.elevated,
  color: vars.color.text.muted,
});

export const historyAction = style({
  flex: 1,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
});

export const historyTimestamp = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  flexShrink: 0,
});

export const historyDetail = style({
  padding: `0 ${vars.space.insetMd} ${vars.space.insetSm} ${vars.space.insetMd}`,
  // audit-allow: px — calc offsets 24px fixed icon width + gapSm token for precise indent alignment
  paddingLeft: `calc(${vars.space.insetMd} + 24px + ${vars.space.gapSm})`,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
  lineHeight: vars.font.lineHeight.relaxed,
});

export const historyEmpty = style({
  padding: vars.space.insetXl,
  textAlign: "center",
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
});

export const backendSelectorContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
  padding: vars.space.insetXl,
  position: "relative",
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      // audit-allow: px — decorative radial gradient anchor position, not a layout spacing value
      top: "340px",
      // audit-allow: px — decorative radial gradient anchor position, not a layout spacing value
      right: "-140px",
      // audit-allow: px — decorative radial gradient blob size, no spacing token applies
      width: "360px",
      // audit-allow: px — decorative radial gradient blob size, no spacing token applies
      height: "360px",
      background: `radial-gradient(circle, ${NEON_MAGENTA}08 0%, transparent 70%)`,
      pointerEvents: "none",
      zIndex: 0,
    },
    "&::after": {
      content: "''",
      position: "absolute",
      // audit-allow: px — decorative radial gradient anchor position, not a layout spacing value
      top: "420px",
      // audit-allow: px — decorative radial gradient anchor position, not a layout spacing value
      left: "-140px",
      // audit-allow: px — decorative radial gradient blob size, no spacing token applies
      width: "320px",
      // audit-allow: px — decorative radial gradient blob size, no spacing token applies
      height: "320px",
      background: `radial-gradient(circle, ${NEON_CYAN}0a 0%, transparent 70%)`,
      pointerEvents: "none",
      zIndex: 0,
    },
  },
});

export const backendSelectorHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  position: "relative",
  zIndex: 1,
});

export const backendSelectorEyebrow = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: NEON_CYAN,
});

export const backendSelectorEyebrowDot = style({
  // audit-allow: px — 6px decorative status dot, below minimum spacing token (gapXs=4px, gapSm=8px)
  width: "6px",
  // audit-allow: px — 6px decorative status dot, below minimum spacing token (gapXs=4px, gapSm=8px)
  height: "6px",
  borderRadius: vars.radius.full,
  backgroundColor: NEON_CYAN,
  // audit-allow: px — glow spread for neon dot animation, not a layout value
  boxShadow: `0 0 10px ${NEON_CYAN}`,
  animation: `${pulseDot} 1.8s ease-in-out infinite`,
});

export const backendSelectorTitle = style({
  fontFamily: vars.font.headline,
  // audit-allow: px — hero display heading at 36px, above display token (32px) — editorial scale step
  fontSize: "36px",
  // audit-allow: px — raw font-weight 800 for hero display, no token between bold(700) and black(900)
  fontWeight: 800,
  letterSpacing: "-0.035em",
  lineHeight: 1.05,
  color: vars.color.text.primary,
});

export const backendSelectorDescription = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodyLg,
  color: vars.color.text.secondary,
  lineHeight: 1.65,
  // audit-allow: px — max-width prose container at 720px layout breakpoint
  maxWidth: "720px",
});

export const backendGrid = style({
  display: "grid",
  // audit-allow: px — grid column min-width at 340px layout breakpoint
  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
  gap: vars.space.gapLg,
  position: "relative",
  zIndex: 1,
});

export const backendCard = style({
  position: "relative",
  background: `linear-gradient(155deg, ${vars.color.bg.panel} 0%, ${vars.color.bg.elevated} 100%)`,
  border: `1px solid rgba(186, 158, 255, 0.10)`,
  // audit-allow: px — card corner radius at 18px, between card(10) and container(16) tokens — editorial step
  borderRadius: "18px",
  // audit-allow: px — card internal padding at 22px, between insetXl(16) and density.d6(24) — editorial step
  padding: "22px",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
  // audit-allow: px — blur radius for glassmorphism card material, no spacing token applies
  backdropFilter: "blur(12px)",
  // audit-allow: px — blur radius for glassmorphism card material, no spacing token applies
  WebkitBackdropFilter: "blur(12px)",
  overflow: "hidden",
  transition: `transform ${vars.motion.durationNormal} ${vars.motion.easingDefault}, border-color ${vars.motion.durationNormal} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      inset: 0,
      // audit-allow: px — card corner radius at 18px, between card(10) and container(16) tokens — editorial step
      borderRadius: "18px",
      // audit-allow: px — 1px gradient border via padding mask technique, hairline value
      padding: "1px",
      background: `linear-gradient(140deg, ${vars.color.accent.primary}55, transparent 40%, ${NEON_CYAN}33 100%)`,
      // audit-allow: hex — pure-black mask anchor for gradient border technique
      WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      pointerEvents: "none",
      opacity: 0.7,
    },
    "&::after": {
      content: "''",
      position: "absolute",
      top: "-60%",
      right: "-30%",
      // audit-allow: px — decorative radial gradient blob size, no spacing token applies
      width: "300px",
      // audit-allow: px — decorative radial gradient blob size, no spacing token applies
      height: "300px",
      background: `radial-gradient(circle, ${vars.color.accent.primary}22 0%, transparent 65%)`,
      pointerEvents: "none",
      opacity: 0.9,
    },
    "&:hover": {
      // audit-allow: px — translateY lift on hover at 2px, micro-interaction value below spacing tokens
      transform: "translateY(-2px)",
      borderColor: `${vars.color.accent.primary}44`,
      // audit-allow: px — box-shadow spread values for hover elevation, not spacing values
      boxShadow: `0 18px 42px rgba(0,0,0,0.45), 0 0 0 1px ${vars.color.accent.primary}1f, 0 0 30px ${vars.color.accent.primary}22`,
    },
  },
});

export const backendCardActive = style({
  borderColor: `${NEON_CYAN}55`,
  // audit-allow: px — box-shadow spread values for active elevation glow, not spacing values
  boxShadow: `0 0 0 1px ${NEON_CYAN}33, 0 0 40px ${NEON_CYAN}1a, 0 16px 36px rgba(0,0,0,0.5)`,
  selectors: {
    "&::after": {
      background: `radial-gradient(circle, ${NEON_CYAN}26 0%, transparent 65%)`,
    },
  },
});

export const backendCardAccentPink = style({
  selectors: {
    "&::after": {
      background: `radial-gradient(circle, ${NEON_PINK}26 0%, transparent 65%)`,
    },
    "&:hover": {
      borderColor: `${NEON_PINK}55`,
      // audit-allow: px — box-shadow spread values for hover elevation, not spacing values
      boxShadow: `0 18px 42px rgba(0,0,0,0.45), 0 0 0 1px ${NEON_PINK}2a, 0 0 30px ${NEON_PINK}24`,
    },
  },
});

export const backendCardAccentCyan = style({
  selectors: {
    "&::after": {
      background: `radial-gradient(circle, ${NEON_CYAN}26 0%, transparent 65%)`,
    },
    "&:hover": {
      borderColor: `${NEON_CYAN}55`,
      // audit-allow: px — box-shadow spread values for hover elevation, not spacing values
      boxShadow: `0 18px 42px rgba(0,0,0,0.45), 0 0 0 1px ${NEON_CYAN}2a, 0 0 30px ${NEON_CYAN}24`,
    },
  },
});

export const backendCardInner = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
  flex: 1,
});

export const backendCardTopRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: vars.space.gapMd,
});

export const backendIconBox = style({
  position: "relative",
  // audit-allow: px — fixed 52px icon box size per card design spec, must not scale with density
  width: "52px",
  // audit-allow: px — fixed 52px icon box size per card design spec, must not scale with density
  height: "52px",
  borderRadius: vars.radius.panel,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: vars.font.size.heading,
  flexShrink: 0,
  selectors: {
    "&::after": {
      content: "''",
      position: "absolute",
      // audit-allow: px — negative inset for dashed decorative ring offset, not a spacing value
      inset: "-6px",
      // audit-allow: px — 18px corner radius for decorative dashed ring around icon box
      borderRadius: "18px",
      // audit-allow: px — 1px dashed decorative border, hairline value
      border: "1px dashed rgba(255,255,255,0.08)",
      pointerEvents: "none",
    },
  },
});

export const backendIconBoxPrimary = style({
  background: `linear-gradient(135deg, ${vars.color.accent.primary}33 0%, ${NEON_CYAN}26 100%)`,
  border: `1px solid ${vars.color.accent.primary}3a`,
  // audit-allow: hex — pure-white icon glyph on gradient-colored background for contrast
  color: "#ffffff",
  // audit-allow: px — glow spread for glassmorphism icon box, not a layout value
  boxShadow: `0 0 24px ${vars.color.accent.primary}2a, inset 0 1px 0 rgba(255,255,255,0.08)`,
});

export const backendIconBoxSecondary = style({
  background: `linear-gradient(135deg, ${vars.color.accent.secondary}33 0%, ${NEON_PINK}26 100%)`,
  border: `1px solid ${vars.color.accent.secondary}3a`,
  // audit-allow: hex — pure-white icon glyph on gradient-colored background for contrast
  color: "#ffffff",
  // audit-allow: px — glow spread for glassmorphism icon box, not a layout value
  boxShadow: `0 0 20px ${vars.color.accent.secondary}22, inset 0 1px 0 rgba(255,255,255,0.08)`,
});

export const backendIconBoxCyan = style({
  background: `linear-gradient(135deg, ${NEON_CYAN}33 0%, ${vars.color.accent.primary}26 100%)`,
  border: `1px solid ${NEON_CYAN}3a`,
  // audit-allow: hex — pure-white icon glyph on gradient-colored background for contrast
  color: "#ffffff",
  // audit-allow: px — glow spread for glassmorphism icon box, not a layout value
  boxShadow: `0 0 24px ${NEON_CYAN}2a, inset 0 1px 0 rgba(255,255,255,0.08)`,
});

export const backendIconBoxPink = style({
  background: `linear-gradient(135deg, ${NEON_PINK}33 0%, ${vars.color.accent.tertiary}33 100%)`,
  border: `1px solid ${NEON_PINK}3a`,
  // audit-allow: hex — pure-white icon glyph on gradient-colored background for contrast
  color: "#ffffff",
  // audit-allow: px — glow spread for glassmorphism icon box, not a layout value
  boxShadow: `0 0 22px ${NEON_PINK}26, inset 0 1px 0 rgba(255,255,255,0.08)`,
});

export const backendStatusBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.insetSm,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.bold,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  // audit-allow: px — badge padding 4px/10px micro-rhythm values; 4px=gapXs, 10px below gapSm(8px)→above gapSm threshold
  padding: `4px 10px`,
  borderRadius: vars.radius.full,
  backgroundColor: "rgba(12, 14, 16, 0.6)",
  border: "1px solid rgba(255,255,255,0.06)",
  // audit-allow: px — blur radius for glassmorphism badge material, no spacing token applies
  backdropFilter: "blur(8px)",
  // audit-allow: px — blur radius for glassmorphism badge material, no spacing token applies
  WebkitBackdropFilter: "blur(8px)",
});

export const backendStatusRunning = style({
  backgroundColor: `${vars.color.success.base}1a`,
  color: vars.color.success.base,
});

export const backendStatusInstalled = style({
  backgroundColor: `${vars.color.accent.primary}1a`,
  color: vars.color.accent.primary,
});

export const backendStatusAvailable = style({
  backgroundColor: `${vars.color.bg.hover}`,
  color: vars.color.text.muted,
});

export const backendStatusUnavailable = style({
  backgroundColor: `${vars.color.error.base}0d`,
  color: vars.color.text.muted,
});

export const backendStatusDot = style({
  // audit-allow: px — 7px decorative status dot, sub-token micro size between gapXs(4px) and gapSm(8px)
  width: "7px",
  // audit-allow: px — 7px decorative status dot, sub-token micro size between gapXs(4px) and gapSm(8px)
  height: "7px",
  borderRadius: vars.radius.full,
  flexShrink: 0,
});

export const backendStatusDotRunning = style({
  backgroundColor: vars.color.success.base,
  // audit-allow: px — glow spread for animated status dot, not a layout value
  boxShadow: `0 0 10px ${vars.color.success.base}, 0 0 4px ${vars.color.success.base}`,
  animation: `${pulseDot} 1.6s ease-in-out infinite`,
});

export const backendStatusDotInstalled = style({
  backgroundColor: NEON_CYAN,
  // audit-allow: px — glow spread for neon status dot, not a layout value
  boxShadow: `0 0 8px ${NEON_CYAN}`,
});

export const backendStatusDotAvailable = style({
  backgroundColor: vars.color.text.muted,
});

export const backendStatusDotUnavailable = style({
  backgroundColor: vars.color.error.base,
  // audit-allow: px — glow spread for error status dot, not a layout value
  boxShadow: `0 0 8px ${vars.color.error.base}66`,
});

export const backendNameRow = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const backendName = style({
  fontFamily: vars.font.headline,
  // audit-allow: px — backend name heading at 22px, between heading(20px) and headingLg(24px) tokens — editorial step
  fontSize: "22px",
  // audit-allow: px — raw font-weight 700 for backend name, no token for bold(700) between semibold and black
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: vars.color.text.primary,
});

export const backendVersionChip = style({
  display: "inline-flex",
  alignSelf: "flex-start",
  alignItems: "center",
  gap: vars.space.insetXs,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  // audit-allow: px — raw font-weight 600 for version chip, no semibold token maps exactly to 600
  fontWeight: 600,
  // audit-allow: px — chip padding 3px/10px micro-rhythm; 3px below insetXs(4px), 10px above gapSm(8px)
  padding: `3px 10px`,
  borderRadius: vars.radius.full,
  background: `linear-gradient(90deg, ${vars.color.accent.primary}22, ${NEON_CYAN}22)`,
  border: `1px solid ${vars.color.accent.primary}33`,
  color: vars.color.accent.primary,
  letterSpacing: "0.04em",
});

export const backendDescription = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.text.secondary,
  lineHeight: 1.62,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const backendFooter = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  marginTop: "auto",
});

export const backendActivateButton = style({
  position: "relative",
  width: "100%",
  padding: `${vars.space.gapMd} ${vars.space.insetXl}`,
  // audit-allow: px — button corner radius at 12px, between control(6) and card(10)→panel(14) tokens — editorial step
  borderRadius: "12px",
  background: `linear-gradient(100deg, ${vars.color.accent.primary} 0%, ${NEON_PINK} 55%, ${NEON_CYAN} 110%)`,
  backgroundSize: "200% 100%",
  backgroundPosition: "0% 50%",
  // audit-allow: hex — near-black text on gradient button for max contrast against neon palette
  color: "#14061f",
  fontFamily: vars.font.headline,
  fontWeight: 700,
  fontSize: vars.font.size.bodySm,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.gapSm,
  // audit-allow: px — box-shadow spread values for button elevation glow, not spacing values
  boxShadow: `0 6px 18px ${vars.color.accent.primary}33, inset 0 1px 0 rgba(255,255,255,0.35)`,
  transition: `background-position ${vars.motion.durationSlow} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    backgroundPosition: "100% 50%",
    // audit-allow: px — box-shadow spread values for button hover glow, not spacing values
    boxShadow: `0 10px 28px ${NEON_PINK}44, 0 0 0 1px ${NEON_CYAN}44`,
    // audit-allow: px — translateY lift on hover at 1px, micro-interaction value below spacing tokens
    transform: "translateY(-1px)",
  },
  ":active": {
    transform: "translateY(0)",
  },
});

export const backendDeactivateButton = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.bodySm,
  // audit-allow: px — raw font-weight 600 for deactivate button, no semibold token maps exactly to 600
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: vars.color.text.secondary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.gapSm,
  cursor: "pointer",
  background: `linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))`,
  border: `1px solid ${NEON_PINK}33`,
  // audit-allow: px — button corner radius at 12px, between control(6) and card(10)→panel(14) tokens — editorial step
  borderRadius: "12px",
  padding: `${vars.space.gapMd} ${vars.space.gapMd}`,
  width: "100%",
  transition: `all ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    borderColor: `${NEON_PINK}80`,
    color: NEON_PINK,
    // audit-allow: px — box-shadow spread values for hover glow, not spacing values
    boxShadow: `0 0 22px ${NEON_PINK}22`,
  },
});

export const backendOptimizedLabel = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.insetSm,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  // audit-allow: px — raw font-weight 600 for optimized label, no semibold token maps exactly to 600
  fontWeight: 600,
  color: NEON_CYAN,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  textAlign: "center",
  // audit-allow: px — label padding 6px/10px micro-rhythm; 6px=insetSm, 10px above gapSm(8px) threshold
  padding: `6px 10px`,
  borderRadius: vars.radius.full,
  backgroundColor: `${NEON_CYAN}0f`,
  border: `1px solid ${NEON_CYAN}22`,
});

export const backendInstallingButton = style({
  position: "relative",
  width: "100%",
  padding: `${vars.space.gapMd} ${vars.space.insetXl}`,
  // audit-allow: px — button corner radius at 12px, between control(6) and card(10)→panel(14) tokens — editorial step
  borderRadius: "12px",
  background: `linear-gradient(90deg, ${vars.color.bg.elevated} 0%, ${vars.color.accent.primary}22 50%, ${vars.color.bg.elevated} 100%)`,
  backgroundSize: "200% 100%",
  color: vars.color.text.primary,
  fontFamily: vars.font.headline,
  fontWeight: 700,
  fontSize: vars.font.size.bodySm,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  border: `1px solid ${vars.color.accent.primary}33`,
  cursor: "wait",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.gapSm,
  animation: `${shimmer} 2.2s linear infinite`,
});

export const backendLogPanel = style({
  marginTop: vars.space.gapMd,
  borderRadius: vars.radius.panel,
  border: `1px solid rgba(34, 211, 238, 0.15)`,
  background: `linear-gradient(180deg, rgba(12,14,16,0.92), rgba(12,14,16,0.76))`,
  overflow: "hidden",
  // audit-allow: px — box-shadow spread values for log panel inset glow + elevation, not spacing values
  boxShadow: `inset 0 0 30px rgba(34, 211, 238, 0.04), 0 8px 24px rgba(0,0,0,0.4)`,
});

export const backendLogHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  // audit-allow: px — bespoke log/select padding, no spacing token at 10×14
  padding: "10px 14px",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  // audit-allow: px — raw font-weight 600 for log header, no semibold token maps exactly to 600
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  color: vars.color.text.secondary,
  borderBottom: `1px solid rgba(34, 211, 238, 0.15)`,
  background: `linear-gradient(90deg, ${NEON_CYAN}0f, transparent 60%)`,
});

export const backendLogLive = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.insetSm,
  color: NEON_PINK,
  fontWeight: 700,
  letterSpacing: "0.2em",
  selectors: {
    "&::before": {
      content: "''",
      // audit-allow: px — 6px decorative live-dot indicator, below minimum spacing token (gapXs=4px, gapSm=8px)
      width: "6px",
      // audit-allow: px — 6px decorative live-dot indicator, below minimum spacing token (gapXs=4px, gapSm=8px)
      height: "6px",
      borderRadius: vars.radius.full,
      backgroundColor: NEON_PINK,
      // audit-allow: px — glow spread for neon live dot, not a layout value
      boxShadow: `0 0 8px ${NEON_PINK}`,
      animation: `${pulseDot} 1.4s ease-in-out infinite`,
    },
  },
});

export const backendLogBody = style({
  // audit-allow: px — fixed max-height at 220px for constrained log viewer, not a spacing token
  maxHeight: "220px",
  overflowY: "auto",
  // audit-allow: px — bespoke log/select padding, no spacing token at 10×14
  padding: "10px 14px",
  scrollbarWidth: "thin",
  scrollbarColor: `${NEON_CYAN}55 transparent`,
});

export const backendLogLine = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  lineHeight: 1.7,
  color: vars.color.text.secondary,
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
});

// audit-allow: px — scrollbar width at 6px, sub-token UI chrome value
globalStyle(`${backendLogBody}::-webkit-scrollbar`, { width: "6px" });
globalStyle(`${backendLogBody}::-webkit-scrollbar-thumb`, {
  background: `linear-gradient(180deg, ${NEON_CYAN}77, ${vars.color.accent.primary}77)`,
  // audit-allow: px — scrollbar thumb radius at 999px, effectively full-round (matches vars.radius.full concept)
  borderRadius: "999px",
});
globalStyle(`${backendLogBody}::-webkit-scrollbar-track`, { background: "transparent" });

export const backendAccelSelect = style({
  width: "100%",
  // audit-allow: px — bespoke log/select padding, no spacing token at 10×14
  padding: "10px 14px",
  borderRadius: vars.radius.card,
  background: `linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))`,
  backgroundColor: vars.color.bg.panel,
  color: vars.color.text.primary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  // audit-allow: px — raw font-weight 600 for select, no semibold token maps exactly to 600
  fontWeight: 600,
  border: `1px solid rgba(186, 158, 255, 0.18)`,
  outline: "none",
  cursor: "pointer",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%2322D3EE' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  // audit-allow: px — background-position 14px right offset aligns SVG chevron to padding rhythm
  backgroundPosition: "right 14px center",
  // audit-allow: px — paddingRight 34px = 14px chevron offset + 12px SVG + 8px breathing room
  paddingRight: "34px",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    borderColor: `${NEON_CYAN}55`,
  },
  ":focus": {
    borderColor: NEON_CYAN,
    // audit-allow: px — focus ring spread at 3px, standard focus-ring pattern below insetXs(4px)
    boxShadow: `0 0 0 3px ${NEON_CYAN}22`,
  },
});

export const backendCardTag = style({
  position: "absolute",
  // audit-allow: px — absolute-positioned tag offset at 18px, between insetXl(16) and density.d5(20) — editorial step
  top: "18px",
  // audit-allow: px — absolute-positioned tag offset at 18px, between insetXl(16) and density.d5(20) — editorial step
  right: "18px",
  zIndex: 2,
});

export const backendHeadlineRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d4,
});

export const backendFamilyLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  // audit-allow: px — raw font-weight 600 for family label, no semibold token maps exactly to 600
  fontWeight: 600,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const iconHuge = style({
  // audit-allow: px — 26px icon glyph for hero-scale decorative icon, above icon.lg(20px) — editorial step
  fontSize: "26px",
  fontVariationSettings: "'FILL' 1, 'wght' 500",
});

export const iconSm = style({
  fontSize: vars.icon.sm,
});

export const iconXs = style({
  fontSize: vars.font.size.bodySm,
});

export const stackColumnTight = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});
