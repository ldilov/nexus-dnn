from __future__ import annotations

import argparse
import os
import posixpath
import stat
import sys
import time
from pathlib import Path
from typing import Iterator, Optional

import paramiko

_EXT_DIR = Path(__file__).resolve().parent.parent  # extensions/builtin/svi2-pro
_LOCAL_MODELS_DEFAULT = "D:/svi2_models"

_SYNC_EXCLUDE_DIRS = {
    ".venv", "__pycache__", ".pytest_cache", ".ruff_cache", ".git",
    "tools", "videos", "node_modules",
}
_SYNC_EXCLUDE_SUFFIX = (".whl", ".mp4", ".log", ".pyc")
_SYNC_DIRS = ("worker/src", "scripts", "schemas", "data", "attention_profiles.toml")


class Dgx:
    def __init__(self, host: str, user: str, key_path: str, passphrase: Optional[str]) -> None:
        self.host = host
        self.user = user
        key = self._load_key(os.path.expanduser(key_path), passphrase)
        self.cli = paramiko.SSHClient()
        self.cli.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        self.cli.connect(host, username=user, pkey=key, timeout=20)
        self._sftp: Optional[paramiko.SFTPClient] = None

    @staticmethod
    def _load_key(path: str, passphrase: Optional[str]) -> paramiko.PKey:
        errors = []
        for cls in (paramiko.Ed25519Key, paramiko.ECDSAKey, paramiko.RSAKey):
            try:
                return cls.from_private_key_file(path, password=passphrase)
            except paramiko.SSHException as exc:  # wrong key type
                errors.append(f"{cls.__name__}: {exc}")
        raise SystemExit(f"could not load key {path}:\n  " + "\n  ".join(errors))

    @property
    def sftp(self) -> paramiko.SFTPClient:
        if self._sftp is None:
            self._sftp = self.cli.open_sftp()
        return self._sftp

    def run(self, cmd: str, *, stream: bool = False, check: bool = True) -> int:
        chan = self.cli.get_transport().open_session()
        chan.exec_command(cmd)
        if stream:
            chan.setblocking(False)
            while True:
                got = False
                while chan.recv_ready():
                    sys.stdout.write(chan.recv(65536).decode(errors="replace"))
                    sys.stdout.flush()
                    got = True
                while chan.recv_stderr_ready():
                    sys.stderr.write(chan.recv_stderr(65536).decode(errors="replace"))
                    sys.stderr.flush()
                    got = True
                if chan.exit_status_ready() and not chan.recv_ready() and not chan.recv_stderr_ready():
                    break
                if not got:
                    time.sleep(0.2)
            rc = chan.recv_exit_status()
        else:
            rc = chan.recv_exit_status()
            out = chan.makefile("r").read()
            err = chan.makefile_stderr("r").read()
            if out:
                sys.stdout.write(out)
            if err.strip():
                sys.stderr.write(err)
        if check and rc != 0:
            raise SystemExit(f"remote command failed (rc={rc}): {cmd[:120]}")
        return rc

    def capture(self, cmd: str) -> str:
        _in, out, _err = self.cli.exec_command(cmd)
        return out.read().decode(errors="replace")

    def mkdirs(self, remote: str) -> None:
        parts = remote.strip("/").split("/")
        cur = "/"
        for p in parts:
            cur = posixpath.join(cur, p)
            try:
                self.sftp.stat(cur)
            except IOError:
                self.sftp.mkdir(cur)

    def put_tree(self, local: Path, remote: str, *, size_skip: bool = False) -> tuple[int, int]:
        sent = skipped = 0
        for path in _walk(local):
            rel = path.relative_to(local).as_posix()
            rpath = posixpath.join(remote, rel)
            self.mkdirs(posixpath.dirname(rpath))
            if size_skip:
                try:
                    if self.sftp.stat(rpath).st_size == path.stat().st_size:
                        skipped += 1
                        continue
                except IOError:
                    pass
            self.sftp.put(str(path), rpath)
            sent += 1
            print(f"  -> {rel} ({path.stat().st_size:,} B)")
        return sent, skipped

    def get(self, remote: str, local: Path) -> None:
        local.parent.mkdir(parents=True, exist_ok=True)
        self.sftp.get(remote, str(local))

    def close(self) -> None:
        if self._sftp is not None:
            self._sftp.close()
        self.cli.close()


