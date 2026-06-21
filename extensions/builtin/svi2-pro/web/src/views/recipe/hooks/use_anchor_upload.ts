import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useObjectUrl } from "../../../hooks/use_object_url";
import { ExtensionApiError } from "../../../services/http";
import { mediaUrlForPath } from "../../../services/media_url";
import { uploadFile } from "../../../services/upload_client";

interface AnchorUpload {
  file: File | null;
  uploading: boolean;
  uploadError: string | null;
  /** A preview source: the locally-picked File when present, otherwise a media
   * URL for the restored server path so a historical anchor shows without a
   * re-upload. `null` when neither is available. */
  previewUrl: string | null;
  pick: (file: File | null) => Promise<void>;
  /** Belt-and-suspenders for a restored path that 404s after the HEAD probe:
   * clears the anchor and warns, mirroring the store's missing-image path. */
  handleRemotePreviewError: () => void;
}

/**
 * Anchor upload + preview. A picked `File` always wins; with no `File` a
 * `remotePreviewPath` (sourced from the restored run's params) drives a
 * server-media preview so past anchors display without re-uploading.
 *
 * `onRemoteError` clears the restored anchor WITHOUT marking the form dirty, so
 * a transient image-load failure after a clean restore cannot spuriously flip
 * the dirty flag.
 */
export function useAnchorUpload(
  onResolved: (name: string | null, path: string | null) => void,
  remotePreviewPath: string | null,
  onRemoteError: () => void,
): AnchorUpload {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const localUrl = useObjectUrl(file);

  const pick = useCallback(
    async (next: File | null) => {
      setFile(next);
      setUploadError(null);
      if (!next) {
        onResolved(null, null);
        return;
      }
      setUploading(true);
      try {
        const { path } = await uploadFile(next);
        onResolved(next.name, path);
      } catch (err) {
        const message =
          err instanceof ExtensionApiError ? err.message : "Upload failed. Try again.";
        setUploadError(message);
        onResolved(null, null);
        toast.error(message);
      } finally {
        setUploading(false);
      }
    },
    [onResolved],
  );

  const handleRemotePreviewError = useCallback(() => {
    onRemoteError();
    toast.warning("Input image no longer on disk — re-upload to render");
  }, [onRemoteError]);

  const remoteUrl = file ? null : mediaUrlForPath(remotePreviewPath);
  const previewUrl = localUrl ?? remoteUrl;

  return { file, uploading, uploadError, previewUrl, pick, handleRemotePreviewError };
}
