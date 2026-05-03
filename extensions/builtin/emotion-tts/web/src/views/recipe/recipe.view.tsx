import { useCallback, useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import { Toaster, toast } from "sonner";
import {
  applyVoiceAssetEdit,
  clearVoiceAssetEdit,
  type EditChain,
} from "../../services/audio_edit_client";
import type { Deployment } from "../../services/deployments_client";
import {
  createMapping,
  deactivateMapping,
  patchMapping,
  type CharacterMapping,
} from "../../services/mappings_client";
import type {
  CachePolicy,
  CreateRunRequest,
  GlobalEmotion,
  OutputFormat,
  RunSummary,
} from "../../services/types";
import { listVoiceAssets, uploadVoiceAsset, type VoiceAsset } from "../../services/voice_assets_client";
import { listPresets, type VectorPreset } from "../../services/presets_client";
import type { WorkflowResponse } from "../../services/workflows_client";
import { AuditHistoryPanel, type AuditTargetOption } from "./components/audit_history_panel";
import { CastRow, CastSection } from "./components/cast_row";
import { DepRecipeBanner } from "./components/dep_recipe_banner";
import { DeploymentHeader } from "./components/deployment_header";
import { DirectModSliderStrip } from "./components/direct_mod_slider_strip";
import { EmotionStudio } from "./components/emotion_studio";
import { GenerationSettingsPanel } from "./components/generation_settings_panel";
import { ParsedDialogue } from "./components/parsed_dialogue";
import { PerformanceSliders, PERFORMANCE_DEFAULTS, type PerformanceSlidersValue } from "./components/performance_sliders";
import { PreFlightBlock, type PreFlightCheck } from "./components/pre_flight_block";
import { QuickVoicePicker } from "./components/quick_voice_picker";
import { RecentRuns } from "./components/recent_runs";
import { RunPanel } from "./components/run_panel";
import { ScriptEditor } from "./components/script_editor";
import {
  assignCharacterColors,
  lineCountByCharacter,
  parseDialogue,
  uniqueCharacters,
} from "./lib/parse_dialogue";
import {
  IDENTITY_SLIDER_STATE,
  type DirectModSliderState,
} from "./lib/slider_chain";
import { RecipeUi } from "./recipe.ui";

const notify = {
  success(message: string): void {
    toast.success(message);
  },
  error(message: string): void {
    toast.error(message);
  },
};

function safeParseGeneration(json: string): Record<string, unknown> {
  try {
    const v = JSON.parse(json) as unknown;
    return typeof v === "object" && v !== null ? (v as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

interface LoaderData {
  deployment: Deployment;
  mappings: CharacterMapping[];
  runs: RunSummary[];
  workflow: WorkflowResponse;
}

export function RecipeView(): JSX.Element {
  const { deployment, mappings: initialMappings, runs, workflow } = useLoaderData() as LoaderData;

  const [mappings, setMappings] = useState<CharacterMapping[]>(initialMappings);
  const [voiceAssets, setVoiceAssets] = useState<VoiceAsset[]>([]);
  const [vectorPresets, setVectorPresets] = useState<VectorPreset[]>([]);
  const [activeCastCharacter, setActiveCastCharacter] = useState<string | null>(null);
  const [sliderState, setSliderState] = useState<DirectModSliderState>(IDENTITY_SLIDER_STATE);

  const [script, setScript] = useState("");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(
    (deployment.defaultOutputFormat as OutputFormat) ?? "mp3",
  );
  const [speedFactor, setSpeedFactor] = useState<number>(deployment.defaultSpeedFactor ?? 1.0);
  const [globalEmotion, setGlobalEmotion] = useState<GlobalEmotion>({
    mode: "none",
    emotionAlpha: 1.0,
  });
  const [generation, setGeneration] = useState<Record<string, unknown>>(() => {
    const seeded = deployment.defaultGenerationOverridesJson
      ? safeParseGeneration(deployment.defaultGenerationOverridesJson)
      : {};
    return {
      temperature: 0.8,
      top_p: 0.8,
      seed: 42,
      ...seeded,
    };
  });
  const [cachePolicy, setCachePolicy] = useState<CachePolicy>("use_cache");
  // Mirror the deployment's default-voice id locally so `QuickVoicePicker`
  // updates propagate without a full loader refetch. `useLoaderData` only
  // re-runs on route revalidation; until then the picker would persist a
  // change to the backend but the recipe's `unmappedCount` + `Quick voice`
  // diagnostic would still observe the stale loader value (HIGH-3).
  const [defaultVoiceAssetId, setDefaultVoiceAssetId] = useState<string | null>(
    deployment.defaultVoiceAssetId ?? null,
  );
  const [quickMode, setQuickMode] = useState(deployment.defaultVoiceAssetId != null);
  const [performance, setPerformance] = useState<PerformanceSlidersValue>(PERFORMANCE_DEFAULTS);

  useEffect(() => {
    let cancelled = false;
    listVoiceAssets(deployment.deploymentId)
      .then((r) => {
        if (!cancelled) setVoiceAssets(r.voiceAssets);
      })
      .catch(() => undefined);
    listPresets(deployment.deploymentId)
      .then((r) => {
        if (!cancelled) setVectorPresets(r.presets);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [deployment.deploymentId]);

  const parsedLines = useMemo(() => parseDialogue(script), [script]);
  const characters = useMemo(() => uniqueCharacters(parsedLines), [parsedLines]);
  const characterColors = useMemo(() => assignCharacterColors(characters), [characters]);
  const lineCounts = useMemo(() => lineCountByCharacter(parsedLines), [parsedLines]);

  const mappingsByLower = useMemo(() => {
    const map = new Map<string, CharacterMapping>();
    for (const m of mappings) {
      map.set(m.characterName.toLowerCase(), m);
    }
    return map;
  }, [mappings]);

  const unmappedCount = useMemo(() => {
    // Quick-mode with a default voice covers every unmapped character;
    // the dispatcher (`prepare.rs::prepare`) falls back to the deployment
    // default when no character mapping resolves. Without a default voice
    // unmapped lines would fail at run-creation time, so still count them
    // as unmapped for the pre-flight UI.
    if (quickMode && defaultVoiceAssetId) return 0;
    return characters.filter((c) => !mappingsByLower.has(c.toLowerCase())).length;
  }, [characters, mappingsByLower, quickMode, defaultVoiceAssetId]);

  const upsertMapping = useCallback(
    async (
      characterName: string,
      patch: Partial<CharacterMapping>,
    ): Promise<void> => {
      const existing = mappingsByLower.get(characterName.toLowerCase());
      try {
        if (existing) {
          const updated = await patchMapping(deployment.deploymentId, existing.mappingId, patch);
          setMappings((prev) =>
            prev.map((m) => (m.mappingId === updated.mappingId ? updated : m)),
          );
          notify.success(`Updated mapping for ${characterName}`);
        } else if (patch.speakerVoiceAssetId) {
          const created = await createMapping(deployment.deploymentId, {
            ...patch,
            characterName,
            speakerVoiceAssetId: patch.speakerVoiceAssetId,
          });
          setMappings((prev) => [...prev, created]);
          notify.success(`Mapped ${characterName} to voice`);
        }
      } catch (err: unknown) {
        notify.error(err instanceof Error ? err.message : "mapping failed");
      }
    },
    [mappingsByLower, deployment.deploymentId],
  );

  const handleClearMapping = useCallback(
    async (characterName: string): Promise<void> => {
      const existing = mappingsByLower.get(characterName.toLowerCase());
      if (!existing) return;
      try {
        await deactivateMapping(deployment.deploymentId, existing.mappingId);
        setMappings((prev) => prev.filter((m) => m.mappingId !== existing.mappingId));
        notify.success(`Cleared mapping for ${characterName}`);
      } catch (err: unknown) {
        notify.error(err instanceof Error ? err.message : "clear failed");
      }
    },
    [mappingsByLower, deployment.deploymentId],
  );

  const handleUploadAndMap = useCallback(
    async (characterName: string, file: File): Promise<void> => {
      try {
        const asset = await uploadVoiceAsset(
          deployment.deploymentId,
          file,
          file.name.replace(/\.[^.]+$/, ""),
          "speaker",
        );
        setVoiceAssets((prev) => [asset, ...prev]);
        await upsertMapping(characterName, { speakerVoiceAssetId: asset.voiceAssetId });
      } catch (err: unknown) {
        notify.error(err instanceof Error ? err.message : "upload failed");
      }
    },
    [deployment.deploymentId, upsertMapping],
  );

  const handleSliderChange = useCallback((next: DirectModSliderState) => {
    setSliderState(next);
  }, []);

  const auditTargets = useMemo<AuditTargetOption[]>(() => {
    const targets: AuditTargetOption[] = [];
    const seen = new Set<string>();
    for (const m of mappings) {
      const id = m.speakerVoiceAssetId;
      if (!id || seen.has(id)) continue;
      seen.add(id);
      const asset = voiceAssets.find((a) => a.voiceAssetId === id);
      const label = asset?.displayName ?? `${m.characterName} · ${id.slice(0, 8)}`;
      targets.push({ kind: "voice_asset", id, label });
    }
    for (const a of voiceAssets) {
      if (seen.has(a.voiceAssetId)) continue;
      seen.add(a.voiceAssetId);
      targets.push({ kind: "voice_asset", id: a.voiceAssetId, label: a.displayName });
    }
    return targets;
  }, [mappings, voiceAssets]);

  const handleRevertAuditToChain = useCallback(
    async (target: AuditTargetOption, chainJson: string): Promise<void> => {
      if (target.kind !== "voice_asset") {
        notify.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let parsed: EditChain;
      try {
        const raw = JSON.parse(chainJson) as unknown;
        if (
          typeof raw !== "object" ||
          raw === null ||
          (raw as { version?: unknown }).version !== 1 ||
          !Array.isArray((raw as { ops?: unknown }).ops)
        ) {
          throw new Error("snapshot is not a valid EditChain");
        }
        parsed = raw as EditChain;
      } catch (err: unknown) {
        notify.error(
          err instanceof Error
            ? `Audit snapshot is malformed: ${err.message}`
            : "Audit snapshot is malformed; cannot revert.",
        );
        return;
      }
      try {
        const response = await applyVoiceAssetEdit(target.id, deployment.deploymentId, {
          chain: parsed,
        });
        const affected = mappings.filter((m) => m.speakerVoiceAssetId === target.id);
        await Promise.all(
          affected.map((m) =>
            patchMapping(deployment.deploymentId, m.mappingId, {
              voiceAssetChainDigest: response.chain_digest,
            }).catch(() => null),
          ),
        );
        setMappings((prev) =>
          prev.map((m) =>
            m.speakerVoiceAssetId === target.id
              ? { ...m, voiceAssetChainDigest: response.chain_digest }
              : m,
          ),
        );
        notify.success(`Reverted ${target.label} to a prior chain`);
      } catch (err: unknown) {
        notify.error(err instanceof Error ? err.message : "revert failed");
      }
    },
    [deployment.deploymentId, mappings],
  );

  const handleRevertAudit = useCallback(
    async (target: AuditTargetOption): Promise<void> => {
      if (target.kind !== "voice_asset") {
        notify.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await clearVoiceAssetEdit(target.id, deployment.deploymentId);
        const affected = mappings.filter((m) => m.speakerVoiceAssetId === target.id);
        await Promise.all(
          affected.map((m) =>
            patchMapping(deployment.deploymentId, m.mappingId, {
              voiceAssetChainDigest: null,
            }).catch(() => null),
          ),
        );
        setMappings((prev) =>
          prev.map((m) =>
            m.speakerVoiceAssetId === target.id
              ? { ...m, voiceAssetChainDigest: null }
              : m,
          ),
        );
        notify.success(`Cleared edit chain on ${target.label}`);
      } catch (err: unknown) {
        notify.error(err instanceof Error ? err.message : "revert failed");
      }
    },
    [deployment.deploymentId, mappings],
  );

  const createPayload: CreateRunRequest = useMemo(
    () => ({
      script,
      parserMode: quickMode ? "raw_text" : "dialogue",
      outputFormat,
      speedFactor,
      globalEmotion: { ...globalEmotion, emotionAlpha: performance.intensity },
      generation,
      cachePolicy,
    }),
    [script, quickMode, outputFormat, speedFactor, performance.intensity, globalEmotion, generation, cachePolicy],
  );

  const diagnostics = useMemo(
    () => buildDiagnostics({
      script,
      quickMode,
      defaultVoiceAssetId,
      characters,
      unmappedCount,
      globalEmotion,
      performance,
    }),
    [script, quickMode, defaultVoiceAssetId, characters, unmappedCount, globalEmotion, performance],
  );

  const legacyDiagnostics = useMemo(
    () =>
      diagnostics
        .filter((d) => d.id !== "performance")
        .map((d) => ({
          label: d.label,
          status: d.status === "ok" ? "ok" : d.status === "warn" ? "warn" : "fail",
          detail: d.detail,
        })) as { label: string; status: "ok" | "warn" | "fail"; detail?: string }[],
    [diagnostics],
  );

  return (
    <>
      <Toaster position="bottom-right" richColors theme="dark" />
      <RecipeUi
      deployment={deployment}
      workflowCustomised={workflow.workflow.customised}
      unmappableFields={workflow.unmappableFields}
      hero={
        <>
          <DeploymentHeader deployment={deployment} />
          <DepRecipeBanner
            runtimeId={deployment.backendRuntimePreference ?? "indextts.python"}
            device={null}
            sampleRateHz={null}
            lineCount={parsedLines.length}
            charCount={script.length}
            estimatedDurationS={parsedLines.length * 4}
          />
        </>
      }
      scriptSection={
        <ScriptSection
          quickMode={quickMode}
          onToggleQuickMode={setQuickMode}
          deployment={deployment}
          script={script}
          onScriptChange={setScript}
          outputFormat={outputFormat}
          mappingsByLower={mappingsByLower}
          defaultVoiceAssetId={defaultVoiceAssetId}
          onDefaultVoiceAssetIdChange={setDefaultVoiceAssetId}
        />
      }
      parsedDialogueSection={
        <ParsedDialogue lines={parsedLines} characterColors={characterColors} />
      }
      castSection={
        <CastSection unmappedCount={unmappedCount} totalCount={characters.length}>
          {characters.map((name) => {
            const mapping = mappingsByLower.get(name.toLowerCase()) ?? null;
            // audit-allow: hex — neon decorative palette per design lang
            const color = characterColors[name] ?? "#ba9eff";
            return (
              <li key={name} style={{ listStyle: "none" }}>
                <CastRow
                  characterName={name}
                  color={color}
                  lineCount={lineCounts[name] ?? 0}
                  mapping={mapping}
                  voiceAssets={voiceAssets}
                  presets={vectorPresets}
                  active={activeCastCharacter === name}
                  onToggle={() =>
                    setActiveCastCharacter((c) => (c === name ? null : name))
                  }
                  onAssignVoiceAsset={(voiceAssetId) =>
                    upsertMapping(name, { speakerVoiceAssetId: voiceAssetId })
                  }
                  onAssignPreset={(presetId) =>
                    upsertMapping(name, { defaultVectorPresetId: presetId })
                  }
                  onUploadFile={(file) => handleUploadAndMap(name, file)}
                  onClearMapping={() => handleClearMapping(name)}
                />
              </li>
            );
          })}
        </CastSection>
      }
      emotionSection={
        <EmotionStudio
          value={globalEmotion}
          onChange={setGlobalEmotion}
          deploymentId={deployment.deploymentId}
        />
      }
      performanceSection={
        <>
          <PerformanceSliders
            value={{ ...performance, pace: speedFactor }}
            onChange={(next) => {
              setPerformance(next);
              if (next.pace !== speedFactor) setSpeedFactor(next.pace);
            }}
          />
          <DirectModSliderStrip
            state={sliderState}
            onChange={handleSliderChange}
            supportsSynthSpeed={false}
          />
          <PreFlightBlock checks={diagnostics} />
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
          <RunPanel
            deploymentId={deployment.deploymentId}
            createPayload={createPayload}
            canGenerate={script.trim().length > 0}
            diagnostics={legacyDiagnostics}
          />
        </>
      }
      recentRunsSection={
        <RecentRuns runs={runs} deploymentId={deployment.deploymentId} />
      }
      auditSection={
        <AuditHistoryPanel
          deploymentId={deployment.deploymentId}
          targets={auditTargets}
          onRevertToIdentity={handleRevertAudit}
          onRevertToChain={handleRevertAuditToChain}
        />
      }
      />
    </>
  );
}

interface ScriptSectionProps {
  quickMode: boolean;
  onToggleQuickMode: (v: boolean) => void;
  deployment: Deployment;
  script: string;
  onScriptChange: (v: string) => void;
  outputFormat: OutputFormat;
  mappingsByLower: Map<string, CharacterMapping>;
  defaultVoiceAssetId: string | null;
  onDefaultVoiceAssetIdChange: (id: string | null) => void;
}

function ScriptSection({
  quickMode,
  onToggleQuickMode,
  deployment,
  script,
  onScriptChange,
  outputFormat,
  mappingsByLower,
  defaultVoiceAssetId,
  onDefaultVoiceAssetIdChange,
}: ScriptSectionProps): JSX.Element {
  const charCount = script.length;
  const wordCount = script.trim() ? script.trim().split(/\s+/).length : 0;
  const lineCount = script.trim() ? script.trim().split(/\r?\n/).filter((l) => l.trim()).length : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={quickMode}
            onChange={(e) => onToggleQuickMode(e.target.checked)}
          />
          Quick mode (no character mapping required)
        </label>
        {quickMode && (
          <QuickVoicePicker
            deploymentId={deployment.deploymentId}
            initialVoiceAssetId={defaultVoiceAssetId}
            onChange={onDefaultVoiceAssetIdChange}
          />
        )}
        <div
          style={{
            display: "inline-flex",
            gap: 16,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--on-surface-variant)",
            marginLeft: "auto",
          }}
          aria-live="polite"
        >
          <span>
            <strong style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
              {charCount.toString().padStart(3, "0")}
            </strong>{" "}
            chars
          </span>
          <span>
            <strong style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
              {lineCount.toString().padStart(2, "0")}
            </strong>{" "}
            lines
          </span>
          <span>
            <strong style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
              {wordCount.toString().padStart(3, "0")}
            </strong>{" "}
            words
          </span>
        </div>
      </div>
      <ScriptEditor
        value={script}
        onChange={onScriptChange}
        outputFormat={outputFormat}
        mappings={mappingsByLower}
        deploymentId={deployment.deploymentId}
      />
      <ScriptSyntaxLegend />
    </div>
  );
}

function ScriptSyntaxLegend(): JSX.Element {
  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        padding: 0,
        margin: 0,
        listStyle: "none",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--on-surface-variant)",
      }}
    >
      <li>
        <code style={{ color: "var(--accent)" }}>[Char]</code> plain line
      </li>
      <li>
        <code style={{ color: "var(--accent)" }}>[Char|emotion_vector:happy=0.7]</code> per-line vector
      </li>
      <li>
        <code style={{ color: "var(--secondary)" }}>[Char|qwen:warm]</code> AI prompt mapping
      </li>
      <li>
        <code style={{ color: "var(--tertiary)" }}>[Char|preset:Bittersweet]</code> saved preset
      </li>
      <li>
        <code style={{ color: "var(--acid-green)" }}>[Char|audio:slow_breath.wav]</code> audio reference
      </li>
    </ul>
  );
}

interface BuildDiagnosticsArgs {
  script: string;
  quickMode: boolean;
  defaultVoiceAssetId: string | null | undefined;
  characters: readonly string[];
  unmappedCount: number;
  globalEmotion: GlobalEmotion;
  performance: PerformanceSlidersValue;
}

function buildDiagnostics({
  script,
  quickMode,
  defaultVoiceAssetId,
  characters,
  unmappedCount,
  globalEmotion,
  performance,
}: BuildDiagnosticsArgs): PreFlightCheck[] {
  const checks: PreFlightCheck[] = [];
  const trimmed = script.trim();
  if (!trimmed) {
    checks.push({ id: "script", status: "warn", label: "Script", detail: "empty" });
  } else {
    const lineCount = trimmed.split(/\r?\n/).filter((l) => l.trim()).length;
    checks.push({
      id: "script",
      status: "ok",
      label: "Script",
      detail: `${lineCount} lines · ${trimmed.length} chars`,
    });
  }

  if (quickMode) {
    checks.push({
      id: "voice",
      status: defaultVoiceAssetId ? "ok" : "warn",
      label: "Quick voice",
      detail: defaultVoiceAssetId ? "default voice set" : "no default voice",
    });
  } else if (characters.length === 0) {
    checks.push({ id: "cast", status: "info", label: "Cast", detail: "no characters detected" });
  } else if (unmappedCount === 0) {
    checks.push({ id: "cast", status: "ok", label: "Cast", detail: `${characters.length} mapped` });
  } else {
    checks.push({
      id: "cast",
      status: "warn",
      label: "Cast",
      detail: `${unmappedCount} unmapped`,
    });
  }

  if (globalEmotion.mode === "qwen_template" && !globalEmotion.qwenTemplate?.trim()) {
    checks.push({ id: "emotion", status: "warn", label: "Emotion", detail: "Qwen template empty" });
  } else if (globalEmotion.mode === "emotion_vector") {
    const v = globalEmotion.vector;
    const hasNonZero = Array.isArray(v) && v.some((n) => Math.abs(n) > 0.01);
    checks.push({
      id: "emotion",
      status: hasNonZero ? "ok" : "info",
      label: "Emotion",
      detail: hasNonZero ? "8-axis vector" : "neutral vector",
    });
  } else if (globalEmotion.mode === "audio_ref") {
    checks.push({ id: "emotion", status: "ok", label: "Emotion", detail: "audio reference" });
  } else {
    checks.push({ id: "emotion", status: "info", label: "Emotion", detail: "neutral" });
  }

  checks.push({
    id: "performance",
    status: "info",
    label: "Performance",
    detail: `intensity ${Math.round(performance.intensity * 100)}% · pace ${performance.pace.toFixed(2)}× · pitch ${performance.pitchSt >= 0 ? "+" : ""}${performance.pitchSt.toFixed(1)}st`,
  });

  return checks;
}
