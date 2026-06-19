import { type ReactElement, useId } from "react";
import useSWR from "swr";
import { fetchInstalledLoras } from "../../../services/installed_loras";
import type { UserLoraParam } from "../../../services/types";
import { useRenderRequest } from "../../../store/render_request_store";
import {
  MAX_LORA_WEIGHT,
  MAX_LORAS,
  addLora,
  loraWeightHigh,
  loraWeightLow,
  removeLora,
  setLoraPath,
  setLoraWeightHigh,
  setLoraWeightLow,
} from "./lora_list";
import * as styles from "./quick_controls.css";

const NONE_VALUE = "__none__";

function WeightSlider({
  tier,
  value,
  onChange,
}: {
  tier: "High" | "Low";
  value: number;
  onChange: (n: number) => void;
}): ReactElement {
  const id = useId();
  return (
    <div className={styles.customRow}>
      <label className={styles.groupLabel} htmlFor={id} style={{ width: "34px" }}>
        {tier}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={MAX_LORA_WEIGHT}
        step={0.05}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ flex: 1 }}
      />
      <span className={styles.summary}>{value.toFixed(2)}</span>
    </div>
  );
}

function LoraRow({
  rowIndex,
  row,
  options,
  onPath,
  onWeightHigh,
  onWeightLow,
  onRemove,
}: {
  rowIndex: number;
  row: UserLoraParam;
  options: Awaited<ReturnType<typeof fetchInstalledLoras>>;
  onPath: (v: string | null) => void;
  onWeightHigh: (n: number) => void;
  onWeightLow: (n: number) => void;
  onRemove: () => void;
}): ReactElement {
  const selectId = useId();
  const selected = row.path.length > 0 ? row.path : NONE_VALUE;

  const handleSelect = (raw: string) => {
    onPath(raw === NONE_VALUE ? null : raw);
  };

  return (
    <div className={styles.group}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <label className={styles.groupLabel} htmlFor={selectId} style={{ flex: 1 }}>
          LoRA {rowIndex + 1}
        </label>
        <button
          type="button"
          aria-label={`Remove LoRA ${rowIndex + 1}`}
          onClick={onRemove}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px 4px",
            lineHeight: 1,
            color: "var(--color-text-muted, #888)",
          }}
        >
          ×
        </button>
      </div>
      <div className={styles.selectWrap}>
        <select
          id={selectId}
          className={styles.select}
          value={selected}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value={NONE_VALUE}>None</option>
          {options.map((lora) => (
            <option key={lora.artifactId} value={lora.installPath}>
              {lora.filename}
              {lora.familyId ? ` (${lora.familyId.replace(/^[^:]+:/, "")})` : ""}
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
        <>
          <WeightSlider tier="High" value={loraWeightHigh(row)} onChange={onWeightHigh} />
          <WeightSlider tier="Low" value={loraWeightLow(row)} onChange={onWeightLow} />
          <span className={styles.hint}>
            Per-expert weight (0 = off for that expert). Distill LoRAs like lightx2v run High&gt;Low,
            e.g. 3.0 / 1.5.
          </span>
        </>
      )}
    </div>
  );
}

export function LoraControls(): ReactElement {
  const { params, updateParam } = useRenderRequest();
  const lorasQuery = useSWR("svi2/installed-loras", fetchInstalledLoras, {
    shouldRetryOnError: false,
  });

  const installedLoras = lorasQuery.data ?? [];
  const rows = params.user_loras ?? [];

  const commit = (next: typeof rows) => updateParam("user_loras", next);

  return (
    <>
      {lorasQuery.error && (
        <div className={styles.loadError} role="alert">
          Failed to load installed LoRAs
        </div>
      )}
      <div className={styles.group}>
        <span className={styles.groupLabel}>LoRAs (applied to both experts)</span>
        {rows.map((row, i) => (
          <LoraRow
            key={i}
            rowIndex={i}
            row={row}
            options={installedLoras}
            onPath={(v) => commit(setLoraPath(rows, i, v ?? ""))}
            onWeightHigh={(n) => commit(setLoraWeightHigh(rows, i, n))}
            onWeightLow={(n) => commit(setLoraWeightLow(rows, i, n))}
            onRemove={() => commit(removeLora(rows, i))}
          />
        ))}
        <button
          type="button"
          onClick={() => commit(addLora(rows))}
          disabled={rows.length >= MAX_LORAS}
          className={styles.hint}
          style={{
            background: "none",
            border: "none",
            cursor: rows.length >= MAX_LORAS ? "not-allowed" : "pointer",
            padding: "4px 0",
            textAlign: "left",
            opacity: rows.length >= MAX_LORAS ? 0.45 : 1,
          }}
        >
          + Add LoRA
        </button>
      </div>
    </>
  );
}
