import { useCallback } from "react";
import { ContextMeter } from "./context_meter";
import { SystemPromptEditor } from "./system_prompt_editor";
import * as styles from "./inspector_panel.css";

export type LoadPhase = "idle" | "loading" | "ready" | "failed";

export interface InspectorSamplerView {
  temperature: number;
  topP: number;
  maxTokens: number;
}

export interface InspectorPanelProps {
  modelLabel: string | null;
  modelSub?: string;
  loadPhase: LoadPhase;
  contextUsed: number;
  contextMax: number;
  outputBudgetPct?: number;
  sampler: InspectorSamplerView;
  onSamplerChange: (next: InspectorSamplerView) => void;
  systemPromptInherited: boolean;
  systemPrompt: string;
  onSystemPromptChange: (next: string) => void;
  onUnload?: () => void;
}

const phaseLabel: Record<LoadPhase, string> = {
  idle: "Idle",
  loading: "Loading",
  ready: "Ready",
  failed: "Failed",
};

interface SectionProps {
  num: string;
  title: string;
  children: React.ReactNode;
}

function Section({ num, title, children }: Readonly<SectionProps>) {
  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowNum}>{num}</span>
          <span aria-hidden="true">·</span>
          <span className={styles.eyebrowTitle}>{title}</span>
        </span>
      </header>
      {children}
    </section>
  );
}

export function InspectorPanel({
  modelLabel,
  modelSub,
  loadPhase,
  contextUsed,
  contextMax,
  outputBudgetPct,
  sampler,
  onSamplerChange,
  systemPromptInherited,
  systemPrompt,
  onSystemPromptChange,
  onUnload,
}: Readonly<InspectorPanelProps>) {
  const onTempChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = e.target.value === "" ? 0 : Number(e.target.value);
      const next = Number.isFinite(parsed) ? parsed : sampler.temperature;
      onSamplerChange({ ...sampler, temperature: next });
    },
    [sampler, onSamplerChange],
  );

  const onTopPChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = e.target.value === "" ? 0 : Number(e.target.value);
      const next = Number.isFinite(parsed) ? parsed : sampler.topP;
      onSamplerChange({ ...sampler, topP: next });
    },
    [sampler, onSamplerChange],
  );

  const onMaxTokensChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = e.target.value === "" ? 1 : Math.floor(Number(e.target.value));
      const next = Number.isFinite(parsed) ? Math.max(1, parsed) : sampler.maxTokens;
      onSamplerChange({ ...sampler, maxTokens: next });
    },
    [sampler, onSamplerChange],
  );

  const chipClass = styles.chip[loadPhase];
  const outputPctClamped =
    typeof outputBudgetPct === "number"
      ? Math.max(0, Math.min(100, Math.round(outputBudgetPct)))
      : null;

  return (
    <div className={styles.wrap}>
      <Section num="01" title="MODEL">
        <div className={styles.modelCard}>
          <span className={`material-symbols-outlined ${styles.modelGlyph}`} aria-hidden="true">
            psychology
          </span>
          <div className={styles.modelText}>
            {modelLabel ? (
              <span className={styles.modelName}>{modelLabel}</span>
            ) : (
              <span className={styles.modelNameEmpty}>No model loaded</span>
            )}
            {modelSub ? <span className={styles.modelSub}>{modelSub}</span> : null}
          </div>
          <span className={styles.modelMeta}>
            <span className={chipClass} aria-label={`Model status: ${phaseLabel[loadPhase]}`}>
              {phaseLabel[loadPhase]}
            </span>
            {loadPhase === "ready" && onUnload ? (
              <button
                type="button"
                className={styles.unloadBtn}
                onClick={onUnload}
                aria-label="Unload model"
              >
                Unload
              </button>
            ) : null}
          </span>
        </div>
        {contextMax > 0 ? (
          <div className={styles.meterStack}>
            <ContextMeter used={contextUsed} max={contextMax} label="Context used" />
            {outputPctClamped !== null ? (
              <ContextMeter
                used={outputPctClamped}
                max={100}
                label="Output budget"
              />
            ) : null}
          </div>
        ) : null}
      </Section>

      <Section num="02" title="PARAMETERS">
        <div className={styles.paramsList}>
          <label className={styles.paramRow}>
            <span className={styles.paramLabel}>Temperature</span>
            <input
              type="number"
              min={0}
              max={2}
              step={0.05}
              value={sampler.temperature}
              onChange={onTempChange}
              className={styles.paramInput}
              data-role="manual"
              aria-label="Temperature"
            />
          </label>
          <label className={styles.paramRow}>
            <span className={styles.paramLabel}>Top-p</span>
            <input
              type="number"
              min={0}
              max={1}
              step={0.05}
              value={sampler.topP}
              onChange={onTopPChange}
              className={styles.paramInput}
              data-role="manual"
              aria-label="Top-p"
            />
          </label>
          <label className={styles.paramRow}>
            <span className={styles.paramLabel}>Max tokens</span>
            <input
              type="number"
              min={1}
              step={1}
              value={sampler.maxTokens}
              onChange={onMaxTokensChange}
              className={styles.paramInput}
              data-role="manual"
              aria-label="Max tokens"
            />
          </label>
          <div className={styles.paramRow}>
            <span className={styles.paramLabel}>System prompt</span>
            <span aria-hidden="true">
              {systemPromptInherited ? (
                <span className={styles.promptIndicatorInherited}>inherits</span>
              ) : (
                <span className={styles.promptIndicatorOverridden}>overridden</span>
              )}
            </span>
          </div>
        </div>
      </Section>

      <Section num="03" title="SYSTEM PROMPT">
        <SystemPromptEditor value={systemPrompt} onChange={onSystemPromptChange} />
      </Section>
    </div>
  );
}
