-- One-time SEO schema upgrade for existing D1 databases.
-- Safe to re-run: failed ADD COLUMN statements are ignored by the migrate script.

ALTER TABLE blog_posts ADD COLUMN body TEXT NOT NULL DEFAULT '';
ALTER TABLE blog_posts ADD COLUMN seo_title TEXT;
ALTER TABLE blog_posts ADD COLUMN meta_description TEXT;
ALTER TABLE blog_posts ADD COLUMN canonical_url TEXT;
ALTER TABLE blog_posts ADD COLUMN meta_robots TEXT NOT NULL DEFAULT 'index, follow';
ALTER TABLE blog_posts ADD COLUMN og_title TEXT;
ALTER TABLE blog_posts ADD COLUMN og_description TEXT;
ALTER TABLE blog_posts ADD COLUMN og_image TEXT;
ALTER TABLE blog_posts ADD COLUMN twitter_title TEXT;
ALTER TABLE blog_posts ADD COLUMN twitter_description TEXT;
ALTER TABLE blog_posts ADD COLUMN twitter_image TEXT;
ALTER TABLE blog_posts ADD COLUMN image_alt TEXT;

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

UPDATE blog_posts
SET body = excerpt
WHERE body IS NULL OR body = '';
