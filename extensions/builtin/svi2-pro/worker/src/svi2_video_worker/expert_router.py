_TIMESTEP_SCALE: float = 1000.0


class ExpertSelector:
    def __init__(self, boundary: float = 0.875) -> None:
        self.threshold: float = boundary * _TIMESTEP_SCALE
        self._latched_low: bool = False

    def select(self, timestep: float) -> str:
        if self._latched_low:
            return "low"
        if timestep < self.threshold:
            self._latched_low = True
            return "low"
        return "high"

    def reset(self) -> None:
        self._latched_low = False
