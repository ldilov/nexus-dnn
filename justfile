# nexus-dnn project tasks — DGX Spark deploy + remote ops.
# List: just --list   |   Deploy from main: just dgx-deploy

dgx_user := "ldilov"
dgx_host := "192.168.50.22"
# CUDA 13 devel image (has nvcc) for building GB10/aarch64 wheels; the runtime image lacks nvcc.
cuda_devel := "nvidia/cuda:13.0.1-devel-ubuntu24.04"

# List available recipes.
default:
    @just --list

# Install + START nexus-dnn on THIS machine, OS-aware (build-first, start on success):
#   Windows (x86_64)         -> native host build  : dockerfiles/win64.build.ps1 -Run
#   aarch64 Linux (DGX/GB10) -> docker image+run   : dockerfiles/aarch64.dockerfile -> container nexusdnn
# Other targets have no GPU build path here (see install-plan for a no-op dry run).
# data="" -> per-OS default (Windows: repo .nexus-data ; docker: named volume nexusdata).
# prereqs=1 forwards -InstallPrereqs to the Windows script (winget git/uv).
install port="3000" workers="4" tag="local" data="" prereqs="0":
    #!/usr/bin/env bash
    set -euo pipefail
    root="{{justfile_directory()}}"
    os="$(uname -s 2>/dev/null || echo unknown)"
    arch="$(uname -m 2>/dev/null || echo unknown)"
    echo ">>> nexus-dnn install — os=$os arch=$arch port={{port}} workers={{workers}}"
    case "$os" in
      MINGW*|MSYS*|CYGWIN*|Windows_NT)
        ps1="$root/dockerfiles/win64.build.ps1"
        [ -f "$ps1" ] || { echo "fatal: $ps1 missing." >&2; exit 1; }
        psexe="$(command -v pwsh || command -v powershell || true)"
        [ -n "$psexe" ] || { echo "fatal: neither pwsh nor powershell on PATH." >&2; exit 1; }
        bid="$(git -C "$root" rev-parse --short HEAD 2>/dev/null || echo dev)"
        export MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*'
        winps1="$ps1"; command -v cygpath >/dev/null 2>&1 && winps1="$(cygpath -w "$ps1")"
        echo ">>> Windows native host build (build + start) via $(basename "$psexe") [build=$bid]"
        args=(-NoProfile -ExecutionPolicy Bypass -File "$winps1" -BuildId "$bid" -Port {{port}} -EmotionTtsMaxWorkers {{workers}} -Run)
        [ "{{prereqs}}" = "1" ] && args+=(-InstallPrereqs)
        if [ -n "{{data}}" ]; then
          windata="{{data}}"; command -v cygpath >/dev/null 2>&1 && windata="$(cygpath -w "{{data}}")"
          args+=(-DataDir "$windata")
        fi
        exec "$psexe" "${args[@]}"
        ;;
      Linux)
        case "$arch" in
          aarch64|arm64) : ;;
          *) echo "fatal: Linux $arch has no GPU build path here (aarch64.dockerfile is GB10/aarch64-only)." >&2; exit 1 ;;
        esac
        command -v docker >/dev/null 2>&1 || { echo "fatal: docker not found on PATH." >&2; exit 1; }
        cd "$root"
        dockerfile="dockerfiles/aarch64.dockerfile"
        [ -f "$dockerfile" ] || { echo "fatal: $dockerfile missing." >&2; exit 1; }
        bid="$(git rev-parse --short HEAD 2>/dev/null || echo dev)"
        img="ldilov/nexusdnn:{{tag}}"
        vol="{{data}}"; [ -z "$vol" ] && vol="nexusdata"
        echo ">>> [1/4] build $img (NEXUS_BUILD_ID=$bid) — old container keeps serving until this succeeds"
        docker build --build-arg NEXUS_BUILD_ID="$bid" -t "$img" -f "$dockerfile" .
        echo ">>> [2/4] swap container nexusdnn (vol=$vol)"
        docker stop nexusdnn >/dev/null 2>&1 || true
        docker rm nexusdnn >/dev/null 2>&1 || true
        docker run -d --name nexusdnn --restart unless-stopped --gpus all \
          -p "{{port}}:{{port}}" -v "$vol:/data" \
          -e EMOTIONTTS_MAX_WORKERS="{{workers}}" -e NEXUS_DATA_DIR=/data -e NEXUS_PORT="{{port}}" "$img"
        echo ">>> [3/4] settle"; sleep 6
        docker ps --format 'table {{{{.Names}}\t{{{{.Status}}\t{{{{.Image}}' | grep -E 'NAMES|nexusdnn' || true
        echo ">>> [4/4] health http://localhost:{{port}}/"
        for i in $(seq 1 25); do
          code="$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:{{port}}/" 2>/dev/null || echo 000)"
          echo "  try $i: http $code"; [ "$code" = "200" ] && break; sleep 3
        done
        echo ">>> INSTALL_OK $img on :{{port}} (vol=$vol)"
        ;;
      Darwin)
        echo "fatal: macOS has no GPU host build path here — use a DGX (docker) or Windows (native)." >&2; exit 1 ;;
      *)
        echo "fatal: unsupported OS '$os'." >&2; exit 1 ;;
    esac

