#!/usr/bin/env bash
set -uo pipefail

if ! command -v jq >/dev/null 2>&1; then
  echo "jq が見つからないため Bash ガードを適用できません。jq を入れてください。" >&2
  exit 2
fi

cmd=$(jq -r '.tool_input.command // ""') || exit 2   # 不正 JSON も fail-closed に

# ガードレール自体（設定・フック）の変更を禁止
if printf '%s' "$cmd" | grep -qE '\.claude/(settings|hooks)'; then
  echo "ガードレール設定の変更は Claude からは行えません。手動で編集してください: $cmd" >&2
  exit 2
fi

# force push 検出（引数順・結合フラグ・+refspec に対応。\047 は ' のエスケープ）
FORCE_PUSH=$'push([[:space:]]+[^|;&]*)?[[:space:]]+(--force(-with-lease)?([[:space:]]|$)|-[[:alnum:]]*f[[:alnum:]]*([[:space:]]|$))|push[[:space:]]+[^|;&]*[[:space:]]["\047]?[+][^[:space:]]+'

# 本番・DB に影響する操作を禁止
if printf '%s' "$cmd" | grep -qE '(wrangler|opennextjs-cloudflare)[[:space:]]+([^|;&]*[[:space:]])?deploy|npm[[:space:]]+run[[:space:]]+deploy|db[[:space:]]+(reset|push)|supabase[[:space:]]+migration[[:space:]]+up' \
  || printf '%s' "$cmd" | grep -qE "$FORCE_PUSH"; then
  echo "本番・DBに影響する操作なので手動で実行してください: $cmd" >&2
  exit 2
fi
exit 0