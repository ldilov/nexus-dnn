"""Regenerate synthetic attention tensor + golden Viterbi path for OAS tests.

Deterministic — seeded RNG produces byte-identical output across machines
with the same torch version.

Usage::

    python generate_fixtures.py
"""

from __future__ import annotations

import json
from pathlib import Path

import torch

HEADS = 5
TEXT_LEN = 80
AUDIO_FRAMES = 120
SEED = 0xEB0734


def build_synthetic_attention() -> torch.Tensor:
    generator = torch.Generator().manual_seed(SEED)
    base_noise = torch.rand(HEADS, TEXT_LEN, AUDIO_FRAMES, generator=generator) * 0.05

    diagonal_strength = torch.zeros(HEADS, TEXT_LEN, AUDIO_FRAMES)
    for head in range(HEADS):
        drift = (head - HEADS // 2) * 0.5
        for t in range(TEXT_LEN):
            center = int(t * AUDIO_FRAMES / TEXT_LEN + drift)
            for offset in range(-2, 3):
                audio_idx = center + offset
                if 0 <= audio_idx < AUDIO_FRAMES:
                    diagonal_strength[head, t, audio_idx] = 1.0 - 0.25 * abs(offset)

    raw = base_noise + diagonal_strength
    attention = torch.softmax(raw, dim=-1)
    return attention


def viterbi_path(attention: torch.Tensor) -> tuple[float, list[int]]:
    mean_attn = attention.mean(dim=0)
    log_attn = torch.log(mean_attn + 1e-12)

    text_len, audio_frames = log_attn.shape
    dp = torch.full((text_len, audio_frames), float("-inf"))
    back = torch.full((text_len, audio_frames), -1, dtype=torch.long)

    dp[0] = log_attn[0]
    for t in range(1, text_len):
        for j in range(audio_frames):
            best_prev_score = float("-inf")
            best_prev_idx = -1
            for k in range(max(0, j - 2), j + 1):
                score = dp[t - 1, k].item()
                if score > best_prev_score:
                    best_prev_score = score
                    best_prev_idx = k
            dp[t, j] = best_prev_score + log_attn[t, j].item()
            back[t, j] = best_prev_idx

    final_idx = int(dp[-1].argmax().item())
    path = [final_idx]
    for t in range(text_len - 1, 0, -1):
        path.append(int(back[t, path[-1]].item()))
    path.reverse()

    return dp[-1, final_idx].item(), path


def main() -> None:
    out_dir = Path(__file__).resolve().parent
    attention = build_synthetic_attention()
    torch.save(attention, out_dir / "synthetic_attn_10s.pt")

    log_prob, path = viterbi_path(attention)
    golden = {"log_prob": log_prob, "path": path}
    (out_dir / "golden_viterbi.json").write_text(
        json.dumps(golden, indent=2) + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
