# Welcome Consultancy — Cinematic Hero Section Video Prompt for Omni (Sora / KLING / Gen-3)

## 1. Project & Website Context (For AI Model Contextual Grounding)
- **Company**: **Welcome Consultancy** (Mumbai, India — Established 2014)
- **Industry**: India's Premier International Trade (EXIM), DGFT Licensing, Customs Advisory, and Foreign Trade Policy (FTP) Consultancy.
- **Website Aesthetic**: Modern Linear / Stripe SaaS Obsidian Dark & Clean Editorial Light (`#030712` Obsidian + `#DC2626` / `#EF4444` Brand Crimson Red Accents).
- **Placement**: Full-bleed background video loop for the **Hero Section** (`HomePage.tsx`).
- **Functional Requirements**:
  1. **Seamless Subtle Motion**: No rapid cuts, no violent camera jerks, no chaotic movement. Slow, cinematic forward aerial glide.
  2. **Dual-Theme Elegance (Dark & Light Mode)**:
     - Must look stunning in **Dark Mode** with deep navy/obsidian water and glowing amber-crimson industrial lights.
     - Must look clean, crisp, and legible in **Light Mode** with natural atmospheric sky and realistic ocean contrast.
  3. **Left-Weighted Negative Space**: The left 45% of the frame must have calm water/subtle harbor atmosphere so the headline *"Welcome Consultancy — Maximize export incentives with absolute precision"* and interactive CTA buttons have 100% optical legibility.
  4. **Strict Realism**: Must look like high-budget documentary footage shot on cinema cameras (ARRI Alexa LF), authentic Indian maritime context (JNPT / Nhava Sheva, Mumbai), zero synthetic cartoon or glossy CGI artifacts.

---

## 2. Primary Production Prompt (Copy-Paste Ready for Omni / Sora / KLING 1.5)

```text
Cinematic 4K drone shot at twilight golden hour, slow smooth forward aerial glide over Jawaharlal Nehru Port Trust (JNPT Nhava Sheva) in Mumbai, India. A massive, realistic ocean container cargo ship is navigating calmly into the deep harbor channel. In the background, towering red and white ship-to-shore gantry cranes line the dock terminals with subtle amber and ruby-red aviation warning lights reflecting across the calm Arabian Sea. Neatly stacked colorful shipping containers (marine blue, rust red, forest green) on the vessel deck. Atmospheric sea haze and soft twilight sky transitioning from deep indigo navy to warm amber-gold at the horizon. The left side of the frame features open calm shimmering water with soft reflections, while the majestic cargo ship slowly glides on the right-to-center. Ultra-smooth 24fps gimbal motion, filmed on ARRI Alexa LF 35mm anamorphic lens, shallow depth of field on distant industrial cranes, authentic 8k maritime documentary cinematography, hyperrealistic, zero CGI artifact, serene institutional authority, seamless looping ambient hero background video.
```

---

## 3. Negative Prompt (To Filter Out Unwanted Artifacts)

```text
fast cuts, jerky camera movements, extreme zoom, shaky cam, bright neon oversaturation, cartoon, CGI, 3D render, anime, low resolution, blurry, distortion, text watermark, logo overlays, distorted ship geometry, chaotic weather, storm waves, sunken boats, surreal fantasy elements, unrealistic speeds, plastic textures.
```

---

## 4. Omni / AI Video Parameter Configuration Table

| Parameter | Recommended Value | Reason |
| :--- | :--- | :--- |
| **Aspect Ratio** | `16:9` (3840x2160 or 1920x1080) | Fullscreen desktop and responsive responsive container coverage |
| **Duration** | `8 to 12 seconds` | Ideal length for seamless lightweight looping video |
| **Frame Rate** | `24 fps` or `30 fps` | Filmic motion cadence, avoids high-framerate soap-opera effect |
| **Motion Bucket / Intensity** | `2` or `Low (15-25%)` | Prevents camera jitter; keeps typography legible on top |
| **Lighting Balance** | `Blue Hour / Twilight Golden Hour` | Deep shadows for Dark Mode, radiant natural horizon for Light Mode |
| **Focal Subject Position** | Right-Center | Leaves left-third open for hero typography and CTA buttons |

---

## 5. Alternative Variations (For A/B Testing & Micro-Interactions)

### Option B: Dry Port & Multimodal Inland Logistics (ICD Tughlakabad / Delhi-NCR)
```text
Slow aerial tracking shot over a modern Indian Inland Container Depot (ICD) logistics terminal at dusk. Freight container trains loaded with multi-colored export containers moving smoothly along railway tracks. Modern red reach stackers lifting containers into organized stacks under warm sodium vapor floodlights and deep twilight indigo sky. Filmed on RED V-Raptor 8k, ultra-smooth motion, cinematic color grading, authentic Indian infrastructure, serene and powerful trade logistics background video.
```

### Option C: Close-up High-Precision Port Terminal Operations
```text
Cinematic telephoto 4K shot across calm harbor waters at dawn. A giant crimson-red gantry crane gently lowering a steel 40ft container onto a modern logistics vessel. Warm sunrise rays cutting through subtle morning sea mist over the Mumbai coastline. Minimal camera drift, elegant water ripples, high contrast industrial textures, photorealistic documentary look, steady and tranquil.
```

---

## 6. Implementation Guide in Next.js Hero Component

Once Omni generates the video:
1. Optimize with FFmpeg for web delivery:
   ```bash
   ffmpeg -i omni_hero_raw.mp4 -vcodec libx264 -crf 23 -preset slow -an -movflags +faststart public/videos/hero-bg.mp4
   ffmpeg -i omni_hero_raw.mp4 -vcodec libvpx-vp9 -crf 30 -b:v 0 -an public/videos/hero-bg.webm
   ```
2. Embed into `components/visual/VisualFrame.tsx`:
   ```tsx
   <video
     autoPlay
     loop
     muted
     playsInline
     poster="/illustrations/hero-indian-port.webp"
     className="absolute inset-0 h-full w-full object-cover object-center"
   >
     <source src="/videos/hero-bg.webm" type="video/webm" />
     <source src="/videos/hero-bg.mp4" type="video/mp4" />
   </video>
   ```