def _walk(root: Path) -> Iterator[Path]:
    if root.is_file():
        yield root
        return
    for entry in sorted(root.iterdir()):
        if entry.is_dir():
            if entry.name in _SYNC_EXCLUDE_DIRS:
                continue
            yield from _walk(entry)
        elif entry.suffix.lower() not in _SYNC_EXCLUDE_SUFFIX:
            yield entry


def _dgx(args: argparse.Namespace) -> Dgx:
    return Dgx(args.host, args.user, args.key, args.passphrase)


def _remote_paths(args: argparse.Namespace) -> dict[str, str]:
    root = args.remote_root.replace("~", f"/home/{args.user}")
    return {
        "root": root,
        "ext": posixpath.join(root, "svi2-pro"),
        "worker": posixpath.join(root, "svi2-pro", "worker"),
        "venv_py": posixpath.join(root, "svi2-pro", "worker", ".venv", "bin", "python"),
        "models": args.models_dir.replace("~", f"/home/{args.user}"),
        "out": posixpath.join(root, "out"),
    }


def cmd_probe(args: argparse.Namespace) -> int:
    dgx = _dgx(args)
    print(dgx.capture(
        'echo "host: $(uname -m) $(. /etc/os-release; echo $PRETTY_NAME)"; '
        'echo "gpu: $(nvidia-smi --query-gpu=name,driver_version --format=csv,noheader 2>&1 | head -1)"; '
        'echo "mem_free_g: $(free -g | awk \'/Mem:/{print $7}\')"; '
        'echo "python: $(python3 --version 2>&1)"; '
        'echo "ffmpeg: $(ffmpeg -version 2>/dev/null | head -1 || echo MISSING)"; '
        'echo "uv: $(uv --version 2>/dev/null || echo MISSING)"'
    ))
    dgx.close()
    return 0


def cmd_setup(args: argparse.Namespace) -> int:
    # No sudo: uv installs to ~/.local/bin; ffmpeg comes from the imageio-ffmpeg
    # bundled static aarch64 binary, symlinked into the venv as `ffmpeg`.
    dgx = _dgx(args)
    rp = _remote_paths(args)
    print("[setup] uv + venv + deps (userspace, no sudo)")
    dgx.run("command -v uv >/dev/null || curl -LsSf https://astral.sh/uv/install.sh | sh", stream=True, check=False)
    dgx.mkdirs(rp["worker"])
    dgx.mkdirs(rp["out"])
    uv = f'export PATH="$HOME/.local/bin:$PATH"; cd {rp["worker"]} && uv'
    dgx.run(f'{uv} venv --python 3.12 .venv', stream=True)
    base = "pydantic pyyaml ffmpeg-python pillow numpy huggingface_hub safetensors einops sentencepiece protobuf transformers ftfy regex av imageio imageio-ffmpeg"
    dgx.run(f'{uv} pip install --python .venv/bin/python {base}', stream=True)
    print(f"[setup] installing torch: {args.torch_spec}")
    dgx.run(f'{uv} pip install --python .venv/bin/python {args.torch_spec}', stream=True)
    print("[setup] symlink imageio-ffmpeg binary -> venv/bin/ffmpeg")
    dgx.run(
        f'cd {rp["worker"]} && '
        f'FF=$(.venv/bin/python -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())") && '
        f'ln -sf "$FF" .venv/bin/ffmpeg && .venv/bin/ffmpeg -version | head -1',
        stream=True, check=False,
    )
    print("[setup] torch CUDA check:")
    dgx.run(
        f'cd {rp["worker"]} && .venv/bin/python -c '
        f'"import torch;print(\'torch\',torch.__version__,\'cuda\',torch.cuda.is_available(),'
        f'torch.cuda.get_device_name(0) if torch.cuda.is_available() else None)"',
        stream=True, check=False,
    )
    dgx.close()
    return 0


def cmd_sync(args: argparse.Namespace) -> int:
    dgx = _dgx(args)
    rp = _remote_paths(args)
    print(f"[sync] {_EXT_DIR} -> {rp['ext']}")
    total = 0
    for item in _SYNC_DIRS:
        local = _EXT_DIR / item
        if not local.exists():
            continue
        remote = posixpath.join(rp["ext"], item)
        if local.is_file():
            dgx.mkdirs(posixpath.dirname(remote))
            dgx.sftp.put(str(local), remote)
            total += 1
            print(f"  -> {item}")
        else:
            sent, _ = dgx.put_tree(local, remote)
            total += sent
    # pyproject for reference
    pp = _EXT_DIR / "worker" / "pyproject.toml"
    if pp.exists():
        dgx.sftp.put(str(pp), posixpath.join(rp["worker"], "pyproject.toml"))
    print(f"[sync] {total} files")
    dgx.close()
    return 0