# Dry run: print which path `just install` would take on THIS machine (no build, no run).
install-plan:
    #!/usr/bin/env bash
    set -euo pipefail
    os="$(uname -s 2>/dev/null || echo unknown)"; arch="$(uname -m 2>/dev/null || echo unknown)"
    echo "os=$os arch=$arch"
    case "$os" in
      MINGW*|MSYS*|CYGWIN*|Windows_NT) echo "path: Windows native host build -> dockerfiles/win64.build.ps1 -Run" ;;
      Linux) case "$arch" in
          aarch64|arm64) echo "path: docker image -> dockerfiles/aarch64.dockerfile + run container nexusdnn" ;;
          *) echo "path: UNSUPPORTED (Linux $arch — aarch64-only build path)" ;;
        esac ;;
      Darwin) echo "path: UNSUPPORTED (macOS)" ;;
      *) echo "path: UNSUPPORTED ($os)" ;;
    esac

# SSH to the Spark. No args -> interactive shell; with args -> run remotely.
# Keep <cmd> free of $/backtick/! — they expand LOCALLY here; use _dgx-exec instead.
[no-cd]
dgx-ssh *cmd="":
    #!/usr/bin/env bash
    set -euo pipefail
    key="${DGX_KEY:-$HOME/.ssh/.dgx_session_key}"
    user="${DGX_USER:-{{dgx_user}}}"; host="${DGX_HOST:-{{dgx_host}}}"
    [ -f "$key" ] || { echo "fatal: ssh key '$key' not found (set DGX_KEY)." >&2; exit 1; }
    if [ -z "{{cmd}}" ]; then
        ssh -i "$key" -o StrictHostKeyChecking=no "$user@$host"
    else
        ssh -i "$key" -o StrictHostKeyChecking=no "$user@$host" "{{cmd}}"
    fi

# Copy a file/dir TO the Spark (local -> remote). rsync, scp fallback.
[no-cd]
dgx-push src dest="~/":
    #!/usr/bin/env bash
    set -euo pipefail
    export MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*'
    key="${DGX_KEY:-$HOME/.ssh/.dgx_session_key}"
    user="${DGX_USER:-{{dgx_user}}}"; host="${DGX_HOST:-{{dgx_host}}}"
    [ -e "{{src}}" ] || { echo "fatal: local source '{{src}}' not found." >&2; exit 1; }
    if command -v rsync >/dev/null 2>&1; then
        rsync -avhP -e "ssh -i $key -o StrictHostKeyChecking=no" "{{src}}" "$user@$host:{{dest}}"
    else
        scp -i "$key" -o StrictHostKeyChecking=no -r "{{src}}" "$user@$host:{{dest}}"
    fi

