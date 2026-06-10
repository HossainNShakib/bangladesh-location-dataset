-- Bangladesh Location Dataset Schema - MySQL Variant
-- Same as schema.sql but with MySQL-specific compatibility

CREATE TABLE IF NOT EXISTS divisions (
  id INT PRIMARY KEY,
  name_en VARCHAR(100) NOT NULL,
  name_bn VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS districts (
  id INT PRIMARY KEY,
  division_id INT NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  name_bn VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (division_id) REFERENCES divisions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subdistricts (
  id INT PRIMARY KEY,
  district_id INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  name_bn VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE,
  CHECK (type IN ('upazila', 'thana'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS localareas (
  id INT PRIMARY KEY,
  subdistrict_id INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  name_bn VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (subdistrict_id) REFERENCES subdistricts(id) ON DELETE CASCADE,
  CHECK (type IN ('union', 'ward'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create indexes for better query performance
CREATE INDEX idx_districts_division ON districts(division_id);
CREATE INDEX idx_subdistricts_district ON subdistricts(district_id);
CREATE INDEX idx_localareas_subdistrict ON localareas(subdistrict_id);
