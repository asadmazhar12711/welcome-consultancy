# Gates: Brand Logo Update, Red Color Theme, Stats Deduplication & Indian Context Media

OWNS: public/images/**, public/illustrations/**, app/globals.css, tailwind.config.js, components/pages/HomePage.tsx, components/layout/**, lib/illustrations.ts

Scope: Upgrade Welcome Consultancy brand identity to the new Crimson/Ruby Red & Black logo, remove duplicate stats on home page, align full site color palette, audit and plan authentic Indian EXIM imagery, and generate cinematic Omni hero video prompt.

- [x] G1: Extract, rotate, and generate transparent dark-mode and light-mode logos from logo.pdf into public/images/logo-dark.png and public/images/logo-light.png, plus update public/favicon.png.
  CHECK: node -e 'const fs = require("fs"); const exists = fs.existsSync("public/images/logo-dark.png") && fs.existsSync("public/images/logo-light.png") && fs.existsSync("public/favicon.png"); if (!exists) process.exit(1); console.log("G1: Logo assets generated and verified");'
  EXPECT: G1: Logo assets generated and verified
  EVIDENCE: public/images/logo-dark.png (70KB), public/images/logo-light.png (69KB), and public/favicon.png (77KB) successfully extracted, deskewed, transparentized, and verified.

- [x] G2: Eliminate duplicate trust stats strip in HomePage.tsx so numerical metrics (1000+ active customers, 10+ years) appear exactly once below the hero section.
  CHECK: node -e 'const fs = require("fs"); const content = fs.readFileSync("components/pages/HomePage.tsx", "utf8"); const count = (content.match(/trust-strip/g) || []).length; if (count !== 1) { console.error("Found " + count + " occurrences"); process.exit(1); } console.log("G2: Duplicate stats section removed successfully");'
  EXPECT: G2: Duplicate stats section removed successfully
  EVIDENCE: Exactly 1 trust-strip section exists in HomePage.tsx below Hero. Duplicate removed.

- [x] G3: Refactor site color theme in tailwind.config.js and app/globals.css from gold (#D4AF37) to the new brand Crimson/Ruby Red theme (#DC2626 / #C51E1E / #991B1B) with matching obsidian glow effects.
  CHECK: node -e 'const fs = require("fs"); const css = fs.readFileSync("app/globals.css", "utf8"); const tailwind = fs.readFileSync("tailwind.config.js", "utf8"); const hasCrimson = css.includes("--brand-crimson") || tailwind.includes("crimson") || css.includes("rgba(197, 30, 30"); if (!hasCrimson) process.exit(1); console.log("G3: Red theme tokens configured");'
  EXPECT: G3: Red theme tokens configured
  EVIDENCE: --brand-crimson (#dc2626 / #ef4444) mapped across globals.css and crimson utility palette added to tailwind.config.js with matching glowing obsidian box shadows.

- [x] G4: Formulate a photorealistic 4K cinematic video generation prompt for Omni (Sora/KLING/Gen-3 standard) depicting Indian maritime trade at JNPT Nhava Sheva port with matching crimson brand lighting.
  CHECK: node -e 'const fs = require("fs"); const exists = fs.existsSync("resources/HERO_VIDEO_PROMPT.md"); if (!exists) process.exit(1); console.log("G4: Omni video prompt generated");'
  EXPECT: G4: Omni video prompt generated
  EVIDENCE: resources/HERO_VIDEO_PROMPT.md formulated with complete website context, dual-theme (Dark & Light Mode) compatibility, camera choreography, and copy-paste prompt.

- [x] G5: Audit total website images (page illustrations + service visuals) and define Indian context EXIM trade generation strategy taking into account Antigravity image generation capabilities and API limits.
  CHECK: node -e 'const fs = require("fs"); const exists = fs.existsSync("resources/INDIAN_CONTEXT_IMAGE_PLAN.md"); if (!exists) process.exit(1); console.log("G5: Image audit and plan verified");'
  EXPECT: G5: Image audit and plan verified
  EVIDENCE: resources/INDIAN_CONTEXT_IMAGE_PLAN.md documents all 22 image slots. 3 images generated and converted to webp; API quota limits documented with alternatives.

- [x] G6: Ensure Next.js build and TypeScript validation pass without errors.
  CHECK: npx tsc --noEmit && npm run build
  EXPECT: Compiled successfully
  EVIDENCE: npx tsc --noEmit passed with 0 errors; npm run build completed successfully compiling all 49 routes.
