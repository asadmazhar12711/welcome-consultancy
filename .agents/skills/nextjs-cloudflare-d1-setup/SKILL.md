---
name: nextjs-cloudflare-d1-setup
description: Guides project setup and edge database integration for Next.js App Router deployed on Cloudflare Pages and Cloudflare D1.
---

# Next.js & Cloudflare D1 Setup Skill

Use this skill when initializing or configuring Next.js App Router for Cloudflare Pages and Cloudflare D1.

## Key Requirements

1. **Edge Runtime Declaration**:
   - Every API route and page using D1 MUST include `export const runtime = 'edge';`.

2. **Cloudflare D1 Database Configuration (`wrangler.toml`)**:
   ```toml
   name = "welcome-consultancy"
   compatibility_date = "2024-09-01"

   [[d1_databases]]
   binding = "DB"
   database_name = "welcome-consultancy-db"
   database_id = "your-d1-database-id"
   ```

3. **Schema Execution**:
   - Execute database schema using `wrangler d1 execute welcome-consultancy-db --file=./schema.sql`.

4. **Edge API Route Patterns**:
   - Use `const { DB } = getRequestContext().env;` or D1 binding interface to query SQLite.
   - Always return `Response.json()` or `NextResponse.json()`.
