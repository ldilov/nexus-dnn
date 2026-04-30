import { style, globalStyle, keyframes } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const splitPanel = style({
  display: "flex",
  height: "100%",
  overflow: "hidden",
});

export const splitPanelVertical = style({
  flexDirection: "column",
});

export const splitPanelChild = style({
  overflowX: "hidden",
  overflowY: "auto",
  minWidth: 0,
  minHeight: 0,
});

export const stack = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  height: "100%",
  overflowY: "auto",
  overflowX: "hidden",
  minWidth: 0,
});

export const tabsContainer = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
});

export const tabsHeader = style({
  display: "flex",
  gap: vars.space.gapXs,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  padding: `0 ${vars.space.insetMd}`,
  flexShrink: 0,
});

export const tabsPanel = style({
  flex: 1,
  overflow: "auto",
});

export const cardLayout = style({
  backgroundColor: vars.color.bg.elevated,
  borderRadius: vars.radius.card,
  padding: vars.space.insetLg,
});

export const cardLayoutTitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  marginBottom: vars.space.gapMd,
});

export const chatPanel = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
  position: "relative",
});

export const chatPanelMaximized = style({
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  backgroundColor: vars.color.bg.app,
});

export const chatMessages = style({
  flex: 1,
  overflow: "auto",
  padding: vars.space.insetLg,
  paddingBottom: "140px",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
});

export const chatMessageRow = style({
  display: "flex",
  gap: vars.space.gapSm,
  maxWidth: "80%",
});

export const chatMessageRowUser = style({
  flexDirection: "row-reverse",
  alignSelf: "flex-end",
  alignItems: "flex-end",
  marginLeft: "auto",
});

export const chatMessageRowAssistant = style({
  flexDirection: "row",
  alignSelf: "flex-start",
});

export const chatMessageIconBox = style({
  width: "24px",
  height: "24px",
  borderRadius: vars.radius.full,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const chatMessageIconBoxAssistant = style({
  backgroundColor: vars.color.accent.primaryDim,
  color: vars.color.text.primary,
  fontSize: "14px",
});

export const chatMessageIconBoxUser = style({
  backgroundColor: vars.color.bg.hover,
  color: vars.color.text.secondary,
  fontSize: "14px",
});

export const chatMessageBody = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  minWidth: 0,
});

export const chatRoleBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
});

export const chatRoleBadgeAssistant = style({
  color: vars.color.accent.primary,
});

export const chatRoleBadgeUser = style({
  color: vars.color.text.secondary,
  textAlign: "right",
});

export const chatBubbleBase = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  lineHeight: vars.font.lineHeight.normal,
  color: vars.color.text.primary,
  wordBreak: "break-word",
});

export const chatBubbleUser = style({
  backgroundColor: "#232629",
  borderRadius: "16px",
  borderTopRightRadius: 0,
  border: "1px solid rgba(70, 72, 74, 0.1)",
  padding: `${vars.space.insetMd} ${vars.space.insetLg}`,
});

export const chatBubbleAssistant = style({
  position: "relative",
  background: "linear-gradient(155deg, rgba(29, 32, 35, 0.85) 0%, rgba(17, 20, 22, 0.78) 100%)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  boxShadow: "inset 0 0 30px rgba(186, 158, 255, 0.06), 0 8px 24px rgba(0, 0, 0, 0.35), 0 0 25px rgba(244, 114, 182, 0.05)",
  border: "1px solid rgba(186, 158, 255, 0.22)",
  borderRadius: "22px",
  borderTopLeftRadius: 4,
  padding: "22px 24px",
});

export const chatCodeBlock = style({
  position: "relative",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  borderRadius: "12px",
  marginTop: vars.space.gapSm,
  overflow: "hidden",
  border: `1px solid ${vars.color.outline.variant}`,
});

export const chatCodeBlockHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${vars.space.insetXs} ${vars.space.insetMd}`,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
});

export const chatCodeBlockLang = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

export const chatCodeBlockCopy = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  border: "none",
  borderRadius: vars.radius.control,
  backgroundColor: "transparent",
  color: vars.color.text.muted,
  cursor: "pointer",
  fontSize: "16px",
  transition: `color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    color: vars.color.text.primary,
  },
});

