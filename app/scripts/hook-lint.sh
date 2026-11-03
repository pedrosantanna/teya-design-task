#!/usr/bin/env bash
# Claude Code PostToolUse hook (Edit|Write): lint the file the agent just changed under app/.
# Reads the hook payload on stdin. Exit 2 sends the lint output back to the agent.
set -uo pipefail

app_dir="$(cd "$(dirname "$0")/.." && pwd)"
file="$(jq -r '.tool_input.file_path // empty' 2>/dev/null)"

[[ -z "$file" ]] && exit 0
case "$file" in
  "$app_dir"/node_modules/* | "$app_dir"/dist/* | "$app_dir"/.expo/*) exit 0 ;;
  "$app_dir"/*.ts | "$app_dir"/*.tsx | "$app_dir"/*.js | "$app_dir"/*.mjs) ;;
  *) exit 0 ;;
esac
[[ -f "$file" && -d "$app_dir/node_modules" ]] || exit 0

if ! output="$(cd "$app_dir" && npx --no-install eslint --no-warn-ignored "$file" 2>&1)"; then
  echo "ESLint failed for ${file#"$app_dir"/}. Fix these before going on (see app/src/design-system/AGENTS.md):" >&2
  echo "$output" >&2
  exit 2
fi
exit 0
