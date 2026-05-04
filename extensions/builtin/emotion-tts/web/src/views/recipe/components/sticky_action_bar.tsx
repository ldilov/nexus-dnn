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
      }}
    >
      <span
        className={css.statusPill}
        data-tone={statusTone}
        aria-live="polite"
      >
        <span
          className={css.statusDot}
          data-pulse={statusPulse ? "true" : "false"}
          aria-hidden="true"
        />
        {statusText}
      </span>
      <span className={css.divider} aria-hidden="true" />
      <span className={css.tooltipWrap}>
        <button
          type="button"
          className={css.runBtn}
          data-state={runtimeState}
          onClick={onRunClick}
          disabled={runtimeDisabled}
          aria-label={runtimeLabel}
        >
          {runtimeShowSpinner ? (
            <span className={css.spinner} aria-hidden="true" />
          ) : isRunning ? (
            <span className={css.glyph} aria-hidden="true">
              ◼
            </span>
          ) : (
            <span className={css.glyph} aria-hidden="true">
              ⏻
            </span>
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
        >
          {generateBusy ? (
            <span className={css.spinner} aria-hidden="true" />
          ) : (
            <span className={css.glyph} aria-hidden="true">
              ▶
            </span>
          )}
          <span className={css.generateLabel}>
            {generateBusy ? "Running" : "Generate"}
          </span>
        </button>
        <span className={css.tooltip} role="tooltip">
          {generateLabel}
        </span>
      </span>
    </div>,
    document.body,
  );
}
