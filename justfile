# nexus-dnn project tasks — DGX Spark deploy + remote ops.
# List: just --list   |   Deploy from main: just dgx-deploy

dgx_user := "ldilov"
dgx_host := "192.168.50.22"

# List available recipes.
default:
    @just --list

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
    key="${DGX_KEY:-$HOME/.ssh/.dgx_session_key}"
    user="${DGX_USER:-{{dgx_user}}}"; host="${DGX_HOST:-{{dgx_host}}}"
    if command -v rsync >/dev/null 2>&1; then
        rsync -avhP -e "ssh -i $key -o StrictHostKeyChecking=no" "$user@$host:{{src}}" "{{dest}}"
    else
        scp -i "$key" -o StrictHostKeyChecking=no -r "$user@$host:{{src}}" "{{dest}}"
    fi

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
