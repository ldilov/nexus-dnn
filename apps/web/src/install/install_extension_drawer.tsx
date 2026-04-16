import { useCallback, useEffect, useRef, useState } from "react";
import {
  ContractError,
  installExtensionFromZip,
  type ZipInstallResult,
} from "../api/client";
import * as s from "./install_extension_drawer.css";

type UploadState =
  | { kind: "idle" }
  | { kind: "uploading"; file: File }
  | { kind: "success"; result: ZipInstallResult }
  | { kind: "error"; message: string; code: string | null };

interface InstallExtensionDrawerProps {
  open: boolean;
  onClose: () => void;
  onInstalled?: (result: ZipInstallResult) => void;
}

export function InstallExtensionDrawer({
  open,
  onClose,
  onInstalled,
}: InstallExtensionDrawerProps) {
  const [state, setState] = useState<UploadState>({ kind: "idle" });
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setState({ kind: "idle" });
    setDragOver(false);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.name.toLowerCase().endsWith(".zip")) {
        setState({
          kind: "error",
          message: `Expected a .zip file, received ${file.name}`,
          code: "install.not_a_zip",
        });
        return;
      }
      setState({ kind: "uploading", file });
      try {
        const result = await installExtensionFromZip(file);
        setState({ kind: "success", result });
        onInstalled?.(result);
      } catch (err: unknown) {
        if (err instanceof ContractError) {
          const code =
            err.payload &&
            typeof err.payload === "object" &&
            "code" in err.payload
              ? String((err.payload as { code: unknown }).code)
              : null;
          setState({ kind: "error", message: err.message, code });
        } else {
          const message =
            err instanceof Error ? err.message : "Unknown error";
          setState({ kind: "error", message, code: null });
        }
      }
    },
    [onInstalled],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) void handleFile(file);
    },
    [handleFile],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(false);
      const file = event.dataTransfer.files?.[0];
      if (file) void handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handlePick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handlePick();
      }
    },
    [handlePick],
  );

  if (!open) return null;

  return (
    <div
      className={s.scrim}
      onClick={handleClose}
      role="presentation"
    >
      <aside
        className={s.drawer}
        role="dialog"
        aria-labelledby="install-drawer-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <header className={s.header}>
          <h2 id="install-drawer-title" className={s.title}>
            Install extension from ZIP
          </h2>
          <button
            type="button"
            className={s.closeButton}
            onClick={handleClose}
            aria-label="Close installer"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </header>

        <div className={s.body}>
          {state.kind === "idle" && (
            <div
              className={s.dropZone}
              role="button"
              tabIndex={0}
              data-dragover={dragOver}
              onClick={handlePick}
              onKeyDown={handleKeyDown}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              aria-label="Drop a .zip extension or click to select a file"
            >
              <span
                className={`material-symbols-outlined ${s.dropIcon}`}
                aria-hidden="true"
              >
                upload_file
              </span>
              <span className={s.dropText}>Drop a .zip extension here</span>
              <span className={s.dropHint}>
                or click to browse — max 64 MiB
              </span>
            </div>
          )}

          {state.kind === "uploading" && (
            <div className={`${s.state} ${s.info}`} role="status">
              <p className={s.stateTitle}>Installing {state.file.name}…</p>
              <p className={s.stateMessage}>
                Validating archive, extracting manifest, and publishing…
              </p>
            </div>
          )}

          {state.kind === "success" && (
            <div className={`${s.state} ${s.success}`} role="status">
              <p className={s.stateTitle}>
                Installed {state.result.manifest_summary.name ?? state.result.extension_id}
              </p>
              <p className={s.stateMessage}>
                module_id = {state.result.module_id}
              </p>
              {state.result.install_diagnostics.length > 0 && (
                <ul className={s.stateMessage} style={{ margin: 0, paddingLeft: "1rem" }}>
                  {state.result.install_diagnostics.map((diag) => (
                    <li key={diag}>{diag}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {state.kind === "error" && (
            <div className={`${s.state} ${s.error}`} role="alert">
              <p className={s.stateTitle}>
                {state.code ? `Install failed (${state.code})` : "Install failed"}
              </p>
              <p className={s.stateMessage}>{state.message}</p>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            accept=".zip,application/zip"
            className={s.hiddenInput}
            onChange={handleChange}
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>

        <footer className={s.footer}>
          {(state.kind === "success" || state.kind === "error") && (
            <button
              type="button"
              className={s.secondaryBtn}
              onClick={reset}
            >
              Install another
            </button>
          )}
          <button
            type="button"
            className={s.primaryBtn}
            onClick={handleClose}
            disabled={state.kind === "uploading"}
          >
            {state.kind === "success" ? "Done" : "Close"}
          </button>
        </footer>
      </aside>
    </div>
  );
}
