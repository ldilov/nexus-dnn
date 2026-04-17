import { style, keyframes, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const NEON_CYAN = "#22D3EE";
const NEON_PINK = "#F472B6";
const NEON_MAGENTA = "#E879F9";

const pulseGlow = keyframes({
  "0%, 100%": { boxShadow: `0 0 0 0 ${vars.color.accent.primary}44` },
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
  width: "28px",
  height: "28px",
  borderRadius: vars.radius.full,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.bold,
  flexShrink: 0,
  border: `2px solid ${vars.color.outline.variant}`,
  backgroundColor: "transparent",
  color: vars.color.text.muted,
  transition: `all ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
});

export const stepCircleCompleted = style({
  backgroundColor: vars.color.success.base,
  borderColor: vars.color.success.base,
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
  width: "24px",
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
  backdropFilter: "blur(4px)",
});

export const modalContent = style({
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
  width: "28px",
  height: "28px",
  border: "none",
  borderRadius: vars.radius.control,
  backgroundColor: "transparent",
  color: vars.color.text.muted,
  cursor: "pointer",
  fontSize: "20px",
  ":hover": { color: vars.color.text.primary },
});

export const modalBody = style({
  display: "flex",
  flex: 1,
  overflow: "hidden",
  minHeight: "300px",
});

export const modalPhaseList = style({
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
  width: "6px",
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
  padding: `1px ${vars.space.insetSm}`,
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  backgroundColor: `${vars.color.accent.secondary}1a`,
  color: vars.color.accent.secondary,
});

export const summarySeparator = style({
  width: "1px",
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
  width: "28px",
  height: "28px",
  border: "none",
  borderRadius: vars.radius.control,
  backgroundColor: "transparent",
  color: vars.color.text.muted,
  cursor: "pointer",
  fontSize: "16px",
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
  width: "24px",
  height: "24px",
  borderRadius: vars.radius.control,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
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
      top: "340px",
      right: "-140px",
      width: "360px",
      height: "360px",
      background: `radial-gradient(circle, ${NEON_MAGENTA}08 0%, transparent 70%)`,
      pointerEvents: "none",
      zIndex: 0,
    },
    "&::after": {
      content: "''",
      position: "absolute",
      top: "420px",
      left: "-140px",
      width: "320px",
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
  gap: "8px",
  fontFamily: vars.font.code,
  fontSize: "10px",
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: NEON_CYAN,
});

export const backendSelectorEyebrowDot = style({
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
  backgroundColor: NEON_CYAN,
  boxShadow: `0 0 10px ${NEON_CYAN}`,
  animation: `${pulseDot} 1.8s ease-in-out infinite`,
});

export const backendSelectorTitle = style({
  fontFamily: vars.font.headline,
  fontSize: "36px",
  fontWeight: 800,
  letterSpacing: "-0.035em",
  lineHeight: 1.05,
  color: vars.color.text.primary,
});

export const backendSelectorDescription = style({
  fontFamily: vars.font.ui,
  fontSize: "14px",
  color: vars.color.text.secondary,
  lineHeight: 1.65,
  maxWidth: "720px",
});

export const backendGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
  gap: vars.space.gapLg,
  position: "relative",
  zIndex: 1,
});

export const backendCard = style({
  position: "relative",
  background: `linear-gradient(155deg, ${vars.color.bg.panel} 0%, ${vars.color.bg.elevated} 100%)`,
  border: `1px solid rgba(186, 158, 255, 0.10)`,
  borderRadius: "18px",
  padding: "22px",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  overflow: "hidden",
  transition: `transform ${vars.motion.durationNormal} ${vars.motion.easingDefault}, border-color ${vars.motion.durationNormal} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      inset: 0,
      borderRadius: "18px",
      padding: "1px",
      background: `linear-gradient(140deg, ${vars.color.accent.primary}55, transparent 40%, ${NEON_CYAN}33 100%)`,
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
      width: "300px",
      height: "300px",
      background: `radial-gradient(circle, ${vars.color.accent.primary}22 0%, transparent 65%)`,
      pointerEvents: "none",
      opacity: 0.9,
    },
    "&:hover": {
      transform: "translateY(-2px)",
      borderColor: `${vars.color.accent.primary}44`,
      boxShadow: `0 18px 42px rgba(0,0,0,0.45), 0 0 0 1px ${vars.color.accent.primary}1f, 0 0 30px ${vars.color.accent.primary}22`,
    },
  },
});

export const backendCardActive = style({
  borderColor: `${NEON_CYAN}55`,
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
  gap: "12px",
});

