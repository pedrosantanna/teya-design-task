#!/usr/bin/env bash
# Claude Code Stop hook: run `npm run check` (lint, types, token drift) before the agent finishes.
# Exit 2 keeps the agent working with the failures. If the agent is already continuing because of
# this hook and the check still fails, report to the user instead of looping (exit 1).
set -uo pipefail

app_dir="$(cd "$(dirname "$0")/.." && pwd)"
[[ -d "$app_dir/node_modules" ]] || exit 0
active="$(jq -r '.stop_hook_active // false' 2>/dev/null || echo false)"

if ! output="$(npm --prefix "$app_dir" run -s check 2>&1)"; then
  echo "npm run check failed in app/:" >&2
  echo "$output" | tail -60 >&2
  [[ "$active" == "true" ]] && exit 1
  exit 2
fi
exit 0
