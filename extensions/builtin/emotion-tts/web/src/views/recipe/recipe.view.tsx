import { useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import type { Deployment } from "../../services/deployments_client";
import type { CharacterMapping } from "../../services/mappings_client";
import type {
  CreateRunRequest,
  GlobalEmotion,
  OutputFormat,
  RunSummary,
} from "../../services/types";
import { DeploymentHeader } from "./components/deployment_header";
import { EmotionPanel } from "./components/emotion_panel";
import { GenerationSettingsPanel } from "./components/generation_settings_panel";
import { HistoryPanel } from "./components/history_panel";
import { RunPanel } from "./components/run_panel";
import { ScriptEditor } from "./components/script_editor";
import { RecipeUi } from "./recipe.ui";

interface LoaderData {
  deployment: Deployment;
  mappings: CharacterMapping[];
  runs: RunSummary[];
}

export function RecipeView(): JSX.Element {
  const { deployment, mappings, runs } = useLoaderData() as LoaderData;

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

  const createPayload: CreateRunRequest = useMemo(
    () => ({
      script,
      outputFormat,
      speedFactor,
      globalEmotion,
      generation,
    }),
    [script, outputFormat, speedFactor, globalEmotion, generation],
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
      header={<DeploymentHeader deployment={deployment} />}
      scriptEditor={
        <ScriptEditor
          value={script}
          onChange={setScript}
          outputFormat={outputFormat}
          mappings={mappingsByLower}
          deploymentId={deployment.deploymentId}
        />
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
