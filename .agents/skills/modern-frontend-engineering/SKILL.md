---
name: modern-frontend-engineering
description: Instructs Cursor on implementing fluid animations, Framer Motion-style CSS micro-interactions, accordion drawers, interactive SaaS calculators, and zero-jank responsive transitions.
---

# Modern Frontend Engineering Skill

Use this skill when building or refactoring interactive UI components, animations, calculators, drawers, modals, or forms to ensure zero-jank, 60 FPS fluidity.

## 1. CSS & DOM Micro-Interactions
- **Hover Transitions**: Always use `transition-all duration-300 ease-out` on cards, buttons, and badges.
- **Transform Feedback**:
  - Cards: `hover:-translate-y-1 hover:shadow-2xl`
  - Buttons: `active:scale-95 hover:brightness-110`
  - Arrows: `group-hover:translate-x-1`
- **Spotlight Cards**: Apply a subtle glowing border on hover using Tailwind border utilities or custom CSS variables.

## 2. Interactive SaaS Widgets & Calculators
- Always provide **immediate visual calculation** as user inputs change—no page reload required.
- Format currency values dynamically with `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`.
- Use animated number counters or smooth value transitions when results update.

## 3. Responsive Layout Shift Prevention (CLS ≤ 0.1)
- Reserve explicit height and width for dynamic elements, badges, and icons.
- Ensure bento grids collapse gracefully from 4 columns on desktop (`lg:grid-cols-4`) to 2 on tablet (`md:grid-cols-2`) and 1 column on mobile (`grid-cols-1`).

## 4. Accessibility Built-in
- Ensure all interactive controls have `aria-label` or clear text labels.
- Maintain WCAG AA color contrast (`4.5:1` for body text, `3:1` for large headers) even in obsidian dark mode.
