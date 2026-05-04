import { useEffect, useMemo, useRef, useState } from "react";
import * as css from "./voice_card.css";
import type { VoiceAsset } from "../../../../services/voice_assets_client";
import { getVoiceAssetStreamUrl } from "../../../../services/voice_assets_client";

const BAR_COUNT = 28;

/**
 * Deterministic pseudo-random waveform bars seeded by the asset's
 * contentSha256 prefix. Avoids decoding the audio for the v1 preview — a real
 * waveform analyser can replace this without changing the API.
 */
function seedFromSha(sha: string | null | undefined): number {
  if (!sha) return 1;
  let acc = 0;
  for (let i = 0; i < Math.min(sha.length, 12); i++) {
    acc = (acc * 33 + sha.charCodeAt(i)) >>> 0;
  }
  return acc || 1;
}

function buildBars(seed: number, count: number): number[] {
  const out: number[] = new Array(count);
  let x = seed;
  for (let i = 0; i < count; i++) {
    x = (x * 9301 + 49297) % 233280;
    const r = x / 233280;
    const env = Math.min(1, i / 6, (count - i) / 6);
    out[i] = Math.max(0.18, env * (0.32 + r * 0.68));
  }
  return out;
}

function formatDuration(ms: number | null | undefined): string {
  if (ms == null) return "—";
  const total = Math.max(0, Math.round(ms / 1000));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function formatSampleRate(rate: number | null | undefined): string {
  if (!rate) return "—";
  return `${(rate / 1000).toFixed(rate % 1000 === 0 ? 0 : 1)} kHz`;
}

export interface UsedByEntry {
  characterName: string;
  color: string;
}

export interface VoiceCardProps {
  asset: VoiceAsset;
  /** "upload" cards are user-owned; "preset" cards are read-only built-ins. */
  presentation: "upload" | "preset";
  usedBy: readonly UsedByEntry[];
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRename: (next: string) => Promise<void> | void;
  onCopyName: () => void;
  onDelete?: (() => void) | undefined;
  /** Notifies the parent that audio playback finished naturally so its
   * "currently playing" tracking can clear. */
  onPlaybackEnded?: () => void;
}

export function VoiceCard({
  asset,
  presentation,
  usedBy,
  isPlaying,
  onTogglePlay,
  onRename,
  onCopyName,
  onDelete,
  onPlaybackEnded,
}: VoiceCardProps): JSX.Element {
  const [renaming, setRenaming] = useState(false);
  const [draft, setDraft] = useState(asset.displayName);
  const audioRef = useRef<HTMLAudioElement>(null);

  const seed = useMemo(() => seedFromSha(asset.contentSha256), [asset.contentSha256]);
  const bars = useMemo(() => buildBars(seed, BAR_COUNT), [seed]);

  const streamUrl = useMemo(() => getVoiceAssetStreamUrl(asset), [asset]);

  useEffect(() => {
    setDraft(asset.displayName);
  }, [asset.displayName]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying && streamUrl) {
      el.play().catch(() => undefined);
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [isPlaying, streamUrl]);

  const commitRename = async (): Promise<void> => {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === asset.displayName) {
      setRenaming(false);
      setDraft(asset.displayName);
      return;
    }
    try {
      await onRename(trimmed);
    } finally {
      setRenaming(false);
    }
  };

  const meta = `${formatDuration(asset.durationMs)} · ${formatSampleRate(asset.sampleRate)}`;

  return (
    <article className={css.card} data-playing={isPlaying ? "true" : "false"}>
      <header className={css.head}>
        <span className={css.icon} data-kind={presentation} aria-hidden="true">
          {presentation === "upload" ? "▣" : "★"}
        </span>
        <div className={css.titleBlock}>
          {renaming ? (
            <input
              className={css.renameInput}
              value={draft}
              autoFocus
              onChange={(e) => setDraft(e.target.value)}
              onBlur={() => {
                void commitRename();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.currentTarget.blur();
                } else if (e.key === "Escape") {
                  setRenaming(false);
                  setDraft(asset.displayName);
                }
              }}
              aria-label={`Rename ${asset.displayName}`}
            />
          ) : (
            <button
              type="button"
              className={css.title}
              onDoubleClick={() => setRenaming(true)}
              title="Double-click to rename"
            >
              {asset.displayName}
            </button>
          )}
          <span className={css.meta}>{meta}</span>
        </div>
        <span className={css.chip} data-kind={presentation}>
          {presentation === "upload" ? "UPLOADED" : "PRESET"}
        </span>
      </header>

      <button
        type="button"
        className={css.wave}
        data-playing={isPlaying ? "true" : "false"}
        disabled={streamUrl == null}
        title={streamUrl ? "Preview" : "Preview unavailable"}
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause preview" : "Play preview"}
      >
        <span className={css.playGlyph} aria-hidden="true">
          {isPlaying ? "❚❚" : "▶"}
        </span>
        <span className={css.bars} aria-hidden="true">
          {bars.map((b, i) => (
            <span key={i} className={css.bar} style={{ height: `${Math.round(b * 100)}%` }} />
          ))}
        </span>
      </button>

      <footer className={css.foot}>
        {usedBy.length > 0 ? (
          <span className={css.usedBy}>
            <span>used by</span>
            {usedBy.map((u) => (
              <span
                key={u.characterName}
                className={css.usedChip}
                style={{ color: u.color, borderColor: u.color }}
              >
                {u.characterName}
              </span>
            ))}
          </span>
        ) : (
          <span className={css.usedBy}>unassigned</span>
        )}
        <span className={css.actions}>
          <button
            type="button"
            className={css.iconBtn}
            title="Rename"
            aria-label="Rename voice"
            onClick={() => setRenaming(true)}
          >
            ✎
          </button>
          <button
            type="button"
            className={css.iconBtn}
            title="Copy name"
            aria-label="Copy voice name"
            onClick={onCopyName}
          >
            ⧉
          </button>
          {onDelete && (
            <button
              type="button"
              className={css.iconBtn}
              data-tone="danger"
              title="Delete"
              aria-label="Delete voice"
              onClick={onDelete}
            >
              ✕
            </button>
          )}
        </span>
      </footer>

      {streamUrl && (
        <audio
          ref={audioRef}
          src={streamUrl}
          preload="none"
          className={css.audio}
          onEnded={onPlaybackEnded}
        />
      )}
    </article>
  );
}
