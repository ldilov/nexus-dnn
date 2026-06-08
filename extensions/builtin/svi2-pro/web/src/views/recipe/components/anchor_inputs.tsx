import { type ReactElement, useState } from "react";
import { FileDropzone } from "../../../components/primitives/file_dropzone";
import { Badge } from "../../../components/ui/badge";
import { useObjectUrl } from "../../../hooks/use_object_url";
import { useRenderRequest } from "../../../store/render_request_store";
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
  const [refFile, setRefFile] = useState<File | null>(null);
  const [lastFile, setLastFile] = useState<File | null>(null);
  const refUrl = useObjectUrl(refFile);
  const lastUrl = useObjectUrl(lastFile);

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
          label={refFile ? "Replace reference image" : "Drop the anchor image or browse"}
          hint="Defines identity. Aspect-match to the render resolution; dims divisible by 16."
          onFiles={(files) => {
            const file = files[0] ?? null;
            setRefFile(file);
            setRefImage(file?.name ?? null, file?.name ?? "");
          }}
          renderPreview={() =>
            refUrl ? (
              <img className={styles.thumb} src={refUrl} alt="reference preview" />
            ) : null
          }
        />
        {refFile && <span className={styles.fileName}>{refFile.name}</span>}
        {refError && (
          <span role="alert" className={styles.fileName} style={{ color: "var(--error)" }}>
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
          label={lastFile ? "Replace last image" : "Drop the end keyframe or browse"}
          hint="FLF2V end keyframe. Animates reference → last image over the clip."
          onFiles={(files) => {
            const file = files[0] ?? null;
            setLastFile(file);
            setLastImage(file?.name ?? null, file?.name ?? null);
          }}
          renderPreview={() =>
            lastUrl ? <img className={styles.thumb} src={lastUrl} alt="last preview" /> : null
          }
        />
        {lastFile && <span className={styles.fileName}>{lastFile.name}</span>}
        {lastError && (
          <span role="alert" className={styles.fileName} style={{ color: "var(--error)" }}>
            {lastError}
          </span>
        )}
      </div>
    </div>
  );
}
