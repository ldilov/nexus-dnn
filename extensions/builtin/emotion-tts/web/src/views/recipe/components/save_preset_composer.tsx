import { useEffect, useState } from "react";
import * as css from "./save_preset_composer.css";
import { Button } from "../../../components/button";
import {
  type AxisKey,
  AXIS_LABELS,
  type EmotionVec,
  suggestPresetName,
  topAxes,
} from "../lib/preset_naming";
import { EttsRadarMini } from "./etts_radar";
import type { VectorPreset } from "../../../services/presets_client";

export interface SavePresetComposerProps {
  vec: EmotionVec;
  onSave: (name: string) => void;
  saving?: boolean;
}

export function SavePresetComposer({
  vec,
  onSave,
  saving = false,
}: SavePresetComposerProps): JSX.Element {
  const [name, setName] = useState(suggestPresetName(vec));
  const [touched, setTouched] = useState(false);
  const top = topAxes(vec, 3);

  useEffect(() => {
    if (!touched) setName(suggestPresetName(vec));
  }, [vec, touched]);

  const canSave = name.trim().length > 0;

  return (
    <div className={css.root}>
      <header className={css.header}>
        <span className={css.title}>Save current vector as preset</span>
      </header>
      <div className={css.summaryRow}>
        {top.length === 0 ? (
          <span>(neutral — drag the radar to set a vector first)</span>
        ) : (
          top.map((entry) => (
            <span key={entry.key} className={css.summaryAxis}>
              {entry.label.toLowerCase()}
              <span className={css.axisValue}>{entry.value.toFixed(2)}</span>
            </span>
          ))
        )}
      </div>
      <div className={css.composerRow}>
        <input
          className={css.input}
          type="text"
          placeholder="Preset name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setTouched(true);
          }}
        />
        <Button
          variant="primary"
          disabled={!canSave || saving}
          onClick={() => {
            onSave(name.trim());
            setTouched(false);
          }}
        >
          {saving ? "Saving…" : "Save preset"}
        </Button>
      </div>
    </div>
  );
}

export interface PresetLibraryProps {
  presets: readonly VectorPreset[];
  activePresetId: string | null;
  onSelect: (preset: VectorPreset) => void;
  onDelete?: (presetId: string) => void;
}

export function PresetLibrary({
  presets,
  activePresetId,
  onSelect,
  onDelete,
}: PresetLibraryProps): JSX.Element {
  if (presets.length === 0) {
    return (
      <div className={css.root}>
        <span className={css.title}>Preset library</span>
        <span className={css.summaryRow}>
          No presets yet. Save your current vector to build the library.
        </span>
      </div>
    );
  }
  return (
    <div className={css.root}>
      <span className={css.sectionTitle}>Preset library</span>
      <div className={css.presetGrid}>
        {presets.map((preset) => {
          const vec = vecFromPreset(preset);
          const active = preset.presetId === activePresetId;
          return (
            <div
              key={preset.presetId}
              className={`${css.presetCard}${active ? ` ${css.presetCardActive}` : ""}`}
            >
              <button
                type="button"
                style={{ display: "contents", border: "none", background: "transparent", cursor: "pointer" }}
                onClick={() => onSelect(preset)}
              >
                <EttsRadarMini vec={vec} size={28} />
                <span className={css.presetCardName}>{preset.presetName}</span>
              </button>
              {onDelete && (
                <button
                  type="button"
                  className={css.presetCardDelete}
                  onClick={() => {
                    if (window.confirm(`Delete preset "${preset.presetName}"? This cannot be undone.`)) {
                      onDelete(preset.presetId);
                    }
                  }}
                  aria-label={`Delete ${preset.presetName}`}
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const AXIS_ORDER: readonly AxisKey[] = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm",
];

export function vecFromPreset(preset: VectorPreset): EmotionVec {
  const empty = AXIS_ORDER.reduce<EmotionVec>(
    (acc, key) => ({ ...acc, [key]: 0 }),
    {} as EmotionVec,
  );
  if (!Array.isArray(preset.vector)) return empty;
  return AXIS_ORDER.reduce<EmotionVec>(
    (acc, key, i) => ({ ...acc, [key]: preset.vector[i] ?? 0 }),
    empty,
  );
}

export function vecToPresetVector(vec: EmotionVec): [number, number, number, number, number, number, number, number] {
  return AXIS_ORDER.map((key) => vec[key] ?? 0) as [number, number, number, number, number, number, number, number];
}
