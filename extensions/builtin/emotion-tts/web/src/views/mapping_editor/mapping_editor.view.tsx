import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import type { Deployment } from "../../services/deployments_client";
import type {
  CharacterMapping,
  ImportConflictStrategy,
  ImportResult,
  MappingBundle,
} from "../../services/mappings_client";
import {
  createMapping,
  deactivateMapping,
  exportMappings,
  importMappings,
  patchMapping,
} from "../../services/mappings_client";
import { ExtensionApiError } from "../../services/http";
import { getRun, testLine } from "../../services/runs_client";
import type { OutputFormat, PersistedEmotionMode } from "../../services/types";
import type { VoiceAsset } from "../../services/voice_assets_client";
import {
  listVoiceAssets,
  uploadVoiceAsset,
} from "../../services/voice_assets_client";
import type { ApplyEditResponse } from "../../services/audio_edit_client";
import { AudioEditPanel } from "./components/audio_edit_panel";
import * as css from "./mapping_editor.css";
import { Banner } from "../../components/banner";
import { Button } from "../../components/button";
import { EmptyState } from "../../components/empty_state";
import { Panel } from "../../components/panel";
import { StatusPill } from "../../components/status_pill";
import { sectionLabel } from "../../components/section_label.css";

interface LoaderData {
  deployment: Deployment;
  mappings: CharacterMapping[];
  voiceAssets: VoiceAsset[];
}

const EMOTION_MODES: PersistedEmotionMode[] = ["none", "audio_ref", "vector_preset", "qwen_template"];

