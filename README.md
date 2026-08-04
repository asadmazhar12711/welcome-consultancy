# Welcome Consultancy

Mobile-first Next.js (App Router) + Cloudflare Workers + D1 platform for DGFT & EXIM advisory.

## Stack

- Next.js 15 + TypeScript + `@opennextjs/cloudflare`
- Cloudflare Workers (`wrangler.jsonc`)
- Cloudflare D1 (`schema.sql`)

## Local development

```bash
npm install
npm run db:local
npm run dev
```

Admin password is set in `.dev.vars` as `ADMIN_PASSWORD`.

## Preview / deploy

```bash
npm run preview
npm run deploy
```

Replace `database_id` in `wrangler.jsonc` with your real D1 id, then run `npm run db:remote`.

## Key routes

| Path | Purpose |
|------|---------|
| `/` | Homepage + calculators + booking |
| `/services/[slug]` | 16 EXIM service pages |
| `/contact?service=epcg-license` | Inquiry form with service pre-fill |
| `/tools` | RoDTEP, EPCG, checklist tools |
| `/book` | Consultation slot calendar |
| `/admin` | Lead / slot / ticker CMS |
