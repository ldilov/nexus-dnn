# Reference-audio fixtures (spec 034, T003)

This directory holds reference clips used by the US1 preprocessing pipeline tests
(T030–T034) and the SC-201 speaker-similarity evaluation (T044b).

## Required clips

| Filename          | Duration | Content                                        | Used by |
|-------------------|----------|------------------------------------------------|---------|
| `clean_15s.wav`   | 15 s     | Studio-quality single speaker, −20 LUFS        | T030, T033 |
| `noisy_40s.wav`   | 40 s     | Phone-call quality, −18 dB peaks, light hiss   | T033, T034, T044 E2E |
| `silent_3s.wav`   | 3 s      | Pure silence (or broadband noise, no speech)   | T031, T034 (vad_empty) |
| `crowd_10min.wav` | 600 s    | Conversation over crowd ambience               | T034 (truncation warning) |

## Format

- Sample rate: 48 000 Hz (the pipeline resamples to 24 000 Hz as its first stage,
  so fixtures deliberately ship at a higher rate to exercise that path).
- Channels: stereo for `clean_15s.wav` (to exercise mono downmix), mono for the rest.
- Encoding: 16-bit PCM WAV.

## Size discipline

Clips ≥ 10 MB MUST be tracked via `git-lfs`. `crowd_10min.wav` at 48 kHz stereo
is ~110 MB uncompressed — store as mono 16 kHz PCM (~20 MB) unless a test
needs the full fidelity.

## Authoring

Clips are not currently checked in — this README is the contract. Record or
curate the four clips per the table above and drop them into this directory.
Tests that depend on missing fixtures SHOULD skip with a `pytest.skip(reason=…)`
rather than fail, so CI stays green on checkouts without the optional fixtures.

## SC-201 hard-reference set (T044b)

The SC-201 cosine-reduction benchmark needs a larger curated set of 20 noisy
clips. Place them under `hard_reference_set/` as `clip_01.wav` … `clip_20.wav`
with a parallel `labels.json` describing source conditions.
