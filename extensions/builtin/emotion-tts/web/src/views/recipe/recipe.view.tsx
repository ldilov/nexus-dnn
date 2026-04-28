import { useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import type { Deployment } from "../../services/deployments_client";
import type { CharacterMapping } from "../../services/mappings_client";
import type {
  CachePolicy,
  CreateRunRequest,
  GlobalEmotion,
  OutputFormat,
  RunSummary,
} from "../../services/types";
import type { WorkflowResponse } from "../../services/workflows_client";
import { DeploymentHeader } from "./components/deployment_header";
import { EmotionPanel } from "./components/emotion_panel";
import { GenerationSettingsPanel } from "./components/generation_settings_panel";
import { HistoryPanel } from "./components/history_panel";
import { QuickVoicePicker } from "./components/quick_voice_picker";
import { RunPanel } from "./components/run_panel";
import { ScriptEditor } from "./components/script_editor";
import { RecipeUi } from "./recipe.ui";

interface LoaderData {
  deployment: Deployment;
  mappings: CharacterMapping[];
  runs: RunSummary[];
  workflow: WorkflowResponse;
}

export function RecipeView(): JSX.Element {
  const { deployment, mappings, runs, workflow } = useLoaderData() as LoaderData;

  const [script, setScript] = useState("");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(
    (deployment.defaultOutputFormat as OutputFormat) ?? "mp3",
  );
  const [speedFactor, setSpeedFactor] = useState<number>(deployment.defaultSpeedFactor ?? 1.0);
  const [globalEmotion, setGlobalEmotion] = useState<GlobalEmotion>({
    mode: "none",
    emotionAlpha: 1.0,
  });
  const [generation, setGeneration] = useState<Record<string, unknown>>({});
  const [cachePolicy, setCachePolicy] = useState<CachePolicy>("use_cache");
  const [quickMode, setQuickMode] = useState(deployment.defaultVoiceAssetId != null);

  const createPayload: CreateRunRequest = useMemo(
    () => ({
      script,
      parserMode: quickMode ? "raw_text" : "dialogue",
      outputFormat,
      speedFactor,
      globalEmotion,
      generation,
      cachePolicy,
    }),
    [script, quickMode, outputFormat, speedFactor, globalEmotion, generation, cachePolicy],
  );

  const mappingsByLower = useMemo(() => {
    const map = new Map<string, CharacterMapping>();
    for (const m of mappings) {
      map.set(m.characterName.toLowerCase(), m);
    }
    return map;
  }, [mappings]);

  return (
    <RecipeUi
      deployment={deployment}
      workflowCustomised={workflow.workflow.customised}
      unmappableFields={workflow.unmappableFields}
      header={<DeploymentHeader deployment={deployment} />}
      scriptEditor={
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="checkbox"
                checked={quickMode}
                onChange={(e) => setQuickMode(e.target.checked)}
              />
              Quick mode (no character mapping required)
            </label>
            {quickMode && (
              <QuickVoicePicker
                deploymentId={deployment.deploymentId}
                initialVoiceAssetId={deployment.defaultVoiceAssetId ?? null}
              />
            )}
          </div>
          <ScriptEditor
            value={script}
            onChange={setScript}
            outputFormat={outputFormat}
            mappings={mappingsByLower}
            deploymentId={deployment.deploymentId}
          />
        </div>
      }
      emotionPanel={
        <EmotionPanel
          value={globalEmotion}
          onChange={setGlobalEmotion}
          deploymentId={deployment.deploymentId}
        />
      }
      settingsPanel={
        <GenerationSettingsPanel
          outputFormat={outputFormat}
          onOutputFormatChange={setOutputFormat}
          speedFactor={speedFactor}
          onSpeedFactorChange={setSpeedFactor}
          cachePolicy={cachePolicy}
          onCachePolicyChange={setCachePolicy}
          generation={generation}
          onGenerationChange={setGeneration}
        />
      }
      runPanel={
        <RunPanel
          deploymentId={deployment.deploymentId}
          createPayload={createPayload}
          canGenerate={script.trim().length > 0}
        />
      }
      historyPanel={<HistoryPanel runs={runs} deploymentId={deployment.deploymentId} />}
    />
  );
}
