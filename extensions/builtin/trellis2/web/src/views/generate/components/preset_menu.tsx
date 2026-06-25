import { type ReactElement, useEffect, useRef, useState } from "react";
import type { GeneratePreset, PresetId } from "../../../domain/presets";
import * as styles from "./preset_menu.css";

export interface PresetMenuProps {
  presets: readonly GeneratePreset[];
  /** The preset whose pinned values currently match the form, or null (custom). */
  activeId: PresetId | null;
  disabled: boolean;
  onApply: (preset: GeneratePreset) => void;
}

/** Compact "Presets ▾" dropdown — one button that lists the extension-shipped
 * quality presets and applies a full param set on pick. Replaces the inline
 * preset button row. Closes on outside click or after a selection. */
export function PresetMenu({ presets, activeId, disabled, onApply }: PresetMenuProps): ReactElement {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const activeLabel = presets.find((preset) => preset.id === activeId)?.label ?? "Custom";

  useEffect(() => {
    if (!open) return;
    function onDocMouseDown(event: MouseEvent): void {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={styles.trigger}
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.triggerIcon} aria-hidden="true">
          tune
        </span>
        <span className={styles.triggerLabel}>Presets</span>
        <span className={styles.triggerValue}>{activeLabel}</span>
        <span className={styles.triggerChevron} data-open={open} aria-hidden="true">
          expand_more
        </span>
      </button>

      {open && (
        <div className={styles.menu} role="menu" aria-label="Quality presets">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              role="menuitemradio"
              aria-checked={preset.id === activeId}
              className={styles.item}
              data-active={preset.id === activeId}
              disabled={disabled}
              onClick={() => {
                onApply(preset);
                setOpen(false);
              }}
            >
              <span className={styles.itemLabel}>{preset.label}</span>
              <span className={styles.itemHint}>{preset.hint}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
