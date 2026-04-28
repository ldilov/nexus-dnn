import { useEffect, useState } from "react";
import { setDefaultVoice } from "../../../services/deployments_client";
import { listVoiceAssets, type VoiceAsset } from "../../../services/voice_assets_client";

interface Props {
  deploymentId: string;
  initialVoiceAssetId: string | null;
  onChange?: (voiceAssetId: string | null) => void;
}

export function QuickVoicePicker({ deploymentId, initialVoiceAssetId, onChange }: Props): JSX.Element {
  const [voices, setVoices] = useState<VoiceAsset[]>([]);
  const [selected, setSelected] = useState<string>(initialVoiceAssetId ?? "");

  useEffect(() => {
    listVoiceAssets(deploymentId)
      .then(({ voiceAssets }) => setVoices(voiceAssets))
      .catch(() => setVoices([]));
  }, [deploymentId]);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>): Promise<void> {
    const v = e.target.value || null;
    setSelected(v ?? "");
    await setDefaultVoice(deploymentId, v);
    onChange?.(v);
  }

  return (
    <select value={selected} onChange={handleChange}>
      <option value="">— choose voice —</option>
      {voices.map((v) => (
        <option key={v.voiceAssetId} value={v.voiceAssetId}>
          {v.displayName}
        </option>
      ))}
    </select>
  );
}
