import * as styles from "./header_model_button.css";

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
      aria-label={hasLabel ? `Active model: ${label}. Open model load dialog.` : "Open model load dialog"}
    >
      <span className={hasLabel ? undefined : styles.placeholder}>
        {hasLabel ? label : "Select model"}
      </span>
      <span className={styles.chevron} aria-hidden="true">▾</span>
    </button>
  );
}
