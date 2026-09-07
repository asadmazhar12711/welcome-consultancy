ALTER TABLE services ADD COLUMN benefits_json TEXT DEFAULT '[]';
ALTER TABLE services ADD COLUMN documents_json TEXT DEFAULT '[]';
ALTER TABLE services ADD COLUMN body_json TEXT DEFAULT '[]';
ALTER TABLE services ADD COLUMN image_url TEXT;