export const backendIconBox = style({
  position: "relative",
  width: "52px",
  height: "52px",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  flexShrink: 0,
  selectors: {
    "&::after": {
      content: "''",
      position: "absolute",
      inset: "-6px",
      borderRadius: "18px",
      border: "1px dashed rgba(255,255,255,0.08)",
      pointerEvents: "none",
    },
  },
});

export const backendIconBoxPrimary = style({
  background: `linear-gradient(135deg, ${vars.color.accent.primary}33 0%, ${NEON_CYAN}26 100%)`,
  border: `1px solid ${vars.color.accent.primary}3a`,
  color: "#ffffff",
  boxShadow: `0 0 24px ${vars.color.accent.primary}2a, inset 0 1px 0 rgba(255,255,255,0.08)`,
});

export const backendIconBoxSecondary = style({
  background: `linear-gradient(135deg, ${vars.color.accent.secondary}33 0%, ${NEON_PINK}26 100%)`,
  border: `1px solid ${vars.color.accent.secondary}3a`,
  color: "#ffffff",
  boxShadow: `0 0 20px ${vars.color.accent.secondary}22, inset 0 1px 0 rgba(255,255,255,0.08)`,
});

export const backendIconBoxCyan = style({
  background: `linear-gradient(135deg, ${NEON_CYAN}33 0%, ${vars.color.accent.primary}26 100%)`,
  border: `1px solid ${NEON_CYAN}3a`,
  color: "#ffffff",
  boxShadow: `0 0 24px ${NEON_CYAN}2a, inset 0 1px 0 rgba(255,255,255,0.08)`,
});

export const backendIconBoxPink = style({
  background: `linear-gradient(135deg, ${NEON_PINK}33 0%, ${vars.color.accent.tertiary}33 100%)`,
  border: `1px solid ${NEON_PINK}3a`,
  color: "#ffffff",
  boxShadow: `0 0 22px ${NEON_PINK}26, inset 0 1px 0 rgba(255,255,255,0.08)`,
});

export const backendStatusBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontFamily: vars.font.code,
  fontSize: "10px",
  fontWeight: vars.font.weight.bold,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  padding: `4px 10px`,
  borderRadius: vars.radius.full,
  backgroundColor: "rgba(12, 14, 16, 0.6)",
  border: "1px solid rgba(255,255,255,0.06)",
  backdropFilter: "blur(8px)",
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
  width: "7px",
  height: "7px",
  borderRadius: vars.radius.full,
  flexShrink: 0,
});

export const backendStatusDotRunning = style({
  backgroundColor: vars.color.success.base,
  boxShadow: `0 0 10px ${vars.color.success.base}, 0 0 4px ${vars.color.success.base}`,
  animation: `${pulseDot} 1.6s ease-in-out infinite`,
});

export const backendStatusDotInstalled = style({
  backgroundColor: NEON_CYAN,
  boxShadow: `0 0 8px ${NEON_CYAN}`,
});

export const backendStatusDotAvailable = style({
  backgroundColor: vars.color.text.muted,
});

export const backendStatusDotUnavailable = style({
  backgroundColor: vars.color.error.base,
  boxShadow: `0 0 8px ${vars.color.error.base}66`,
});

export const backendNameRow = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const backendName = style({
  fontFamily: vars.font.headline,
  fontSize: "22px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: vars.color.text.primary,
});

export const backendVersionChip = style({
  display: "inline-flex",
  alignSelf: "flex-start",
  alignItems: "center",
  gap: "4px",
  fontFamily: vars.font.code,
  fontSize: "11px",
  fontWeight: 600,
  padding: `3px 10px`,
  borderRadius: vars.radius.full,
  background: `linear-gradient(90deg, ${vars.color.accent.primary}22, ${NEON_CYAN}22)`,
  border: `1px solid ${vars.color.accent.primary}33`,
  color: vars.color.accent.primary,
  letterSpacing: "0.04em",
});

