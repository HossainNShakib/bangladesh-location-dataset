-- PostgreSQL Schema for Bangladesh Location Dataset

CREATE TABLE IF NOT EXISTS divisions (
  id INTEGER PRIMARY KEY,
  name_en VARCHAR(100) NOT NULL,
  name_bn VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS districts (
  id INTEGER PRIMARY KEY,
  division_id INTEGER NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  name_bn VARCHAR(100) NOT NULL,
  CONSTRAINT fk_districts_division FOREIGN KEY (division_id) REFERENCES divisions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS subdistricts (
  id INTEGER PRIMARY KEY,
  district_id INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('upazila', 'thana')),
  name_en VARCHAR(100) NOT NULL,
  name_bn VARCHAR(100) NOT NULL,
  CONSTRAINT fk_subdistricts_district FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS localareas (
  id INTEGER PRIMARY KEY,
  subdistrict_id INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('union', 'ward')),
  name_en VARCHAR(100) NOT NULL,
  name_bn VARCHAR(100) NOT NULL,
  CONSTRAINT fk_localareas_subdistrict FOREIGN KEY (subdistrict_id) REFERENCES subdistricts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_districts_division ON districts(division_id);
CREATE INDEX IF NOT EXISTS idx_subdistricts_district ON subdistricts(district_id);
CREATE INDEX IF NOT EXISTS idx_localareas_subdistrict ON localareas(subdistrict_id);