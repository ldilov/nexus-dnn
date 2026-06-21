import { type ReactElement, useEffect, useRef } from "react";
import { Button } from "./button";
import * as styles from "./confirm_dialog.css";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Lightweight modal confirm. Renders nothing when closed. Focuses the confirm
 * button on open and closes on Escape or scrim click. */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps): ReactElement | null {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const onCancelRef = useRef(onCancel);
  onCancelRef.current = onCancel;

  useEffect(() => {
    if (!open) return;
    dialogRef.current
      ?.querySelector<HTMLButtonElement>("button[data-confirm]")
      ?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancelRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: scrim dismiss is a convenience; Escape is handled above
    <div className={styles.scrim} onClick={onCancel}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={styles.title}>{title}</span>
        <span className={styles.message}>{message}</span>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="primary" onClick={onConfirm} data-confirm>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
