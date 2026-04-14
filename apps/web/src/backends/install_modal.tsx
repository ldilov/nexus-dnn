import { useEffect, useState } from "react";
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
];

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

export function InstallModal({ backendId, onClose, eventsSource }: Props) {
  const [currentPhase, setCurrentPhase] = useState<string>("resolve");
  const [bytesDl, setBytesDl] = useState<number>(0);
  const [bytesTotal, setBytesTotal] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [terminal, setTerminal] = useState<TerminalState>("none");

  useEffect(() => {
    let alive = true;
    (async () => {
      for await (const evt of eventsSource) {
        if (!alive) return;
        if (evt.topic === "llm.backend.install.progress") {
          const p = evt.payload as {
            phase: string;
            bytes_downloaded: number;
            bytes_total: number | null;
          };
          setCurrentPhase(p.phase);
          setBytesDl(p.bytes_downloaded);
          setBytesTotal(p.bytes_total);
        } else if (evt.topic === "llm.backend.install.completed") {
          setTerminal("completed");
        } else if (evt.topic === "llm.backend.install.failed") {
          setTerminal("failed");
          const p = evt.payload as { summary?: string };
          if (p.summary) setLogs((prev) => [...prev, `FAILED: ${p.summary}`]);
        } else if (evt.topic === "llm.backend.log") {
          const p = evt.payload as { message?: string };
          if (p.message) setLogs((prev) => [...prev.slice(-499), p.message as string]);
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [eventsSource]);

  const fraction =
    bytesTotal && bytesTotal > 0 ? Math.min(100, (bytesDl / bytesTotal) * 100) : 0;
  const cancellable =
    terminal === "none" && ["resolve", "download", "verify", "extract"].includes(currentPhase);

  return (
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.dialog} data-testid={`install-modal-${backendId}`}>
        <header>
          <h2>Installing {backendId}</h2>
        </header>
        <ol className={css.phaseList}>
          {PHASES.map((phase) => {
            const idxCurrent = PHASES.indexOf(currentPhase);
            const idxPhase = PHASES.indexOf(phase);
            const status =
              terminal === "completed"
                ? "✓"
                : idxPhase < idxCurrent
                  ? "✓"
                  : idxPhase === idxCurrent
                    ? "◌"
                    : "·";
            return (
              <li className={css.phaseItem} key={phase} data-phase={phase}>
                <span>{status}</span>
                <span>{phase}</span>
              </li>
            );
          })}
        </ol>
        <div className={css.progressBar}>
          <div className={css.progressFill} style={{ width: `${fraction}%` }} />
        </div>
        <div className={css.logPanel} data-testid="install-logs">
          {logs.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
        <footer style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          {cancellable && <button type="button">Cancel</button>}
          {terminal !== "none" && (
            <button type="button" onClick={onClose} data-testid="install-close">
              Close
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
