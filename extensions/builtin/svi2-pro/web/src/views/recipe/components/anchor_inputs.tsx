import { type ReactElement, useCallback } from "react";
import { FileDropzone } from "../../../components/primitives/file_dropzone";
import { Badge } from "../../../components/ui/badge";
import { useRenderRequest } from "../../../store/render_request_store";
import { useAnchorUpload } from "../hooks/use_anchor_upload";
import * as styles from "./anchor_inputs.css";

const MAX_IMAGE_BYTES = 32 * 1024 * 1024;

interface AnchorInputsProps {
  refImageRequired: boolean;
  lastImageRequired: boolean;
  refError?: string | undefined;
  lastError?: string | undefined;
}

export function AnchorInputs({
  refImageRequired,
  lastImageRequired,
  refError,
  lastError,
}: AnchorInputsProps): ReactElement {
  const {
    params,
    refImageName,
    lastImageName,
    setRefImage,
    setLastImage,
    clearRefImageSilent,
    clearLastImageSilent,
  } = useRenderRequest();

  const onRefResolved = useCallback(
    (name: string | null, path: string | null) => setRefImage(name, path ?? ""),
    [setRefImage],
  );
  const onLastResolved = useCallback(
    (name: string | null, path: string | null) => setLastImage(name, path),
    [setLastImage],
  );

  const refRemotePath = params.ref_image_path && params.ref_image_path.length > 0
    ? params.ref_image_path
    : null;
  const lastRemotePath = params.last_image_path && params.last_image_path.length > 0
    ? params.last_image_path
    : null;

  const refUpload = useAnchorUpload(onRefResolved, refRemotePath, clearRefImageSilent);
  const lastUpload = useAnchorUpload(onLastResolved, lastRemotePath, clearLastImageSilent);
  const refUrl = refUpload.previewUrl;
  const lastUrl = lastUpload.previewUrl;

  return (
    <div className={styles.grid}>
      <div className={styles.slot}>
        <span className={styles.slotLabel}>
          Reference image{" "}
          {refImageRequired ? (
            <Badge tone="accent">required</Badge>
          ) : (
            <Badge tone="neutral">optional</Badge>
          )}
        </span>
        <FileDropzone
          accept="image/*"
          maxSizeBytes={MAX_IMAGE_BYTES}
          ariaLabel="reference image upload"
          label={refUpload.file ? "Replace reference image" : "Drop the anchor image or browse"}
          hint={
            refImageRequired
              ? "Defines identity. Aspect-match to the render resolution; dims divisible by 16."
              : "Optional in Text-to-Video. Provide one to anchor identity, or leave empty to synthesize a seed from the prompt."
          }
          onFiles={(files) => void refUpload.pick(files[0] ?? null)}
          renderPreview={() =>
            refUpload.file && refUrl ? (
              <img className={styles.thumb} src={refUrl} alt="reference preview" />
            ) : null
          }
        />
        {!refUpload.file && refUrl && (
          <div className={styles.remotePreview}>
            <img
              className={styles.thumb}
              src={refUrl}
              alt="reference preview"
              onError={refUpload.handleRemotePreviewError}
            />
            <span className={styles.remotePreviewNote}>
              Restored from a past run{refImageName ? ` · ${refImageName}` : ""}
            </span>
          </div>
        )}
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
          hint="FLF2V end keyframe. Animates reference → last image over one clip — switches the render to single-clip morph (Clips locked to 1)."
          onFiles={(files) => void lastUpload.pick(files[0] ?? null)}
          renderPreview={() =>
            lastUpload.file && lastUrl ? (
              <img className={styles.thumb} src={lastUrl} alt="last preview" />
            ) : null
          }
        />
        {!lastUpload.file && lastUrl && (
          <div className={styles.remotePreview}>
            <img
              className={styles.thumb}
              src={lastUrl}
              alt="last preview"
              onError={lastUpload.handleRemotePreviewError}
            />
            <span className={styles.remotePreviewNote}>
              Restored from a past run{lastImageName ? ` · ${lastImageName}` : ""}
            </span>
          </div>
        )}
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
