import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import {
  getRuntimeHealth,
  startRuntime,
  stopRuntime,
  type RuntimeHealth,
} from "../../../services/runtime_client";
import * as css from "./sticky_action_bar.css";

interface Props {
  visible: boolean;
  /** True when the script has content + Generate is otherwise eligible. */
  canGenerate: boolean;
}

interface RunStateDetail {
  busy: boolean;
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

  useEffect(() => {
    let cancelled = false;
    const poll = async (): Promise<void> => {
      try {
        const h = await getRuntimeHealth();
        if (!cancelled) setHealth(h);
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
    const onState = (event: Event): void => {
      const detail = (event as CustomEvent<RunStateDetail>).detail;
      setGenerateBusy(Boolean(detail?.busy));
    };
    window.addEventListener("emotion-tts:run-state", onState);
    return () => window.removeEventListener("emotion-tts:run-state", onState);
  }, []);

  const onGenerate = useCallback((): void => {
    window.dispatchEvent(new CustomEvent("emotion-tts:trigger-generate"));
  }, []);

  const badge = health?.badge ?? "not_installed";
  const isRunning = badge === "ready" || badge === "running";
  const isStarting = badge === "starting" || badge === "installing";
  const runtimeReady = isRunning;

  const onRunClick = useCallback(async (): Promise<void> => {
    setRuntimeBusy(true);
    try {
      if (isRunning) {
        await stopRuntime();
        toast.success("Runtime stopped");
      } else {
        await startRuntime();
        toast.success("Runtime starting…");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "runtime action failed");
    } finally {
      setRuntimeBusy(false);
    }
  }, [isRunning]);

  const runtimeLabel = isRunning
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
  const statusTone: StatusTone = isRunning
    ? "ready"
    : isStarting || runtimeBusy
      ? "busy"
      : "off";
  const statusText = isRunning
    ? "Runtime ready"
    : isStarting
      ? "Starting…"
      : runtimeBusy
        ? "Working…"
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
