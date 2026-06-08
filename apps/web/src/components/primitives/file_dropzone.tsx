import {
  type DragEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import { dropzoneRecipe, hiddenInput, primaryLine, hintLine, errorLine, previewSlot } from "./file_dropzone.css";

export type FileDropzoneProps = {
  accept?: string;
  maxSizeBytes?: number;
  multiple?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  hint?: ReactNode;
  ariaLabel?: string;
  className?: string;
  renderPreview?: (files: readonly File[]) => ReactNode;
  onFiles: (files: File[]) => void;
};

function matchesAccept(file: File, accept: string): boolean {
  const patterns = accept.split(",").map((p) => p.trim().toLowerCase()).filter(Boolean);
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
  files: readonly File[],
  accept: string | undefined,
  maxSizeBytes: number | undefined,
): string | null {
  for (const file of files) {
    if (accept && !matchesAccept(file, accept)) {
      return `"${file.name}" is not an accepted file type.`;
    }
    if (maxSizeBytes !== undefined && file.size > maxSizeBytes) {
      return `"${file.name}" exceeds the maximum size.`;
    }
  }
  return null;
}

export function FileDropzone({
  accept,
  maxSizeBytes,
  multiple = false,
  disabled = false,
  label,
  hint,
  ariaLabel,
  className,
  renderPreview,
  onFiles,
}: FileDropzoneProps): ReactElement {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const errorId = useId();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState<readonly File[]>([]);

  const acceptFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const incoming = Array.from(fileList);
      const selected = multiple ? incoming : incoming.slice(0, 1);
      const validationError = validate(selected, accept, maxSizeBytes);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError(null);
      setAccepted(selected);
      onFiles(selected);
    },
    [accept, maxSizeBytes, multiple, onFiles],
  );

  const openPicker = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
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

  const cls = [
    dropzoneRecipe({ isDragging, isDisabled: disabled, hasError: error !== null }),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel ?? "file dropzone"}
        aria-disabled={disabled}
        aria-describedby={error ? errorId : undefined}
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
          className={hiddenInput}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          tabIndex={-1}
          onChange={(e) => acceptFiles(e.target.files)}
        />
        <span className={primaryLine}>
          {label ?? (isDragging ? "Drop to upload" : "Drop a file or click to browse")}
        </span>
        {hint && <span className={hintLine}>{hint}</span>}
        {renderPreview && accepted.length > 0 && (
          <div className={previewSlot}>{renderPreview(accepted)}</div>
        )}
      </div>
      {error && (
        <div id={errorId} role="alert" className={errorLine}>
          {error}
        </div>
      )}
    </div>
  );
}
