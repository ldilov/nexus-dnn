import { useEffect, useState } from "react";
import type { PhaseEvent } from "../../../services/backend_runtimes_client";
import { PHASE_ORDER, subscribeInstallProgress } from "../../../services/backend_runtimes_client";
import * as css from "../backend_runtimes.css";

interface Props {
  installId: string;
  onTerminal: (terminal: string) => void;
  onClose: () => void;
}

type PhaseState = "queued" | "running" | "completed" | "failed";

interface PhaseRow {
  state: PhaseState;
  elapsed_ms: number;
  failure_detail?: string;
}

/**
 * T069 — SSE-driven pipeline stepper. Subscribes to
 * `/backend-runtime-installs/:id/progress`, renders the ten canonical
 * phases as a vertical stepper, displays elapsed ms per completed
 * phase, and collapses failure detail when the stream terminates
 * with `failed`.
 */
export function PipelineProgress({ installId, onTerminal, onClose }: Props) {
  const [rows, setRows] = useState<Record<string, PhaseRow>>(() =>
    Object.fromEntries(
      PHASE_ORDER.map((phase) => [phase, { state: "queued" as PhaseState, elapsed_ms: 0 }]),
    ),
  );
  const [terminal, setTerminal] = useState<string | null>(null);

  useEffect(() => {
    const cleanup = subscribeInstallProgress(installId, {
      onPhase: (evt: PhaseEvent) => {
        setRows((prev) => ({
          ...prev,
          [evt.phase]: {
            state:
              evt.state === "started"
                ? "running"
                : evt.state === "completed"
                  ? "completed"
                  : "failed",
            elapsed_ms: evt.elapsed_ms,
            failure_detail: evt.failure_detail ?? undefined,
          },
        }));
      },
      onDone: (payload) => {
        setTerminal(payload.terminal);
        onTerminal(payload.terminal);
      },
      onError: () => {
        // Don't surface every transient reconnect — just let the user close.
      },
    });
    return cleanup;
  }, [installId, onTerminal]);

  return (
    <div
      className={css.modalBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="progress-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && terminal) onClose();
      }}
    >
      <div className={css.modalPanel}>
        <div id="progress-title" className={css.modalTitle}>
          Installing{" "}
          <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "13px" }}>
            {installId.slice(0, 12)}…
          </span>
        </div>

        <div className={css.stepper}>
          {PHASE_ORDER.map((phase) => {
            const row: PhaseRow = rows[phase] ?? { state: "queued", elapsed_ms: 0 };
            const className = [
              css.stepperRow,
              row.state === "running" ? css.stepperRowActive : "",
              row.state === "completed" ? css.stepperRowDone : "",
              row.state === "failed" ? css.stepperRowFailed : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <div key={phase} className={className}>
                <span>
                  {row.state === "queued" && "○"}
                  {row.state === "running" && "◐"}
                  {row.state === "completed" && "●"}
                  {row.state === "failed" && "✕"} {phase}
                </span>
                <span className={css.stepperElapsed}>
                  {row.elapsed_ms > 0 ? `${row.elapsed_ms}ms` : ""}
                </span>
              </div>
            );
          })}
        </div>

        {Object.entries(rows)
          .filter(([, r]) => r.state === "failed" && r.failure_detail)
          .map(([phase, r]) => (
            <div key={phase} className={css.errorBox}>
              <strong>{phase}</strong>: {r.failure_detail}
            </div>
          ))}

        <div className={css.modalFooter}>
          <button
            type="button"
            className={css.actionButton}
            onClick={onClose}
            disabled={!terminal}
          >
            {terminal ? `Close (${terminal})` : "Running…"}
          </button>
        </div>
      </div>
    </div>
  );
}
