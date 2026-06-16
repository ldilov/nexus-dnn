export type OutputFormat = "wav" | "mp3" | "flac";
export type ParserMode = "dialogue" | "raw_text" | "advanced_tagged" | "story";
export type SeedStrategy = "fixed" | "increment_per_line" | "random_per_line";
export type CachePolicy = "use_cache" | "force_regenerate" | "read_only_cache";
export type SpeedMode = "preserve_pitch" | "disabled";
export type EmotionMode = "none" | "audio_ref" | "emotion_vector" | "qwen_template";
export type PersistedEmotionMode = "none" | "audio_ref" | "vector_preset" | "qwen_template";
export type EmotionSource = "inline" | "mapping" | "global" | "none";
export type RunStatus = "queued" | "running" | "completed" | "failed" | "cancelled" | "partial";
export type UtteranceStatus = "queued" | "running" | "completed" | "failed" | "cancelled";
export type RunKind = "batch" | "test_line" | "resume";

export interface GlobalEmotion {
  mode?: EmotionMode;
  audioRefVoiceAssetId?: string | null;
  vector?: [number, number, number, number, number, number, number, number];
  qwenTemplate?: string | null;
  emotionAlpha?: number;
}

export interface PrebuiltSegment {
  text: string;
  voice_asset_id: string;
  speaker_label?: string;
  emotion?: { mode: "emotion_vector"; vector: number[]; emotionAlpha?: number } | null;
}

export interface CreateRunRequest {
  script: string;
  parserMode?: ParserMode;
  outputFormat: OutputFormat;
  speedFactor?: number;
  speedMode?: SpeedMode;
  seedStrategy?: SeedStrategy;
  baseSeed?: number;
  cachePolicy?: CachePolicy;
  globalEmotion?: GlobalEmotion;
  generation?: Record<string, unknown>;
  prebuiltSegments?: PrebuiltSegment[];
  createZipBundle?: boolean;
  includePreviewMix?: boolean;
  includeManifestJson?: boolean;
  includeCsvIndex?: boolean;
}

export type ParserWarningKind =
  | "unknown_override_key"
  | "malformed_tag"
  | "empty_character_name"
  | "empty_text_after_tag";

export interface ParserWarning {
  lineNumber: number;
  kind: ParserWarningKind;
  detail: string;
}

export interface Preflight {
  unresolvedCharacters: string[];
  predictedFilenames: string[];
  parserWarnings: ParserWarning[];
}

export interface CreateRunResponse {
  runId: string;
  queuePosition: number;
  preflight: Preflight;
}

export interface TestLineRequest {
  line: string;
  outputFormat: OutputFormat;
  globalEmotion?: GlobalEmotion;
  generation?: Record<string, unknown>;
}

export interface TestLineResponse {
  runId: string;
  etaSeconds: number;
}

export interface RunSummary {
  runId: string;
  deploymentId?: string;
  kind: RunKind;
  status: RunStatus;
  originalRunId?: string | null;
  // Utterance counts are NOT emitted by run_summary_json today. Re-add
  // these fields the day the backend starts tracking + serialising them
  // (`runs.rs::run_summary_json`). Until then their presence here was a
  // type-safety lie that would render as `NaN%` progress in any view.
  queuedAt: number;
  startedAt?: number | null;
  finishedAt?: number | null;
}

export interface UtteranceState {
  utteranceId: string;
  globalIndex: number;
  characterDisplay: string;
  characterSanitised: string;
  characterIndex: number;
  text: string;
  resolvedEmotionMode?: EmotionMode | null;
  resolvedEmotionSource?: EmotionSource | null;
  cacheHit: boolean;
  sourceRunId?: string | null;
  audioArtifactRef?: string | null;
  durationMs?: number | null;
  status: UtteranceStatus;
  failureCategory?: string | null;
  derivedArtifactRef?: string | null;
  /** @internal Backend-persisted chain JSON; opaque to the frontend. Apply/clear
   * actions use the typed `EditChain` from `audio_edit_client.ts`; this field is
   * mirrored on the row shape only for forward compatibility. */
  readonly editChainJson?: string | null;
}

export interface Run extends RunSummary {
  scriptSnapshot: string;
  generationSettings?: Record<string, unknown>;
  globalEmotion?: GlobalEmotion;
  outputFormat: OutputFormat;
  speedFactor: number;
  speedMode: SpeedMode;
  cachePolicy: CachePolicy;
  seedStrategy: SeedStrategy;
  baseSeed: number;
  utterances: UtteranceState[];
  exportArtifactRef?: string | null;
  manifestArtifactRef?: string | null;
  previewArtifactRef?: string | null;
  exportZipStaleAt?: number | null;
}

export interface ErrorEnvelope {
  status: "error";
  category: string;
  message: string;
  requestId?: string;
}

export type ProgressEvent =
  | { type: "segment_started"; runId: string; globalIndex: number }
  | {
      type: "segment_completed";
      runId: string;
      globalIndex: number;
      durationMs: number;
      cacheHit: boolean;
      audioArtifactRef: string;
    }
  | {
      type: "segment_failed";
      runId: string;
      globalIndex: number;
      failureCategory: string;
      failureDetail: string;
    }
  | {
      type: "run_terminal";
      runId: string;
      status: RunStatus;
      exportArtifactRef?: string | null;
    };
