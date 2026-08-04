---
name: anti-ai-code-craftsmanship
description: Ensures written code reads as handcrafted, high-end production code without AI comments or code smells.
---

# Anti-AI Code Craftsmanship Skill

Use this skill whenever writing or refactoring code across the Welcome Consultancy project to ensure human-level precision.

## Guidelines

1. **Eliminate AI Commentary**:
   - Never add comments attributing code to AI.
   - Avoid stating obvious code actions (`// Setting variable x`).
   - Write clear, intentional domain comments for complex EXIM logic.

2. **No Superficial Error Swallowing**:
   - Handle exceptions with informative console or UI errors.
   - Avoid returning fake fallback objects (`{ error: false }`) without real verification.

3. **Production Elegance**:
   - Modular CSS variables for Deep Navy (`#0F172A`), Warm Gold (`#D4AF37`), and surface slate tones.
   - Consistent formatting, typed function signatures, and explicit clean return types.
