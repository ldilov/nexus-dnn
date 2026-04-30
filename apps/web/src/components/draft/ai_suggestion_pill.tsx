import { useCallback, useEffect } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { Link } from "react-router";
import { useSuggestionStream, type UseSuggestionStreamOptions } from "./ai_suggestion_stream";
import * as styles from "./ai_suggestion_pill.css";

export interface AiSuggestionPillProps extends UseSuggestionStreamOptions {
  /** Called with the accepted suggestion text. */
  onAcceptSuggestion?: (text: string) => void;
  /** Called when the user dismisses the pill. */
  onDismiss?: () => void;
  /** Optional inline style for layout positioning by the host view. */
  style?: CSSProperties;
}

const ENTER_TRANSITION = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
};

const REDUCED_TRANSITION = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
  transition: { duration: 0 },
};

export function AiSuggestionPill({
  onAcceptSuggestion,
  onDismiss,
  style,
  ...streamOpts
}: AiSuggestionPillProps) {
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion ? REDUCED_TRANSITION : ENTER_TRANSITION;
  const { state, accept, dismiss, retry } = useSuggestionStream(streamOpts);

  const handleAccept = useCallback(() => {
    const text = accept();
    if (text && onAcceptSuggestion) onAcceptSuggestion(text);
  }, [accept, onAcceptSuggestion]);

  const handleDismiss = useCallback(() => {
    dismiss();
    onDismiss?.();
  }, [dismiss, onDismiss]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (state.phase !== "ready") return;
      // Only intercept Tab/Esc when a text-input element is focused.
      // Otherwise Tab is the user navigating UI chrome (sidebar, modals,
      // etc.) and stealing it would feel like a keyboard trap.
      const active = document.activeElement;
      const isTextInputFocused =
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        (active instanceof HTMLElement && active.isContentEditable);
      if (!isTextInputFocused) return;
      if (e.key === "Tab" && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        handleAccept();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleDismiss();
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [state.phase, handleAccept, handleDismiss]);

  if (state.phase === "idle" || state.phase === "dismissed") return null;

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={styles.root}
        style={style}
        role="status"
        aria-live="polite"
        aria-label="AI suggestion"
        initial={transition.initial}
        animate={transition.animate}
        exit={transition.exit}
        transition={transition.transition}
      >
        <PillBody
          state={state}
          onAccept={handleAccept}
          onDismiss={handleDismiss}
          onRetry={retry}
        />
      </m.div>
    </LazyMotion>
  );
}

interface PillBodyProps {
  state: ReturnType<typeof useSuggestionStream>["state"];
  onAccept: () => void;
  onDismiss: () => void;
  onRetry: () => void;
}

function PillBody({ state, onAccept, onDismiss, onRetry }: PillBodyProps) {
  switch (state.phase) {
    case "requesting":
      return (
        <>
          <Eyebrow label="AI" />
          <div className={styles.body}>
            <span className={`${styles.text} ${styles.muted}`}>
              Looking for an AI backend
              <span className={styles.cursor} aria-hidden="true">&nbsp;</span>
            </span>
            <Actions>
              <DismissButton onClick={onDismiss} />
            </Actions>
          </div>
        </>
      );
    case "streaming":
      return (
        <>
          <Eyebrow label="AI · Streaming" />
          <div className={styles.body}>
            <span className={styles.text}>
              {state.text}
              <span className={styles.cursor} aria-hidden="true">&nbsp;</span>
            </span>
            <Actions>
              <DismissButton onClick={onDismiss} label="Cancel" />
            </Actions>
          </div>
        </>
      );
    case "ready":
      return (
        <>
          <Eyebrow label="AI · Suggestion" />
          <div className={styles.body}>
            <span className={styles.text}>{state.text}</span>
            <Actions>
              <button
                type="button"
                className={styles.acceptButton}
                onClick={onAccept}
                onKeyDown={preventBubble}
              >
                Accept
                <kbd className={styles.acceptHotkey}>Tab</kbd>
              </button>
              <DismissButton onClick={onDismiss} />
            </Actions>
          </div>
        </>
      );
    case "no_backend":
      return (
        <>
          <Eyebrow label="AI · Offline" />
          <div className={styles.body}>
            <span className={`${styles.text} ${styles.muted}`}>
              {state.errorMessage ??
                "No AI backend is currently configured. Add one to enable inline suggestions."}
            </span>
            <Actions>
              <CtaLink
                href={state.noBackendCta?.href ?? "/backends"}
                label={state.noBackendCta?.label ?? "Configure backend"}
              />
              <DismissButton onClick={onDismiss} />
            </Actions>
          </div>
        </>
      );
    case "error":
      return (
        <>
          <Eyebrow label="AI · Error" />
          <div className={styles.body}>
            <span className={`${styles.text} ${styles.errorText}`}>
              {state.errorMessage ?? "Suggestion failed."}
            </span>
            <Actions>
              {state.errorRetryable && (
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={onRetry}
                  aria-label="Retry"
                  title="Retry"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    refresh
                  </span>
                </button>
              )}
              <DismissButton onClick={onDismiss} />
            </Actions>
          </div>
        </>
      );
    default:
      return null;
  }
}

function Eyebrow({ label }: { label: string }) {
  return (
    <span className={styles.eyebrow}>
      <span className={styles.eyebrowDot} aria-hidden="true" />
      {label}
    </span>
  );
}

function Actions({ children }: { children: React.ReactNode }) {
  return <div className={styles.actions}>{children}</div>;
}

function DismissButton({ onClick, label }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      className={styles.iconButton}
      onClick={onClick}
      aria-label={label ?? "Dismiss"}
      title={label ?? "Dismiss"}
      onKeyDown={preventBubble}
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        close
      </span>
    </button>
  );
}

function preventBubble(e: KeyboardEvent<HTMLElement>) {
  if (e.key === "Tab" || e.key === "Escape") {
    e.stopPropagation();
  }
}

function CtaLink({ href, label }: { href: string; label: string }) {
  // Use SPA <Link> for in-app routes so the running draft state survives
  // navigation (sessionStorage persists, but in-flight motion/abort state
  // would otherwise be torn down on full reload). Fall back to a plain
  // <a> for any href that isn't an in-app route (external CTAs).
  const isInApp = href.startsWith("/");
  if (isInApp) {
    return (
      <Link className={styles.ctaLink} to={href}>
        {label} →
      </Link>
    );
  }
  return (
    <a className={styles.ctaLink} href={href}>
      {label} →
    </a>
  );
}
