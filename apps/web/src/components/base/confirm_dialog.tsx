import { useCallback, useEffect, useId } from "react";
import { Button } from "./button";
import * as s from "./confirm_dialog.css";

export interface ConfirmDialogProps {
  readonly open: boolean;
  readonly title: string;
  readonly eyebrow?: string;
  readonly description: string;
  readonly impactLines?: readonly string[];
  readonly confirmLabel: string;
  readonly cancelLabel?: string;
  readonly destructive?: boolean;
  readonly busy?: boolean;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  eyebrow,
  description,
  impactLines,
  confirmLabel,
  cancelLabel = "Cancel",
  destructive = false,
  busy = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open) return;
    // Focus the destructive confirm button on open via a microtask so the
    // dialog has had a chance to mount.
    const id = window.requestAnimationFrame(() => {
      const node = document.querySelector<HTMLButtonElement>(
        `[data-confirm-dialog-action="${descId}"]`,
      );
      node?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [open, descId]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !busy) {
        e.preventDefault();
        onCancel();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, busy, onCancel]);

  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!open) return null;

  return (
    <div className={s.scrim} role="presentation" onClick={busy ? undefined : onCancel}>
      <div
        className={s.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={stopPropagation}
      >
        <header className={s.header}>
          {eyebrow && <span className={s.eyebrow}>{eyebrow}</span>}
          <h2 id={titleId} className={s.title}>
            {title}
          </h2>
        </header>

        <div className={s.body} id={descId}>
          <p>{description}</p>
          {impactLines && impactLines.length > 0 && (
            <ul className={s.list}>
              {impactLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}
        </div>

        <footer className={s.footer}>
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={busy}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={destructive ? "danger" : "primary"}
            onClick={onConfirm}
            disabled={busy}
            aria-busy={busy || undefined}
            data-confirm-dialog-action={descId}
          >
            {busy ? "Working…" : confirmLabel}
          </Button>
        </footer>
      </div>
    </div>
  );
}
