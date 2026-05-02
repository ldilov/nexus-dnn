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

  const diagnostics = useMemo(() => {
    const checks: Array<{ label: string; status: "ok" | "warn" | "fail"; detail?: string }> = [];
    const trimmed = script.trim();
    if (trimmed.length === 0) {
      checks.push({ label: "Script", status: "fail", detail: "empty" });
    } else {
      const lineCount = trimmed.split(/\r?\n/).filter((l) => l.trim().length > 0).length;
      checks.push({ label: "Script", status: "ok", detail: `${lineCount} lines` });
    }

    if (quickMode) {
      if (deployment.defaultVoiceAssetId) {
        checks.push({ label: "Quick voice", status: "ok", detail: "default voice set" });
      } else {
        checks.push({ label: "Quick voice", status: "fail", detail: "no default voice" });
      }
    } else {
      const referencedCharacters = new Set<string>();
      const tagRegex = /^\[(?<body>[^\]]*)\]/;
      for (const raw of trimmed.split(/\r?\n/)) {
        const line = raw.trim();
        if (!line) continue;
        const match = line.match(tagRegex);
        const head = match?.groups?.["body"]?.split("|")[0]?.trim() ?? "";
        const name = head.split(":")[0]?.trim() ?? "";
        if (name) referencedCharacters.add(name.toLowerCase());
      }
      const missing = Array.from(referencedCharacters).filter((n) => !mappingsByLower.has(n));
      if (referencedCharacters.size === 0) {
        checks.push({ label: "Cast", status: "warn", detail: "no characters detected" });
      } else if (missing.length === 0) {
        checks.push({
          label: "Cast",
          status: "ok",
          detail: `${referencedCharacters.size} mapped`,
        });
      } else {
        checks.push({
          label: "Cast",
          status: "fail",
          detail: `${missing.length} unmapped`,
        });
      }
    }

    if (globalEmotion.mode === "qwen_template" && !globalEmotion.qwenTemplate?.trim()) {
      checks.push({ label: "Emotion", status: "warn", detail: "Qwen template empty" });
    }

    return checks;
  }, [script, quickMode, deployment.defaultVoiceAssetId, mappingsByLower, globalEmotion]);

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
          diagnostics={diagnostics}
        />
      }
      historyPanel={<HistoryPanel runs={runs} deploymentId={deployment.deploymentId} />}
    />
  );
}
