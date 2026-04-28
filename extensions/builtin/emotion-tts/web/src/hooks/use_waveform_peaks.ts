/**
 * Spec 036 / US1 — decode an audio URL into normalised peak amplitudes.
 *
 * Returns one positive peak per pixel column at the requested target width.
 * Decoding happens in an `OfflineAudioContext`; the result is cached per
 * `(audioUrl, targetWidth)` so re-renders during drag don't re-decode.
 */

import { useEffect, useRef, useState } from "react";

export interface WaveformPeaksState {
  peaks: Float32Array | null;
  isLoading: boolean;
  error: string | null;
}

export function useWaveformPeaks(
  audioUrl: string,
  targetWidth: number,
): WaveformPeaksState {
  const [state, setState] = useState<WaveformPeaksState>({
    peaks: null,
    isLoading: true,
    error: null,
  });
  const lastKeyRef = useRef<string>("");

  useEffect(() => {
    if (!audioUrl || targetWidth <= 0) {
      setState({ peaks: null, isLoading: false, error: null });
      return;
    }
    const key = `${audioUrl}::${targetWidth}`;
    if (lastKeyRef.current === key) return;
    lastKeyRef.current = key;

    let cancelled = false;
    setState({ peaks: null, isLoading: true, error: null });

    decodePeaks(audioUrl, targetWidth)
      .then((peaks) => {
        if (cancelled) return;
        setState({ peaks, isLoading: false, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "decode failed";
        setState({ peaks: null, isLoading: false, error: message });
      });

    return () => {
      cancelled = true;
    };
  }, [audioUrl, targetWidth]);

  return state;
}

async function decodePeaks(audioUrl: string, targetWidth: number): Promise<Float32Array> {
  const resp = await fetch(audioUrl);
  if (!resp.ok) throw new Error(`failed to load audio (${resp.status})`);
  const buffer = await resp.arrayBuffer();
  const ctx = new OfflineAudioContext(1, 1, 44100);
  const audio = await ctx.decodeAudioData(buffer.slice(0));
  return computePeaks(audio, targetWidth);
}

function computePeaks(audio: AudioBuffer, targetWidth: number): Float32Array {
  const channelCount = audio.numberOfChannels;
  const sampleCount = audio.length;
  const samplesPerPixel = Math.max(1, Math.floor(sampleCount / targetWidth));
  const peaks = new Float32Array(targetWidth);
  const channels: Float32Array[] = [];
  for (let c = 0; c < channelCount; c += 1) channels.push(audio.getChannelData(c));

  for (let i = 0; i < targetWidth; i += 1) {
    const start = i * samplesPerPixel;
    const end = Math.min(sampleCount, start + samplesPerPixel);
    let peak = 0;
    for (let s = start; s < end; s += 1) {
      let mix = 0;
      for (let c = 0; c < channelCount; c += 1) {
        const ch = channels[c];
        if (ch) mix += Math.abs(ch[s] ?? 0);
      }
      const avg = mix / channelCount;
      if (avg > peak) peak = avg;
    }
    peaks[i] = peak;
  }
  return peaks;
}
