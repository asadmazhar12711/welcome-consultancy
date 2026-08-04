---
name: stripe-saas-design-system
description: Enables Cursor to build world-class, Stripe- and Linear-grade SaaS web interfaces with calm design, bento grids, dark mode mesh gradients, glowing spotlight cards, and product-led interactive components.
---

# Stripe/Linear SaaS Design System Skill

Use this skill whenever designing, building, or refactoring web interfaces, landing pages, dashboards, or components to ensure they achieve the aesthetic and functional standards of **Stripe, Linear, and Vercel in 2026**.

## 1. Core Visual Architecture & Calm Design
- **Obsidian & Slate Dark Mode**: Avoid pure `#000000` backgrounds. Use rich deep slate and obsidian tones:
  - `--bg-obsidian: #030712;` (Primary dark background)
  - `--bg-surface: #0B0F19;` (Card / Modal background)
  - `--bg-elevated: #111827;` (Hovered / elevated cards)
- **Subtle Glass & Border System**:
  - Border: `1px solid rgba(255, 255, 255, 0.08)`
  - Elevated Border: `1px solid rgba(255, 255, 255, 0.16)`
  - Glassmorphic Backdrop: `backdrop-blur-xl bg-slate-950/75`
- **Typography & Hierarchy**:
  - Primary font: `Inter` or `Geist Sans` or `Plus Jakarta Sans`.
  - Use tracking-tight (`-0.03em`) on hero titles and section headers.
  - Pair crisp white titles (`#F9FAFB`) with muted slate descriptions (`#94A3B8`).

## 2. Bento Grid Layouts (2026 Standard)
- Organize features and service catalogs into modular **Bento Grid boxes** instead of boring vertical cards.
- Use CSS Grid (`grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4`) with varied card spans (`col-span-2 row-span-2` for primary features).
- **Interactive Bento Cells**: Every bento card should have:
  - Subtle top-right icon badge or status indicator.
  - Hover glow spotlight effect (`hover:border-gold-500/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]`).
  - Clear micro-CTA (`Explore ->` with arrow translation on hover).

## 3. Product-Led Above-The-Fold Architecture
- **Never use generic hero illustrations** or empty stock photos.
- **Show Real Product UI Above The Fold**: Embed interactive calculators, live booking calendars, duty estimators, or interactive tool tabs directly inside or alongside the Hero section.
- Give visitors immediate interactive utility without requiring them to sign up first.

## 4. Glowing Spotlights & Warm Gold Institutional Accents
- For corporate financial/trade platforms, pair Deep Obsidian (`#030712`) with **Warm Imperial Gold (`#D4AF37`)** for buttons, badges, and active tab borders.
- Use Cyan (`#06B6D4`) or Emerald (`#10B981`) accents strictly for financial incentive calculations (e.g., RoDTEP refunds, duty savings).
- Use CSS radial gradients for background spotlight glows:
  ```css
  background: radial-gradient(800px circle at 50% 0%, rgba(212, 175, 55, 0.12), transparent 70%);
  ```

## 5. Anti-Patterns to NEVER Use
- ❌ No bright white blinding backgrounds as default.
- ❌ No generic Bootstrap/Tailwind standard blue buttons (`bg-blue-500`).
- ❌ No static, wall-of-text service descriptions without visual hierarchy or icons.
- ❌ No AI attribution comments (`// AI generated`, `/* ChatGPT */`) or superficial wrappers.
