import { Button } from "../components/button";
import * as styles from "./top_bar.css";

type TopBarProps = {
  projectName: string;
  isDirty?: boolean;
  onRun: () => void;
  onCancel: () => void;
  onValidate: () => void;
  isRunning: boolean;
  onCommandPalette?: () => void;
};

export function TopBar({
  projectName,
  isDirty = false,
  onRun,
  onCancel,
  onValidate,
  isRunning,
  onCommandPalette,
}: TopBarProps) {
  return (
    <>
      <div className={styles.leftZone}>
        <span className={styles.logo}>N</span>
        <span className={styles.projectName} title={projectName}>
          {projectName}
        </span>
        {!isDirty && <span className={styles.savedDot} title="Saved" />}
      </div>

      <div className={styles.centerZone}>
        <button
          className={styles.commandTrigger}
          onClick={onCommandPalette}
          aria-label="Open command palette"
        >
          Search or run a command...
          <span className={styles.shortcutHint}>Ctrl+K</span>
        </button>
      </div>

      <div className={styles.rightZone}>
        <div className={styles.controlGroup}>
          <Button variant="ghost" size="sm" onClick={onValidate}>
            Validate
          </Button>
          {isRunning ? (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={onRun}>
              Run
            </Button>
          )}
        </div>
        <div className={styles.healthBadge}>
          <span className={styles.healthDot} />
          Healthy
        </div>
      </div>
    </>
  );
}
