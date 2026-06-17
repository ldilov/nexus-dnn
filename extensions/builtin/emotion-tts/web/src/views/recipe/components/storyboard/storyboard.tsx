import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import type { VoiceAsset } from "../../../../services/voice_assets_client";
import type { VectorPreset } from "../../../../services/presets_client";
import type { CharacterMapping } from "../../../../services/mappings_client";
import type { PrebuiltSegment } from "../../../../services/types";
import {
  buildEmotions,
  buildVoices,
  countWords,
  emotionLabel,
  FALLBACK_VOICE,
  flatSegments,
  jobOfSegment,
  jobsInScriptOrder,
  presetVectorForEmotionId,
  rangeIsFree,
  rangeText,
  runProgressToJobStatus,
  segmentLabels,
  segmentScript,
  segsInRange,
  segText,
  statusSummary,
  STATUS_META,
  voiceById,
  type EmotionOption,
  type Job,
  type JobStatus,
  type RunProgress,
  type Voice,
} from "./storyboard_data";
import type { StoryboardJob } from "../run_panel_items";
import { subscribeRunCompleted } from "../../lib/run_events";
import { EXTENSION_PREFIX } from "../../../../services/http";
import * as css from "./storyboard.css";

/** URL for a rendered utterance's audio, mirroring the recent-generations card.
 * Returns null when we lack the deployment or the utterance handle, so the
 * carousel can gate the Preview control instead of pointing at a dead URL. */
function artifactAudioUrl(
  deploymentId: string | undefined,
  utteranceId: string | undefined,
): string | null {
  if (!deploymentId || !utteranceId) return null;
  return `${EXTENSION_PREFIX}/deployments/${deploymentId}/artifacts/${utteranceId}/download`;
}

interface StoryboardProps {
  voiceAssets: readonly VoiceAsset[];
  presets: readonly VectorPreset[];
  storyText: string;
  onStoryTextChange: (next: string) => void;
  // Deployment character mappings for the cast popover's "Characters" tab.
  mappings?: ReadonlyMap<string, CharacterMapping>;
  onQueueChange?: ((segments: PrebuiltSegment[]) => void) | undefined;
  // Emits the same queue as stably-identified, labelled jobs so the run panel
  // can fan them out across workers and stream per-item progress back.
  onJobsChange?: ((jobs: StoryboardJob[]) => void) | undefined;
  // Live per-job progress (keyed by job id) streamed back from the run panel;
  // drives the carousel card status without a refetch.
  jobProgress?: ReadonlyMap<string, RunProgress> | undefined;
  // Deployment id used to build artifact URLs for previewing rendered segments.
  // Optional so the storyboard renders standalone (e.g. in tests) — Preview is
  // gated off when absent.
  deploymentId?: string | undefined;
}

type CastMode = "voice" | "character";

interface PopPos {
  top: number;
  left: number;
}