# Copy a file/dir FROM the Spark (remote -> local). rsync, scp fallback.
[no-cd]
dgx-pull src dest=".":
    #!/usr/bin/env bash
    set -euo pipefail
    export MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*'
    key="${DGX_KEY:-$HOME/.ssh/.dgx_session_key}"
    user="${DGX_USER:-{{dgx_user}}}"; host="${DGX_HOST:-{{dgx_host}}}"
    if command -v rsync >/dev/null 2>&1; then
        rsync -avhP -e "ssh -i $key -o StrictHostKeyChecking=no" "$user@$host:{{src}}" "{{dest}}"
    else
        scp -i "$key" -o StrictHostKeyChecking=no -r "$user@$host:{{src}}" "{{dest}}"
    fi

# Run a local SCRIPT in a fresh cuda-devel container mounting the nexusdata volume (GB10 builds/spikes).
# Pushes script -> /data/_spike, runs detached. gpus=1 adds --gpus all; forwards $HF_TOKEN if set in env.
[no-cd]
dgx-devel-run script name="spike" gpus="1":
    #!/usr/bin/env bash
    set -euo pipefail
    key="${DGX_KEY:-$HOME/.ssh/.dgx_session_key}"
    user="${DGX_USER:-{{dgx_user}}}"; host="${DGX_HOST:-{{dgx_host}}}"
    [ -f "{{script}}" ] || { echo "fatal: script '{{script}}' not found." >&2; exit 1; }
    [ -f "$key" ] || { echo "fatal: ssh key '$key' not found (set DGX_KEY)." >&2; exit 1; }
    base="$(basename "{{script}}")"
    scp -i "$key" -o StrictHostKeyChecking=no "{{script}}" "$user@$host:~/$base"
    gpuflag=""; [ "{{gpus}}" = "1" ] && gpuflag="--gpus all"
    tokenflag=""; [ -n "${HF_TOKEN:-}" ] && tokenflag="-e HF_TOKEN=$HF_TOKEN"
    rc="docker exec nexusdnn mkdir -p /data/_spike && docker cp ~/$base nexusdnn:/data/_spike/$base && (docker rm -f {{name}} 2>/dev/null || true); docker run -d $gpuflag $tokenflag -v nexusdata:/data --name {{name}} {{cuda_devel}} bash /data/_spike/$base"
    ssh -i "$key" -o StrictHostKeyChecking=no "$user@$host" "$rc"
    echo ">>> launched container '{{name}}' running $base (read logs: just dgx-vol-cat _spike/<logfile>)"

# Cat a file from the nexusdata volume (path relative to /data) via the running host container.
[no-cd]
dgx-vol-cat relpath:
    @just --justfile "{{justfile()}}" _dgx-exec "docker exec nexusdnn cat /data/{{relpath}}"

# Remove throwaway cuda-devel spike containers whose name contains <prefix>.
[no-cd]
dgx-devel-clean prefix="spike":
    @just --justfile "{{justfile()}}" _dgx-exec "docker ps -aq --filter name={{prefix}} | xargs -r docker rm -f; echo cleaned"

# List containers on the Spark (name, status, image).
[no-cd]
dgx-ps:
    @just --justfile "{{justfile()}}" _dgx-exec 'docker ps -a --format "table {{{{.Names}}\t{{{{.Status}}\t{{{{.Image}}"'

# Tail a container's logs. follow=1 streams (Ctrl-C to stop).
[no-cd]
dgx-logs container="nexusdnn" lines="200" follow="0":
    #!/usr/bin/env bash
    set -euo pipefail
    f=""; [ "{{follow}}" = "1" ] && f="-f"
    just --justfile "{{justfile()}}" _dgx-exec "docker logs --tail {{lines}} $f {{container}}"