export const chatCodeBlockBody = style({
  padding: vars.space.insetMd,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.accent.secondaryDim,
  overflowX: "auto",
  whiteSpace: "pre",
});

export const chatCodeHighlightLine = style({
  backgroundColor: "rgba(186, 158, 255, 0.05)",
  borderLeft: `2px solid ${vars.color.accent.primary}`,
  display: "block",
  marginLeft: `-${vars.space.insetMd}`,
  marginRight: `-${vars.space.insetMd}`,
  paddingLeft: vars.space.insetMd,
  paddingRight: vars.space.insetMd,
});

export const chatMarkdown = style({
  fontSize: vars.font.size.body,
  lineHeight: 1.6,
  wordBreak: "break-word",
});

globalStyle(`${chatMarkdown} > *:first-child`, { marginTop: 0 });
globalStyle(`${chatMarkdown} > *:last-child`, { marginBottom: 0 });
globalStyle(`${chatMarkdown} p`, { margin: "0.5em 0" });
globalStyle(`${chatMarkdown} h1, ${chatMarkdown} h2, ${chatMarkdown} h3, ${chatMarkdown} h4`, {
  margin: "0.8em 0 0.4em",
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: vars.color.text.primary,
});
globalStyle(`${chatMarkdown} h1`, { fontSize: "1.25em" });
globalStyle(`${chatMarkdown} h2`, { fontSize: "1.15em" });
globalStyle(`${chatMarkdown} h3`, { fontSize: "1.05em" });
globalStyle(`${chatMarkdown} h4`, { fontSize: "1em" });
globalStyle(`${chatMarkdown} ul, ${chatMarkdown} ol`, {
  margin: "0.4em 0",
  paddingLeft: "1.4em",
});
globalStyle(`${chatMarkdown} li`, { margin: "0.18em 0" });
globalStyle(`${chatMarkdown} li > p`, { margin: "0.15em 0" });
globalStyle(`${chatMarkdown} blockquote`, {
  margin: "0.6em 0",
  padding: "0.2em 0.9em",
  borderLeft: `2.5px solid ${vars.color.accent.primary}66`,
  color: vars.color.text.muted,
  background: "rgba(186, 158, 255, 0.04)",
  borderRadius: "0 6px 6px 0",
});
globalStyle(`${chatMarkdown} hr`, {
  border: "none",
  borderTop: `1px solid ${vars.color.outline.variant}`,
  margin: "0.9em 0",
});
globalStyle(`${chatMarkdown} a`, {
  color: vars.color.accent.primary,
  textDecoration: "none",
  borderBottom: `1px dotted ${vars.color.accent.primary}`,
});
globalStyle(`${chatMarkdown} a:hover`, { borderBottomStyle: "solid" });
globalStyle(`${chatMarkdown} strong`, {
  fontWeight: 600,
  color: vars.color.text.primary,
});
globalStyle(`${chatMarkdown} em`, { fontStyle: "italic" });
globalStyle(`${chatMarkdown} table`, {
  borderCollapse: "collapse",
  margin: "0.6em 0",
  fontSize: "0.95em",
  display: "block",
  overflowX: "auto",
});
globalStyle(`${chatMarkdown} th, ${chatMarkdown} td`, {
  border: `1px solid ${vars.color.outline.variant}`,
  padding: "6px 10px",
  textAlign: "left",
});
globalStyle(`${chatMarkdown} th`, {
  background: "rgba(255,255,255,0.03)",
  fontWeight: 600,
});
globalStyle(`${chatMarkdown} .katex-display`, {
  margin: "0.6em 0",
  overflowX: "auto",
  overflowY: "hidden",
  padding: "2px 0",
});
globalStyle(`${chatMarkdown} .katex`, { fontSize: "1em" });