export function Storyboard({
  voiceAssets,
  presets,
  storyText,
  onStoryTextChange,
  mappings,
  onQueueChange,
  onJobsChange,
  jobProgress,
  deploymentId,
}: StoryboardProps): JSX.Element {
  const voices = useMemo(() => buildVoices(voiceAssets), [voiceAssets]);
  const emotions = useMemo(() => buildEmotions(presets), [presets]);

  const sourceText = storyText;
  const paragraphs = useMemo(() => segmentScript(sourceText), [sourceText]);

  const firstVoice = voices[0]?.id ?? "";
  const firstEmotion = emotions[0]?.id ?? "";

  const [castMode, setCastMode] = useState<CastMode>("voice");
  const [castQuery, setCastQuery] = useState<string>("");
  const characterRows = useMemo(
    () => buildCharacterRows(mappings, voices),
    [mappings, voices],
  );

  const [jobs, setJobs] = useState<Job[]>([]);
  const [selection, setSelection] = useState<string[]>([]);
  const [selAnchor, setSelAnchor] = useState<string | null>(null);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [draftVoice, setDraftVoice] = useState<string>(firstVoice);
  const [draftEmotion, setDraftEmotion] = useState<string>(firstEmotion);
  const [popoverPos, setPopoverPos] = useState<PopPos | null>(null);
  const [hoveredJobId, setHoveredJobId] = useState<string | null>(null);
  const [focusedJobId, setFocusedJobId] = useState<string | null>(null);
  const [playingJobId, setPlayingJobId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<boolean>(false);

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const carRef = useRef<HTMLDivElement | null>(null);
  const segRefs = useRef<Map<string, HTMLElement>>(new Map());
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const jobSeq = useRef(1000);
  const nextJobId = useCallback((): string => {
    jobSeq.current += 1;
    return `job-${jobSeq.current}`;
  }, []);

  // Precomputed once per text change so per-segment render and the assignment
  // handlers never walk the whole script (AC-7.1).
  const orderMap = useMemo(() => {
    const m = new Map<string, number>();
    flatSegments(paragraphs).forEach((s, i) => m.set(s.id, i));
    return m;
  }, [paragraphs]);
  const orderOf = useCallback((id: string) => orderMap.get(id) ?? Number.MAX_SAFE_INTEGER, [orderMap]);

  // Drop jobs whose segments no longer exist when the script text changes
  // (keeps text ↔ panel in sync — AC-9.3).
  useEffect(() => {
    const live = new Set(flatSegments(paragraphs).map((s) => s.id));
    setJobs((prev) => {
      const kept = prev.filter((j) => j.segIds.every((id) => live.has(id)));
      return kept.length === prev.length ? prev : kept;
    });
  }, [paragraphs]);

  // Retire the cast queue once a generation run finishes successfully — the
  // produced segments live in the Artifacts tab now, so the storyboard starts
  // fresh instead of re-queueing the same phrases on the next Generate.
  useEffect(() => subscribeRunCompleted(() => setJobs([])), []);

  // Voices load async (after mount), so the draft voice can be seeded as "".
  // Re-point it at a real voice once they arrive — otherwise a cast made
  // before the voice list resolves stores an empty voiceId and the card
  // false-flags "voice removed". When there's exactly one voice, also heal any
  // already-cast jobs that point at a missing/empty voice (unambiguous).
  useEffect(() => {
    if (voices.length === 0) return;
    setDraftVoice((cur) => (voices.some((v) => v.id === cur) ? cur : (voices[0] as Voice).id));
    if (voices.length === 1) {
      const only = (voices[0] as Voice).id;
      setJobs((prev) => {
        let changed = false;
        const next = prev.map((j) => {
          if (voices.some((v) => v.id === j.voiceId)) return j;
          changed = true;
          return { ...j, voiceId: only };
        });
        return changed ? next : prev;
      });
    }
  }, [voices]);

  const voiceIds = useMemo(() => new Set(voices.map((v) => v.id)), [voices]);
  const isVoiceMissing = useCallback(
    (job: Job): boolean => !voiceIds.has(job.voiceId),
    [voiceIds],
  );

  const measurePos = useCallback((el: HTMLElement | null | undefined): PopPos => {
    const c = canvasRef.current;
    if (!c || !el) return { top: 60, left: 0 };
    const sr = el.getBoundingClientRect();
    const cr = c.getBoundingClientRect();
    let left = sr.left - cr.left + c.scrollLeft;
    const top = sr.bottom - cr.top + c.scrollTop + 10;
    const maxLeft = Math.max(0, c.clientWidth - 318);
    left = Math.max(0, Math.min(left, maxLeft));
    return { top, left };
  }, []);

  const closePopover = useCallback(() => {
    setSelection([]);
    setSelAnchor(null);
    setEditingJobId(null);
    setPopoverPos(null);
  }, []);

  const openJobEditor = useCallback(
    (job: Job, anchorEl?: HTMLElement | null) => {
      const first = [...job.segIds].sort((a, b) => orderOf(a) - orderOf(b))[0];
      if (!first) return;
      const el = anchorEl ?? segRefs.current.get(first) ?? null;
      setEditingJobId(job.id);
      setSelection([...job.segIds]);
      setSelAnchor(first);
      setDraftVoice(job.voiceId);
      setDraftEmotion(job.emotion);
      setPopoverPos(measurePos(el));
      setFocusedJobId(job.id);
    },
    [orderOf, measurePos],
  );

  const handleSegInteract = useCallback(
    (segId: string, el: HTMLElement, shiftKey: boolean) => {
      const job = jobOfSegment(jobs, segId);
      if (job) {
        openJobEditor(job, el);
        return;
      }
      const pos = measurePos(el);
      if (shiftKey && selAnchor != null && editingJobId == null) {
        const a = orderOf(selAnchor);
        const b = orderOf(segId);
        const range = segsInRange(paragraphs, Math.min(a, b), Math.max(a, b));
        if (rangeIsFree(jobs, range)) {
          setSelection(range);
          setEditingJobId(null);
          setPopoverPos(pos);
          return;
        }
      }
      setSelection([segId]);
      setSelAnchor(segId);
      setEditingJobId(null);
      setPopoverPos(pos);
    },
    [jobs, paragraphs, selAnchor, editingJobId, measurePos, openJobEditor, orderOf],
  );

  const onAssign = useCallback(() => {
    if (editingJobId) {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === editingJobId ? { ...j, voiceId: draftVoice, emotion: draftEmotion, status: "queued" } : j,
        ),
      );
      setFocusedJobId(editingJobId);
      setSelection([]);
      setSelAnchor(null);
      setEditingJobId(null);
      setPopoverPos(null);
      return;
    }
    if (selection.length === 0) return;
    if (rangeText(paragraphs, selection).trim() === "") return;
    if (!rangeIsFree(jobs, selection)) return;
    const id = nextJobId();
    const job: Job = { id, segIds: [...selection], voiceId: draftVoice, emotion: draftEmotion, status: "queued" };
    setJobs((prev) => [...prev, job]);
    setFocusedJobId(id);
    setSelection([]);
    setSelAnchor(null);
    setPopoverPos(null);
  }, [editingJobId, selection, jobs, paragraphs, draftVoice, draftEmotion, nextJobId]);

  const removeJob = useCallback((id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setFocusedJobId((cur) => (cur === id ? null : cur));
    setPlayingJobId((cur) => (cur === id ? null : cur));
    setSelection([]);
    setSelAnchor(null);
    setEditingJobId(null);
    setPopoverPos(null);
  }, []);

  const playJob = useCallback((id: string) => {
    setPlayingJobId((cur) => (cur === id ? null : id));
  }, []);

  const scrollCar = useCallback((dir: number) => {
    carRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  }, []);

  // Roving arrow nav across emotion pills (AC-2.5).
  const cycleEmotion = useCallback(
    (dir: number) => {
      if (emotions.length === 0) return; // empty deployment — nothing to cycle (modulo-by-zero)
      const idx = emotions.findIndex((e) => e.id === draftEmotion);
      const next = emotions[(idx + dir + emotions.length) % emotions.length] as EmotionOption;
      setDraftEmotion(next.id);
      popoverRef.current?.querySelector<HTMLButtonElement>(`[data-emotion="${next.id}"]`)?.focus();
    },
    [emotions, draftEmotion],
  );

  // Re-key on the casting target so the active voice tile is focused each time
  // the overlay opens OR repositions to a different segment/job (AC-2.5).
  const popoverTargetKey = popoverPos ? (editingJobId ?? selection[0] ?? "new") : null;
  useEffect(() => {
    if (popoverTargetKey == null) return;
    const t = requestAnimationFrame(() => {
      popoverRef.current?.querySelector<HTMLButtonElement>(`[data-voice="${draftVoice}"]`)?.focus();
    });
    return () => cancelAnimationFrame(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popoverTargetKey]);

  const onPopoverKey = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closePopover();
      }
    },
    [closePopover],
  );

  const jobBySeg = useMemo(() => {
    const m = new Map<string, Job>();
    for (const j of jobs) for (const id of j.segIds) m.set(id, j);
    return m;
  }, [jobs]);

  const sortedJobs = useMemo(() => jobsInScriptOrder(paragraphs, jobs), [paragraphs, jobs]);
  const labels = useMemo(() => segmentLabels(paragraphs, jobs), [paragraphs, jobs]);
  // The runnable queue, in script order, carried as stably-identified jobs so
  // the run panel can fan them out and stream per-item progress back. A job is
  // runnable only when its voice still exists and its range has text.
  const queueJobs = useMemo<StoryboardJob[]>(
    () =>
      sortedJobs
        .filter((j) => voices.some((v) => v.id === j.voiceId))
        .filter((j) => rangeText(paragraphs, j.segIds).trim() !== "")
        .map((j) => {
          const vec = presetVectorForEmotionId(presets, j.emotion);
          return {
            jobId: j.id,
            label: labels[j.id] ?? j.id,
            segment: {
              text: rangeText(paragraphs, j.segIds),
              voice_asset_id: j.voiceId,
              speaker_label: (voiceById(voices, j.voiceId) ?? FALLBACK_VOICE).name,
              emotion: vec ? { mode: "emotion_vector", vector: vec } : null,
            },
          };
        }),
    [sortedJobs, paragraphs, voices, presets, labels],
  );
  const queueSegments = useMemo<PrebuiltSegment[]>(
    () => queueJobs.map((j) => j.segment),
    [queueJobs],
  );
  const lastQueueJsonRef = useRef<string | null>(null);
  useEffect(() => {
    const json = JSON.stringify(queueSegments);
    if (json === lastQueueJsonRef.current) return;
    lastQueueJsonRef.current = json;
    onQueueChange?.(queueSegments);
  }, [queueSegments, onQueueChange]);
  const lastJobsJsonRef = useRef<string | null>(null);
  useEffect(() => {
    const json = JSON.stringify(queueJobs);
    if (json === lastJobsJsonRef.current) return;
    lastJobsJsonRef.current = json;
    onJobsChange?.(queueJobs);
  }, [queueJobs, onJobsChange]);
  const firstSegByJob = useMemo(() => {
    const m = new Map<string, string>();
    for (const j of jobs) {
      const first = [...j.segIds].sort((a, b) => orderOf(a) - orderOf(b))[0];
      if (first) m.set(j.id, first);
    }
    return m;
  }, [jobs, orderOf]);
  const assignedCount = useMemo(() => {
    const s = new Set<string>();
    for (const j of jobs) for (const id of j.segIds) s.add(id);
    return s.size;
  }, [jobs]);
  const words = useMemo(() => countWords(paragraphs), [paragraphs]);
  const summary = statusSummary(jobs);

  const draft: Voice = voiceById(voices, draftVoice) ?? FALLBACK_VOICE;

  const [castChar, setCastChar] = useState<string | null>(null);
  const castFilter = castQuery.trim().toLowerCase();
  const castVoiceList = useMemo(
    () =>
      voices.filter(
        (v) =>
          !castFilter ||
          v.name.toLowerCase().includes(castFilter) ||
          v.role.toLowerCase().includes(castFilter),
      ),
    [voices, castFilter],
  );
  const castCharList = useMemo(
    () =>
      characterRows.filter(
        (c) =>
          !castFilter ||
          c.name.toLowerCase().includes(castFilter) ||
          (c.voice?.name.toLowerCase().includes(castFilter) ?? false),
      ),
    [characterRows, castFilter],
  );
  const castListCount =
    castMode === "character"
      ? `${castCharList.length} character${castCharList.length === 1 ? "" : "s"}`
      : `${castVoiceList.length} voice${castVoiceList.length === 1 ? "" : "s"}`;

  const stop = (e: ReactMouseEvent) => e.stopPropagation();

  return (
    <div className={css.root}>
      <div style={HEADER_ROW}>
        <span className={css.counters}>
          <span><strong>{assignedCount}</strong> cast</span>
          <span><strong>{words}</strong> words</span>
        </span>
        <button
          type="button"
          className={css.editBtn}
          aria-pressed={editingText}
          onClick={() => setEditingText((v) => !v)}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }} aria-hidden="true">
            {editingText ? "check" : "edit"}
          </span>
          {editingText ? "Done" : "Edit text"}
        </button>
      </div>

      {editingText ? (
        <textarea
          value={storyText}
          onChange={(e) => onStoryTextChange(e.target.value)}
          placeholder="Paste or write your script, then switch back to cast each phrase."
          aria-label="Storyboard script text"
          style={TEXTAREA_STYLE}
        />
      ) : (
        <div
          ref={canvasRef}
          className={css.canvas}
          role="group"
          aria-label="Story script — select a phrase to cast a voice"
          onMouseDown={(e) => {
            if (e.shiftKey) e.preventDefault();
          }}
          onClick={() => {
            if (popoverPos) closePopover();
          }}
        >
          {paragraphs.map((p) => (
            <p key={p.id} className={css.paragraph}>
              {p.segs.map((seg, si) => {
                const job = jobBySeg.get(seg.id);
                const selected = selection.includes(seg.id);
                const hovered = !!job && (hoveredJobId === job.id || focusedJobId === job.id);
                const showMarker = !!job && firstSegByJob.get(job.id) === seg.id;
                const v = job ? voiceById(voices, job.voiceId) : null;
                // Highlight runs continuously: a contiguous span of words sharing
                // one job (or one selection) is rounded only at its ends so it
                // reads as one phrase, not per-word pills.
                const groupKey = groupKeyOf(seg.id, jobBySeg, selection);
                const prevKey = groupKeyOf(p.segs[si - 1]?.id, jobBySeg, selection);
                const nextKey = groupKeyOf(p.segs[si + 1]?.id, jobBySeg, selection);
                const runStart = groupKey != null && prevKey !== groupKey;
                const runEnd = groupKey != null && nextKey !== groupKey;
                return (
                  <span key={seg.id}>
                    {showMarker && v && (
                      <span className={css.marker} style={markerStyle(v)} aria-hidden="true">
                        {v.initial}
                      </span>
                    )}
                    <span
                      ref={(el) => {
                        if (el) segRefs.current.set(seg.id, el);
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={selected || !!job}
                      aria-label={job ? `${v?.name ?? "voice"} · ${seg.text.trim()}` : seg.text.trim()}
                      className={css.seg}
                      style={segStyle(selected, v, hovered, seg.kind, runStart, runEnd)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSegInteract(seg.id, e.currentTarget, e.shiftKey);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSegInteract(seg.id, e.currentTarget, e.shiftKey);
                        }
                      }}
                      onMouseEnter={job ? () => setHoveredJobId(job.id) : undefined}
                      onMouseLeave={job ? () => setHoveredJobId(null) : undefined}
                    >
                      {seg.text}
                    </span>
                  </span>
                );
              })}
            </p>
          ))}

          {popoverPos && (
            <div
              ref={popoverRef}
              className={css.popover}
              role="dialog"
              aria-label={editingJobId ? "Edit casting" : "Cast voice"}
              style={{ top: popoverPos.top, left: popoverPos.left }}
              onClick={stop}
              onMouseDown={stop}
              onKeyDown={onPopoverKey}
            >
              <div className={css.popHead}>
                <span className={css.popTitle}>{editingJobId ? "Edit casting" : "Cast voice"}</span>
                <button
                  type="button"
                  className={css.iconBtn}
                  style={{ width: 24, height: 24 }}
                  aria-label="Cancel"
                  onClick={closePopover}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 17 }} aria-hidden="true">close</span>
                </button>
              </div>

              <div className={css.castModeRow}>
                <div className={css.castModeBar} role="radiogroup" aria-label="Cast source">
                  <button type="button" role="radio" aria-checked={castMode === "voice"}
                    className={castMode === "voice" ? css.castModeBtnActive : css.castModeBtn}
                    onClick={() => { setCastMode("voice"); setCastQuery(""); }}>Voices</button>
                  <button type="button" role="radio" aria-checked={castMode === "character"}
                    className={castMode === "character" ? css.castModeBtnActive : css.castModeBtn}
                    onClick={() => { setCastMode("character"); setCastQuery(""); }}>Characters</button>
                </div>
                <span className={css.castCount}>{castListCount}</span>
              </div>

              <div className={css.castSearchWrap}>
                <span className="material-symbols-outlined" aria-hidden="true" style={CAST_SEARCH_ICON}>search</span>
                <input
                  className={css.castSearch}
                  value={castQuery}
                  onChange={(e) => setCastQuery(e.target.value)}
                  placeholder={castMode === "character" ? "Search characters…" : "Search voices…"}
                  aria-label={castMode === "character" ? "Search characters" : "Search voices"}
                />
              </div>

              <div className={css.castList} role="radiogroup" aria-label={castMode === "character" ? "Character" : "Voice"}>
                {castMode === "voice" && castVoiceList.map((v) => {
                  const active = castChar == null && draftVoice === v.id;
                  return (
                    <button key={v.id} type="button" role="radio" aria-checked={active}
                      className={css.castRow} style={castRowStyle(v, active)}
                      onClick={() => { setDraftVoice(v.id); setCastChar(null); }}>
                      <span style={castMonoStyle(v)}>{v.initial}</span>
                      <span className={css.castRowText}>
                        <span style={castNameStyle(active)}>{v.name}</span>
                        <span style={CAST_ROLE_STYLE}>{v.role}</span>
                      </span>
                      {active && <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 18, color: v.color, flexShrink: 0 }}>check</span>}
                    </button>
                  );
                })}
                {castMode === "character" && castCharList.map((c) => {
                  const cv = c.voice ?? FALLBACK_VOICE;
                  const active = castChar === c.id;
                  return (
                    <button key={c.id} type="button" role="radio" aria-checked={active}
                      className={css.castRow} style={castRowStyle(cv, active)}
                      onClick={() => { setDraftVoice(c.voiceId); setCastChar(c.id); }}>
                      <span style={castMonoStyle(cv)}>{cv.initial}</span>
                      <span className={css.castRowText}>
                        <span style={castNameStyle(active)}>{c.name}</span>
                        <span style={CAST_SUB_STYLE}>{cv.name}</span>
                      </span>
                      {active && <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 18, color: cv.color, flexShrink: 0 }}>check</span>}
                    </button>
                  );
                })}
                {((castMode === "voice" && castVoiceList.length === 0) ||
                  (castMode === "character" && castCharList.length === 0)) && (
                  <div className={css.castEmpty}>
                    {castMode === "character"
                      ? (characterRows.length === 0 ? "No characters mapped yet." : `No matches for “${castQuery}”`)
                      : (voices.length === 0 ? "No voices yet — add voice assets." : `No matches for “${castQuery}”`)}
                  </div>
                )}
              </div>

              <div className={css.divider} />

              <div className={css.emotionGroup}>
                <span className={css.caption} style={{ fontSize: 9.5, marginBottom: 0 }}>Emotion</span>
                <div
                  className={css.emotionRow}
                  role="radiogroup"
                  aria-label="Emotion"
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); cycleEmotion(1); }
                    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); cycleEmotion(-1); }
                  }}
                >
                  {emotions.map((em) => {
                    const active = draftEmotion === em.id;
                    return (
                      <button
                        key={em.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        data-emotion={em.id}
                        tabIndex={active ? 0 : -1}
                        className={css.emoBtn}
                        style={emoBtnStyle(draft, active)}
                        onClick={() => setDraftEmotion(em.id)}
                      >
                        {em.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={css.popPreview}>
                <span className={css.popPreviewText}>{rangeText(paragraphs, selection)}</span>
              </div>

              <div className={css.popActions}>
                {editingJobId && (
                  <button
                    type="button"
                    className={css.removeBtn}
                    aria-label="Remove casting"
                    onClick={() => editingJobId && removeJob(editingJobId)}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }} aria-hidden="true">delete</span>
                  </button>
                )}
                <button
                  type="button"
                  style={assignBtnStyle(draft)}
                  onClick={onAssign}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 17 }} aria-hidden="true">check</span>
                  {editingJobId ? "Update" : "Cast"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className={css.carouselSection}>
        <div className={css.carouselHead}>
          <div className={css.carouselTitleRow}>
            <span className={css.caption} style={{ marginBottom: 0 }}>Assigned segments</span>
            <span className={css.countPill}>{jobs.length}</span>
            {summary && <span className={css.summary}>{summary}</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button type="button" className={css.navBtn} aria-label="Scroll segments left" onClick={() => scrollCar(-1)} disabled={jobs.length === 0}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }} aria-hidden="true">chevron_left</span>
            </button>
            <button type="button" className={css.navBtn} aria-label="Scroll segments right" onClick={() => scrollCar(1)} disabled={jobs.length === 0}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }} aria-hidden="true">chevron_right</span>
            </button>
          </div>
        </div>

        <div ref={carRef} className={css.carousel}>
          {sortedJobs.map((j) => {
            const v = voiceById(voices, j.voiceId) ?? FALLBACK_VOICE;
            const voiceMissing = isVoiceMissing(j);
            // Live run progress (if any) drives the VISUAL status so cards flip
            // queued → rendering → ready/failed without a refetch; the cast
            // editor's own summary keeps using j.status.
            const live = jobProgress?.get(j.id);
            const visualStatus: JobStatus = live ? runProgressToJobStatus(live) : j.status;
            const meta = STATUS_META[visualStatus];
            const active = focusedJobId === j.id || hoveredJobId === j.id;
            const playing = playingJobId === j.id;
            const text = rangeText(paragraphs, j.segIds);
            // Preview is available only once the segment is rendered AND we have
            // a real artifact handle to play (segment_completed carries the
            // utterance id). Otherwise the control is disabled so it never
            // appears clickable with nothing to play.
            const previewUrl =
              visualStatus === "ready"
                ? artifactAudioUrl(deploymentId, live?.utteranceId)
                : null;
            const canPreview = previewUrl != null;
            return (
              <div
                key={j.id}
                role="button"
                tabIndex={0}
                aria-label={`${v.name} ${labels[j.id]} — ${emotionLabel(emotions, j.emotion)} — ${voiceMissing ? "voice removed — recast" : meta.label}`}
                className={css.card}
                data-broken={voiceMissing ? "true" : "false"}
                style={voiceMissing ? brokenCardStyle(active) : cardStyle(v, active)}
                onClick={() => openJobEditor(j)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openJobEditor(j); }
                }}
                onMouseEnter={() => setHoveredJobId(j.id)}
                onMouseLeave={() => setHoveredJobId(null)}
                onFocus={() => setFocusedJobId(j.id)}
              >
                <div className={css.cardTop}>
                  <div className={css.cardVoice}>
                    <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 17, color: v.color }}>{v.icon}</span>
                    <span className={css.cardVoiceName}>{v.name}</span>
                  </div>
                  <span className={css.cardSegLabel}>{labels[j.id]}</span>
                </div>
                <span className={css.cardText}>{text}</span>
                <div className={css.cardMeta}>
                  <span style={emotionChipStyle(v)}>{emotionLabel(emotions, j.emotion)}</span>
                  <span className={css.statusWrap}>
                    <span style={statusDotStyle(meta)} />
                    <span style={statusLabelStyle(meta, visualStatus)}>{meta.label}</span>
                  </span>
                </div>
                {voiceMissing && (
                  <span style={BROKEN_HINT} role="status">
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }} aria-hidden="true">
                      error
                    </span>
                    voice removed — recast
                  </span>
                )}
                <div className={css.cardFoot}>
                  <button
                    type="button"
                    className={css.playBtn}
                    aria-label={playing ? "Pause preview" : "Preview audio"}
                    disabled={!canPreview && !playing}
                    onClick={(e) => { e.stopPropagation(); if (canPreview || playing) playJob(j.id); }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }} aria-hidden="true">{playing ? "pause_circle" : "play_circle"}</span>
                    {playing ? "Playing" : "Preview"}
                  </button>
                  <button
                    type="button"
                    className={css.cardRemove}
                    aria-label={`Remove ${labels[j.id]}`}
                    onClick={(e) => { e.stopPropagation(); removeJob(j.id); }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }} aria-hidden="true">close</span>
                  </button>
                </div>
                {playing && previewUrl && (
                  <>
                    <audio
                      src={previewUrl}
                      controls
                      autoPlay
                      preload="auto"
                      style={AUDIO_STYLE}
                      onEnded={() => setPlayingJobId((cur) => (cur === j.id ? null : cur))}
                    >
                      <track kind="captions" />
                    </audio>
                    <div className={css.scanRail}>
                      <div style={scanStyle(v)} />
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {jobs.length === 0 && (
            <div className={css.empty}>
              <span className={css.emptyZero}>0</span>
              <span className={css.emptyCopy}>No segments cast yet. Select a phrase above to begin.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const HEADER_ROW: CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 };
const AUDIO_STYLE: CSSProperties = { width: "100%", height: 32, marginTop: 8, display: "block" };
const TEXTAREA_STYLE: CSSProperties = {
  width: "100%", minHeight: 220, padding: 14, background: "var(--surface-floor, #000)",
  border: "1px solid rgba(70,72,74,0.3)", borderRadius: 12, color: "var(--on-surface)",
  fontFamily: "var(--font-mono)", fontSize: 14, lineHeight: 1.7, resize: "vertical", outline: "none",
};

/** Identity of the contiguous-highlight run a segment belongs to: its job id,
 * the selection bucket, or null when the word is plain (unhighlighted). */
function groupKeyOf(
  segId: string | undefined,
  jobBySeg: ReadonlyMap<string, Job>,
  selection: readonly string[],
): string | null {
  if (segId == null) return null;
  const job = jobBySeg.get(segId);
  if (job) return `job:${job.id}`;
  return selection.includes(segId) ? "sel" : null;
}

function runRadius(runStart: boolean, runEnd: boolean): CSSProperties {
  return {
    borderTopLeftRadius: runStart ? 4 : 0,
    borderBottomLeftRadius: runStart ? 4 : 0,
    borderTopRightRadius: runEnd ? 4 : 0,
    borderBottomRightRadius: runEnd ? 4 : 0,
  };
}

function segStyle(
  selected: boolean,
  voice: Voice | null,
  hovered: boolean,
  kind: "narration" | "dialogue",
  runStart: boolean,
  runEnd: boolean,
): CSSProperties {
  // No horizontal padding so adjacent words in a run touch — the trailing
  // whitespace carried in each word's text bridges the fill into one phrase.
  const base: CSSProperties = { padding: "2px 0", cursor: "pointer", WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" };
  const aRGB = "186,158,255";
  if (selected) {
    return { ...base, ...runRadius(runStart, runEnd), background: `rgba(${aRGB},0.16)`, boxShadow: `inset 0 -2px 0 rgba(${aRGB},0.7)`, color: "var(--on-surface)" };
  }
  if (voice) {
    return { ...base, ...runRadius(runStart, runEnd), background: `rgba(${voice.rgb},${hovered ? 0.2 : 0.11})`, boxShadow: `inset 0 -2px 0 ${voice.color}`, color: "var(--on-surface)" };
  }
  return { ...base, color: kind === "dialogue" ? "var(--on-surface)" : "var(--on-surface-variant)" };
}

function markerStyle(v: Voice): CSSProperties {
  return { color: v.color, background: `rgba(${v.rgb},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${v.rgb},0.45)` };
}

interface CharacterRow {
  id: string;
  name: string;
  voiceId: string;
  voice: Voice | null;
}

function buildCharacterRows(
  mappings: ReadonlyMap<string, CharacterMapping> | undefined,
  voices: readonly Voice[],
): CharacterRow[] {
  if (!mappings) return [];
  return [...mappings.values()]
    .filter((m) => m.isActive)
    .map((m) => ({
      id: m.mappingId,
      name: m.characterName,
      voiceId: m.speakerVoiceAssetId,
      voice: voices.find((v) => v.id === m.speakerVoiceAssetId) ?? null,
    }));
}

function castRowStyle(v: Voice, active: boolean): CSSProperties {
  // Layout lives in the css.castRow class; only the active accent is inline so
  // the class :hover background still applies to inactive rows.
  if (!active) return {};
  return {
    border: `1px solid rgba(${v.rgb},0.5)`,
    background: `rgba(${v.rgb},0.12)`,
  };
}

function castMonoStyle(v: Voice): CSSProperties {
  return {
    width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center",
    justifyContent: "center", flexShrink: 0, fontFamily: "var(--font-mono)",
    fontSize: 12, fontWeight: 700, color: v.color, background: `rgba(${v.rgb},0.16)`,
    boxShadow: `inset 0 0 0 1px rgba(${v.rgb},0.4)`,
  };
}

function castNameStyle(active: boolean): CSSProperties {
  return {
    fontSize: 12, fontWeight: 600,
    color: active ? "var(--on-surface, #e3e3e3)" : "var(--on-surface-variant, #c4c7c5)",
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
  };
}

const CAST_SEARCH_ICON: CSSProperties = { position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "var(--on-surface-muted)", pointerEvents: "none" };
const CAST_ROLE_STYLE: CSSProperties = { fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--on-surface-muted)" };
const CAST_SUB_STYLE: CSSProperties = { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.02em", color: "var(--on-surface-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };

function emoBtnStyle(v: Voice, active: boolean): CSSProperties {
  return {
    border: `1px solid ${active ? `rgba(${v.rgb},0.45)` : "rgba(120,124,128,0.35)"}`,
    background: active ? `rgba(${v.rgb},0.14)` : "var(--surface-raised, rgba(255,255,255,0.05))",
    color: active ? v.color : "var(--on-surface-variant, #c4c7c5)",
  };
}

function assignBtnStyle(v: Voice): CSSProperties {
  return {
    flex: 1, height: 38, borderRadius: 9, border: "none", cursor: "pointer",
    fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, color: v.onColor, background: v.color,
    boxShadow: `0 0 18px rgba(${v.rgb},0.45)`, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
    transition: "filter .15s",
  };
}

function cardStyle(v: Voice, active: boolean): CSSProperties {
  return {
    background: active ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: active ? "translateY(-2px)" : "none",
    boxShadow: active
      ? `inset 3px 0 0 ${v.color}, 0 0 0 1px rgba(${v.rgb},0.4), 0 12px 28px rgba(0,0,0,0.5)`
      : `inset 3px 0 0 ${v.color}`,
  };
}

function brokenCardStyle(active: boolean): CSSProperties {
  const broken = "var(--error, #ff6e84)";
  return {
    background: active ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: active ? "translateY(-2px)" : "none",
    boxShadow: active
      ? `inset 3px 0 0 ${broken}, 0 0 0 1px rgba(255,110,132,0.45), 0 12px 28px rgba(0,0,0,0.5)`
      : `inset 3px 0 0 ${broken}, 0 0 0 1px rgba(255,110,132,0.32)`,
  };
}

const BROKEN_HINT: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  marginTop: 6,
  fontFamily: "var(--font-ui)",
  fontSize: 10.5,
  fontWeight: 500,
  color: "var(--error, #ff6e84)",
};

function emotionChipStyle(v: Voice): CSSProperties {
  return {
    fontFamily: "var(--font-mono)", fontSize: 9.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
    padding: "3px 8px", borderRadius: 6, color: v.color, background: `rgba(${v.rgb},0.12)`, border: `1px solid rgba(${v.rgb},0.22)`,
  };
}

function statusDotStyle(meta: { color: string; glow: string; pulse: boolean }): CSSProperties {
  return {
    width: 7, height: 7, borderRadius: "50%", background: meta.color, boxShadow: `0 0 8px ${meta.glow}`,
    animation: meta.pulse ? `${css.pulse} 1.5s ease-in-out infinite` : "none", flexShrink: 0,
  };
}

function statusLabelStyle(meta: { color: string }, status: JobStatus): CSSProperties {
  return { fontFamily: "var(--font-ui)", fontSize: 10.5, fontWeight: 500, color: status === "queued" ? "var(--on-surface-variant)" : meta.color };
}

function scanStyle(v: Voice): CSSProperties {
  return { position: "absolute", top: 0, bottom: 0, width: "30%", background: `linear-gradient(90deg, transparent, ${v.color}, transparent)`, animation: `${css.scan} 1.1s linear infinite` };
}
