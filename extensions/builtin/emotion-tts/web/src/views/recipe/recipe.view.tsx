import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { Toaster, toast } from "sonner";
import {
  applyVoiceAssetEdit,
  clearVoiceAssetEdit,
  type EditChain,
} from "../../services/audio_edit_client";
import type { Deployment } from "../../services/deployments_client";
import { apiFetch } from "../../services/http";
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
  PrebuiltSegment,
  RunSummary,
} from "../../services/types";
import { listVoiceAssets, uploadVoiceAsset, type VoiceAsset } from "../../services/voice_assets_client";
import { castListItem as castListItemClass } from "./recipe.css";
import { VoiceLibrary } from "./components/voice_library/voice_library";
import { listPresets, type VectorPreset } from "../../services/presets_client";
import type { WorkflowResponse } from "../../services/workflows_client";
import { AuditHistoryPanel, type AuditTargetOption } from "./components/audit_history_panel";
import { CastRow, CastSection } from "./components/cast_row";
import { DeploymentHeader } from "./components/deployment_header";
import { DirectModSliderStrip } from "./components/direct_mod_slider_strip";
import { EmotionStudio } from "./components/emotion_studio";
import { GenerationSettingsPanel } from "./components/generation_settings_panel";
import { ParsedDialogue } from "./components/parsed_dialogue";
import { PerformanceSliders, PERFORMANCE_DEFAULTS, type PerformanceSlidersValue } from "./components/performance_sliders";
import { PreFlightBlock } from "./components/pre_flight_block";
import { RecentRuns } from "./components/recent_runs";
import { RecentGenerationsCard } from "./components/recent_generations_card";
import { RunPanel } from "./components/run_panel";
import type { StoryboardJob } from "./components/run_panel_items";
import type { RunProgress } from "./components/storyboard/storyboard_data";
import { ScriptSection } from "./components/script_section/script_section";
import type { EditorMode } from "./components/editor_mode_toggle/editor_mode_toggle";
import { buildDiagnostics } from "./lib/build_diagnostics";
import {
  newEmptyRow,
  serialiseRowsToScript,
  type PerCharacterRow,
} from "./lib/serialise_rows";
import { tokeniseStory } from "./lib/story_tokens";
import { hasContentForMode, migrate } from "./lib/mode_migrate";
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

const RECIPE_META_KEY = "__recipe";