def cmd_stage_models(args: argparse.Namespace) -> int:
    dgx = _dgx(args)
    rp = _remote_paths(args)
    local = Path(args.local_models)
    if not local.is_dir():
        raise SystemExit(f"local models dir not found: {local}")
    print(f"[stage-models] {local} -> {rp['models']} (size-skip)")
    dgx.mkdirs(rp["models"])
    sent, skipped = dgx.put_tree(local, rp["models"], size_skip=True)
    print(f"[stage-models] sent={sent} skipped={skipped}")
    dgx.close()
    return 0


def cmd_run(args: argparse.Namespace) -> int:
    dgx = _dgx(args)
    rp = _remote_paths(args)
    remote_out = posixpath.join(rp["out"], args.name)
    smoke_args = [a for a in args.smoke_args if a != "--"]
    passthrough = " ".join(smoke_args)
    venv_bin = posixpath.dirname(rp["venv_py"])
    cmd = (
        f'export PATH="{venv_bin}:$PATH"; '
        f'cd {rp["ext"]} && '
        f'{rp["venv_py"]} scripts/gpu_smoke.py '
        f'--models-dir {rp["models"]} '
        f'--output {remote_out} '
        f'{passthrough}'
    )
    print(f"[run] {cmd}\n")
    rc = dgx.run(cmd, stream=True, check=False)
    print(f"\n[run] exit={rc}")
    if rc == 0 and args.fetch:
        local_out = Path(args.fetch)
        print(f"[fetch] {remote_out} -> {local_out}")
        try:
            dgx.get(remote_out, local_out)
            print(f"[fetch] {local_out} ({local_out.stat().st_size:,} B)")
        except IOError as exc:
            print(f"[fetch] FAILED: {exc}", file=sys.stderr)
    dgx.close()
    return rc


def cmd_fetch(args: argparse.Namespace) -> int:
    dgx = _dgx(args)
    dgx.get(args.remote, Path(args.local))
    print(f"[fetch] {args.local}")
    dgx.close()
    return 0


def main() -> int:
    p = argparse.ArgumentParser(prog="dgx_smoke", description="Delegate svi2-pro GPU smoke renders to a remote DGX over SSH.")
    p.add_argument("--host", default=os.environ.get("DGX_HOST", "192.168.50.22"))
    p.add_argument("--user", default=os.environ.get("DGX_USER", "ldilov"))
    p.add_argument("--key", default=os.environ.get("DGX_KEY", "~/.ssh/dgx_rsa"))
    p.add_argument("--passphrase", default=os.environ.get("DGX_PP"))
    p.add_argument("--remote-root", default=os.environ.get("DGX_REMOTE_ROOT", "~/svi2-remote"))
    p.add_argument("--models-dir", default=os.environ.get("DGX_MODELS_DIR", "~/svi2_models"))
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("probe").set_defaults(func=cmd_probe)

    sp = sub.add_parser("setup")
    sp.add_argument(
        "--torch-spec",
        default=os.environ.get(
            "DGX_TORCH_SPEC",
            "torch torchvision --index-url https://download.pytorch.org/whl/cu130",
        ),
        help="pip spec for torch (aarch64 CUDA). Override per the DGX CUDA version.",
    )
    sp.set_defaults(func=cmd_setup)

    sub.add_parser("sync").set_defaults(func=cmd_sync)

    sm = sub.add_parser("stage-models")
    sm.add_argument("--local-models", default=_LOCAL_MODELS_DEFAULT)
    sm.set_defaults(func=cmd_stage_models)

    rn = sub.add_parser("run")
    rn.add_argument("--name", default="dgx_smoke.mp4", help="remote output filename under <root>/out")
    rn.add_argument("--fetch", default=None, help="local path to pull the result mp4 back to")
    rn.add_argument("smoke_args", nargs=argparse.REMAINDER, help="args passed verbatim to gpu_smoke.py (after --)")
    rn.set_defaults(func=cmd_run)

    fp = sub.add_parser("fetch")
    fp.add_argument("remote")
    fp.add_argument("local")
    fp.set_defaults(func=cmd_fetch)

    args = p.parse_args()
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