# Recon the Spark deploy host: git state, dockerfile, containers (read-only).
[no-cd]
dgx-probe:
    #!/usr/bin/env bash
    set -euo pipefail
    key="${DGX_KEY:-$HOME/.ssh/.dgx_session_key}"
    user="${DGX_USER:-{{dgx_user}}}"; host="${DGX_HOST:-{{dgx_host}}}"
    ssh -i "$key" -o StrictHostKeyChecking=no "$user@$host" 'bash -s' <<'PROBE'
    set -uo pipefail
    export PATH=/usr/local/bin:/usr/bin:/bin:/snap/bin:$HOME/.local/bin:$PATH
    REPO_DIR="${REPO_DIR:-$HOME/nexus-dnn}"
    CONTAINER="${CONTAINER:-nexusdnn}"
    D="$(command -v docker || echo /usr/bin/docker)"
    echo "=== host ==="; whoami; hostname; uname -m
    cd "$REPO_DIR" || { echo "NO_REPO $REPO_DIR"; exit 1; }
    echo "=== repo $REPO_DIR ==="
    echo "branch:  $(git rev-parse --abbrev-ref HEAD)"
    echo "head:    $(git log --oneline -1)"
    echo "dirty:   $(git status --porcelain | wc -l) file(s)"
    git remote -v | head -2
    git fetch origin --quiet && echo "fetched origin" || echo "fetch-failed"
    echo "origin/main: $(git rev-parse origin/main 2>/dev/null || echo '-')"
    echo "=== dockerfiles ==="; ls -1 dockerfiles/ 2>/dev/null
    echo "=== containers ==="
    "$D" ps -a --format 'table {{{{.Names}}\t{{{{.Status}}\t{{{{.Image}}' | grep -Ei "NAMES|$CONTAINER|cloudflared" || true
    echo "=== done ==="
    PROBE

# Print a container's exact run config (image, ports, mounts, gpus, env).
[no-cd]
dgx-inspect container="nexusdnn":
    #!/usr/bin/env bash
    set -euo pipefail
    key="${DGX_KEY:-$HOME/.ssh/.dgx_session_key}"
    user="${DGX_USER:-{{dgx_user}}}"; host="${DGX_HOST:-{{dgx_host}}}"
    ssh -i "$key" -o StrictHostKeyChecking=no "$user@$host" "bash -s -- {{container}}" <<'INSPECT'
    set -uo pipefail
    export PATH=/usr/local/bin:/usr/bin:/bin:/snap/bin:$PATH
    D="$(command -v docker || echo /usr/bin/docker)"
    N="${1:-nexusdnn}"
    "$D" inspect -f 'image={{{{.Config.Image}}' "$N"
    "$D" inspect -f 'restart={{{{.HostConfig.RestartPolicy.Name}} maxretry={{{{.HostConfig.RestartPolicy.MaximumRetryCount}}' "$N"
    "$D" inspect -f 'network={{{{.HostConfig.NetworkMode}}' "$N"
    "$D" inspect -f 'ports={{{{json .HostConfig.PortBindings}}' "$N"
    "$D" inspect -f 'binds={{{{json .HostConfig.Binds}}' "$N"
    "$D" inspect -f 'gpus={{{{json .HostConfig.DeviceRequests}}' "$N"
    "$D" inspect -f 'entrypoint={{{{json .Config.Entrypoint}}' "$N"
    echo '--- app env ---'
    "$D" inspect -f '{{{{range .Config.Env}}{{{{println .}}{{{{end}}' "$N" | grep -Ei 'EMOTION|NEXUS|RUST_LOG|^PORT|^HOST|DATA|HF_|SVI|LTX|LONGCAT|^TZ' || echo '(none matched)'
    INSPECT

