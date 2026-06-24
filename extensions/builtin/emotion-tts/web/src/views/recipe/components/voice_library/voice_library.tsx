import { useCallback, useMemo, useRef, useState, type DragEvent } from "react";
import { toast } from "sonner";
import * as css from "./voice_library.css";
import { VoiceCard, type UsedByEntry } from "./voice_card";
import { MicRecorder } from "./mic_recorder";
import { Button } from "../../../../components/button";
import {
  deactivateVoiceAsset,
  renameVoiceAsset,
  uploadVoiceAsset,
  type VoiceAsset,
} from "../../../../services/voice_assets_client";
import type { CharacterMapping } from "../../../../services/mappings_client";

type Filter = "all" | "uploaded" | "preset";

export interface VoiceLibraryProps {
  deploymentId: string;
  voiceAssets: readonly VoiceAsset[];
  mappings: readonly CharacterMapping[];
  characterColors: Record<string, string>;
  /** Setter from the recipe view so additions/renames/deletions live-update. */
  onVoiceAssetsChange: (next: VoiceAsset[]) => void;
  onCreateCharacterFromVoice?: (asset: VoiceAsset, characterName: string) => void;
}

/**
 * Editorial voice library with drag-drop / browse / paste-URL / record uploads,
 * search + filter chips, and per-card play / rename / copy / delete affordances.
 *
 * Built-in "preset" voices are shown alongside uploads; presets are
 * read-only — they cannot be renamed or deleted from this UI.
 */
