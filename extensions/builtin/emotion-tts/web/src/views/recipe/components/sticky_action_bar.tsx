import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  getRuntimeHealth,
  type RuntimeHealth,
} from "../../../services/runtime_client";
import {
  dispatchTriggerGenerate,
  subscribeRunState,
} from "../lib/run_events";
import * as css from "./sticky_action_bar.css";

// Mirrors `host_action_bridge.ts` — invoking the bridge instead of calling
// startRuntime/stopRuntime directly keeps the host shell's "Start runtime"
const EXT_ACTION_INVOKE = "ext-action-invoke";
const ACTION_RUN = "emotion-tts.run";

function invokeRuntimeAction(): boolean {
  if (typeof document === "undefined") return false;
  const host = document.querySelector("emotion-tts-app");
  if (!host) return false;
  host.dispatchEvent(
    new CustomEvent(EXT_ACTION_INVOKE, {
      detail: { id: ACTION_RUN },
      bubbles: false,
    }),
  );
  return true;
}

interface Props {
  visible: boolean;
  /** True when the script has content + Generate is otherwise eligible. */
  canGenerate: boolean;
}

const HEALTH_POLL_MS = 4000;

type StatusTone = "ready" | "busy" | "off";

/**
 * Floating quick-action toolbar. Lives inside the recipe view and talks to
 * the host runtime directly via the extension's runtime client; dispatches
 * a `CustomEvent` to fire Generate against the in-page RunPanel so we don't
 * need to lift its state.
 */