export const chatInlineCode = style({
  fontFamily: vars.font.code,
  fontSize: "0.9em",
  padding: "1px 6px",
  borderRadius: "5px",
  background: "rgba(186, 158, 255, 0.12)",
  color: vars.color.accent.secondaryDim,
  border: `1px solid rgba(186, 158, 255, 0.18)`,
});

export const chatInputArea = style({
  position: "absolute",
  bottom: "32px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "768px",
  padding: "0 24px",
  zIndex: 10,
});

export const chatInputGlass = style({
  position: "relative",
  backgroundColor: "rgba(17, 20, 22, 0.72)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "18px",
  border: "1px solid rgba(186, 158, 255, 0.18)",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  boxShadow: `0 12px 36px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255,255,255,0.02), inset 0 1px 0 rgba(255,255,255,0.05)`,
  transition: `border-color ${vars.motion.durationNormal} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      inset: "-1px",
      borderRadius: "19px",
      padding: "1px",
      background: `linear-gradient(120deg, rgba(186,158,255,0) 0%, rgba(186,158,255,0.3) 35%, rgba(244,114,182,0.25) 60%, rgba(34,211,238,0.3) 100%)`,
      WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      pointerEvents: "none",
      opacity: 0,
      transition: `opacity ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
    },
    "&:focus-within": {
      borderColor: "rgba(186, 158, 255, 0.5)",
      boxShadow: `0 12px 36px rgba(0,0,0,0.5), 0 0 35px rgba(186, 158, 255, 0.18), 0 0 60px rgba(34, 211, 238, 0.1)`,
    },
    "&:focus-within::before": {
      opacity: 1,
    },
  },
});

export const chatInputToolsRow = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  padding: "0 4px",
});

export const chatInputIconButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  border: "none",
  borderRadius: vars.radius.card,
  backgroundColor: "transparent",
  color: vars.color.text.muted,
  cursor: "pointer",
  fontSize: "18px",
  flexShrink: 0,
  transition: `all ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    backgroundColor: vars.color.bg.hover,
  },
});

export const chatInputIconAttach = style({
  selectors: {
    "&:hover": {
      color: vars.color.text.secondary,
    },
  },
});

export const chatInputIconScreenshot = style({
  selectors: {
    "&:hover": {
      color: vars.color.accent.tertiary,
    },
  },
});

export const chatInputIconCode = style({
  selectors: {
    "&:hover": {
      color: vars.color.accent.primary,
    },
  },
});

export const chatInputDivider = style({
  width: "1px",
  height: "16px",
  backgroundColor: "rgba(70, 72, 74, 0.2)",
  flexShrink: 0,
});

export const chatModelChip = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "3px 10px",
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  background: "linear-gradient(90deg, rgba(34, 211, 238, 0.12), rgba(144, 147, 255, 0.12))",
  border: "1px solid rgba(34, 211, 238, 0.28)",
  color: "#22D3EE",
});

export const chatOptimizeChip = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "3px 10px",
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  background: "linear-gradient(90deg, rgba(244, 114, 182, 0.14), rgba(186, 158, 255, 0.14))",
  border: "1px solid rgba(244, 114, 182, 0.3)",
  color: "#F472B6",
});

export const chatInputRow = style({
  display: "flex",
  gap: vars.space.gapSm,
  alignItems: "flex-end",
  padding: "0 4px",
});

export const chatInput = style({
  flex: 1,
  backgroundColor: "transparent",
  color: vars.color.text.primary,
  border: "none",
  padding: "8px 0",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  outline: "none",
  resize: "none",
  lineHeight: vars.font.lineHeight.normal,
});

export const chatSendButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "42px",
  height: "42px",
  border: "none",
  borderRadius: "13px",
  background: `linear-gradient(135deg, #ba9eff 0%, #F472B6 55%, #22D3EE 120%)`,
  backgroundSize: "200% 200%",
  backgroundPosition: "0% 0%",
  color: "#14061f",
  cursor: "pointer",
  fontSize: "18px",
  flexShrink: 0,
  boxShadow: "0 6px 16px rgba(186, 158, 255, 0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
  transition: `transform ${vars.motion.durationFast} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}, background-position ${vars.motion.durationSlow} ${vars.motion.easingDefault}`,
  ":hover": {
    transform: "translateY(-1px)",
    backgroundPosition: "100% 100%",
    boxShadow: "0 10px 24px rgba(244, 114, 182, 0.45), 0 0 28px rgba(34, 211, 238, 0.3)",
  },
  ":active": {
    transform: "translateY(0)",
  },
});

