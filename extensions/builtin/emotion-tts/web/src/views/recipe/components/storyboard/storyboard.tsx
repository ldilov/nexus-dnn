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
import {
  buildEmotions,
  buildVoices,
  countWords,
  emotionLabel,
  flatSegments,
  jobOfSegment,
  jobsInScriptOrder,
  rangeIsFree,
  rangeText,
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
  type Voice,
} from "./storyboard_data";
import * as css from "./storyboard.css";

interface StoryboardProps {
  voiceAssets: readonly VoiceAsset[];
  presets: readonly VectorPreset[];
  storyText: string;
  onStoryTextChange: (next: string) => void;
}

interface PopPos {
  top: number;
  left: number;
}

export function Storyboard({
  voiceAssets,
  presets,
  storyText,
  onStoryTextChange,
}: StoryboardProps): JSX.Element {
  const voices = useMemo(() => buildVoices(voiceAssets), [voiceAssets]);
  const emotions = useMemo(() => buildEmotions(presets), [presets]);

  const sourceText = storyText;
  const paragraphs = useMemo(() => segmentScript(sourceText), [sourceText]);

  const firstVoice = (voices[0] as Voice).id;
  const firstEmotion = (emotions[0] as EmotionOption).id;

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
      const first = [...job.segIds].sort((a, b) => orderOf(a) - orderOf(b))[0] as string;
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
    if (!rangeIsFree(jobs, selection)) return;
    const id = nextJobId();
    const job: Job = { id, segIds: [...selection], voiceId: draftVoice, emotion: draftEmotion, status: "queued" };
    setJobs((prev) => [...prev, job]);
    setFocusedJobId(id);
    setSelection([]);
    setSelAnchor(null);
    setPopoverPos(null);
  }, [editingJobId, selection, jobs, draftVoice, draftEmotion, nextJobId]);

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

  // Roving arrow nav across voice tiles / emotion pills (AC-2.5).
  const cycleVoice = useCallback(
    (dir: number) => {
      const idx = voices.findIndex((v) => v.id === draftVoice);
      const next = voices[(idx + dir + voices.length) % voices.length] as Voice;
      setDraftVoice(next.id);
      popoverRef.current?.querySelector<HTMLButtonElement>(`[data-voice="${next.id}"]`)?.focus();
    },
    [voices, draftVoice],
  );
  const cycleEmotion = useCallback(
    (dir: number) => {
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
  const firstSegByJob = useMemo(() => {
    const m = new Map<string, string>();
    for (const j of jobs) {
      const first = [...j.segIds].sort((a, b) => orderOf(a) - orderOf(b))[0];
      if (first) m.set(j.id, first);
    }
    return m;
  }, [jobs, orderOf]);
  const labels = useMemo(() => segmentLabels(paragraphs, jobs), [paragraphs, jobs]);
  const assignedCount = useMemo(() => {
    const s = new Set<string>();
    for (const j of jobs) for (const id of j.segIds) s.add(id);
    return s.size;
  }, [jobs]);
  const words = useMemo(() => countWords(paragraphs), [paragraphs]);
  const summary = statusSummary(jobs);

  const draft = voiceById(voices, draftVoice);

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
              {p.segs.map((seg) => {
                const job = jobBySeg.get(seg.id);
                const selected = selection.includes(seg.id);
                const hovered = !!job && (hoveredJobId === job.id || focusedJobId === job.id);
                const showMarker = !!job && firstSegByJob.get(job.id) === seg.id;
                const v = job ? voiceById(voices, job.voiceId) : null;
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
                      aria-label={job ? `${voiceById(voices, job.voiceId).name} · ${seg.text.trim()}` : seg.text.trim()}
                      className={css.seg}
                      style={segStyle(selected, v, hovered, seg.kind)}
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

              <div
                className={css.voiceRow}
                role="radiogroup"
                aria-label="Voice"
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); cycleVoice(1); }
                  else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); cycleVoice(-1); }
                }}
              >
                {voices.map((v) => {
                  const active = draftVoice === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      data-voice={v.id}
                      tabIndex={active ? 0 : -1}
                      className={css.voiceTile}
                      style={voiceTileStyle(v, active)}
                      onClick={() => setDraftVoice(v.id)}
                    >
                      <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 19, color: active ? v.color : "var(--on-surface-variant, #c4c7c5)" }}>{v.icon}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: active ? "var(--on-surface, #e3e3e3)" : "var(--on-surface-variant, #c4c7c5)" }}>{v.name}</span>
                      <span style={TILE_ROLE}>{v.role}</span>
                    </button>
                  );
                })}
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
            <span aria-live="polite" style={LIVE_CHIP}>
              <span style={LIVE_DOT} />
              Live
            </span>
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
            const v = voiceById(voices, j.voiceId);
            const meta = STATUS_META[j.status];
            const active = focusedJobId === j.id || hoveredJobId === j.id;
            const playing = playingJobId === j.id;
            const text = rangeText(paragraphs, j.segIds);
            return (
              <div
                key={j.id}
                role="button"
                tabIndex={0}
                aria-label={`${v.name} ${labels[j.id]} — ${emotionLabel(emotions, j.emotion)} — ${meta.label}`}
                className={css.card}
                style={cardStyle(v, active)}
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
                    <span style={statusLabelStyle(meta, j.status)}>{meta.label}</span>
                  </span>
                </div>
                <div className={css.cardFoot}>
                  <button
                    type="button"
                    className={css.playBtn}
                    aria-label={playing ? "Pause preview" : "Preview audio"}
                    onClick={(e) => { e.stopPropagation(); playJob(j.id); }}
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
                {playing && (
                  <div className={css.scanRail}>
                    <div style={scanStyle(v)} />
                  </div>
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

      <div className={css.footer}>
        <div className={css.libRow}>
          <span className={css.caption} style={{ fontSize: 9.5, marginBottom: 0 }}>Voices</span>
          <div className={css.libChips}>
            {voices.map((v) => {
              const used = jobs.some((j) => j.voiceId === v.id);
              return (
                <span key={v.id} className={css.libChip} style={{ border: `1px solid ${used ? `rgba(${v.rgb},0.35)` : "rgba(70,72,74,0.3)"}` }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: v.color, boxShadow: used ? `0 0 8px rgba(${v.rgb},0.7)` : "none", flexShrink: 0 }} />
                  <span className={css.libName} style={{ color: used ? "var(--on-surface)" : "var(--on-surface-variant)" }}>{v.lib}</span>
                </span>
              );
            })}
          </div>
        </div>
        <span className={css.footerHint}>Cast every phrase, then <strong>Generate</strong> from the top bar.</span>
      </div>
    </div>
  );
}

