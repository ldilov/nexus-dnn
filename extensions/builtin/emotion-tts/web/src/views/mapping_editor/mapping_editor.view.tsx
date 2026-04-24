import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { motion, AnimatePresence } from "motion/react";
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
import { testLine } from "../../services/runs_client";
import type { OutputFormat, PersistedEmotionMode } from "../../services/types";
import type { VoiceAsset } from "../../services/voice_assets_client";
import {
  listVoiceAssets,
  uploadVoiceAsset,
} from "../../services/voice_assets_client";
import * as css from "./mapping_editor.css";

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
        const next = await patchMapping(selected.mappingId, patch);
        setMappings((prev) => prev.map((m) => (m.mappingId === next.mappingId ? next : m)));
      } catch (err) {
        setMappings((prev) =>
          prev.map((m) => (m.mappingId === snapshot.mappingId ? snapshot : m)),
        );
        setError(extract(err));
      }
    },
    [selected],
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

  const deleteSelected = useCallback(async () => {
    if (!selected) return;
    if (!confirm(`Deactivate mapping for ${selected.characterName}?`)) return;
    try {
      await deactivateMapping(deployment.deploymentId, selected.mappingId);
      setMappings((prev) => prev.filter((m) => m.mappingId !== selected.mappingId));
      setSelectedId(null);
      setToast(`Mapping for ${selected.characterName} deactivated.`);
    } catch (err) {
      setError(extract(err));
    }
  }, [deployment.deploymentId, selected]);

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

  const runTestLine = useCallback(
    async (text: string, format: OutputFormat) => {
      if (!selected) return;
      const line = text.trim() || `[${selected.characterName}] This is a test of the voice.`;
      try {
        const res = await testLine(deployment.deploymentId, {
          line,
          outputFormat: format,
        });
        setToast(`Test-line queued • run ${res.runId.slice(0, 12)}… • ETA ${Math.round(res.etaSeconds)}s`);
      } catch (err) {
        setError(extract(err));
      }
    },
    [deployment.deploymentId, selected],
  );

  return (
    <div className={css.shell}>
      <aside className={css.sidebar} aria-label="Character mappings">
        <header className={css.sidebarHeader}>
          <div>
            <h1 className={css.sidebarTitle}>Mappings</h1>
            <span className={css.sidebarCount}>
              {mappings.length} active · {voiceAssets.length} voice{voiceAssets.length === 1 ? "" : "s"}
            </span>
          </div>
          <button type="button" className={css.primaryButton} onClick={addMapping}>
            + Add
          </button>
        </header>

        <input
          type="search"
          className={css.searchField}
          placeholder="Search characters"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          aria-label="Search characters"
        />

        <ImportExportBar onExport={doExport} onImport={doImport} />

        <div className={css.sidebarList}>
          {filtered.length === 0 ? (
            <div className={css.emptySidebar}>No mappings yet. Click Add to create one.</div>
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
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast}
              className={css.toast}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              role="status"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
        {error && (
          <div className={css.errorBanner} role="alert">
            {error}
          </div>
        )}

        {!selected ? (
          <EmptyDetail />
        ) : (
          <MappingDetail
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
            onDelete={deleteSelected}
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
          />
        )}
      </section>
    </div>
  );
}

function EmptyDetail(): JSX.Element {
  return (
    <div className={css.fieldset} style={{ textAlign: "center", padding: "4rem" }}>
      <p style={{ fontFamily: "var(--font)", fontSize: "1.1rem", color: "var(--text-muted)" }}>
        Select a character on the left, or click <strong>+ Add</strong> to create one.
      </p>
    </div>
  );
}

interface MappingDetailProps {
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
  onTestLine: (text: string, format: OutputFormat) => void;
}

function MappingDetail(props: MappingDetailProps): JSX.Element {
  const { mapping, voiceAssets } = props;
  const speaker = voiceAssets.find((v) => v.voiceAssetId === mapping.speakerVoiceAssetId) ?? null;
  const emotionVoice =
    voiceAssets.find((v) => v.voiceAssetId === mapping.defaultEmotionVoiceAssetId) ?? null;
  const [testText, setTestText] = useState("");
  const [testFormat, setTestFormat] = useState<OutputFormat>("mp3");

  return (
    <>
      <header className={css.detailHeader}>
        <div>
          <span className={css.detailSubtitle}>Character</span>
          <h2 className={css.detailTitle}>{mapping.characterName}</h2>
        </div>
        <div className={css.actionsRow}>
          <button type="button" className={css.dangerButton} onClick={props.onDelete}>
            Deactivate
          </button>
        </div>
      </header>

      <div className={css.testLineBar}>
        <input
          type="text"
          className={css.testLineInput}
          placeholder={`[${mapping.characterName}] This is a test of the voice.`}
          value={testText}
          onChange={(e) => setTestText(e.currentTarget.value)}
          aria-label="Test-line text"
        />
        <select
          className={css.input}
          value={testFormat}
          onChange={(e) => setTestFormat(e.currentTarget.value as OutputFormat)}
          aria-label="Test-line output format"
        >
          <option value="mp3">mp3</option>
          <option value="wav">wav</option>
          <option value="flac">flac</option>
        </select>
        <button
          type="button"
          className={css.primaryButton}
          onClick={() => props.onTestLine(testText, testFormat)}
        >
          Test this line
        </button>
      </div>

      <div className={css.detailBody}>
        <div className={css.fieldset}>
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
        </div>

        <div className={css.fieldset}>
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

          {emotionVoice && (
            <>
              <span className={css.fieldLabel}>Emotion reference voice</span>
              <VoiceDetail voice={emotionVoice} />
            </>
          )}
        </div>
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
            <motion.div
              className={css.durationFill}
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(100, (voice.durationMs / 60000) * 100)}%`,
              }}
              transition={{ duration: 0.35 }}
            />
          </div>
          {durationWarning && (
            <span
              className={durationWarning.level === "warn" ? css.durationWarn : css.durationDanger}
            >
              {durationWarning.message}
            </span>
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
          key={i}
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
}: {
  onExport: () => void;
  onImport: (bundle: MappingBundle, strategy: ImportConflictStrategy) => void;
}): JSX.Element {
  const [strategy, setStrategy] = useState<ImportConflictStrategy>("error");
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={css.actionsRow}>
      <button type="button" className={css.secondaryButton} onClick={onExport}>
        Export JSON
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        style={{ display: "none" }}
        onChange={async (e) => {
          const file = e.currentTarget.files?.[0];
          e.currentTarget.value = "";
          if (!file) return;
          try {
            const text = await file.text();
            const bundle = JSON.parse(text) as MappingBundle;
            onImport(bundle, strategy);
          } catch {
            alert("Import failed: file is not a valid JSON mapping bundle.");
          }
        }}
      />
      <button type="button" className={css.secondaryButton} onClick={() => fileRef.current?.click()}>
        Import JSON
      </button>
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
  let idx = mappings.length + 1;
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