export const dataTable = style({
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});

export const dataTableHead = style({
  borderBottom: `2px solid ${vars.color.outline.variant}`,
});

export const dataTableTh = style({
  textAlign: "left",
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  color: vars.color.text.secondary,
  fontWeight: vars.font.weight.semibold,
  fontSize: vars.font.size.caption,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  cursor: "pointer",
  userSelect: "none",
  whiteSpace: "nowrap",
  ":hover": {
    color: vars.color.text.primary,
  },
});

export const dataTableRow = style({
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    backgroundColor: vars.color.bg.hover,
  },
});

export const dataTableRowSelected = style({
  backgroundColor: `${vars.color.accent.primaryDim}22`,
});

export const dataTableTd = style({
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  color: vars.color.text.primary,
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
  padding: vars.space.insetMd,
});

export const formField = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const formLabel = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.secondary,
});

export const formSelect = style({
  width: "100%",
  height: vars.control.heightMd,
  backgroundColor: vars.color.bg.app,
  color: vars.color.text.primary,
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.control,
  padding: `0 ${vars.space.insetMd}`,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  outline: "none",
  ":focus": {
    borderColor: vars.color.accent.primary,
  },
});

export const formTextarea = style({
  width: "100%",
  minHeight: "80px",
  backgroundColor: vars.color.bg.app,
  color: vars.color.text.primary,
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.control,
  padding: vars.space.insetMd,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  lineHeight: vars.font.lineHeight.normal,
  outline: "none",
  resize: "vertical",
  ":focus": {
    borderColor: vars.color.accent.primary,
  },
});

export const formSliderRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
});

export const formSlider = style({
  flex: 1,
  accentColor: vars.color.accent.primary,
});

export const formSliderValue = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
  minWidth: "40px",
  textAlign: "right",
});

export const formToggleRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const formToggle = style({
  position: "relative",
  width: "36px",
  height: "20px",
  backgroundColor: vars.color.bg.hover,
  borderRadius: vars.radius.full,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  border: "none",
  padding: 0,
});

export const formToggleActive = style({
  backgroundColor: vars.color.accent.primary,
});