# Build host image from a branch + swap the live nexusdnn container.
# tag="" auto-bumps dgx-fixNN. Long aarch64 build; build-first, swap-only-on-success.
[no-cd]
dgx-deploy tag="" branch="main":
    #!/usr/bin/env bash
    set -euo pipefail
    key="${DGX_KEY:-$HOME/.ssh/.dgx_session_key}"
    user="${DGX_USER:-{{dgx_user}}}"; host="${DGX_HOST:-{{dgx_host}}}"
    echo ">>> building + swapping nexusdnn on DGX from '{{branch}}' (long; streams below)"
    ssh -i "$key" -o StrictHostKeyChecking=no "$user@$host" "TAG={{tag}} BRANCH={{branch}} bash -s" <<'DEPLOY'
    set -uo pipefail
    export PATH=/usr/local/bin:/usr/bin:/bin:/snap/bin:$HOME/.local/bin:$PATH
    D="$(command -v docker || echo /usr/bin/docker)"
    REPO_DIR="${REPO_DIR:-$HOME/nexus-dnn}"
    BRANCH="${BRANCH:-main}"
    CONTAINER="${CONTAINER:-nexusdnn}"
    DOCKERFILE="${DOCKERFILE:-dockerfiles/aarch64.dockerfile}"
    PORT="${PORT:-3000}"
    IMAGE_REPO="${IMAGE_REPO:-ldilov/nexusdnn}"
    cd "$REPO_DIR" || { echo "DEPLOY_FAIL repo-missing $REPO_DIR"; exit 1; }
    echo "=== deploy start $(date -u +%FT%TZ) branch=$BRANCH ==="
    echo "[1/5] fetch + checkout $BRANCH"
    git fetch origin --quiet || { echo "DEPLOY_FAIL fetch"; exit 1; }
    git -c core.hooksPath=/tmp/__nohooks checkout -B "$BRANCH" "origin/$BRANCH" || echo "(checkout hook noise; verifying HEAD)"
    HEAD="$(git rev-parse HEAD)"; OREF="$(git rev-parse "origin/$BRANCH")"
    echo "HEAD=$HEAD origin/$BRANCH=$OREF"
    [ "$HEAD" = "$OREF" ] || { echo "DEPLOY_FAIL head-mismatch"; exit 1; }
    BID="$(git rev-parse --short HEAD)"
    if [ -z "${TAG:-}" ]; then
      LAST="$("$D" images --format '{{{{.Tag}}' "$IMAGE_REPO" 2>/dev/null | grep -oE 'dgx-fix[0-9]+' | grep -oE '[0-9]+' | sort -n | tail -1)"
      [ -z "$LAST" ] && LAST=0
      TAG="dgx-fix$((LAST + 1))"
    fi
    IMG="$IMAGE_REPO:$TAG"
    echo "[2/5] build $IMG (NEXUS_BUILD_ID=$BID) -- old container keeps serving"
    if ! "$D" build --build-arg NEXUS_BUILD_ID="$BID" -t "$IMG" -f "$DOCKERFILE" . ; then echo "DEPLOY_FAIL build"; exit 1; fi
    echo "[3/5] swap container $CONTAINER"
    "$D" stop "$CONTAINER" 2>/dev/null || true
    "$D" rm "$CONTAINER" 2>/dev/null || true
    if ! "$D" run -d --name "$CONTAINER" --restart unless-stopped --gpus all -p "$PORT:$PORT" -v nexusdata:/data -e EMOTIONTTS_MAX_WORKERS="${EMOTIONTTS_MAX_WORKERS:-4}" -e NEXUS_DATA_DIR=/data -e NEXUS_PORT="$PORT" "$IMG"; then echo "DEPLOY_FAIL run"; exit 1; fi
    echo "[4/5] settle"; sleep 6
    "$D" ps --format 'table {{{{.Names}}\t{{{{.Status}}\t{{{{.Image}}' | grep -E "$CONTAINER|cloudflared" || true
    echo "[5/5] health localhost:$PORT"
    for i in $(seq 1 25); do
      code="$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:$PORT/" 2>/dev/null || echo 000)"
      echo "  try $i: http $code"
      [ "$code" = "200" ] && break
      sleep 3
    done
    echo "DEPLOY_OK $IMG build=$BID branch=$BRANCH $(date -u +%FT%TZ)"
    DEPLOY

# Internal: run one shell command on the Spark, base64-hopped so quotes/$/braces survive.
[no-cd]
_dgx-exec cmd:
    #!/usr/bin/env bash
    set -euo pipefail
    key="${DGX_KEY:-$HOME/.ssh/.dgx_session_key}"
    user="${DGX_USER:-{{dgx_user}}}"; host="${DGX_HOST:-{{dgx_host}}}"
    [ -f "$key" ] || { echo "fatal: ssh key '$key' not found (set DGX_KEY)." >&2; exit 1; }
    enc="$(printf '%s' '{{cmd}}' | base64 | tr -d '\n')"
    ssh -i "$key" -o StrictHostKeyChecking=no "$user@$host" "echo $enc | base64 -d | bash"

