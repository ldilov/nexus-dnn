import { useId } from "react";
import type { CachePolicy, OutputFormat } from "../../../services/types";
import * as css from "./generation_settings_panel.css";

interface Props {
  outputFormat: OutputFormat;
  onOutputFormatChange: (next: OutputFormat) => void;
  speedFactor: number;
  onSpeedFactorChange: (next: number) => void;
  cachePolicy: CachePolicy;
  onCachePolicyChange: (next: CachePolicy) => void;
  generation: Record<string, unknown>;
  onGenerationChange: (next: Record<string, unknown>) => void;
}

const CACHE_POLICIES: readonly { id: CachePolicy; label: string; help: string }[] = [
  {
    id: "use_cache",
    label: "Use cache",
    help: "Read hits, write misses. Fastest on re-runs.",
  },
  {
    id: "force_regenerate",
    label: "Force regenerate",
    help: "Always synthesize; still writes to cache.",
  },
  {
    id: "read_only_cache",
    label: "Read-only cache",
    help: "Read hits, synthesize misses without writing back.",
  },
];

const FORMATS: readonly OutputFormat[] = ["mp3", "wav", "flac"];

const SPEED_MIN = 0.5;
const SPEED_MAX = 2.0;
const SPEED_STEP = 0.05;

const TEMPERATURE_DEFAULT = 0.8;
const TOP_P_DEFAULT = 0.8;
const SEED_DEFAULT = 42;

function readNumber(generation: Record<string, unknown>, key: string, fallback: number): number {
  const raw = generation[key];
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw === "string") {
    const parsed = Number(raw);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

export function GenerationSettingsPanel({
  outputFormat,
  onOutputFormatChange,
  speedFactor,
  onSpeedFactorChange,
  cachePolicy,
  onCachePolicyChange,
  generation,
  onGenerationChange,
}: Props): JSX.Element {
  const formatId = useId();
  const speedId = useId();
  const tempId = useId();
  const topPId = useId();
  const seedId = useId();

  const update = (key: string, value: number): void => {
    onGenerationChange({ ...generation, [key]: value });
  };

  const activePolicy =
    CACHE_POLICIES.find((p) => p.id === cachePolicy) ?? CACHE_POLICIES[0]!;
  const speedPct = ((speedFactor - SPEED_MIN) / (SPEED_MAX - SPEED_MIN)) * 100;
  const temperature = readNumber(generation, "temperature", TEMPERATURE_DEFAULT);
  const topP = readNumber(generation, "top_p", TOP_P_DEFAULT);
  const seed = readNumber(generation, "seed", SEED_DEFAULT);

  return (
    <div className={css.root}>
      <div className={css.row}>
        <label htmlFor={formatId} className={css.label}>
          Format
        </label>
        <div className={css.control}>
          <select
            id={formatId}
            className={css.select}
            value={outputFormat}
            onChange={(e) => onOutputFormatChange(e.currentTarget.value as OutputFormat)}
          >
            {FORMATS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={css.row}>
        <label htmlFor={speedId} className={css.label}>
          Speed
        </label>
        <div className={`${css.control} ${css.speedRow}`}>
          <input
            id={speedId}
            type="range"
            className={css.range}
            min={SPEED_MIN}
            max={SPEED_MAX}
            step={SPEED_STEP}
            value={speedFactor}
            style={{ ["--range-pct" as string]: `${speedPct}%` }}
            onChange={(e) => onSpeedFactorChange(Number(e.currentTarget.value))}
            aria-valuemin={SPEED_MIN}
            aria-valuemax={SPEED_MAX}
            aria-valuenow={speedFactor}
          />
          <span className={css.speedValue}>{speedFactor.toFixed(2)}×</span>
        </div>
      </div>

      <div className={css.rowStacked} role="radiogroup" aria-label="Cache policy">
        <span className={css.label}>Cache</span>
        <div className={css.cacheRow}>
          {CACHE_POLICIES.map((p) => (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={cachePolicy === p.id}
              className={css.cacheBtn}
              onClick={() => onCachePolicyChange(p.id)}
              title={p.help}
            >
              {p.label}
            </button>
          ))}
        </div>
        <p className={css.helpText} aria-live="polite">
          {activePolicy.help}
        </p>
      </div>

      <div className={css.divider} aria-hidden="true" />

      <div className={css.row}>
        <label htmlFor={tempId} className={css.label}>
          Temperature
        </label>
        <div className={css.control}>
          <input
            id={tempId}
            type="number"
            className={css.numberInput}
            min={0}
            max={2}
            step={0.05}
            value={temperature}
            onChange={(e) => update("temperature", Number(e.currentTarget.value))}
          />
        </div>
      </div>

      <div className={css.row}>
        <label htmlFor={topPId} className={css.label}>
          Top-p
        </label>
        <div className={css.control}>
          <input
            id={topPId}
            type="number"
            className={css.numberInput}
            min={0}
            max={1}
            step={0.05}
            value={topP}
            onChange={(e) => update("top_p", Number(e.currentTarget.value))}
          />
        </div>
      </div>

      <div className={css.row}>
        <label htmlFor={seedId} className={css.label}>
          Seed
        </label>
        <div className={css.control}>
          <input
            id={seedId}
            type="number"
            className={css.numberInput}
            step={1}
            value={seed}
            onChange={(e) => update("seed", Math.trunc(Number(e.currentTarget.value)))}
          />
        </div>
      </div>
    </div>
  );
}