export const formToggleKnob = style({
  position: "absolute",
  top: "2px",
  left: "2px",
  width: "16px",
  height: "16px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.text.primary,
  transition: `transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
});

export const formToggleKnobActive = style({
  transform: "translateX(16px)",
});

export const metricsDashboard = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: vars.space.gapSm,
  padding: vars.space.insetMd,
});

export const metricsDashboardCompact = style({
  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
  gap: vars.space.gapXs,
  padding: vars.space.insetSm,
});

export const metricCard = style({
  backgroundColor: vars.color.bg.elevated,
  borderRadius: vars.radius.card,
  padding: vars.space.insetMd,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const metricLabel = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const metricValue = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.primary,
});

export const metricValueLarge = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.headingLg,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.primary,
  lineHeight: vars.font.lineHeight.tight,
});

export const metricUnit = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.muted,
  marginLeft: vars.space.gapXs,
});

export const statusBar = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapMd,
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  backgroundColor: vars.color.bg.panel,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  flexShrink: 0,
  minHeight: vars.control.heightSm,
});

export const statusBarCompact = style({
  padding: `${vars.space.insetXs} ${vars.space.insetSm}`,
  gap: vars.space.gapSm,
});

export const statusIndicator = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
});

export const statusDot = style({
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.success.base,
});

export const actionBar = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  flexShrink: 0,
});

export const listContainer = style({
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  flex: 1,
});

export const listItem = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.text.primary,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  ":hover": {
    backgroundColor: vars.color.bg.hover,
  },
});

export const listItemSelected = style({
  backgroundColor: `${vars.color.accent.primary}15`,
  borderLeft: `3px solid ${vars.color.accent.primary}`,
  color: vars.color.accent.primary,
});

export const listItemEmpty = style({
  padding: vars.space.insetXl,
  textAlign: "center",
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
});

export const detailView = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
  padding: vars.space.insetMd,
  overflow: "auto",
});

export const detailHeader = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
});

export const detailHeaderDot = style({
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.accent.secondary,
  flexShrink: 0,
});

export const detailHeaderTitle = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
});

export const detailModelCard = style({
  backgroundColor: vars.color.bg.canvas,
  borderRadius: vars.radius.panel,
  border: `1px solid ${vars.color.outline.variant}`,
  padding: vars.space.insetLg,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const detailModelLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
});

export const detailModelNameRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.gapSm,
});

export const detailModelName = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.primary,
});

export const detailModelVersion = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `2px ${vars.space.insetSm}`,
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  backgroundColor: `${vars.color.accent.secondary}1a`,
  color: vars.color.accent.secondary,
});

export const detailModelInfo = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
});

export const detailMetricsGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: vars.space.gapSm,
});

export const detailMetricCard = style({
  backgroundColor: vars.color.bg.canvas,
  borderRadius: vars.radius.panel,
  border: `1px solid ${vars.color.outline.variant}`,
  padding: vars.space.insetMd,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const detailMetricLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const detailMetricValue = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodyLg,
  fontWeight: vars.font.weight.bold,
});

export const detailMetricUnit = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  marginLeft: vars.space.gapXs,
});

export const detailField = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.gapMd,
  padding: `${vars.space.insetXs} 0`,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
});

export const detailFieldLabel = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.muted,
  flexShrink: 0,
});

export const detailFieldValue = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.text.primary,
  textAlign: "right",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const detailSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const detailSectionTitle = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
});

export const detailContextItem = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  backgroundColor: vars.color.bg.panel,
  borderRadius: vars.radius.card,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
});

export const detailContextIcon = style({
  fontSize: "14px",
  color: vars.color.accent.primary,
  flexShrink: 0,
});

export const detailContextClose = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "18px",
  height: "18px",
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: "transparent",
  color: vars.color.text.muted,
  cursor: "pointer",
  fontSize: "14px",
  marginLeft: "auto",
  flexShrink: 0,
  ":hover": {
    color: vars.color.text.primary,
  },
});

export const detailAddRefButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.gapXs,
  padding: vars.space.insetSm,
  border: `1px dashed ${vars.color.outline.variant}`,
  borderRadius: vars.radius.card,
  backgroundColor: "transparent",
  color: vars.color.text.muted,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  cursor: "pointer",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    borderColor: vars.color.accent.primary,
    color: vars.color.accent.primary,
  },
});

export const detailHealthCard = style({
  backgroundColor: `${vars.color.accent.secondary}0d`,
  borderRadius: vars.radius.panel,
  padding: vars.space.insetMd,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const detailHealthHeader = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
});

export const detailHealthDot = style({
  width: "8px",
  height: "8px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.accent.secondary,
});

export const detailHealthLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const emptyState = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.gapLg,
  padding: vars.space.insetXl,
  textAlign: "center",
  flex: 1,
  minHeight: "200px",
});

export const emptyStateCount = style({
  fontFamily: vars.font.code,
  fontSize: "clamp(64px, 6vw + 32px, 128px)",
  fontWeight: vars.font.weight.regular,
  color: vars.color.text.muted,
  lineHeight: 1,
  letterSpacing: "-0.02em",
});

export const emptyStateLine = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.text.secondary,
  maxWidth: "420px",
  lineHeight: vars.font.lineHeight.normal,
});

export const emptyStateIconBox = style({
  width: "64px",
  height: "64px",
  borderRadius: vars.radius.container,
  backgroundColor: `${vars.color.accent.primary}1a`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "32px",
  color: vars.color.accent.primary,
});

export const emptyStateIcon = style({
  fontSize: "48px",
  color: vars.color.text.muted,
  lineHeight: 1,
});

export const emptyStateTitle = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingLg,
  fontWeight: vars.font.weight.black,
  color: vars.color.text.primary,
  letterSpacing: "-0.02em",
});

export const emptyStateDescription = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
  maxWidth: "320px",
  lineHeight: vars.font.lineHeight.relaxed,
});

export const progressTracker = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  padding: vars.space.insetMd,
});

export const progressBar = style({
  width: "100%",
  height: "8px",
  backgroundColor: vars.color.bg.hover,
  borderRadius: vars.radius.full,
  overflow: "hidden",
});

export const progressFill = style({
  height: "100%",
  backgroundColor: vars.color.accent.secondary,
  borderRadius: vars.radius.full,
  transition: `width ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
});

