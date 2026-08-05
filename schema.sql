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
  status TEXT NOT NULL DEFAULT 'Draft',
  published_at TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_status_published
  ON blog_posts (status, published_at DESC);

INSERT OR IGNORE INTO blog_posts (id, title, slug, category, excerpt, status, published_at) VALUES
  ('post-star-house-certificate', 'Star House Certificate', 'star-house-certificate', 'DGFT Policy',
   'This certificate is to recognize such Exporter firms as Business Leaders who have excelled in International Trade and have successfully contributed to the country''s Foreign Trade.',
   'Published', '2026-07-01'),
  ('post-epcg-scheme', 'Export Promotion Capital Goods (EPCG)', 'export-promotion-capital-goods-epcg', 'Incentives',
   'EPCG is intended for promoting exports and the Indian government with the help of this scheme offers incentives and financial support to the exporters.',
   'Published', '2026-06-01'),
  ('post-aeo-certification', 'Authorized Economic Operator (AEO)', 'authorized-economic-operator-aeo', 'Customs',
   'The benefits of AEO include faster processing and clearance of cargo, deferred payment of duty, direct port delivery/entry, and benefits under Mutual Recognition arrangements (MRA).',
   'Published', '2026-05-01'),
  ('post-certificate-of-origin', 'Certificate of Origin', 'certificate-of-origin', 'Documentation',
   'The certificate of origin holds significant importance in the transportation of goods across borders. It serves as proof of the country where the product was manufactured.',
   'Published', '2026-04-01');

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
