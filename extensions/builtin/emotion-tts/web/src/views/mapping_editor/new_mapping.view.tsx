import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { createMapping } from "../../services/mappings_client";
import type { PersistedEmotionMode } from "../../services/types";
import { Banner } from "../../components/banner";
import { Button } from "../../components/button";

interface LoaderData {
  deploymentId: string;
  prefillCharacterName: string;
}

export function NewMappingView(): JSX.Element {
  const { deploymentId, prefillCharacterName } = useLoaderData() as LoaderData;
  const navigate = useNavigate();
  const [characterName, setCharacterName] = useState(prefillCharacterName);
  const [speakerVoiceAssetId, setSpeakerVoiceAssetId] = useState("");
  const [mode, setMode] = useState<PersistedEmotionMode>("none");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    nameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    nameRef.current?.focus();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createMapping(deploymentId, {
        characterName,
        speakerVoiceAssetId,
        defaultEmotionMode: mode,
      });
      navigate(`/${deploymentId}/recipe`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <h1>New character mapping</h1>
      <form onSubmit={submit}>
        <label>
          Character name
          <input
            ref={nameRef}
            value={characterName}
            onChange={(e) => setCharacterName(e.currentTarget.value)}
            required
          />
        </label>
        <label>
          Speaker voice asset id
          <input
            value={speakerVoiceAssetId}
            onChange={(e) => setSpeakerVoiceAssetId(e.currentTarget.value)}
            required
          />
        </label>
        <label>
          Emotion mode
          <select value={mode} onChange={(e) => setMode(e.currentTarget.value as PersistedEmotionMode)}>
            <option value="none">None</option>
            <option value="audio_ref">Audio ref</option>
            <option value="vector_preset">Vector preset</option>
            <option value="qwen_template">Qwen template</option>
          </select>
        </label>
        <Button type="submit" variant="primary" disabled={submitting}>
          Save mapping
        </Button>
        {error && <Banner severity="error">{error}</Banner>}
      </form>
    </main>
  );
}