const HEADER_ROW: CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 };
const TILE_ROLE: CSSProperties = { fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--on-surface-muted)" };
const LIVE_CHIP: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 6, height: 24, padding: "0 10px",
  borderRadius: 999, fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500, color: "#b8f0c8",
  background: "var(--surface-highest, #232629)",
};
const LIVE_DOT: CSSProperties = { width: 6, height: 6, borderRadius: 999, background: "var(--acid-green, #22c55e)", boxShadow: "0 0 8px rgba(34,197,94,0.7)" };
const TEXTAREA_STYLE: CSSProperties = {
  width: "100%", minHeight: 220, padding: 14, background: "var(--surface-floor, #000)",
  border: "1px solid rgba(70,72,74,0.3)", borderRadius: 12, color: "var(--on-surface)",
  fontFamily: "var(--font-mono)", fontSize: 14, lineHeight: 1.7, resize: "vertical", outline: "none",
};

function segStyle(selected: boolean, voice: Voice | null, hovered: boolean, kind: "narration" | "dialogue"): CSSProperties {
  const base: CSSProperties = { borderRadius: 4, padding: "1.5px 1px", cursor: "pointer", WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" };
  const aRGB = "186,158,255";
  if (selected) return { ...base, background: `rgba(${aRGB},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${aRGB},0.55)`, color: "var(--on-surface)" };
  if (voice) {
    const ring = hovered ? `, inset 0 0 0 1px rgba(${voice.rgb},0.8)` : "";
    return { ...base, background: `rgba(${voice.rgb},${hovered ? 0.22 : 0.12})`, boxShadow: `inset 0 -2px 0 ${voice.color}${ring}`, color: "var(--on-surface)" };
  }
  return { ...base, color: kind === "dialogue" ? "var(--on-surface)" : "var(--on-surface-variant)" };
}

function markerStyle(v: Voice): CSSProperties {
  return { color: v.color, background: `rgba(${v.rgb},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${v.rgb},0.45)` };
}

function voiceTileStyle(v: Voice, active: boolean): CSSProperties {
  return {
    border: `1px solid ${active ? `rgba(${v.rgb},0.6)` : "rgba(120,124,128,0.35)"}`,
    background: active ? `rgba(${v.rgb},0.14)` : "var(--surface-raised, rgba(255,255,255,0.05))",
  };
}

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