export const progressInfo = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const progressLabel = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
});

export const progressPercent = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
});

export const logViewer = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
  backgroundColor: vars.color.bg.app,
});

export const logToolbar = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  padding: `${vars.space.insetXs} ${vars.space.insetSm}`,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  flexShrink: 0,
});

export const logFilterButton = style({
  padding: `${vars.space.insetXs} ${vars.space.insetSm}`,
  border: "none",
  borderRadius: vars.radius.control,
  backgroundColor: "transparent",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    backgroundColor: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
});

export const logFilterActive = style({
  backgroundColor: vars.color.bg.elevated,
  color: vars.color.text.primary,
});

export const logContent = style({
  flex: 1,
  overflow: "auto",
  padding: vars.space.insetSm,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  lineHeight: vars.font.lineHeight.relaxed,
});

export const logLine = style({
  display: "flex",
  gap: vars.space.gapSm,
  padding: `1px 0`,
});

export const logTimestamp = style({
  color: vars.color.text.muted,
  flexShrink: 0,
});

export const logLevelInfo = style({
  color: vars.color.accent.cyan,
});

export const logLevelWarn = style({
  color: vars.color.warning.base,
});

export const logLevelError = style({
  color: vars.color.error.base,
});

export const logLevelDebug = style({
  color: vars.color.text.muted,
});

export const logMessage = style({
  color: vars.color.text.primary,
  wordBreak: "break-all",
});

export const codeBlock = style({
  backgroundColor: vars.color.bg.app,
  borderRadius: vars.radius.card,
  padding: vars.space.insetMd,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.primary,
  overflow: "auto",
  whiteSpace: "pre-wrap",
  border: `1px solid ${vars.color.outline.variant}`,
});

