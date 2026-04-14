import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const pulseGlow = keyframes({
  "0%, 100%": { boxShadow: `0 0 0 0 ${vars.color.accent.primary}44` },
  "50%": { boxShadow: `0 0 8px 2px ${vars.color.accent.primary}44` },
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
  padding: vars.space.insetLg,
});

export const backendSelectorHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const backendSelectorTitle = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingLg,
  fontWeight: vars.font.weight.black,
  color: vars.color.text.primary,
  letterSpacing: "-0.02em",
});

export const backendSelectorDescription = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
  lineHeight: vars.font.lineHeight.relaxed,
  maxWidth: "640px",
});

export const backendGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: vars.space.gapLg,
});

export const backendCard = style({
  backgroundColor: vars.color.bg.panel,
  border: `1px solid rgba(70, 72, 74, 0.1)`,
  borderRadius: vars.radius.container,
  padding: vars.space.insetLg,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
  transition: `all ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
});

export const backendCardActive = style({
  borderColor: "rgba(186, 158, 255, 0.3)",
  boxShadow: "0 0 20px rgba(186, 158, 255, 0.05)",
});

export const backendCardTopRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

export const backendIconBox = style({
  width: "48px",
  height: "48px",
  borderRadius: vars.radius.card,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
});

export const backendIconBoxPrimary = style({
  backgroundColor: `${vars.color.accent.primary}1a`,
  color: vars.color.accent.primary,
});

export const backendIconBoxSecondary = style({
  backgroundColor: `${vars.color.accent.secondary}1a`,
  color: vars.color.accent.secondary,
});

export const backendStatusBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  fontFamily: vars.font.code,
  fontSize: "10px",
  fontWeight: vars.font.weight.bold,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  padding: `2px ${vars.space.insetSm}`,
  borderRadius: vars.radius.full,
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
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
});

export const backendStatusDotRunning = style({
  backgroundColor: vars.color.success.base,
});

export const backendStatusDotInstalled = style({
  backgroundColor: vars.color.accent.primary,
});

export const backendStatusDotAvailable = style({
  backgroundColor: vars.color.text.muted,
});

export const backendStatusDotUnavailable = style({
  backgroundColor: vars.color.outline.variant,
});

export const backendNameRow = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const backendName = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.primary,
});

export const backendVersionChip = style({
  display: "inline-flex",
  alignSelf: "flex-start",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  padding: `2px ${vars.space.insetSm}`,
  borderRadius: vars.radius.control,
  backgroundColor: `${vars.color.accent.primary}1a`,
  color: vars.color.accent.primary,
});

export const backendDescription = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
  lineHeight: vars.font.lineHeight.relaxed,
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
  width: "100%",
  padding: "10px",
  borderRadius: vars.radius.card,
  backgroundColor: vars.color.accent.primary,
  color: vars.color.onColor.primary,
  fontFamily: vars.font.ui,
  fontWeight: vars.font.weight.semibold,
  fontSize: vars.font.size.bodySm,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.gapSm,
  transition: `all ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    boxShadow: "0 4px 16px rgba(186, 158, 255, 0.3)",
  },
});

export const backendDeactivateButton = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: vars.color.text.secondary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.gapXs,
  cursor: "pointer",
  background: "none",
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.card,
  padding: "10px",
  width: "100%",
  transition: `all ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    borderColor: vars.color.text.secondary,
    color: vars.color.text.primary,
  },
});

export const backendOptimizedLabel = style({
  fontFamily: vars.font.code,
  fontSize: "10px",
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  textAlign: "center",
});

export const backendInstallingButton = style({
  width: "100%",
  padding: "10px 16px",
  borderRadius: "8px",
  background: vars.color.bg.elevated,
  color: vars.color.text.muted,
  fontFamily: vars.font.code,
  fontWeight: "600",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  border: `1px solid ${vars.color.outline.variant}`,
  cursor: "wait",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  opacity: 0.7,
});

export const backendLogPanel = style({
  marginTop: "8px",
  borderRadius: "12px",
  border: `1px solid ${vars.color.outline.variant}`,
  backgroundColor: vars.color.bg.lowest,
  overflow: "hidden",
});

export const backendLogHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 12px",
  fontFamily: vars.font.code,
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: vars.color.text.muted,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
});

export const backendLogLive = style({
  color: vars.color.accent.secondary,
  fontWeight: "600",
});

export const backendLogBody = style({
  maxHeight: "200px",
  overflowY: "auto",
  padding: "8px 12px",
});

export const backendLogLine = style({
  fontFamily: vars.font.code,
  fontSize: "11px",
  lineHeight: "1.6",
  color: vars.color.text.secondary,
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
});

export const backendAccelSelect = style({
  width: "100%",
  padding: "8px 12px",
  borderRadius: "8px",
  background: vars.color.bg.panel,
  color: vars.color.text.primary,
  fontFamily: vars.font.code,
  fontSize: "12px",
  border: `1px solid ${vars.color.outline.variant}`,
  outline: "none",
  cursor: "pointer",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23747578' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: "32px",
  ":focus": {
    borderColor: vars.color.accent.primary,
  },
});
