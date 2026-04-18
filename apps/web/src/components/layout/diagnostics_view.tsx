import { useState, type ReactNode } from "react";
import { Button } from "../button";
import * as styles from "./backend_styles.css";
import * as layoutStyles from "./layout_styles.css";

type FailureData = {
  category: string;
  message: string;
  detail: string;
  command?: string;
  remediation: string;
  binaryPath?: string;
  modelPath?: string;
};

type NextAction = {
  label: string;
  action: string;
};

type DiagnosticsViewProps = {
  failure?: FailureData;
  nextAction?: NextAction;
  onAction?: (action: string) => void;
  children?: ReactNode;
};

export function DiagnosticsView({
  failure,
  nextAction,
  onAction,
  children,
}: DiagnosticsViewProps) {
  const [copied, setCopied] = useState(false);

  if (!failure) return null;

  function handleCopy() {
    if (failure?.command) {
      navigator.clipboard.writeText(failure.command).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  return (
    <div className={styles.diagContainer}>
      <span className={styles.diagCategoryBadge}>{failure.category}</span>
      <span className={styles.diagMessage}>{failure.message}</span>

      {failure.detail && (
        <div className={styles.diagDetail}>{failure.detail}</div>
      )}

      {failure.command && (
        <div className={styles.diagCommandRow}>
          <span className={styles.diagCommandText}>{failure.command}</span>
          <button
            type="button"
            className={styles.diagCopyButton}
            onClick={handleCopy}
          >
            <span className={`material-symbols-outlined ${layoutStyles.iconInherit}`}>
              {copied ? "check" : "content_copy"}
            </span>
          </button>
        </div>
      )}

      {failure.binaryPath && (
        <div className={styles.diagPathRow}>
          <span className={styles.diagPathLabel}>Binary:</span>
          <span className={styles.diagPathValue}>{failure.binaryPath}</span>
        </div>
      )}

      {failure.modelPath && (
        <div className={styles.diagPathRow}>
          <span className={styles.diagPathLabel}>Model:</span>
          <span className={styles.diagPathValue}>{failure.modelPath}</span>
        </div>
      )}

      <div className={styles.diagRemediation}>{failure.remediation}</div>

      {nextAction && (
        <div>
          <Button
            variant="primary"
            size="md"
            onClick={() => onAction?.(nextAction.action)}
          >
            {nextAction.label}
          </Button>
        </div>
      )}

      {children}
    </div>
  );
}
