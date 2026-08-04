# Master Product Requirements Document (PRD) & Technical Specification

## Project Title: Welcome Consultancy - Mobile-First Next.js & Cloudflare Workers Edge Platform

---

## 1. Executive Summary & Core Tech Stack

Welcome Consultancy is a top-tier Indian Foreign Trade & DGFT advisory firm with 10+ years of domain leadership across 16 specialized EXIM services.

### Core Technology Stack:
- **Framework**: Next.js 14+ (App Router, Server Components, TypeScript).
- **Deployment Platform**: **Cloudflare Workers** edge network (`wrangler`).
- **Database Engine**: **Cloudflare D1 Database** (Serverless edge SQLite database bound to Workers).
- **Mobile-First UX/UI**: Mobile-first design priority with fluid breakpoints. Deep Navy (`#0F172A`) & Warm Gold (`#D4AF37`), cool chalk surfaces, Newsreader + Manrope typography, floating island navigation, editorial service rows. Benchmark taxonomy: `kireeticonsultants.com`.
- **SEO / AIO / GEO Engine**: Dynamic Metadata API, dynamic JSON-LD Schema components, dynamic `sitemap.ts` and `robots.ts`, `public/llms.txt` for AI agent discovery, sub-2.5s LCP Core Web Vitals target.

---

## 2. Cloudflare D1 Database Schema (`schema.sql`)

```sql
-- Leads Table (Primary emphasis on Mobile Number & Source Tagging)
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  company TEXT,
  service TEXT NOT NULL,
  source TEXT NOT NULL,
  status TEXT DEFAULT 'New',
  details TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Slot Availability & Bookings Table
CREATE TABLE IF NOT EXISTS consultation_slots (
  id TEXT PRIMARY KEY,
  booking_date TEXT NOT NULL,
  booking_time TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_mobile TEXT NOT NULL,
  service_topic TEXT,
  status TEXT DEFAULT 'Confirmed',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- DGFT News Ticker Table
CREATE TABLE IF NOT EXISTS news_ticker (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  announcement TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Preserved 16 Service Paths & Interactive Context Pre-filling

All 16 DGFT service paths are preserved with zero SEO loss. Clicking "Inquire" or "Apply" on any service card or page passes the service parameter (`/contact?service=epcg-license`) to pre-fill the inquiry form dynamically:

1. `/services/import-export-code` (IEC Code Registration)
2. `/services/export-incentives` (RoDTEP / RoSCTL / Duty Drawback)
3. `/services/epcg-license` (EPCG Scheme)
4. `/services/advance-licence` (Advance Authorization)
5. `/services/export-house-certificate` (Star Export House Status)
6. `/services/rcmc-application` (RCMC Application)
7. `/services/certificate-of-origin` (Certificate of Origin - COO)
8. `/services/digital-signature` (Class 3 EXIM DSC)
9. `/services/ad-code-registration` (AD Code & ICEGATE Customs Tagging)
10. `/services/fssai-registration` (FSSAI Import/Export License)
11. `/services/aeo-registration` (AEO T1/T2/T3 Accreditation)
12. `/services/sims-registration` (SIMS / CHIMS Import Monitoring)
13. `/services/health-certificate` (Health & Phytosanitary Certificate)
14. `/services/interest-equalization-scheme` (Interest Subvention - IES)
15. `/services/rex-registration` (REX EU Self-Certification)
16. `/services/icegate-registration` (ICEGATE & e-SANCHIT Portal Setup)

---

## 4. Interactive CRO & Lead Generation Magnets

1. **RoDTEP / Duty Drawback Export Incentive Calculator**: Calculates estimated annual cashback based on FOB turnover & sector rates.
2. **EPCG Customs Duty Savings Estimator**: Estimates upfront customs duty saved (28.5%) and export obligation requirements (6x over 6 years).
3. **Custom EXIM Document Checklist Generator**: Select service -> view & download exact regulatory document checklist.
4. **Live Consultation Slot Booking Calendar**: Interactive widget synced with Cloudflare D1 `consultation_slots` table.
5. **Sticky WhatsApp (`+91 98671 73397`) & Phone CTAs**: Floating action buttons for mobile/desktop.
6. **Exit-Intent / Quick Callback Popup Modal**: Captures high-intent visitor mobile numbers.

---

## 5. Admin CMS & Command Center (`/admin`)

- **Lead Pipeline Dashboard**:
  - Highlights client **Mobile Numbers** as primary actionable item (with one-click Call and WhatsApp triggers).
  - Categorizes lead sources accurately.
  - One-click CSV export.
- **Slot Manager**: Configure working hours and view booked appointments.
- **Ticker Manager**: Add/remove live DGFT circular announcements.

---

## 6. Technical SEO, AIO & GEO Compliance (`resources/Technical SEODevelopmentRequirements.pdf`)

- Mobile-first responsive layout with touch-friendly targets.
- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Exactly **one `<h1>` per page**.
- Direct answer summaries in introductory paragraphs for AI search extraction.
- AI Agent markdown standard (`public/llms.txt`).
- Dynamic JSON-LD Schemas (`Organization`, `LocalBusiness`, `ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`).
- Core Web Vitals target: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
