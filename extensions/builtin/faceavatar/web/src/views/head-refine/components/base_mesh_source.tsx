import { type ChangeEvent, type ReactElement, useCallback, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useHistory } from "../../../hooks/use_history";
import { ExtensionApiError } from "../../../services/http";
import { uploadGlb } from "../../../services/glb_upload_client";
import type { GenerationJob } from "../../../services/types";
import * as styles from "./base_mesh_source.css";

const GLB_ACCEPT = "model/gltf-binary,.glb";
const UPLOAD_VALUE = "__upload__";

interface BaseMeshSourceProps {
  /** Currently selected base mesh ref (artifact/media ref), or null. */
  value: string | null;
  /** Human label for the current selection (for the uploaded-file name). */
  label: string | null;
  onSelect: (ref: string, label: string) => void;
  onClear: () => void;
  disabled?: boolean;
}

/** Picks the base mesh to graft onto: a recent faceavatar head OR an uploaded
 * GLB. Boundary-clean — the dropdown only ever lists faceavatar's own
 * host-owned mesh artifacts; an external mesh (e.g. one made in another tool)
 * arrives via upload as an opaque ref. */
export function BaseMeshSource({
  value,
  label,
  onSelect,
  onClear,
  disabled = false,
}: BaseMeshSourceProps): ReactElement {
  const history = useHistory("head-refine");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const meshes = useMemo(
    () => history.jobs.filter((j) => j.kind === "generate" && j.status === "succeeded" && j.glbRef),
    [history.jobs],
  );

  const onPickFile = useCallback(() => fileRef.current?.click(), []);

  const onFile = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file) return;
      setUploading(true);
      try {
        const { ref } = await uploadGlb(file);
        onSelect(ref, file.name);
      } catch (err) {
        const message =
          err instanceof ExtensionApiError ? err.message : "GLB upload failed — try again.";
        toast.error(message);
      } finally {
        setUploading(false);
      }
    },
    [onSelect],
  );

  const onSelectChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const next = event.target.value;
      if (next === UPLOAD_VALUE) {
        onPickFile();
        return;
      }
      if (next === "") {
        onClear();
        return;
      }
      onSelect(next, meshSummary(meshes.find((m) => m.glbRef === next)));
    },
    [meshes, onClear, onPickFile, onSelect],
  );

  const isUploaded = value !== null && !meshes.some((m) => m.glbRef === value);

  return (
    <div className={styles.wrap}>
      <label className={styles.label} htmlFor="faceavatar-base-mesh">
        Base mesh
      </label>
      <select
        id="faceavatar-base-mesh"
        className={styles.select}
        value={isUploaded ? "" : (value ?? "")}
        disabled={disabled || uploading}
        onChange={onSelectChange}
      >
        <option value="">{uploading ? "Uploading…" : "Select a recent head…"}</option>
        {meshes.map((job) => (
          <option key={job.id} value={job.glbRef ?? ""}>
            {meshSummary(job)}
          </option>
        ))}
        <option value={UPLOAD_VALUE}>Upload a GLB…</option>
      </select>
      <input
        ref={fileRef}
        type="file"
        className={styles.hiddenInput}
        accept={GLB_ACCEPT}
        tabIndex={-1}
        onChange={(e) => void onFile(e)}
      />
      {value ? (
        <div className={styles.selected}>
          <span className={styles.selectedIcon} aria-hidden="true">
            deployed_code
          </span>
          <span className={styles.selectedName} title={value}>
            {label ?? value}
          </span>
          <button type="button" className={styles.clearBtn} onClick={onClear} disabled={disabled}>
            Clear
          </button>
        </div>
      ) : (
        <span className={styles.hint}>Pick a recent Face Avatar head, or upload any GLB.</span>
      )}
    </div>
  );
}

function meshSummary(job: GenerationJob | undefined): string {
  if (!job) return "head.glb";
  const faces = job.metadata?.mesh?.faces;
  const facePart = typeof faces === "number" ? ` · ${faces.toLocaleString()} faces` : "";
  return `${job.id}${facePart}`;
}