export const backendDescription = style({
  fontFamily: vars.font.ui,
  fontSize: "13px",
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
  padding: "12px 16px",
  borderRadius: "12px",
  background: `linear-gradient(100deg, ${vars.color.accent.primary} 0%, ${NEON_PINK} 55%, ${NEON_CYAN} 110%)`,
  backgroundSize: "200% 100%",
  backgroundPosition: "0% 50%",
  color: "#14061f",
  fontFamily: vars.font.headline,
  fontWeight: 700,
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  boxShadow: `0 6px 18px ${vars.color.accent.primary}33, inset 0 1px 0 rgba(255,255,255,0.35)`,
  transition: `background-position ${vars.motion.durationSlow} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    backgroundPosition: "100% 50%",
    boxShadow: `0 10px 28px ${NEON_PINK}44, 0 0 0 1px ${NEON_CYAN}44`,
    transform: "translateY(-1px)",
  },
  ":active": {
    transform: "translateY(0)",
  },
});

export const backendDeactivateButton = style({
  fontFamily: vars.font.headline,
  fontSize: "12px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: vars.color.text.secondary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  cursor: "pointer",
  background: `linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))`,
  border: `1px solid ${NEON_PINK}33`,
  borderRadius: "12px",
  padding: "12px",
  width: "100%",
  transition: `all ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    borderColor: `${NEON_PINK}80`,
    color: NEON_PINK,
    boxShadow: `0 0 22px ${NEON_PINK}22`,
  },
});

export const backendOptimizedLabel = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  fontFamily: vars.font.code,
  fontSize: "10px",
  fontWeight: 600,
  color: NEON_CYAN,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  textAlign: "center",
  padding: "6px 10px",
  borderRadius: vars.radius.full,
  backgroundColor: `${NEON_CYAN}0f`,
  border: `1px solid ${NEON_CYAN}22`,
});

export const backendInstallingButton = style({
  position: "relative",
  width: "100%",
  padding: "12px 16px",
  borderRadius: "12px",
  background: `linear-gradient(90deg, ${vars.color.bg.elevated} 0%, ${vars.color.accent.primary}22 50%, ${vars.color.bg.elevated} 100%)`,
  backgroundSize: "200% 100%",
  color: vars.color.text.primary,
  fontFamily: vars.font.headline,
  fontWeight: 700,
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  border: `1px solid ${vars.color.accent.primary}33`,
  cursor: "wait",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  animation: `${shimmer} 2.2s linear infinite`,
});

export const backendLogPanel = style({
  marginTop: "12px",
  borderRadius: "14px",
  border: `1px solid rgba(34, 211, 238, 0.15)`,
  background: `linear-gradient(180deg, rgba(12,14,16,0.92), rgba(12,14,16,0.76))`,
  overflow: "hidden",
  boxShadow: `inset 0 0 30px rgba(34, 211, 238, 0.04), 0 8px 24px rgba(0,0,0,0.4)`,
});

export const backendLogHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 14px",
  fontFamily: vars.font.code,
  fontSize: "10px",
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
  gap: "6px",
  color: NEON_PINK,
  fontWeight: 700,
  letterSpacing: "0.2em",
  selectors: {
    "&::before": {
      content: "''",
      width: "6px",
      height: "6px",
      borderRadius: vars.radius.full,
      backgroundColor: NEON_PINK,
      boxShadow: `0 0 8px ${NEON_PINK}`,
      animation: `${pulseDot} 1.4s ease-in-out infinite`,
    },
  },
});

export const backendLogBody = style({
  maxHeight: "220px",
  overflowY: "auto",
  padding: "10px 14px",
  scrollbarWidth: "thin",
  scrollbarColor: `${NEON_CYAN}55 transparent`,
});

export const backendLogLine = style({
  fontFamily: vars.font.code,
  fontSize: "11px",
  lineHeight: 1.7,
  color: vars.color.text.secondary,
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
});

globalStyle(`${backendLogBody}::-webkit-scrollbar`, { width: "6px" });
globalStyle(`${backendLogBody}::-webkit-scrollbar-thumb`, {
  background: `linear-gradient(180deg, ${NEON_CYAN}77, ${vars.color.accent.primary}77)`,
  borderRadius: "999px",
});
globalStyle(`${backendLogBody}::-webkit-scrollbar-track`, { background: "transparent" });

export const backendAccelSelect = style({
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  background: `linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))`,
  backgroundColor: vars.color.bg.panel,
  color: vars.color.text.primary,
  fontFamily: vars.font.code,
  fontSize: "12px",
  fontWeight: 600,
  border: `1px solid rgba(186, 158, 255, 0.18)`,
  outline: "none",
  cursor: "pointer",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%2322D3EE' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
  paddingRight: "34px",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    borderColor: `${NEON_CYAN}55`,
  },
  ":focus": {
    borderColor: NEON_CYAN,
    boxShadow: `0 0 0 3px ${NEON_CYAN}22`,
  },
});

export const backendCardTag = style({
  position: "absolute",
  top: "18px",
  right: "18px",
  zIndex: 2,
});

export const backendHeadlineRow = style({
  display: "flex",
  alignItems: "center",
  gap: "14px",
});

export const backendFamilyLabel = style({
  fontFamily: vars.font.code,
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});
