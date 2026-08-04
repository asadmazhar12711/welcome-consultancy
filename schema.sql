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
