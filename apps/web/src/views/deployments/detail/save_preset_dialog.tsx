import { useEffect, useId, useState } from "react";
import { Button } from "../../../components/base/button";
import { Input } from "../../../components/base/input";
import * as s from "../../../components/base/confirm_dialog.css";
import * as f from "./save_preset_dialog.css";

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
  const nameId = useId();
  const descId = useId();
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

        <div className={f.body}>
          <div className={f.field}>
            <label className={f.fieldLabel} htmlFor={nameId}>
              Name
            </label>
            <Input
              id={nameId}
              type="text"
              value={name}
              autoFocus
              disabled={busy}
              maxLength={120}
              placeholder="e.g. Production (fp8)"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={f.field}>
            <label className={f.fieldLabel} htmlFor={descId}>
              Description (optional)
            </label>
            <textarea
              id={descId}
              className={f.textarea}
              value={description}
              disabled={busy}
              rows={3}
              maxLength={500}
              placeholder="What does this preset capture?"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
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
