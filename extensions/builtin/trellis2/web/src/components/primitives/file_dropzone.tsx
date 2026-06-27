import {
  type DragEvent,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import * as styles from "./file_dropzone.css";

export interface FileDropzoneProps {
  accept?: string;
  maxSizeBytes?: number;
  disabled?: boolean;
  label?: ReactNode;
  hint?: ReactNode;
  ariaLabel?: string;
  className?: string;
  renderPreview?: (file: File) => ReactNode;
  onFile: (file: File) => void;
}

function matchesAccept(file: File, accept: string): boolean {
  const patterns = accept
    .split(",")
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean);
  if (patterns.length === 0) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return patterns.some((pattern) => {
    if (pattern.startsWith(".")) return name.endsWith(pattern);
    if (pattern.endsWith("/*")) return type.startsWith(pattern.slice(0, -1));
    return type === pattern;
  });
}

function validate(
  file: File,
  accept: string | undefined,
  maxSizeBytes: number | undefined,
): string | null {
  if (accept && !matchesAccept(file, accept)) {
    return `"${file.name}" is not an accepted file type.`;
  }
  if (maxSizeBytes !== undefined && file.size > maxSizeBytes) {
    return `"${file.name}" exceeds the maximum size.`;
  }
  return null;
}

export function FileDropzone({
  accept,
  maxSizeBytes,
  disabled = false,
  label,
  hint,
  ariaLabel,
  className,
  renderPreview,
  onFile,
}: FileDropzoneProps): ReactElement {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const errorId = useId();
  const hintId = useId();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState<File | null>(null);

  const acceptFiles = useCallback(
    (fileList: FileList | null) => {
      const file = fileList?.[0];
      if (!file) return;
      const validationError = validate(file, accept, maxSizeBytes);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError(null);
      setAccepted(file);
      onFile(file);
    },
    [accept, maxSizeBytes, onFile],
  );

  const openPicker = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPicker();
      }
    },
    [disabled, openPicker],
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      acceptFiles(e.dataTransfer.files);
    },
    [disabled, acceptFiles],
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const describedBy = [hint ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  const cls = [
    styles.dropzone,
    isDragging ? styles.dragging : "",
    disabled ? styles.disabled : "",
    error !== null ? styles.errored : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <div
        // biome-ignore lint/a11y/useSemanticElements: drop target wraps a hidden file input
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel ?? "image dropzone"}
        aria-disabled={disabled}
        aria-describedby={describedBy || undefined}
        className={cls}
        onClick={openPicker}
        onKeyDown={handleKeyDown}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={inputRef}
          type="file"
          className={styles.hiddenInput}
          accept={accept}
          disabled={disabled}
          tabIndex={-1}
          onChange={(e) => acceptFiles(e.target.files)}
        />
        {renderPreview && accepted ? (
          <div className={styles.previewSlot}>{renderPreview(accepted)}</div>
        ) : (
          <>
            <span className={styles.primaryLine}>
              {label ?? (isDragging ? "Drop to upload" : "Drop an image or click to browse")}
            </span>
            {hint && (
              <span id={hintId} className={styles.hintLine}>
                {hint}
              </span>
            )}
          </>
        )}
      </div>
      {error && (
        <div id={errorId} role="alert" className={styles.errorLine}>
          {error}
        </div>
      )}
    </div>
  );
}
