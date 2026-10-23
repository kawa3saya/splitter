# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Seppaaan (repo/worker name: `splitter`) is a no-sign-up group expense splitter for trips: create a trip with members and currencies, log payments in any currency, and get a minimized settlement list in the trip's base currency. Next.js 16 App Router + React 19, Supabase (Postgres), deployed to Cloudflare Workers via `@opennextjs/cloudflare`.

## Commands

```bash
npm run dev         # Next dev server (Turbopack); initOpenNextCloudflareForDev() in next.config.ts wires Cloudflare bindings
npm run build       # next build --turbopack
npm run lint        # eslint (flat config, next/core-web-vitals + typescript)
npm run preview     # OpenNext build + local Workers preview (closest to production)
npm run deploy      # OpenNext build + deploy to Cloudflare
npm run cf-typegen  # regenerate cloudflare-env.d.ts from wrangler.jsonc
```

There is no test suite. Verify changes with `npm run lint` and `npm run build` (type-checks).

Required env (in `.env.local`, which Claude is denied from reading): `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`. Optional: `NEXT_PUBLIC_SITE_URL` overrides the canonical origin in `src/constants/site.ts` (metadata, robots, sitemap, JSON-LD); it defaults to the production Workers URL.

## Architecture

### Data access: server-only, service role, no auth
- `src/lib/supabase.ts` exports a lazily-created, `server-only` Supabase client using the **service role key**. It's a Proxy so `next build` doesn't need the secret at build time — keep it lazy.
- RLS is enabled on every table with **no policies** (`supabase/migrations/20260509000000_enable_rls_on_all_tables.sql`), so the anon key has zero access. All DB access must go through server actions / server components.
- There is no user authentication; a trip's UUID in the URL is the access token. Because of that, every server action must **scope by `trip_id`** and verify that referenced users/currencies/payments belong to the trip (see `create-payment.ts`, `delete-payment.ts`) and re-validate input with the zod schema (`schema.parse(data)`) even though the client already validated.

### Schema & types
- Tables: `trips` → `users` (trip members, not auth users), `currencies` (allowed per trip), `payments` (payer = `user_id`) → `debtors` (one row per person sharing the payment).
- Payments and debtors are **soft-deleted** via `deleted_at`; queries must filter `deleted_at IS NULL` (e.g. `.is("payments.deleted_at", null)`).
- `database.types.ts` (repo root) is generated Supabase types; `src/types/type.ts` re-exports Row types. When adding a migration in `supabase/migrations/`, regenerate/update `database.types.ts` to match.

### Multi-currency model
- Each payment stores original `amount`/`currency_id` plus `rate_to_base` and `amount_in_base_currency`, frozen at write time. Debtors store `amount_owed` and `amount_owed_in_base` (base amount split evenly, rounded to 2 decimals).
- Rates come from the Frankfurter API (`src/utils/get-exchange-rate.ts`) using the payment's `paid_at` as a **UTC** `YYYY-MM-DD` date, falling back to `latest` on 404. Same-currency payments use rate 1.
- Settlement (`src/app/trips/[id]/settlement/_utils/`) works only on base-currency amounts: `calculateBalances` computes net per user, `buildSettlements` greedily matches largest payers/receivers to minimize transfers. The payer is not included in `debtors` unless they share the cost.

### Route-colocated feature folders
Each route under `src/app/trips/` keeps its own private folders (underscore-prefixed, not routed):
- `_actions/` — `"use server"` functions (DB reads/writes)
- `_hooks/` — `"use client"` hooks that call actions, manage `loading`, show `sonner` toasts, and `router.refresh()`
- `_schema/` + `_types/` (or `_type/`) — zod schema and its inferred form type, used by react-hook-form via `@hookform/resolvers`
- `_components/`, `_utils/`

Pages are async server components that call a `get*` action and `notFound()` on null. Imports use the `@/*` → `src/*` alias.

### UI
- shadcn/ui components live in `src/components/ui/` (`components.json`), built on Radix / Base UI, Tailwind v4, `lucide-react` icons.
- Custom spacing tokens in `src/app/globals.css` (`xxs`, `xs`, `s`, `m`, `l`, `xl`, `header`, `footer`, `content`) — use classes like `p-s`, `gap-xs`, `min-h-content` rather than numeric spacing where the codebase does.
- UI copy is English; code comments and docs are often Japanese.

## Branches & deploy
`main` is the integration branch; `stg` and `prod` are environment branches that receive merges/PRs ("prod反映"). PRs use `.github/PULL_REQUEST_TEMPLATE.md` (Summary / Changes / Checklist / Notes). SEO/metadata conventions are documented in `docs/seo-guide.md`.
