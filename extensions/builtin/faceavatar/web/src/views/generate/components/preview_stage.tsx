import type { ReactElement } from "react";
import { ModelViewer } from "../../../components/media/model_viewer";
import type { GeneratePhase, GenerateState } from "../../../domain/generate_state";
import { mediaUrlForRef } from "../../../services/media_url";
import * as styles from "./preview_stage.css";

interface PreviewStageProps {
  state: GenerateState;
}

/** Persistent 3D preview bar above the workspace — a viewport (live head once a
 * run completes, atmospheric empty stage otherwise) paired with the result's
 * format/topology readout and a GLB download. */
export function PreviewStage({ state }: PreviewStageProps): ReactElement {
  const glbUrl = state.phase === "done" ? mediaUrlForRef(state.glbRef) : null;
  const status = describeStatus(state.phase);
  const meta = readMeta(state);
  const downloadName = state.glbRef ? `${state.glbRef}.glb` : "head.glb";

  return (
    <section className={styles.stage} aria-label="Head preview">
      <div className={styles.viewport}>
        {glbUrl ? (
          <ModelViewer url={glbUrl} alt="Generated 3D head preview" className={styles.viewer} />
        ) : (
          <>
            <div className={styles.grid} aria-hidden="true" />
            <span className={styles.eyebrow}>OUTPUT · GLB HEAD</span>
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
          {meta.identity ? <MetaRow label="Identity" value={meta.identity} /> : null}
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
          </div>
        </div>
      </div>
    </section>
  );
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
        hint: "Fitting the identity head — the preview appears here when it lands.",
        dot: styles.dotRunning,
      };
    case "done":
      return { title: "Head ready", hint: "", dot: styles.dotDone };
    case "error":
      return {
        title: "Generation failed",
        hint: "See the progress panel for details, then try again.",
        dot: styles.dotError,
      };
    case "cancelled":
      return {
        title: "Cancelled",
        hint: "Run a generation to preview the head.",
        dot: styles.dotIdle,
      };
    default:
      return {
        title: "No head yet",
        hint: "Run a generation to preview the head.",
        dot: styles.dotIdle,
      };
  }
}

interface MetaView {
  format: string;
  tris: string;
  verts: string;
  identity: string | null;
}

function readMeta(state: GenerateState): MetaView {
  if (state.phase !== "done") return { format: "—", tris: "—", verts: "—", identity: null };
  const m = state.metadata;
  const faces = m?.mesh?.faces;
  const verts = m?.mesh?.vertices;
  const score = m?.identity_score;
  return {
    format:
      typeof m?.textured === "boolean" ? (m.textured ? "GLB · textured" : "GLB · mesh only") : "GLB",
    tris: typeof faces === "number" ? faces.toLocaleString() : "—",
    verts: typeof verts === "number" ? verts.toLocaleString() : "—",
    identity: typeof score === "number" ? score.toFixed(2) : null,
  };
}