# Rebuild a built-in extension's web dist (or "all") from source, locally.
# Refreshes the committed dist; the image rebuilds it too (Dockerfile).
[no-cd]
ext-build ext="all":
    #!/usr/bin/env bash
    set -euo pipefail
    root="{{justfile_directory()}}"
    build_one() {
        d="$1"
        [ -f "$d/package.json" ] || { echo "skip $d (no package.json)"; return 0; }
        [ -d "$d/node_modules" ] || { echo "skip $d (no node_modules — install deps there first)"; return 0; }
        echo ">>> building $d"
        ( cd "$d" && node node_modules/typescript/bin/tsc --noEmit && node node_modules/vite/bin/vite.js build )
        echo ">>> done $d"
    }
    if [ "{{ext}}" = "all" ]; then
        for pj in "$root"/extensions/builtin/*/web/package.json; do build_one "$(dirname "$pj")"; done
    else
        build_one "$root/extensions/builtin/{{ext}}/web"
    fi

# Typecheck + lint a web surface (path to a dir with package.json). Tests if present.
[no-cd]
web-verify dir:
    #!/usr/bin/env bash
    set -euo pipefail
    cd "{{dir}}"
    echo "=== tsc ==="; node node_modules/typescript/bin/tsc --noEmit
    if [ -x node_modules/@biomejs/biome/bin/biome ]; then echo "=== biome lint ==="; node node_modules/@biomejs/biome/bin/biome lint src; fi
    if [ -f node_modules/vitest/vitest.mjs ]; then echo "=== vitest ==="; node node_modules/vitest/vitest.mjs run; fi

# Fail if any committed extension dist is stale vs a fresh build.
[no-cd]
dist-check:
    #!/usr/bin/env bash
    set -euo pipefail
    just --justfile "{{justfile()}}" ext-build all
    root="{{justfile_directory()}}"
    if ! git -C "$root" diff --quiet -- 'extensions/builtin/*/web/dist'; then
        echo "STALE DIST — committed dist differs from a fresh build:"
        git -C "$root" --no-pager diff --stat -- 'extensions/builtin/*/web/dist'
        exit 1
    fi
    echo "OK: all extension dists match source."

# Show the live nexusdnn image tag + every dgx-fixNN image on the Spark.
[no-cd]
dgx-tag:
    @just --justfile "{{justfile()}}" _dgx-exec 'echo "live:"; docker ps --filter name=nexusdnn --format "{{{{.Image}}"; echo "images:"; docker images ldilov/nexusdnn --format "{{{{.Tag}}" | sort'

# Copy a LOCAL file INTO a running container (local -> Spark /tmp -> docker cp).
# Hot-patch a source file or stage a request body. dest = absolute path in container.
[no-cd]
dgx-cp-into src dest container="nexusdnn":
    #!/usr/bin/env bash
    set -euo pipefail
    export MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*'
    key="${DGX_KEY:-$HOME/.ssh/.dgx_session_key}"
    user="${DGX_USER:-{{dgx_user}}}"; host="${DGX_HOST:-{{dgx_host}}}"
    [ -e "{{src}}" ] || { echo "fatal: local source '{{src}}' not found." >&2; exit 1; }
    base="$(basename "{{src}}")"
    scp -i "$key" -o StrictHostKeyChecking=no "{{src}}" "$user@$host:/tmp/$base"
    just --justfile "{{justfile()}}" _dgx-exec "docker cp /tmp/$base {{container}}:{{dest}} && echo 'copied -> {{container}}:{{dest}}'"