export function MappingEditorView(): JSX.Element {
  const { deployment, mappings: initialMappings, voiceAssets: initialVoices } =
    useLoaderData() as LoaderData;

  const [mappings, setMappings] = useState<CharacterMapping[]>(initialMappings);
  const [voiceAssets, setVoiceAssets] = useState<VoiceAsset[]>(initialVoices);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialMappings[0]?.mappingId ?? null,
  );
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);

  const voiceById = useMemo(() => {
    const map = new Map<string, VoiceAsset>();
    for (const va of voiceAssets) map.set(va.voiceAssetId, va);
    return map;
  }, [voiceAssets]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return mappings;
    return mappings.filter((m) => m.characterName.toLowerCase().includes(q));
  }, [mappings, search]);

  const selected = useMemo(
    () => mappings.find((m) => m.mappingId === selectedId) ?? null,
    [mappings, selectedId],
  );

  useEffect(() => {
    setMappings(initialMappings);
    setVoiceAssets(initialVoices);
    setSelectedId(initialMappings[0]?.mappingId ?? null);
  }, [initialMappings, initialVoices]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  const refreshVoices = useCallback(async () => {
    const resp = await listVoiceAssets(deployment.deploymentId);
    setVoiceAssets(resp.voiceAssets);
  }, [deployment.deploymentId]);

  const updateSelected = useCallback(
    (patch: Partial<CharacterMapping>) => {
      setMappings((prev) =>
        prev.map((m) => (m.mappingId === selectedId ? { ...m, ...patch } : m)),
      );
    },
    [selectedId],
  );

  const persistSelected = useCallback(
    async (patch: Partial<CharacterMapping>) => {
      if (!selected) return;
      const snapshot = selected;
      try {
        const next = await patchMapping(deployment.deploymentId, selected.mappingId, patch);
        setMappings((prev) => prev.map((m) => (m.mappingId === next.mappingId ? next : m)));
      } catch (err) {
        setMappings((prev) =>
          prev.map((m) => (m.mappingId === snapshot.mappingId ? snapshot : m)),
        );
        setError(extract(err));
      }
    },
    [selected, deployment.deploymentId],
  );

  const addMapping = useCallback(async () => {
    const defaultVoice = voiceAssets[0];
    if (!defaultVoice) {
      setError("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const newName = nextFreeName(mappings);
      const created = await createMapping(deployment.deploymentId, {
        characterName: newName,
        speakerVoiceAssetId: defaultVoice.voiceAssetId,
        defaultEmotionMode: "none",
      });
      setMappings((prev) => [...prev, created]);
      setSelectedId(created.mappingId);
    } catch (err) {
      setError(extract(err));
    }
  }, [deployment.deploymentId, voiceAssets, mappings]);

  const requestDelete = useCallback(() => {
    if (!selected) return;
    setConfirmDelete({ id: selected.mappingId, name: selected.characterName });
  }, [selected]);

  const performDelete = useCallback(async () => {
    if (!confirmDelete) return;
    const { id, name } = confirmDelete;
    setConfirmDelete(null);
    try {
      await deactivateMapping(deployment.deploymentId, id);
      setMappings((prev) => prev.filter((m) => m.mappingId !== id));
      setSelectedId(null);
      setToast(`Mapping for ${name} deactivated.`);
    } catch (err) {
      setError(extract(err));
    }
  }, [deployment.deploymentId, confirmDelete]);

  const handleVoiceUpload = useCallback(
    async (file: File, displayName: string, kind: VoiceAsset["kind"]) => {
      try {
        const uploaded = await uploadVoiceAsset(deployment.deploymentId, file, displayName, kind);
        setVoiceAssets((prev) => [uploaded, ...prev]);
        setToast(`${uploaded.displayName} uploaded.`);
        return uploaded;
      } catch (err) {
        setError(extract(err));
        return null;
      }
    },
    [deployment.deploymentId],
  );

  const doExport = useCallback(async () => {
    try {
      const bundle = await exportMappings(deployment.deploymentId);
      downloadJson(bundle, `${deployment.deploymentId}-mappings.json`);
      setToast("Mappings exported to JSON.");
    } catch (err) {
      setError(extract(err));
    }
  }, [deployment.deploymentId]);

  const doImport = useCallback(
    async (bundle: MappingBundle, strategy: ImportConflictStrategy) => {
      try {
        const result: ImportResult = await importMappings(
          deployment.deploymentId,
          bundle.mappings,
          strategy,
        );
        setToast(
          `Imported ${result.created.length} • skipped ${result.skipped.length} • replaced ${result.replaced.length}.`,
        );
        const resp = await listVoiceAssets(deployment.deploymentId);
        setVoiceAssets(resp.voiceAssets);
      } catch (err) {
        setError(extract(err));
      }
    },
    [deployment.deploymentId],
  );

  const handleEditChainPersisted = useCallback(
    async (response: ApplyEditResponse) => {
      await refreshVoices();
      if (selected && response.chain_digest) {
        try {
          const next = await patchMapping(deployment.deploymentId, selected.mappingId, {
            voiceAssetChainDigest: response.chain_digest,
          });
          setMappings((prev) =>
            prev.map((m) => (m.mappingId === next.mappingId ? next : m)),
          );
        } catch (err) {
          setError(extract(err));
        }
      }
      setToast("Edit applied.");
    },
    [refreshVoices, selected, deployment.deploymentId],
  );

  const handleEditError = useCallback((message: string) => {
    setError(message);
  }, []);

  const runTestLine = useCallback(
    async (text: string, format: OutputFormat): Promise<{ runId: string } | null> => {
      if (!selected) return null;
      const line = text.trim() || `[${selected.characterName}] This is a test of the voice.`;
      try {
        const res = await testLine(deployment.deploymentId, {
          line,
          outputFormat: format,
        });
        return { runId: res.runId };
      } catch (err) {
        setError(extract(err));
        return null;
      }
    },
    [deployment.deploymentId, selected],
  );

  const voiceWord = voiceAssets.length === 1 ? "voice" : "voices";

  return (
    <div className={css.shell}>
      <aside className={css.sidebar} aria-labelledby="mapping-sidebar-heading">
        <header className={css.sidebarHeader}>
          <div>
            <h1 id="mapping-sidebar-heading" className={css.sidebarTitle}>
              Cast
            </h1>
            <span className={css.sidebarCount}>
              {mappings.length} active · {voiceAssets.length} {voiceWord}
            </span>
          </div>
          <Button variant="primary" size="sm" onClick={addMapping}>
            + Add
          </Button>
        </header>

        <input
          type="search"
          className={css.searchField}
          placeholder="Search characters"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          aria-label="Search characters"
        />

        <ImportExportBar onExport={doExport} onImport={doImport} onParseError={setError} />

        <div className={css.sidebarList}>
          {filtered.length === 0 ? (
            <EmptyState
              title="No mappings yet."
              hint="Click + Add to create one."
            />
          ) : (
            filtered.map((m) => {
              const voice = voiceById.get(m.speakerVoiceAssetId);
              const isSelected = m.mappingId === selectedId;
              return (
                <button
                  type="button"
                  key={m.mappingId}
                  className={isSelected ? css.mappingRowSelected : css.mappingRow}
                  onClick={() => setSelectedId(m.mappingId)}
                  aria-pressed={isSelected}
                  data-testid="mapping-row"
                >
                  <span className={css.characterInitial} aria-hidden="true">
                    {initialOf(m.characterName)}
                  </span>
                  <span className={css.rowMeta}>
                    <span className={css.rowName}>{m.characterName}</span>
                    <span className={css.rowKind}>
                      {m.defaultEmotionMode} · {voice?.displayName ?? "no voice"}
                    </span>
                  </span>
                </button>
              );
            })
          )}
        </div>
      </aside>

      <section className={css.detail} aria-label="Mapping detail">
        <LazyMotion features={domAnimation}>
          <AnimatePresence>
            {toast && (
              <m.div
                key={toast}
                className={css.toast}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                // biome-ignore lint/a11y/useSemanticElements: motion-wrapped div needs role="status" — m.output is not a stable motion variant for animated transient toasts
                role="status"
              >
                {toast}
              </m.div>
            )}
          </AnimatePresence>
        </LazyMotion>
        {error && <Banner severity="error">{error}</Banner>}
        {confirmDelete && (
          <Banner severity="warning">
            <span style={{ flex: 1 }}>Deactivate mapping for {confirmDelete.name}?</span>
            <Button variant="danger" size="sm" onClick={() => void performDelete()}>
              Delete
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
          </Banner>
        )}

        {!selected ? (
          <EmptyDetail
            voiceCount={voiceAssets.length}
            onUploadVoice={async (file) => {
              await handleVoiceUpload(file, file.name.replace(/\..+$/, ""), "speaker");
            }}
          />
        ) : (
          <MappingDetail
            key={selected.mappingId}
            deploymentId={deployment.deploymentId}
            mapping={selected}
            voiceAssets={voiceAssets}
            onNameChange={(name) => {
              updateSelected({ characterName: name });
            }}
            onNameBlur={(name) => {
              if (name !== selected.characterName && name.trim()) {
                void persistSelected({ characterName: name.trim() });
              }
            }}
            onSpeakerChange={(id) => {
              updateSelected({ speakerVoiceAssetId: id });
              void persistSelected({ speakerVoiceAssetId: id });
            }}
            onModeChange={(mode) => {
              updateSelected({ defaultEmotionMode: mode });
              void persistSelected({ defaultEmotionMode: mode });
            }}
            onQwenChange={(tmpl) => {
              updateSelected({ defaultQwenTemplate: tmpl });
            }}
            onQwenBlur={(tmpl) => {
              void persistSelected({ defaultQwenTemplate: tmpl });
            }}
            onSpeedChange={(speed) => {
              updateSelected({ defaultSpeedFactor: speed });
            }}
            onSpeedCommit={(speed) => {
              void persistSelected({ defaultSpeedFactor: speed });
            }}
            onEmotionVoiceChange={(id) => {
              const value = id || null;
              updateSelected({ defaultEmotionVoiceAssetId: value });
              void persistSelected({ defaultEmotionVoiceAssetId: value });
            }}
            onDelete={requestDelete}
            onUploadVoice={async (file, displayName, kind) => {
              const uploaded = await handleVoiceUpload(file, displayName, kind);
              if (uploaded && kind === "speaker") {
                updateSelected({ speakerVoiceAssetId: uploaded.voiceAssetId });
                void persistSelected({ speakerVoiceAssetId: uploaded.voiceAssetId });
              }
              await refreshVoices();
              return uploaded;
            }}
            onTestLine={runTestLine}
            onEditChainPersisted={handleEditChainPersisted}
            onEditError={handleEditError}
          />
        )}
      </section>
    </div>
  );
}

interface EmptyDetailProps {
  voiceCount: number;
  onUploadVoice: (file: File) => Promise<void>;
}

function EmptyDetail({ voiceCount, onUploadVoice }: EmptyDetailProps): JSX.Element {
  if (voiceCount === 0) {
    return (
      <Panel density="airy" elevation="raised" aria-labelledby="onboarding-heading">
        <div className={css.emptyOnboardingHeader}>
          <p className={sectionLabel}>01 / Onboarding</p>
          <h2 id="onboarding-heading" className={css.emptyOnboardingTitle}>
            Upload your first voice
          </h2>
          <p className={css.emptyOnboardingSubtitle}>
            EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav).
            Drop one in below, then click <strong>+ Add</strong> on the left to map a
            character to it.
          </p>
        </div>
        <AudioDropzone
          label="Drop or click to upload your first voice (mp3 / wav)"
          onFile={async (file) => {
            await onUploadVoice(file);
            return null;
          }}
        />
      </Panel>
    );
  }

  return (
    <Panel density="airy">
      <EmptyState
        title="No character selected."
        hint="Pick one on the left or + Add"
      />
    </Panel>
  );
}

