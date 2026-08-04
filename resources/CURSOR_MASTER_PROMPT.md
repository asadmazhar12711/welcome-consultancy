# Master Execution Prompt for Cursor AI

Copy and paste the following prompt into Cursor to build the **Welcome Consultancy** digital platform autonomously:

```markdown
You are an expert Next.js and Cloudflare Edge engineer. Build the complete, mobile-first, high-converting digital platform for Welcome Consultancy strictly adhering to project rules and specifications:

1. **Stack & Cloudflare Edge Targets**:
   - Framework: Next.js 14+ (App Router, TypeScript).
   - Deployment Platform: Cloudflare Workers edge network (`wrangler`).
   - Database: Cloudflare D1 Database (`schema.sql` with `leads`, `consultation_slots`, `news_ticker` tables).
   - Design System: Deep Navy (`#0F172A`) & Warm Gold (`#D4AF37`), cool chalk surfaces, Newsreader + Manrope, floating island nav. Benchmark taxonomy: Kireeti Consultants (`kireeticonsultants.com`).

2. **Mobile-First Priority & Responsive Design**:
   - Mobile-first layout with fluid breakpoints for mobile, tablet, and desktop.
   - Touch-friendly tap targets (minimum 44px x 44px).
   - Sticky WhatsApp (`+91 98671 73397`) & Phone CTAs across all mobile viewports.

3. **Master Requirements & SEO / AIO / GEO Engine**:
   - Follow all requirements in `resources/PROJECT_REQUIREMENTS_PRD.md`.
   - Preserved 16 EXIM service paths under `/services/[slug]`.
   - Technical SEO compliance from `resources/Technical SEODevelopmentRequirements.pdf` (Semantic HTML, single H1 per page, dynamic canonicals, OpenGraph, Twitter Card).
   - AIO & GEO Optimization: Direct answer summaries in section introductory paragraphs, and valid `public/llms.txt` file for AI agents (ChatGPT, Perplexity, Gemini, Claude).

4. **Interactive Service Context Pre-filling & CRO Magnets**:
   - Clicking any "Inquire" or "Apply" button on service cards/pages MUST pass query parameters (`/contact?service=epcg-license`) to pre-fill the inquiry form dynamically!
   - RoDTEP / Duty Drawback Incentive Calculator.
   - EPCG Duty Savings Estimator.
   - Custom EXIM Document Checklist Generator.
   - Live Consultation Slot Booking Calendar (synced with D1 `consultation_slots` table).
   - Exit-Intent / Quick Callback Popup Modal.

5. **Admin CMS & Lead Command Center (`/admin`)**:
   - Lead Pipeline displaying client **Mobile Numbers** as primary actionable item (with one-click Call and WhatsApp triggers).
   - Filter leads by source, status workflow, and CSV log export.
   - Slot Availability Manager & News Ticker Manager.

6. **Craftsmanship Standards**:
   - Strictly follow `.cursorrules` and `.cursor/rules/anti-ai-code-style.mdc`.
   - Use skills in `.cursor/skills/` (visual-qa-testing, accessibility-auditing, form-testing, profiling-performance, auto-type-checking).
   - NO AI code smells, AI commentary, or swallowed exceptions.
```