# Copy a file OUT of a running container to a LOCAL path (docker cp -> Spark /tmp -> local).
[no-cd]
dgx-cp-out src local="." container="nexusdnn":
    #!/usr/bin/env bash
    set -euo pipefail
    export MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*'
    key="${DGX_KEY:-$HOME/.ssh/.dgx_session_key}"
    user="${DGX_USER:-{{dgx_user}}}"; host="${DGX_HOST:-{{dgx_host}}}"
    base="$(basename "{{src}}")"
    just --justfile "{{justfile()}}" _dgx-exec "docker cp {{container}}:{{src}} /tmp/$base"
    scp -i "$key" -o StrictHostKeyChecking=no "$user@$host:/tmp/$base" "{{local}}"
    echo ">>> pulled -> {{local}}"

# Curl a host API path from INSIDE the container (localhost:3000). method=GET by
# default; body= a LOCAL json file sent as -d @ (avoids quoting JSON over ssh).
# e.g. just dgx-api /api/v1/extensions/nexus.3d.trellis2/deployments/x/runs
[no-cd]
dgx-api path method="GET" body="" container="nexusdnn":
    #!/usr/bin/env bash
    set -euo pipefail
    if [ -n "{{body}}" ]; then
        just --justfile "{{justfile()}}" dgx-cp-into "{{body}}" /tmp/_apibody.json "{{container}}" >/dev/null
        just --justfile "{{justfile()}}" _dgx-exec "docker exec {{container}} curl -s -X {{method}} -H 'content-type: application/json' -d @/tmp/_apibody.json 'localhost:3000{{path}}'"
    else
        just --justfile "{{justfile()}}" _dgx-exec "docker exec {{container}} curl -s -X {{method}} 'localhost:3000{{path}}'"
    fi

# Trigger an extension install on the live host + print the install run id.
[no-cd]
dgx-ext-install ext container="nexusdnn":
    @just --justfile "{{justfile()}}" _dgx-exec "docker exec {{container}} curl -s -X POST -H 'content-type: application/json' -d '{}' 'localhost:3000/api/v1/extensions/{{ext}}/install'; echo"

# Inspect a GLB (local): metallicFactor + base-color mean + material/texture/image counts.
[no-cd]
glb-inspect glb:
    #!/usr/bin/env bash
    set -euo pipefail
    python - "{{glb}}" <<'PY'
    import json, struct, io, sys
    d = open(sys.argv[1], "rb").read()
    off = 12; jl, _ = struct.unpack("<II", d[off:off + 8]); off += 8
    j = json.loads(d[off:off + jl]); off += jl
    print("materials/textures/images:", len(j.get("materials", [])), len(j.get("textures", [])), len(j.get("images", [])))
    for i, m in enumerate(j.get("materials", [])):
        pbr = m.get("pbrMetallicRoughness", {})
        print(f"  mat{i} metallicFactor={pbr.get('metallicFactor')} roughnessFactor={pbr.get('roughnessFactor')}")
    try:
        from PIL import Image
        bl, _ = struct.unpack("<II", d[off:off + 8]); off += 8; bina = d[off:off + bl]
        if j.get("images"):
            bv = j["bufferViews"][j["images"][0]["bufferView"]]; s = bv.get("byteOffset", 0)
            im = Image.open(io.BytesIO(bina[s:s + bv["byteLength"]])).convert("RGB")
            px = list(im.getdata()); n = len(px)
            print("  baseColor mean RGB:", tuple(round(sum(p[k] for p in px) / n, 1) for k in range(3)))
    except Exception as e:
        print("  (base-color skipped:", e, ")")
    PY

# Verify a builtin extension: worker pytest + web tsc/biome/vitest.
[no-cd]
ext-verify ext:
    #!/usr/bin/env bash
    set -euo pipefail
    root="{{justfile_directory()}}"
    w="$root/extensions/builtin/{{ext}}/worker"
    if [ -d "$w" ]; then
        echo "=== worker pytest ($w) ==="
        ( cd "$w" && PYTHONPATH=src python -m pytest tests/ -q )
    fi
    web="$root/extensions/builtin/{{ext}}/web"
    if [ -d "$web" ]; then just --justfile "{{justfile()}}" web-verify "$web"; fi