export const codeBlockHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${vars.space.insetXs} ${vars.space.insetMd}`,
  backgroundColor: vars.color.bg.panel,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  borderRadius: `${vars.radius.card} ${vars.radius.card} 0 0`,
});

export const codeBlockLanguage = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  textTransform: "uppercase",
});

export const markdownView = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.primary,
  padding: vars.space.insetMd,
});

globalStyle(`${markdownView} h1`, {
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingLg,
  fontWeight: vars.font.weight.bold,
  marginBottom: vars.space.gapMd,
  color: vars.color.text.primary,
});

globalStyle(`${markdownView} h2`, {
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.heading,
  fontWeight: vars.font.weight.semibold,
  marginBottom: vars.space.gapSm,
  color: vars.color.text.primary,
});

globalStyle(`${markdownView} h3`, {
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.semibold,
  marginBottom: vars.space.gapSm,
  color: vars.color.text.primary,
});

globalStyle(`${markdownView} p`, {
  marginBottom: vars.space.gapSm,
});

globalStyle(`${markdownView} a`, {
  color: vars.color.accent.primary,
  textDecoration: "none",
});

globalStyle(`${markdownView} a:hover`, {
  textDecoration: "underline",
});

globalStyle(`${markdownView} code`, {
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  backgroundColor: vars.color.bg.elevated,
  padding: `2px 6px`,
  borderRadius: vars.radius.control,
});

globalStyle(`${markdownView} pre`, {
  backgroundColor: vars.color.bg.app,
  padding: vars.space.insetMd,
  borderRadius: vars.radius.card,
  overflow: "auto",
  marginBottom: vars.space.gapSm,
  border: `1px solid ${vars.color.outline.variant}`,
});

globalStyle(`${markdownView} pre code`, {
  backgroundColor: "transparent",
  padding: 0,
});

globalStyle(`${markdownView} strong`, {
  fontWeight: vars.font.weight.semibold,
});

globalStyle(`${markdownView} em`, {
  fontStyle: "italic",
});

globalStyle(`${markdownView} ul, ${markdownView} ol`, {
  paddingLeft: vars.space.insetXl,
  marginBottom: vars.space.gapSm,
});

globalStyle(`${markdownView} li`, {
  marginBottom: vars.space.gapXs,
});

export const unknownComponent = style({
  backgroundColor: vars.color.bg.panel,
  borderRadius: vars.radius.card,
  padding: vars.space.insetMd,
  border: `1px dashed ${vars.color.outline.variant}`,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
  textAlign: "center",
});

export const chatMessageTimestamp = style({
  fontFamily: vars.font.code,
  fontSize: "10px",
  color: vars.color.text.muted,
  textAlign: "right",
  marginTop: "4px",
  opacity: 0.4,
});

export const chatMessageMeta = style({
  fontFamily: vars.font.code,
  fontSize: "10px",
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginTop: "8px",
  opacity: 0.5,
  cursor: "pointer",
  listStyle: "none",
  userSelect: "none",
  transition: "opacity 150ms ease, color 150ms ease",
  ":hover": {
    opacity: 1,
    color: vars.color.accent.primary,
  },
  selectors: {
    "&::-webkit-details-marker": { display: "none" },
  },
});

export const chatMessageMetaDetails = style({
  marginTop: "8px",
});

export const chatMessageParams = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px 14px",
  marginTop: "6px",
  padding: "8px 10px",
  fontFamily: vars.font.code,
  fontSize: "11px",
  color: vars.color.text.muted,
  background: "rgba(186, 158, 255, 0.05)",
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: "8px",
  lineHeight: 1.4,
});

globalStyle(`${chatMessageParams} b`, {
  color: vars.color.accent.primary,
  fontWeight: 600,
});

export const chatMessageActions = style({
  display: "flex",
  gap: "8px",
  marginTop: "12px",
  paddingTop: "12px",
  borderTop: `1px solid ${vars.color.outline.variant}`,
});

export const chatActionButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px 12px",
  borderRadius: vars.radius.card,
  border: "1px solid rgba(70, 72, 74, 0.1)",
  background: vars.color.bg.hover,
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: "11px",
  cursor: "pointer",
  transition: `all ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    backgroundColor: vars.color.bg.bright,
    color: vars.color.text.primary,
  },
});

export const detailLiveBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  marginLeft: "auto",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  color: vars.color.accent.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
});

const pulseLive = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.4 },
});

const chatSpin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

const chatBlink = keyframes({
  "0%, 49%": { opacity: 0.85 },
  "50%, 100%": { opacity: 0 },
});

export const chatStreamingSpinner = style({
  display: "inline-block",
  animation: `${chatSpin} 900ms linear infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const chatStreamingCursor = style({
  display: "inline-block",
  width: "6px",
  height: "1em",
  marginLeft: "3px",
  verticalAlign: "text-bottom",
  background: "currentColor",
  animation: `${chatBlink} 900ms steps(2, start) infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 0.6,
    },
  },
});

export const detailLiveDot = style({
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.accent.secondary,
  animation: `${pulseLive} 2s ease-in-out infinite`,
});

export const detailHealthCardGradient = style({
  background: `linear-gradient(135deg, ${vars.color.accent.secondary}0d 0%, ${vars.color.accent.primary}0d 100%)`,
  borderRadius: vars.radius.panel,
  padding: "1px",
});

const chatWelcomePulse = keyframes({
  "0%, 100%": {
    boxShadow: `0 0 60px rgba(186, 158, 255, 0.35), 0 0 120px rgba(244, 114, 182, 0.18), inset 0 1px 0 rgba(255,255,255,0.1)`,
  },
  "50%": {
    boxShadow: `0 0 80px rgba(34, 211, 238, 0.4), 0 0 150px rgba(186, 158, 255, 0.25), inset 0 1px 0 rgba(255,255,255,0.15)`,
  },
});

