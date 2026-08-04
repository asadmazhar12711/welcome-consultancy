---
name: accessibility-auditing
description: Audit accessibility tree for missing labels, broken tab order, ARIA misuse, and color contrast.
---

# Accessibility Auditing Skill

Use this skill when creating forms, interactive calculators, slot schedulers, and navigation menus.

## Requirements

1. Every form `<input>` must have an associated `<label>` or `aria-label`.
2. Every interactive button must have accessible visible text or `aria-label`.
3. Keyboard navigation (Tab / Shift+Tab) must cycle through form inputs and buttons logically.
4. Maintain minimum WCAG 2.1 AA color contrast (4.5:1 ratio for standard text).
