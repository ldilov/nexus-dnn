import { useRef, useEffect, type ReactNode } from "react";
import { Button } from "../button";
import { ProgressTracker } from "./progress_tracker";
import * as styles from "./backend_styles.css";

type Phase = {
  name: string;
  status: string;
};

type InstallProgress = {
  percent: number;
  bytesLoaded?: number;
  bytesTotal?: number;
};

type InstallModalProps = {
  visible?: boolean;
  phases?: Phase[];
  logs?: string[];
  progress?: InstallProgress;
  elapsed?: string;
  onClose?: () => void;
  onCancel?: () => void;
  children?: ReactNode;
};

function phaseDotClass(status: string): string {
  if (status === "completed") return `${styles.modalPhaseDot} ${styles.modalPhaseDotCompleted}`;
  if (status === "in_progress") return `${styles.modalPhaseDot} ${styles.modalPhaseDotActive}`;
  return styles.modalPhaseDot;
}

function phaseItemClass(status: string): string {
  if (status === "in_progress") return `${styles.modalPhaseItem} ${styles.modalPhaseItemActive}`;
  if (status === "completed") return `${styles.modalPhaseItem} ${styles.modalPhaseItemCompleted}`;
  return styles.modalPhaseItem;
}

export function InstallModal({
  visible = false,
  phases = [],
  logs = [],
  progress = { percent: 0 },
  elapsed,
  onClose,
  onCancel,
  children,
}: InstallModalProps) {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs.length]);

  if (!visible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>Runtime Installation</span>
          <button
            type="button"
            className={styles.modalCloseButton}
            onClick={onClose}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "inherit" }}>
              close
            </span>
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalPhaseList}>
            {phases.map((phase, i) => (
              <div key={i} className={phaseItemClass(phase.status)}>
                <span className={phaseDotClass(phase.status)} />
                {phase.name}
              </div>
            ))}
          </div>

          <div className={styles.modalLogPane}>
            <div ref={logRef} className={styles.modalLogContent}>
              {logs.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <div style={{ flex: 1 }}>
            <ProgressTracker
              label={elapsed ? `Elapsed: ${elapsed}` : undefined}
              percent={progress.percent}
              bytesLoaded={progress.bytesLoaded}
              bytesTotal={progress.bytesTotal}
            />
          </div>
          <Button variant="danger" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        {children}
      </div>
    </div>
  );
}