export function StickyActionBar({ visible, canGenerate }: Props): JSX.Element {
  const [health, setHealth] = useState<RuntimeHealth | null>(null);
  const [runtimeBusy, setRuntimeBusy] = useState(false);
  const [generateBusy, setGenerateBusy] = useState(false);
  // Health updates every 4s; reading it from a ref inside `onRunClick`
  // means the callback closure stays stable and always sees the most recent
  const healthRef = useRef<RuntimeHealth | null>(null);
  // Badge at the moment the user clicked run/stop, so the optimistic spinner
  // clears only once the badge actually moves (covers start AND stop).
  const clickBadgeRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const poll = async (): Promise<void> => {
      try {
        const h = await getRuntimeHealth();
        if (!cancelled) {
          healthRef.current = h;
          setHealth(h);
        }
      } catch {
        // ignore — overlay is best-effort
      }
    };
    void poll();
    const id = window.setInterval(poll, HEALTH_POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  // Listen to RunPanel's broadcast so our Generate button reflects the
  // current run phase without lifting state up.
  useEffect(() => {
    return subscribeRunState((detail) => {
      setGenerateBusy(Boolean(detail.busy));
    });
  }, []);

  const onGenerate = useCallback((): void => {
    dispatchTriggerGenerate();
  }, []);

  const badge = health?.badge ?? "not_installed";
  const isRunning = badge === "ready" || badge === "running";
  const isStopping = badge === "stopping";
  const isStarting =
    badge === "starting" || badge === "installing" || badge === "stopping";
  const runtimeReady = isRunning;

  // Clear the optimistic spinner once the next health poll has observed a
  // lifecycle-transition badge (starting / installing / stopping). At that
  useEffect(() => {
    if (runtimeBusy && clickBadgeRef.current !== null && badge !== clickBadgeRef.current) {
      clickBadgeRef.current = null;
      setRuntimeBusy(false);
    }
  }, [runtimeBusy, badge]);

  const onRunClick = useCallback((): void => {
    // Delegate to the host action bridge so the host shell's "Start runtime"
    // button and this toolbar reflect the same in-flight state instantly —
    clickBadgeRef.current = healthRef.current?.badge ?? "not_installed";
    setRuntimeBusy(true);
    invokeRuntimeAction();
    // Clear the local optimistic flag once the next health poll observes
    // the lifecycle transition (badge moves into starting/installing/running
  }, []);

  const runtimeLabel = isStopping
    ? "Stopping…"
    : runtimeBusy && isRunning
      ? "Stopping…"
      : runtimeBusy
        ? "Starting…"
        : isRunning
          ? "Stop runtime"
          : isStarting
            ? "Runtime starting…"
            : "Start runtime";
  const runtimeDisabled = runtimeBusy || isStarting;
  const runtimeShowSpinner = runtimeBusy || isStarting;
  const runtimeState = runtimeShowSpinner
    ? "transitioning"
    : isRunning
      ? "running"
      : "stopped";

  const generateDisabled = !canGenerate || generateBusy || !runtimeReady;
  const generateLabel = !runtimeReady
    ? "Start runtime to generate"
    : !canGenerate
      ? "Add a script to generate"
      : generateBusy
        ? "Generating…"
        : "Generate";
  const generateReady = runtimeReady && canGenerate && !generateBusy;

  // Status pill text + tone — keeps the bar communicative when collapsed.
  const statusTone: StatusTone =
    runtimeBusy || isStarting ? "busy" : isRunning ? "ready" : "off";
  const statusText = isStopping
    ? "Stopping…"
    : runtimeBusy
      ? "Working…"
      : isRunning
        ? "Runtime ready"
        : isStarting
          ? "Starting…"
          : "Runtime off";
  const statusPulse = statusTone === "busy";

  if (typeof document === "undefined") return <></>;

  // Inline-style fallbacks. Vanilla-extract `vars.color.*` values resolve via
  // `var(--name, fallback)` at runtime; when we portal outside the
  // `emotion-tts-app` token scope, browsers occasionally drop the fallback
  // chain or the host's own `--accent` wins. Explicit hex on the visible
  // surface guarantees the pill, the icon button, and the accent CTA all
  // read as designed regardless of where the portal lands.
  // audit-allow: hex/rgba — sticky-bar visual fallback (out-of-scope portal target).
  const BAR_BG = "rgba(28, 30, 34, 0.94)";
  // audit-allow: hex/rgba — sticky-bar visual fallback.
  const ACCENT = "#ba9eff";
  // audit-allow: hex/rgba — sticky-bar visual fallback.
  const ACCENT_DIM = "#8455ef";
  // audit-allow: hex/rgba — sticky-bar visual fallback.
  const ACCENT_ON = "#1a0a3a";
  // audit-allow: hex/rgba — sticky-bar visual fallback.
  const SURFACE_INK = "#f0f0f3";
  // audit-allow: hex/rgba — sticky-bar visual fallback.
  const SURFACE_MUTED = "#aaabae";
  // audit-allow: hex/rgba — sticky-bar visual fallback.
  const SUCCESS = "#22c55e";

  const runIcon = isRunning ? "◼" : "⏻";

  return createPortal(
    <div
      className={css.bar}
      data-visible={visible ? "true" : "false"}
      role="toolbar"
      aria-label="Quick actions"
      aria-hidden={!visible}
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        right: "auto",
        top: "auto",
        transform: visible
          ? "translate(-50%, 0)"
          : "translate(-50%, 12px)",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        paddingInline: "8px",
        paddingBlock: "8px",
        background: BAR_BG,
        boxShadow:
          "0 18px 44px -12px rgba(0, 0, 0, 0.7), 0 6px 18px -6px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(186, 158, 255, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(20px) saturate(1.7)",
        WebkitBackdropFilter: "blur(20px) saturate(1.7)",
        borderRadius: "999px",
        zIndex: 60,
      }}
    >
      <span
        className={css.statusPill}
        data-tone={statusTone}
        aria-live="polite"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          paddingInline: "14px",
          height: "36px",
          borderRadius: "999px",
          fontFamily:
            'var(--font-mono, "JetBrains Mono", ui-monospace, monospace)',
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:
            statusTone === "ready"
              ? SUCCESS
              : statusTone === "busy"
                ? ACCENT
                : SURFACE_MUTED,
          background: "rgba(255, 255, 255, 0.04)",
          boxShadow: `inset 0 0 0 1px ${
            statusTone === "ready"
              ? "rgba(34, 197, 94, 0.4)"
              : statusTone === "busy"
                ? "rgba(186, 158, 255, 0.42)"
                : "rgba(255, 255, 255, 0.08)"
          }`,
          whiteSpace: "nowrap",
        }}
      >
        <span
          className={css.statusDot}
          data-pulse={statusPulse ? "true" : "false"}
          aria-hidden="true"
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "999px",
            background: "currentColor",
            boxShadow:
              statusTone === "ready"
                ? `0 0 8px ${SUCCESS}`
                : statusTone === "busy"
                  ? `0 0 8px ${ACCENT}`
                  : "none",
            flexShrink: 0,
          }}
        />
        {statusText}
      </span>
      <span className={css.tooltipWrap}>
        <button
          type="button"
          className={css.runBtn}
          data-state={runtimeState}
          onClick={onRunClick}
          disabled={runtimeDisabled}
          aria-label={runtimeLabel}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            border: "none",
            borderRadius: "999px",
            background:
              runtimeState === "running"
                ? "rgba(34, 197, 94, 0.18)"
                : "rgba(255, 255, 255, 0.05)",
            color: runtimeState === "running" ? SUCCESS : SURFACE_INK,
            fontSize: "16px",
            cursor: runtimeDisabled ? "not-allowed" : "pointer",
            opacity: runtimeDisabled ? 0.6 : 1,
            boxShadow: `inset 0 0 0 1px ${
              runtimeState === "running"
                ? "rgba(34, 197, 94, 0.42)"
                : "rgba(255, 255, 255, 0.08)"
            }`,
            transition:
              "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease",
          }}
        >
          {runtimeShowSpinner ? (
            <span className={css.spinner} aria-hidden="true" />
          ) : (
            <span aria-hidden="true">{runIcon}</span>
          )}
        </button>
        <span className={css.tooltip} role="tooltip">
          {runtimeLabel}
        </span>
      </span>
      <span className={css.tooltipWrap}>
        <button
          type="button"
          className={css.generateBtn}
          data-ready={generateReady ? "true" : "false"}
          onClick={onGenerate}
          disabled={generateDisabled}
          aria-label={generateLabel}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            paddingInline: "18px",
            height: "36px",
            border: "none",
            borderRadius: "999px",
            background: generateDisabled
              ? "rgba(186, 158, 255, 0.18)"
              : `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT_DIM} 100%)`,
            color: generateDisabled ? SURFACE_MUTED : ACCENT_ON,
            fontFamily:
              'var(--font-ui, "Inter", system-ui, -apple-system, sans-serif)',
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.02em",
            cursor: generateDisabled ? "not-allowed" : "pointer",
            boxShadow: generateDisabled
              ? "none"
              : "0 6px 20px -6px rgba(132, 85, 239, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
            transition:
              "transform 160ms ease, box-shadow 160ms ease, color 160ms ease",
            whiteSpace: "nowrap",
          }}
        >
          {generateBusy ? (
            <span className={css.spinner} aria-hidden="true" />
          ) : (
            <span style={{ fontSize: "11px" }} aria-hidden="true">
              ▶
            </span>
          )}
          <span>{generateBusy ? "Running" : "Generate"}</span>
        </button>
        <span className={css.tooltip} role="tooltip">
          {generateLabel}
        </span>
      </span>
    </div>,
    document.body,
  );
}