function safeParseGeneration(json: string): Record<string, unknown> {
  try {
    const v = JSON.parse(json) as unknown;
    return typeof v === "object" && v !== null ? (v as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

function stripRecipeMeta(
  overrides: Record<string, unknown>,
): Record<string, unknown> {
  // The namespaced `__recipe` blob is a sidecar for UI settings (quickMode,
  // cachePolicy) and must not bleed into the generation-overrides payload
  // sent to the worker. Build a fresh object excluding that key without
  // tripping the unused-binding lint.
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(overrides)) {
    if (key === RECIPE_META_KEY) continue;
    out[key] = overrides[key];
  }
  return out;
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

  const seededOverrides = useMemo(
    () =>
      deployment.defaultGenerationOverridesJson
        ? safeParseGeneration(deployment.defaultGenerationOverridesJson)
        : {},
    [deployment.defaultGenerationOverridesJson],
  );
  const seededRecipeMeta = useMemo(() => {
    const meta = seededOverrides[RECIPE_META_KEY];
    return typeof meta === "object" && meta !== null
      ? (meta as Record<string, unknown>)
      : {};
  }, [seededOverrides]);

  const [script, setScript] = useState("");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(
    (deployment.defaultOutputFormat as OutputFormat) ?? "mp3",
  );
  const [speedFactor, setSpeedFactor] = useState<number>(deployment.defaultSpeedFactor ?? 1.0);
  const [globalEmotion, setGlobalEmotion] = useState<GlobalEmotion>({
    mode: "none",
    emotionAlpha: 1.0,
  });
  const [generation, setGeneration] = useState<Record<string, unknown>>(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...stripRecipeMeta(seededOverrides),
  }));
  const [cachePolicy, setCachePolicy] = useState<CachePolicy>(() => {
    const v = seededRecipeMeta["cachePolicy"];
    return v === "use_cache" || v === "force_regenerate" || v === "read_only_cache"
      ? v
      : "use_cache";
  });
  // Mirror the deployment's default-voice id locally so `QuickVoicePicker`
  // updates propagate without a full loader refetch. `useLoaderData` only
  // re-runs on route revalidation; until then the picker would persist a
  // change to the backend but the recipe's `unmappedCount` + `Quick voice`
  // diagnostic would still observe the stale loader value (HIGH-3).
  const [defaultVoiceAssetId, setDefaultVoiceAssetId] = useState<string | null>(
    deployment.defaultVoiceAssetId ?? null,
  );
  const [editorMode, setEditorMode] = useState<EditorMode>(() => {
    const persisted = seededRecipeMeta["editorMode"];
    if (persisted === "quick" || persisted === "rows" || persisted === "story" || persisted === "storyboard") {
      return persisted;
    }
    if (typeof seededRecipeMeta["quickMode"] === "boolean") {
      return "quick";
    }
    return deployment.defaultVoiceAssetId != null ? "quick" : "rows";
  });
  const quickMode = editorMode === "quick";
  const [rows, setRows] = useState<PerCharacterRow[]>(() => [newEmptyRow()]);
  const STORY_TEXT_SOFT_CAP = 100_000;
  const [storyText, setStoryTextRaw] = useState<string>(() => {
    const persisted = seededRecipeMeta["storyText"];
    return typeof persisted === "string" ? persisted : "";
  });
  const storyCapWarnedRef = useRef(false);
  const setStoryText = useCallback((next: string) => {
    if (next.length > STORY_TEXT_SOFT_CAP && !storyCapWarnedRef.current) {
      storyCapWarnedRef.current = true;
      notify.error(
        `Story text is over ${Math.round(STORY_TEXT_SOFT_CAP / 1000)} KB — large scripts may slow down save and rendering.`,
      );
    }
    if (next.length <= STORY_TEXT_SOFT_CAP) {
      storyCapWarnedRef.current = false;
    }
    setStoryTextRaw(next);
  }, []);
  const [performance, setPerformance] = useState<PerformanceSlidersValue>(PERFORMANCE_DEFAULTS);
  const [prebuiltSegments, setPrebuiltSegments] = useState<PrebuiltSegment[]>([]);
  const [storyboardJobs, setStoryboardJobs] = useState<StoryboardJob[]>([]);
  const [jobProgress, setJobProgress] = useState<ReadonlyMap<string, RunProgress>>(
    () => new Map(),
  );

  const scriptRef = useRef(script);
  const rowsRefMode = useRef(rows);
  const storyTextRef = useRef(storyText);
  const vectorPresetsRef = useRef(vectorPresets);
  useEffect(() => { scriptRef.current = script; }, [script]);
  useEffect(() => { rowsRefMode.current = rows; }, [rows]);
  useEffect(() => { storyTextRef.current = storyText; }, [storyText]);
  useEffect(() => { vectorPresetsRef.current = vectorPresets; }, [vectorPresets]);

  const [migrationLiveMessage, setMigrationLiveMessage] = useState("");

  const requestEditorModeChange = useCallback(
    (next: EditorMode) => {
      setEditorMode((current) => {
        if (next === current) return current;
        const source = {
          script: scriptRef.current,
          rows: rowsRefMode.current,
          storyText: storyTextRef.current,
        };
        const targetHasContent = hasContentForMode(next, source);
        const sourceHasContent = hasContentForMode(current, source);
        if (!targetHasContent && sourceHasContent) {
          const result = migrate(current, next, source, vectorPresetsRef.current);
          if (result) {
            const snapshot = { ...source };
            const previouslyFocused = document.activeElement as HTMLElement | null;
            if (result.script !== undefined) setScript(result.script);
            if (result.rows !== undefined) setRows(result.rows);
            if (result.storyText !== undefined) setStoryText(result.storyText);
            const labelMap: Record<EditorMode, string> = {
              quick: "Quick",
              rows: "Per-character",
              story: "Story",
              storyboard: "Storyboard",
            };
            const countLines = (s: string): number =>
              s.split(/\r?\n/).filter((l) => l.trim().length > 0).length;
            const count = result.rows !== undefined
              ? result.rows.length
              : result.script !== undefined
                ? countLines(result.script)
                : result.storyText !== undefined
                  ? countLines(result.storyText)
                  : 0;
            const unit = count === 1 ? "line" : "lines";
            const detail = count > 0 ? ` (${count} ${unit})` : "";
            const liveMsg = `Switched to ${labelMap[next]} mode${count > 0 ? `, ${count} ${unit}` : ""}.`;
            setMigrationLiveMessage((prev) => (prev === liveMsg ? `${liveMsg}​` : liveMsg));
            toast(`Switched to ${labelMap[next]}${detail} — content kept`, {
              action: {
                label: "Undo",
                onClick: () => {
                  setScript(snapshot.script);
                  setRows([...snapshot.rows]);
                  setStoryText(snapshot.storyText);
                  setEditorMode(current);
                  if (previouslyFocused && typeof previouslyFocused.focus === "function") {
                    requestAnimationFrame(() => previouslyFocused.focus());
                  }
                },
              },
              duration: 5000,
            });
          }
        }
        return next;
      });
    },
    [setStoryText],
  );

  useEffect(() => {
    let cancelled = false;
    listVoiceAssets(deployment.deploymentId)
      .then((r) => {
        if (!cancelled) setVoiceAssets(r.voiceAssets);
      })
      .catch(() => undefined);
    listPresets(deployment.deploymentId)
      .then((r) => {
        if (!cancelled) {
          setVectorPresets(
            [...r.presets].sort((a, b) => b.updatedAt - a.updatedAt),
          );
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [deployment.deploymentId]);

  // Debounced PATCH: persist recipe-level settings (output format, speed,
  // generation overrides, plus the namespaced `__recipe` sidecar holding
  // quickMode + cachePolicy) so reloading the page rehydrates the user's
  // last-known choices. Skips the very first run to avoid bouncing the
  // loader-seeded values back to the server.
  const isFirstPersistRef = useRef(true);
  useEffect(() => {
    if (isFirstPersistRef.current) {
      isFirstPersistRef.current = false;
      return undefined;
    }
    const handle = window.setTimeout(() => {
      const overrides = {
        ...generation,
        [RECIPE_META_KEY]: {
          editorMode,
          quickMode,
          cachePolicy,
          storyText,
        },
      };
      void apiFetch(`/deployments/${deployment.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: outputFormat,
          defaultSpeedFactor: speedFactor,
          defaultGenerationOverrides: overrides,
        }),
      }).catch(() => undefined);
    }, 600);
    return () => window.clearTimeout(handle);
  }, [
    deployment.deploymentId,
    outputFormat,
    speedFactor,
    cachePolicy,
    editorMode,
    quickMode,
    storyText,
    generation,
  ]);

  const effectiveScript = useMemo(() => {
    if (editorMode === "rows") return serialiseRowsToScript(rows, vectorPresets);
    if (editorMode === "story") return storyText;
    return script;
  }, [editorMode, rows, vectorPresets, script, storyText]);
  const parsedLines = useMemo(() => parseDialogue(effectiveScript), [effectiveScript]);
  const scriptedCharacters = useMemo(() => {
    if (editorMode !== "story") return uniqueCharacters(parsedLines);
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const tok of tokeniseStory(storyText)) {
      if (tok.kind !== "character") continue;
      if (seen.has(tok.value)) continue;
      seen.add(tok.value);
      ordered.push(tok.value);
    }
    return ordered;
  }, [editorMode, parsedLines, storyText]);
  const characters = useMemo(() => {
    const seen = new Set(scriptedCharacters.map((c) => c.toLowerCase()));
    const out = [...scriptedCharacters];
    for (const m of mappings) {
      if (!m.isActive) continue;
      const key = m.characterName.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(m.characterName);
    }
    return out;
  }, [scriptedCharacters, mappings]);
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
          notify.success(`Updated mapping for ${existing.characterName}`);
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

  const handleRenameCharacter = useCallback(
    async (oldName: string, nextName: string): Promise<void> => {
      const trimmed = nextName.trim();
      const existing = mappingsByLower.get(oldName.toLowerCase());
      if (!existing || !trimmed || trimmed === existing.characterName) return;
      try {
        const updated = await patchMapping(deployment.deploymentId, existing.mappingId, {
          characterName: trimmed,
        });
        setMappings((prev) =>
          prev.map((m) => (m.mappingId === updated.mappingId ? updated : m)),
        );
        notify.success(`Renamed character to ${trimmed}`);
      } catch (err: unknown) {
        notify.error(err instanceof Error ? err.message : "rename failed");
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

  const handleCreateCharacterFromVoice = useCallback(
    (asset: VoiceAsset, characterName: string) => {
      void upsertMapping(characterName, { speakerVoiceAssetId: asset.voiceAssetId });
    },
    [upsertMapping],
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
      script: effectiveScript,
      parserMode:
        editorMode === "quick"
          ? "raw_text"
          : editorMode === "story"
            ? "story"
            : "dialogue",
      outputFormat,
      speedFactor,
      globalEmotion: { ...globalEmotion, emotionAlpha: performance.intensity },
      generation,
      cachePolicy,
      ...(editorMode === "storyboard" && prebuiltSegments.length > 0
        ? {
            prebuiltSegments: prebuiltSegments.map((seg) =>
              seg.emotion
                ? { ...seg, emotion: { ...seg.emotion, emotionAlpha: performance.intensity } }
                : seg,
            ),
          }
        : {}),
    }),
    [effectiveScript, editorMode, outputFormat, speedFactor, performance.intensity, globalEmotion, generation, cachePolicy, prebuiltSegments],
  );

  const diagnostics = useMemo(
    () => buildDiagnostics({
      script: effectiveScript,
      quickMode,
      defaultVoiceAssetId,
      characters,
      unmappedCount,
      globalEmotion,
      performance,
    }),
    [effectiveScript, quickMode, defaultVoiceAssetId, characters, unmappedCount, globalEmotion, performance],
  );

  const legacyDiagnostics = useMemo(
    () =>
      diagnostics
        .filter((d) => d.id !== "performance")
        .map((d) => ({
          label: d.label,
          status: d.status === "ok" ? "ok" : d.status === "warn" ? "warn" : "ok",
          detail: d.detail,
        })) as { label: string; status: "ok" | "warn"; detail?: string }[],
    [diagnostics],
  );

  const hasQueue = editorMode === "storyboard" && prebuiltSegments.length > 0;
  const canGenerate = effectiveScript.trim().length > 0 || hasQueue;

  return (
    <>
      <Toaster position="bottom-right" richColors theme="dark" />
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {migrationLiveMessage}
      </div>
      <RecipeUi
        deployment={deployment}
        canGenerate={canGenerate}
        workflowCustomised={workflow.workflow.customised}
        unmappableFields={workflow.unmappableFields}
        hero={<DeploymentHeader deployment={deployment} />}
        quickActions={
          <RunPanel
            deploymentId={deployment.deploymentId}
            createPayload={createPayload}
            canGenerate={canGenerate}
            diagnostics={legacyDiagnostics}
            storyboardJobs={editorMode === "storyboard" ? storyboardJobs : undefined}
            onJobProgressChange={setJobProgress}
          />
        }
        recentGenerations={
          <RecentGenerationsCard
            deploymentId={deployment.deploymentId}
            speedFactor={speedFactor}
          />
        }
        scriptSection={
          <ScriptSection
            editorMode={editorMode}
            onEditorModeChange={requestEditorModeChange}
            deployment={deployment}
            script={script}
            onScriptChange={setScript}
            rows={rows}
            onRowsChange={setRows}
            storyText={storyText}
            onStoryTextChange={setStoryText}
            storyCharacters={characters}
            outputFormat={outputFormat}
            mappingsByLower={mappingsByLower}
            defaultVoiceAssetId={defaultVoiceAssetId}
            onDefaultVoiceAssetIdChange={setDefaultVoiceAssetId}
            presets={vectorPresets}
            voiceAssets={voiceAssets}
            onQueueChange={setPrebuiltSegments}
            onStoryboardJobsChange={setStoryboardJobs}
            jobProgress={editorMode === "storyboard" ? jobProgress : undefined}
          />
        }
        parsedDialogueSection={
          <ParsedDialogue lines={parsedLines} characterColors={characterColors} />
        }
        voiceLibrarySection={
          <VoiceLibrary
            deploymentId={deployment.deploymentId}
            voiceAssets={voiceAssets}
            mappings={mappings}
            characterColors={characterColors}
            onVoiceAssetsChange={setVoiceAssets}
            onCreateCharacterFromVoice={handleCreateCharacterFromVoice}
          />
        }
        castSection={
          <CastSection unmappedCount={unmappedCount} totalCount={characters.length}>
            {characters.map((name) => {
              const mapping = mappingsByLower.get(name.toLowerCase()) ?? null;
              // audit-allow: hex — neon decorative palette per design lang
              const color = characterColors[name] ?? "#ba9eff";
              return (
                <li key={name} className={castListItemClass}>
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
                    onRename={(next) => handleRenameCharacter(name, next)}
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
            presets={vectorPresets}
            onPresetsChange={setVectorPresets}
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
