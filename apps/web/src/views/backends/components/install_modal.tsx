import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, m } from "motion/react";
import { sharedModalTransition } from "../../../theme/motion";
import * as css from "./install_modal.css";

const PHASES = [
  "resolve",
  "download",
  "verify",
  "extract",
  "detect",
  "validate",
  "persist",
  "complete",
] as const;

type PhaseName = (typeof PHASES)[number];

export interface InstallStreamEvent {
  topic: string;
  payload: Record<string, unknown>;
  emitted_at: number;
}

interface Props {
  backendId: string;
  onClose: () => void;
  eventsSource: AsyncIterable<InstallStreamEvent>;
}

type TerminalState = "none" | "completed" | "cancelled" | "failed";

interface LogLine {
  message: string;
  level: "info" | "error";
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(units.length - 1, Math.floor(Math.log10(bytes) / 3));
  const value = bytes / 10 ** (i * 3);
  return `${value.toFixed(value < 10 && i > 0 ? 2 : 1)} ${units[i]}`;
}

function formatElapsed(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function InstallModal({ backendId, onClose, eventsSource }: Props) {
  const [currentPhase, setCurrentPhase] = useState<PhaseName>("resolve");
  const [bytesDl, setBytesDl] = useState<number>(0);
  const [bytesTotal, setBytesTotal] = useState<number | null>(null);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [terminal, setTerminal] = useState<TerminalState>("none");
  const [startedAt] = useState<number>(() => Date.now());
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [failureSummary, setFailureSummary] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (terminal !== "none") return;
    const id = window.setInterval(() => setElapsedMs(Date.now() - startedAt), 500);
    return () => window.clearInterval(id);
  }, [startedAt, terminal]);

  useEffect(() => {
    let alive = true;
    (async () => {
      for await (const evt of eventsSource) {
        if (!alive) return;
        if (evt.topic === "llm.backend.install.progress") {
          const p = evt.payload as {
            phase?: string;
            bytes_downloaded?: number;
            bytes_total?: number | null;
          };
          if (typeof p.phase === "string" && (PHASES as readonly string[]).includes(p.phase)) {
            setCurrentPhase(p.phase as PhaseName);
          }
          if (typeof p.bytes_downloaded === "number") setBytesDl(p.bytes_downloaded);
          if (typeof p.bytes_total === "number" || p.bytes_total === null) {
            setBytesTotal(p.bytes_total ?? null);
          }
        } else if (evt.topic === "llm.backend.install.completed") {
          setTerminal("completed");
          setCurrentPhase("complete");
        } else if (evt.topic === "llm.backend.install.failed") {
          setTerminal("failed");
          const p = evt.payload as { summary?: string; phase?: string };
          if (p.summary) {
            setFailureSummary(p.summary);
            setLogs((prev) => [...prev, { message: `FAILED: ${p.summary}`, level: "error" }]);
          }
        } else if (evt.topic === "llm.backend.log") {
          const p = evt.payload as { message?: string; severity?: string };
          if (p.message) {
            const level: LogLine["level"] =
              p.severity === "error" || p.severity === "warn" ? "error" : "info";
            setLogs((prev) => [...prev.slice(-499), { message: p.message as string, level }]);
          }
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [eventsSource]);

  useLayoutEffect(() => {
    const el = logRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [logs]);

  const fraction =
    bytesTotal && bytesTotal > 0 ? Math.min(100, (bytesDl / bytesTotal) * 100) : 0;
  const isIndeterminate = currentPhase !== "download" && terminal === "none";
  const cancellable =
    terminal === "none" && ["resolve", "download", "verify", "extract"].includes(currentPhase);
  const currentIdx = PHASES.indexOf(currentPhase);

  const phaseStates = useMemo(
    () =>
      PHASES.map((_phase, idx) => {
        if (terminal === "completed") return "done" as const;
        if (terminal === "failed" && idx === currentIdx) return "failed" as const;
        if (idx < currentIdx) return "done" as const;
        if (idx === currentIdx) return "active" as const;
        return "pending" as const;
      }),
    [currentIdx, terminal],
  );

  const statusLabel =
    terminal === "completed"
      ? "Completed"
      : terminal === "failed"
        ? "Failed"
        : `In progress · ${currentPhase}`;

  const downloadLine =
    currentPhase === "download" || (bytesDl > 0 && terminal === "none")
      ? bytesTotal
        ? `${formatBytes(bytesDl)} / ${formatBytes(bytesTotal)}`
        : formatBytes(bytesDl)
      : null;

  return (
    <LazyMotion features={domAnimation} strict>
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`install-title-${backendId}`}
    >
      <m.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={sharedModalTransition}
        className={css.dialog}
        data-testid={`install-modal-${backendId}`}
        data-install-modal-id={backendId}
      >
        <header className={css.header}>
          <div className={css.titleBlock}>
            <span className={css.eyebrow}>Backend install</span>
            <h2 className={css.title} id={`install-title-${backendId}`}>
              Installing {backendId}
            </h2>
            <span className={css.subtitle}>{statusLabel}</span>
          </div>
          <div className={css.statusCluster}>
            <span
              className={css.statusBadge}
              data-status={
                terminal === "completed"
                  ? "completed"
                  : terminal === "failed"
                    ? "failed"
                    : "running"
              }
            >
              {terminal === "completed"
                ? "Ready"
                : terminal === "failed"
                  ? "Error"
                  : "Live"}
            </span>
            <button
              type="button"
              className={css.closeButton}
              aria-label="Close"
              onClick={onClose}
              data-testid="install-close-x"
            >
              ×
            </button>
          </div>
        </header>

        <ol className={css.phaseList} aria-label="Install phases">
          {PHASES.map((phase, idx) => {
            const state = phaseStates[idx];
            return (
              <li
                className={css.phaseItem}
                key={phase}
                data-phase={phase}
                data-state={state}
              >
                <span className={css.phaseIcon} aria-hidden>
                  {state === "done"
                    ? "✓"
                    : state === "active"
                      ? <span className={css.spinner} />
                      : state === "failed"
                        ? "!"
                        : idx + 1}
                </span>
                <span className={css.phaseLabel}>{phase}</span>
                <span className={css.phaseMeta}>
                  {state === "active" && phase === "download" && downloadLine
                    ? downloadLine
                    : state === "active"
                      ? "working…"
                      : state === "done"
                        ? "done"
                        : ""}
                </span>
              </li>
            );
          })}
        </ol>

        <div className={css.progressSection}>
          <div className={css.progressHeader}>
            <span className={css.progressHeaderLeft}>
              {currentPhase === "download"
                ? "Downloading"
                : terminal === "completed"
                  ? "Installed"
                  : terminal === "failed"
                    ? "Halted"
                    : `Phase: ${currentPhase}`}
            </span>
            <span>
              {currentPhase === "download" && bytesTotal
                ? `${Math.round(fraction)}%`
                : downloadLine ?? ""}
            </span>
          </div>
          <div className={css.progressBar}>
            {isIndeterminate ? (
              <div className={css.progressFillIndeterminate} />
            ) : (
              <div
                className={css.progressFill}
                style={{
                  width: `${
                    terminal === "completed" ? 100 : terminal === "failed" ? fraction || 4 : fraction
                  }%`,
                }}
              />
            )}
          </div>
        </div>

        <div className={css.logPanel} data-testid="install-logs" ref={logRef}>
          {logs.length === 0 ? (
            <div className={css.logEmpty}>
              <span className={css.logPulse} />
              {terminal === "none"
                ? "Waiting for runtime output…"
                : terminal === "completed"
                  ? "Install finished without emitting log output."
                  : failureSummary ?? "No output."}
            </div>
          ) : (
            logs.map((line, idx) => (
              <div className={css.logLine} key={idx} data-level={line.level}>
                {line.message}
              </div>
            ))
          )}
        </div>

        <footer className={css.footer}>
          <span className={css.elapsed}>Elapsed {formatElapsed(elapsedMs)}</span>
          {cancellable && (
            <button type="button" className={css.buttonGhost}>
              Cancel
            </button>
          )}
          {terminal === "none" && !cancellable && (
            <button type="button" className={css.buttonGhost} onClick={onClose}>
              Hide
            </button>
          )}
          {terminal !== "none" && (
            <button
              type="button"
              className={css.buttonPrimary}
              onClick={onClose}
              data-testid="install-close"
            >
              {terminal === "completed" ? "Done" : "Close"}
            </button>
          )}
        </footer>
      </m.div>
    </div>
    </LazyMotion>
  );
}
