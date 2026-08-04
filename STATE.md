STATE.md — Welcome Consultancy platform

## Current Task
Complete Next.js + Cloudflare Workers + D1 platform.

## Completed Work
- Next.js 15 + OpenNext Cloudflare + wrangler.jsonc + schema.sql
- 16 service pages, SEO (sitemap/robots/llms/JSON-LD), navy/gold UI
- CRO: RoDTEP, EPCG, checklist, booking, sticky CTAs, exit popup
- Edge APIs + Admin CMS (HMAC session, PII-safe public slots)
- Smoke: pages 200, leads/slots/admin verified on localhost:3000

## Remaining Work
- Bind real D1 `database_id` + `wrangler secret put ADMIN_PASSWORD` before deploy
- Browser visual/a11y pass when Playwright extension available

## Known Issues
- Placeholder D1 database_id in wrangler.jsonc
- Graphify module not installed in default Python env

## Next Recommended Action
`npm run deploy` after Cloudflare D1 create + secret set.

## Last run
2026-07-29 — security rework after checker REJECT
