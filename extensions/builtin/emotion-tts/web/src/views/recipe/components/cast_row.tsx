import { useState } from "react";
import * as css from "./cast_row.css";
import type { CharacterMapping } from "../../../services/mappings_client";
import type { VoiceAsset } from "../../../services/voice_assets_client";
import type { VectorPreset } from "../../../services/presets_client";

export interface CastRowProps {
  characterName: string;
  color: string;
  lineCount: number;
  mapping: CharacterMapping | null;
  voiceAssets: readonly VoiceAsset[];
  presets: readonly VectorPreset[];
  active: boolean;
  onToggle: () => void;
  onAssignVoiceAsset: (voiceAssetId: string) => void;
  onAssignPreset?: (presetId: string) => void;
  onUploadFile?: (file: File) => void;
  onClearMapping?: () => void;
}

export function CastRow({
  characterName,
  color,
  lineCount,
  mapping,
  voiceAssets,
  presets,
  active,
  onToggle,
  onAssignVoiceAsset,
  onAssignPreset,
  onUploadFile,
  onClearMapping,
}: CastRowProps): JSX.Element {
  const [dragOver, setDragOver] = useState(false);
  const speakerAsset = mapping
    ? voiceAssets.find((v) => v.voiceAssetId === mapping.speakerVoiceAssetId)
    : null;
  const presetMatch = mapping?.defaultVectorPresetId
    ? presets.find((p) => p.presetId === mapping.defaultVectorPresetId) ?? null
    : null;
  const initial = (characterName[0] ?? "?").toUpperCase();
  const isMapped = mapping !== null;

  return (
    <div className={`${css.root}${active ? ` ${css.rootActive}` : ""}`}>
      <button
        type="button"
        className={css.summary}
        onClick={onToggle}
        aria-expanded={active}
      >
        <span
          className={css.avatar}
          style={{
            background: `color-mix(in oklab, ${color} 22%, transparent)`,
            color,
          }}
        >
          {initial}
        </span>
        <span className={css.nameBlock}>
          <span className={css.name} style={{ color }}>
            {characterName}
          </span>
          <span className={css.lineCount}>{lineCount} lines</span>
        </span>
        <span className={css.mappingBlock}>
          {speakerAsset ? (
            <>
              <span className={css.mappingPrimary}>{speakerAsset.displayName}</span>
              {speakerAsset.durationMs != null && (
                <span>
                  {formatDuration(speakerAsset.durationMs)} ·{" "}
                  {speakerAsset.sampleRate ? `${speakerAsset.sampleRate} Hz` : "—"}
                </span>
              )}
            </>
          ) : presetMatch ? (
            <>
              <span className={css.mappingPrimary}>{presetMatch.presetName}</span>
              <span>preset</span>
            </>
          ) : (
            <span>no voice assigned</span>
          )}
          {mapping?.voiceAssetChainDigest && (
            <span className={css.chainDigest}>
              chain · {mapping.voiceAssetChainDigest.slice(0, 8)}
            </span>
          )}
        </span>
        <span
          className={`${css.statusChip} ${
            isMapped ? css.statusMapped : css.statusUnmapped
          }`}
        >
          {isMapped ? "Mapped" : "Unmapped"}
        </span>
      </button>
      {active && (
        <div className={css.expansion}>
          <div className={css.expansionRow}>
            <span className={css.expansionLabel}>Drop new audio</span>
            <label
              className={`${css.dropZone}${dragOver ? ` ${css.dropZoneActive}` : ""}`}
              onDragEnter={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file && onUploadFile) onUploadFile(file);
              }}
            >
              <span>Drop a WAV / MP3 / FLAC here, or click to browse</span>
              <input
                type="file"
                accept="audio/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && onUploadFile) onUploadFile(file);
                }}
              />
            </label>
          </div>
          {voiceAssets.length > 0 && (
            <div className={css.expansionRow}>
              <span className={css.expansionLabel}>Reference library</span>
              <div className={css.presetGrid}>
                {voiceAssets.map((asset) => (
                  <button
                    key={asset.voiceAssetId}
                    type="button"
                    className={`${css.presetCard}${
                      mapping?.speakerVoiceAssetId === asset.voiceAssetId
                        ? ` ${css.presetCardActive}`
                        : ""
                    }`}
                    onClick={() => onAssignVoiceAsset(asset.voiceAssetId)}
                  >
                    <span className={css.presetName}>{asset.displayName}</span>
                    <span className={css.presetSub}>
                      {asset.durationMs != null
                        ? formatDuration(asset.durationMs)
                        : "—"}{" "}
                      ·{" "}
                      {asset.sampleRate ? `${asset.sampleRate} Hz` : "—"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {presets.length > 0 && onAssignPreset && (
            <div className={css.expansionRow}>
              <span className={css.expansionLabel}>Preset voices</span>
              <div className={css.presetGrid}>
                {presets.map((preset) => (
                  <button
                    key={preset.presetId}
                    type="button"
                    className={`${css.presetCard}${
                      mapping?.defaultVectorPresetId === preset.presetId
                        ? ` ${css.presetCardActive}`
                        : ""
                    }`}
                    onClick={() => onAssignPreset(preset.presetId)}
                  >
                    <span className={css.presetName}>{preset.presetName}</span>
                    <span className={css.presetSub}>preset · vector</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {isMapped && onClearMapping && (
            <button type="button" className={css.clearButton} onClick={onClearMapping}>
              Clear mapping →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return "0:00";
  const totalSeconds = Math.round(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export interface CastSectionProps {
  unmappedCount: number;
  totalCount: number;
  children: React.ReactNode;
  emptyHint?: string;
}

export function CastSection({
  unmappedCount,
  totalCount,
  children,
  emptyHint,
}: CastSectionProps): JSX.Element {
  if (totalCount === 0) {
    return (
      <p className={css.empty}>
        {emptyHint ??
          "Add at least one tagged dialogue line to populate the cast."}
      </p>
    );
  }
  const fullyMapped = unmappedCount === 0;
  return (
    <div>
      <header className={css.sectionHeader}>
        <span
          className={`${css.aggregatedChip} ${
            fullyMapped ? css.statusMapped : css.statusUnmapped
          }`}
        >
          {fullyMapped
            ? `All ${totalCount} mapped`
            : `${unmappedCount} of ${totalCount} unmapped`}
        </span>
      </header>
      <ul className={css.list}>{children}</ul>
    </div>
  );
}
