import { type ReactElement, useId } from "react";
import type { InstalledLora } from "../../../services/installed_loras";
import * as styles from "./quick_controls.css";

interface LoraPickerProps {
  label: string;
  pickerId: string;
  value: string | null | undefined;
  weight: number;
  options: InstalledLora[];
  onChange: (path: string | null) => void;
  onWeight: (n: number) => void;
}

const NONE_VALUE = "__none__";

export function LoraPicker({
  label,
  pickerId,
  value,
  weight,
  options,
  onChange,
  onWeight,
}: LoraPickerProps): ReactElement {
  const weightId = useId();

  const handleSelect = (raw: string) => {
    onChange(raw === NONE_VALUE ? null : raw);
  };

  const selected = value ?? NONE_VALUE;
  const weightDisplay = weight.toFixed(2);

  return (
    <div className={styles.group}>
      <label className={styles.groupLabel} htmlFor={pickerId}>
        {label}
      </label>
      <div className={styles.selectWrap}>
        <select
          id={pickerId}
          className={styles.select}
          value={selected}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value={NONE_VALUE}>None</option>
          {options.map((lora) => (
            <option key={lora.artifactId} value={lora.installPath}>
              {lora.filename}{lora.familyId ? ` (${lora.familyId.replace(/^[^:]+:/, "")})` : ""}
            </option>
          ))}
        </select>
        <span className={styles.selectChevron} aria-hidden="true">
          <svg viewBox="0 0 16 16" width="100%" height="100%" fill="none" aria-hidden="true">
            <title>open</title>
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      {selected !== NONE_VALUE && (
        <div className={styles.customRow}>
          <label className={styles.groupLabel} htmlFor={weightId}>
            weight
          </label>
          <input
            id={weightId}
            type="range"
            min={0}
            max={2}
            step={0.05}
            value={weight}
            onChange={(e) => onWeight(parseFloat(e.target.value))}
            style={{ flex: 1 }}
          />
          <span className={styles.summary}>{weightDisplay}</span>
        </div>
      )}
    </div>
  );
}
