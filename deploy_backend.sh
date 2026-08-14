#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="/opt/corecount/workspace/prj-001-uppitt-backend"
COMPOSE_DIR="/opt/corecount"

cd "$REPO_DIR"

# Safety: refuse to deploy if someone edited files on-server
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "ERROR: Local changes exist in $REPO_DIR. Commit/stash or reset before deploying."
  git status --porcelain
  exit 1
fi

echo "Fetching latest from GitHub..."
git fetch origin

echo "Checking out main and fast-forwarding..."
git checkout main
git pull --ff-only origin main

echo "Deployed commit: $(git rev-parse --short HEAD) ($(git log -1 --pretty=%s))"
echo

cd "$COMPOSE_DIR"

echo "Recreating backend container..."
docker compose up -d --no-deps --force-recreate backend

echo
echo "Container status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Image}}" | sed -n '1,10p'

echo
echo "Backend logs (last 30 lines):"
docker logs --tail 30 corecount-backend-1
