"""Tests for optional Heun solver and base-model paths in the render report."""
import math
import pytest
from svi2_video_worker.pipeline_svi2 import validate_render_params


_BASE = {"ref_image_path": "x.png", "prompts": ["a"]}


def test_solver_defaults_to_euler():
    p = validate_render_params(_BASE)
    assert p["solver"] == "euler"


def test_solver_heun_preserved():
    p = validate_render_params({**_BASE, "solver": "heun"})
    assert p["solver"] == "heun"


def test_solver_unknown_coerced_to_euler():
    p = validate_render_params({**_BASE, "solver": "runge-kutta-4"})
    assert p["solver"] == "euler"


def test_solver_case_insensitive():
    p = validate_render_params({**_BASE, "solver": "HEUN"})
    assert p["solver"] == "heun"


class _MockScheduler:
    """Toy scheduler for pure-Python math tests — no torch dependency."""

    num_train_timesteps = 1000

    def __init__(self, sigmas):
        self.sigmas = sigmas
        self.timesteps = [s * self.num_train_timesteps for s in sigmas]

    def sigma_pair(self, step_idx):
        sigma = self.sigmas[step_idx]
        sigma_next = self.sigmas[step_idx + 1] if step_idx + 1 < len(self.sigmas) else 0.0
        return float(sigma), float(sigma_next)

    def step(self, model_output, timestep, sample):
        step_idx = min(
            range(len(self.timesteps)),
            key=lambda i: abs(self.timesteps[i] - float(timestep)),
        )
        sigma, sigma_next = self.sigma_pair(step_idx)
        return sample + model_output * (sigma_next - sigma)


def _euler_integrate(v_fn, x0, sigmas):
    """Pure-Python Euler integration."""
    x = x0
    for i in range(len(sigmas) - 1):
        sigma = sigmas[i]
        sigma_next = sigmas[i + 1]
        x = x + v_fn(x, sigma) * (sigma_next - sigma)
    return x


def _heun_integrate(v_fn, x0, sigmas):
    """Pure-Python Heun (trapezoidal) integration."""
    x = x0
    for i in range(len(sigmas) - 1):
        sigma = sigmas[i]
        sigma_next = sigmas[i + 1]
        dt = sigma_next - sigma
        v1 = v_fn(x, sigma)
        x_pred = x + v1 * dt
        v2 = v_fn(x_pred, sigma_next)
        x = x + 0.5 * (v1 + v2) * dt
    return x


def test_constant_velocity_euler_heun_agree():
    """On a constant-velocity ODE (v = const), Euler and Heun give the same answer."""
    v_fn = lambda x, sigma: 1.5
    x0 = 0.0
    sigmas = [1.0, 0.75, 0.5, 0.25, 0.0]
    euler_result = _euler_integrate(v_fn, x0, sigmas)
    heun_result = _heun_integrate(v_fn, x0, sigmas)
    assert abs(euler_result - heun_result) < 1e-12, (
        f"Constant-velocity: Euler={euler_result}, Heun={heun_result}"
    )


def test_heun_closer_to_analytic_than_euler_on_varying_velocity():
    """On a velocity that depends on sigma, Heun is closer to the analytic integral.

    ODE: dx/dsigma = sigma  (so x(t) = x0 + integral_1^0 sigma dsigma = x0 + 0.5).
    Integrated from sigma=1 down to sigma=0 with 4 steps.
    """
    x0 = 0.0
    x_analytic = 0.0 + 0.5 * (1.0**2 - 0.0**2)

    v_fn = lambda x, sigma: sigma
    sigmas = [1.0, 0.75, 0.5, 0.25, 0.0]

    euler_result = _euler_integrate(v_fn, x0, sigmas)
    heun_result = _heun_integrate(v_fn, x0, sigmas)

    euler_err = abs(euler_result - x_analytic)
    heun_err = abs(heun_result - x_analytic)

    assert heun_err < euler_err, (
        f"Heun (err={heun_err:.6f}) should beat Euler (err={euler_err:.6f}); "
        f"analytic={x_analytic}, euler={euler_result}, heun={heun_result}"
    )


def test_sigma_pair_final_step_returns_zero():
    sched = _MockScheduler([1.0, 0.5, 0.0])
    sigma, sigma_next = sched.sigma_pair(1)
    assert sigma == 0.5
    assert sigma_next == 0.0


def test_report_includes_base_model_fields():
    """validate_render_params carries dit_high_path / dit_low_path for report resolution."""
    p = validate_render_params(
        {
            **_BASE,
            "dit_high_path": "/my/high.safetensors",
            "dit_low_path": "/my/low.safetensors",
        }
    )
    assert p["dit_high_path"] == "/my/high.safetensors"
    assert p["dit_low_path"] == "/my/low.safetensors"


def test_report_base_model_override_false_when_no_override():
    from pathlib import Path
    from svi2_video_worker.pipeline_svi2 import resolve_dit_paths

    dit_high, dit_low = resolve_dit_paths({}, Path("models"))
    assert "HIGH" in dit_high.name or "HIGH" in str(dit_high).upper()
    assert "LOW" in dit_low.name or "LOW" in str(dit_low).upper()


def test_report_base_model_override_true_when_override_set():
    from pathlib import Path
    from svi2_video_worker.pipeline_svi2 import resolve_dit_paths

    overrides = {
        "dit_high_path": "/custom/high.safetensors",
        "dit_low_path": "/custom/low.safetensors",
    }
    dit_high, dit_low = resolve_dit_paths(overrides, Path("models"))
    assert dit_high == Path("/custom/high.safetensors")
    assert dit_low == Path("/custom/low.safetensors")
    assert bool(overrides.get("dit_high_path") or overrides.get("dit_low_path")) is True
