import { useEffect, useState } from "react";
import { setDefaultVoice } from "../../../services/deployments_client";
import { listVoiceAssets, type VoiceAsset } from "../../../services/voice_assets_client";
import { EmptyState } from "../../../components/empty_state";
import * as css from "./quick_voice_picker.css";

interface Props {
  deploymentId: string;
  initialVoiceAssetId: string | null;
  onChange?: (voiceAssetId: string | null) => void;
}

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

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listVoiceAssets(deploymentId)
      .then(({ voiceAssets }) => {
        if (!cancelled) setVoices(voiceAssets);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load voices");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [deploymentId]);

  async function handleSelect(voiceAssetId: string | null): Promise<void> {
    setBusy(true);
    setError(null);
    const previous = selected;
    setSelected(voiceAssetId);
    try {
      await setDefaultVoice(deploymentId, voiceAssetId);
      onChange?.(voiceAssetId);
    } catch (err: unknown) {
      setSelected(previous);
      setError(err instanceof Error ? err.message : "Failed to update default voice");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <p className={css.loading}>Loading voices…</p>;
  }

  if (error) {
    return <p className={css.error}>{error}</p>;
  }

  if (voices.length === 0) {
    return (
      <div role="radiogroup" aria-label="Default voice for quick mode">
        <EmptyState
          title="No voices yet."
          hint="Upload a voice in Mappings to enable quick mode."
        />
      </div>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Default voice for quick mode"
      className={css.grid}
    >
      {voices.map((v) => {
        const isSelected = v.voiceAssetId === selected;
        return (
          <button
            key={v.voiceAssetId}
            type="button"
            // biome-ignore lint/a11y/useSemanticElements: button-based radio preserves focus styles + click semantics across browsers — native radio doesn't fit the card-grid visual
            role="radio"
            aria-checked={isSelected}
            disabled={busy}
            onClick={() => void handleSelect(isSelected ? null : v.voiceAssetId)}
            className={isSelected ? css.cardSelected : css.card}
          >
            <span className={css.cardName}>{v.displayName}</span>
            {v.durationMs !== null && v.durationMs !== undefined && (
              <span className={css.cardMeta}>{formatDuration(v.durationMs)}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function formatDuration(ms: number): string {
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.round(seconds - minutes * 60);
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}
