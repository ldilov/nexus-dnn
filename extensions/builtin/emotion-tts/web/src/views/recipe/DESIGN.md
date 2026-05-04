# Recipe Studio — Design Manifest

Spec 038 / Constitution XII.8 frame-the-interface-first mandate. Reviewers gate every component PR against this document.

## Visual direction

**Editorial / Spectral Graphite — "Kinetic Observatory" applied to a creative production tool.**

Inherits the host's spec 037 design language (deep graphite base, spectral accents, no 1px dividers, intentional asymmetry, glassmorphism reserved for floating overlays). Recipe Studio departs from the host shell's *information density* posture — where the shell prizes sidebar + topbar + scrollable canvas density, the studio prizes *vertical breathing*. Every section spans the full content width; sections separate via tonal surface shifts (page → panel) rather than borders. Asymmetry comes from section-internal layouts (e.g., radar 360 px square left, axis chips fluid right).

The screen reads as a **creative instrument**, not a configuration form.

The single thing the operator should remember: "this screen lets me hear what changes immediately."

## Audience + emotional tone

Audio-engineering-fluent operators (LUFS / dB / semitones / EQ bands are first-class vocabulary). Emotional tone: **focused calm with kinetic edges**. Mono-formatted technical numbers feel like machine outputs; section eyebrow numbers (`01 / Script`) feel like gallery wall labels.

## Palette duty mapping (FR-013 + FR-014)

| Token | Functional duty in Recipe Studio |
|---|---|
| `vars.color.accent` (violet `#ba9eff`) | Selection, focus, active section, active preset, active cast row, active utterance |
| `vars.color.secondary` (indigo `#9093ff`) | AI-driven actions: Qwen prompt, automated emotion-mapping, `[Char\|qwen:]` overrides, AI suggestion pills |
| `vars.color.tertiary` (magma `#ff8439`) | Manual writes: every slider, Volume/EQ/Pitch/Pace/Intensity, Generate, Save Preset, Apply Edit, unmapped-count chip when `> 0` |
| `vars.color.success` (acid-green `#22c55e`) | Live / ready / mapped, "all mapped" chip, runtime ready pulse |
| `vars.color.warning` (orange `#ff8439`) | Pre-flight diagnostic warnings; pre-render mode-switch warnings |
| `vars.color.danger` (`#ff6e84`) | Failed runs; chain validation errors |
| Per-character deterministic palette (`#ba9eff`, `#9093ff`, `#ff8439`, `#22c55e`, `#ffd34a`, `#ff7aa8` cycling, palette index by first-seen order) | Cast avatars, parsed-dialogue character pills, mapping editor borders |

**Mixing duties is FORBIDDEN.** A button performing both AI work and a manual write picks ONE duty per its primary action. Generate is a manual write → magma. "Map to vector" (Qwen) is AI → indigo.

## Typography pairing

- **Display** (`vars.font.display`): section titles, axis dominant readout, deployment hero, banner labels. Tracking `vars.tracking.display` (-0.02em).
- **Body** (`vars.font.body`): prose, microcopy, slider labels, banner text, syntax legends.
- **Mono** (`vars.font.mono`): ALL technical alphanumerics — axis values, chain digests, sample rates, durations, deployment IDs, file names, dB values, speed ratios, semitone counts. FR-012 is the constitutional gate.

## Spacing rhythm

- `vars.space.xs` (4 px) — tight inline groups (axis chip clusters, mono prefix gaps).
- `vars.space.sm` (8 px) — control row gaps, list item internal padding.
- `vars.space.md` (12 px) — panel body row gaps.
- `vars.space.lg` (16 px) — section heading-to-content gap.
- `vars.space.xl` (24 px) — panel internal padding (cozy default).
- `vars.space.section` (44 px in cozy) — section-to-section breathing.
- For the editorial **major** gap (target 64 px in cozy) we use `var(--d-9, 64px)` raw via `audit-allow` annotation, since the local space contract maxes at `section: 44px` from `--d-8`. Documented in `recipe.css.ts`.

## Layout logic

- **Single-column vertical stack** for sections — NO 2-column SaaS grid, NO 3-up card grid.
- Section composition is asymmetric: e.g., Emotion section places radar canvas LEFT (360 × 360 px) and axis chips RIGHT in fluid column; Cast section uses a single column of full-width rows (not a 3-up grid).
- Slider strips put numeric readouts in the right gutter (mono, accent text); chain JSON collapses to a one-line summary chip until expanded.
- No 1px section dividers. Sections separate via `vars.color.surface` (canvas) → `vars.color.surfaceMuted` (panel) tonal shift.

### Anatomy (top-down, single column)

1. **Deployment header** — display title + runtime/device/sample-rate chips + recipe-banner meta in mono. Wraps cleanly at 768 px and below.
2. **`01 / Script`** — full-width script editor with right-side meta (chars / lines / words in mono accent) and below-the-editor syntax legend (one line per override form: `emotion_vector`, `qwen`, `preset`, `audio`).
3. **`02 / Parsed dialogue`** — character-colored line list with per-line override badges.
4. **`03 / Cast`** — single-column cast rows; each row expands inline for assignment (drop-tile + library + preset grid).
5. **`04 / Emotion`** — radar canvas LEFT, axis chips + dominant readout + magnitude + alpha mix RIGHT; preset library shelf + save-current composer beneath.
6. **`05 / Performance`** — Direct Mod Slider Strip (Volume / 3-band EQ / dual-mode Speed / Pitch / Normalize / Fade / Silence trim) + pre-flight diagnostics block.
7. **`06 / Recent runs`** — last-N runs with Open Queue link.

