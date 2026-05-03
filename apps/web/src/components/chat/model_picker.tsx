import { useEffect, useRef, useState } from "react";
import * as styles from "./model_picker.css";

export interface ModelOption {
  id: string;
  label: string;
  badge?: string;
  contextUsedPct?: number;
}

interface ModelPickerProps {
  models: ReadonlyArray<ModelOption>;
  activeModelId: string | null;
  onSelect?: (id: string) => Promise<void>;
  status?: "ready" | "loading" | "unavailable";
  onOpenBackends?: () => void;
}

export function ModelPicker({ models, activeModelId, onSelect, status = "ready", onOpenBackends }: ModelPickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = models.find((m) => m.id === activeModelId);
  const readonly = !onSelect;

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const label = active?.label ?? (status === "unavailable" ? "No model" : status === "loading" ? "Loading…" : "Select model");

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => !readonly && setOpen((v) => !v)}
        disabled={readonly && !active}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Model picker"
      >
        <span className={styles.triggerLabel}>{label}</span>
        {active?.badge ? <span className={styles.itemBadge}>{active.badge}</span> : null}
      </button>
      {status === "unavailable" && onOpenBackends ? (
        <button
          type="button"
          className={styles.recoveryLink}
          onClick={onOpenBackends}
        >
          Open Backends ↗
        </button>
      ) : null}
      {open && !readonly && (
        <div className={styles.dropdown} role="listbox" aria-label="Available models">
          {models.map((m) => (
            <button
              key={m.id}
              type="button"
              role="option"
              aria-selected={m.id === activeModelId}
              className={styles.item}
              onClick={async () => {
                setOpen(false);
                if (onSelect) await onSelect(m.id);
              }}
            >
              <span className={styles.itemLeft}>
                <span>{m.label}</span>
                {m.contextUsedPct !== undefined ? (
                  <span className={styles.itemContext}>
                    {Math.round(m.contextUsedPct * 100)}% context
                  </span>
                ) : null}
              </span>
              {m.badge ? <span className={styles.itemBadge}>{m.badge}</span> : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
