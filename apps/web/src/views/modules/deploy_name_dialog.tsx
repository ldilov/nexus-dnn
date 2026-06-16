import { useEffect, useId, useState } from "react";
import { Button } from "../../components/base/button";
import * as s from "../../components/base/confirm_dialog.css";

export interface DeployNameDialogProps {
  readonly open: boolean;
  readonly defaultName: string;
  readonly busy?: boolean;
  readonly onConfirm: (name: string) => void;
  readonly onCancel: () => void;
}

export function DeployNameDialog({
  open,
  defaultName,
  busy = false,
  onConfirm,
  onCancel,
}: DeployNameDialogProps) {
  const titleId = useId();
  const [name, setName] = useState(defaultName);

  useEffect(() => {
    if (open) setName(defaultName);
  }, [open, defaultName]);

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

  const submit = () => {
    if (busy) return;
    onConfirm(name.trim() || defaultName);
  };

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
          <span className={s.eyebrow}>Deploy</span>
          <h2 id={titleId} className={s.title}>
            Name this deployment
          </h2>
        </header>

        <div className={s.body}>
          <input
            className={s.input}
            value={name}
            autoFocus
            placeholder={defaultName}
            disabled={busy}
            aria-label="Deployment name"
            onFocus={(e) => e.currentTarget.select()}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
          />
        </div>

        <footer className={s.footer}>
          <Button type="button" variant="ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={submit}
            disabled={busy}
            aria-busy={busy || undefined}
          >
            {busy ? "Deploying…" : "Deploy"}
          </Button>
        </footer>
      </div>
    </div>
  );
}
