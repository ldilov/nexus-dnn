import { type ChangeEvent, type ReactElement, useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { ModelViewer } from "../../../components/media/model_viewer";
import { DEFAULT_REFINE_PARAMS } from "../../../domain/defaults";
import type { GeneratePhase, GenerateState } from "../../../domain/generate_state";
import type { RefineResolution } from "../../../services/types";
import { ExtensionApiError } from "../../../services/http";
import { mediaUrlForRef } from "../../../services/media_url";
import { uploadImage } from "../../../services/upload_client";
import { useGenerateRequest } from "../../../store/generate_request_store";
import * as styles from "./preview_stage.css";

interface PreviewStageProps {
  state: GenerateState;
}

const FACE_CROP_ACCEPT = "image/png,image/jpeg,image/webp";

/** Persistent 3D preview bar above the workspace — a viewport (live mesh once a
 * run completes, atmospheric empty stage otherwise) paired with the result's
 * format/topology readout, GLB download and a geometry "Refine detail" pass. */
export function PreviewStage({ state }: PreviewStageProps): ReactElement {
  const { startRefine } = useGenerateRequest();
  const cropInputRef = useRef<HTMLInputElement | null>(null);
  const [cropRef, setCropRef] = useState<string | null>(null);
  const [cropName, setCropName] = useState<string | null>(null);
  const [cropUploading, setCropUploading] = useState(false);
  const [refining, setRefining] = useState(false);
  const [resolution, setResolution] = useState<RefineResolution>(
    DEFAULT_REFINE_PARAMS.resolution ?? 1536,
  );
  const [shapeSteps, setShapeSteps] = useState<number>(DEFAULT_REFINE_PARAMS.shape_steps ?? 25);
  const [textureSteps, setTextureSteps] = useState<number>(
    DEFAULT_REFINE_PARAMS.texture_steps ?? 25,
  );
  const [maxTokens, setMaxTokens] = useState<number>(
    DEFAULT_REFINE_PARAMS.max_num_tokens ?? 98_304,
  );

  const glbUrl = state.phase === "done" ? mediaUrlForRef(state.glbRef) : null;
  const status = describeStatus(state.phase);
  const meta = readMeta(state);
  const downloadName = state.glbRef ? `${state.glbRef}.glb` : "mesh.glb";
  const canRefine = Boolean(state.glbRef) && Boolean(state.inputImageRef) && !refining;

  const pickCrop = useCallback(() => cropInputRef.current?.click(), []);

  const onCropPicked = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setCropUploading(true);
    try {
      const { ref } = await uploadImage(file);
      setCropRef(ref);
      setCropName(file.name);
    } catch (err) {
      const message =
        err instanceof ExtensionApiError ? err.message : "Face crop upload failed — try again.";
      toast.error(message);
    } finally {
      setCropUploading(false);
    }
  }, []);

  const clearCrop = useCallback(() => {
    setCropRef(null);
    setCropName(null);
  }, []);

  const onRefine = useCallback(async () => {
    if (!state.glbRef || !state.inputImageRef) return;
    setRefining(true);
    try {
      await startRefine(
        state.glbRef,
        state.inputImageRef,
        {
          ...DEFAULT_REFINE_PARAMS,
          resolution,
          shape_steps: shapeSteps,
          texture_steps: textureSteps,
          max_num_tokens: maxTokens,
        },
        cropRef ?? undefined,
      );
    } catch (err) {
      const message =
        err instanceof ExtensionApiError ? err.message : "Could not start refine — try again.";
      toast.error(message);
    } finally {
      setRefining(false);
    }
  }, [
    state.glbRef,
    state.inputImageRef,
    cropRef,
    resolution,
    shapeSteps,
    textureSteps,
    maxTokens,
    startRefine,
  ]);

  return (
    <section className={styles.stage} aria-label="Mesh preview">
      <div className={styles.viewport}>
        {glbUrl ? (
          <ModelViewer url={glbUrl} alt="Generated 3D mesh preview" className={styles.viewer} />
        ) : (
          <>
            <div className={styles.grid} aria-hidden="true" />
            <span className={styles.eyebrow}>OUTPUT · GLB MESH</span>
            <div className={styles.empty}>
              <span className={styles.emptyIcon} aria-hidden="true">
                deployed_code
              </span>
              <span className={styles.emptyText}>{status.hint}</span>
            </div>
          </>
        )}
      </div>

      <div className={styles.meta}>
        <div className={styles.metaHead}>
          <span className={[styles.statusDot, status.dot].join(" ")} aria-hidden="true" />
          <span className={styles.metaTitle}>{status.title}</span>
        </div>
        <span className={styles.metaId} title={state.glbRef ?? undefined}>
          {state.glbRef ?? "—"}
        </span>

        <div className={styles.rows}>
          <MetaRow label="Format" value={meta.format} />
          <MetaRow label="Triangles" value={meta.tris} />
          <MetaRow label="Vertices" value={meta.verts} />
        </div>

        <div className={styles.actions}>
          <div className={styles.actionRow}>
            {glbUrl ? (
              <a
                className={[styles.download, styles.downloadSecondary].join(" ")}
                href={glbUrl}
                download={downloadName}
              >
                <span className={styles.downloadIcon} aria-hidden="true">
                  download
                </span>
                Download GLB
              </a>
            ) : (
              <span
                className={[styles.download, styles.downloadDisabled].join(" ")}
                aria-disabled="true"
              >
                <span className={styles.downloadIcon} aria-hidden="true">
                  download
                </span>
                Download GLB
              </span>
            )}

            <button
              type="button"
              className={styles.refine}
              onClick={() => void onRefine()}
              disabled={!canRefine}
              aria-busy={refining || undefined}
            >
              <span className={styles.refineIcon} aria-hidden="true">
                auto_fix_high
              </span>
              Refine detail
            </button>
          </div>

          {glbUrl ? (
            <div className={styles.controls}>
              <span className={styles.controlsTitle}>
                <span className={styles.controlsIcon} aria-hidden="true">
                  tune
                </span>
                Refine settings
              </span>
              <div className={styles.controlsGrid}>
                <label className={styles.ctl}>
                  <span className={styles.ctlLabel}>Detail</span>
                  <select
                    className={styles.ctlInput}
                    value={resolution}
                    onChange={(e) => setResolution(Number(e.target.value) as RefineResolution)}
                    disabled={refining}
                  >
                    <option value={1536}>Max · 1536</option>
                    <option value={1024}>Balanced · 1024</option>
                    <option value={512}>Fast · 512</option>
                  </select>
                </label>
                <label className={styles.ctl}>
                  <span className={styles.ctlLabel}>Max tokens</span>
                  <input
                    className={styles.ctlInput}
                    type="number"
                    min={0}
                    step={4096}
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(clampInt(e.target.value, 0))}
                    disabled={refining}
                  />
                </label>
                <label className={styles.ctl}>
                  <span className={styles.ctlLabel}>Shape steps</span>
                  <input
                    className={styles.ctlInput}
                    type="number"
                    min={1}
                    max={100}
                    value={shapeSteps}
                    onChange={(e) => setShapeSteps(clampInt(e.target.value, 1))}
                    disabled={refining}
                  />
                </label>
                <label className={styles.ctl}>
                  <span className={styles.ctlLabel}>Texture steps</span>
                  <input
                    className={styles.ctlInput}
                    type="number"
                    min={1}
                    max={100}
                    value={textureSteps}
                    onChange={(e) => setTextureSteps(clampInt(e.target.value, 1))}
                    disabled={refining}
                  />
                </label>
              </div>
            </div>
          ) : null}

          {glbUrl ? (
            <div className={styles.cropSlot}>
              <span className={styles.cropLabel}>
                <span className={styles.cropLabelIcon} aria-hidden="true">
                  face
                </span>
                <span className={styles.cropName}>{cropName ?? "Face crop · optional"}</span>
              </span>
              <input
                ref={cropInputRef}
                type="file"
                className={styles.cropInput}
                accept={FACE_CROP_ACCEPT}
                tabIndex={-1}
                onChange={(e) => void onCropPicked(e)}
              />
              <button
                type="button"
                className={styles.cropButton}
                onClick={cropRef ? clearCrop : pickCrop}
                disabled={cropUploading}
              >
                {cropUploading ? "Uploading…" : cropRef ? "Remove" : "Attach"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Parse a number input, flooring at `min` and falling back to `min` on NaN so the
 * refine controls never emit an empty or out-of-range value. */
function clampInt(raw: string, min: number): number {
  const n = Number.parseInt(raw, 10);
  return Number.isNaN(n) || n < min ? min : n;
}

function MetaRow({ label, value }: { label: string; value: string }): ReactElement {
  return (
    <div className={styles.kvRow}>
      <span className={styles.kvKey}>{label}</span>
      <span className={styles.kvVal}>{value}</span>
    </div>
  );
}

interface StatusView {
  title: string;
  hint: string;
  dot: string;
}

function describeStatus(phase: GeneratePhase): StatusView {
  switch (phase) {
    case "running":
      return {
        title: "Generating…",
        hint: "Building the mesh — the preview appears here when it lands.",
        dot: styles.dotRunning,
      };
    case "done":
      return { title: "Mesh ready", hint: "", dot: styles.dotDone };
    case "error":
      return {
        title: "Generation failed",
        hint: "See the progress panel for details, then try again.",
        dot: styles.dotError,
      };
    case "cancelled":
      return {
        title: "Cancelled",
        hint: "Run a generation to preview the mesh.",
        dot: styles.dotIdle,
      };
    default:
      return {
        title: "No mesh yet",
        hint: "Run a generation to preview the mesh.",
        dot: styles.dotIdle,
      };
  }
}

interface MetaView {
  format: string;
  tris: string;
  verts: string;
}

function readMeta(state: GenerateState): MetaView {
  if (state.phase !== "done") return { format: "—", tris: "—", verts: "—" };
  const m = state.metadata;
  const faces = m?.mesh?.faces;
  const verts = m?.mesh?.vertices;
  return {
    format:
      typeof m?.textured === "boolean" ? (m.textured ? "GLB · textured" : "GLB · mesh only") : "GLB",
    tris: typeof faces === "number" ? faces.toLocaleString() : "—",
    verts: typeof verts === "number" ? verts.toLocaleString() : "—",
  };
}
