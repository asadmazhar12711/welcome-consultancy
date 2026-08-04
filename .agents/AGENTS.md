# Welcome Consultancy - Workspace Agent Rules (Stripe/Linear SaaS Standard)

These rules govern all AI agent interactions and automated coding tasks within the Welcome Consultancy project repository.

## Guiding Principles

1. **Stripe/Linear SaaS UI/UX Aesthetics (2026 Gold Standard)**:
   - **Zero Basic/Conventional Web Design**: Do NOT create generic white background consulting websites or boring vertical card stacks.
   - **Obsidian Dark Mode**: Use Deep Obsidian (`#030712`), Slate Surfaces (`#0B0F19`), and Elevated Cards (`#111827`) with subtle glass borders (`1px solid rgba(255, 255, 255, 0.08)`).
   - **Institutional Gold & Financial Glow**: Pair obsidian backgrounds with Warm Imperial Gold (`#D4AF37`) for institutional authority and subtle Cyan (`#06B6D4`) / Emerald (`#10B981`) glows for RoDTEP/EPCG incentive calculation metrics.
   - **Bento Grid Architecture**: Display all 16 DGFT services, feature catalogs, and metrics inside structured Bento Grid cells with spotlight hover glow effects (`hover:border-gold-500/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]`).
   - **Product-Led Hero (Above The Fold)**: Never use static hero illustrations. Display real interactive product widgets (RoDTEP Calculator, EPCG Estimator, Live Booking Calendar) above the fold.
   - **Typography**: Modern, crisp sans-serif (`Inter`, `Geist`, or `Plus Jakarta Sans`) with tight tracking on hero titles.

2. **Tech Stack & Deployment**:
   - Modern Next.js (App Router) + Cloudflare Workers + Cloudflare D1 Database.
   - Fully edge-compatible with parameterized D1 SQL queries.

3. **Human-Grade Code Standards**:
   - Produce clean, elegant, maintainable code without AI code smells, AI attribution comments, or superficial try/catch wrappers.
   - Preserves all docstrings, comments, and structure established in the repository.

4. **Technical SEO First**:
   - Enforce semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Guarantee single `<h1>` hierarchy per page.
   - Enforce JSON-LD schemas (`LocalBusiness`, `ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`).
   - Enforce Core Web Vitals (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1).

5. **High-Converting UX/UI & CRO**:
   - Palette: Deep Obsidian (`#030712`) & Warm Imperial Gold (`#D4AF37`).
   - Sticky WhatsApp (`+91 98671 73397`) & Phone CTAs.
   - Interactive EXIM tools: RoDTEP Incentive Calculator, EPCG Duty Estimator, EXIM Document Checklist Generator.
   - Live Consultation Slot Booking Calendar.

6. **Admin CMS & Lead Management**:
   - Primary lead display highlights client mobile numbers.
   - Categorizes lead sources accurately.
   - Manages slot booking availability via Cloudflare D1 database.
