import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { setDefaultVoice } from "../../../services/deployments_client";
import { listVoiceAssets, type VoiceAsset } from "../../../services/voice_assets_client";
import * as css from "./quick_voice_picker.css";

interface Props {
  deploymentId: string;
  initialVoiceAssetId: string | null;
  onChange?: (voiceAssetId: string | null) => void;
}

/**
 * Dropdown picker for the deployment's default voice. Used inside Quick
 * mode where the user wants a single voice for all lines without writing
 * `[Char]` syntax. The button summarises the selected voice (icon, name,
 * meta line, mini-wave); clicking opens an anchored menu of voices grouped
 * by source. Single-voice deployments still get the menu so the contract
 * stays consistent.
 */
export function QuickVoicePicker({
  deploymentId,
  initialVoiceAssetId,
  onChange,
}: Props): JSX.Element {
  const [voices, setVoices] = useState<VoiceAsset[]>([]);
  const [selected, setSelected] = useState<string | null>(initialVoiceAssetId);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listVoiceAssets(deploymentId)
      .then(({ voiceAssets }) => {
        if (!cancelled) setVoices(voiceAssets);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load voices");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [deploymentId]);

  // Close on outside click + Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onMouseDown = (e: MouseEvent): void => {
      if (!wrapperRef.current) return;
      if (e.target instanceof Node && wrapperRef.current.contains(e.target)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleSelect = useCallback(
    async (voiceAssetId: string): Promise<void> => {
      setBusy(true);
      setError(null);
      const previous = selected;
      const next = voiceAssetId === selected ? null : voiceAssetId;
      setSelected(next);
      setOpen(false);
      try {
        await setDefaultVoice(deploymentId, next);
        onChange?.(next);
      } catch (err) {
        setSelected(previous);
        setError(err instanceof Error ? err.message : "Failed to update default voice");
      } finally {
        setBusy(false);
      }
    },
    [deploymentId, onChange, selected],
  );

  const selectedVoice = useMemo(
    () => voices.find((v) => v.voiceAssetId === selected) ?? null,
    [voices, selected],
  );

  // Group by `kind`: speakers go to "Uploaded" (the user-uploaded refs),
  // other kinds (emotion / mixed) go to "Other". Built-in presets aren't in
  // the data model yet — when they are, route them by a `source` field.
  const grouped = useMemo(() => {
    const uploaded: VoiceAsset[] = [];
    const other: VoiceAsset[] = [];
    for (const v of voices) {
      if (v.kind === "speaker" || v.kind === "mixed") {
        uploaded.push(v);
      } else {
        other.push(v);
      }
    }
    return { uploaded, other };
  }, [voices]);

  if (loading) {
    return <span className={css.muted}>Loading voices…</span>;
  }

  if (voices.length === 0) {
    return (
      <span className={css.muted}>
        No voices yet. Upload a reference in Mappings to enable Quick mode.
      </span>
    );
  }

  return (
    <div ref={wrapperRef} className={css.wrapper}>
      <button
        ref={triggerRef}
        type="button"
        className={`${css.trigger} ${open ? css.triggerOpen : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={busy}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={css.triggerIcon} aria-hidden="true">
          <span className="material-symbols-outlined">graphic_eq</span>
        </span>
        <span className={css.triggerBody}>
          <span className={css.triggerName}>
            {selectedVoice ? selectedVoice.displayName : "Pick a voice"}
          </span>
          <span className={css.triggerMeta}>
            {selectedVoice
              ? buildMetaLine(selectedVoice)
              : `${voices.length} voice${voices.length === 1 ? "" : "s"} in library`}
          </span>
        </span>
        <span className={css.triggerWave} aria-hidden="true">
          {WAVE_BARS.map((h, i) => (
            <i key={i} style={{ height: `${h * 100}%` }} />
          ))}
        </span>
        <span className={`material-symbols-outlined ${css.triggerCaret}`} aria-hidden="true">
          {open ? "expand_less" : "expand_more"}
        </span>
      </button>

      {open && (
        <div
          // biome-ignore lint/a11y/useSemanticElements: native <select optgroup> can't render the rich row layout (icon + name + meta + check)
          role="listbox"
          aria-label="Quick mode voice"
          className={css.menu}
        >
          <div className={css.menuHead}>
            <span className={css.menuHeadLabel}>Select voice</span>
          </div>

          {error && (
            <div className={css.menuError} role="alert">
              {error}
            </div>
          )}

          {grouped.uploaded.length > 0 && (
            <Group label="Uploaded">
              {grouped.uploaded.map((v) => (
                <VoiceRow
                  key={v.voiceAssetId}
                  voice={v}
                  selected={selected === v.voiceAssetId}
                  onSelect={() => void handleSelect(v.voiceAssetId)}
                />
              ))}
            </Group>
          )}

          {grouped.other.length > 0 && (
            <Group label="Other">
              {grouped.other.map((v) => (
                <VoiceRow
                  key={v.voiceAssetId}
                  voice={v}
                  selected={selected === v.voiceAssetId}
                  onSelect={() => void handleSelect(v.voiceAssetId)}
                />
              ))}
            </Group>
          )}
        </div>
      )}
    </div>
  );
}

interface GroupProps {
  readonly label: string;
  readonly children: React.ReactNode;
}

function Group({ label, children }: GroupProps): JSX.Element {
  return (
    <div className={css.group}>
      <div className={css.groupLabel}>{label}</div>
      {children}
    </div>
  );
}

interface VoiceRowProps {
  readonly voice: VoiceAsset;
  readonly selected: boolean;
  readonly onSelect: () => void;
}

function VoiceRow({ voice, selected, onSelect }: VoiceRowProps): JSX.Element {
  return (
    <button
      type="button"
      // biome-ignore lint/a11y/useSemanticElements: rich row layout doesn't map cleanly to a native <option>
      role="option"
      aria-selected={selected}
      className={`${css.menuItem} ${selected ? css.menuItemActive : ""}`}
      onClick={onSelect}
    >
      <span className={css.menuItemDot} aria-hidden="true" />
      <span className={css.menuItemName}>{voice.displayName}</span>
      <span className={css.menuItemMeta}>{buildMetaLine(voice)}</span>
      {selected && (
        <span className={`material-symbols-outlined ${css.menuItemCheck}`} aria-hidden="true">
          check
        </span>
      )}
    </button>
  );
}

const WAVE_BARS = [0.35, 0.7, 0.5, 0.85, 0.45, 0.6, 0.32, 0.78, 0.4, 0.55, 0.7, 0.36];

function buildMetaLine(voice: VoiceAsset): string {
  const parts: string[] = [];
  if (voice.durationMs != null) parts.push(formatDuration(voice.durationMs));
  if (voice.sampleRate != null) parts.push(`${(voice.sampleRate / 1000).toFixed(1)} kHz`);
  if (voice.kind && voice.kind !== "speaker") parts.push(voice.kind);
  return parts.length > 0 ? parts.join(" · ") : "—";
}

function formatDuration(ms: number): string {
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.round(seconds - minutes * 60);
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}
