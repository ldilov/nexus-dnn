"""Always-on #3: scheduler sync removal must be bit-identical.

The precomputed CPU sigma/timestep buffers must equal the values the old
per-step ``.item()`` reads would have produced, exactly (no tolerance). Removing
the per-step GPU->CPU sync may not change a single number.
"""

import pytest

pytest.importorskip("torch")

import torch

from svi2_video_worker.wan22 import FlowMatchScheduler


@pytest.mark.parametrize("template", ["Wan", "FLUX.1", "Z-Image"])
@pytest.mark.parametrize("steps", [2, 4, 8, 20])
def test_precomputed_sigma_buffer_matches_tensor_exactly(template, steps):
    sched = FlowMatchScheduler(template=template)
    sched.set_timesteps(num_inference_steps=steps, shift=5.0)

    # precomputed CPU buffer equals the live sigma tensor, element by element
    assert len(sched._sigmas_cpu) == sched.sigmas.numel()
    for i in range(sched.sigmas.numel()):
        assert sched._sigmas_cpu[i] == float(sched.sigmas[i].item())


@pytest.mark.parametrize("steps", [2, 4, 8, 20])
def test_precomputed_timesteps_buffer_matches_tensor_exactly(steps):
    sched = FlowMatchScheduler(template="Wan")
    sched.set_timesteps(num_inference_steps=steps, shift=5.0)

    assert torch.equal(sched._timesteps_cpu, sched.timesteps.detach().to("cpu"))


def test_sigma_pair_matches_old_per_step_values_exactly():
    sched = FlowMatchScheduler(template="Wan")
    sched.set_timesteps(num_inference_steps=8, shift=5.0)
    n = sched.sigmas.numel()
    for step_idx in range(n):
        # old behavior: read straight off the sigma tensor with .item()
        old_sigma = float(sched.sigmas[step_idx].item())
        old_next = (
            float(sched.sigmas[step_idx + 1].item()) if step_idx + 1 < n else 0.0
        )
        new_sigma, new_next = sched.sigma_pair(step_idx)
        assert new_sigma == old_sigma
        assert new_next == old_next


def test_set_fixed_sigmas_precomputes_buffers():
    sched = FlowMatchScheduler(template="Wan")
    sched.set_fixed_sigmas([1.0, 0.9375001, 0.8333333, 0.625, 0.0])
    # terminal 0.0 dropped by set_fixed_sigmas -> 4 entries
    assert len(sched._sigmas_cpu) == sched.sigmas.numel() == 4
    for i in range(sched.sigmas.numel()):
        assert sched._sigmas_cpu[i] == float(sched.sigmas[i].item())


def test_step_uses_precomputed_buffer_and_is_bit_identical():
    sched = FlowMatchScheduler(template="Wan")
    sched.set_timesteps(num_inference_steps=4, shift=5.0)
    torch.manual_seed(0)
    sample = torch.randn(1, 4, 2, 2)
    model_output = torch.randn(1, 4, 2, 2)

    # reproduce the pre-change arithmetic explicitly for step 0
    timestep = sched.timesteps[0]
    timestep_id = torch.argmin((sched.timesteps - timestep).abs())
    sigma = sched.sigmas[timestep_id]
    sigma_next = sched.sigmas[timestep_id + 1]
    expected = sample + model_output * (sigma_next - sigma)

    out = sched.step(model_output, timestep, sample)
    assert torch.equal(out, expected)
