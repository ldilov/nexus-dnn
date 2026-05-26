from __future__ import annotations

from typing import Iterable


MELT: frozenset[str] = frozenset(
    {
        "melting",
        "morphing face",
        "dissolving features",
        "warping anatomy",
        "smeared texture",
        "liquefied skin",
        "fluid distortion",
    }
)

DEFORM: frozenset[str] = frozenset(
    {
        "deformed",
        "disfigured",
        "extra limbs",
        "missing limbs",
        "fused fingers",
        "twisted body",
        "broken anatomy",
        "asymmetric face",
    }
)

IDENTITY_DRIFT: frozenset[str] = frozenset(
    {
        "different person",
        "face swap",
        "changed outfit",
        "inconsistent character",
        "swapping identity",
        "wardrobe change",
    }
)

MOTION_ARTIFACT: frozenset[str] = frozenset(
    {
        "stuttering motion",
        "frozen frame",
        "jerky movement",
        "teleporting subject",
        "motion blur smear",
        "ghosted limbs",
        "duplicated object",
    }
)

ALL_CATEGORIES: dict[str, frozenset[str]] = {
    "melt": MELT,
    "deform": DEFORM,
    "identity_drift": IDENTITY_DRIFT,
    "motion_artifact": MOTION_ARTIFACT,
}


def compose(categories: Iterable[str], user_negative: str = "") -> str:
    user_tokens = [t.strip() for t in user_negative.split(",") if t.strip()]
    seen: set[str] = set(t.lower() for t in user_tokens)
    out: list[str] = list(user_tokens)
    for name in categories:
        bucket = ALL_CATEGORIES.get(name)
        if bucket is None:
            continue
        for token in sorted(bucket):
            key = token.lower()
            if key in seen:
                continue
            seen.add(key)
            out.append(token)
    return ", ".join(out)
