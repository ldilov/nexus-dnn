import { useCallback, useState } from "react";
import { toast } from "sonner";
import { ExtensionApiError } from "../../../services/http";
import { uploadFile } from "../../../services/upload_client";

interface AnchorUpload {
  file: File | null;
  uploading: boolean;
  uploadError: string | null;
  pick: (file: File | null) => Promise<void>;
}

export function useAnchorUpload(
  onResolved: (name: string | null, path: string | null) => void,
): AnchorUpload {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

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

  return { file, uploading, uploadError, pick };
}
