import { useEffect, useId, useState } from "react";
import { Button } from "../../../components/base/button";
import * as s from "../../../components/base/confirm_dialog.css";

export interface SavePresetDialogProps {
  readonly open: boolean;
  readonly title: string;
  readonly busy?: boolean;
  readonly onSave: (name: string, description: string) => void;
  readonly onCancel: () => void;
}

export function SavePresetDialog({
  open,
  title,
  busy = false,
  onSave,
  onCancel,
}: SavePresetDialogProps) {
  const titleId = useId();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Reset fields each time the dialog opens.
  useEffect(() => {
    if (open) {
      setName("");
      setDescription("");
    }
  }, [open]);

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

  if (!open) return null;

  const trimmed = name.trim();

  return (
    <div className={s.scrim} role="presentation" onClick={busy ? undefined : onCancel}>
      <div
        className={s.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={s.header}>
          <h2 id={titleId} className={s.title}>
            {title}
          </h2>
        </header>

        <div className={s.body}>
          <label>
            Name
            <input
              type="text"
              value={name}
              autoFocus
              disabled={busy}
              maxLength={120}
              onChange={(e) => setName(e.target.value)}
              aria-label="Preset name"
            />
          </label>
          <label>
            Description (optional)
            <textarea
              value={description}
              disabled={busy}
              rows={2}
              maxLength={500}
              onChange={(e) => setDescription(e.target.value)}
              aria-label="Preset description"
            />
          </label>
        </div>

        <footer className={s.footer}>
          <Button type="button" variant="ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={busy || trimmed.length === 0}
            aria-busy={busy || undefined}
            onClick={() => onSave(trimmed, description.trim())}
          >
            {busy ? "Saving…" : "Save preset"}
          </Button>
        </footer>
      </div>
    </div>
  );
}
