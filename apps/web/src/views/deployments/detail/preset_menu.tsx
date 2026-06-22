import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/base/button";
import type { PresetSummary } from "../../../services/deployment_presets";
import * as s from "./preset_menu.css";

export interface PresetMenuProps {
  presets: PresetSummary[];
  busy: boolean;
  onApply: (preset: PresetSummary) => void;
  onDelete: (preset: PresetSummary) => void;
  onSaveCurrent: () => void;
}

export function PresetMenu({ presets, busy, onApply, onDelete, onSaveCurrent }: PresetMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div className={s.wrap} ref={wrapRef}>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        loading={busy}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          tune
        </span>
        Presets
      </Button>

      {open && (
        <div className={s.menu} role="menu" aria-label="Deployment presets">
          {presets.length === 0 && <p className={s.empty}>No presets yet.</p>}
          {presets.map((p) => (
            <div className={s.row} role="none" key={p.id}>
              <button
                className={s.item}
                role="menuitem"
                type="button"
                disabled={busy}
                onClick={() => {
                  onApply(p);
                  setOpen(false);
                }}
              >
                {p.name}
              </button>
              <button
                className={s.iconBtn}
                type="button"
                aria-label={`Delete preset ${p.name}`}
                disabled={busy}
                onClick={() => onDelete(p)}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  delete
                </span>
              </button>
            </div>
          ))}
          {presets.length > 0 && <div className={s.divider} role="none" />}
          <button
            className={s.item}
            role="menuitem"
            type="button"
            disabled={busy}
            onClick={() => {
              onSaveCurrent();
              setOpen(false);
            }}
          >
            Save current as preset…
          </button>
        </div>
      )}
    </div>
  );
}
