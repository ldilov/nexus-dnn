import { useCallback, useEffect, useRef, useState } from "react";
import * as css from "./mic_recorder.css";

type RecorderState = "idle" | "preparing" | "recording" | "ready" | "denied" | "error";

interface MicRecorderProps {
  open: boolean;
  defaultName: string;
  onClose: () => void;
  onSubmit: (file: File, displayName: string) => Promise<void> | void;
}

function pickMimeType(): { mime: string; ext: string } {
  if (typeof MediaRecorder === "undefined") {
    return { mime: "audio/webm", ext: "webm" };
  }
  const candidates: Array<{ mime: string; ext: string }> = [
    { mime: "audio/webm;codecs=opus", ext: "webm" },
    { mime: "audio/webm", ext: "webm" },
    { mime: "audio/ogg;codecs=opus", ext: "ogg" },
    { mime: "audio/mp4", ext: "m4a" },
  ];
  for (const c of candidates) {
    if (MediaRecorder.isTypeSupported?.(c.mime)) return c;
  }
  return { mime: "", ext: "webm" };
}

function formatElapsed(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Microphone recording dialog. Acquires a `MediaStream` via
 * `getUserMedia({ audio: true })`, captures into a `MediaRecorder`, exposes a
 * preview `<audio>` once stopped, and resolves a `File` to the parent on
 * Save. Always tears down the underlying tracks on close — leaving the mic
 * "hot" is a privacy concern, not a UX one.
 */
export function MicRecorder({
  open,
  defaultName,
  onClose,
  onSubmit,
}: MicRecorderProps): JSX.Element | null {
  const [state, setState] = useState<RecorderState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState(defaultName);
  const [submitting, setSubmitting] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef<number>(0);
  const elapsedTimerRef = useRef<number | null>(null);
  const fileRef = useRef<File | null>(null);
  const mimeRef = useRef<{ mime: string; ext: string }>({ mime: "audio/webm", ext: "webm" });
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const recordButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // When the dialog opens: stash the previously-focused element, scroll the
  // dialog into view, and focus the primary action so keyboard users land on
  // it. On close, restore focus to wherever the trigger lived.
  useEffect(() => {
    if (!open) return undefined;
    previousFocusRef.current = (document.activeElement as HTMLElement) ?? null;
    requestAnimationFrame(() => {
      dialogRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      recordButtonRef.current?.focus();
    });
    return () => {
      previousFocusRef.current?.focus?.();
    };
  }, [open]);

  // Escape key closes the dialog when open.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const stopTracks = useCallback((): void => {
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) track.stop();
      streamRef.current = null;
    }
    if (elapsedTimerRef.current != null) {
      window.clearInterval(elapsedTimerRef.current);
      elapsedTimerRef.current = null;
    }
  }, []);

  const reset = useCallback((): void => {
    stopTracks();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    chunksRef.current = [];
    fileRef.current = null;
    setElapsedMs(0);
    setErrorMsg(null);
    setState("idle");
  }, [previewUrl, stopTracks]);

  useEffect(() => {
    if (!open) {
      reset();
      setName(defaultName);
    }
  }, [open, defaultName, reset]);

  useEffect(() => {
    return () => {
      stopTracks();
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl, stopTracks]);

  if (!open) return null;

  const handleStart = async (): Promise<void> => {
    setErrorMsg(null);
    setState("preparing");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const picked = pickMimeType();
      mimeRef.current = picked;
      const recorder = picked.mime
        ? new MediaRecorder(stream, { mimeType: picked.mime })
        : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const mime = picked.mime || "audio/webm";
        const blob = new Blob(chunksRef.current, { type: mime });
        const file = new File([blob], `${name || defaultName || "recording"}.${picked.ext}`, {
          type: mime,
        });
        fileRef.current = file;
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        setState("ready");
        stopTracks();
      };
      recorder.start();
      startedAtRef.current = Date.now();
      setElapsedMs(0);
      elapsedTimerRef.current = window.setInterval(() => {
        setElapsedMs(Date.now() - startedAtRef.current);
      }, 200);
      setState("recording");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "could not access microphone";
      setErrorMsg(message);
      setState(message.toLowerCase().includes("denied") ? "denied" : "error");
      stopTracks();
    }
  };

  const handleStop = (): void => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
    if (elapsedTimerRef.current != null) {
      window.clearInterval(elapsedTimerRef.current);
      elapsedTimerRef.current = null;
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const file = fileRef.current;
    if (!file) return;
    const trimmed = (name || defaultName).trim();
    if (!trimmed) {
      setErrorMsg("Name cannot be empty");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(file, trimmed);
      onClose();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  const orbLabel =
    state === "recording" ? "REC" : state === "ready" ? "OK" : state === "preparing" ? "..." : "MIC";

  return (
    <div className={css.backdrop} role="presentation" onClick={onClose}>
      <div
        ref={dialogRef}
        className={css.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mic-recorder-heading"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <h2 id="mic-recorder-heading" className={css.heading}>
          Record reference audio
        </h2>
        <p className={css.lede}>
          Speak the reference line into your microphone. 4–30 seconds is recommended for clean
          conditioning.
        </p>

        <span
          className={css.recordOrb}
          data-state={state === "recording" ? "recording" : state === "ready" ? "ready" : "idle"}
          aria-hidden="true"
        >
          {orbLabel}
        </span>

        <div className={css.elapsed} aria-live="polite">
          {formatElapsed(elapsedMs)}
        </div>

        <div className={css.transport}>
          {(state === "idle" || state === "denied" || state === "error") && (
            <button
              ref={recordButtonRef}
              type="button"
              className={css.btn}
              data-tone="danger"
              onClick={() => {
                void handleStart();
              }}
            >
              <span className={css.redDot} aria-hidden="true" />
              Record
            </button>
          )}
          {state === "preparing" && (
            <button type="button" className={css.btn} disabled>
              Starting…
            </button>
          )}
          {state === "recording" && (
            <button
              type="button"
              className={css.btn}
              data-tone="danger"
              data-active="true"
              onClick={handleStop}
            >
              <span className={css.redDot} aria-hidden="true" />
              Stop
            </button>
          )}
          {state === "ready" && (
            <button
              type="button"
              className={css.btn}
              onClick={() => {
                reset();
              }}
            >
              ↺ Re-record
            </button>
          )}
        </div>

        {previewUrl && (
          <audio className={css.audioPreview} src={previewUrl} controls preload="auto" />
        )}

        <label className={css.label}>
          <span>Voice name</span>
          <input
            className={css.labelInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={defaultName}
          />
        </label>

        {errorMsg && <div className={css.error}>{errorMsg}</div>}

        <div className={css.footer}>
          <button type="button" className={css.btn} onClick={onClose} disabled={submitting}>
            Cancel
          </button>
          <button
            type="button"
            className={css.btn}
            data-tone="accent"
            onClick={() => {
              void handleSubmit();
            }}
            disabled={state !== "ready" || submitting}
          >
            {submitting ? "Saving…" : "Save voice"}
          </button>
        </div>
      </div>
    </div>
  );
}
