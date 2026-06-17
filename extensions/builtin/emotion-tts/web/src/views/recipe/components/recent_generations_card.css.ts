import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

/* Recent generations card — sits at the top of the recipe surface,
 * editorial restraint over volume. Accent left-rail mirrors the
 * recipe shell reads as a single visual system. */
export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  background: vars.color.surface,
  borderRadius: vars.radius.md,
  borderLeft: `2px solid ${vars.color.accent}`,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  // audit-allow: px — design-system-spec'd card padding
  padding: "12px 14px",
});

export const head = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
});

export const eyebrow = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.accent,
  fontWeight: 600,
});

export const headMeta = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
});

export const count = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
});

export const headHint = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const refresh = style({
  appearance: "none",
  background: "transparent",
  border: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — touch-target square
  width: "26px",
  // audit-allow: px — touch-target square
  height: "26px",
  padding: 0,
  borderRadius: vars.radius.pill,
  color: vars.color.textMuted,
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  lineHeight: 1,
  cursor: "pointer",
  transition: "color 120ms, background 120ms",
  selectors: {
    "&:hover": {
      color: vars.color.accent,
      background: vars.color.surfaceMuted,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "2px",
    },
  },
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  margin: 0,
  padding: 0,
  listStyle: "none",
});

/* Row layout — flex column with an inner flex row for the main content
 * (play | body | download) and an optional audio element below when
 * gridArea references to fall back to auto-placement and stack weirdly. */
export const row = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — sub-token vertical rhythm between row + inline audio
  gap: "8px",
  // audit-allow: px — design-system-spec'd row inset
  padding: "10px 12px",
  borderRadius: vars.radius.sm,
  transition: "background 140ms",
  selectors: {
    "&:hover": {
      background: vars.color.surfaceMuted,
    },
    "&[data-playing]": {
      background: `color-mix(in oklab, ${vars.color.accent} 8%, transparent)`,
    },
  },
});

export const rowMain = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  minWidth: 0,
});

export const playButton = style({
  appearance: "none",
  // audit-allow: px — touch-target square
  width: "32px",
  // audit-allow: px — touch-target square
  height: "32px",
  flex: "0 0 32px",
  background: `color-mix(in oklab, ${vars.color.accent} 14%, transparent)`,
  color: vars.color.accent,
  border: "none",
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.mono,
  // audit-allow: px — glyph size matched to button
  fontSize: "12px",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  lineHeight: 1,
  transition: "background 120ms, transform 120ms",
  selectors: {
    "&:hover": {
      background: `color-mix(in oklab, ${vars.color.accent} 24%, transparent)`,
      transform: "scale(1.06)",
    },
    "&:active": {
      transform: "scale(0.96)",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "2px",
    },
    "&[aria-pressed='true']": {
      background: vars.color.accent,
      color: vars.color.accentOn,
    },
  },
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — sub-token line spacing within row
  gap: "2px",
  flex: "1 1 auto",
  minWidth: 0,
});

export const bodyTop = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.space.sm,
  minWidth: 0,
});

export const character = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
  flex: "0 0 auto",
});

export const text = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  flex: "1 1 auto",
  minWidth: 0,
  // The full text is exposed via the native `title` attribute on the
  // element. Browsers render the OS-level tooltip on pointer hover and
});

export const meta = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const metaSeg = style({
  flex: "0 0 auto",
});

export const metaDot = style({
  color: vars.color.textFaint,
});

export const metaVoice = style({
  color: vars.color.text,
  // audit-allow: px — meta caps voice name to keep row scannable
  maxWidth: "180px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const metaDuration = style({
  color: vars.color.accent,
});

export const metaSpeed = style({
  color: vars.color.text,
});

export const download = style({
  flex: "0 0 30px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — touch-target square
  width: "30px",
  // audit-allow: px — touch-target square
  height: "30px",
  borderRadius: vars.radius.pill,
  color: vars.color.text,
  background: vars.color.surfaceMuted,
  border: `1px solid ${vars.color.borderSubtle}`,
  textDecoration: "none",
  fontFamily: vars.font.mono,
  // audit-allow: px — readable glyph weight
  fontSize: "16px",
  lineHeight: 1,
  transition: "color 120ms, background 120ms, border-color 120ms",
  selectors: {
    "&:hover": {
      color: vars.color.accent,
      background: `color-mix(in oklab, ${vars.color.accent} 14%, transparent)`,
      borderColor: vars.color.accent,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "2px",
    },
  },
});

export const audio = style({
  width: "100%",
  // audit-allow: px — compact inline audio height
  height: "32px",
});

export const error = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.danger,
  paddingInline: vars.space.sm,
});
