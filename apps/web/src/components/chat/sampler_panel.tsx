import { useState } from "react";
import * as styles from "./sampler_panel.css";

export interface SamplerOverride {
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  systemPromptOverride?: "inherit" | "override";
}

interface SamplerPanelProps {
  override?: SamplerOverride;
  onUpdate?: (next: SamplerOverride) => Promise<void>;
}

export function SamplerPanel({ override, onUpdate }: SamplerPanelProps) {
  const [draft, setDraft] = useState<SamplerOverride>(override ?? {});

  const update = async (patch: Partial<SamplerOverride>) => {
    const next = { ...draft, ...patch };
    setDraft(next);
    if (onUpdate) await onUpdate(next);
  };

  return (
    <div className={styles.panel}>
      <span className={styles.title}>Sampler override</span>
      <label className={styles.field}>
        <span className={styles.label}>Temperature</span>
        <input
          className={styles.input}
          type="number"
          min={0}
          max={2}
          step={0.05}
          value={draft.temperature ?? ""}
          onChange={(e) => void update({ temperature: e.target.value === "" ? undefined : Number(e.target.value) })}
          data-role="manual"
        />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>top-p</span>
        <input
          className={styles.input}
          type="number"
          min={0}
          max={1}
          step={0.05}
          value={draft.topP ?? ""}
          onChange={(e) => void update({ topP: e.target.value === "" ? undefined : Number(e.target.value) })}
          data-role="manual"
        />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>max tokens</span>
        <input
          className={styles.input}
          type="number"
          min={1}
          step={1}
          value={draft.maxTokens ?? ""}
          onChange={(e) => void update({ maxTokens: e.target.value === "" ? undefined : Number(e.target.value) })}
          data-role="manual"
        />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>System prompt</span>
        <select
          className={styles.select}
          value={draft.systemPromptOverride ?? "inherit"}
          onChange={(e) => void update({ systemPromptOverride: e.target.value as SamplerOverride["systemPromptOverride"] })}
          data-role="manual"
        >
          <option value="inherit">inherit</option>
          <option value="override">override</option>
        </select>
      </label>
    </div>
  );
}