interface MappingDetailProps {
  deploymentId: string;
  mapping: CharacterMapping;
  voiceAssets: VoiceAsset[];
  onNameChange: (name: string) => void;
  onNameBlur: (name: string) => void;
  onSpeakerChange: (id: string) => void;
  onModeChange: (mode: PersistedEmotionMode) => void;
  onQwenChange: (tmpl: string) => void;
  onQwenBlur: (tmpl: string) => void;
  onSpeedChange: (speed: number) => void;
  onSpeedCommit: (speed: number) => void;
  onEmotionVoiceChange: (id: string) => void;
  onDelete: () => void;
  onUploadVoice: (
    file: File,
    displayName: string,
    kind: VoiceAsset["kind"],
  ) => Promise<VoiceAsset | null>;
  onTestLine: (text: string, format: OutputFormat) => Promise<{ runId: string } | null>;
  onEditChainPersisted: (response: ApplyEditResponse) => void;
  onEditError: (message: string) => void;
}

type TestLineStatus = "idle" | "running" | "done" | "error";

function MappingDetail(props: MappingDetailProps): JSX.Element {
  const { mapping, voiceAssets } = props;
  const speaker = voiceAssets.find((v) => v.voiceAssetId === mapping.speakerVoiceAssetId) ?? null;
  const emotionVoice =
    voiceAssets.find((v) => v.voiceAssetId === mapping.defaultEmotionVoiceAssetId) ?? null;
  const [testText, setTestText] = useState("");
  const [testFormat, setTestFormat] = useState<OutputFormat>("mp3");
  const [testStatus, setTestStatus] = useState<TestLineStatus>("idle");
  const [testError, setTestError] = useState<string | null>(null);
  const cancelRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;
    return () => {
      cancelRef.current = true;
    };
  }, []);

  const handleTestLine = useCallback(async () => {
    cancelRef.current = false;
    setTestStatus("running");
    setTestError(null);
    const result = await props.onTestLine(testText, testFormat);
    if (cancelRef.current) return;
    if (!result) {
      setTestStatus("error");
      setTestError("Failed to enqueue test-line run.");
      return;
    }
    const { runId } = result;
    for (let i = 0; i < 60; i += 1) {
      await new Promise<void>((r) => setTimeout(r, 500));
      if (cancelRef.current) return;
      try {
        const run = await getRun(props.deploymentId, runId);
        if (cancelRef.current) return;
        if (run.status === "completed") {
          setTestStatus("done");
          return;
        }
        if (run.status === "failed" || run.status === "cancelled") {
          setTestStatus("error");
          setTestError(`Run ${run.status}.`);
          return;
        }
      } catch (err) {
        if (cancelRef.current) return;
        setTestStatus("error");
        setTestError(err instanceof Error ? err.message : "unknown error");
        return;
      }
    }
    if (cancelRef.current) return;
    setTestStatus("error");
    setTestError("test-line timed out after 30s");
  }, [props.onTestLine, props.deploymentId, testText, testFormat]);

  return (
    <>
      <header className={css.detailHeader}>
        <div>
          <p className={sectionLabel}>Character</p>
          <h2 className={css.detailTitle}>{mapping.characterName}</h2>
        </div>
        <div className={css.actionsRow}>
          <Button variant="danger" size="sm" onClick={props.onDelete}>
            Deactivate
          </Button>
        </div>
      </header>

      <Panel
        tone="muted"
        density="compact"
        elevation="none"
        className={css.testLineBar}
        aria-label="Test line synthesis"
      >
        <input
          type="text"
          className={css.testLineInput}
          placeholder={`[${mapping.characterName}] This is a test of the voice.`}
          value={testText}
          onChange={(e) => setTestText(e.currentTarget.value)}
          aria-label="Test-line text"
          disabled={testStatus === "running"}
        />
        <select
          className={css.input}
          value={testFormat}
          onChange={(e) => setTestFormat(e.currentTarget.value as OutputFormat)}
          aria-label="Test-line output format"
          disabled={testStatus === "running"}
        >
          <option value="mp3">mp3</option>
          <option value="wav">wav</option>
          <option value="flac">flac</option>
        </select>
        <Button
          variant="primary"
          size="sm"
          onClick={() => void handleTestLine()}
          disabled={testStatus === "running"}
        >
          {testStatus === "running" ? "Synthesising…" : "Test this line"}
        </Button>
        {testStatus === "done" && (
          <StatusPill tone="success">Synthesised — see host logs for output path.</StatusPill>
        )}
        {testStatus === "error" && testError && (
          <StatusPill tone="danger">{testError}</StatusPill>
        )}
      </Panel>

      <div className={css.detailBody}>
        <Panel density="comfortable" aria-labelledby="identity-heading">
          <h3 id="identity-heading" className={sectionLabel}>
            01 / Identity & Performance
          </h3>
          <label className={css.field}>
            <span className={css.fieldLabel}>Character name</span>
            <input
              className={css.input}
              value={mapping.characterName}
              onChange={(e) => props.onNameChange(e.currentTarget.value)}
              onBlur={(e) => props.onNameBlur(e.currentTarget.value)}
            />
          </label>

          <label className={css.field}>
            <span className={css.fieldLabel}>Emotion mode</span>
            <select
              className={css.input}
              value={mapping.defaultEmotionMode}
              onChange={(e) => props.onModeChange(e.currentTarget.value as PersistedEmotionMode)}
            >
              {EMOTION_MODES.map((m) => (
                <option key={m} value={m}>
                  {emotionModeLabel(m)}
                </option>
              ))}
            </select>
          </label>

          {mapping.defaultEmotionMode === "qwen_template" && (
            <label className={css.field}>
              <span className={css.fieldLabel}>Qwen template (use {"{seg}"} for the line text)</span>
              <textarea
                className={css.textarea}
                value={mapping.defaultQwenTemplate ?? ""}
                onChange={(e) => props.onQwenChange(e.currentTarget.value)}
                onBlur={(e) => props.onQwenBlur(e.currentTarget.value)}
              />
            </label>
          )}

          {mapping.defaultEmotionMode === "audio_ref" && (
            <label className={css.field}>
              <span className={css.fieldLabel}>Emotion reference</span>
              <select
                className={css.input}
                value={mapping.defaultEmotionVoiceAssetId ?? ""}
                onChange={(e) => props.onEmotionVoiceChange(e.currentTarget.value)}
              >
                <option value="">— none —</option>
                {voiceAssets.map((v) => (
                  <option key={v.voiceAssetId} value={v.voiceAssetId}>
                    {v.displayName} · {v.kind}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className={css.field}>
            <span className={css.fieldLabel}>
              Speed · {mapping.defaultSpeedFactor?.toFixed(2) ?? "—"}×
            </span>
            <input
              type="range"
              min={0.5}
              max={2.0}
              step={0.05}
              value={mapping.defaultSpeedFactor ?? 1.0}
              onChange={(e) => props.onSpeedChange(Number(e.currentTarget.value))}
              onMouseUp={(e) => props.onSpeedCommit(Number((e.currentTarget as HTMLInputElement).value))}
              onTouchEnd={(e) =>
                props.onSpeedCommit(Number((e.currentTarget as HTMLInputElement).value))
              }
            />
          </label>
        </Panel>

        <Panel density="comfortable" aria-labelledby="voice-heading">
          <h3 id="voice-heading" className={sectionLabel}>
            02 / Voice Reference
          </h3>
          <span className={css.fieldLabel}>Speaker reference</span>
          <VoicePicker
            value={mapping.speakerVoiceAssetId}
            voices={voiceAssets}
            onChange={props.onSpeakerChange}
          />
          {speaker && <VoiceDetail voice={speaker} />}
          <AudioDropzone
            label={speaker ? "Replace speaker audio" : "Drop or click to upload speaker audio"}
            onFile={(file) => props.onUploadVoice(file, file.name.replace(/\..+$/, ""), "speaker")}
          />

          {speaker && (
            <AudioEditPanel
              voiceAsset={speaker}
              deploymentId={props.deploymentId}
              onChainPersisted={props.onEditChainPersisted}
              onError={props.onEditError}
            />
          )}

          {emotionVoice && (
            <>
              <span className={css.fieldLabel}>Emotion reference voice</span>
              <VoiceDetail voice={emotionVoice} />
            </>
          )}
        </Panel>
      </div>
    </>
  );
}

function VoicePicker({
  value,
  voices,
  onChange,
}: {
  value: string;
  voices: VoiceAsset[];
  onChange: (id: string) => void;
}): JSX.Element {
  return (
    <select
      className={css.input}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      aria-label="Speaker reference voice"
    >
      {voices.length === 0 && <option value="">— upload a voice first —</option>}
      {voices.map((v) => (
        <option key={v.voiceAssetId} value={v.voiceAssetId}>
          {v.displayName}
        </option>
      ))}
    </select>
  );
}

function VoiceDetail({ voice }: { voice: VoiceAsset }): JSX.Element {
  const durationWarning = durationWarningFor(voice.durationMs ?? null);
  return (
    <div>
      <div className={css.voiceMeta}>
        <span>{voice.displayName}</span>
        <span>{voice.kind}</span>
        {voice.durationMs != null && <span>{formatDuration(voice.durationMs)}</span>}
        {voice.sampleRate && <span>{voice.sampleRate} Hz</span>}
      </div>
      {voice.durationMs != null && (
        <div className={css.durationBar}>
          <div className={css.durationTrack}>
            <LazyMotion features={domAnimation}>
              <m.div
                className={css.durationFill}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (voice.durationMs / 60000) * 100)}%`,
                }}
                transition={{ duration: 0.35 }}
              />
            </LazyMotion>
          </div>
          {durationWarning && (
            <StatusPill tone={durationWarning.level === "warn" ? "warning" : "danger"}>
              {durationWarning.message}
            </StatusPill>
          )}
        </div>
      )}
      <Waveform seed={voice.contentSha256} />
    </div>
  );
}

function Waveform({ seed }: { seed: string }): JSX.Element {
  const bars = useMemo(() => generatePseudoBars(seed, 48), [seed]);
  return (
    <div className={css.waveform} aria-hidden="true">
      {bars.map((h, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: bar order is deterministic for a given seed and never reorders
          key={`${seed}-${i}`}
          className={css.waveformBar}
          style={{ height: `${Math.max(6, h * 100)}%` }}
        />
      ))}
    </div>
  );
}

function AudioDropzone({
  label,
  onFile,
}: {
  label: string;
  onFile: (file: File) => Promise<VoiceAsset | null>;
}): JSX.Element {
  const [active, setActive] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setBusy(true);
      try {
        await onFile(file);
      } finally {
        setBusy(false);
      }
    },
    [onFile],
  );

  return (
    <div
      className={busy ? css.dropzoneBusy : active ? css.dropzoneActive : css.dropzone}
      onDragOver={(e) => {
        e.preventDefault();
        setActive(true);
      }}
      onDragLeave={() => setActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file) void handleFile(file);
      }}
      onClick={() => inputRef.current?.click()}
      // biome-ignore lint/a11y/useSemanticElements: dropzone div hosts drag-drop handlers + a hidden file input click trigger; a real <button> can't be a drop target without losing the drop-styling state machine
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      aria-busy={busy}
    >
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        onChange={(e) => {
          const file = e.currentTarget.files?.[0];
          if (file) void handleFile(file);
          e.currentTarget.value = "";
        }}
      />
      {busy ? "Uploading…" : label}
    </div>
  );
}

function ImportExportBar({
  onExport,
  onImport,
  onParseError,
}: {
  onExport: () => void;
  onImport: (bundle: MappingBundle, strategy: ImportConflictStrategy) => void;
  onParseError: (message: string) => void;
}): JSX.Element {
  const [strategy, setStrategy] = useState<ImportConflictStrategy>("error");
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={css.actionsRow}>
      <Button variant="secondary" size="sm" onClick={onExport}>
        Export JSON
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className={css.hiddenFileInput}
        aria-hidden="true"
        tabIndex={-1}
        onChange={async (e) => {
          const file = e.currentTarget.files?.[0];
          e.currentTarget.value = "";
          if (!file) return;
          try {
            const text = await file.text();
            const bundle = JSON.parse(text) as MappingBundle;
            onImport(bundle, strategy);
          } catch {
            onParseError("Import failed: file is not a valid JSON mapping bundle.");
          }
        }}
      />
      <Button variant="secondary" size="sm" onClick={() => fileRef.current?.click()}>
        Import JSON
      </Button>
      <select
        className={css.input}
        value={strategy}
        onChange={(e) => setStrategy(e.currentTarget.value as ImportConflictStrategy)}
        aria-label="Import conflict strategy"
      >
        <option value="error">Error on conflict</option>
        <option value="skip">Skip existing</option>
        <option value="replace">Replace existing</option>
      </select>
    </div>
  );
}

function nextFreeName(mappings: CharacterMapping[]): string {
  const existing = new Set(mappings.map((m) => m.characterName.toLowerCase()));
  let idx = 1;
  while (existing.has(`character ${idx}`)) idx += 1;
  return `Character ${idx}`;
}

function initialOf(name: string): string {
  const ch = name.trim().charAt(0);
  return ch ? ch.toUpperCase() : "?";
}

function emotionModeLabel(mode: PersistedEmotionMode): string {
  switch (mode) {
    case "none":
      return "None";
    case "audio_ref":
      return "Audio reference";
    case "vector_preset":
      return "Vector preset";
    case "qwen_template":
      return "Qwen template";
  }
}

function durationWarningFor(ms: number | null): { level: "warn" | "danger"; message: string } | null {
  if (ms == null) return null;
  if (ms < 1000) {
    return { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." };
  }
  if (ms > 60_000) {
    return {
      level: "danger",
      message: "Over 60 s — IndexTTS works best with 10–30 s clips.",
    };
  }
  if (ms > 30_000) {
    return { level: "warn", message: "Over 30 s — consider trimming for faster encoding." };
  }
  return null;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms} ms`;
  const seconds = Math.round(ms / 100) / 10;
  return `${seconds}s`;
}

function generatePseudoBars(seed: string, count: number): number[] {
  const bars: number[] = [];
  for (let i = 0; i < count; i += 1) {
    const c = seed.charCodeAt(i % seed.length);
    bars.push(((c * 31 + i * 7) % 100) / 100);
  }
  return bars;
}

function downloadJson(value: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function extract(err: unknown): string {
  if (err instanceof ExtensionApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "unknown error";
}
