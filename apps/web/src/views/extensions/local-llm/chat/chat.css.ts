import { style } from '@vanilla-extract/css';

export const shell = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minHeight: 0,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.75rem 1rem',
  borderBottom: '1px solid var(--color-border, rgba(255,255,255,0.08))',
  gap: '0.75rem',
});

export const title = style({
  fontSize: '1rem',
  fontWeight: 600,
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const headerActions = style({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
});

export const messagePane = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '1rem',
});

export const message = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  padding: '0.75rem 1rem',
  borderRadius: '0.5rem',
  background: 'var(--color-surface-raised, rgba(255,255,255,0.04))',
  maxWidth: '80ch',
});

export const messageUser = style({
  alignSelf: 'flex-end',
  background: 'var(--color-accent-muted, rgba(100,150,255,0.12))',
});

export const messageAssistant = style({
  alignSelf: 'flex-start',
});

export const messageSystem = style({
  alignSelf: 'stretch',
  fontStyle: 'italic',
  opacity: 0.75,
});

export const messagePartial = style({
  opacity: 0.6,
  borderLeft: '2px solid var(--color-warn, #f59e0b)',
});

export const messageMeta = style({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  fontSize: '0.75rem',
  opacity: 0.65,
});

export const composer = style({
  borderTop: '1px solid var(--color-border, rgba(255,255,255,0.08))',
  padding: '0.75rem 1rem',
  display: 'flex',
  gap: '0.5rem',
});

export const composerInput = style({
  flex: 1,
  resize: 'vertical',
  minHeight: '2.5rem',
  maxHeight: '12rem',
  padding: '0.5rem 0.75rem',
  borderRadius: '0.375rem',
  border: '1px solid var(--color-border, rgba(255,255,255,0.08))',
  background: 'var(--color-surface, rgba(0,0,0,0.2))',
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: '0.9375rem',
});

export const emptyState = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '0.5rem',
  opacity: 0.65,
});

export const banner = style({
  padding: '0.75rem 1rem',
  display: 'flex',
  gap: '0.75rem',
  alignItems: 'center',
  background: 'var(--color-info-muted, rgba(100,150,255,0.08))',
  borderBottom: '1px solid var(--color-info, rgba(100,150,255,0.25))',
});

export const bannerText = style({
  flex: 1,
  fontSize: '0.875rem',
});

export const iconButton = style({
  background: 'transparent',
  border: 'none',
  color: 'inherit',
  cursor: 'pointer',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.25rem',
  ':hover': {
    background: 'rgba(255,255,255,0.06)',
  },
});

export const primaryButton = style({
  padding: '0.375rem 0.75rem',
  borderRadius: '0.375rem',
  border: 'none',
  background: 'var(--color-accent, #4b72ff)',
  color: 'white',
  cursor: 'pointer',
  fontSize: '0.875rem',
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const ghostButton = style({
  padding: '0.375rem 0.75rem',
  borderRadius: '0.375rem',
  border: '1px solid var(--color-border, rgba(255,255,255,0.12))',
  background: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  fontSize: '0.875rem',
});

export const dangerButton = style({
  padding: '0.375rem 0.75rem',
  borderRadius: '0.375rem',
  border: 'none',
  background: 'var(--color-danger, #ef4444)',
  color: 'white',
  cursor: 'pointer',
  fontSize: '0.875rem',
});

export const sliderRow = style({
  display: 'grid',
  gridTemplateColumns: '8rem 1fr 4rem',
  gap: '0.75rem',
  alignItems: 'center',
  padding: '0.375rem 0',
});

export const sliderLabel = style({
  fontSize: '0.875rem',
});

export const sliderValue = style({
  fontSize: '0.75rem',
  textAlign: 'right',
  fontVariantNumeric: 'tabular-nums',
});

export const popoverCard = style({
  position: 'absolute',
  zIndex: 100,
  background: 'var(--color-surface-raised, #1a1a1f)',
  border: '1px solid var(--color-border, rgba(255,255,255,0.12))',
  borderRadius: '0.5rem',
  padding: '0.75rem',
  minWidth: '18rem',
  maxWidth: '24rem',
  boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
});

export const auditTable = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.75rem',
  fontVariantNumeric: 'tabular-nums',
});

export const auditCell = style({
  padding: '0.125rem 0.5rem',
  borderBottom: '1px solid rgba(255,255,255,0.04)',
});
