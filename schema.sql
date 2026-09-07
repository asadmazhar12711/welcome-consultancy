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

CREATE UNIQUE INDEX IF NOT EXISTS idx_slots_date_time_active
  ON consultation_slots (booking_date, booking_time)
  WHERE status != 'Cancelled';

CREATE TABLE IF NOT EXISTS news_ticker (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  announcement TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS slot_config (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  working_days TEXT NOT NULL DEFAULT '["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]',
  start_time TEXT NOT NULL DEFAULT '10:00',
  end_time TEXT NOT NULL DEFAULT '18:00',
  slot_duration_minutes INTEGER NOT NULL DEFAULT 30
);

INSERT OR IGNORE INTO slot_config (id) VALUES (1);

INSERT OR IGNORE INTO news_ticker (id, announcement, is_active) VALUES
  (1, 'DGFT FTP 2023 notified — RoDTEP rates revised for select HS codes. Contact us for claim optimization.', 1),
  (2, 'EPCG Scheme: Zero-duty capital goods import with 6x export obligation over 6 years.', 1),
  (3, 'IEC annual updation window open April–June. Avoid DGFT deactivation — book a slot today.', 1);

CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Draft',
  published_at TEXT,
  seo_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  meta_robots TEXT NOT NULL DEFAULT 'index, follow',
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT,
  image_alt TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_status_published
  ON blog_posts (status, published_at DESC);

INSERT OR IGNORE INTO blog_posts (
  id, title, slug, category, excerpt, body, status, published_at,
  seo_title, meta_description, image_alt
) VALUES
  ('post-star-house-certificate', 'Star House Certificate', 'star-house-certificate', 'DGFT Policy',
   'This certificate is to recognize such Exporter firms as Business Leaders who have excelled in International Trade and have successfully contributed to the country''s Foreign Trade.',
   'Star House / Export House certificates recognise exporter firms as business leaders who have excelled in international trade and contributed to India''s foreign trade performance.

Welcome Consultancy advises on eligibility thresholds, documentation, and DGFT filing so manufacturers and merchant exporters can secure the right status category and unlock associated benefits under the Foreign Trade Policy.',
   'Published', '2026-07-01',
   'Star House Certificate | DGFT Export House Status',
   'Learn how Star House / Export House certificates recognise top Indian exporters and how Welcome Consultancy helps with DGFT eligibility and filing.',
   'Star House export status certificate illustration'),
  ('post-epcg-scheme', 'Export Promotion Capital Goods (EPCG)', 'export-promotion-capital-goods-epcg', 'Incentives',
   'EPCG is intended for promoting exports and the Indian government with the help of this scheme offers incentives and financial support to the exporters.',
   'The Export Promotion Capital Goods (EPCG) scheme allows exporters to import capital goods at zero customs duty, subject to an export obligation typically equal to six times the duty saved over six years.

Welcome Consultancy structures EPCG applications, monitors export obligation timelines, and supports redemption / EO extension filings so capital investment stays compliant with DGFT conditions.',
   'Published', '2026-06-01',
   'EPCG Scheme Explained | Zero-Duty Capital Goods',
   'Understand the EPCG scheme for zero-duty capital goods imports, export obligations, and how Welcome Consultancy manages DGFT EPCG compliance.',
   'EPCG capital goods duty savings illustration'),
  ('post-aeo-certification', 'Authorized Economic Operator (AEO)', 'authorized-economic-operator-aeo', 'Customs',
   'The benefits of AEO include faster processing and clearance of cargo, deferred payment of duty, direct port delivery/entry, and benefits under Mutual Recognition arrangements (MRA).',
   'Authorized Economic Operator (AEO) certification delivers faster cargo clearance, deferred duty payment, direct port delivery/entry, and Mutual Recognition Arrangement benefits with partner customs administrations.

Welcome Consultancy prepares AEO Tier 1–3 applications, maps process controls, and coordinates with Indian Customs so eligible importers and exporters achieve trusted-trader status.',
   'Published', '2026-05-01',
   'AEO Certification Benefits | Authorized Economic Operator',
   'AEO certification benefits include faster clearance, deferred duty, and MRA recognition. Welcome Consultancy supports AEO Tier 1–3 applications.',
   'Authorized Economic Operator customs compliance illustration'),
  ('post-certificate-of-origin', 'Certificate of Origin', 'certificate-of-origin', 'Documentation',
   'The certificate of origin holds significant importance in the transportation of goods across borders. It serves as proof of the country where the product was manufactured.',
   'A Certificate of Origin (COO) proves the country where goods were manufactured and is required for preferential duty claims under FTAs/PTAs as well as standard non-preferential customs clearance.

Welcome Consultancy assists with preferential and non-preferential COO issuance, documentation checks, and coordination with issuing chambers / DGFT systems.',
   'Published', '2026-04-01',
   'Certificate of Origin (COO) for Exports | Preferential & Non-Preferential',
   'Certificate of Origin proves manufacturing country for customs and FTA duty benefits. Get preferential and non-preferential COO support from Welcome Consultancy.',
   'Certificate of Origin trade documentation illustration');

CREATE TABLE IF NOT EXISTS redirects (
  id TEXT PRIMARY KEY,
  from_path TEXT NOT NULL UNIQUE,
  to_path TEXT NOT NULL,
  status_code INTEGER NOT NULL DEFAULT 301,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_redirects_active_from
  ON redirects (is_active, from_path);

CREATE TABLE IF NOT EXISTS seo_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  site_title TEXT NOT NULL DEFAULT 'Welcome Consultancy',
  default_meta_description TEXT NOT NULL DEFAULT '',
  site_url TEXT NOT NULL DEFAULT 'https://welcomeconsultancy.in',
  gtm_id TEXT NOT NULL DEFAULT '',
  ga4_id TEXT NOT NULL DEFAULT 'G-SBVK5GGG6Q',
  clarity_id TEXT NOT NULL DEFAULT '',
  meta_pixel_id TEXT NOT NULL DEFAULT '',
  gsc_verification TEXT NOT NULL DEFAULT '',
  bing_verification TEXT NOT NULL DEFAULT '',
  default_og_image TEXT NOT NULL DEFAULT '/illustrations/hero-global-trade.webp',
  robots_extra TEXT NOT NULL DEFAULT '',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO seo_settings (id, ga4_id) VALUES (1, 'G-SBVK5GGG6Q');

CREATE TABLE IF NOT EXISTS popups (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  cta_label TEXT NOT NULL DEFAULT 'Get in touch',
  cta_href TEXT NOT NULL DEFAULT '/contact-us',
  is_active INTEGER NOT NULL DEFAULT 1,
  delay_seconds INTEGER NOT NULL DEFAULT 20,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO popups (id, title, message, cta_label, cta_href, is_active, delay_seconds) VALUES
  ('popup-free-meeting', 'Get a Free 1-on-1 Consultation',
   'Talk to our DGFT expert about RoDTEP, EPCG, licensing, or customs compliance — no cost, no obligation.',
   'Schedule Free Meeting', '/#book-a-meeting', 1, 20);

CREATE TABLE IF NOT EXISTS pages (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content_json TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'Draft',
  seo_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  meta_robots TEXT NOT NULL DEFAULT 'index, follow',
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  content_json TEXT NOT NULL DEFAULT '{}',
  faqs_json TEXT NOT NULL DEFAULT '[]',
  benefits_json TEXT NOT NULL DEFAULT '[]',
  documents_json TEXT NOT NULL DEFAULT '[]',
  body_json TEXT NOT NULL DEFAULT '[]',
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'Draft',
  seo_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  meta_robots TEXT NOT NULL DEFAULT 'index, follow',
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS robots_config (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  content TEXT NOT NULL DEFAULT 'User-agent: *
Disallow: /admin/
Allow: /
Sitemap: https://welcomeconsultancy.in/sitemap.xml',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO robots_config (id) VALUES (1);