## Motion rules

- Radar drag updates position in real time (within 50 ms of pointer-move per SC-002). On drag-release, axis chips spring-ease via `motion/react` `LazyMotion + m`.
- Cast row expansion stages the assignment surface in via `LayoutGroup` + `m.div` (drop-tile fades in 50 ms before the preset grid).
- Slider thumbs glow magma on focus (consistent with FR-013) — glow does NOT pulse on every move, only on focus-in.
- Waveform playhead via `requestAnimationFrame` while playing (not `motion/react` — too granular for spring physics).
- Memorable moments: (a) preset library "shelf" — clicking a preset triggers a brief radar-shape morph from prior vector to preset's vector with the dominant-axis readout changing in sync; (b) Generate completion — one-shot acid-green pulse on the section header chip (NOT the whole card).
- `prefers-reduced-motion` substitution: every `m.*` component gates via `useReducedMotion()`; falls back to instant state changes; functionality preserved (FR-050, FR-085 debounce remains because it's input throttling, not animation).

## Surface treatment

- Default card: **flat** — no shadow, no border. Tonal shift carries separation. The host shell already exposes `data-card="flat"` via the extension element.
- **Glass**: only on the `Add operation` builder floating card, model-picker dropdown if reused, and toast/sonner notifications. Per spec 037 §2 glass-rule: only floating-over-content elements.
- **Elevated**: rejected for v1 — flat is the editorial choice; elevated re-introduces the "card pile" SaaS look.
- Atmosphere: spec 037's existing radial-gradient backdrop (subtle violet glow at `88% -10%`, indigo glow at `-10% 110%`) inherited from the host shell. Recipe Studio does NOT add its own gradient.

## Token consumption per component

Every new component consumes ONLY tokens declared in `extensions/builtin/emotion-tts/web/src/theme/tokens.css.ts`. No bespoke CSS values without an `audit-allow:` annotation citing the design contract.

| Component | Token cluster |
|---|---|
| `EttsRadar` | `vars.font.display` for axis labels, `vars.color.accent` ring, `vars.color.tertiary` (magma) on active axis chip, `vars.font.mono` for value readouts. Bespoke: 360 × 360 px canvas (`audit-allow: px — bespoke radar canvas dimension per design contract`). |
| `EttsRadarMini` | Same as `EttsRadar`, sized 36 × 36 px (`audit-allow: px — preset fingerprint thumbnail dimension`). |
| `EttsWaveform` | `vars.color.surfaceMuted` panel, `vars.color.tertiary` overlay for loop region, `vars.color.accent` for playhead. Bespoke: full-width canvas height `~120 px` (`audit-allow: px — waveform canvas vertical anchor`). |
| `EditChainPanel` | `vars.font.mono` for op rows, `vars.color.surface` for panel, `vars.color.borderSubtle` for row separators (4 px gap, no 1px dividers). |
| `DirectModSliderStrip` | `vars.color.tertiary` for slider thumbs and active track, `vars.font.mono` for readouts (right gutter). Bespoke: thumb 18 × 18 px (`audit-allow: px — touch-target minimum per WCAG`). |
| `Eq3Control` + `SpeedControl` | Inherits slider strip tokens; preset chips use `vars.color.surfaceMuted` background, `vars.color.accent` on active chip. |
| `CastRow` | `vars.color.tertiary` chip when unmapped, `vars.color.success` chip when mapped, character color for avatar background + name color (per-character deterministic palette). |
| `SavePresetComposer` | `vars.color.tertiary` Save button (manual write), `vars.font.mono` for axis-value display, `vars.font.body` for name input. |
| `ParsedDialogue` | Character-color text on character names, `vars.color.textMuted` for narration, `vars.color.secondary` for `[\|qwen:]` override badge, `vars.color.accent` for `[\|preset:]`, `vars.color.tertiary` for `[\|audio:]`. |
| `PreFlightBlock` | `vars.color.success`/`warning`/`textMuted` per status; `vars.font.mono` for detail values. |
| `RecentRuns` | `vars.font.mono` for run id + timestamp, `StatusPill` reuse for run status. |
| `AuditHistoryPanel` | Reuses `EditChainPanel` row style + `vars.font.mono` for digest/timestamp. |

## Quality gate (every component PR)

- [ ] Single visual direction — no template-feeling defaults.
- [ ] Hierarchy via scale + tonal shift, not 1px dividers.
- [ ] Hover/focus/active states use the palette duty map.
- [ ] Mono is consistent on every technical number (FR-012).
- [ ] No new tokens introduced without an amendment to this manifest.
- [ ] Reduced-motion gates on every `motion/react` use site.
- [ ] Touch targets ≥ 44 px tall in cozy density (axis chips, slider thumbs, cast row CTAs).
- [ ] No `console.log` / inline comments in production code (Constitution IV).

## Reference design

Source: `C:\Users\lazar\Downloads\NexuDNN.zip` → `screens/emotion-tts.jsx` (988 LOC), `styles/screens.css`, `uploads/design.txt`. Treated as **structural blueprint only**; literal CSS values are translated to spec 037 tokens per quickstart §5 cheat sheet. Annotated `audit-allow:` literals carry intentional bespoke dimensions (radar canvas, waveform anchor, slider thumb) with the citation in the same line.
