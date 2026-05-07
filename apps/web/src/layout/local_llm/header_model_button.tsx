import * as styles from "./header_model_button.css";
import { prettyModelLabel } from "./model_label";

interface HeaderModelButtonProps {
  label: string | null;
  onClick: () => void;
}

export function HeaderModelButton({ label, onClick }: Readonly<HeaderModelButtonProps>) {
  const hasLabel = label !== null && label.length > 0;
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-haspopup="dialog"
      title={hasLabel ? label ?? undefined : undefined}
      aria-label={hasLabel ? `Active model: ${label}. Open model load dialog.` : "Open model load dialog"}
    >
      <span className={`${styles.labelText} ${hasLabel ? "" : styles.placeholder}`}>
        {hasLabel ? prettyModelLabel(label!) : "Select model"}
      </span>
      <span className={styles.chevron} aria-hidden="true">▾</span>
    </button>
  );
}
