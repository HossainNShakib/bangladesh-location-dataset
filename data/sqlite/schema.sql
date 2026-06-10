-- SQLite Schema for Bangladesh Location Dataset

CREATE TABLE IF NOT EXISTS divisions (
  id INTEGER PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_bn TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS districts (
  id INTEGER PRIMARY KEY,
  division_id INTEGER NOT NULL,
  name_en TEXT NOT NULL,
  name_bn TEXT NOT NULL,
  FOREIGN KEY (division_id) REFERENCES divisions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS subdistricts (
  id INTEGER PRIMARY KEY,
  district_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('upazila', 'thana')),
  name_en TEXT NOT NULL,
  name_bn TEXT NOT NULL,
  FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS localareas (
  id INTEGER PRIMARY KEY,
  subdistrict_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('union', 'ward')),
  name_en TEXT NOT NULL,
  name_bn TEXT NOT NULL,
  FOREIGN KEY (subdistrict_id) REFERENCES subdistricts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_districts_division ON districts(division_id);
CREATE INDEX IF NOT EXISTS idx_subdistricts_district ON subdistricts(district_id);
CREATE INDEX IF NOT EXISTS idx_localareas_subdistrict ON localareas(subdistrict_id);