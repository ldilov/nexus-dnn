import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import {
  INPUT_IMAGE_ACCEPTED_MIMES,
  INPUT_IMAGE_MAX_BYTES,
  ltxApi,
  type UploadedInputImage,
} from "./api";
import * as s from "./styles.css";

interface InputImagePickerProps {
  artifactId: string | undefined;
  onChange: (next: string | undefined) => void;
}

interface PreviewState {
  url: string;
  fileName: string;
  byteLength: number;
  mime: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function validateFile(file: File): string | null {
  if (!INPUT_IMAGE_ACCEPTED_MIMES.includes(file.type)) {
    return `Unsupported type ${file.type || "unknown"}. Use PNG, JPEG, or WEBP.`;
  }
  if (file.size === 0) {
    return "The selected file is empty.";
  }
  if (file.size > INPUT_IMAGE_MAX_BYTES) {
    return `Image is ${formatBytes(file.size)} — limit is ${formatBytes(
      INPUT_IMAGE_MAX_BYTES,
    )}.`;
  }
  return null;
}

export function InputImagePicker({
  artifactId,
  onChange,
}: InputImagePickerProps): ReactElement {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // When the artifact id is externally cleared (e.g. form reset after
  // submit), drop the preview + revoke the URL so we don't leak.
  useEffect(() => {
    if (artifactId === undefined && preview !== null) {
      URL.revokeObjectURL(preview.url);
      setPreview(null);
      setError(null);
    }
  }, [artifactId, preview]);

  // Revoke any live object URL on unmount.
  useEffect(
    () => () => {
      if (preview !== null) {
        URL.revokeObjectURL(preview.url);
      }
    },
    [preview],
  );

  const consumeFile = useCallback(
    async (file: File) => {
      const validation = validateFile(file);
      if (validation !== null) {
        setError(validation);
        return;
      }
      // Set the optimistic preview immediately so the user sees their
      // image while the upload is in flight. If the upload fails, we
      // roll the preview back and surface an error.
      const optimisticUrl = URL.createObjectURL(file);
      const previousPreview = preview;
      setPreview({
        url: optimisticUrl,
        fileName: file.name,
        byteLength: file.size,
        mime: file.type,
      });
      setUploading(true);
      setError(null);

      let uploaded: UploadedInputImage;
      try {
        uploaded = await ltxApi.uploadInputImage(file);
      } catch (e) {
        URL.revokeObjectURL(optimisticUrl);
        setPreview(previousPreview);
        setError(e instanceof Error ? e.message : String(e));
        setUploading(false);
        return;
      }

      if (previousPreview !== null) {
        URL.revokeObjectURL(previousPreview.url);
      }
      onChange(uploaded.artifact_id);
      setUploading(false);
    },
    [onChange, preview],
  );

  const handleFileInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      // Reset the input so picking the same file twice in a row still
      // triggers `change`. Files <input> only fires when the selection
      // actually changes.
      event.target.value = "";
      if (file !== undefined) {
        void consumeFile(file);
      }
    },
    [consumeFile],
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setDragActive(false);
      const file = event.dataTransfer.files?.[0];
      if (file !== undefined) {
        void consumeFile(file);
      }
    },
    [consumeFile],
  );

  const handleDragOver = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLLabelElement>) => {
      // Space/Enter activate the dropzone like a button — the visible
      // affordance is a styled label, so the browser's default click-
      // on-Enter behaviour for native <label> isn't reliable across
      // browsers. Wire it explicitly.
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        fileInputRef.current?.click();
      }
    },
    [],
  );

  // Paste-from-clipboard handler — listens on window so the user can
  // Ctrl/Cmd+V anywhere within the panel. Only triggers when the
  // clipboard carries an image and there's no live upload.
  useEffect(() => {
    const handler = (event: ClipboardEvent) => {
      if (uploading) return;
      const items = event.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.kind === "file" && item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file !== null) {
            event.preventDefault();
            void consumeFile(file);
            return;
          }
        }
      }
    };
    window.addEventListener("paste", handler);
    return () => window.removeEventListener("paste", handler);
  }, [consumeFile, uploading]);

  const clear = useCallback(() => {
    if (preview !== null) {
      URL.revokeObjectURL(preview.url);
    }
    setPreview(null);
    setError(null);
    onChange(undefined);
  }, [onChange, preview]);

  if (preview !== null && artifactId !== undefined && !uploading) {
    return (
      <>
        <label className={s.label} htmlFor={inputId}>
          Reference image
        </label>
        <div className={s.dropzonePreview}>
          <img
            className={s.dropzoneThumb}
            src={preview.url}
            alt="Reference frame to condition the first segment of the render."
          />
          <div>
            <div style={{ color: "inherit", fontSize: 13 }}>
              {preview.fileName}
            </div>
            <div className={s.meta}>
              {preview.mime} · {formatBytes(preview.byteLength)}
            </div>
            <div className={s.meta} style={{ marginTop: 2 }}>
              artifact: {artifactId}
            </div>
          </div>
          <button
            type="button"
            className={s.dropzoneClearButton}
            onClick={clear}
            aria-label="Remove reference image"
            title="Remove reference image"
          >
            ✕
          </button>
        </div>
      </>
    );
  }

  const dropzoneClass = dragActive
    ? `${s.dropzone} ${s.dropzoneActive}`
    : s.dropzone;
  return (
    <>
      <label className={s.label} htmlFor={inputId}>
        Reference image (optional)
      </label>
      <label
        className={dropzoneClass}
        htmlFor={inputId}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Upload reference image (drag, paste, or click)"
        aria-busy={uploading}
      >
        <input
          ref={fileInputRef}
          id={inputId}
          type="file"
          accept={INPUT_IMAGE_ACCEPTED_MIMES.join(",")}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          disabled={uploading}
        />
        <strong style={{ color: "inherit" }}>
          {uploading
            ? "Uploading…"
            : dragActive
              ? "Drop to upload"
              : "Drag, paste, or click"}
        </strong>
        <span className={s.meta}>
          PNG · JPEG · WEBP, up to {formatBytes(INPUT_IMAGE_MAX_BYTES)}. Anchors
          the first segment's identity; later segments still chain off the
          prior segment's last frame.
        </span>
      </label>
      {error !== null ? (
        <div className={s.errorBox} role="alert">
          {error}
        </div>
      ) : null}
    </>
  );
}
