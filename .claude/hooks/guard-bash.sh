#!/usr/bin/env bash
cmd=$(jq -r '.tool_input.command // ""')

# ガードレール自体（設定・フック）の変更を禁止
if printf '%s' "$cmd" | grep -qE '\.claude/(settings|hooks)'; then
  echo "ガードレール設定の変更は Claude からは行えません。手動で編集してください: $cmd" >&2
  exit 2
fi

# 本番・DB に影響する操作を禁止
if printf '%s' "$cmd" | grep -qE '(wrangler|opennextjs-cloudflare)[[:space:]]+([^|;&]*[[:space:]])?deploy|npm[[:space:]]+run[[:space:]]+deploy|db[[:space:]]+(reset|push)|push[[:space:]]+(--force|-f)|supabase[[:space:]]+migration[[:space:]]+up'; then
  echo "本番・DBに影響する操作なので手動で実行してください: $cmd" >&2
  exit 2
fi
exit 0
