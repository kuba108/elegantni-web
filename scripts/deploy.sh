#!/usr/bin/env bash

set -euo pipefail

REPO_URL=${DEPLOY_REPO_URL:-$(git config --get remote.origin.url 2>/dev/null || true)}
BRANCH=${DEPLOY_GIT_BRANCH:-$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")}
REMOTE_USER=${DEPLOY_REMOTE_USER:-deploy}
REMOTE_HOST=${DEPLOY_REMOTE_HOST:-217.16.188.195}
REMOTE_PATH=${DEPLOY_REMOTE_PATH:-/var/www/production/elegantni_web}
SERVICE_NAME=${DEPLOY_SERVICE_NAME:-elegantni_web-node}
REMOTE="${REMOTE_USER}@${REMOTE_HOST}"
FORWARD_AGENT=${DEPLOY_FORWARD_AGENT:-true}

if [[ -z "${REPO_URL}" ]]; then
  echo "Unable to determine git remote URL. Set DEPLOY_REPO_URL." >&2
  exit 1
fi

echo "Deploying branch '${BRANCH}' to ${REMOTE}:${REMOTE_PATH}"

SSH_ARGS=()
if [[ "${FORWARD_AGENT}" == "true" ]]; then
  SSH_ARGS+=("-o" "ForwardAgent=yes")
fi

ssh "${SSH_ARGS[@]}" "${REMOTE}" "bash -s" <<EOF
set -euo pipefail

REPO_URL="${REPO_URL}"
BRANCH="${BRANCH}"
APP_DIR="${REMOTE_PATH}"
SERVICE_NAME="${SERVICE_NAME}"

command -v git >/dev/null || { echo "git is required on the server." >&2; exit 1; }
command -v node >/dev/null || { echo "node is required on the server." >&2; exit 1; }

mkdir -p "\${APP_DIR}"
if [ ! -d "\${APP_DIR}/.git" ]; then
  echo "Cloning repository into \${APP_DIR}"
  git clone "\${REPO_URL}" "\${APP_DIR}"
fi

cd "\${APP_DIR}"
git fetch origin
if git show-ref --verify --quiet "refs/heads/\${BRANCH}"; then
  git checkout "\${BRANCH}"
else
  git checkout -b "\${BRANCH}" "origin/\${BRANCH}"
fi
git reset --hard "origin/\${BRANCH}"

# ensure PNPM is on PATH
source /var/www/.nvm/nvm.sh
nvm use

pnpm install --frozen-lockfile
pnpm run build

if command -v systemctl >/dev/null && systemctl list-unit-files | grep -q "^\\s*\${SERVICE_NAME}.service"; then
  echo "Restarting systemd service \${SERVICE_NAME}"
  systemctl restart "\${SERVICE_NAME}"
  systemctl status "\${SERVICE_NAME}" --no-pager
else
  echo "systemd service '\${SERVICE_NAME}' not found. Start the app manually (e.g. 'pnpm run start') or create a systemd unit." >&2
fi
EOF