const chatWelcomeOrbit = keyframes({
  "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
  "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
});

export const chatWelcome = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "64px 32px",
  maxWidth: "640px",
  margin: "auto",
  position: "relative",
});

export const chatWelcomeIconBox = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "88px",
  height: "88px",
  borderRadius: "28px",
  background: `linear-gradient(135deg, rgba(186, 158, 255, 0.28) 0%, rgba(244, 114, 182, 0.22) 50%, rgba(34, 211, 238, 0.26) 100%)`,
  border: "1px solid rgba(186, 158, 255, 0.35)",
  color: "#ffffff",
  marginBottom: "28px",
  animation: `${chatWelcomePulse} 4s ease-in-out infinite`,
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "148px",
      height: "148px",
      borderRadius: "50%",
      border: "1px dashed rgba(186, 158, 255, 0.25)",
      transform: "translate(-50%, -50%)",
      animation: `${chatWelcomeOrbit} 24s linear infinite`,
      pointerEvents: "none",
    },
    "&::after": {
      content: "''",
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      border: "1px dashed rgba(34, 211, 238, 0.18)",
      transform: "translate(-50%, -50%)",
      animation: `${chatWelcomeOrbit} 40s linear infinite reverse`,
      pointerEvents: "none",
    },
  },
});

export const chatWelcomeTitle = style({
  fontFamily: vars.font.headline,
  fontSize: "36px",
  fontWeight: 800,
  letterSpacing: "-0.035em",
  lineHeight: 1.05,
  margin: "0 0 12px 0",
  color: vars.color.text.primary,
});

export const chatWelcomeDescription = style({
  fontFamily: vars.font.ui,
  fontSize: "15px",
  color: vars.color.text.secondary,
  maxWidth: "460px",
  lineHeight: 1.6,
  margin: 0,
});

export const iconInherit = style({
  fontSize: "inherit",
});

export const iconInheritFilled = style({
  fontSize: "inherit",
  fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
});

export const iconSm = style({
  fontSize: "14px",
});

export const iconBadge = style({
  fontSize: "12px",
  marginRight: "4px",
});

export const hidden = style({
  display: "none",
});

export const marginLeftAuto = style({
  marginLeft: "auto",
});

export const tokenCountLabel = style({
  fontFamily: "var(--font-code)",
  fontSize: "9px",
  color: "rgba(116, 117, 120, 0.6)",
  textTransform: "uppercase",
});

export const codeFont = style({
  fontFamily: "var(--font-code)",
});

export const codeInline = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  backgroundColor: vars.color.bg.app,
  color: vars.color.text.primary,
  padding: `2px ${vars.space.insetXs}`,
  borderRadius: vars.radius.control,
  border: `1px solid ${vars.color.outline.variant}`,
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
});

export const flexOne = style({
  flex: 1,
});

export const iconLg = style({
  fontSize: "18px",
});

export const iconMd = style({
  fontSize: "16px",
});

export const iconXl = style({
  fontSize: "22px",
});

export const overflowAuto = style({
  overflow: "auto",
});

export const scrollColumn = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
});

export const scrollBody = style({
  flex: 1,
  overflow: "auto",
});

export const codeSmall = style({
  fontFamily: "var(--font-code)",
  fontSize: "0.75rem",
  opacity: 0.7,
});

export const mutedSmall = style({
  fontSize: "0.75rem",
  opacity: 0.6,
});

export const descSmall = style({
  fontSize: "0.75rem",
  opacity: 0.7,
});

export const centeredHint = style({
  padding: "16px",
  textAlign: "center",
  opacity: 0.5,
});

export const accentIcon = style({
  fontSize: "18px",
  color: "var(--color-accent-secondary)",
});

export const resetList = style({
  margin: 0,
  paddingLeft: "1rem",
});

export const zeroMargin = style({
  margin: 0,
});