export function VoiceLibrary({
  deploymentId,
  voiceAssets,
  mappings,
  characterColors,
  onVoiceAssetsChange,
  onCreateCharacterFromVoice,
}: VoiceLibraryProps): JSX.Element {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [dragOver, setDragOver] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [recordOpen, setRecordOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** All uploads are treated as "upload" presentation. The catalog has no
   *  built-in preset voices wired to a backend yet — when one arrives, switch
   *  on `asset.sourceType` here. */
  const presentationFor = useCallback(
    (_asset: VoiceAsset): "upload" | "preset" => "upload",
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return voiceAssets.filter((asset) => {
      const presentation = presentationFor(asset);
      if (filter === "uploaded" && presentation !== "upload") return false;
      if (filter === "preset" && presentation !== "preset") return false;
      if (q && !asset.displayName.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [voiceAssets, query, filter, presentationFor]);

  const uploadedCount = useMemo(
    () => voiceAssets.filter((a) => presentationFor(a) === "upload").length,
    [voiceAssets, presentationFor],
  );

  const usedByForAsset = useCallback(
    (assetId: string): UsedByEntry[] => {
      const out: UsedByEntry[] = [];
      const seen = new Set<string>();
      for (const m of mappings) {
        if (m.speakerVoiceAssetId !== assetId) continue;
        if (seen.has(m.characterName)) continue;
        seen.add(m.characterName);
        out.push({
          characterName: m.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: characterColors[m.characterName] ?? "#ba9eff",
        });
      }
      return out;
    },
    [mappings, characterColors],
  );

  const ingestFiles = useCallback(
    async (files: FileList | File[]): Promise<void> => {
      const list = Array.from(files).slice(0, 8);
      if (list.length === 0) return;
      setBusy(true);
      try {
        const created: VoiceAsset[] = [];
        for (const file of list) {
          if (!file.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(file.name)) {
            toast.error(`${file.name}: not an audio file`);
            continue;
          }
          const baseName = file.name.replace(/\.[^.]+$/, "");
          try {
            const asset = await uploadVoiceAsset(deploymentId, file, baseName, "speaker");
            created.push(asset);
            toast.success(`Added ${asset.displayName}`);
          } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : `${file.name}: upload failed`);
          }
        }
        if (created.length > 0) {
          onVoiceAssetsChange([...created, ...voiceAssets]);
        }
      } finally {
        setBusy(false);
      }
    },
    [deploymentId, voiceAssets, onVoiceAssetsChange],
  );

  const onDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer?.files) {
      void ingestFiles(event.dataTransfer.files);
    }
  };

  const onPasteUrl = useCallback(async (): Promise<void> => {
    const url = window.prompt("Paste an audio URL (https://…)");
    if (!url) return;
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`fetch failed: ${resp.status}`);
      const blob = await resp.blob();
      const fname = url.split("/").pop()?.split("?")[0] ?? "voice.wav";
      const file = new File([blob], fname, { type: blob.type || "audio/wav" });
      await ingestFiles([file]);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "could not fetch URL");
    }
  }, [ingestFiles]);

  const onRename = useCallback(
    async (assetId: string, next: string): Promise<void> => {
      try {
        const updated = await renameVoiceAsset(deploymentId, assetId, next);
        onVoiceAssetsChange(
          voiceAssets.map((a) => (a.voiceAssetId === assetId ? updated : a)),
        );
        toast.success(`Renamed to ${updated.displayName}`);
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "rename failed");
      }
    },
    [deploymentId, voiceAssets, onVoiceAssetsChange],
  );

  const onCopyName = useCallback((displayName: string): void => {
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(displayName);
      toast.success("Copied name");
    } else {
      toast.error("Clipboard unavailable");
    }
  }, []);

  const onDelete = useCallback(
    async (asset: VoiceAsset): Promise<void> => {
      const ok = window.confirm(`Delete "${asset.displayName}"? Mappings using it will reset.`);
      if (!ok) return;
      try {
        await deactivateVoiceAsset(deploymentId, asset.voiceAssetId);
        onVoiceAssetsChange(voiceAssets.filter((a) => a.voiceAssetId !== asset.voiceAssetId));
        toast.success(`Deleted ${asset.displayName}`);
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "delete failed");
      }
    },
    [deploymentId, voiceAssets, onVoiceAssetsChange],
  );

  return (
    <div className={css.root}>
      <div
        className={css.dropZone}
        data-over={dragOver ? "true" : "false"}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <span className={css.dropIcon} aria-hidden="true">
          ⇪
        </span>
        <div className={css.dropBody}>
          <div className={css.dropTitle}>
            Drop reference audio to add a voice
            <span className={css.dropTitleHint}>.wav · .mp3 · .flac · .ogg · 4–30s recommended</span>
          </div>
          <div className={css.dropLinkRow}>
            or
            <button
              type="button"
              className={css.linkBtn}
              onClick={() => fileInputRef.current?.click()}
            >
              browse files
            </button>
            ·
            <button
              type="button"
              className={css.linkBtn}
              onClick={() => {
                void onPasteUrl();
              }}
            >
              paste URL
            </button>
            ·
            <button
              type="button"
              className={css.linkBtn}
              onClick={() => setRecordOpen(true)}
            >
              record from mic
            </button>
          </div>
        </div>
        <Button
          variant="primary"
          size="md"
          disabled={busy}
          loading={busy}
          onClick={() => fileInputRef.current?.click()}
        >
          + Upload
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*,.wav,.mp3,.flac,.ogg,.m4a,.webm"
          multiple
          className={css.fileInput}
          onChange={(e) => {
            if (e.target.files) {
              void ingestFiles(e.target.files);
              e.target.value = "";
            }
          }}
        />
      </div>

      <div className={css.toolbar}>
        <label className={css.search}>
          <span aria-hidden="true">⌕</span>
          <input
            className={css.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search voices…"
            aria-label="Search voices"
          />
        </label>
        <span className={css.filterGroup} role="group" aria-label="Filter voices">
          {(
            [
              ["all", "All"],
              ["uploaded", "Uploaded"],
              ["preset", "Built-in"],
            ] as ReadonlyArray<[Filter, string]>
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={css.filterBtn}
              data-active={filter === key ? "true" : "false"}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </span>
        <span className={css.summary}>
          <span className={css.summaryStrong}>{voiceAssets.length}</span> voices
          <span>·</span>
          <span>{uploadedCount} uploaded</span>
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className={css.emptyState}>
          {voiceAssets.length === 0
            ? "No voices yet. Drop audio above or record from your microphone."
            : "No voices match this filter."}
        </div>
      ) : (
        <div className={css.grid}>
          {filtered.map((asset) => {
            const presentation = presentationFor(asset);
            return (
              <VoiceCard
                key={asset.voiceAssetId}
                asset={asset}
                presentation={presentation}
                usedBy={usedByForAsset(asset.voiceAssetId)}
                isPlaying={playingId === asset.voiceAssetId}
                onTogglePlay={() =>
                  setPlayingId((c) => (c === asset.voiceAssetId ? null : asset.voiceAssetId))
                }
                onPlaybackEnded={() => setPlayingId(null)}
                onRename={(next) => onRename(asset.voiceAssetId, next)}
                onCopyName={() => onCopyName(asset.displayName)}
                onDelete={presentation === "upload" ? () => void onDelete(asset) : undefined}
                onCreateCharacter={onCreateCharacterFromVoice ? (name) => onCreateCharacterFromVoice(asset, name) : undefined}
              />
            );
          })}
        </div>
      )}

      <MicRecorder
        open={recordOpen}
        defaultName={`Take ${voiceAssets.length + 1}`}
        onClose={() => setRecordOpen(false)}
        onSubmit={async (file, displayName) => {
          await ingestFilesWithName(file, displayName);
        }}
      />
    </div>
  );

  async function ingestFilesWithName(file: File, displayName: string): Promise<void> {
    setBusy(true);
    try {
      const asset = await uploadVoiceAsset(deploymentId, file, displayName, "speaker");
      onVoiceAssetsChange([asset, ...voiceAssets]);
      toast.success(`Recorded ${asset.displayName}`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "upload failed");
      throw err;
    } finally {
      setBusy(false);
    }
  }
}
