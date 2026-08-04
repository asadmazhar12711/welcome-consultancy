---
name: profiling-performance
description: Profile Core Web Vitals (LCP, INP, CLS) to guarantee LCP <= 2.5s, INP <= 200ms, and CLS <= 0.1.
---

# Performance Profiling & Optimization Skill

Use this skill when optimizing page load speed and Core Web Vitals.

## Benchmarks

- **Largest Contentful Paint (LCP)**: ≤ 2.5 seconds
- **Interaction to Next Paint (INP)**: ≤ 200 milliseconds
- **Cumulative Layout Shift (CLS)**: ≤ 0.1

## Techniques

1. Preload Google Fonts (`Newsreader`, `Manrope`).
2. Specify explicit `width` and `height` attributes on image elements to prevent layout shifts.
3. Defer or asynchronously load non-critical third-party analytics scripts (GTM, GA4, Clarity).
4. Minify CSS/JS assets and leverage Cloudflare edge caching.
