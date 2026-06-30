import { type ReactElement, useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { FileDropzone } from "../../../components/primitives/file_dropzone";
import { useObjectUrl } from "../../../hooks/use_object_url";
import { ExtensionApiError } from "../../../services/http";
import { uploadImage } from "../../../services/upload_client";
import { useGenerateRequest } from "../../../store/generate_request_store";
import * as styles from "./image_uploader.css";

const MAX_IMAGE_BYTES = 32 * 1024 * 1024;
const ACCEPT = "image/png,image/jpeg,image/webp";

export function ImageUploader(): ReactElement {
  const { imageRef, imageName, setImage, clearImage } = useGenerateRequest();
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const previewUrl = useObjectUrl(localFile);

  const handleFile = useCallback(
    async (file: File) => {
      setLocalFile(file);
      setUploading(true);
      try {
        const { ref } = await uploadImage(file);
        setImage(ref, file.name);
      } catch (err) {
        const message =
          err instanceof ExtensionApiError ? err.message : "Upload failed — try again.";
        toast.error(message);
        setLocalFile(null);
      } finally {
        setUploading(false);
      }
    },
    [setImage],
  );

  const handleClear = useCallback(() => {
    setLocalFile(null);
    clearImage();
  }, [clearImage]);

  if (imageRef && imageName) {
    return (
      <div className={styles.wrap}>
        <div className={styles.previewCard}>
          {previewUrl ? (
            <img className={styles.thumb} src={previewUrl} alt={imageName} />
          ) : null}
          <div className={styles.previewMeta}>
            <span className={styles.fileName}>{imageName}</span>
            <span className={styles.fileRef}>{imageRef}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClear}>
            Replace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <FileDropzone
      accept={ACCEPT}
      maxSizeBytes={MAX_IMAGE_BYTES}
      disabled={uploading}
      ariaLabel="input image"
      label={uploading ? "Uploading…" : "Drop an image or click to browse"}
      hint="PNG, JPEG or WebP · single subject on a clean background works best"
      onFile={(file) => void handleFile(file)}
      renderPreview={(file) =>
        previewUrl ? <img className={styles.dropImage} src={previewUrl} alt={file.name} /> : null
      }
    />
  );
}
