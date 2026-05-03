import { useCallback, useEffect, useRef, useState } from "react";

export interface WaveformPeaks {
  peaks: Float32Array;
  duration: number;
  sampleRate: number;
}

export interface UseWaveformAudioOptions {
  audioSrc: string | null;
  fallbackSeed?: number;
  fallbackIntensity?: number;
  peakCount?: number;
}

export interface UseWaveformAudioResult {
  peaks: Float32Array | null;
  duration: number;
  sampleRate: number;
  ready: boolean;
  error: Error | null;
  isFallback: boolean;
}

const DEFAULT_PEAK_COUNT = 512;

export function useWaveformAudio(
  options: UseWaveformAudioOptions,
): UseWaveformAudioResult {
  const { audioSrc, fallbackSeed = 1, fallbackIntensity = 0.6, peakCount = DEFAULT_PEAK_COUNT } = options;
  const [state, setState] = useState<UseWaveformAudioResult>({
    peaks: null,
    duration: 0,
    sampleRate: 0,
    ready: false,
    error: null,
    isFallback: false,
  });
  const cancelRef = useRef(false);

  const synthesizePeaks = useCallback((): UseWaveformAudioResult => {
    const peaks = generateSyntheticPeaks(peakCount, fallbackSeed, fallbackIntensity);
    return {
      peaks,
      duration: 0,
      sampleRate: 0,
      ready: true,
      error: null,
      isFallback: true,
    };
  }, [fallbackIntensity, fallbackSeed, peakCount]);

  useEffect(() => {
    cancelRef.current = false;
    if (!audioSrc) {
      setState(synthesizePeaks());
      return () => {
        cancelRef.current = true;
      };
    }
    let audioContext: AudioContext | null = null;
    setState((s) => ({ ...s, ready: false, error: null }));
    (async () => {
      try {
        const response = await fetch(audioSrc);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const buffer = await response.arrayBuffer();
        if (cancelRef.current) return;
        const Ctor =
          window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) {
          setState(synthesizePeaks());
          return;
        }
        audioContext = new Ctor();
        const decoded = await audioContext.decodeAudioData(buffer.slice(0));
        if (cancelRef.current) return;
        const peaks = downsamplePeaks(decoded, peakCount);
        setState({
          peaks,
          duration: decoded.duration,
          sampleRate: decoded.sampleRate,
          ready: true,
          error: null,
          isFallback: false,
        });
      } catch (error: unknown) {
        if (cancelRef.current) return;
        const fallback = synthesizePeaks();
        setState({
          ...fallback,
          error: error instanceof Error ? error : new Error("decode failed"),
        });
      } finally {
        if (audioContext) await audioContext.close().catch(() => undefined);
      }
    })();
    return () => {
      cancelRef.current = true;
      if (audioContext) audioContext.close().catch(() => undefined);
    };
  }, [audioSrc, peakCount, synthesizePeaks]);

  return state;
}

function downsamplePeaks(buffer: AudioBuffer, peakCount: number): Float32Array {
  const channelData = buffer.getChannelData(0);
  const samplesPerPeak = Math.max(1, Math.floor(channelData.length / peakCount));
  const peaks = new Float32Array(peakCount);
  for (let i = 0; i < peakCount; i += 1) {
    const start = i * samplesPerPeak;
    const end = Math.min(start + samplesPerPeak, channelData.length);
    let max = 0;
    for (let j = start; j < end; j += 1) {
      const v = Math.abs(channelData[j] ?? 0);
      if (v > max) max = v;
    }
    peaks[i] = max;
  }
  return peaks;
}

function generateSyntheticPeaks(count: number, seed: number, intensity: number): Float32Array {
  const peaks = new Float32Array(count);
  let state = seed >>> 0 || 1;
  for (let i = 0; i < count; i += 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const noise = (state / 0xffffffff) * 2 - 1;
    const envelope = Math.sin((i / count) * Math.PI);
    peaks[i] = Math.max(0, Math.min(1, intensity * envelope * (0.5 + 0.5 * noise)));
  }
  return peaks;
}
