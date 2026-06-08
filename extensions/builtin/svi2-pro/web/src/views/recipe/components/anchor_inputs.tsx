import { type ReactElement, useCallback } from "react";
import { FileDropzone } from "../../../components/primitives/file_dropzone";
import { Badge } from "../../../components/ui/badge";
import { useObjectUrl } from "../../../hooks/use_object_url";
import { useRenderRequest } from "../../../store/render_request_store";
import { useAnchorUpload } from "../hooks/use_anchor_upload";
import * as styles from "./anchor_inputs.css";

const MAX_IMAGE_BYTES = 32 * 1024 * 1024;

interface AnchorInputsProps {
  lastImageRequired: boolean;
  refError?: string | undefined;
  lastError?: string | undefined;
}

export function AnchorInputs({
  lastImageRequired,
  refError,
  lastError,
}: AnchorInputsProps): ReactElement {
  const { setRefImage, setLastImage } = useRenderRequest();

  const onRefResolved = useCallback(
    (name: string | null, path: string | null) => setRefImage(name, path ?? ""),
    [setRefImage],
  );
  const onLastResolved = useCallback(
    (name: string | null, path: string | null) => setLastImage(name, path),
    [setLastImage],
  );

  const refUpload = useAnchorUpload(onRefResolved);
  const lastUpload = useAnchorUpload(onLastResolved);
  const refUrl = useObjectUrl(refUpload.file);
  const lastUrl = useObjectUrl(lastUpload.file);

  return (
    <div className={styles.grid}>
      <div className={styles.slot}>
        <span className={styles.slotLabel}>
          Reference image <Badge tone="accent">required</Badge>
        </span>
        <FileDropzone
          accept="image/*"
          maxSizeBytes={MAX_IMAGE_BYTES}
          ariaLabel="reference image upload"
          label={refUpload.file ? "Replace reference image" : "Drop the anchor image or browse"}
          hint="Defines identity. Aspect-match to the render resolution; dims divisible by 16."
          onFiles={(files) => void refUpload.pick(files[0] ?? null)}
          renderPreview={() =>
            refUrl ? (
              <img className={styles.thumb} src={refUrl} alt="reference preview" />
            ) : null
          }
        />
        {refUpload.uploading && <span className={styles.status}>Uploading…</span>}
        {!refUpload.uploading && refUpload.file && (
          <span className={styles.fileName}>{refUpload.file.name}</span>
        )}
        {refUpload.uploadError && (
          <span role="alert" className={styles.error}>
            {refUpload.uploadError}
          </span>
        )}
        {refError && (
          <span role="alert" className={styles.error}>
            {refError}
          </span>
        )}
      </div>

      <div className={styles.slot}>
        <span className={styles.slotLabel}>
          Last image{" "}
          {lastImageRequired ? (
            <Badge tone="warning">required for morph</Badge>
          ) : (
            <Badge tone="neutral">optional</Badge>
          )}
        </span>
        <FileDropzone
          accept="image/*"
          maxSizeBytes={MAX_IMAGE_BYTES}
          ariaLabel="last image upload"
          label={lastUpload.file ? "Replace last image" : "Drop the end keyframe or browse"}
          hint="FLF2V end keyframe. Animates reference → last image over the clip."
          onFiles={(files) => void lastUpload.pick(files[0] ?? null)}
          renderPreview={() =>
            lastUrl ? <img className={styles.thumb} src={lastUrl} alt="last preview" /> : null
          }
        />
        {lastUpload.uploading && <span className={styles.status}>Uploading…</span>}
        {!lastUpload.uploading && lastUpload.file && (
          <span className={styles.fileName}>{lastUpload.file.name}</span>
        )}
        {lastUpload.uploadError && (
          <span role="alert" className={styles.error}>
            {lastUpload.uploadError}
          </span>
        )}
        {lastError && (
          <span role="alert" className={styles.error}>
            {lastError}
          </span>
        )}
      </div>
    </div>
  );
}
